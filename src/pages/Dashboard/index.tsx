import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import {
  DashboardHeader,
  AccountabilityStatusCard,
  CommandActionItemsCard,
  NTCRotationReadinessCard,
  PropertyDistributionVisualization,
  CriticalEquipmentStatusTable,
  UpcomingAccountabilityRequirements,
  RecentActivityFeed,
  QuickActionPanel,
  SystemStatusFooter
} from './components';
import { mockDashboardData, mockEquipmentCategories, mockCommandActions, mockMilestones, mockEquipmentItems, mockWeeklyRequirements, mockMonthlyRequirements, mockQuarterlyRequirements, mockActivities, mockQuickActions } from './mockData';
import { useDashboard } from './hooks/useDashboard';
import { Action } from './types';

const Dashboard: React.FC = () => {
  const data = mockDashboardData;
  
  // Current date/time for the dashboard
  const currentDateTime = "25FEB2025 0842";

  const { 
    handleStartInventory,
    handleViewAllActions,
    handleViewNTCPlan,
    handleViewAllActivity,
    handleQuickAction
  } = useDashboard({ dashboardData: data });

  // Transform mockQuickActions to include the handler
  const quickActions = mockQuickActions.map(quickAction => ({
    ...quickAction,
    action: typeof quickAction.action === 'string' 
      ? () => handleQuickAction(quickAction.action as string)
      : quickAction.action
  }));

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        {/* Header Section */}
        <DashboardHeader 
          title="Commander's Dashboard - B Company, 2-87 Infantry"
          user="CPT Michael Rodriguez, Company Commander"
          totalValue={data.unitInfo.dollarValue}
          equipmentItems={data.unitInfo.classVIIItems}
          sensitiveItemsStatus="100% Accounted For"
          dateTime={currentDateTime}
        />

        {/* Primary Information Cards (Top Row) */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <AccountabilityStatusCard 
              overallRate={data.accountabilityStatus.overallRate}
              sensitiveItems={{
                verified: `${data.unitInfo.sensitiveItemStatus.accountedFor}/${data.unitInfo.sensitiveItemStatus.accountedFor} Sensitive Items Verified ✓`,
                lastVerification: data.unitInfo.sensitiveItemStatus.lastInventory,
                nextRequired: "27FEB2025 (DAILY VERIFICATION REQUIRED)"
              }}
              equipmentCategories={mockEquipmentCategories}
              onStartInventory={handleStartInventory}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <CommandActionItemsCard 
              actions={mockCommandActions}
              onViewAllActions={handleViewAllActions}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <NTCRotationReadinessCard 
              title="NTC Rotation 25-08 Preparation"
              daysToDeployment={121}
              equipmentStatus={{
                requiredItems: 503,
                currentOnHand: 342,
                percentage: 68,
                criticalShortages: 27,
                serviceability: 84
              }}
              milestones={mockMilestones}
              onViewNTCPlan={handleViewNTCPlan}
            />
          </Grid>
        </Grid>

        {/* Main Content Section (Middle Row) */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <PropertyDistributionVisualization />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <CriticalEquipmentStatusTable 
              equipment={mockEquipmentItems}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <UpcomingAccountabilityRequirements 
              weeklyRequirements={mockWeeklyRequirements}
              monthlyRequirements={mockMonthlyRequirements}
              quarterlyRequirements={mockQuarterlyRequirements}
              onStartInventory={handleStartInventory}
            />
          </Grid>
        </Grid>

        {/* Activity & Quick Access Section (Bottom Row) */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <RecentActivityFeed 
              activities={mockActivities}
              onViewAllActivity={handleViewAllActivity}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <QuickActionPanel actions={quickActions} />
          </Grid>
        </Grid>

        {/* System Status Footer */}
        <SystemStatusFooter 
          connectionStatus={`Connected to GCSS-Army (${data.gcssStatus.connected ? 'Online' : 'Offline'})`}
          lastUpdate={`Data current as of: ${data.gcssStatus.asOf}`}
          mobileAppStatus="37 Users Synchronized"
          systemNotice="Scheduled maintenance: 28FEB2025 0100-0300"
        />
      </Box>
    </Container>
  );
};

export default Dashboard; 