import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  KeyMetricsCards,
  UnitInventoryOverview,
  ActionableTasks,
  PersonnelOverview,
  NotificationsPanel,
  RecentActivityFeed,
} from './components';
import { mockDashboardData } from './mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const data = mockDashboardData;

  const handleViewAllCriticalItems = () => {
    navigate('/inventory/critical');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                CPT DOE, JOHN
              </Typography>
              <Typography variant="body2" color="text.secondary">
                C CO, 2-506 IN, 3BCT, 101st ABN DIV (AASLT)
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Key Metrics Section */}
        <Box sx={{ mb: 4 }}>
          <KeyMetricsCards
            stats={{
              total: data.propertyStats.totalItems,
              serviceableItems: data.propertyStats.serviceableItems,
              maintenanceNeeded: data.propertyStats.maintenanceNeeded,
              pendingTransfers: data.propertyStats.pendingTransfers.count,
              overdueItems: data.propertyStats.overdueItems,
            }}
          />
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              <ActionableTasks
                stats={{
                  pendingTransfers: data.propertyStats.pendingTransfers,
                  maintenanceRequests: data.propertyStats.maintenanceRequests,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <UnitInventoryOverview
                  stats={{
                    criticalItems: data.propertyStats.criticalItems,
                  }}
                  onViewAll={handleViewAllCriticalItems}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              <NotificationsPanel notifications={data.notifications} />
              <PersonnelOverview stats={data.personnelStats} />
              <Box sx={{ flex: 1 }}>
                <RecentActivityFeed activities={data.activities} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 