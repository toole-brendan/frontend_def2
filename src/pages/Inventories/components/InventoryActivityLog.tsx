import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Button,
  Divider,
  alpha,
  useTheme,
  CardHeader,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Mock activity data
const activityData = [
  {
    id: 'act-1',
    action: 'Completed',
    item: 'Weekly Sensitive Items Inventory',
    user: 'CPT Rodriguez',
    userInitials: 'MR',
    timestamp: '23 Feb 2025, 14:32',
    details: '100% accountability verified',
    status: 'complete'
  },
  {
    id: 'act-2',
    action: 'Started',
    item: 'Monthly 10% Cyclic Inventory (Vehicles)',
    user: '1LT Chen',
    userInitials: 'JC',
    timestamp: '20 Feb 2025, 09:15',
    details: '72 items to be verified',
    status: 'progress'
  },
  {
    id: 'act-3',
    action: 'Updated',
    item: 'Comms Equipment Hand Receipt',
    user: 'SFC Williams',
    userInitials: 'TW',
    timestamp: '19 Feb 2025, 11:05',
    details: 'Added 3 new SINCGARS radios',
    status: 'update'
  },
  {
    id: 'act-4',
    action: 'Reported',
    item: 'Discrepancy',
    user: 'SSG Thompson',
    userInitials: 'ET',
    timestamp: '18 Feb 2025, 13:45',
    details: 'SINCGARS (RC-987-2441) not found in Comms Cage',
    status: 'error'
  },
  {
    id: 'act-5',
    action: 'Scheduled',
    item: 'Arms Room Inventory',
    user: '1SG Martinez',
    userInitials: 'AM',
    timestamp: '17 Feb 2025, 08:22',
    details: 'Change of custodian on 15 MAR',
    status: 'scheduled'
  },
  {
    id: 'act-6',
    action: 'Generated',
    item: 'Inventory Report',
    user: 'CPT Rodriguez',
    userInitials: 'MR',
    timestamp: '16 Feb 2025, 16:05',
    details: 'Monthly CSDP compliance report',
    status: 'complete'
  },
  {
    id: 'act-7',
    action: 'Resolved',
    item: 'Discrepancy',
    user: 'SGT Johnson',
    userInitials: 'DJ',
    timestamp: '15 Feb 2025, 14:18',
    details: 'M240B Barrel found in Maintenance',
    status: 'update'
  }
];

interface InventoryActivityLogProps {
  simplified?: boolean;
}

export const InventoryActivityLog: React.FC<InventoryActivityLogProps> = ({ simplified = false }) => {
  const theme = useTheme();

  // Function to determine icon based on activity type
  const getActivityIcon = (status: string) => {
    switch(status) {
      case 'complete':
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case 'error':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      case 'progress':
        return <HourglassEmptyIcon sx={{ color: theme.palette.primary.main }} />;
      case 'scheduled':
        return <HistoryIcon sx={{ color: theme.palette.info.main }} />;
      case 'update':
        return <EditIcon sx={{ color: theme.palette.secondary.main }} />;
      default:
        return <AddCircleIcon sx={{ color: theme.palette.primary.main }} />;
    }
  };

  // Function to determine avatar color based on activity type
  const getAvatarColor = (status: string) => {
    switch(status) {
      case 'complete':
        return theme.palette.success.main;
      case 'error':
        return theme.palette.error.main;
      case 'progress':
        return theme.palette.primary.main;
      case 'scheduled':
        return theme.palette.info.main;
      case 'update':
        return theme.palette.secondary.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Function to format timestamp to relative time if recent
  const formatTimestamp = (timestamp: string) => {
    // This is a simplification - in production you'd use a library like date-fns
    if (timestamp.includes('23 Feb')) {
      return 'Today';
    } else if (timestamp.includes('22 Feb')) {
      return 'Yesterday';
    } else {
      return timestamp.split(',')[0]; // Just return the date portion
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 0, 
        borderRadius: 0,
        border: '2px solid rgba(140, 140, 160, 0.12)',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 16,
          height: 16,
          borderStyle: 'solid',
          borderWidth: '0 16px 16px 0',
          borderColor: `transparent ${alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2)} transparent transparent`,
          zIndex: 1,
        }
      }}
    >
      <CardHeader 
        title="Inventory Activity Log" 
        action={
          <Box>
            <IconButton 
              aria-label="filter" 
              size="small" 
              sx={{ 
                mr: 1,
                border: '1px solid rgba(140, 140, 160, 0.2)',
                borderRadius: 0,
              }}
            >
              <FilterListIcon fontSize="small" />
            </IconButton>
            <IconButton 
              aria-label="refresh" 
              size="small"
              sx={{
                border: '1px solid rgba(140, 140, 160, 0.2)',
                borderRadius: 0,
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      />
      <Divider />
      <Box sx={{ p: 2, pt: 0 }}>
        <List 
          sx={{ 
            maxHeight: 400, 
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
              backgroundColor: alpha(theme.palette.divider, 0.1),
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.divider, 0.3),
              borderRadius: 0,
            }
          }}
        >
          {activityData.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                alignItems="flex-start" 
                sx={{ 
                  py: 1.5,
                  px: 1,
                  mb: 0.5,
                  border: '1px solid transparent',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    border: `1px solid ${alpha(getAvatarColor(activity.status), 0.2)}`,
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(getAvatarColor(activity.status), 0.2),
                      color: getAvatarColor(activity.status),
                      width: 36,
                      height: 36,
                      borderRadius: 0,
                      border: `1px solid ${alpha(getAvatarColor(activity.status), 0.3)}`,
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                    }}
                  >
                    {activity.userInitials}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography 
                        variant="subtitle2" 
                        component="span" 
                        sx={{ 
                          mr: 1,
                          fontSize: '0.8rem',
                          fontWeight: 'medium',
                        }}
                      >
                        {activity.action} {activity.item}
                      </Typography>
                      {getActivityIcon(activity.status)}
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                        sx={{ 
                          display: 'block', 
                          mb: 0.5,
                          fontSize: '0.75rem',
                        }}
                      >
                        {activity.details}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                          sx={{ 
                            fontFamily: 'monospace',
                            fontSize: '0.7rem',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {activity.user} • {formatTimestamp(activity.timestamp)}
                        </Typography>
                        <Chip 
                          label={activity.action} 
                          size="small"
                          sx={{ 
                            height: 20, 
                            fontSize: '0.65rem',
                            bgcolor: alpha(getAvatarColor(activity.status), 0.1),
                            color: getAvatarColor(activity.status),
                            borderRadius: 0,
                            fontWeight: 'medium',
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                          }}
                        />
                      </Box>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < activityData.length - 1 && <Divider component="li" sx={{ ml: 0 }} />}
            </React.Fragment>
          ))}
        </List>
        
        <Box 
          sx={{ 
            mt: 2,
            pt: 2, 
            display: 'flex', 
            justifyContent: 'center',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            endIcon={<ArrowForwardIcon fontSize="small" />}
            size="small"
            sx={{ 
              fontWeight: 'medium',
              letterSpacing: '0.03em',
              borderRadius: 0,
              fontSize: '0.75rem',
              textTransform: 'none',
            }}
          >
            View Complete Activity History
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
