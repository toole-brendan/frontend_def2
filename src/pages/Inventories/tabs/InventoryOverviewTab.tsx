import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  WarningAmber as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  NotificationImportant as NotificationIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';
import { InventoryActivityLog } from '../components';

interface InventoryOverviewTabProps {
  onStartInventory: (inventoryId: string) => void;
}

const InventoryOverviewTab: React.FC<InventoryOverviewTabProps> = ({ onStartInventory }) => {
  const theme = useTheme();

  // Mock data for quick stats
  const quickStats = [
    { 
      title: 'Sensitive Items', 
      value: 'Due in 2 days', 
      status: 'warning',
      icon: <WarningIcon color="warning" />
    },
    { 
      title: 'Compliance Score', 
      value: '87%', 
      status: 'success',
      icon: <CheckCircleIcon color="success" />
    },
    { 
      title: 'Due Now', 
      value: '3 Inventories', 
      status: 'error',
      icon: <NotificationIcon color="error" />
    }
  ];

  // Mock data for actionable items
  const actionableItems = [
    {
      id: 'inv-1',
      title: 'Sensitive Items Inventory',
      description: 'Weekly count due in 2 days',
      status: 'urgent',
      action: 'Start'
    },
    {
      id: 'inv-2',
      title: 'Monthly 10% Cyclic Inventory',
      description: '68% complete (72/120 items verified)',
      status: 'inProgress',
      action: 'Resume'
    },
    {
      id: 'inv-3',
      title: 'Discrepancy Review',
      description: '3 items requiring causative research',
      status: 'attention',
      action: 'Review'
    }
  ];

  // Mock data for upcoming schedule
  const upcomingSchedule = [
    {
      title: 'Sensitive Items Inventory',
      date: '27 FEB 2025',
      type: 'Weekly',
      status: 'Due Soon'
    },
    {
      title: 'Weapons Inventory',
      date: '05 MAR 2025',
      type: 'Monthly',
      status: 'Scheduled'
    },
    {
      title: 'Monthly 10% Cyclic Inventory',
      date: '15 MAR 2025',
      type: 'Cyclic',
      status: 'Scheduled'
    },
    {
      title: 'Change of Command Inventory',
      date: '01 APR 2025',
      type: 'One-time',
      status: 'Planned'
    }
  ];

  // Function to render status chip
  const renderStatusChip = (status: string) => {
    let color: 'error' | 'warning' | 'info' | 'success' | 'default' = 'default';
    
    switch(status) {
      case 'urgent':
      case 'Due Soon':
        color = 'error';
        break;
      case 'attention':
        color = 'warning';
        break;
      case 'inProgress':
      case 'Scheduled':
      case 'Planned':
        color = 'info';
        break;
      case 'complete':
        color = 'success';
        break;
    }
    
    return (
      <Chip 
        label={status === 'inProgress' ? 'In Progress' : status} 
        color={color}
        size="small"
        sx={{ 
          borderRadius: 0, 
          fontWeight: 'medium',
          textTransform: 'uppercase',
          fontSize: '0.7rem'
        }}
      />
    );
  };

  return (
    <Box>
      {/* Quick Stats Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
                borderRadius: 0,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
                  {stat.value}
                </Typography>
              </Box>
              <Box sx={{ ml: 2 }}>
                {stat.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Actionable Items */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 3,
          p: 2,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
          Actionable Items
        </Typography>
        <List disablePadding>
          {actionableItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <Divider />}
              <ListItem 
                sx={{ 
                  py: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                  }
                }}
              >
                <ListItemIcon>
                  {item.status === 'urgent' ? (
                    <WarningIcon color="error" />
                  ) : item.status === 'inProgress' ? (
                    <InfoIcon color="primary" />
                  ) : (
                    <AssignmentIcon color="action" />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {item.title}
                      </Typography>
                      {renderStatusChip(item.status)}
                    </Box>
                  }
                  secondary={item.description}
                />
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PlayArrowIcon fontSize="small" />}
                  onClick={() => onStartInventory(item.id)}
                  sx={{ 
                    borderRadius: 0,
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    letterSpacing: '0.03em',
                    fontSize: '0.75rem'
                  }}
                >
                  {item.action}
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Recent Activity and Upcoming Schedule */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1), borderRadius: 0 }}>
            <CardHeader 
              title="Recent Activity" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              action={
                <Button
                  endIcon={<MoreIcon />}
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <InventoryActivityLog simplified />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1), borderRadius: 0 }}>
            <CardHeader 
              title="Upcoming Schedule" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              action={
                <Button
                  endIcon={<MoreIcon />}
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Full Calendar
                </Button>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <List disablePadding>
                {upcomingSchedule.map((event, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={event.title}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                              {event.date}
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12 }} />
                            <Typography variant="caption" color="text.secondary">
                              {event.type}
                            </Typography>
                          </Box>
                        }
                      />
                      {renderStatusChip(event.status)}
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryOverviewTab; 