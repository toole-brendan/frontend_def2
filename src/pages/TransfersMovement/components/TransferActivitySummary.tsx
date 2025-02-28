import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Tooltip,
  Chip,
  useTheme
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  Create as InitiationIcon,
  CheckCircle as ApprovalIcon,
  Search as InspectionIcon,
  LocalShipping as TransitIcon,
  FactCheck as ReceiptIcon,
  Cancel as RejectionIcon,
  Delete as CancellationIcon,
  Launch as ViewIcon
} from '@mui/icons-material';
import { TransferActivitySummaryProps } from '../types';
import { format, formatDistanceToNow } from 'date-fns';

// Map activity types to icons
const activityIcons = {
  'INITIATION': InitiationIcon,
  'APPROVAL': ApprovalIcon,
  'INSPECTION': InspectionIcon,
  'IN_TRANSIT': TransitIcon,
  'RECEIPT': ReceiptIcon,
  'REJECTION': RejectionIcon,
  'CANCELLATION': CancellationIcon
};

// Map activity types to colors
const activityColors = {
  'INITIATION': '#2196F3',  // Blue
  'APPROVAL': '#4CAF50',    // Green
  'INSPECTION': '#9C27B0',  // Purple
  'IN_TRANSIT': '#FF9800',  // Orange
  'RECEIPT': '#00BCD4',     // Cyan
  'REJECTION': '#F44336',   // Red
  'CANCELLATION': '#757575' // Grey
};

// Format the activity timestamp for display
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  
  // If it's today, show time
  if (date.toDateString() === now.toDateString()) {
    return format(date, 'h:mm a');
  }
  
  // If it's yesterday, show "Yesterday at [time]"
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }
  
  // If it's within the last week, show day of week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  if (date > oneWeekAgo) {
    return format(date, 'EEEE');
  }
  
  // Otherwise show date
  return format(date, 'MMM d, yyyy');
};

const TransferActivitySummary: React.FC<TransferActivitySummaryProps> = ({
  recentActivities,
  onViewActivity,
  onViewTransfer
}) => {
  const theme = useTheme();
  
  // Sort activities by timestamp, newest first
  const sortedActivities = [...recentActivities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 8); // Limit to 8 most recent activities

  return (
    <Card 
      sx={{ 
        height: '100%',
        boxShadow: theme.shadows[2]
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Transfer Activity
          </Typography>
          <Chip 
            icon={<TimelineIcon />} 
            label="Recent Activity" 
            color="primary" 
            size="small"
            variant="outlined"
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {sortedActivities.length > 0 ? (
          <List sx={{ px: 0 }}>
            {sortedActivities.map((activity) => {
              const ActivityIcon = activityIcons[activity.activityType] || InitiationIcon;
              const iconColor = activityColors[activity.activityType] || '#757575';
              const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });
              
              return (
                <ListItem
                  key={activity.id}
                  alignItems="flex-start"
                  sx={{ 
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: iconColor }}>
                      <ActivityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
                        <Box component="div">
                          <Typography variant="subtitle2" component="span">
                            {activity.activityType.replace('_', ' ')}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            component="span"
                            display="block"
                            sx={{ mt: 0.5 }}
                          >
                            Transfer: {activity.transferId}
                          </Typography>
                        </Box>
                        
                        <Tooltip title={format(new Date(activity.timestamp), 'PPpp')}>
                          <Typography variant="caption" color="text.secondary" component="span">
                            {timeAgo}
                          </Typography>
                        </Tooltip>
                      </Box>
                    }
                    secondary={
                      <Typography component="div" variant="body2">
                        <Box mt={1}>
                          <Typography variant="body2" component="span" display="block">
                            {activity.details}
                          </Typography>
                          
                          {activity.location && (
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              component="span"
                              display="block"
                              sx={{ mt: 0.5 }}
                            >
                              Location: {activity.location}
                            </Typography>
                          )}
                          
                          <Box display="flex" alignItems="center" mt={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ 
                                  width: 20, 
                                  height: 20, 
                                  fontSize: '0.7rem',
                                  mr: 0.5
                                }}
                              >
                                {activity.user.rank}
                              </Avatar>
                              <Typography variant="caption" component="span">
                                {activity.user.name}
                              </Typography>
                            </Box>
                            
                            <Box ml="auto" display="flex">
                              {onViewActivity && (
                                <Tooltip title="View activity details">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => onViewActivity(activity.id)}
                                    sx={{ ml: 1 }}
                                  >
                                    <ViewIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              
                              {onViewTransfer && (
                                <Tooltip title="View transfer details">
                                  <IconButton 
                                    size="small" 
                                    color="primary"
                                    onClick={() => onViewTransfer(activity.transferId)}
                                    sx={{ ml: 1 }}
                                  >
                                    <ViewIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography color="textSecondary">No recent activities</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TransferActivitySummary; 