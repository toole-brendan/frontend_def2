import React from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '../../../components/common/Grid';
import QrCodeIcon from '@mui/icons-material/QrCode';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend }) => (
  <Box
    sx={{
      p: 3,
      backgroundColor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          color: 'primary.main',
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Box>
    {trend && (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            color: trend.isPositive ? 'success.main' : 'error.main',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {trend.isPositive ? '+' : '-'}{trend.value}%
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          vs last month
        </Typography>
      </Box>
    )}
  </Box>
);

export const MetricsSection: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const metrics = [
    {
      title: 'Total QR Codes',
      value: '2,547',
      icon: <QrCodeIcon />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Active QR Codes',
      value: '2,103',
      icon: <CheckCircleIcon />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Expiring Soon',
      value: '145',
      icon: <AccessTimeIcon />,
      trend: { value: 5, isPositive: false },
    },
    {
      title: 'Issues Reported',
      value: '23',
      icon: <WarningIcon />,
      trend: { value: 2, isPositive: true },
    },
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => (
        <Grid key={metric.title} item xs={12} sm={6} md={3}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
}; 