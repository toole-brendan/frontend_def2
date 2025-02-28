import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Stack,
  Typography,
  IconButton,
  Paper,
  Divider,
  Grid,
  Tooltip,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  FilterAlt as FilterIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  BookmarkBorder as BookmarkIcon,
  BookmarkAdded as BookmarkAddedIcon,
} from '@mui/icons-material';

// Define filter types
export interface SensitiveItemsFilter {
  category: string[];
  location: string[];
  handReceipt: string[];
  status: string[];
  searchQuery: string;
  filterLogic: 'AND' | 'OR';
}

// Define saved filter type
interface SavedFilter {
  id: string;
  name: string;
  filter: SensitiveItemsFilter;
}

interface SensitiveItemsFilterBarProps {
  onFilterChange: (filters: SensitiveItemsFilter) => void;
  categories: string[];
  locations: string[];
  handReceiptHolders: string[];
  statuses: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SensitiveItemsFilterBar: React.FC<SensitiveItemsFilterBarProps> = ({
  onFilterChange,
  categories,
  locations,
  handReceiptHolders,
  statuses,
}) => {
  // Default filter state
  const defaultFilter: SensitiveItemsFilter = {
    category: [],
    location: [],
    handReceipt: [],
    status: [],
    searchQuery: '',
    filterLogic: 'AND',
  };

  // State for current filters
  const [filters, setFilters] = useState<SensitiveItemsFilter>(defaultFilter);
  
  // State for saved filters
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  
  // State for save filter dialog
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Handle filter changes
  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFilters(prev => ({ ...prev, category: value }));
  };

  const handleLocationChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFilters(prev => ({ ...prev, location: value }));
  };

  const handleHandReceiptChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFilters(prev => ({ ...prev, handReceipt: value }));
  };

  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFilters(prev => ({ ...prev, status: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: event.target.value }));
  };

  const handleLogicChange = () => {
    setFilters(prev => ({ 
      ...prev, 
      filterLogic: prev.filterLogic === 'AND' ? 'OR' : 'AND' 
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(defaultFilter);
  };

  // Save current filter
  const handleSaveFilter = () => {
    if (saveFilterName.trim()) {
      const newSavedFilter: SavedFilter = {
        id: Date.now().toString(),
        name: saveFilterName,
        filter: { ...filters },
      };
      
      setSavedFilters(prev => [...prev, newSavedFilter]);
      setSaveFilterName('');
      setShowSaveDialog(false);
    }
  };

  // Load a saved filter
  const handleLoadFilter = (savedFilter: SavedFilter) => {
    setFilters(savedFilter.filter);
  };

  // Delete a saved filter
  const handleDeleteFilter = (id: string) => {
    setSavedFilters(prev => prev.filter(filter => filter.id !== id));
  };

  // Render selected items as chips
  const renderSelectedItems = (selected: string[]) => {
    if (selected.length === 0) return 'All';
    return selected.join(', ');
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Filter Sensitive Items
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />} 
          onClick={handleResetFilters}
          size="small"
          sx={{ mr: 1 }}
        >
          Reset
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<SaveIcon />}
          onClick={() => setShowSaveDialog(true)}
          size="small"
        >
          Save Filter
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* Search field */}
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Search Serial/NSN/Nomenclature"
            variant="outlined"
            size="small"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
        </Grid>

        {/* Category filter */}
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              multiple
              value={filters.category}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Category" />}
              renderValue={renderSelectedItems}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={filters.category.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Location filter */}
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="location-filter-label">Location</InputLabel>
            <Select
              labelId="location-filter-label"
              id="location-filter"
              multiple
              value={filters.location}
              onChange={handleLocationChange}
              input={<OutlinedInput label="Location" />}
              renderValue={renderSelectedItems}
              MenuProps={MenuProps}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox checked={filters.location.indexOf(location) > -1} />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Hand Receipt filter */}
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="hand-receipt-filter-label">Hand Receipt</InputLabel>
            <Select
              labelId="hand-receipt-filter-label"
              id="hand-receipt-filter"
              multiple
              value={filters.handReceipt}
              onChange={handleHandReceiptChange}
              input={<OutlinedInput label="Hand Receipt" />}
              renderValue={renderSelectedItems}
              MenuProps={MenuProps}
            >
              {handReceiptHolders.map((holder) => (
                <MenuItem key={holder} value={holder}>
                  <Checkbox checked={filters.handReceipt.indexOf(holder) > -1} />
                  <ListItemText primary={holder} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Status filter */}
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              multiple
              value={filters.status}
              onChange={handleStatusChange}
              input={<OutlinedInput label="Status" />}
              renderValue={renderSelectedItems}
              MenuProps={MenuProps}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={filters.status.indexOf(status) > -1} />
                  <ListItemText primary={status} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Filter logic toggle */}
        <Grid item xs={12} md={1}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogicChange}
            sx={{ height: '40px' }}
          >
            {filters.filterLogic === 'AND' ? 'AND' : 'OR'}
          </Button>
        </Grid>
      </Grid>

      {/* Saved filters section */}
      {savedFilters.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            Saved Filters
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {savedFilters.map((savedFilter) => (
              <Chip
                key={savedFilter.id}
                label={savedFilter.name}
                onClick={() => handleLoadFilter(savedFilter)}
                onDelete={() => handleDeleteFilter(savedFilter.id)}
                icon={<BookmarkIcon />}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Save filter dialog */}
      {showSaveDialog && (
        <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Save Current Filter
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              label="Filter Name"
              value={saveFilterName}
              onChange={(e) => setSaveFilterName(e.target.value)}
              fullWidth
            />
            <Button 
              variant="contained" 
              onClick={handleSaveFilter}
              disabled={!saveFilterName.trim()}
            >
              Save
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setShowSaveDialog(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default SensitiveItemsFilterBar; 