import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Stack
} from '@mui/material';
import {
  History as HistoryIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
  Cached as CachedIcon,
  Check as CheckIcon,
  Build as BuildIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';

interface ActivityLogEntry {
  id: string;
  date: string;
  time: string;
  activity: string;
  items: string;
  personnel: string;
  location: string;
  details: string;
  status?: 'Complete' | 'In Progress' | 'Scheduled' | 'Cancelled';
}

interface SensitiveItemActivityLogProps {
  activities: ActivityLogEntry[];
  onViewCompleteLog: () => void;
}

const SensitiveItemActivityLog: React.FC<SensitiveItemActivityLogProps> = ({
  activities,
  onViewCompleteLog
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter activities based on search term
  const filteredActivities = activities.filter(activity => 
    activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.personnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get activity icon based on type
  const getActivityIcon = (activity: string) => {
    if (activity.includes('Check') || activity.includes('Verification')) {
      return <CheckIcon fontSize="small" color="success" />;
    } else if (activity.includes('Issue') || activity.includes('Receipt')) {
      return <AssignmentIcon fontSize="small" color="primary" />;
    } else if (activity.includes('Inventory')) {
      return <CachedIcon fontSize="small" color="info" />;
    } else if (activity.includes('Maintenance')) {
      return <BuildIcon fontSize="small" color="warning" />;
    } else {
      return <HistoryIcon fontSize="small" color="action" />;
    }
  };

  // Get status color
  const getStatusColor = (status?: string) => {
    if (!status) return 'default';
    switch (status) {
      case 'Complete': return 'success';
      case 'In Progress': return 'warning';
      case 'Scheduled': return 'info';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper elevation={2} sx={{ width: '100%' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <HistoryIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Sensitive Item Activity Log
        </Typography>
      </Box>

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search activities..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            size="small"
          >
            Filter
          </Button>
          <Button
            startIcon={<CalendarTodayIcon />}
            variant="outlined"
            size="small"
          >
            Date Range
          </Button>
        </Stack>
      </Box>

      <TableContainer>
        <Table size="small" aria-label="sensitive item activity log">
          <TableHead>
            <TableRow>
              <TableCell>Date / Time</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Item(s)</TableCell>
              <TableCell>Personnel</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Details</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredActivities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity) => (
                <TableRow key={activity.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {activity.date}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getActivityIcon(activity.activity)}
                      <Typography variant="body2">
                        {activity.activity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {activity.items}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {activity.personnel}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {activity.location}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {activity.details}
                    </Typography>
                    {activity.status && (
                      <Chip
                        label={activity.status}
                        size="small"
                        color={getStatusColor(activity.status)}
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredActivities.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No activities found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <Button
          color="primary"
          onClick={onViewCompleteLog}
          startIcon={<HistoryIcon />}
        >
          View Complete Activity Log
        </Button>
        
        <TablePagination
          component="div"
          count={filteredActivities.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Paper>
  );
};

export default SensitiveItemActivityLog; 