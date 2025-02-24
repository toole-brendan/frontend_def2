import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface MetricChangeData {
  value: string;
  timeframe: string;
  isPositive: boolean;
}

interface MetricData {
  value: string;
  change: MetricChangeData;
}

interface MetricCardProps {
  title: string;
  metric: MetricData;
  icon: React.ReactNode;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, metric, icon, color }) => {
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: 40,
            height: 40,
            backgroundColor: `${color}20`,
            color: color,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        {metric.value}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
        <Typography
          variant="caption"
          sx={{
            color: metric.change.isPositive ? 'success.main' : 'error.main',
            fontWeight: 600,
            mr: 0.5,
          }}
        >
          {metric.change.value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {metric.change.timeframe}
        </Typography>
      </Box>
    </Paper>
  );
}; 