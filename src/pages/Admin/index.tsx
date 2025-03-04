import React from 'react';
import { Typography, Box, Paper, Grid, Divider, Button } from '@mui/material';
import {
  People as PeopleIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  IntegrationInstructions as IntegrationIcon
} from '@mui/icons-material';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';

const AdminPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Admin Portal"
      />

      <Grid container spacing={3}>
        {/* User Management */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">User Management</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" paragraph>
              Manage users, roles, and permissions within the system. Create new user accounts, 
              assign roles, and control access to different parts of the application.
            </Typography>
            <Button variant="outlined" size="small">
              Manage Users
            </Button>
          </Paper>
        </Grid>

        {/* Unit Configuration */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Unit Configuration</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure unit-specific settings, organizational structure, and customize
              the system to match your unit's requirements and workflows.
            </Typography>
            <Button variant="outlined" size="small">
              Configure Unit
            </Button>
          </Paper>
        </Grid>

        {/* System Integration */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IntegrationIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">System Integration</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" paragraph>
              Manage connections with external systems including GCSS-Army, 
              IPPS-A, and other Army systems. Configure API settings and 
              synchronization schedules.
            </Typography>
            <Button variant="outlined" size="small">
              Configure Integrations
            </Button>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Security Settings</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure security policies, password requirements, and access controls.
              Monitor system logs and manage authentication settings.
            </Typography>
            <Button variant="outlined" size="small">
              Security Configuration
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdminPage;
