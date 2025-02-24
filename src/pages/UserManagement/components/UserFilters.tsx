import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';

const ROLES = ['All', 'Officer', 'NCO', 'Supply Sergeant', 'Soldier'];
const STATUSES = ['All', 'Active', 'Inactive', 'Pending'];
const RANKS = ['All', 'LT', 'CPT', 'MAJ', 'SGT', 'SSG', 'SFC', 'MSG', 'PVT', 'SPC'];

interface UserFiltersProps {
  onFiltersChange?: (filters: UserFiltersState) => void;
}

interface UserFiltersState {
  role: string;
  status: string;
  rank: string;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<UserFiltersState>({
    role: 'All',
    status: 'All',
    rank: 'All',
  });

  const handleFilterChange = (field: keyof UserFiltersState) => (event: SelectChangeEvent) => {
    const newFilters = {
      ...filters,
      [field]: event.target.value,
    };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const handleResetFilters = () => {
    const resetFilters = {
      role: 'All',
      status: 'All',
      rank: 'All',
    };
    setFilters(resetFilters);
    if (onFiltersChange) {
      onFiltersChange(resetFilters);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Role</InputLabel>
        <Select
          value={filters.role}
          label="Role"
          onChange={handleFilterChange('role')}
        >
          {ROLES.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={handleFilterChange('status')}
        >
          {STATUSES.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Rank</InputLabel>
        <Select
          value={filters.rank}
          label="Rank"
          onChange={handleFilterChange('rank')}
        >
          {RANKS.map((rank) => (
            <MenuItem key={rank} value={rank}>
              {rank}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Button
          variant="contained"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}; 