import React from 'react';
import { Grid, useTheme, alpha } from '@mui/material';
import { KpiStatsCard } from '../../../components/common';
import { TransferStatsCardsProps } from '../types';

import {
  LocalShipping as TruckIcon,
  ExitToApp as LogOutIcon,
  AccessTime as ClockIcon,
  Description as FileTextIcon,
} from '@mui/icons-material';

/**
 * TransferStatsCards component for TransfersMovement
 * 
 * Displays a grid of KPI stat cards with transfer statistics
 */
const TransferStatsCards: React.FC<TransferStatsCardsProps> = ({ stats }) => {
  const theme = useTheme();
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <KpiStatsCard
          icon={<TruckIcon fontSize="small" />}
          title="Incoming Transfers"
          value={stats.incoming.toString()}
          subtitle={<>Updated today</>}
          color={theme.palette.primary.main}
          bgColor={alpha(theme.palette.primary.main, 0.1)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <KpiStatsCard
          icon={<LogOutIcon fontSize="small" />}
          title="Outgoing Transfers"
          value={stats.outgoing.toString()}
          subtitle={<>4 in process</>}
          color={theme.palette.secondary.main}
          bgColor={alpha(theme.palette.secondary.main, 0.1)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <KpiStatsCard
          icon={<ClockIcon fontSize="small" />}
          title="Pending Approval"
          value={stats.pending.toString()}
          subtitle={<>Action required</>}
          color={theme.palette.warning.main}
          bgColor={alpha(theme.palette.warning.main, 0.1)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <KpiStatsCard
          icon={<FileTextIcon fontSize="small" />}
          title="Temporary Receipts"
          value={stats.temporary.toString()}
          subtitle={<>2 overdue</>}
          color={theme.palette.error.main}
          bgColor={alpha(theme.palette.error.main, 0.1)}
        />
      </Grid>
    </Grid>
  );
};

export default TransferStatsCards;
