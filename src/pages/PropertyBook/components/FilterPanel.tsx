import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Collapse,
  IconButton,
  Divider,
  Chip,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { usePropertyBook } from '../context/PropertyBookContext';

interface FilterPanelProps {
  disablePaper?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ disablePaper = false }) => {
  const theme = useTheme();
  const { filters, setFilters, resetFilters, categories } = usePropertyBook();
  const [expanded, setExpanded] = useState(false);
  
  // Get unique locations and hand receipt holders from the context
  const { propertyItems } = usePropertyBook();
  
  const locations = React.useMemo(() => {
    const uniqueLocations = new Set<string>();
    propertyItems.forEach(item => uniqueLocations.add(item.location));
    return Array.from(uniqueLocations).sort();
  }, [propertyItems]);
  
  const handReceiptHolders = React.useMemo(() => {
    const uniqueHolders = new Set<string>();
    propertyItems.forEach(item => uniqueHolders.add(item.handReceiptHolder));
    return Array.from(uniqueHolders).sort();
  }, [propertyItems]);
  
  // Statuses for filtering
  const statuses = ['Serviceable', 'Unserviceable', 'Maintenance', 'Shortage', 'Missing'];
  
  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchText: event.target.value });
  };
  
  // Handle filter changes
  const handleSelectChange = (field: keyof typeof filters) => (
    event: SelectChangeEvent
  ) => {
    setFilters({ [field]: event.target.value });
  };
  
  // Handle text field changes
  const handleTextFieldChange = (field: keyof typeof filters) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilters({ [field]: event.target.value });
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    resetFilters();
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.location !== 'all') count++;
    if (filters.handReceiptHolder !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.verifiedAfter) count++;
    if (filters.verifiedBefore) count++;
    return count;
  };
  
  const activeFilterCount = getActiveFilterCount();
  
  return (
    disablePaper ? (
      <Box>
      {/* Search Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Search by nomenclature, NSN, LIN, or serial number..."
          variant="outlined"
          fullWidth
          size="small"
          value={filters.searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: filters.searchText ? (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={() => setFilters({ searchText: '' })}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        
        <Button
          startIcon={<FilterListIcon />}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={toggleExpanded}
          sx={{ ml: 2, whiteSpace: 'nowrap' }}
          color="inherit"
          variant={expanded ? "contained" : "outlined"}
        >
          Filters
          {activeFilterCount > 0 && (
            <Chip 
              label={activeFilterCount} 
              size="small" 
              sx={{ 
                ml: 1, 
                height: 18, 
                minWidth: 18, 
                fontSize: '0.65rem',
                bgcolor: expanded ? theme.palette.primary.dark : theme.palette.primary.main,
                color: 'white',
              }} 
            />
          )}
        </Button>
        
        {activeFilterCount > 0 && (
          <Button
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            sx={{ ml: 2 }}
            size="small"
          >
            Clear
          </Button>
        )}
      </Box>
      
      {/* Expanded Filters */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={filters.status}
                label="Status"
                onChange={handleSelectChange('status')}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="location-filter-label">Location</InputLabel>
              <Select
                labelId="location-filter-label"
                id="location-filter"
                value={filters.location}
                label="Location"
                onChange={handleSelectChange('location')}
              >
                <MenuItem value="all">All Locations</MenuItem>
                {locations.map(location => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="holder-filter-label">Hand Receipt Holder</InputLabel>
              <Select
                labelId="holder-filter-label"
                id="holder-filter"
                value={filters.handReceiptHolder}
                label="Hand Receipt Holder"
                onChange={handleSelectChange('handReceiptHolder')}
              >
                <MenuItem value="all">All Holders</MenuItem>
                {handReceiptHolders.map(holder => (
                  <MenuItem key={holder} value={holder}>{holder}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={filters.category}
                label="Category"
                onChange={handleSelectChange('category')}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Verified After"
              type="date"
              fullWidth
              size="small"
              value={filters.verifiedAfter}
              onChange={handleTextFieldChange('verifiedAfter')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Verified Before"
              type="date"
              fullWidth
              size="small"
              value={filters.verifiedBefore}
              onChange={handleTextFieldChange('verifiedBefore')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="outlined"
            onClick={handleClearFilters}
            size="small"
            sx={{ mr: 1 }}
          >
            Clear All
          </Button>
          <Button 
            variant="contained"
            onClick={() => setExpanded(false)}
            size="small"
          >
            Apply Filters
          </Button>
        </Box>
      </Collapse>
      </Box>
    ) : (
      <Paper sx={{ mb: 3, p: 2, borderRadius: 0 }}>
        {/* Search Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search by nomenclature, NSN, LIN, or serial number..."
            variant="outlined"
            fullWidth
            size="small"
            value={filters.searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: filters.searchText ? (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    onClick={() => setFilters({ searchText: '' })}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          
          <Button
            startIcon={<FilterListIcon />}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={toggleExpanded}
            sx={{ ml: 2, whiteSpace: 'nowrap' }}
            color="inherit"
            variant={expanded ? "contained" : "outlined"}
          >
            Filters
            {activeFilterCount > 0 && (
              <Chip 
                label={activeFilterCount} 
                size="small" 
                sx={{ 
                  ml: 1, 
                  height: 18, 
                  minWidth: 18, 
                  fontSize: '0.65rem',
                  bgcolor: expanded ? theme.palette.primary.dark : theme.palette.primary.main,
                  color: 'white',
                }} 
              />
            )}
          </Button>
          
          {activeFilterCount > 0 && (
            <Button
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              sx={{ ml: 2 }}
              size="small"
            >
              Clear
            </Button>
          )}
        </Box>
        
        {/* Expanded Filters */}
        <Collapse in={expanded}>
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={filters.status}
                  label="Status"
                  onChange={handleSelectChange('status')}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="location-filter-label">Location</InputLabel>
                <Select
                  labelId="location-filter-label"
                  id="location-filter"
                  value={filters.location}
                  label="Location"
                  onChange={handleSelectChange('location')}
                >
                  <MenuItem value="all">All Locations</MenuItem>
                  {locations.map(location => (
                    <MenuItem key={location} value={location}>{location}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="holder-filter-label">Hand Receipt Holder</InputLabel>
                <Select
                  labelId="holder-filter-label"
                  id="holder-filter"
                  value={filters.handReceiptHolder}
                  label="Hand Receipt Holder"
                  onChange={handleSelectChange('handReceiptHolder')}
                >
                  <MenuItem value="all">All Holders</MenuItem>
                  {handReceiptHolders.map(holder => (
                    <MenuItem key={holder} value={holder}>{holder}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  value={filters.category}
                  label="Category"
                  onChange={handleSelectChange('category')}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Verified After"
                type="date"
                fullWidth
                size="small"
                value={filters.verifiedAfter}
                onChange={handleTextFieldChange('verifiedAfter')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Verified Before"
                type="date"
                fullWidth
                size="small"
                value={filters.verifiedBefore}
                onChange={handleTextFieldChange('verifiedBefore')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined"
              onClick={handleClearFilters}
              size="small"
              sx={{ mr: 1 }}
            >
              Clear All
            </Button>
            <Button 
              variant="contained"
              onClick={() => setExpanded(false)}
              size="small"
            >
              Apply Filters
            </Button>
          </Box>
        </Collapse>
      </Paper>
    )
  );
};

export default FilterPanel;
