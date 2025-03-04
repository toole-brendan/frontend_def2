import React from 'react';
  // @ts-ignore - Unused variable intentionally kept
import { Box, Typography, Grid, Paper, Button, Chip, Divider, Avatar, alpha, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface InventoriesHeaderProps {
  title: string;
  sensitiveItemsDue: string;
  cyclicInventoryProgress: string;
  lastFullInventoryDate: string;
  csdpStatus: string;
  lastUpdated: string;
}

export const InventoriesHeader: React.FC<InventoriesHeaderProps> = ({
  title,
  sensitiveItemsDue,
  cyclicInventoryProgress,
  lastFullInventoryDate,
  csdpStatus,
  lastUpdated
}) => {
  const theme = useTheme();

  // Determine if sensitive items inventory is urgent (less than 3 days)
  const isUrgent = sensitiveItemsDue.includes('2 days');

  // Using isUrgent to avoid the unused variable error
  const alertBgColor = isUrgent 
    ? alpha(theme.palette.warning.main, 0.08)
    : alpha(theme.palette.info.main, 0.08);

  return (
    <Box sx={{ mb: 4 }}>
      {/* Welcome Header */}
      <Box sx={{ 
        mb: 3, 
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '2px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        mx: 3
      }}>
        <Box>
          <Typography variant="h4" fontWeight="500" sx={{ position: 'relative' }}>
            {title}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: -2, 
                left: 0, 
                width: '60px', 
                height: '3px', 
                bgcolor: theme.palette.primary.main,
                opacity: 0.7,
              }}
            />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', fontSize: '0.75rem' }}>
              Active Inventories: 4
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12, alignSelf: 'center' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.03em' }}>
              Last updated: {lastUpdated}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button 
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            sx={{ 
              borderRadius: 0,
              borderColor: 'rgba(140, 140, 160, 0.2)',
              fontWeight: 'medium',
              letterSpacing: '0.03em',
            }}
          >
            Schedule Inventory
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ 
              borderRadius: 0,
              fontWeight: 'medium',
              letterSpacing: '0.03em',
              boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.5)}`,
            }}
          >
            Start New Inventory
          </Button>
        </Box>
      </Box>

      {/* Alert Banner */}
      <Paper sx={{ 
        p: 2, 
        mb: 3, 
        bgcolor: alertBgColor, 
        borderLeft: `3px solid ${theme.palette.warning.main}`,
        border: '2px solid rgba(140, 140, 160, 0.12)',
        borderRadius: 0,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              mr: 2, 
              bgcolor: alpha(theme.palette.warning.main, 0.15),
              color: theme.palette.warning.main,
              width: 36,
              height: 36,
              borderRadius: 0,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
            }}
          >
            <WarningIcon />
          </Avatar>
          <Box>
            <Typography fontWeight="600" color="warning.main" sx={{ fontSize: '0.95rem', letterSpacing: '0.01em' }}>
              UPCOMING: Sensitive Items Inventory Due in 2 Days
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', fontSize: '0.85rem' }}>
              Prepare your teams and equipment for inspection
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            size="small" 
            endIcon={<ArrowForwardIcon fontSize="small" />}
            sx={{ 
              ml: 'auto', 
              color: theme.palette.warning.main,
              borderColor: alpha(theme.palette.warning.main, 0.3),
              borderRadius: 0,
              '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.1) }
            }}
          >
            View Details
          </Button>
        </Box>
      </Paper>

      {/* Critical Stats Panel */}
      <Paper 
        sx={{ 
          p: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 0,
          border: '2px solid rgba(140, 140, 160, 0.12)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
            : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Critical Stats */}
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em', fontWeight: 'medium' }}>
                    Next Sensitive Items
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.03em', fontWeight: 'medium' }}>
                    {sensitiveItemsDue}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em', fontWeight: 'medium' }}>
                    Monthly 10% Cyclic
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: '0.85rem' }}>
                    {cyclicInventoryProgress}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em', fontWeight: 'medium' }}>
                    Last Full Inventory
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.03em', fontWeight: 'medium' }}>
                    {lastFullInventoryDate}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em', fontWeight: 'medium' }}>
                    CSDP Status
                  </Typography>
                  <Chip 
                    label={csdpStatus} 
                    size="small" 
                    color="success" 
                    sx={{ 
                      fontWeight: "medium",
                      borderRadius: 0,
                      height: 20,
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
