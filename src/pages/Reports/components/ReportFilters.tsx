import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { ReportType, ReportFilter } from '../types';

interface ReportFiltersProps {
  type: ReportType;
  onFiltersChange: (filters: ReportFilter) => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({ type, onFiltersChange }) => {
  const [filters, setFilters] = useState<ReportFilter>({
    dateRange: {
      start: '',
      end: '',
    },
    status: [],
    unit: [],
    personnel: [],
    equipment: [],
  });

  const handleFilterChange = (field: keyof ReportFilter, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateChange = (field: 'start' | 'end', date: Date | null) => {
    const newDateRange = {
      ...filters.dateRange,
      [field]: date ? date.toISOString() : '',
    };
    handleFilterChange('dateRange', newDateRange);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DatePicker
        label="Start Date"
        value={filters.dateRange.start ? new Date(filters.dateRange.start) : null}
        onChange={(date) => handleDateChange('start', date)}
      />
      <DatePicker
        label="End Date"
        value={filters.dateRange.end ? new Date(filters.dateRange.end) : null}
        onChange={(date) => handleDateChange('end', date)}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          multiple
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          label="Status"
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>
      {type === 'inventory' && (
        <FormControl fullWidth>
          <InputLabel>Equipment</InputLabel>
          <Select
            multiple
            value={filters.equipment || []}
            onChange={(e) => handleFilterChange('equipment', e.target.value)}
            label="Equipment"
          >
            <MenuItem value="M4 Carbine">M4 Carbine</MenuItem>
            <MenuItem value="HMMWV">HMMWV</MenuItem>
            <MenuItem value="JLTV">JLTV</MenuItem>
            <MenuItem value="M240B">M240B</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
}; 