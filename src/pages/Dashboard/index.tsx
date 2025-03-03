import React from 'react';
import { 
  Fab, 
  Grid,
  Box,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import { KpiStatsCard } from '../../components/common';
import { Plus } from 'lucide-react';
import { 
  CheckCircle as CheckCircleIcon,
  Inventory as InventoryIcon,
  CalendarToday as CalendarIcon,
  Timeline as MetricsIcon,
  BuildCircle as MaintenanceIcon
} from '@mui/icons-material';
import { Package } from 'lucide-react';
import { PageContainer, PageHeader } from '../../components/layout';

// Import styles
import { buttonSx, paperSx } from './styles';

// Import components
import { 
  DashboardHeader,
  AccountabilityStatusCard,
  CommandActionItemsCard,
  NTCRotationReadinessCard,
  PropertyDistributionVisualization,
  CriticalEquipmentStatusTable,
  UpcomingAccountabilityRequirements,
  RecentActivityFeed,
  SystemStatusFooter,
  EquipmentReadinessChart
} from './components';

// Import data
import {
  accountabilityData,
  actionItems,
  ntcReadiness,
  criticalEquipment,
  upcomingRequirements,
  recentActivity,
  distributionData,
  readinessData
} from './mockData';

const Dashboard = () => {
  const theme = useTheme();
  
  // Dashboard actions
  const headerActions = (
    <>
      <Button 
        variant="outlined" 
        startIcon={<MetricsIcon fontSize="small" />}
        sx={buttonSx}
      >
        Generate Reports
      </Button>
      <Button 
        variant="outlined" 
        startIcon={<MaintenanceIcon fontSize="small" />}
        sx={buttonSx}
      >
        Unit Status
      </Button>
    </>
  );
  
  return (
    <PageContainer
      header={
        <PageHeader 
          title="Commander's Dashboard"
          subtitle="Battalion Operations Status Overview"
          actions={headerActions}
        />
      }
    >
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Commander's Dashboard"
        user="CPT Rodriguez"
        totalValue="$4.2M"
        equipmentItems={721}
        sensitiveItemsStatus="100% Verified"
        dateTime="25FEB2025 0842"
      />
      
      {/* Quick Stats Banner */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <KpiStatsCard 
            icon={<InventoryIcon fontSize="small" />}
            title="Total Property Value"
            value="$4.2M"
            subtitle="Combined value of all accountable equipment"
            color={theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <KpiStatsCard 
            icon={<Package fontSize="small" />}
            title="Equipment Items"
            value="721"
            subtitle="Total accountable equipment line items"
            color={theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <KpiStatsCard 
            icon={<CheckCircleIcon fontSize="small" />}
            title="Sensitive Items"
            value="100%"
            subtitle="All items verified and accounted for"
            color={theme.palette.mode === 'dark' ? 
              theme.palette.success.main : 
              theme.palette.success.dark}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <KpiStatsCard 
            icon={<CalendarIcon fontSize="small" />}
            title="Current Date/Time"
            value="25FEB2025"
            subtitle="0842 local time"
            color={theme.palette.mode === 'dark' ? 
              theme.palette.secondary.main : 
              theme.palette.secondary.dark}
          />
        </Grid>
      </Grid>
      
      {/* Top Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Accountability Status Card */}
        <Grid item xs={12} md={4}>
          <AccountabilityStatusCard 
            overallRate={accountabilityData.overall}
            sensitiveItems={{
              verified: `${accountabilityData.sensitiveItems.verified}/${accountabilityData.sensitiveItems.total}`,
              lastVerification: accountabilityData.sensitiveItems.lastVerified,
              nextRequired: accountabilityData.sensitiveItems.nextRequired
            }}
            equipmentCategories={accountabilityData.categories.map(cat => ({
              name: cat.name,
              count: `${cat.verified}/${cat.total}`,
              percentage: cat.verified / cat.total * 100,
              lastVerified: cat.lastVerified,
              note: cat.status === 'warning' ? 'Needs attention' : undefined
            }))}
            onStartInventory={() => console.log('Start inventory')}
          />
        </Grid>
        
        {/* Command Action Items Card */}
        <Grid item xs={12} md={4}>
          <CommandActionItemsCard 
            actions={actionItems.map(item => ({
              priority: item.priority as any,
              item: item.item,
              type: item.type,
              deadline: item.deadline,
              action: 'Review and approve'
            }))}
            onViewAllActions={() => console.log('View all actions')}
          />
        </Grid>
        
        {/* NTC Rotation Readiness Card */}
        <Grid item xs={12} md={4}>
          <NTCRotationReadinessCard 
            title="NTC Rotation 25-08 Preparation"
            daysToDeployment={ntcReadiness.daysToDeployment}
            equipmentStatus={{
              requiredItems: ntcReadiness.equipmentStatus.required,
              currentOnHand: ntcReadiness.equipmentStatus.onHand,
              percentage: Math.round(ntcReadiness.equipmentStatus.onHand/ntcReadiness.equipmentStatus.required*100),
              criticalShortages: ntcReadiness.equipmentStatus.criticalShortages,
              serviceability: ntcReadiness.equipmentStatus.serviceability
            }}
            milestones={ntcReadiness.milestones.map(milestone => ({
              name: milestone.name,
              status: milestone.status === 'complete' 
                ? 'Complete' 
                : milestone.status === 'pending' ? 'Pending' : 'Delayed',
              date: milestone.date,
              daysRemaining: milestone.status === 'complete' ? null : 4 // Mock value, would be calculated
            }))}
            onViewNTCPlan={() => console.log('View NTC plan')}
          />
        </Grid>
      </Grid>
      
      {/* Main Content Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Property Distribution Visualization */}
        <Grid item xs={12} md={6}>
          <Box sx={paperSx(theme)}>
            <PropertyDistributionVisualization />
          </Box>
        </Grid>
        
        {/* Equipment Readiness Chart */}
        <Grid item xs={12} md={6}>
          <Box sx={paperSx(theme)}>
            <EquipmentReadinessChart data={readinessData} />
          </Box>
        </Grid>
      </Grid>
      
      {/* Critical Equipment Status */}
      <Box sx={{ ...paperSx(theme), mb: 3 }}>
        <CriticalEquipmentStatusTable 
          equipment={criticalEquipment.map(item => ({
            equipment: item.equipment,
            serialBumper: item.serialNumber,
            status: item.status as any,
            location: item.location,
            issue: item.issue,
            actionRequired: item.action,
            due: item.due
          }))}
        />
      </Box>
      
      {/* Bottom Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Upcoming Requirements */}
        <Grid item xs={12} md={6}>
          <UpcomingAccountabilityRequirements 
            weeklyRequirements={upcomingRequirements
              .filter(req => req.type === 'weekly')
              .map(req => ({
                name: req.name,
                due: req.dueDate,
                daysRemaining: 3, // Mock value, would be calculated
                progress: req.status.includes('%') 
                  ? parseInt(req.status) 
                  : undefined
              }))}
            monthlyRequirements={upcomingRequirements
              .filter(req => req.type === 'monthly')
              .map(req => ({
                name: req.name,
                due: req.dueDate,
                daysRemaining: 5, // Mock value, would be calculated
                progress: req.status.includes('%') 
                  ? parseInt(req.status) 
                  : undefined
              }))}
            quarterlyRequirements={upcomingRequirements
              .filter(req => req.type === 'quarterly')
              .map(req => ({
                name: req.name,
                due: req.dueDate,
                daysRemaining: 49, // Mock value, would be calculated
                progress: undefined
              }))}
            onStartInventory={() => console.log('Start inventory')}
          />
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Box sx={paperSx(theme)}>
            <RecentActivityFeed 
              activities={recentActivity.map(activity => ({
                date: activity.date,
                time: activity.time,
                activity: activity.activity,
                personnel: activity.personnel,
                details: activity.details,
                status: activity.status as any
              }))}
              onViewAllActivity={() => console.log('View all activity')}
            />
          </Box>
        </Grid>
      </Grid>
      
      {/* Footer */}
      <Box sx={paperSx(theme)}>
        <SystemStatusFooter 
          connectionStatus="Connected to GCSS-Army"
          lastUpdate="25FEB2025 0842"
          mobileAppStatus="37 Users Synchronized"
          systemNotice=""
        />
      </Box>
      
      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20, 
          borderRadius: 0,
        }}
        aria-label="add"
      >
        <Plus />
      </Fab>
    </PageContainer>
  );
};

export default Dashboard;
