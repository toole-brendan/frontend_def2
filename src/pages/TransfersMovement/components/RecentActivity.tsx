import React from 'react';
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  alpha,
  useTheme,
} from '@mui/material';
import { CardHeader } from '../../../components/common';
import { RecentActivityProps } from '../types';

import {
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
  LocalShipping as TruckIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

/**
 * RecentActivity component for TransfersMovement
 * 
 * Displays a table of recent transfer activities with timestamps and statuses
 */
const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const theme = useTheme();

  // Get appropriate icon based on status
  const getStatusIcon = (status: string) => {
    if (status === 'COMPLETE') {
      return <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: 14 }} />;
    } else if (status === 'IN PROCESS') {
      return <ClockIcon sx={{ color: theme.palette.warning.main, mr: 0.5, fontSize: 14 }} />;
    } else {
      return <TruckIcon sx={{ color: theme.palette.primary.main, mr: 0.5, fontSize: 14 }} />;
    }
  };

  return (
    <Paper sx={{ 
      p: 2,
      height: '100%',
      borderRadius: 1,
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.divider}`,
      borderLeft: `3px solid ${theme.palette.info.main}`,
    }}>
      <CardHeader 
        title="Recent Transfer Activity"
        subtitle="Latest actions and status updates"
        action={
          <Button 
            startIcon={<HistoryIcon />}
            size="small"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 'medium',
            }}
          >
            View All
          </Button>
        }
      />
      
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              bgcolor: alpha(theme.palette.background.default, 0.5),
              '& th': { fontWeight: 600, padding: '10px 16px' }
            }}>
              <TableCell sx={{ width: '25%', p: 2 }}>Time</TableCell>
              <TableCell sx={{ width: '25%', p: 2 }}>Activity</TableCell>
              <TableCell sx={{ width: '25%', p: 2 }}>Document</TableCell>
              <TableCell sx={{ width: '25%', p: 2 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index} sx={{ '&:hover': { bgcolor: alpha(theme.palette.background.default, 0.3) } }}>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {activity.date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2">
                    {activity.activity}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.personnel}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {activity.id}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {activity.items}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getStatusIcon(activity.status)}
                    <Typography variant="body2" fontWeight={activity.status === 'COMPLETE' ? 'medium' : 'normal'}>
                      {activity.status}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentActivity;
