import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { InventoryFilters as InventoryFiltersType } from '../types';

interface InventoryFiltersProps {
  filters: InventoryFiltersType;
  onFilterChange: (filters: InventoryFiltersType) => void;
  onSaveFilter: () => void;
  onClearFilters: () => void;
}

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'in_use', label: 'In Use' },
  { value: 'under_maintenance', label: 'Under Maintenance' },
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'weapons', label: 'Weapons' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'comms', label: 'Comms' },
  { value: 'optics', label: 'Optics' },
];

const LOCATION_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'arms_room', label: 'Arms Room' },
  { value: 'motor_pool', label: 'Motor Pool' },
  { value: 'supply_room', label: 'Supply Room' },
];

const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  filters,
  onFilterChange,
  onSaveFilter,
  onClearFilters,
}) => {
  const handleTextChange = (field: keyof InventoryFiltersType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value,
    });
  };

  const handleSelectChange = (field: keyof InventoryFiltersType) => (
    event: SelectChangeEvent
  ) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value,
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <FormControl sx={{ flexGrow: 1 }} size="small">
        <TextField
          fullWidth
          size="small"
          placeholder="Search by Item Name, Serial Number, or NSN..."
          value={filters.search}
          onChange={handleTextChange('search')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={handleSelectChange('status')}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          label="Category"
          onChange={handleSelectChange('category')}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Location</InputLabel>
        <Select
          value={filters.location}
          label="Location"
          onChange={handleSelectChange('location')}
        >
          {LOCATION_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Save current filters">
          <IconButton onClick={onSaveFilter} color="primary">
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear all filters">
          <IconButton onClick={onClearFilters} color="error">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default InventoryFilters; 