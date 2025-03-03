import React, { useState, useCallback } from 'react';
import { 
  Fab, 
  Grid,
  Box,
  Button,
  useTheme,
  alpha,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import { KpiStatsCard } from '../../components/common';
import { Plus, AlertCircle } from 'lucide-react';
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

// Action notification states
type ActionType = 'success' | 'info' | 'warning' | 'error';
interface NotificationState {
  open: boolean;
  message: string;
  type: ActionType;
}

// Dialog states
interface DialogState {
  open: boolean;
  title: string;
  content: React.ReactNode | string;
  action?: () => void;
  actionText?: string;
}

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
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    type: 'info'
  });
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: '',
    content: ''
  });
  
  // Handle showing notifications
  const showNotification = useCallback((message: string, type: ActionType = 'info') => {
    setNotification({
      open: true,
      message,
      type
    });
  }, []);

  // Handle closing notifications
  const handleNotificationClose = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  }, []);
  
  // Handle showing dialogs
  const showDialog = useCallback((title: string, content: React.ReactNode | string, actionText?: string, action?: () => void) => {
    setDialog({
      open: true,
      title,
      content,
      action,
      actionText
    });
  }, []);
  
  // Handle closing dialogs
  const handleDialogClose = useCallback(() => {
    setDialog(prev => ({
      ...prev,
      open: false
    }));
  }, []);
  
  // Handle dialog action
  const handleDialogAction = useCallback(() => {
    if (dialog.action) {
      dialog.action();
    }
    handleDialogClose();
  }, [dialog, handleDialogClose]);
  
  // Common handlers for various actions
  const handleStartInventory = useCallback(() => {
    showDialog(
      "Start Inventory",
      "Are you sure you want to initiate a new inventory action? This will notify all hand receipt holders.",
      "Start Inventory",
      () => {
        showNotification("Inventory process initiated successfully", "success");
      }
    );
  }, [showDialog, showNotification]);
  
  const handleViewAllActions = useCallback(() => {
    showDialog(
      "Pending Actions", 
      <Typography>
        There are 12 total pending actions requiring your attention across all systems:
        <ul>
          <li>High Priority: 4 items</li>
          <li>Medium Priority: 5 items</li>
          <li>Low Priority: 3 items</li>
        </ul>
      </Typography>,
      "View in Command Center"
    );
  }, [showDialog]);
  
  const handleViewNTCPlan = useCallback(() => {
    showDialog(
      "NTC Rotation 25-08 Preparation Plan",
      <Typography>
        The NTC Rotation 25-08 Preparation Plan is currently 64% complete. Critical milestones include:
        <ul>
          <li>Initial Sourcing Plan: Due 01MAR (4 days)</li>
          <li>Maintenance Completion: 15MAY</li>
          <li>Load Plans Due: 01JUN</li>
        </ul>
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          You have 121 days remaining until deployment.
        </Typography>
      </Typography>,
      "Download Full Plan"
    );
  }, [showDialog]);
  
  // Dashboard header actions
  const headerActions = (
    <>
      <Button 
        variant="outlined" 
        startIcon={<MetricsIcon fontSize="small" />}
        sx={buttonSx}
        onClick={() => showNotification("Generating reports...", "info")}
      >
        Generate Reports
      </Button>
      <Button 
        variant="outlined" 
        startIcon={<MaintenanceIcon fontSize="small" />}
        sx={buttonSx}
        onClick={() => showDialog("Unit Status", "Unit is currently at 93% operational readiness. No critical issues reported.")}
      >
        Unit Status
      </Button>
    </>
  );
  
  return (
    <PageContainer
      header={
        <PageHeader 
          title="Dashboard"
          actions={headerActions}
        />
      }
    >
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.type} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      
      {/* Action Dialog */}
      <Dialog
        open={dialog.open}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>{dialog.title}</DialogTitle>
        <DialogContent>
          {typeof dialog.content === 'string' ? (
            <Typography>{dialog.content}</Typography>
          ) : dialog.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          {dialog.action && dialog.actionText && (
            <Button onClick={handleDialogAction} variant="contained" color="primary">
              {dialog.actionText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Dashboard"
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
            onStartInventory={handleStartInventory}
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
            onViewAllActions={handleViewAllActions}
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
            onViewNTCPlan={handleViewNTCPlan}
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
            onStartInventory={handleStartInventory}
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
              onViewAllActivity={() => showDialog(
                "Recent Activity Log",
                "Viewing the complete activity log for the last 30 days. This includes all property transactions, inventories, and maintenance actions.",
                "Export to PDF"
              )}
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
        onClick={() => showDialog(
          "Quick Actions",
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" color="primary" fullWidth startIcon={<AlertCircle />}>
              Conduct Sensitive Item Inventory
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Sign Pending Hand Receipts
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Review Transfer Requests
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Generate Property Report
            </Button>
          </Box>,
          "Close"
        )}
      >
        <Plus />
      </Fab>
    </PageContainer>
  );
};

export default Dashboard;
