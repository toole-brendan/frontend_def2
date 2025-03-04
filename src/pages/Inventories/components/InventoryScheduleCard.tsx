import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Stack, 
  IconButton, 
  Button, 
  useTheme,
  Divider,
  alpha,
  CardHeader
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Badge } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PrintIcon from '@mui/icons-material/Print';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
;
import { upcomingRequirements, inventoryTypes, calendarEvents } from './mockData';

export const InventoryScheduleCard: React.FC = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  // Function to determine if a date has events and what type
  const getDateType = (date: Date) => {
    if (!date || typeof date.getDate !== 'function') {
      return null;
    }
    
    const matchingEvent = calendarEvents.find(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
    return matchingEvent ? matchingEvent.type : null;
  };

  // Custom rendering for the calendar day
  const ServerDay = (props: any) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const dateType = getDateType(day);

    if (!dateType || outsideCurrentMonth) {
      return <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />;
    }

    const eventTypeInfo = inventoryTypes.find(type => type.type === dateType);
    const badgeColor = eventTypeInfo ? eventTypeInfo.color : '#000';

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: 0,
              backgroundColor: badgeColor,
              border: `1px solid ${theme.palette.background.paper}`
            }}
          />
        }
      >
        <PickersDay 
          {...other} 
          outsideCurrentMonth={outsideCurrentMonth} 
          day={day} 
          sx={{ 
            fontFamily: 'monospace',
            fontWeight: 'medium',
            '&.Mui-selected': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.3),
              }
            }
          }}
        />
      </Badge>
    );
  };

  return (
    <Paper 
      sx={{ 
        height: '100%',
        p: 0,
        borderRadius: 0,
        border: '2px solid rgba(140, 140, 160, 0.12)',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 16,
          height: 16,
          borderStyle: 'solid',
          borderWidth: '0 16px 16px 0',
          borderColor: `transparent ${alpha(theme.palette.info.main, theme.palette.mode === 'dark' ? 0.3 : 0.2)} transparent transparent`,
          zIndex: 1,
        }
      }}
    >
      <CardHeader 
        title="Inventory Schedule" 
        action={
          <IconButton 
            aria-label="calendar"
            sx={{
              border: '1px solid rgba(140, 140, 160, 0.2)',
              borderRadius: 0,
            }}
          >
            <EventIcon fontSize="small" />
          </IconButton>
        }
      />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar 
              value={selectedDate} 
              onChange={(newDate) => setSelectedDate(newDate)}
              slots={{
                day: ServerDay
              }}
              loading={false}
              renderLoading={() => <DayCalendarSkeleton />}
              sx={{
                '& .MuiPickersCalendarHeader-root': {
                  pl: 2,
                  pr: 2,
                },
                '& .MuiPickersCalendarHeader-label': {
                  fontWeight: 'medium',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '0.03em',
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  width: 36,
                  height: 36,
                  fontWeight: 'medium',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                },
                '& .MuiPickersDay-root': {
                  width: 36,
                  height: 36,
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  borderRadius: 0,
                }
              }}
            />
          </LocalizationProvider>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Calendar Legend */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              textTransform: 'uppercase', 
              fontSize: '0.75rem', 
              letterSpacing: '0.05em',
              fontWeight: 'medium',
            }}
          >
            Legend
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {inventoryTypes.map((type) => (
              <Stack key={type.type} direction="row" alignItems="center" spacing={0.5}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    backgroundColor: type.color,
                    borderRadius: 0
                  }}
                />
                <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'medium' }}>
                  {type.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Upcoming Requirements List */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 1,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            fontWeight: 'medium',
          }}
        >
          Upcoming Requirements
        </Typography>
        <List dense disablePadding>
          {upcomingRequirements.map((req, index) => {
            // Find the color for this requirement type
            const typeInfo = inventoryTypes.find(t => t.type === req.type);
            const dotColor = typeInfo ? typeInfo.color : '#000';
            
            return (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    backgroundColor: dotColor,
                    mr: 1,
                    borderRadius: 0
                  }}
                />
                <ListItemText 
                  primary={
                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                      <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'medium', letterSpacing: '0.03em' }}>
                        {req.date}:
                      </Box>{' '}
                      {req.title}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
        
        <Box 
          sx={{ 
            mt: 2,
            pt: 2,
            display: 'flex', 
            justifyContent: 'space-between',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          }}
        >
          <Button 
            size="small" 
            startIcon={<AddCircleOutlineIcon fontSize="small" />} 
            variant="outlined"
            sx={{ 
              borderRadius: 0,
              borderColor: 'rgba(140, 140, 160, 0.2)',
              fontWeight: 'medium',
              letterSpacing: '0.03em',
              fontSize: '0.75rem',
            }}
          >
            Add to Schedule
          </Button>
          <Box>
            <IconButton 
              size="small"
              sx={{
                border: '1px solid rgba(140, 140, 160, 0.2)',
                borderRadius: 0,
                mr: 1
              }}
            >
              <PrintIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small"
              sx={{
                border: '1px solid rgba(140, 140, 160, 0.2)',
                borderRadius: 0
              }}
            >
              <NotificationsIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
