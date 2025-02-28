import React from 'react';
import { 
  Box, 
  Typography, 
  Alert, 
  Grid, 
  Paper, 
  Button, 
  Stack, 
  Chip, 
  Divider,
  useTheme
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface InventoriesHeaderProps {
  title: string;
  sensitiveItemsDue: string;
  cyclicInventoryProgress: string;
  lastFullInventoryDate: string;
  csdpStatus: string;
}

export const InventoriesHeader: React.FC<InventoriesHeaderProps> = ({
  title,
  sensitiveItemsDue,
  cyclicInventoryProgress,
  lastFullInventoryDate,
  csdpStatus
}) => {
  const theme = useTheme();

  // Determine if sensitive items inventory is urgent (less than 3 days)
  const isUrgent = sensitiveItemsDue.includes('2 days');

  return (
    <Box sx={{ mb: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      {/* Alert Banner */}
      <Alert 
        severity={isUrgent ? "warning" : "info"}
        icon={<WarningAmberIcon />}
        sx={{ 
          mb: 3, 
          backgroundColor: isUrgent ? theme.palette.warning.light : theme.palette.info.light,
          '& .MuiAlert-icon': {
            color: isUrgent ? theme.palette.warning.dark : theme.palette.info.dark
          }
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          UPCOMING: Sensitive Items Inventory Due in 2 Days
        </Typography>
      </Alert>

      {/* Critical Stats and Action Buttons */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Critical Stats */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Next Sensitive Items</Typography>
                  <Typography variant="body1" fontWeight="medium">{sensitiveItemsDue}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Monthly 10% Cyclic</Typography>
                  <Typography variant="body1" fontWeight="medium">{cyclicInventoryProgress}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Last Full Inventory</Typography>
                  <Typography variant="body1" fontWeight="medium">{lastFullInventoryDate}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary">CSDP Status</Typography>
                  <Chip 
                    label={csdpStatus} 
                    size="small" 
                    color="success" 
                    sx={{ fontWeight: "medium" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={1}
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddCircleOutlineIcon />}
              >
                Start New Inventory
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<CalendarMonthIcon />}
              >
                Schedule Inventory
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                startIcon={<VisibilityIcon />}
              >
                View Requirements
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}; 