import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// Mock analytics data
const analyticsData = {
  inventoryCompletionTime: '42 minutes',
  discrepancyRate: '0.3%',
  discrepancyItems: 2,
  totalItems: 721,
  inventoryTimeliness: '100%',
  commonDiscrepancies: 'Location errors (67%)',
  timeSaved: '73%',
  errorReduction: '92%',
  complianceImprovement: '100% vs 87% prior quarter'
};

export const InventoryAnalyticsCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Card elevation={2}>
      <CardHeader 
        title="Inventory Performance" 
        action={<BarChartIcon />}
      />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>Metrics Overview</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Average inventory time
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MoreTimeIcon 
                  sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 18 }} 
                />
                <Typography variant="body2" fontWeight="medium">
                  {analyticsData.inventoryCompletionTime}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                (sensitive items)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Discrepancy rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShowChartIcon 
                  sx={{ mr: 1, color: theme.palette.success.main, fontSize: 18 }} 
                />
                <Typography variant="body2" fontWeight="medium">
                  {analyticsData.discrepancyRate}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                ({analyticsData.discrepancyItems} of {analyticsData.totalItems} items)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Inventory timeliness
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimelineIcon 
                  sx={{ mr: 1, color: theme.palette.success.main, fontSize: 18 }} 
                />
                <Typography variant="body2" fontWeight="medium">
                  {analyticsData.inventoryTimeliness}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                on schedule
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Common discrepancies
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {analyticsData.commonDiscrepancies}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Small chart placeholder */}
        <Box 
          sx={{ 
            height: 80, 
            width: '100%', 
            backgroundColor: theme.palette.action.hover,
            borderRadius: 1,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Inventory Performance Chart
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>Efficiency Metrics</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Time saved vs. paper process:</Typography>
              <Typography variant="body2" fontWeight="medium" color="success.main">
                {analyticsData.timeSaved} reduction
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Error reduction rate:</Typography>
              <Typography variant="body2" fontWeight="medium" color="success.main">
                {analyticsData.errorReduction} lower
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Regulatory compliance:</Typography>
              <Typography variant="body2" fontWeight="medium" color="success.main">
                {analyticsData.complianceImprovement}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="text"
            color="primary"
            endIcon={<BarChartIcon />}
          >
            View Detailed Analytics
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 