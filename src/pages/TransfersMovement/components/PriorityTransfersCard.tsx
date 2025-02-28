import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Flag as FlagIcon,
  Visibility as ViewIcon,
  ArrowRightAlt as ArrowIcon
} from '@mui/icons-material';
import { PriorityTransfersCardProps, TransferPriority, TransferType } from '../types';
import { format } from 'date-fns';

// Function to get color based on priority
const getPriorityColor = (priority: TransferPriority) => {
  switch (priority) {
    case TransferPriority.HIGH:
      return '#D32F2F'; // Red
    case TransferPriority.MEDIUM:
      return '#F57C00'; // Orange
    case TransferPriority.ROUTINE:
      return '#388E3C'; // Green
    default:
      return '#757575'; // Grey
  }
};

// Function to get icon and color for transfer types
const getTransferTypeInfo = (type: TransferType) => {
  switch (type) {
    case TransferType.LATERAL:
      return { color: '#3F51B5', label: 'Lateral' }; // Indigo
    case TransferType.RECEIPT:
      return { color: '#009688', label: 'Receipt' }; // Teal
    case TransferType.TURN_IN:
      return { color: '#795548', label: 'Turn-in' }; // Brown
    case TransferType.MAINTENANCE:
      return { color: '#FF5722', label: 'Maint' }; // Deep Orange
    case TransferType.TEMPORARY:
      return { color: '#673AB7', label: 'Temp' }; // Deep Purple
    case TransferType.RANGE:
      return { color: '#E91E63', label: 'Range' }; // Pink
    default:
      return { color: '#757575', label: type }; // Grey
  }
};

const PriorityTransfersCard: React.FC<PriorityTransfersCardProps> = ({ 
  transfers, 
  onViewDetails 
}) => {
  const theme = useTheme();
  
  // We only want to show priority transfers, sorted by priority
  const prioritizedTransfers = [...transfers]
    .filter(transfer => transfer.priority === TransferPriority.HIGH || transfer.priority === TransferPriority.MEDIUM)
    .sort((a, b) => {
      // First sort by priority (HIGH before MEDIUM)
      if (a.priority !== b.priority) {
        return a.priority === TransferPriority.HIGH ? -1 : 1;
      }
      
      // Then sort by due date (earlier dates first)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5); // Limit to 5 transfers

  return (
    <Card 
      sx={{ 
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[2]
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Priority Transfers
          </Typography>
          <Chip 
            icon={<FlagIcon />} 
            label={`${prioritizedTransfers.length} Transfers`} 
            color="error" 
            size="small"
            variant="outlined"
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {prioritizedTransfers.length > 0 ? (
          <List sx={{ 
            px: 0,
            flex: 1,
            overflow: 'auto',
            '& > :not(:last-child)': {
              mb: 1
            }
          }}>
            {prioritizedTransfers.map((transfer) => {
              const typeInfo = getTransferTypeInfo(transfer.type);
              const isDueToday = new Date(transfer.dueDate).toDateString() === new Date().toDateString();
              const isOverdue = new Date(transfer.dueDate) < new Date();
              
              return (
                <ListItem 
                  key={transfer.id}
                  alignItems="flex-start"
                  sx={{ 
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Box display="flex" width="100%" alignItems="flex-start">
                    <Avatar
                      sx={{ 
                        backgroundColor: typeInfo.color,
                        width: 40, 
                        height: 40,
                        flexShrink: 0
                      }}
                    >
                      {typeInfo.label.charAt(0)}
                    </Avatar>
                    
                    <Box ml={2} flex={1} minWidth={0}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box flex={1} minWidth={0}>
                          <Typography 
                            variant="subtitle1" 
                            component="div" 
                            fontWeight="medium"
                            noWrap
                            title={`${transfer.id} - ${transfer.purpose}`}
                          >
                            {transfer.id} - {transfer.purpose}
                          </Typography>
                          
                          <Box display="flex" alignItems="center" mt={0.5}>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              noWrap
                              title={transfer.from.name}
                            >
                              {transfer.from.name}
                            </Typography>
                            <ArrowIcon fontSize="small" sx={{ mx: 0.5, flexShrink: 0 }} />
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              noWrap
                              title={transfer.to.name}
                            >
                              {transfer.to.name}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box ml={1}>
                          <Chip 
                            label={transfer.priority} 
                            size="small"
                            sx={{ 
                              backgroundColor: getPriorityColor(transfer.priority),
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: 1
                            }} 
                          />
                        </Box>
                      </Box>
                      
                      <Box 
                        display="flex" 
                        alignItems="center" 
                        mt={1} 
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                      >
                        <Box display="flex" gap={1} flexWrap="wrap">
                          <Chip 
                            label={transfer.stage} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={`${transfer.items.length} Items`} 
                            size="small" 
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={1}>
                          <Tooltip title={isOverdue ? "Overdue" : isDueToday ? "Due Today" : "Due date"}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: isOverdue || isDueToday ? 'bold' : 'normal',
                                color: isOverdue ? 'error.main' : isDueToday ? 'warning.main' : 'text.secondary'
                              }}
                            >
                              Due: {format(new Date(transfer.dueDate), 'MMM d, yyyy')}
                            </Typography>
                          </Tooltip>
                          
                          <Tooltip title="View details">
                            <IconButton 
                              size="small"
                              color="primary"
                              onClick={() => onViewDetails(transfer.id)}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            flex={1}
            p={3}
          >
            <Typography variant="body2" color="text.secondary">
              No priority transfers at this time
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PriorityTransfersCard; 