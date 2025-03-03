import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface PropertyBookSummaryProps {
  stats: {
    totalItems: number;
    shortageStatus: number;
    excessStatus: number;
  };
}

const PropertyBookSummary: React.FC<PropertyBookSummaryProps> = ({ stats }) => {
  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        Property Book Summary
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Equipment Authorized
          </Typography>
          <Typography variant="h5">
            {stats.totalItems} items
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Shortage Status
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <ErrorIcon color="error" />
            <Typography variant="h5" color="error.main">
              {stats.shortageStatus}
            </Typography>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Excess Status
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckIcon color="success" />
            <Typography variant="h5" color="success.main">
              {stats.excessStatus}
            </Typography>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Status Overview
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<CheckIcon />}
              label="Serviceable"
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<WarningIcon />}
              label="Maintenance"
              color="warning"
              variant="outlined"
            />
            <Chip
              icon={<ErrorIcon />}
              label="Unserviceable"
              color="error"
              variant="outlined"
            />
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PropertyBookSummary; 