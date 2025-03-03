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
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { CommandActionItemsCardProps } from '../types';
import { cardWithCornerSx, sectionHeaderSx, buttonSx, chipSx, tableHeadCellSx, tableCellSx } from '../styles';
import { getPriorityColor } from '../utils';

export const CommandActionItemsCard: React.FC<CommandActionItemsCardProps> = ({
  actions,
  onViewAllActions
}) => {
  const theme = useTheme();
  
  // Helper function to render priority indicator
  const renderPriorityIndicator = (priority: string) => {
    const priorityColor = getPriorityColor(priority, theme);
    const icon = priority.toUpperCase() === 'LOW' ? '✓' : '⚠️';
    
    return (
      <Chip 
        label={`${icon} ${priority}`} 
        size="small"
        sx={chipSx(theme, priorityColor)}
      />
    );
  };

  // Helper function for deadline styling
  const getDeadlineStyling = (deadline: string) => {
    if (deadline === 'TODAY') {
      return { 
        color: theme.palette.warning.main, 
        fontWeight: 'bold',
        fontFamily: 'monospace'
      };
    }
    if (deadline === 'OVERDUE') {
      return { 
        color: theme.palette.error.main, 
        fontWeight: 'bold',
        fontFamily: 'monospace'
      };
    }
    return { 
      color: 'text.primary',
      fontFamily: 'monospace'
    };
  };

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))}
    >
      <Box sx={{ p: 2 }}>
        {/* Card Header */}
        <Typography variant="h6" sx={sectionHeaderSx}>
          Requires Your Action ({actions.length})
        </Typography>

        {/* Actions Table */}
        <TableContainer sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width="15%" sx={tableHeadCellSx}>Priority</TableCell>
                <TableCell width="25%" sx={tableHeadCellSx}>Item</TableCell>
                <TableCell width="15%" sx={tableHeadCellSx}>Type</TableCell>
                <TableCell width="15%" sx={tableHeadCellSx}>Deadline</TableCell>
                <TableCell width="30%" sx={tableHeadCellSx}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actions.map((action, index) => (
                <TableRow 
                  key={index} 
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  <TableCell sx={tableCellSx}>
                    {renderPriorityIndicator(action.priority)}
                  </TableCell>
                  <TableCell sx={{
                    ...tableCellSx,
                    fontWeight: 'medium',
                    fontSize: '0.8rem',
                  }}>
                    {action.item}
                  </TableCell>
                  <TableCell sx={{
                    ...tableCellSx,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}>
                    {action.type}
                  </TableCell>
                  <TableCell sx={{
                    ...tableCellSx,
                    ...getDeadlineStyling(action.deadline),
                    fontSize: '0.75rem',
                  }}>
                    {action.deadline}
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      color="primary"
                      fullWidth
                      sx={{
                        ...buttonSx,
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                      }}
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
          sx={buttonSx}
        >
          View All Pending Actions
        </Button>
      </Box>
    </Paper>
  );
};
