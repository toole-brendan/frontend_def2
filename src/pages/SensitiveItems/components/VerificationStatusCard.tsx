import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  LinearProgress,
  Chip,
  Button,
  Grid
} from '@mui/material';
import {
  Download as DownloadIcon,
  CalendarMonth as CalendarIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';

interface VerificationStats {
  dailyCheckTotal: number;
  dailyCheckComplete: number;
  weeklyVerificationTotal: number;
  weeklyVerificationComplete: number;
  monthlyInventoryCompliance: number;
  regulationCompliance: 'FULLY COMPLIANT' | 'PARTIALLY COMPLIANT' | 'NON-COMPLIANT';
  averageInventoryTime: string;
  verificationAccuracy: number;
  discrepanciesLast90Days: number;
  blockchainVerified: number;
  blockchainTotal: number;
}

interface VerificationStatusCardProps {
  stats: VerificationStats;
  onDownloadReport: () => void;
  onConductInventory: () => void;
}

const VerificationStatusCard: React.FC<VerificationStatusCardProps> = ({
  stats,
  onDownloadReport,
  onConductInventory
}) => {
  const getComplianceColor = (status: string): 'success' | 'warning' | 'error' => {
    if (status === 'FULLY COMPLIANT') return 'success';
    if (status === 'PARTIALLY COMPLIANT') return 'warning';
    return 'error';
  };

  return (
    <Paper elevation={2} sx={{ height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          Current Verification Status
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ 
              p: 1.5, 
              borderRadius: 1, 
              bgcolor: 
                stats.regulationCompliance === 'FULLY COMPLIANT' 
                  ? 'success.light' 
                  : stats.regulationCompliance === 'PARTIALLY COMPLIANT'
                    ? 'warning.light'
                    : 'error.light',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold"
                color={
                  stats.regulationCompliance === 'FULLY COMPLIANT' 
                    ? 'success.dark' 
                    : stats.regulationCompliance === 'PARTIALLY COMPLIANT'
                      ? 'warning.dark'
                      : 'error.dark'
                }
              >
                AR 710-2 Compliance Status:
              </Typography>
              <Chip 
                label={stats.regulationCompliance} 
                color={getComplianceColor(stats.regulationCompliance)}
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Overall Stats
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Items requiring daily check:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {stats.dailyCheckComplete}/{stats.dailyCheckTotal} complete
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(stats.dailyCheckComplete / stats.dailyCheckTotal) * 100} 
                color={stats.dailyCheckComplete === stats.dailyCheckTotal ? "success" : "warning"}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Items requiring weekly verification:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {stats.weeklyVerificationComplete}/{stats.weeklyVerificationTotal} complete
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(stats.weeklyVerificationComplete / stats.weeklyVerificationTotal) * 100} 
                color={stats.weeklyVerificationComplete === stats.weeklyVerificationTotal ? "success" : "warning"}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Monthly inventory compliance:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {stats.monthlyInventoryCompliance}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={stats.monthlyInventoryCompliance} 
                color={stats.monthlyInventoryCompliance === 100 ? "success" : "warning"}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Verification Metrics
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Average inventory completion time:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {stats.averageInventoryTime}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Verification accuracy:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {stats.verificationAccuracy}% ({stats.discrepanciesLast90Days} discrepancies in last 90 days)
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Blockchain verification status:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {stats.blockchainVerified === stats.blockchainTotal && <VerifiedUserIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />}
                  <Typography variant="body2" fontWeight="medium">
                    {stats.blockchainVerified}/{stats.blockchainTotal} verified
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="medium"
                  startIcon={<DownloadIcon />}
                  onClick={onDownloadReport}
                >
                  Download Verification Report
                </Button>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }} />
            <Box 
              sx={{ 
                mt: 1,
                p: 1,
                borderRadius: 1,
                border: '1px dashed',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <CalendarIcon color="action" />
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Calendar showing inventory history with color-coded status would display here
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary"
              fullWidth
              onClick={onConductInventory}
              sx={{ mt: 1 }}
            >
              Conduct Sensitive Item Inventory
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default VerificationStatusCard; 