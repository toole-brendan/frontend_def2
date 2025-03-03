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
import { CardHeader, StatusChip } from '../../../components/common';
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
        borderColor: `transparent ${alpha(theme.palette.info.main, theme.palette.mode === 'dark' ? 0.3 : 0.2)} transparent transparent`,
        zIndex: 1,
      }
    }}>
      <CardHeader 
        title="Recent Transfer Activity"
        subtitle="Latest actions and status updates"
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<HistoryIcon fontSize="small" />}
            sx={{ 
              color: 'text.secondary', 
              borderRadius: 0,
              borderColor: 'rgba(140, 140, 160, 0.2)',
            }}
          >
            View full history
          </Button>
        }
      />
      
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                DATE
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                TIME
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                ACTIVITY
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                DOC #
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                PERSONNEL
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                ITEMS
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.info.main, 0.05) 
              }}>
                STATUS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow 
                key={index} 
                hover
                sx={{
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{activity.date}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{activity.time}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>{activity.activity}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{activity.id}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem' }}>{activity.personnel}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem' }}>{activity.items}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getStatusIcon(activity.status)}
                    <StatusChip 
                      label={activity.status} 
                      status={activity.status}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box 
          sx={{ 
            p: 1.5, 
            borderTop: '1px solid rgba(140, 140, 160, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.info.main, 0.03) : alpha(theme.palette.grey[100], 0.5),
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>
            Showing recent {activities.length} activities
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.info.main,
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 'medium',
              letterSpacing: '0.03em',
              display: 'flex', 
              alignItems: 'center',
              '&:hover': { 
                textDecoration: 'underline',
                color: alpha(theme.palette.info.main, 0.8),
              }
            }}
          >
            <HistoryIcon sx={{ fontSize: 14, mr: 0.5 }} />
            See activity log
          </Typography>
        </Box>
      </TableContainer>
    </Paper>
  );
};

export default RecentActivity;
