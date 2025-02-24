import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { TransferFilters as TransferFiltersType, TransferStatus } from '../types';

interface TransferFiltersProps {
  filters: TransferFiltersType;
  onFiltersChange: (filters: TransferFiltersType) => void;
}

const TransferFilters: React.FC<TransferFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleStatusChange = (event: SelectChangeEvent<TransferStatus[]>) => {
    onFiltersChange({
      ...filters,
      status: event.target.value as TransferStatus[],
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchTerm: event.target.value,
    });
  };

  const handleClearSearch = () => {
    onFiltersChange({
      ...filters,
      searchTerm: '',
    });
  };

  const handleStartDateChange = (date: Date | null) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        start: date || new Date(),
        end: filters.dateRange?.end || new Date(),
      },
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        start: filters.dateRange?.start || new Date(),
        end: date || new Date(),
      },
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search"
            value={filters.searchTerm || ''}
            onChange={handleSearchChange}
            placeholder="Search by ID, Name, or Item"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: filters.searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClearSearch}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              multiple
              value={filters.status || []}
              onChange={handleStatusChange}
              label="Status"
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="AWAITING_APPROVAL">Awaiting Approval</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2.5}>
          <DatePicker
            label="Start Date"
            value={filters.dateRange?.start || null}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'medium',
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={2.5}>
          <DatePicker
            label="End Date"
            value={filters.dateRange?.end || null}
            onChange={handleEndDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'medium',
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransferFilters; 