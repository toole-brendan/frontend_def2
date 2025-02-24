import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { TransferMetrics } from '../types';

interface StatusBarProps {
  metrics: TransferMetrics;
  onMetricClick: (status: string) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ metrics, onMetricClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 2,
        px: 3,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        mb: 3,
      }}
    >
      <Button
        onClick={() => onMetricClick('PENDING')}
        sx={{ textTransform: 'none' }}
      >
        <Typography variant="body1" color="text.secondary">
          Pending: <Typography component="span" color="primary" fontWeight="bold">{metrics.pending}</Typography>
        </Typography>
      </Button>

      <Divider orientation="vertical" flexItem />

      <Button
        onClick={() => onMetricClick('COMPLETED')}
        sx={{ textTransform: 'none' }}
      >
        <Typography variant="body1" color="text.secondary">
          Completed Today: <Typography component="span" color="primary" fontWeight="bold">{metrics.completedToday}</Typography>
        </Typography>
      </Button>

      <Divider orientation="vertical" flexItem />

      <Button
        onClick={() => onMetricClick('AWAITING_APPROVAL')}
        sx={{ textTransform: 'none' }}
      >
        <Typography variant="body1" color="text.secondary">
          Awaiting Approval: <Typography component="span" color="primary" fontWeight="bold">{metrics.awaitingApproval}</Typography>
        </Typography>
      </Button>
    </Box>
  );
};

export default StatusBar; 