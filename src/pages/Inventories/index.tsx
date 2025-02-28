import React from 'react';
import { Box, Container, Grid, Alert, Typography, Button, Stack } from '@mui/material';
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
  const [activeInventory, setActiveInventory] = React.useState<string | null>(null);
  const [showDiscrepancies, setShowDiscrepancies] = React.useState(false);

  const handleStartInventory = (inventoryId: string) => {
    setActiveInventory(inventoryId);
  };

  const handleCloseExecutionPanel = () => {
    setActiveInventory(null);
  };

  const handleToggleDiscrepancies = () => {
    setShowDiscrepancies(prev => !prev);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        {/* Header Section */}
        <InventoriesHeader 
          title="Inventories & Inspections - B Company, 2-87 Infantry"
          sensitiveItemsDue="27FEB2025 (2 days)"
          cyclicInventoryProgress="68% Complete (Due 28FEB)"
          lastFullInventoryDate="15JAN2025"
          csdpStatus="In Compliance"
        />

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
      </Box>
    </Container>
  );
};

export default InventoriesPage;
