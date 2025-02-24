import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab, Typography, Paper, styled, Container } from '@mui/material';
import PageTitle from '../../components/common/PageTitle';
import { UserTable } from './components/UserTable';
import { UserFilters } from './components/UserFilters';
import { ActivityLogs } from './components/ActivityLogs';
import { RolesPermissions } from './components/RolesPermissions';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

type TabValue = 'users' | 'activity' | 'roles' | 'settings';

interface UserFiltersState {
  role: string;
  status: string;
  rank: string;
}

const UserManagement: React.FC = () => {
  const [searchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('users');
  
  const handleFiltersChange = (filters: UserFiltersState) => {
    // TODO: Apply filters to the table data
    console.log('Filters changed:', filters);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <PageTitle variant="h4" gutterBottom>
            USER MANAGEMENT
          </PageTitle>
          <Typography variant="body2" color="text.secondary">
            Manage users, roles, permissions and monitor system activity
          </Typography>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="User Management" value="users" />
            <Tab label="Activity Logs" value="activity" />
            <Tab label="Roles & Permissions" value="roles" />
            <Tab label="Settings" value="settings" />
          </Tabs>
        </Box>

        {/* Content based on active tab */}
        {activeTab === 'users' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard>
                <div className="card-header">
                  <Typography variant="h6">MANAGE USERS</Typography>
                </div>
                <div className="card-content">
                  <UserFilters onFiltersChange={handleFiltersChange} />
                  <UserTable searchQuery={searchQuery} />
                </div>
              </DashboardCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 'activity' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard>
                <div className="card-header">
                  <Typography variant="h6">ACTIVITY LOGS</Typography>
                </div>
                <div className="card-content">
                  <ActivityLogs />
                </div>
              </DashboardCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 'roles' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard>
                <div className="card-header">
                  <Typography variant="h6">ROLES & PERMISSIONS</Typography>
                </div>
                <div className="card-content">
                  <RolesPermissions />
                </div>
              </DashboardCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 'settings' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard>
                <div className="card-header">
                  <Typography variant="h6">SETTINGS</Typography>
                </div>
                <div className="card-content">
                  {/* TODO: Add Settings component */}
                  <Box>Settings content coming soon</Box>
                </div>
              </DashboardCard>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default UserManagement; 