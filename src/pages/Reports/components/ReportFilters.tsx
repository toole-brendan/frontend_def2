import React, { useState } from 'react';
import { Box, Paper, TextField, MenuItem, FormControl, InputLabel, Select, Chip, OutlinedInput, Button, IconButton, Grid, useTheme, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material';
import { ReportType, ReportStatus, FilterConfig } from '../types';
import { paperSx, buttonSx } from '../styles';
import { reportTypeOptions, reportStatusOptions } from '../mockData';

interface ReportFiltersProps {
  onFilterChange: (filters: FilterConfig) => void;
  initialFilters?: Partial<FilterConfig>;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  onFilterChange,
  initialFilters
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<FilterConfig>({
    status: initialFilters?.status || [],
    type: initialFilters?.type || [],
    dateRange: initialFilters?.dateRange || { start: null, end: null },
    searchTerm: initialFilters?.searchTerm || ''
  });
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      searchTerm: event.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (event: SelectChangeEvent<ReportStatus[]>) => {
    const newFilters = {
      ...filters,
      status: event.target.value as ReportStatus[]
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (event: SelectChangeEvent<ReportType[]>) => {
    const newFilters = {
      ...filters,
      type: event.target.value as ReportType[]
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStartDateChange = (date: Date | null) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        start: date ? date.toISOString() : null
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleEndDateChange = (date: Date | null) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        end: date ? date.toISOString() : null
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const newFilters: FilterConfig = {
      status: [],
      type: [],
      dateRange: { start: null, end: null },
      searchTerm: ''
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: expanded ? 2 : 0 }}>
          <TextField
            placeholder="Search reports..."
            variant="outlined"
            size="small"
            fullWidth
            value={filters.searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
              endAdornment: filters.searchTerm && (
                <IconButton size="small" onClick={() => {
                  const newFilters = { ...filters, searchTerm: '' };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              )
            }}
            sx={{ mr: 2 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={toggleExpanded}
            sx={buttonSx}
          >
            {expanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
        
        {expanded && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  multiple
                  value={filters.status}
                  onChange={handleStatusChange}
                  input={<OutlinedInput label="Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={reportStatusOptions.find(option => option.value === value)?.label} 
                          size="small" 
                        />
                      ))}
                    </Box>
                  )}
                >
                  {reportStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="type-filter-label">Report Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  id="type-filter"
                  multiple
                  value={filters.type}
                  onChange={handleTypeChange}
                  input={<OutlinedInput label="Report Type" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={reportTypeOptions.find(option => option.value === value)?.label} 
                          size="small" 
                        />
                      ))}
                    </Box>
                  )}
                >
                  {reportTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="From Date"
                  value={filters.dateRange.start ? new Date(filters.dateRange.start) : null}
                  onChange={handleStartDateChange}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To Date"
                  value={filters.dateRange.end ? new Date(filters.dateRange.end) : null}
                  onChange={handleEndDateChange}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{ ...buttonSx, mr: 1 }}
                >
                  Reset Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default ReportFilters; 