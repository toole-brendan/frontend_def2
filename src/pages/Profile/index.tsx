import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent
} from '@mui/material';

const Profile: React.FC = () => {
  // Mock user data
  const userData = {
    name: "CPT Michael Rodriguez",
    rank: "Captain",
    unit: "B Company, 2-87 Infantry",
    role: "Company Commander",
    email: "michael.rodriguez@army.mil",
    phone: "(555) 123-4567",
    lastLogin: "25FEB2025 0730",
    accountCreated: "14JUN2024",
    permissions: [
      "Property Book Access",
      "Inventory Management",
      "Hand Receipt Holder",
      "Maintenance Request Creation",
      "Report Generation"
    ]
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          User Profile
        </Typography>
        
        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mb: 2,
                    fontSize: '3rem',
                    bgcolor: 'primary.main' 
                  }}
                >
                  {userData.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" fontWeight="bold">
                  {userData.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {userData.rank} • {userData.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userData.unit}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemText 
                    primary="Email" 
                    secondary={userData.email} 
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemText 
                    primary="Phone" 
                    secondary={userData.phone} 
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemText 
                    primary="Last Login" 
                    secondary={userData.lastLogin} 
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemText 
                    primary="Account Created" 
                    secondary={userData.accountCreated} 
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
              </List>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>
          
          {/* User Permissions */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                System Permissions
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {userData.permissions.map((permission, index) => (
                  <Grid item key={index}>
                    <Box 
                      sx={{ 
                        bgcolor: 'primary.light',
                        color: 'primary.dark',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 'medium'
                      }}
                    >
                      {permission}
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Button variant="outlined" color="primary">
                Request Additional Access
              </Button>
            </Paper>
            
            {/* Recent Activity */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity
              </Typography>
              
              <List>
                <ListItem sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
                  <ListItemText 
                    primary="Completed Sensitive Item Inventory" 
                    secondary="25FEB2025 0730"
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
                <ListItem sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
                  <ListItemText 
                    primary="Signed Hand Receipt (1LT Chen)" 
                    secondary="24FEB2025 1645"
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
                <ListItem sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
                  <ListItemText 
                    primary="Approved Maintenance Request (HMMWV #HQ-237)" 
                    secondary="24FEB2025 1432"
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
                <ListItem sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
                  <ListItemText 
                    primary="Generated Monthly Supply Activity Report" 
                    secondary="23FEB2025 0915"
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              </List>
              
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }}
              >
                View Full Activity History
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 