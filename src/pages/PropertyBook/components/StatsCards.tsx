import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  Box
} from '@mui/material';
import {
  Add as AddIcon,
  CloudDownload as ExportIcon,
  FilterList as FilterIcon,
  Assignment as AssignmentIcon,
  QrCode as QrCodeIcon
} from '@mui/icons-material';
import { StatsData } from '../types';

interface StatsCardsProps {
  statsData: StatsData;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ statsData }) => {
  return (
    <>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'primary.light' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Total Equipment Items
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="primary.dark">
              {statsData.totalItems}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              sx={{ mt: 2 }}
            >
              Add New Item
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'success.light' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Total Equipment Value
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="success.dark">
              {statsData.totalValue}
            </Typography>
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<ExportIcon />} 
              sx={{ mt: 2 }}
            >
              Generate Financial Report
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'info.light' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Property Book Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="contained" color="info" startIcon={<AssignmentIcon />}>
                Hand Receipts
              </Button>
              <Button variant="contained" color="info" startIcon={<QrCodeIcon />}>
                QR Codes
              </Button>
            </Box>
            <Button 
              variant="outlined" 
              color="info" 
              startIcon={<FilterIcon />}
              sx={{ mt: 2, width: '100%' }}
            >
              Advanced Filters
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Category Breakdown */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Equipment Categories
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {statsData.categories.map((category, index) => (
            <Grid item xs={6} md={2.4} key={index}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {category.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.name}
                </Typography>
                <Typography variant="caption" fontWeight="medium">
                  Value: {category.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
}; 