import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Avatar
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';
import { AnalyticsData } from '../../../types/sensitiveItems';

interface AnalyticsTabProps {
  analytics: AnalyticsData;
}

/**
 * AnalyticsTab component displays analytics and reports
 */
const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  analytics
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sensitive Items Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Weekly Inventory Compliance */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Weekly Inventory Compliance
            </Typography>
            <Box sx={{ 
              height: 250, 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography>Weekly Inventory Compliance Chart</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Item Category Distribution */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Item Category Distribution
            </Typography>
            <Box sx={{ 
              height: 250, 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography>Item Category Distribution Chart</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Verification Trend */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Verification Trend (Last 6 Months)
            </Typography>
            <Box sx={{ 
              height: 300, 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography>Verification Trend Chart</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Reports */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Available Reports
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          color: theme.palette.primary.main,
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          borderRadius: 0
                        }}
                      >
                        <AssessmentIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1">
                        Monthly Sensitive Items
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Comprehensive monthly report showing all sensitive items and their verification status.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      sx={{ borderRadius: 0 }}
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(theme.palette.warning.main, 0.15),
                          color: theme.palette.warning.main,
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          borderRadius: 0
                        }}
                      >
                        <WarningIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1">
                        Discrepancy Analysis
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Analysis of all discrepancies found during inventories with trends and patterns.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      sx={{ borderRadius: 0 }}
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(theme.palette.success.main, 0.15),
                          color: theme.palette.success.main,
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          borderRadius: 0
                        }}
                      >
                        <VerifiedUserIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1">
                        Blockchain Verification
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Report on blockchain verification status and history for all sensitive items.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      sx={{ borderRadius: 0 }}
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsTab;
