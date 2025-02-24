import React from 'react';
import { Box, Grid, Typography, styled, Paper } from '@mui/material';
import { 
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Build as BuildIcon,
  SwapHoriz as SwapHorizIcon,
  Warning as WarningIcon 
} from '@mui/icons-material';

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'primary' | 'success' | 'warning' | 'error';
}

const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => (
  <DashboardCard>
    <div className="card-content">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: `${color}.light`,
            color: `${color}.main`,
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { 
            sx: { fontSize: 24 } 
          })}
        </Box>
        <Box>
          <Typography variant="h4" color={`${color}.main`}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Box>
    </div>
  </DashboardCard>
);

interface KeyMetricsCardsProps {
  stats: {
    total: number;
    serviceableItems: number;
    maintenanceNeeded: number;
    pendingTransfers: number;
    overdueItems: number;
  };
}

export const KeyMetricsCards: React.FC<KeyMetricsCardsProps> = ({ stats }) => {
  const metrics = [
    {
      icon: <InventoryIcon />,
      value: stats.total,
      label: 'Total Property Items',
      color: 'primary' as const,
    },
    {
      icon: <CheckCircleIcon />,
      value: stats.serviceableItems,
      label: 'Items in Good Condition',
      color: 'success' as const,
    },
    {
      icon: <BuildIcon />,
      value: stats.maintenanceNeeded,
      label: 'Items Needing Maintenance',
      color: 'warning' as const,
    },
    {
      icon: <SwapHorizIcon />,
      value: stats.pendingTransfers,
      label: 'Pending Transfers',
      color: 'primary' as const,
    },
    {
      icon: <WarningIcon />,
      value: stats.overdueItems,
      label: 'Overdue Maintenance',
      color: 'error' as const,
    }
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
}; 