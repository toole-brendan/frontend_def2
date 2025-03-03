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

  // Header actions for the PageHeader
  const headerActions = (
    <>
      <IconButton 
        size="small"
        sx={{ 
          border: '1px solid rgba(140, 140, 160, 0.2)',
          borderRadius: 0,
        }}
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
      <Button 
        variant="outlined" 
        startIcon={<QrCodeIcon />}
        sx={{ 
          borderRadius: 0,
          borderColor: 'rgba(140, 140, 160, 0.2)',
          fontWeight: 'medium',
          letterSpacing: '0.03em',
        }}
      >
        Scan QR Code
      </Button>
      <Button 
        variant="outlined" 
        startIcon={<DownloadIcon />}
        sx={{ 
          borderRadius: 0,
          borderColor: 'rgba(140, 140, 160, 0.2)',
          fontWeight: 'medium',
          letterSpacing: '0.03em',
        }}
      >
        Export Data
      </Button>
    </>
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
      {/* Welcome Header */}
      <Box sx={{ 
        mb: 3, 
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '2px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        mx: 3
      }}>
        <Box>
          <Typography variant="h4" fontWeight="500" sx={{ position: 'relative' }}>
            B Company, 2-87 Infantry
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: -2, 
                left: 0, 
                width: '60px', 
                height: '3px', 
                bgcolor: theme.palette.primary.main,
                opacity: 0.7,
              }}
            />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', fontSize: '0.75rem' }}>
              Active Transfers: 63
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12, alignSelf: 'center' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.03em' }}>
              Last updated: {currentDateTime}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button 
            variant="outlined"
            sx={{ 
              borderRadius: 0,
              borderColor: 'rgba(140, 140, 160, 0.2)',
              fontWeight: 'medium',
              letterSpacing: '0.03em',
            }}
          >
            Request Transfer
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 0,
              fontWeight: 'medium',
              letterSpacing: '0.03em',
              boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.5)}`,
            }}
          >
            Create New Transfer
          </Button>
        </Box>
      </Box>

      {/* Important Notification */}
      <Paper sx={{ 
        p: 2, 
        mb: 3, 
        bgcolor: alpha(theme.palette.warning.main, 0.08), 
        borderLeft: `3px solid ${theme.palette.warning.main}`,
        border: '2px solid rgba(140, 140, 160, 0.12)',
        borderRadius: 0,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              mr: 2, 
              bgcolor: alpha(theme.palette.warning.main, 0.15),
              color: theme.palette.warning.main,
              width: 36,
              height: 36,
              borderRadius: 0,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
            }}
          >
            <WarningIcon />
          </Avatar>
          <Box>
            <Typography fontWeight="600" color="warning.main" sx={{ fontSize: '0.95rem', letterSpacing: '0.01em' }}>
              Action Required
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', fontSize: '0.85rem' }}>
              13 pending transfers waiting for your approval
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            size="small" 
            endIcon={<ArrowForwardIcon fontSize="small" />}
            sx={{ 
              ml: 'auto', 
              color: theme.palette.warning.main,
              borderColor: alpha(theme.palette.warning.main, 0.3),
              borderRadius: 0,
              '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.1) }
            }}
          >
            View All
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Box sx={{ mb: 3 }}>
        <TransferStatsCards stats={transferStats} />
      </Box>

      {/* Transfer Pipeline and Priority Transfers */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Left side - Transfer Pipeline */}
        <Grid item xs={12} md={7}>
          <TransferPipeline transfers={transferData} />
        </Grid>

        {/* Right side - Priority Transfers */}
        <Grid item xs={12} md={5}>
          <PriorityTransfers transfers={priorityTransfers} />
        </Grid>
      </Grid>

      {/* Main Transfer Management Table */}
      <TransferManagementTable transfers={transferData} />

      {/* Bottom Grid - Action Cards and Activity */}
      <Grid container spacing={2}>
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
