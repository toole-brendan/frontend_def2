import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Divider,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EquipmentCategory } from '../../../types/property';

interface EquipmentSearchFilterProps {
  onFilterChange: (filters: EquipmentFilters) => void;
}

export interface EquipmentFilters {
  searchQuery: string;
  authorization: 'MTOE' | 'TDA' | 'CTA' | 'ALL';
  handReceipt: 'PRIMARY' | 'SUB_HR' | 'COMPONENT_HR' | 'ALL';
  category: EquipmentCategory | 'ALL';
  status: 'SIGNED_FOR' | 'PENDING_TRANSFER' | 'FLIPL_ITEMS' | 'SHORTAGES' | 'ALL';
}

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const EquipmentSearchFilter: React.FC<EquipmentSearchFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<EquipmentFilters>({
    searchQuery: '',
    authorization: 'ALL',
    handReceipt: 'ALL',
    category: 'ALL',
    status: 'ALL',
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      searchQuery: event.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAuthorizationChange = (
    _: React.MouseEvent<HTMLElement>,
    newAuthorization: 'MTOE' | 'TDA' | 'CTA' | 'ALL',
  ) => {
    if (newAuthorization !== null) {
      const newFilters = {
        ...filters,
        authorization: newAuthorization,
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const handleHandReceiptChange = (
    _: React.MouseEvent<HTMLElement>,
    newHandReceipt: 'PRIMARY' | 'SUB_HR' | 'COMPONENT_HR' | 'ALL',
  ) => {
    if (newHandReceipt !== null) {
      const newFilters = {
        ...filters,
        handReceipt: newHandReceipt,
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newFilters = {
      ...filters,
      category: event.target.value as EquipmentCategory | 'ALL',
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newFilters = {
      ...filters,
      status: event.target.value as 'SIGNED_FOR' | 'PENDING_TRANSFER' | 'FLIPL_ITEMS' | 'SHORTAGES' | 'ALL',
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <FilterSection>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <FilterListIcon sx={{ mr: 1 }} />
        Equipment Search & Filter
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={3}>
        {/* Search Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search by NSN, LIN, Serial Number, or Nomenclature"
            variant="outlined"
            size="small"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* Authorization Filter */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            By Authorization
          </Typography>
          <ToggleButtonGroup
            value={filters.authorization}
            exclusive
            onChange={handleAuthorizationChange}
            aria-label="authorization filter"
            size="small"
            fullWidth
          >
            <ToggleButton value="ALL" aria-label="all authorizations">
              ALL
            </ToggleButton>
            <ToggleButton value="MTOE" aria-label="mtoe">
              MTOE
            </ToggleButton>
            <ToggleButton value="TDA" aria-label="tda">
              TDA
            </ToggleButton>
            <ToggleButton value="CTA" aria-label="cta">
              CTA
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        
        {/* Hand Receipt Filter */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            By Hand Receipt
          </Typography>
          <ToggleButtonGroup
            value={filters.handReceipt}
            exclusive
            onChange={handleHandReceiptChange}
            aria-label="hand receipt filter"
            size="small"
            fullWidth
          >
            <ToggleButton value="ALL" aria-label="all hand receipts">
              ALL
            </ToggleButton>
            <ToggleButton value="PRIMARY" aria-label="primary">
              Primary
            </ToggleButton>
            <ToggleButton value="SUB_HR" aria-label="sub-hr">
              Sub-HR
            </ToggleButton>
            <ToggleButton value="COMPONENT_HR" aria-label="component-hr">
              Component HR
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        
        {/* Category Filter */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-filter-label">By Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={filters.category}
              label="By Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="ALL">All Categories</MenuItem>
              <MenuItem value="WEAPONS">Arms/Weapons</MenuItem>
              <MenuItem value="ROLLING_STOCK">Vehicles</MenuItem>
              <MenuItem value="COMMS_CCI">Comms</MenuItem>
              <MenuItem value="OPTICS_NVGS">Optics</MenuItem>
              <MenuItem value="TPE_ITEMS">TPE Items</MenuItem>
              <MenuItem value="COEI_BII">COEI/BII</MenuItem>
              <MenuItem value="CTA_50">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Status Filter */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">By Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={filters.status}
              label="By Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="ALL">All Statuses</MenuItem>
              <MenuItem value="SIGNED_FOR">Signed For</MenuItem>
              <MenuItem value="PENDING_TRANSFER">Pending Transfer</MenuItem>
              <MenuItem value="FLIPL_ITEMS">FLIPL Items</MenuItem>
              <MenuItem value="SHORTAGES">Shortages</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </FilterSection>
  );
};

export default EquipmentSearchFilter; 