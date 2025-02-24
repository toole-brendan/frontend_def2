import React from 'react';
import { Box, Typography, IconButton, alpha, Button, Card } from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Circle as CircleIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

interface NotificationsPanelProps {
  notifications: Array<{
    id: string;
    type: 'high' | 'medium' | 'low';
    message: string;
    timestamp: string;
  }>;
}

const getNotificationColor = (type: NotificationsPanelProps['notifications'][0]['type']) => {
  switch (type) {
    case 'high':
      return '#F44336';
    case 'medium':
      return '#FFC107';
    case 'low':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
  return (
    <Card
      sx={{
        height: '100%',
        maxHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationsIcon color="primary" />
          <Typography variant="h6">
            Notifications
          </Typography>
          <Typography
            variant="caption"
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: (theme) => theme.palette.primary.main,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              ml: 1,
            }}
          >
            {notifications.length}
          </Typography>
        </Box>
        <Button
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          View All
        </Button>
      </Box>

      {/* Notifications List */}
      <Box 
        sx={{ 
          flex: 1,
          overflowY: 'auto',
          minHeight: '250px',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.divider,
            borderRadius: '3px',
          },
        }}
      >
        {notifications.map((notification, index) => (
          <Box
            key={notification.id}
            sx={{
              p: 2,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              transition: 'all 0.2s ease',
              animation: 'fadeIn 0.3s ease forwards',
              animationDelay: `${index * 100}ms`,
              opacity: 0,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <CircleIcon
                sx={{
                  color: getNotificationColor(notification.type),
                  fontSize: 12,
                  mt: 0.5,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                    lineHeight: 1.4,
                  }}
                >
                  {notification.message}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.75rem',
                  }}
                >
                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </Typography>
              </Box>
              <IconButton
                size="small"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}; 