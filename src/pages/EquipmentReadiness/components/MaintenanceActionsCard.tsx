import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button,
  alpha,
  useTheme
} from '@mui/material';
import { 
  BuildCircle as MaintenanceIcon,
  CheckCircleOutline as ReadyIcon,
  CalendarMonth as ScheduleIcon,
  Assignment as WorkOrderIcon,
  Timeline as MetricsIcon
} from '@mui/icons-material';
import { paperSx, sectionHeaderSx } from '../styles';

export const MaintenanceActionsCard: React.FC = () => {
  const theme = useTheme();

  const actionCardSx = (color: string) => ({
    p: 0, 
    borderRadius: 0,
    border: `1px solid ${alpha(color, 0.2)}`,
    bgcolor: alpha(color, 0.05),
    overflow: 'hidden',
  });

  const actionButtonSx = {
    borderRadius: 0,
    fontWeight: 'medium',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    boxShadow: 'none',
  };

  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={sectionHeaderSx}
        >
          Maintenance Actions
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={3}>
            <Paper 
              sx={actionCardSx(theme.palette.primary.main)}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkOrderIcon 
                    color="primary" 
                    sx={{ 
                      mr: 1,
                      fontSize: 28,
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'medium', 
                      color: theme.palette.primary.dark,
                      fontSize: '0.9rem',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Create Work Order
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: '0.75rem',
                    height: 40,
                  }}
                >
                  Submit a new maintenance work order or service request (DA Form 5988-E).
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={actionButtonSx}
                >
                  New Work Order
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Paper 
              sx={actionCardSx(theme.palette.success.main)}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ReadyIcon 
                    color="success" 
                    sx={{ 
                      mr: 1,
                      fontSize: 28,
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'medium', 
                      color: theme.palette.success.dark,
                      fontSize: '0.9rem',
                      letterSpacing: '0.03em',
                    }}
                  >
                    PMCS Records
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: '0.75rem',
                    height: 40,
                  }}
                >
                  Record preventive maintenance checks and services for equipment.
                </Typography>
                <Button 
                  variant="contained" 
                  color="success" 
                  fullWidth
                  sx={actionButtonSx}
                >
                  Record PMCS
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Paper 
              sx={actionCardSx(theme.palette.warning.main)}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ScheduleIcon 
                    color="warning" 
                    sx={{ 
                      mr: 1,
                      fontSize: 28,
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'medium', 
                      color: theme.palette.warning.dark,
                      fontSize: '0.9rem',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Schedule Service
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: '0.75rem',
                    height: 40,
                  }}
                >
                  Schedule maintenance services and track service intervals.
                </Typography>
                <Button 
                  variant="contained" 
                  color="warning" 
                  fullWidth
                  sx={actionButtonSx}
                >
                  Schedule Service
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Paper 
              sx={actionCardSx(theme.palette.info.main)}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MetricsIcon 
                    color="info" 
                    sx={{ 
                      mr: 1,
                      fontSize: 28,
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'medium', 
                      color: theme.palette.info.dark,
                      fontSize: '0.9rem',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Readiness Report
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: '0.75rem',
                    height: 40,
                  }}
                >
                  Generate equipment readiness report for command review.
                </Typography>
                <Button 
                  variant="contained" 
                  color="info" 
                  fullWidth
                  sx={actionButtonSx}
                >
                  Generate Report
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
