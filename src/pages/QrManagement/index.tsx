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

const QrManagement: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          QR Code Management
        </Typography>
        
        <Grid container spacing={3}>
          {/* Main Content Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                QR Code System
              </Typography>
              <Typography variant="body1" paragraph>
                This page allows you to generate, manage, and track QR codes for equipment items,
                facilitating rapid inventory and accountability processes.
              </Typography>
              <Button variant="contained" color="primary">
                Generate New QR Codes
              </Button>
            </Paper>
          </Grid>
          
          {/* Quick Action Cards */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Generate QR Codes
                </Typography>
                <Typography variant="body2" paragraph>
                  Create new QR codes for equipment items and print labels.
                </Typography>
                <Button variant="outlined" color="primary">
                  Generate
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Manage QR Codes
                </Typography>
                <Typography variant="body2" paragraph>
                  View, update, or delete existing QR code assignments.
                </Typography>
                <Button variant="outlined" color="primary">
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  QR Metrics
                </Typography>
                <Typography variant="body2" paragraph>
                  View usage statistics and scan history for QR codes.
                </Typography>
                <Button variant="outlined" color="primary">
                  View Metrics
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default QrManagement; 