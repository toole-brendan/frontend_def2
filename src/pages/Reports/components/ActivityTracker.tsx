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
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import {
  FilePlus,
  FileEdit,
  FileCheck,
  FileX,
  Download,
  Clock,
  User
} from 'lucide-react';
import { BlockchainRecord } from '../types';
import { paperSx } from '../styles';
import { formatReportDate } from '../utils';

interface ActivityTrackerProps {
  activities: BlockchainRecord[];
  maxItems?: number;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  activities,
  maxItems = 5
}) => {
  const theme = useTheme();
  
  // Sort activities by timestamp (newest first)
  const sortedActivities = [...activities].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Limit to maxItems
  const displayedActivities = sortedActivities.slice(0, maxItems);
  
  // Helper to get icon by action type
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'REPORT_CREATED':
        return <FilePlus size={20} />;
      case 'REPORT_UPDATED':
        return <FileEdit size={20} />;
      case 'REPORT_APPROVED':
        return <FileCheck size={20} />;
      case 'REPORT_REJECTED':
        return <FileX size={20} />;
      default:
        return <FileEdit size={20} />;
    }
  };
  
  // Helper to get color by action type
  const getActionColor = (action: string) => {
    switch (action) {
      case 'REPORT_CREATED':
        return theme.palette.info.main;
      case 'REPORT_UPDATED':
        return theme.palette.primary.main;
      case 'REPORT_APPROVED':
        return theme.palette.success.main;
      case 'REPORT_REJECTED':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };
  
  // Helper to format action text
  const formatActionText = (action: string) => {
    return action
      .replace('REPORT_', '')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Recent Activity
        </Typography>
      </Box>
      
      <List sx={{ py: 0 }}>
        {displayedActivities.map((activity, index) => {
          const actionColor = getActionColor(activity.action);
          const actionIcon = getActionIcon(activity.action);
          
          return (
            <React.Fragment key={activity.transactionId}>
              <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: alpha(actionColor, 0.1),
                      color: actionColor
                    }}
                  >
                    {actionIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Chip
                        label={formatActionText(activity.action)}
                        size="small"
                        sx={{
                          bgcolor: alpha(actionColor, 0.1),
                          color: actionColor,
                          fontWeight: 'medium',
                          fontSize: '0.7rem',
                          height: '22px',
                          mr: 1
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 1.5 }}>
                          <Clock size={14} style={{ marginRight: '4px' }} />
                          {formatReportDate(activity.timestamp, 'MMM dd, yyyy • HH:mm')}
                        </Box>
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                          <User size={14} style={{ marginRight: '4px' }} />
                          {activity.personnel.name}
                        </Box>
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.primary">
                      {activity.details.comments || 
                        `Transaction ID: ${activity.transactionId.substring(0, 10)}...`}
                    </Typography>
                  }
                />
              </ListItem>
              {index < displayedActivities.length - 1 && (
                <Divider component="li" />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default ActivityTracker; 