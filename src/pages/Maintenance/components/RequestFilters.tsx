import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  useTheme,
  SelectChangeEvent,
  Divider
} from '@mui/material';
import {
  FilterAlt as FilterIcon,
  Save as SaveIcon,
  Refresh as ResetIcon
} from '@mui/icons-material';
import { cardSx, actionButtonSx } from '../styles';
import { CardHeader, StatusChip } from '../../../components/common';

interface RequestFiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = ({ onFilterChange }) => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    requestType: 'all',
    priority: 'all',
    status: 'all',
    equipmentType: 'all',
    dateRange: 'thisMonth'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Update active filters
    const updatedFilters = { ...filters, [name]: value };
    const active = Object.entries(updatedFilters)
      .filter(([_, value]) => value !== 'all')
      .map(([key, value]) => `${key}:${value}`);
    
    setActiveFilters(active);
    onFilterChange(updatedFilters);
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    const [name] = filterToRemove.split(':');
    const updatedFilters = { ...filters, [name]: 'all' };
    
    setFilters(updatedFilters);
    
    const active = activeFilters.filter(filter => filter !== filterToRemove);
    setActiveFilters(active);
    
    onFilterChange(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      requestType: 'all',
      priority: 'all',
      status: 'all',
      equipmentType: 'all',
      dateRange: 'thisMonth'
    };
    
    setFilters(resetFilters);
    setActiveFilters([]);
    onFilterChange(resetFilters);
  };

  const getFilterLabel = (filter: string): string => {
    const [name, value] = filter.split(':');
    
    const filterNames: Record<string, string> = {
      requestType: 'Type',
      priority: 'Priority',
      status: 'Status',
      equipmentType: 'Equipment',
      dateRange: 'Date'
    };
    
    const valueLabels: Record<string, Record<string, string>> = {
      requestType: {
        scheduledService: 'Scheduled Service',
        repair: 'Repair',
        pmcsFault: 'PMCS Fault',
        inspection: 'Inspection'
      },
      priority: {
        emergency: 'Emergency',
        urgent: 'Urgent',
        routine: 'Routine'
      },
      status: {
        pending: 'Pending',
        approved: 'Approved',
        inProgress: 'In Progress',
        parts: 'Awaiting Parts',
        complete: 'Complete'
      },
      equipmentType: {
        vehicles: 'Vehicles',
        weapons: 'Weapons',
        communications: 'Communications',
        electronics: 'Electronics'
      },
      dateRange: {
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        last30Days: 'Last 30 Days',
        custom: 'Custom'
      }
    };
    
    return `${filterNames[name]}: ${valueLabels[name]?.[value] || value}`;
  };

  return (
    <Paper 
      sx={{ 
        ...cardSx(theme),
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&::before': {
          top: 0,
          left: 0,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        },
        '&::after': {
          bottom: 0,
          left: 0,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        }
      }}
    >
      <CardHeader 
        title="Maintenance Request Filters"
        action={<FilterIcon color="primary" />}
      />
      
      <Stack spacing={2}>
        <FormControl size="small" fullWidth>
          <InputLabel id="request-type-label">Request Type</InputLabel>
          <Select
            labelId="request-type-label"
            id="request-type"
            name="requestType"
            value={filters.requestType}
            label="Request Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="scheduledService">Scheduled Service</MenuItem>
            <MenuItem value="repair">Repair</MenuItem>
            <MenuItem value="pmcsFault">PMCS Fault</MenuItem>
            <MenuItem value="inspection">Inspection</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" fullWidth>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            name="priority"
            value={filters.priority}
            label="Priority"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="emergency">Emergency</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
            <MenuItem value="routine">Routine</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={filters.status}
            label="Status"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="parts">Awaiting Parts</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" fullWidth>
          <InputLabel id="equipment-type-label">Equipment Type</InputLabel>
          <Select
            labelId="equipment-type-label"
            id="equipment-type"
            name="equipmentType"
            value={filters.equipmentType}
            label="Equipment Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Equipment</MenuItem>
            <MenuItem value="vehicles">Vehicles</MenuItem>
            <MenuItem value="weapons">Weapons</MenuItem>
            <MenuItem value="communications">Communications</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" fullWidth>
          <InputLabel id="date-range-label">Date Range</InputLabel>
          <Select
            labelId="date-range-label"
            id="date-range"
            name="dateRange"
            value={filters.dateRange}
            label="Date Range"
            onChange={handleFilterChange}
          >
            <MenuItem value="thisWeek">This Week</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="last30Days">Last 30 Days</MenuItem>
            <MenuItem value="custom">Custom...</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      
      {activeFilters.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 'medium',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 20,
                  height: 2,
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              Active Filters
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {activeFilters.map((filter) => (
                <StatusChip
                  key={filter}
                  label={getFilterLabel(filter)}
                  status="default"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        </>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          startIcon={<ResetIcon />}
          variant="outlined"
          size="small"
          onClick={handleResetFilters}
          sx={actionButtonSx(theme)}
        >
          Reset
        </Button>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          size="small"
          sx={actionButtonSx(theme)}
        >
          Save Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default RequestFilters; 