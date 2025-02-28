import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Stack,
} from '@mui/material';
import {
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const SensitiveItemsStatusCard: React.FC = () => {
  const sensitiveData = {
    total: 210,
    accountedFor: 210,
    lastInventory: '23FEB2025',
    nextRequired: '27FEB2025',
    daysUntilNext: 2,
    categories: [
      { type: 'Weapons', qty: 143, lastVerified: '23FEB2025', status: 'verified' },
      { type: 'NVGs', qty: 42, lastVerified: '23FEB2025', status: 'verified' },
      { type: 'Crypto', qty: 25, lastVerified: '23FEB2025', status: 'verified' },
    ],
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon color="error" />
          Sensitive Items Status
        </Typography>
        <Chip
          label={`${sensitiveData.accountedFor}/${sensitiveData.total}`}
          color="success"
          size="small"
        />
      </Box>

      {/* Summary Stats */}
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Last Inventory
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {sensitiveData.lastInventory}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Next Required
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              {sensitiveData.nextRequired}
            </Typography>
            <Chip
              label={`${sensitiveData.daysUntilNext} days`}
              color={sensitiveData.daysUntilNext <= 3 ? 'warning' : 'default'}
              size="small"
            />
          </Box>
        </Box>
      </Stack>

      {/* Category Table */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item Type</TableCell>
            <TableCell align="center">QTY</TableCell>
            <TableCell align="center">Last Verified</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensitiveData.categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{category.type}</TableCell>
              <TableCell align="center">{category.qty}</TableCell>
              <TableCell align="center">{category.lastVerified}</TableCell>
              <TableCell align="center">
                <Chip
                  label={category.status === 'verified' ? 'Verified ✓' : 'Pending'}
                  color={category.status === 'verified' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Action Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<SecurityIcon />}
          fullWidth
          size="small"
        >
          Conduct Sensitive Item Inventory
        </Button>
      </Box>
    </Paper>
  );
};

export default SensitiveItemsStatusCard; 