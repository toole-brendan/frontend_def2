import React from 'react';
  // @ts-ignore - Unused variable intentionally kept
import { Box, Typography, Paper, Chip, Button, useTheme } from '@mui/material';
import { RecentActivityFeedProps } from '../types';

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  activities,
  onViewAllActivity
}) => {
  
  
  // Helper function to get status chip color
  const getStatusColor = (status: string): 'success' | 'warning' | 'default' => {
    switch (status) {
      case 'Complete':
        return 'success';
      case 'In Progress':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Property Accountability Activity
        </Typography>
      </Box>
      
      {/* Activity Table */}
      <Box sx={{ mb: 2, overflow: 'auto', maxHeight: 320 }}>
        <Box 
          component="table" 
          sx={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            '& th, & td': { 
              p: 1.5, 
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              fontSize: '0.875rem'
            },
            '& th': {
              fontWeight: 'bold',
              textAlign: 'left',
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Box component="thead">
            <Box component="tr">
              <Box component="th">Date</Box>
              <Box component="th">Time</Box>
              <Box component="th">Activity</Box>
              <Box component="th">Personnel</Box>
              <Box component="th">Details</Box>
              <Box component="th">Status</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {activities.map((activity, index) => (
              <Box 
                component="tr" 
                key={index}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                  }
                }}
              >
                <Box component="td">{activity.date}</Box>
                <Box component="td">{activity.time}</Box>
                <Box component="td" sx={{ fontWeight: 'medium' }}>{activity.activity}</Box>
                <Box component="td">{activity.personnel}</Box>
                <Box component="td">{activity.details}</Box>
                <Box component="td">
                  <Chip 
                    label={activity.status} 
                    size="small"
                    color={getStatusColor(activity.status)}
                    sx={{ fontWeight: 'medium' }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      
      {/* View All Button */}
      <Button 
        variant="outlined" 
        color="primary" 
        fullWidth
        onClick={onViewAllActivity}
      >
        View All Activity
      </Button>
    </Paper>
  );
}; 