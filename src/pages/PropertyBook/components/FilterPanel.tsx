import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  Collapse,
  Divider,
  IconButton,
  Grid,
  Chip,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

// Define the filter state type
export interface PropertyFilters {
  status: string;
  location: string;
  handReceiptHolder: string;
  searchText: string;
  category: string;
  verifiedAfter: string;
  verifiedBefore: string;
}

interface FilterPanelProps {
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
  selectedCategory: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  selectedCategory,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock data for dropdowns
  const locations = [
    'All Locations',
    'Arms Room',
    'Motor Pool',
    'Supply Room',
    'Comms Room',
    'Issued',
    'Field Training',
  ];

  const handReceiptHolders = [
    'All Hand Receipt Holders',
    'CPT Rodriguez (Primary)',
    '1LT Chen (1PLT)',
    'SFC Martinez (2PLT)',
    'SFC Taylor (3PLT)',
    'SSG Wilson (HQ PLT)',
    'SGT Adams (Supply)',
    'SSG Thompson (Commo)',
  ];

  // Handle filter changes
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, status: event.target.value });
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, location: event.target.value });
  };

  const handleHandReceiptChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, handReceiptHolder: event.target.value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchText: event.target.value });
  };

  const handleDateChange = (field: 'verifiedAfter' | 'verifiedBefore') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({ ...filters, [field]: event.target.value });
  };

  const clearAllFilters = () => {
    onFilterChange({
      status: 'all',
      location: 'All Locations',
      handReceiptHolder: 'All Hand Receipt Holders',
      searchText: '',
      category: selectedCategory,
      verifiedAfter: '',
      verifiedBefore: '',
    });
  };

  // Count active filters (excluding default values)
  const activeFiltersCount = [
    filters.status !== 'all',
    filters.location !== 'All Locations',
    filters.handReceiptHolder !== 'All Hand Receipt Holders',
    filters.searchText !== '',
    filters.verifiedAfter !== '',
    filters.verifiedBefore !== '',
  ].filter(Boolean).length;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          Filters
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} active`}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<ClearIcon />}
          onClick={clearAllFilters}
          disabled={activeFiltersCount === 0}
        >
          Clear All
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* Search field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by item name, NSN, or serial number..."
            value={filters.searchText}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Status radio buttons */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontSize: '0.75rem' }}>
              Status
            </FormLabel>
            <RadioGroup
              row
              name="status-filter"
              value={filters.status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="all"
                control={<Radio size="small" />}
                label="All"
              />
              <FormControlLabel
                value="serviceable"
                control={<Radio size="small" />}
                label="Serviceable"
              />
              <FormControlLabel
                value="unserviceable"
                control={<Radio size="small" />}
                label="Unserviceable"
              />
              <FormControlLabel
                value="shortages"
                control={<Radio size="small" />}
                label="Shortages"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Location dropdown */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <FormLabel component="legend" sx={{ fontSize: '0.75rem', mb: 1 }}>
              Location
            </FormLabel>
            <Select
              value={filters.location}
              onChange={handleLocationChange}
              displayEmpty
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Hand Receipt Holder dropdown */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <FormLabel component="legend" sx={{ fontSize: '0.75rem', mb: 1 }}>
              Hand Receipt Holder
            </FormLabel>
            <Select
              value={filters.handReceiptHolder}
              onChange={handleHandReceiptChange}
              displayEmpty
            >
              {handReceiptHolders.map((holder) => (
                <MenuItem key={holder} value={holder}>
                  {holder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Advanced filters toggle */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="text"
          size="small"
          onClick={() => setShowAdvanced(!showAdvanced)}
          endIcon={showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ textTransform: 'none' }}
        >
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </Button>
      </Box>

      {/* Advanced filters section */}
      <Collapse in={showAdvanced}>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          {/* Verification date range */}
          <Grid item xs={12} md={6}>
            <FormLabel component="legend" sx={{ fontSize: '0.75rem', mb: 1 }}>
              Verified After
            </FormLabel>
            <TextField
              type="date"
              fullWidth
              size="small"
              value={filters.verifiedAfter}
              onChange={handleDateChange('verifiedAfter')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel component="legend" sx={{ fontSize: '0.75rem', mb: 1 }}>
              Verified Before
            </FormLabel>
            <TextField
              type="date"
              fullWidth
              size="small"
              value={filters.verifiedBefore}
              onChange={handleDateChange('verifiedBefore')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Active filter chips display */}
        {activeFiltersCount > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Active Filters:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {filters.status !== 'all' && (
                <Chip
                  label={`Status: ${filters.status}`}
                  size="small"
                  onDelete={() => onFilterChange({ ...filters, status: 'all' })}
                />
              )}
              {filters.location !== 'All Locations' && (
                <Chip
                  label={`Location: ${filters.location}`}
                  size="small"
                  onDelete={() => onFilterChange({ ...filters, location: 'All Locations' })}
                />
              )}
              {filters.handReceiptHolder !== 'All Hand Receipt Holders' && (
                <Chip
                  label={`Hand Receipt: ${filters.handReceiptHolder.split(' ')[0]}`}
                  size="small"
                  onDelete={() => onFilterChange({ ...filters, handReceiptHolder: 'All Hand Receipt Holders' })}
                />
              )}
              {filters.verifiedAfter && (
                <Chip
                  label={`Verified After: ${filters.verifiedAfter}`}
                  size="small"
                  onDelete={() => onFilterChange({ ...filters, verifiedAfter: '' })}
                />
              )}
              {filters.verifiedBefore && (
                <Chip
                  label={`Verified Before: ${filters.verifiedBefore}`}
                  size="small"
                  onDelete={() => onFilterChange({ ...filters, verifiedBefore: '' })}
                />
              )}
              {selectedCategory !== 'all' && (
                <Chip
                  label={`Category: ${selectedCategory}`}
                  size="small"
                  color="primary"
                />
              )}
            </Stack>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
};

export default FilterPanel; 