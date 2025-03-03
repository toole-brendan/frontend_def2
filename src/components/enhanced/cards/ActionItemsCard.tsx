import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Grid, 
  Divider, 
  useTheme, 
  SxProps, 
  Theme 
} from '@mui/material';
import { StatusCard } from './StatusCard';

interface ActionItem {
  id: number | string;
  priority: 'high' | 'medium' | 'low';
  item: string;
  type: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  note?: string;
}

interface ActionItemsCardProps {
  items?: ActionItem[];
  title?: string;
  action?: React.ReactNode;
  onActionClick?: (id: number | string) => void;
  sx?: SxProps<Theme>;
}

/**
 * Action Items Card component with Defense Industrial Modern Design styling.
 * Displays pending action items with priority indicators and action buttons.
 */
export const ActionItemsCard: React.FC<ActionItemsCardProps> = ({
  items = [
    { 
      id: 1, 
      priority: 'high', 
      item: 'New JLTV Receipt', 
      type: 'Acquisition', 
      dueDate: 'Today', 
      status: 'pending'
    },
    { 
      id: 2, 
      priority: 'high', 
      item: 'SINCGARS (SN: RC-987-2441)', 
      type: 'Maintenance', 
      dueDate: 'Overdue', 
      status: 'overdue'
    },
    { 
      id: 3, 
      priority: 'medium', 
      item: '3rd PLT Hand Receipt', 
      type: 'Transfer', 
      dueDate: '27FEB', 
      status: 'pending'
    }
  ],
  title = "Action Items",
  action,
  onActionClick = () => {},
  sx
}) => {
  const theme = useTheme();

  // Helper function to get priority color
  const getPriorityColor = (priority: ActionItem['priority']): string => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.info.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: ActionItem['status']): string => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'pending':
        return theme.palette.warning.main;
      case 'overdue':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  // Helper function to get due date styling
  const getDueDateStyle = (dueDate: string) => {
    if (dueDate.toLowerCase() === 'overdue') {
      return { color: theme.palette.error.main, fontWeight: 600 };
    } else if (dueDate.toLowerCase() === 'today') {
      return { color: theme.palette.warning.main, fontWeight: 600 };
    } else {
      return { color: theme.palette.text.primary };
    }
  };

  return (
    <StatusCard 
      title={title}
      action={action}
      withPattern={true}
      noPadding={true}
      sx={sx}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <Typography 
                    variant="body2" 
                    fontWeight={600}
                    sx={{ letterSpacing: '0.015em' }}
                  >
                    {item.item}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        px: 1, 
                        py: 0.25, 
                        bgcolor: `${getPriorityColor(item.priority)}20`, 
                        color: getPriorityColor(item.priority),
                        borderRadius: 0,
                        fontWeight: 500,
                        border: `1px solid ${getPriorityColor(item.priority)}40`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.65rem',
                      }}
                    >
                      {item.priority.toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.type}
                    </Typography>
                    {item.note && (
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontStyle: 'italic',
                          ml: 1
                        }}
                      >
                        {item.note}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack 
                  direction="row" 
                  spacing={2} 
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                  sx={{ height: '100%' }}
                >
                  <Typography 
                    variant="body2"
                    fontWeight={500}
                    sx={getDueDateStyle(item.dueDate)}
                  >
                    Due: {item.dueDate}
                  </Typography>
                  
                  {/* Action button with technical military styling */}
                  <Box
                    component="button"
                    onClick={() => onActionClick(item.id)}
                    sx={{ 
                      px: 1.5, 
                      py: 0.5,
                      bgcolor: theme.palette.mode === 'light' ? 'white' : 'background.paper',
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 0,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                      outline: 'none',
                      position: 'relative',
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                      },
                      '&:focus': {
                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                      },
                      // Corner markers for technical look
                      '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        width: 3,
                        height: 3,
                        backgroundColor: theme.palette.primary.main,
                      },
                      '&::before': {
                        top: 0,
                        right: 0,
                      },
                      '&::after': {
                        bottom: 0,
                        left: 0,
                      },
                    }}
                  >
                    Take Action
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          {index < items.length - 1 && (
            <Divider sx={{ 
              opacity: 0.7,
              mx: 2
            }} />
          )}
        </React.Fragment>
      ))}
    </StatusCard>
  );
};

export default ActionItemsCard;
