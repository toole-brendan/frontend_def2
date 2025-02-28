import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  IconButton,
  Button,
  ButtonGroup,
  useTheme
} from '@mui/material';
import { CriticalEquipmentStatusTableProps } from '../types';

export const CriticalEquipmentStatusTable: React.FC<CriticalEquipmentStatusTableProps> = ({
  equipment
}) => {
  const theme = useTheme();
  const [filter, setFilter] = useState<'all' | 'issues'>('all');
  
  // Get status color and icon based on status
  const getStatusChip = (status: string) => {
    let color: 'success' | 'warning' | 'error' | 'default' = 'default';
    let icon = '';
    
    switch (status) {
      case 'FMC':
        color = 'success';
        icon = '✓';
        break;
      case 'PMC':
        color = 'warning';
        icon = '⚠️';
        break;
      case 'NMC':
        color = 'error';
        icon = '❌';
        break;
      default:
        color = 'default';
    }
    
    return (
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
    );
  };
  
  // Filter equipment based on selected filter
  const filteredEquipment = filter === 'all' 
    ? equipment 
    : equipment.filter(item => item.status !== 'FMC');
  
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Critical Equipment Status
        </Typography>
        
        <ButtonGroup size="small" variant="outlined">
          <Button 
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'outlined'}
          >
            All
          </Button>
          <Button 
            onClick={() => setFilter('issues')}
            variant={filter === 'issues' ? 'contained' : 'outlined'}
          >
            Issues Only
          </Button>
        </ButtonGroup>
      </Box>
      
      {/* Equipment Table */}
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
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
            {filteredEquipment.map((item, index) => (
              <TableRow 
                key={index} 
                hover
                sx={{
                  backgroundColor: 
                    item.due === 'OVERDUE' 
                      ? alpha(theme.palette.error.light, 0.1) 
                      : item.due === 'TODAY' 
                        ? alpha(theme.palette.warning.light, 0.1)
                        : 'inherit'
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
                    fullWidth
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Helper function to handle alpha transparency
function alpha(color: string, value: number): string {
  return color ? color.replace(')', `, ${value})`) : '';
} 