import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Paper,
  Grid,
  alpha,
  useTheme,
  Avatar,
} from '@mui/material';
import { PageContainer, PageHeader } from '../../components/layout';
import { SectionHeader } from '../../components/common';
import { titleTypographySx } from '../../theme/patterns';
import {
  LocalShipping as TruckIcon,
  Description as FileTextIcon,
  QrCode as QrCodeIcon,
  CloudDownload as DownloadIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

// Import components
import {
  ActionCard,
  TransferStatsCards,
  TransferPipeline,
  PriorityTransfers,
  TransferManagementTable,
  RecentActivity,
} from './components';

// Import data
import { transferData, priorityTransfers, recentActivity, transferStats } from './mockData';

/**
 * TransfersMovementPage component
 * 
 * Main page for managing transfers and movement of equipment
 */
const TransfersMovementPage: React.FC = () => {
  const theme = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: false,
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }));

  // Action buttons for the header
  const headerActions = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button 
        variant="outlined" 
        size="small" 
        startIcon={<QrCodeIcon />}
        sx={{ borderRadius: 1 }}
      >
        Scan QR
      </Button>
      <Button 
        variant="contained" 
        size="small" 
        startIcon={<FileTextIcon />}
        sx={{ borderRadius: 1 }}
      >
        New Transfer
      </Button>
    </Box>
  );

  return (
    <PageContainer
      header={
        <PageHeader
          title="Transfers & Movement"
          actions={headerActions}
        />
      }
    >
      {/* Stats Cards */}
      <TransferStatsCards stats={transferStats} />

      {/* Main Content Area */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Transfer Pipeline and Priority Transfers */}
        <Grid item xs={12} md={7}>
          <TransferPipeline transfers={transferData} />
        </Grid>

        {/* Right side - Priority Transfers */}
        <Grid item xs={12} md={5}>
          <PriorityTransfers transfers={priorityTransfers} />
        </Grid>
      </Grid>

      {/* Main Transfer Management Table */}
      <Box sx={{ mx: 2 }}>
        <TransferManagementTable transfers={transferData} />
      </Box>

      {/* Bottom Grid - Action Cards and Activity */}
      <Grid container spacing={3} sx={{ px: 2 }}>
        {/* Left Column - Action Cards */}
        <Grid item xs={12} md={4}>
          <ActionCard 
            icon={<TruckIcon />}
            title="Start New Transfer"
            subtitle="Create Request"
            buttonText="New Transfer"
            color={theme.palette.primary.main}
          />

          <ActionCard 
            icon={<QrCodeIcon />}
            title="Quick Scan"
            subtitle="Verify Items"
            buttonText="Scan QR Code"
            color={theme.palette.secondary.main}
          />

          <ActionCard 
            icon={<FileTextIcon />}
            title="Generate Documents"
            subtitle="Transfer Paperwork"
            buttonText="Create Documents"
            color={theme.palette.info.main}
          />
        </Grid>

        {/* Right Column - Recent Activity */}
        <Grid item xs={12} md={8}>
          <RecentActivity activities={recentActivity} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TransfersMovementPage;
