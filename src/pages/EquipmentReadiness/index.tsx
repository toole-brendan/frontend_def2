import React from 'react';
import { Grid, Button, useTheme, alpha } from '@mui/material';
import { PageContainer, PageHeader } from '../../components/layout';
import { BuildCircle as MaintenanceIcon, Timeline as MetricsIcon } from '@mui/icons-material';
import { readinessData } from './mockData';
import { buttonSx } from './styles';
import {
  OverallReadinessCard,
  ReadinessByCategoryCard,
  RecentActivityCard,
  MaintenanceActionsCard
} from './components';

const EquipmentReadiness: React.FC = () => {
  const theme = useTheme();

  // Header action buttons
  const headerActions = (
    <>
      <Button 
        variant="outlined" 
        startIcon={<MetricsIcon fontSize="small" />}
        sx={buttonSx}
      >
        View Metrics
      </Button>
      <Button 
        variant="outlined" 
        startIcon={<MaintenanceIcon fontSize="small" />}
        sx={buttonSx}
      >
        Manage Maintenance
      </Button>
    </>
  );

  return (
    <PageContainer
      header={
        <PageHeader 
          title="Equipment Readiness"
          actions={headerActions}
        />
      }
    >
      <Grid container spacing={3}>
        {/* Overall Readiness Card */}
        <Grid item xs={12}>
          <OverallReadinessCard 
            overallReadiness={readinessData.overallReadiness}
            equipmentStatus={readinessData.equipmentStatus}
            maintenanceStatus={readinessData.maintenanceStatus}
          />
        </Grid>
        
        {/* Readiness By Category Card */}
        <Grid item xs={12} md={8}>
          <ReadinessByCategoryCard 
            categoryData={readinessData.readinessByCategory}
          />
        </Grid>
        
        {/* Recent Activity Card */}
        <Grid item xs={12} md={4}>
          <RecentActivityCard 
            activities={readinessData.recentActivity}
          />
        </Grid>
        
        {/* Maintenance Actions Card */}
        <Grid item xs={12}>
          <MaintenanceActionsCard />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EquipmentReadiness;
