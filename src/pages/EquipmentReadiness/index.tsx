import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Button,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import { 
  BuildCircle as MaintenanceIcon,
  CheckCircleOutline as ReadyIcon,
  WarningAmber as DeadlinedIcon,
  ErrorOutline as NonMissionCapableIcon,
  Timeline as MetricsIcon,
  Assignment as WorkOrderIcon,
  CalendarMonth as ScheduleIcon,
  History as HistoryIcon
} from '@mui/icons-material';

const EquipmentReadiness: React.FC = () => {
  // Mock equipment readiness data
  const readinessData = {
    overallReadiness: 87,
    equipmentStatus: {
      fullyMissionCapable: 245,
      partiallyMissionCapable: 32,
      nonMissionCapable: 18,
      totalEquipment: 295
    },
    maintenanceStatus: {
      scheduledServices: 14,
      pendingWorkOrders: 27,
      deadlinedItems: 18
    },
    readinessByCategory: [
      { category: "Vehicles", readinessRate: 92, total: 85, mission_capable: 78 },
      { category: "Communications", readinessRate: 89, total: 112, mission_capable: 100 },
      { category: "Weapons Systems", readinessRate: 95, total: 63, mission_capable: 60 },
      { category: "Power Generation", readinessRate: 72, total: 35, mission_capable: 25 }
    ],
    recentActivity: [
      { action: "5988-E Submitted", item: "HMMWV #A23145", user: "SPC Thompson", datetime: "25FEB2025 0730", status: "Pending" },
      { action: "Service Complete", item: "Generator #P45128", user: "SSG Wilson", datetime: "24FEB2025 1630", status: "Complete" },
      { action: "Deadline Report", item: "LMTV #B56789", user: "1LT Chen", datetime: "24FEB2025 0900", status: "Approved" }
    ]
  };

  const getStatusColor = (rate: number) => {
    if (rate >= 90) return 'success';
    if (rate >= 80) return 'primary';
    if (rate >= 70) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Equipment Readiness
        </Typography>
        
        {/* Overall Readiness Card */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Overall Equipment Readiness
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                    <Typography variant="h2" fontWeight="bold" color={getStatusColor(readinessData.overallReadiness)}>
                      {readinessData.overallReadiness}%
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1, ml: 1 }}>
                      Mission Capable Rate
                    </Typography>
                  </Box>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={readinessData.overallReadiness} 
                    color={getStatusColor(readinessData.overallReadiness)}
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Equipment Status:
                    </Typography>
                    <Box>
                      <Chip 
                        size="small" 
                        label={`${readinessData.equipmentStatus.fullyMissionCapable} FMC`} 
                        color="success"
                        sx={{ mr: 1, fontWeight: 'medium' }}
                      />
                      <Chip 
                        size="small" 
                        label={`${readinessData.equipmentStatus.partiallyMissionCapable} PMC`} 
                        color="warning"
                        sx={{ mr: 1, fontWeight: 'medium' }}
                      />
                      <Chip 
                        size="small" 
                        label={`${readinessData.equipmentStatus.nonMissionCapable} NMC`} 
                        color="error"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Card elevation={1} sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light' }}>
                        <ScheduleIcon color="primary" sx={{ fontSize: 40 }} />
                        <Typography variant="h4" color="primary.dark" fontWeight="bold" sx={{ my: 1 }}>
                          {readinessData.maintenanceStatus.scheduledServices}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Scheduled Services
                        </Typography>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Card elevation={1} sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light' }}>
                        <WorkOrderIcon color="warning" sx={{ fontSize: 40 }} />
                        <Typography variant="h4" color="warning.dark" fontWeight="bold" sx={{ my: 1 }}>
                          {readinessData.maintenanceStatus.pendingWorkOrders}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Work Orders
                        </Typography>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Card elevation={1} sx={{ textAlign: 'center', p: 2, bgcolor: 'error.light' }}>
                        <DeadlinedIcon color="error" sx={{ fontSize: 40 }} />
                        <Typography variant="h4" color="error.dark" fontWeight="bold" sx={{ my: 1 }}>
                          {readinessData.maintenanceStatus.deadlinedItems}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Deadlined Items
                        </Typography>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        startIcon={<MaintenanceIcon />}
                      >
                        Manage Maintenance
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Readiness By Category */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Readiness by Category
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {readinessData.readinessByCategory.map((category, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {category.category}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight="medium" color={getStatusColor(category.readinessRate)}>
                          {category.readinessRate}% Ready
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({category.mission_capable}/{category.total})
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={category.readinessRate} 
                      color={getStatusColor(category.readinessRate)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<MetricsIcon />}
                  >
                    View Detailed Metrics
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<NonMissionCapableIcon />}
                  >
                    View NMC Equipment
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Maintenance Activity
              </Typography>
              
              <List disablePadding>
                {readinessData.recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <HistoryIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={activity.action}
                        secondary={`${activity.item} • ${activity.user} • ${activity.datetime}`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                      <Chip 
                        label={activity.status} 
                        size="small"
                        color={activity.status === "Complete" ? "success" : 
                               activity.status === "Approved" ? "info" : "warning"}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                sx={{ mt: 2 }}
              >
                View All Activity
              </Button>
            </Paper>
          </Grid>
          
          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Maintenance Actions
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={3}>
                  <Card elevation={0} sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <WorkOrderIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" fontWeight="medium" color="primary.dark">
                          Create Work Order
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Submit a new maintenance work order or service request (DA Form 5988-E).
                      </Typography>
                      <Button variant="contained" color="primary" fullWidth>
                        New Work Order
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Card elevation={0} sx={{ bgcolor: 'success.light', p: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ReadyIcon color="success" sx={{ mr: 1 }} />
                        <Typography variant="h6" fontWeight="medium" color="success.dark">
                          PMCS Records
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Record preventive maintenance checks and services for equipment.
                      </Typography>
                      <Button variant="contained" color="success" fullWidth>
                        Record PMCS
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Card elevation={0} sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                        <Typography variant="h6" fontWeight="medium" color="warning.dark">
                          Schedule Service
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Schedule maintenance services and track service intervals.
                      </Typography>
                      <Button variant="contained" color="warning" fullWidth>
                        Schedule Service
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Card elevation={0} sx={{ bgcolor: 'info.light', p: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MetricsIcon color="info" sx={{ mr: 1 }} />
                        <Typography variant="h6" fontWeight="medium" color="info.dark">
                          Readiness Report
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Generate equipment readiness report for command review.
                      </Typography>
                      <Button variant="contained" color="info" fullWidth>
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EquipmentReadiness; 