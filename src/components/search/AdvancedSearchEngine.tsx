import React, { useState, useCallback, useEffect } from 'react';
  // @ts-ignore - Unused variable intentionally kept
import { Box, Button, Card, CardContent, CardHeader, Checkbox, Chip, Collapse, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Tab, Tabs, TextField, Typography, } from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  History as HistoryIcon,
  Bookmark as BookmarkIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Delete as DeleteIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { PropertyItem } from '../../types/property';

export type SearchFieldType = 'text' | 'number' | 'enum' | 'boolean' | 'date';

export type SearchFilterOperator = 
  | 'equals' 
  | 'notEquals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'between'
  | 'in'
  | 'isTrue'
  | 'isFalse'
  | 'before'
  | 'after'
  | 'isEmpty'
  | 'isNotEmpty';

export type SearchFieldConfig = {
  field: string;
  label: string;
  type: SearchFieldType;
  operators: SearchFilterOperator[];
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
};

export type SearchFilter = {
  id: string;
  field: string;
  operator: SearchFilterOperator;
  value: any;
  value2?: any; // For 'between' operator
};

export type LogicalOperator = 'AND' | 'OR';

export type SavedSearch = {
  id: string;
  name: string;
  filters: SearchFilter[];
  logicalOperator: LogicalOperator;
  createdAt: string;
  lastUsed?: string;
};

export type SearchQuery = {
  filters: SearchFilter[];
  logicalOperator: LogicalOperator;
  textQuery?: string;
};

export type SearchResultItem = PropertyItem & {
  matchedFields?: string[];
  highlightedText?: Record<string, string[]>;
};

export type SearchResults = {
  items: SearchResultItem[];
  totalItems: number;
  pageSize: number;
  currentPage: number;
  loading: boolean;
  searchTime?: number; // in ms
};

interface AdvancedSearchEngineProps {
  onSearch: (query: SearchQuery) => Promise<SearchResults>;
  onSaveSearch?: (search: SavedSearch) => Promise<void>;
  onDeleteSavedSearch?: (searchId: string) => Promise<void>;
  savedSearches?: SavedSearch[];
  recentSearches?: {
    query: SearchQuery;
    timestamp: string;
    resultCount: number;
  }[];
  initialFilters?: SearchFilter[];
  searchFields: SearchFieldConfig[];
}

export const AdvancedSearchEngine: React.FC<AdvancedSearchEngineProps> = ({
  onSearch,
  onSaveSearch,
  onDeleteSavedSearch,
  savedSearches = [],
  recentSearches = [],
  initialFilters = [],
  searchFields,
}) => {
  
  const [textQuery, setTextQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>(initialFilters);
  const [logicalOperator, setLogicalOperator] = useState<LogicalOperator>('AND');
  const [results, setResults] = useState<SearchResults>({
    items: [],
    totalItems: 0,
    pageSize: 10,
    currentPage: 1,
    loading: false,
  });
  const [expandedFilters, setExpandedFilters] = useState(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Initialize with default filter if none exist
  useEffect(() => {
    if (filters.length === 0) {
      addFilter();
    }
  }, []);

  // Generate a unique ID for filters
  const generateFilterId = () => {
    return `filter-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Add a new filter
  const addFilter = useCallback(() => {
    const defaultField = searchFields[0];
    const newFilter: SearchFilter = {
      id: generateFilterId(),
      field: defaultField.field,
      operator: defaultField.operators[0],
      value: '',
    };
    setFilters([...filters, newFilter]);
    setDirty(true);
  }, [filters, searchFields]);

  // Remove a filter
  const removeFilter = useCallback((id: string) => {
    setFilters(filters.filter(filter => filter.id !== id));
    setDirty(true);
  }, [filters]);

  // Update a filter
  const updateFilter = useCallback((id: string, field: string, value: any) => {
    setFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.id === id 
          ? { ...filter, [field]: value } 
          : filter
      )
    );
    setDirty(true);
  }, []);

  // Reset value when field or operator changes
  const resetFilterValue = useCallback((id: string) => {
    setFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.id === id 
          ? { ...filter, value: '', value2: undefined } 
          : filter
      )
    );
  }, []);

  // Toggle filters section visibility
  const toggleFilters = () => {
    setExpandedFilters(!expandedFilters);
  };

  // Handle search action
  const handleSearch = async () => {
    const query: SearchQuery = {
      filters,
      logicalOperator,
      textQuery: textQuery.trim() || undefined,
    };

    setResults({
      ...results,
      loading: true,
    });

    try {
      const searchResults = await onSearch(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults({
        ...results,
        loading: false,
        items: [],
        totalItems: 0,
      });
    }
    
    setDirty(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([]);
    setTextQuery('');
    setLogicalOperator('AND');
    addFilter();
    setDirty(true);
  };

  // Load a saved search
  const loadSavedSearch = (search: SavedSearch) => {
    setFilters(search.filters);
    setLogicalOperator(search.logicalOperator);
    setTextQuery('');
    setDirty(true);
  };

  // Handle save search
  const handleSaveSearch = async () => {
    if (!searchName.trim() || !onSaveSearch) return;
    
    const searchToSave: SavedSearch = {
      id: generateFilterId(),
      name: searchName,
      filters,
      logicalOperator,
      createdAt: new Date().toISOString(),
    };
    
    try {
      await onSaveSearch(searchToSave);
      setSaveDialogOpen(false);
      setSearchName('');
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  // Handle delete saved search
  const handleDeleteSavedSearch = async (searchId: string) => {
    if (!onDeleteSavedSearch) return;
    
    try {
      await onDeleteSavedSearch(searchId);
    } catch (error) {
      console.error('Error deleting saved search:', error);
    }
  };

  // Open saved search menu
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Get field configuration for a filter
  const getFieldConfig = (fieldName: string): SearchFieldConfig => {
    return searchFields.find(field => field.field === fieldName) || searchFields[0];
  };

  // Render filter input based on field type and operator
  const renderFilterInput = (filter: SearchFilter, fieldConfig: SearchFieldConfig) => {
    const { type, options } = fieldConfig;
    const { operator, value, value2 } = filter;
    
    if (operator === 'isEmpty' || operator === 'isNotEmpty' || 
        operator === 'isTrue' || operator === 'isFalse') {
      return null;
    }
    
    switch (type) {
      case 'enum':
        if (operator === 'in') {
          // Multiple select
          return (
            <FormControl fullWidth size="small">
              <InputLabel>Select values</InputLabel>
              <Select
                multiple
                value={Array.isArray(value) ? value : []}
                onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                input={<OutlinedInput label="Select values" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={
                        options && Array.isArray(options) 
                          ? typeof options[0] === 'string'
                            ? value
                            : (options as {value: string; label: string}[]).find(opt => opt.value === value)?.label || value
                          : value
                      } size="small" />
                    ))}
                  </Box>
                )}
              >
                {options && Array.isArray(options) && (
                  typeof options[0] === 'string'
                    ? (options as string[]).map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox checked={(value || []).indexOf(option) > -1} />
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))
                    : (options as {value: string; label: string}[]).map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox checked={(value || []).indexOf(option.value) > -1} />
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))
                )}
              </Select>
            </FormControl>
          );
        } else {
          // Single select
          return (
            <FormControl fullWidth size="small">
              <InputLabel>Select value</InputLabel>
              <Select
                value={value || ''}
                onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                label="Select value"
              >
                {options && Array.isArray(options) && (
                  typeof options[0] === 'string'
                    ? (options as string[]).map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))
                    : (options as {value: string; label: string}[]).map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))
                )}
              </Select>
            </FormControl>
          );
        }
      
      case 'number':
        if (operator === 'between') {
          return (
            <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
              <TextField
                size="small"
                type="number"
                label="From"
                value={value || ''}
                onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                type="number"
                label="To"
                value={value2 || ''}
                onChange={(e) => updateFilter(filter.id, 'value2', e.target.value)}
                fullWidth
              />
            </Stack>
          );
        } else {
          return (
            <TextField
              size="small"
              type="number"
              value={value || ''}
              onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
              fullWidth
              placeholder={fieldConfig.placeholder}
            />
          );
        }
      
      case 'date':
        if (operator === 'between') {
          return (
            <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
              <DatePicker
                label="From"
                value={value ? new Date(value) : null}
                onChange={(date) => updateFilter(filter.id, 'value', date?.toISOString())}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  }
                }}
              />
              <DatePicker
                label="To"
                value={value2 ? new Date(value2) : null}
                onChange={(date) => updateFilter(filter.id, 'value2', date?.toISOString())}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  }
                }}
              />
            </Stack>
          );
        } else {
          return (
            <DatePicker
              value={value ? new Date(value) : null}
              onChange={(date) => updateFilter(filter.id, 'value', date?.toISOString())}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                }
              }}
            />
          );
        }
      
      case 'boolean':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>Select value</InputLabel>
            <Select
              value={value || ''}
              onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
              label="Select value"
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        );
      
      case 'text':
      default:
        return (
          <TextField
            size="small"
            value={value || ''}
            onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
            fullWidth
            placeholder={fieldConfig.placeholder}
          />
        );
    }
  };

  // Convert logical operator for display
  // @ts-ignore - Unused variable intentionally kept
  const _getLogicalOperatorLabel = (operator: LogicalOperator) => {
    return operator === 'AND' ? 'Match all filters' : 'Match any filter';
  };

  // Get operator label for display
  const getOperatorLabel = (operator: SearchFilterOperator): string => {
    switch (operator) {
      case 'equals': return 'equals';
      case 'notEquals': return 'does not equal';
      case 'contains': return 'contains';
      case 'startsWith': return 'starts with';
      case 'endsWith': return 'ends with';
      case 'greaterThan': return 'greater than';
      case 'lessThan': return 'less than';
      case 'between': return 'between';
      case 'in': return 'in list';
      case 'isTrue': return 'is true';
      case 'isFalse': return 'is false';
      case 'before': return 'before';
      case 'after': return 'after';
      case 'isEmpty': return 'is empty';
      case 'isNotEmpty': return 'is not empty';
      default: return 'equals';
    }
  };

  return (
    <Card>
      <CardHeader
        title="Advanced Search"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
      <CardContent>
        {/* Global search bar */}
        <TextField
          fullWidth
          placeholder="Search for anything..."
          value={textQuery}
          onChange={(e) => {
            setTextQuery(e.target.value);
            setDirty(true);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: textQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => {
                  setTextQuery('');
                  setDirty(true);
                }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Filters section */}
        <Paper variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              cursor: 'pointer',
              bgcolor: 'action.hover',
            }}
            onClick={toggleFilters}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterListIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Filters</Typography>
            </Box>
            {expandedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          
          <Collapse in={expandedFilters}>
            <Box sx={{ p: 2, pt: 0 }}>
              <Box
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  my: 2 
                }}
              >
                <FormControl component="fieldset">
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant={logicalOperator === 'AND' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setLogicalOperator('AND');
                        setDirty(true);
                      }}
                    >
                      Match All
                    </Button>
                    <Button
                      size="small"
                      variant={logicalOperator === 'OR' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setLogicalOperator('OR');
                        setDirty(true);
                      }}
                    >
                      Match Any
                    </Button>
                  </Stack>
                </FormControl>
                
                <Button
                  startIcon={<ClearIcon />}
                  size="small"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </Box>

              {/* Filter rows */}
              {filters.map((filter) => {
                const fieldConfig = getFieldConfig(filter.field);
                
                return (
                  <Grid 
                    container 
                    spacing={1} 
                    key={filter.id} 
                    alignItems="center"
                    sx={{ mb: 1.5 }}
                  >
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Field</InputLabel>
                        <Select
                          value={filter.field}
                          onChange={(e) => {
                            updateFilter(filter.id, 'field', e.target.value);
                            const newFieldConfig = getFieldConfig(e.target.value as string);
                            updateFilter(filter.id, 'operator', newFieldConfig.operators[0]);
                            resetFilterValue(filter.id);
                          }}
                          label="Field"
                        >
                          {searchFields.map((field) => (
                            <MenuItem key={field.field} value={field.field}>
                              {field.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Operator</InputLabel>
                        <Select
                          value={filter.operator}
                          onChange={(e) => {
                            updateFilter(filter.id, 'operator', e.target.value as SearchFilterOperator);
                            resetFilterValue(filter.id);
                          }}
                          label="Operator"
                        >
                          {fieldConfig.operators.map((op) => (
                            <MenuItem key={op} value={op}>
                              {getOperatorLabel(op)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={5}>
                      {renderFilterInput(filter, fieldConfig)}
                    </Grid>
                    
                    <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
                      <IconButton 
                        size="small" 
                        onClick={() => removeFilter(filter.id)}
                        disabled={filters.length === 1}
                        color="error"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}

              <Button
                startIcon={<AddIcon />}
                size="small"
                onClick={addFilter}
                sx={{ mt: 1 }}
              >
                Add Filter
              </Button>
            </Box>
          </Collapse>
        </Paper>

        {/* Action buttons */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 2
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={results.loading}
          >
            {results.loading ? 'Searching...' : 'Search'}
          </Button>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<BookmarkIcon />}
              onClick={handleMenuClick}
              disabled={!savedSearches.length}
            >
              Saved Searches
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => setSaveDialogOpen(true)}
              disabled={!filters.length || filters.every(f => !f.value && f.operator !== 'isEmpty' && f.operator !== 'isNotEmpty')}
            >
              Save Search
            </Button>
          </Stack>
        </Box>

        {/* Saved searches menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              width: '300px',
            },
          }}
        >
          {savedSearches.length === 0 ? (
            <MenuItem disabled>No saved searches</MenuItem>
          ) : (
            savedSearches.map((search) => (
              <MenuItem
                key={search.id}
                onClick={() => {
                  loadSavedSearch(search);
                  handleMenuClose();
                }}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pr: 1
                }}
              >
                <ListItemText
                  primary={search.name}
                  secondary={`${search.filters.length} filter${search.filters.length !== 1 ? 's' : ''}`}
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSavedSearch(search.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </MenuItem>
            ))
          )}
        </Menu>

        {/* Save search dialog */}
        <Collapse in={saveDialogOpen}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Save Current Search
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Search Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button 
                variant="outlined"
                onClick={() => {
                  setSaveDialogOpen(false);
                  setSearchName('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSearch}
                disabled={!searchName.trim()}
              >
                Save
              </Button>
            </Stack>
          </Paper>
        </Collapse>

        {/* Tabs for results and history */}
        <Box sx={{ mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label="Results" />
            <Tab label="Recent Searches" />
          </Tabs>
          
          {/* Results tab */}
          {tabValue === 0 && (
            <Box>
              {dirty && filters.length > 0 && (
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    bgcolor: 'warning.light',
                    color: 'warning.dark',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="body2">
                    You have unsaved changes in your search criteria. Click "Search" to update results.
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    onClick={handleSearch}
                  >
                    Search Now
                  </Button>
                </Paper>
              )}
              
              {results.totalItems > 0 && !results.loading && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Found {results.totalItems} results
                    {results.searchTime !== undefined && ` in ${results.searchTime}ms`}
                  </Typography>
                </Box>
              )}
              
              {results.loading ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography>Loading results...</Typography>
                </Box>
              ) : results.items.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No results found. Try adjusting your search criteria.
                  </Typography>
                </Box>
              ) : (
                // Results list - replace with your own component
                <Box>
                  {results.items.map((item) => (
                    <Paper
                      key={item.id}
                      variant="outlined"
                      sx={{ p: 2, mb: 1.5 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">
                          {item.nomenclature}
                        </Typography>
                        <Chip 
                          label={item.category} 
                          size="small"
                          color="primary"
                          variant="outlined" 
                        />
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">NSN</Typography>
                          <Typography variant="body2">{item.nsn}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">Serial Number</Typography>
                          <Typography variant="body2">{item.serialNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">Location</Typography>
                          <Typography variant="body2">{item.location}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">Status</Typography>
                          <Chip
                            label={item.status}
                            size="small"
                            color={
                              item.status === 'FMC' ? 'success' :
                              item.status === 'NMC' ? 'error' :
                              item.status === 'NMCS' ? 'warning' : 'info'
                            }
                          />
                        </Grid>
                      </Grid>
                      {item.matchedFields && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Matched: {item.matchedFields.join(', ')}
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ mt: 1, textAlign: 'right' }}>
                        <Button
                          size="small"
                          endIcon={<OpenInNewIcon />}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>
          )}
          
          {/* Recent searches tab */}
          {tabValue === 1 && (
            <Box>
              {recentSearches.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No recent searches found.
                  </Typography>
                </Box>
              ) : (
                recentSearches.map((search, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{ p: 2, mb: 1.5 }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Stack 
                          direction="row" 
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(search.timestamp).toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2">
                              {search.query.textQuery || 'Advanced Search'}
                            </Typography>
                          </Box>
                          <Box>
                            <Chip
                              label={`${search.resultCount} results`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                        </Stack>
                      </Grid>
                      
                      {search.query.filters.length > 0 && (
                        <Grid item xs={12}>
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Filters: {search.query.filters.length}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                              {search.query.filters.slice(0, 3).map((filter, i) => {
                                const fieldConfig = getFieldConfig(filter.field);
                                return (
                                  <Chip
                                    key={i}
                                    size="small"
                                    label={`${fieldConfig.label} ${getOperatorLabel(filter.operator)}`}
                                    variant="outlined"
                                  />
                                );
                              })}
                              {search.query.filters.length > 3 && (
                                <Chip
                                  size="small"
                                  label={`+${search.query.filters.length - 3} more`}
                                  variant="outlined"
                                  color="secondary"
                                />
                              )}
                            </Stack>
                          </Box>
                        </Grid>
                      )}
                      
                      <Grid item xs={12} sx={{ textAlign: 'right', mt: 1 }}>
                        <Button
                          size="small"
                          startIcon={<HistoryIcon />}
                          onClick={() => {
                            setFilters(search.query.filters);
                            setLogicalOperator(search.query.logicalOperator);
                            setTextQuery(search.query.textQuery || '');
                            setDirty(true);
                            setTabValue(0);
                          }}
                        >
                          Load Search
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchEngine; 