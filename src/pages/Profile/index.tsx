import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Divider, 
  Button, 
  Avatar, 
  Chip,
  TextField
} from '@mui/material';
import { Edit as EditIcon, Security as SecurityIcon, History as HistoryIcon } from '@mui/icons-material';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';

const ProfilePage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="My Profile"
      />

      <Grid container spacing={3}>
        {/* User Information Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem'
                }}
              >
                M
              </Avatar>
              <Typography variant="h5" gutterBottom>CPT Michael Rodriguez</Typography>
              <Chip 
                label="B Co, 2-87 IN BN" 
                size="small" 
                sx={{ mb: 1 }} 
              />
              <Typography variant="body2" color="text.secondary" align="center">
                Company Commander
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" paragraph>
                Email: michael.rodriguez@mail.mil
              </Typography>
              <Typography variant="body2" paragraph>
                Phone: (555) 123-4567
              </Typography>
            </Box>
            
            <Button 
              variant="outlined" 
              startIcon={<EditIcon />}
              fullWidth
              size="small"
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* System Access & Permissions */}
        <Grid item xs={12} md={8}>
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
              <Typography variant="h6">System Access & Permissions</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>Role</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value="Company Commander"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>Access Level</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value="Company Administrator"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Permissions</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="Property Book Management" size="small" />
                  <Chip label="Inventory Administration" size="small" />
                  <Chip label="Reports Generation" size="small" />
                  <Chip label="Transfer Authorization" size="small" />
                  <Chip label="User Management" size="small" />
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Account Security</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
              >
                Change Password
              </Button>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ mb: 1 }}
              >
                Enable Two-Factor Authentication
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Activity History */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Recent Activity</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Generated Monthly Inventory Report</Typography>
              <Typography variant="body2" color="text.secondary">March 3, 2025 - 14:32</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Approved Hand Receipt Transfer</Typography>
              <Typography variant="body2" color="text.secondary">March 2, 2025 - 09:15</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Created New Sensitive Item Entry</Typography>
              <Typography variant="body2" color="text.secondary">March 1, 2025 - 11:42</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            
            <Box>
              <Typography variant="subtitle2">Completed Weekly Sensitive Items Inventory</Typography>
              <Typography variant="body2" color="text.secondary">February 28, 2025 - 16:05</Typography>
            </Box>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="text" size="small">View Full Activity History</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProfilePage;
