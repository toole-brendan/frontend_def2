import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha
} from '@mui/material';
import {
  CalendarViewMonth as MonthViewIcon,
  CalendarViewWeek as WeekViewIcon,
  EventNote as EventIcon,
  Add as AddIcon,
  PictureAsPdf as PdfIcon,
  PlaylistAddCheck as InventoryIcon,
  TransferWithinAStation as TransferIcon
} from '@mui/icons-material';
import { InventoryScheduleCard, ChangeOfCommandPlanner } from '../components';

const SchedulePlanningTab: React.FC = () => {
  const theme = useTheme();
  const [calendarView, setCalendarView] = React.useState<'month' | 'week'>('month');

  const handleCalendarViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'month' | 'week' | null,
  ) => {
    if (newView !== null) {
      setCalendarView(newView);
    }
  };

  // Mock data for calendar events
  const calendarEvents = [
    {
      date: '27 Feb 2025',
      title: 'Sensitive Items Inventory',
      type: 'Weekly',
      priority: 'high',
      time: '09:00'
    },
    {
      date: '05 Mar 2025',
      title: 'Weapons Inventory',
      type: 'Monthly',
      priority: 'medium',
      time: '08:30'
    },
    {
      date: '15 Mar 2025',
      title: 'Monthly 10% Cyclic Inventory',
      type: 'Cyclic',
      priority: 'medium',
      time: '10:00'
    },
    {
      date: '01 Apr 2025',
      title: 'Change of Command Inventory',
      type: 'One-time',
      priority: 'high',
      time: 'All Day'
    }
  ];

  // Mock data for planning tools
  const planningTools = [
    {
      title: 'Schedule New Inventory',
      description: 'Create a new inventory event on the calendar',
      icon: <AddIcon color="primary" />
    },
    {
      title: 'Generate Schedule Report',
      description: 'Create a printable inventory schedule',
      icon: <PdfIcon color="primary" />
    },
    {
      title: 'Bulk Schedule Planner',
      description: 'Plan multiple inventories at once',
      icon: <EventIcon color="primary" />
    },
    {
      title: 'Recurring Inventory Setup',
      description: 'Configure automated recurring inventories',
      icon: <InventoryIcon color="primary" />
    }
  ];

  return (
    <Box>
      {/* Calendar View Controls */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
          Inventory Schedule
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ToggleButtonGroup
            value={calendarView}
            exclusive
            onChange={handleCalendarViewChange}
            size="small"
            sx={{ 
              '& .MuiToggleButton-root': {
                borderRadius: 0,
                textTransform: 'none',
                fontWeight: 'medium'
              }
            }}
          >
            <ToggleButton value="month">
              <MonthViewIcon fontSize="small" sx={{ mr: 1 }} />
              Month
            </ToggleButton>
            <ToggleButton value="week">
              <WeekViewIcon fontSize="small" sx={{ mr: 1 }} />
              Week
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 0,
              fontWeight: 'medium',
              letterSpacing: '0.03em'
            }}
          >
            Schedule Inventory
          </Button>
        </Box>
      </Box>

      {/* Calendar View */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 3,
          p: 0,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0,
          height: calendarView === 'month' ? '480px' : '320px'
        }}
      >
        {/* Calendar Header */}
        <Box 
          sx={{ 
            p: 2, 
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            February - March 2025
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small"
              sx={{ 
                minWidth: 'auto', 
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
              }}
            >
              Today
            </Button>
            <Button 
              size="small"
              sx={{ 
                minWidth: 'auto', 
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
              }}
            >
              &lt;
            </Button>
            <Button 
              size="small"
              sx={{ 
                minWidth: 'auto', 
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
              }}
            >
              &gt;
            </Button>
          </Box>
        </Box>

        {/* Calendar Content - Simplified placeholder */}
        <Box sx={{ p: 0, height: '100%', position: 'relative' }}>
          {/* This would be replaced with a proper calendar component */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: alpha(theme.palette.text.primary, 0.5)
            }}
          >
            <Typography variant="h6">
              Calendar View Placeholder
            </Typography>
            <Typography variant="body2">
              This would be implemented with a full calendar component
            </Typography>
          </Box>
          
          {/* Upcoming Events Sidebar */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '280px',
              height: '100%',
              borderLeft: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 2
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                Upcoming Inventories
              </Typography>
            </Box>
            
            <List sx={{ p: 0, overflowY: 'auto' }}>
              {calendarEvents.map((event, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2">
                            {event.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <React.Fragment>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                              {event.date}
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12 }} />
                            <Typography variant="caption" color="text.secondary">
                              {event.time}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 0.5 }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                display: 'inline-block',
                                bgcolor: event.priority === 'high' 
                                  ? alpha(theme.palette.error.main, 0.1)
                                  : alpha(theme.palette.info.main, 0.1),
                                color: event.priority === 'high'
                                  ? theme.palette.error.main
                                  : theme.palette.info.main,
                                px: 0.5,
                                py: 0.2,
                                borderRadius: 0,
                                fontWeight: 'medium'
                              }}
                            >
                              {event.type}
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Paper>

      {/* Planning Tools & Special Planning Sections */}
      <Grid container spacing={3}>
        {/* Planning Tools */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              border: '1px solid', 
              borderColor: alpha(theme.palette.divider, 0.1),
              borderRadius: 0
            }}
          >
            <CardHeader 
              title="Planning Tools" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            />
            <CardContent sx={{ pt: 0 }}>
              <List disablePadding>
                {planningTools.map((tool, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    <ListItem 
                      button 
                      sx={{ 
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04)
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {tool.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={tool.title}
                        secondary={tool.description}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Change of Command Planning */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              border: '1px solid', 
              borderColor: alpha(theme.palette.divider, 0.1),
              borderRadius: 0,
              height: '100%'
            }}
          >
            <CardHeader 
              title="Special Planning" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              action={
                <Button
                  startIcon={<TransferIcon />}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: 0,
                    textTransform: 'none',
                    fontWeight: 'medium'
                  }}
                >
                  New Change of Command
                </Button>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <ChangeOfCommandPlanner simplified />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SchedulePlanningTab; 