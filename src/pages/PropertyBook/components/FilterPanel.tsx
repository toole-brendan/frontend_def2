import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Button,
  Grid,
  InputAdornment,
  Typography,
  styled,
  alpha,
  Chip,
  IconButton,
  Tooltip,
  Theme,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
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

const FilterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  borderRadius: theme.shape.borderRadius,
}));

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
  },
  '&.Mui-focused': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

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

  const handleLocationChange = (event: SelectChangeEvent<unknown>) => {
    onFilterChange({ ...filters, location: event.target.value as string });
  };

  const handleHandReceiptChange = (event: SelectChangeEvent<unknown>) => {
    onFilterChange({ ...filters, handReceiptHolder: event.target.value as string });
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
    <FilterContainer>
      <Grid container spacing={2.5} alignItems="flex-end">
        {/* Search field */}
        <Grid item xs={12} md={4}>
          <StyledFormLabel>Search Equipment</StyledFormLabel>
          <TextField
            fullWidth
            placeholder="Search by name, NSN, or serial number..."
            value={filters.searchText}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.8),
                },
                '&.Mui-focused': {
                  backgroundColor: 'background.paper',
                  boxShadow: (theme: Theme) => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
            }}
          />
        </Grid>

        {/* Status filter */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <StyledFormLabel>Status</StyledFormLabel>
            <StyledSelect
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value as string })}
              displayEmpty
              size="small"
            >
              <MenuItem value="all">
                <Typography variant="body2">All Statuses</Typography>
              </MenuItem>
              <MenuItem value="Serviceable">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    size="small" 
                    label="Serviceable" 
                    sx={{ 
                      bgcolor: 'success.main',
                      color: 'success.contrastText',
                      height: 20,
                    }} 
                  />
                </Box>
              </MenuItem>
              <MenuItem value="Unserviceable">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    size="small" 
                    label="Unserviceable" 
                    sx={{ 
                      bgcolor: 'error.main',
                      color: 'error.contrastText',
                      height: 20,
                    }} 
                  />
                </Box>
              </MenuItem>
              <MenuItem value="Maintenance">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    size="small" 
                    label="Maintenance" 
                    sx={{ 
                      bgcolor: 'warning.main',
                      color: 'warning.contrastText',
                      height: 20,
                    }} 
                  />
                </Box>
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Grid>

        {/* Location dropdown */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <StyledFormLabel>Location</StyledFormLabel>
            <StyledSelect
              value={filters.location}
              onChange={handleLocationChange}
              displayEmpty
              size="small"
            >
              <MenuItem value="All Locations">All Locations</MenuItem>
              {locations.slice(1).map((location) => (
                <MenuItem key={location} value={location}>
                  <Typography variant="body2">{location}</Typography>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Grid>

        {/* Hand Receipt Holder dropdown */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <StyledFormLabel>Hand Receipt Holder</StyledFormLabel>
            <StyledSelect
              value={filters.handReceiptHolder}
              onChange={handleHandReceiptChange}
              displayEmpty
              size="small"
            >
              <MenuItem value="All Hand Receipt Holders">All Holders</MenuItem>
              {handReceiptHolders.slice(1).map((holder) => (
                <MenuItem key={holder} value={holder}>
                  <Typography variant="body2">{holder}</Typography>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Grid>

        {/* Date verified filter */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <StyledFormLabel>Verified After</StyledFormLabel>
            <TextField
              type="date"
              size="small"
              value={filters.verifiedAfter}
              onChange={(e) => onFilterChange({
                ...filters,
                verifiedAfter: e.target.value
              })}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.8),
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                    boxShadow: (theme: Theme) => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                },
              }}
            />
          </FormControl>
        </Grid>
      </Grid>

      {activeFiltersCount > 0 && (
        <Box sx={{ 
          mt: 2, 
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon fontSize="small" sx={{ color: 'primary.main' }} />
            <Typography variant="body2" color="primary">
              {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} applied
            </Typography>
          </Box>
          <Button
            variant="text"
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearAllFilters}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Clear All
          </Button>
        </Box>
      )}
    </FilterContainer>
  );
};

export default FilterPanel; 