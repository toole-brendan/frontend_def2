import React, { useState, useCallback } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Tooltip, Button, ButtonGroup, useTheme, alpha, CircularProgress, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Info as InfoIcon } from '@mui/icons-material';
import { CriticalEquipmentStatusTableProps } from '../types';

export const CriticalEquipmentStatusTable: React.FC<CriticalEquipmentStatusTableProps> = ({
  equipment
}) => {
  const theme = useTheme();
  const [filter, setFilter] = useState<'all' | 'issues'>('all');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  
  // Filter equipment based on search query and selected filter
  const filteredEquipment = useCallback(() => {
    let filtered = equipment;
    
    // Apply filter (all or issues only)
    if (filter === 'issues') {
      filtered = filtered.filter(item => item.status !== 'FMC');
    }
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.equipment.toLowerCase().includes(query) ||
        item.serialBumper.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.issue.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [equipment, filter, searchQuery]);
  
  // Handle filter change
  const handleFilterChange = useCallback((newFilter: 'all' | 'issues') => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setFilter(newFilter);
      setLoading(false);
    }, 300);
  }, []);
  
  // Handle row click
  const handleRowClick = useCallback((index: number) => {
    setSelectedRow(selectedRow === index ? null : index);
  }, [selectedRow]);
  
  // Handle action button click
  const handleActionClick = useCallback((action: string, item: any) => {
    console.log(`Action: ${action} for item: ${item.equipment}`);
    // In a real app, this would trigger a modal or navigation
  }, []);
  
  // Get status color and icon based on status
  const getStatusChip = (status: string) => {
    let color: 'success' | 'warning' | 'error' | 'info' = 'info';
    let icon: string;
    let label: string = status;
    
    switch (status) {
      case 'FMC':
        color = 'success';
        icon = '✓';
        label = 'Fully Mission Capable';
        break;
      case 'PMC':
        color = 'warning';
        icon = '⚠️';
        label = 'Partially Mission Capable';
        break;
      case 'NMC':
        color = 'error';
        icon = '❌';
        label = 'Not Mission Capable';
        break;
      case 'In Process':
        color = 'info';
        icon = '⟳';
        label = 'In Process';
        break;
      default:
        color = 'info';
        icon = '?';
    }
    
    return (
      <Tooltip title={label}>
        <Chip 
          label={`${icon} ${status}`} 
          color={color} 
          size="small"
          sx={{ 
            fontWeight: 'medium',
            height: 24,
            '& .MuiChip-label': { px: 1 }
          }}
        />
      </Tooltip>
    );
  };
  
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Critical Equipment Status
          </Typography>
          <Tooltip title="Shows equipment requiring action or attention. Overdue items are highlighted in red, today's items in yellow.">
            <InfoIcon fontSize="small" sx={{ ml: 1, color: theme.palette.text.secondary }} />
          </Tooltip>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search equipment..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: { height: 36 }
            }}
            sx={{ width: 220 }}
          />
          
          <ButtonGroup size="small" variant="outlined">
            <Button 
              onClick={() => handleFilterChange('all')}
              variant={filter === 'all' ? 'contained' : 'outlined'}
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              All Items
            </Button>
            <Button 
              onClick={() => handleFilterChange('issues')}
              variant={filter === 'issues' ? 'contained' : 'outlined'}
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Issues Only
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      
      {/* Equipment Table or Loading */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              <TableCell>Equipment</TableCell>
              <TableCell>Serial/Bumper#</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell>Action Required</TableCell>
              <TableCell>Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEquipment().length > 0 ? (
              filteredEquipment().map((item, index) => (
                <TableRow 
                  key={index} 
                  hover
                  onClick={() => handleRowClick(index)}
                  selected={selectedRow === index}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: 
                      item.due === 'OVERDUE' 
                        ? alpha(theme.palette.error.main, 0.08) 
                        : item.due === 'TODAY' 
                          ? alpha(theme.palette.warning.main, 0.08)
                          : 'inherit',
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                      },
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 'medium' }}>
                    {item.equipment}
                  </TableCell>
                  <TableCell>{item.serialBumper}</TableCell>
                  <TableCell>{getStatusChip(item.status)}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(item.actionRequired, item);
                      }}
                      sx={{ 
                        textTransform: 'none',
                        minWidth: 130
                      }}
                    >
                      {item.actionRequired}
                    </Button>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'medium',
                      color: 
                        item.due === 'OVERDUE' 
                          ? theme.palette.error.main
                          : item.due === 'TODAY'
                            ? theme.palette.warning.main
                            : theme.palette.text.primary
                    }}
                  >
                    {item.due}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No matching equipment found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      )}
      
      {/* Table Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Showing {filteredEquipment().length} of {equipment.length} equipment items
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Click on a row to select it
        </Typography>
      </Box>
    </Paper>
  );
};
