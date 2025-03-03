import React, { useState, useCallback } from 'react';
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
  useTheme,
  CircularProgress,
  Tooltip,
  Badge,
  IconButton,
  Collapse
} from '@mui/material';
import { 
  Info as InfoIcon, 
  KeyboardArrowUp as ExpandLessIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { CommandActionItemsCardProps } from '../types';
import { cardWithCornerSx, sectionHeaderSx, buttonSx, chipSx, tableHeadCellSx, tableCellSx } from '../styles';
import { getPriorityColor } from '../utils';

export const CommandActionItemsCard: React.FC<CommandActionItemsCardProps> = ({
  actions,
  onViewAllActions
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  
  // Count of high priority items
  const highPriorityCount = actions.filter(action => 
    action.priority === 'HIGH' || action.deadline === 'OVERDUE' || action.deadline === 'TODAY'
  ).length;
  
  // Refresh actions (simulate API call)
  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  
  // Handle action button click
  const handleActionClick = useCallback((index: number) => {
    setSelectedAction(index);
    // In a real app, this would trigger a modal or navigation
    console.log(`Action taken on: ${actions[index].item}`);
    
    // Simulate completion after delay
    setTimeout(() => {
      setSelectedAction(null);
    }, 1500);
  }, [actions]);
  
  // Helper function to render priority indicator
  const renderPriorityIndicator = (priority: string) => {
    const priorityColor = getPriorityColor(priority, theme);
    const icon = priority.toUpperCase() === 'LOW' ? '✓' : priority.toUpperCase() === 'HIGH' ? '⚠️' : '!';
    const tooltipText = priority.toUpperCase() === 'HIGH' 
      ? 'High priority action required immediately' 
      : priority.toUpperCase() === 'MEDIUM' 
        ? 'Medium priority action required soon'
        : 'Low priority action, can be handled routinely';
    
    return (
      <Tooltip title={tooltipText} arrow>
        <Chip 
          label={`${icon} ${priority}`} 
          size="small"
          sx={{
            ...chipSx(theme, priorityColor),
            cursor: 'pointer',
            '&:hover': {
              boxShadow: `0 0 8px ${alpha(priorityColor, 0.5)}`
            }
          }}
        />
      </Tooltip>
    );
  };

  // Helper function for deadline styling and tooltip
  const getDeadlineStyling = (deadline: string) => {
    let style: any = { 
      color: 'text.primary',
      fontFamily: 'monospace'
    };
    
    let tooltipText = `Due by ${deadline}`;
    
    if (deadline === 'TODAY') {
      style = { 
        ...style,
        color: theme.palette.warning.main, 
        fontWeight: 'bold',
      };
      tooltipText = 'Due today - requires immediate attention';
    }
    if (deadline === 'OVERDUE') {
      style = { 
        ...style,
        color: theme.palette.error.main, 
        fontWeight: 'bold',
      };
      tooltipText = 'Overdue - action urgently required';
    }
    
    return { style, tooltipText };
  };

  return (
    <Paper 
      sx={{
        ...cardWithCornerSx(theme, alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2)),
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Badge for high priority actions */}
      {highPriorityCount > 0 && (
        <Badge 
          badgeContent={highPriorityCount} 
          color="error"
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16,
            '& .MuiBadge-badge': {
              fontSize: '0.7rem',
              height: 18,
              minWidth: 18,
            }
          }}
        />
      )}
      
      <Box sx={{ p: 2 }}>
        {/* Card Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={sectionHeaderSx}>
              Requires Your Action ({actions.length})
            </Typography>
            <Tooltip title="Action items requiring command approval or review" arrow>
              <InfoIcon fontSize="small" sx={{ ml: 1, color: theme.palette.text.secondary }} />
            </Tooltip>
          </Box>
          
          <Box>
            <Tooltip title={expanded ? "Collapse panel" : "Expand panel"}>
              <IconButton 
                size="small" 
                onClick={() => setExpanded(!expanded)}
                sx={{ mr: 1 }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh action items">
              <IconButton 
                size="small"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? <CircularProgress size={18} /> : <RefreshIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Actions Table - Only show when expanded */}
        <Collapse in={expanded} timeout="auto">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress size={40} />
            </Box>
          ) : (
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
                  {actions.map((action, index) => {
                    const { style: deadlineStyle, tooltipText: deadlineTooltip } = getDeadlineStyling(action.deadline);
                    
                    return (
                      <TableRow 
                        key={index} 
                        hover
                        onMouseEnter={() => setHoverRow(index)}
                        onMouseLeave={() => setHoverRow(null)}
                        sx={{
                          bgcolor: action.deadline === 'OVERDUE' 
                            ? alpha(theme.palette.error.main, 0.05)
                            : action.deadline === 'TODAY'
                              ? alpha(theme.palette.warning.main, 0.05)
                              : 'inherit',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                          },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <TableCell sx={{
                          ...tableCellSx,
                          borderLeft: hoverRow === index 
                            ? `3px solid ${getPriorityColor(action.priority, theme)}` 
                            : '3px solid transparent'
                        }}>
                          {renderPriorityIndicator(action.priority)}
                        </TableCell>
                        <TableCell sx={{
                          ...tableCellSx,
                          fontWeight: 'medium',
                          fontSize: '0.8rem',
                        }}>
                          <Tooltip title={`${action.type} - ${action.item}`} arrow>
                            <Box component="span" sx={{ cursor: 'help' }}>
                              {action.item}
                            </Box>
                          </Tooltip>
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
                          ...deadlineStyle,
                          fontSize: '0.75rem',
                        }}>
                          <Tooltip title={deadlineTooltip} arrow>
                            <Box component="span" sx={{ cursor: 'help' }}>
                              {action.deadline}
                            </Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={tableCellSx}>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            color="primary"
                            fullWidth
                            onClick={() => handleActionClick(index)}
                            disabled={selectedAction === index}
                            sx={{
                              ...buttonSx,
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              position: 'relative',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              }
                            }}
                          >
                            {selectedAction === index ? (
                              <>
                                <CircularProgress size={16} sx={{ mr: 1 }} />
                                Processing...
                              </>
                            ) : action.action}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Collapse>

        {/* View All Button - Always visible */}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={onViewAllActions}
          sx={{
            ...buttonSx,
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
              bgcolor: theme.palette.primary.dark
            }
          }}
        >
          View All Pending Actions
        </Button>
      </Box>
    </Paper>
  );
};
