import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button,
  LinearProgress,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { BuildCircle as MaintenanceIcon, CalendarMonth as ScheduleIcon, Assignment as WorkOrderIcon, WarningAmber as DeadlinedIcon } from '@mui/icons-material';
import { getStatusColor } from '../utils';
import { cardWithCornerSx, chipSx } from '../styles';
import { titleTypographySx } from '../../../theme/patterns';

interface OverallReadinessCardProps {
  overallReadiness: number;
  equipmentStatus: {
    fullyMissionCapable: number;
    partiallyMissionCapable: number;
    nonMissionCapable: number;
    totalEquipment: number;
  };
  maintenanceStatus: {
    scheduledServices: number;
    pendingWorkOrders: number;
    deadlinedItems: number;
  };
}

export const OverallReadinessCard: React.FC<OverallReadinessCardProps> = ({
  overallReadiness,
  equipmentStatus,
  maintenanceStatus
}) => {
  const theme = useTheme();
  const statusColor = getStatusColor(overallReadiness, theme);

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))} 
    >
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            ...titleTypographySx(theme, 'medium'),
            fontSize: '1.25rem', 
            fontWeight: 600,
            letterSpacing: '0.01em'
          }}
        >
          Overall Equipment Readiness
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  color: statusColor,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                }}
              >
                {overallReadiness}%
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 1, 
                  ml: 1, 
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.03em',
                  fontWeight: 'medium',
                }}
              >
                Mission Capable Rate
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={overallReadiness} 
              sx={{ 
                height: 10, 
                borderRadius: 0, 
                mb: 2,
                bgcolor: alpha(statusColor, 0.1),
                '.MuiLinearProgress-bar': {
                  transition: 'transform 0.3s ease',
                  bgcolor: statusColor
                }
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  fontWeight: 'medium',
                }}
              >
                Equipment Status:
              </Typography>
              <Box>
                <Chip 
                  size="small" 
                  label={`${equipmentStatus.fullyMissionCapable} FMC`} 
                  sx={{ 
                    mr: 1, 
                    ...chipSx(theme, theme.palette.success.main)
                  }}
                />
                <Chip 
                  size="small" 
                  label={`${equipmentStatus.partiallyMissionCapable} PMC`} 
                  sx={{ 
                    mr: 1, 
                    ...chipSx(theme, theme.palette.warning.main)
                  }}
                />
                <Chip 
                  size="small" 
                  label={`${equipmentStatus.nonMissionCapable} NMC`} 
                  sx={chipSx(theme, theme.palette.error.main)}
                />
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper 
                  sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    borderRadius: 0,
                  }}
                >
                  <ScheduleIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      my: 1, 
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {maintenanceStatus.scheduledServices}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'medium',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Scheduled Services
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={4}>
                <Paper 
                  sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    bgcolor: alpha(theme.palette.warning.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                    borderRadius: 0, 
                  }}
                >
                  <WorkOrderIcon color="warning" sx={{ fontSize: 40 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      my: 1, 
                      color: theme.palette.warning.dark,
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {maintenanceStatus.pendingWorkOrders}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'medium',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Work Orders
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={4}>
                <Paper 
                  sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    bgcolor: alpha(theme.palette.error.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                    borderRadius: 0,
                  }}
                >
                  <DeadlinedIcon color="error" sx={{ fontSize: 40 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      my: 1, 
                      color: theme.palette.error.dark,
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {maintenanceStatus.deadlinedItems}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'medium',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Deadlined Items
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  startIcon={<MaintenanceIcon />}
                  sx={{ 
                    borderRadius: 0,
                    fontWeight: 'medium',
                    letterSpacing: '0.03em',
                    boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.5)}`,
                  }}
                >
                  Manage Maintenance
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
