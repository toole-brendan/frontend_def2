import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper,
  Card,
  CardContent,
  Button
} from '@mui/material';

const UnitInventory: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Unit Inventory
        </Typography>
        
        <Grid container spacing={3}>
          {/* Main Content Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Unit Inventory Management
              </Typography>
              <Typography variant="body1" paragraph>
                This page is under development. It will provide tools for managing and tracking unit inventory items,
                conducting inventories, and maintaining accountability of all equipment.
              </Typography>
              <Button variant="contained" color="primary">
                Start Inventory Process
              </Button>
            </Paper>
          </Grid>
          
          {/* Quick Stats Cards */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Total Equipment Items
                </Typography>
                <Typography variant="h3" color="primary" sx={{ mb: 1 }}>
                  1,247
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated: 25FEB2025
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Sensitive Items
                </Typography>
                <Typography variant="h3" color="primary" sx={{ mb: 1 }}>
                  210
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% Accounted For
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Scheduled Inventories
                </Typography>
                <Typography variant="h3" color="primary" sx={{ mb: 1 }}>
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next: 27FEB2025 (Sensitive Items)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UnitInventory; 