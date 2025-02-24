import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { VerifiedUser as VerifiedIcon } from '@mui/icons-material';
import { ActivityLog } from '../types';

const ACTION_TYPES = [
  'All',
  'Login',
  'Logout',
  'Create User',
  'Update User',
  'Deactivate User',
  'Approved Transfer',
  'Updated Inventory',
  'Generated Report',
];

// Mock data for initial development
const MOCK_LOGS: ActivityLog[] = [
  {
    id: '1',
    user: 'LT Smith',
    action: 'Approved Transfer',
    timestamp: '2024-03-15T14:30:00Z',
    details: 'Item: M4 Carbine, Serial: 123456',
    blockchainHash: '0x1234...5678',
  },
  {
    id: '2',
    user: 'SGT Jones',
    action: 'Updated Inventory',
    timestamp: '2024-03-15T13:15:00Z',
    details: 'Added 50 magazines to inventory',
    blockchainHash: '0x5678...9012',
  },
];

export const ActivityLogs: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    user: '',
    actionType: 'All',
  });

  const handleLogClick = (log: ActivityLog) => {
    setSelectedLog(log);
    setModalOpen(true);
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="From Date"
              value={filters.startDate}
              onChange={(date) => handleFilterChange('startDate', date)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="To Date"
              value={filters.endDate}
              onChange={(date) => handleFilterChange('endDate', date)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Action Type"
              value={filters.actionType}
              onChange={(e) => handleFilterChange('actionType', e.target.value)}
            >
              {ACTION_TYPES.map((action) => (
                <MenuItem key={action} value={action}>
                  {action}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="User"
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Logs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Blockchain Verification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_LOGS.map((log) => (
              <TableRow
                key={log.id}
                hover
                onClick={() => handleLogClick(log)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedIcon color="success" />
                    <Typography variant="body2">
                      Verified
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Log Details Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Activity Log Details
        </DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>
                <strong>User:</strong> {selectedLog.user}
              </Typography>
              <Typography>
                <strong>Action:</strong> {selectedLog.action}
              </Typography>
              <Typography>
                <strong>Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}
              </Typography>
              <Typography>
                <strong>Details:</strong> {selectedLog.details}
              </Typography>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Blockchain Verification
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    Transaction Hash: {selectedLog.blockchainHash}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <VerifiedIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Verified on Blockchain
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 