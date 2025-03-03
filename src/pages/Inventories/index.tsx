import React from 'react';
import { 
  Box, 
  Grid, 
  Button, 
  Stack, 
  IconButton, 
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { PageContainer, PageHeader } from '../../components/layout';
import {
  RefreshOutlined as RefreshIcon,
  CalendarMonth as CalendarIcon,
  QrCode as QrCodeIcon,
  CloudDownload as DownloadIcon,
} from '@mui/icons-material';
import {
  InventoriesHeader,
  InventoryScheduleCard,
  InventoryComplianceCard,
  InventoryProgressTracker,
  InventoryManagementTable,
  InventoryExecutionPanel,
  DiscrepancyManagementPanel,
  InventoryToolsCard,
  InventoryAnalyticsCard,
  ChangeOfCommandPlanner,
  InspectionPreparationCard,
  InventoryActivityLog
} from './components';

const InventoriesPage: React.FC = () => {
  const theme = useTheme();
  const [activeInventory, setActiveInventory] = React.useState<string | null>(null);
  const [showDiscrepancies, setShowDiscrepancies] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date().toLocaleString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: false,
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }));

  const handleStartInventory = (inventoryId: string) => {
    setActiveInventory(inventoryId);
  };

  const handleCloseExecutionPanel = () => {
    setActiveInventory(null);
  };

  const handleToggleDiscrepancies = () => {
    setShowDiscrepancies(prev => !prev);
  };

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
          title="Inventories & Inspections"
          actions={headerActions}
        />
      }
    >
      {/* Welcome Header */}
      <Box sx={{ mb: 3 }}>
        <InventoriesHeader 
          title="B Company, 2-87 Infantry"
          sensitiveItemsDue="27FEB2025 (2 days)"
          cyclicInventoryProgress="68% Complete (Due 28FEB)"
          lastFullInventoryDate="15JAN2025"
          csdpStatus="In Compliance"
          lastUpdated={currentDateTime}
        />
      </Box>

      {/* Top Row - Calendar and Progress */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <InventoryScheduleCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <InventoryComplianceCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <InventoryProgressTracker />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Main Inventory Management Table */}
        <Grid item xs={12} lg={8}>
          {activeInventory ? (
            <InventoryExecutionPanel 
              inventoryId={activeInventory}
              onClose={handleCloseExecutionPanel}
            />
          ) : (
            <InventoryManagementTable onStartInventory={handleStartInventory} />
          )}

          {/* Discrepancy Management Panel */}
          {showDiscrepancies && (
            <Box sx={{ mt: 3 }}>
              <DiscrepancyManagementPanel />
            </Box>
          )}
        </Grid>

        {/* Right Side Panel */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <InventoryToolsCard />
            <InventoryAnalyticsCard />
            <ChangeOfCommandPlanner />
          </Stack>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <InspectionPreparationCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <InventoryActivityLog />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default InventoriesPage;
