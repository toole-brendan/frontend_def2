import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { CommandActionItemsCardProps } from '../types';

export const CommandActionItemsCard: React.FC<CommandActionItemsCardProps> = ({
  actions,
  onViewAllActions
}) => {
  // Helper function to render priority indicator
  const renderPriorityIndicator = (priority: string) => {
    let color: 'error' | 'warning' | 'success' = 'success';
    let icon = '⚠️';
    
    switch (priority) {
      case 'HIGH':
        color = 'error';
        break;
      case 'MEDIUM':
        color = 'warning';
        break;
      default:
        color = 'success';
        icon = '✓';
    }
    
    return (
      <Chip 
        label={`${icon} ${priority}`} 
        color={color} 
        size="small"
        sx={{ 
          fontWeight: 'bold',
          height: 24,
          '& .MuiChip-label': { px: 1 }
        }}
      />
    );
  };

  // Helper function for deadline styling
  const getDeadlineStyling = (deadline: string) => {
    if (deadline === 'TODAY') {
      return { color: 'warning.main', fontWeight: 'bold' };
    }
    if (deadline === 'OVERDUE') {
      return { color: 'error.main', fontWeight: 'bold' };
    }
    return { color: 'text.primary' };
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Requires Your Action ({actions.length})
        </Typography>
      </Box>

      {/* Actions Table */}
      <TableContainer sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="15%">Priority</TableCell>
              <TableCell width="25%">Item</TableCell>
              <TableCell width="15%">Type</TableCell>
              <TableCell width="15%">Deadline</TableCell>
              <TableCell width="30%">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  {renderPriorityIndicator(action.priority)}
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>
                  {action.item}
                </TableCell>
                <TableCell>
                  {action.type}
                </TableCell>
                <TableCell sx={getDeadlineStyling(action.deadline)}>
                  {action.deadline}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="primary"
                    fullWidth
                  >
                    {action.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View All Button */}
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        onClick={onViewAllActions}
      >
        View All Pending Actions
      </Button>
    </Paper>
  );
}; 