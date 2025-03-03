import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  CalendarToday as CalendarIcon,
  DateRange as DateRangeIcon,
  Add as AddIcon,
  Print as PrintIcon,
  PendingActions as PendingActionsIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  ArrowForward as ArrowForwardIcon,
  ListAlt as ListAltIcon
} from '@mui/icons-material';
import { KpiStatsCard } from '../../../components/common';
import { ScheduledInventory } from '../../../types/sensitiveItems';

interface ScheduleTabProps {
  scheduleInventories: ScheduledInventory[];
  handleInventoryModalOpen: () => void;
}

/**
 * ScheduleTab component displays the schedule of upcoming inventories
 */
const ScheduleTab: React.FC<ScheduleTabProps> = ({
  scheduleInventories,
  handleInventoryModalOpen
}) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Inventory Schedule
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <KpiStatsCard
            icon={<CalendarIcon fontSize="small" />}
            title="Next Scheduled"
            value={`Today ${scheduleInventories[0].time}`}
            subtitle="Daily sensitive items check"
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <KpiStatsCard
            icon={<DateRangeIcon fontSize="small" />}
            title="Monthly"
            value={`${scheduleInventories[3].date} ${scheduleInventories[3].time}`}
            subtitle="Monthly 100% verification"
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>

      {/* Schedule Actions */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 0 }}
        >
          Add Inventory
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          sx={{ borderRadius: 0 }}
        >
          Print Schedule
        </Button>
        <Button
          variant="outlined"
          startIcon={<PendingActionsIcon />}
          sx={{ borderRadius: 0 }}
        >
          View Calendar
        </Button>
      </Box>

      {/* Upcoming Inventories */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
        Upcoming Inventories
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)', mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                DATE/TIME
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                TYPE
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', md: 'table-cell' }
              }}>
                ASSIGNED TO
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', sm: 'table-cell' }
              }}>
                NOTES
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                width: 150
              }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleInventories.map((schedule) => (
              <TableRow key={schedule.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: schedule.date === '25FEB2025' ? 'bold' : 'normal' }}>
                    {schedule.date} {schedule.time}
                  </Typography>
                  {schedule.date === '25FEB2025' && schedule.time === '1700' && (
                    <Chip 
                      label="Today" 
                      size="small" 
                      color="primary"
                      sx={{ borderRadius: 0, mt: 0.5 }}
                    />
                  )}
                </TableCell>
                <TableCell>{schedule.type}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{schedule.conductor}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{schedule.notes}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {schedule.date === '25FEB2025' && schedule.time === '1700' ? (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ArrowForwardIcon />}
                        onClick={handleInventoryModalOpen}
                        sx={{ borderRadius: 0 }}
                      >
                        Start
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        sx={{ borderRadius: 0 }}
                      >
                        Edit
                      </Button>
                    )}
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recurring Schedule */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
        Recurring Schedule
      </Typography>
      <List component={Paper} sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <EditIcon fontSize="small" />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                width: 32,
                height: 32,
                borderRadius: 0
              }}
            >
              <CalendarIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary="Daily Sensitive Items Check"
            secondary="Every day at 0730 and 1700"
          />
        </ListItem>
        <Divider />
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <EditIcon fontSize="small" />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.info.main, 0.15),
                color: theme.palette.info.main,
                width: 32,
                height: 32,
                borderRadius: 0
              }}
            >
              <DateRangeIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary="Monthly 100% Inventory"
            secondary="1st of each month at 0900"
          />
        </ListItem>
        <Divider />
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <EditIcon fontSize="small" />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.secondary.main, 0.15),
                color: theme.palette.secondary.main,
                width: 32,
                height: 32,
                borderRadius: 0
              }}
            >
              <ListAltIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary="CSDP Review"
            secondary="15th of each quarter at 0900"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default ScheduleTab;
