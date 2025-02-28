import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Stack, 
  IconButton, 
  Button, 
  useTheme,
  Divider
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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
              borderRadius: '50%',
              backgroundColor: badgeColor,
              border: `1px solid ${theme.palette.background.paper}`
            }}
          />
        }
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  };

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardHeader 
        title="Inventory Schedule" 
        action={
          <IconButton aria-label="calendar">
            <EventIcon />
          </IconButton>
        }
      />
      <CardContent>
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
            />
          </LocalizationProvider>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Calendar Legend */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Legend</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {inventoryTypes.map((type) => (
              <Stack key={type.type} direction="row" alignItems="center" spacing={0.5}>
                <FiberManualRecordIcon sx={{ color: type.color, fontSize: 16 }} />
                <Typography variant="caption">{type.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Upcoming Requirements List */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Upcoming Requirements</Typography>
        <List dense disablePadding>
          {upcomingRequirements.map((req, index) => {
            // Find the color for this requirement type
            const typeInfo = inventoryTypes.find(t => t.type === req.type);
            const dotColor = typeInfo ? typeInfo.color : '#000';
            
            return (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <FiberManualRecordIcon sx={{ color: dotColor, fontSize: 16, mr: 1 }} />
                <ListItemText 
                  primary={
                    <Typography variant="body2">
                      <strong>{req.date}:</strong> {req.title}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            size="small" 
            startIcon={<AddCircleOutlineIcon />} 
            variant="outlined"
          >
            Add to Schedule
          </Button>
          <Box>
            <IconButton size="small">
              <PrintIcon />
            </IconButton>
            <IconButton size="small">
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 