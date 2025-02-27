import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  DashboardHeader,
  AccountabilityStatusCard,
  CommandDirectedActions,
  SensitiveItemsTable,
  MaintenanceReadinessCard,
  BattalionActivityFeed,
  CommandSupplyActions,
  DashboardFooter
} from './components';
import { mockDashboardData } from './mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const data = mockDashboardData;

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <DashboardHeader unitInfo={data.unitInfo} />

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column (Primary Focus) */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              <AccountabilityStatusCard 
                overallRate={data.accountabilityStatus.overallRate} 
                subHandReceipts={data.accountabilityStatus.subHandReceipts} 
              />
              
              <CommandDirectedActions 
                actions={data.commandDirectedActions} 
              />
              
              <SensitiveItemsTable 
                items={data.sensitiveItems} 
              />
            </Box>
          </Grid>

          {/* Right Column (Supporting Info) */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              <MaintenanceReadinessCard 
                statuses={data.maintenanceReadiness.statuses} 
              />
              
              <BattalionActivityFeed 
                activities={data.battalionActivities} 
              />
              
              <CommandSupplyActions 
                actions={data.commandSupplyActions} 
              />
            </Box>
          </Grid>
        </Grid>
        
        {/* Footer Section */}
        <DashboardFooter gcssStatus={data.gcssStatus} />
      </Box>
    </Container>
  );
};

export default Dashboard; 