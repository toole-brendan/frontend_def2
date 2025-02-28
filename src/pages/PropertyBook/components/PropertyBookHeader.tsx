import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Grid,
  Divider,
  Chip,
  ButtonGroup,
} from '@mui/material';
import {
  Print as PrintIcon,
  Assignment as AssignmentIcon,
  VerifiedUser as VerifiedIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface PropertyBookHeaderProps {
  unit: string;
  primaryHolder: {
    name: string;
    rank: string;
  };
  stats: {
    totalLineItems: number;
    totalValue: string;
    lastReconciliation: string;
  };
  onAction: (action: 'generate' | 'print' | 'certify' | 'search') => void;
}

const PropertyBookHeader: React.FC<PropertyBookHeaderProps> = ({
  unit,
  primaryHolder,
  stats,
  onAction,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Title and Unit */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Property Book - {unit}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Authorization Stats */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Primary Hand Receipt Holder
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {primaryHolder.rank} {primaryHolder.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Line Items
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stats.totalLineItems}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Equipment Value
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stats.totalValue}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Reconciliation
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stats.lastReconciliation}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Quick Actions
              </Typography>
              <ButtonGroup orientation="vertical" fullWidth>
                <Button
                  variant="contained"
                  startIcon={<AssignmentIcon />}
                  onClick={() => onAction('generate')}
                >
                  Generate Hand Receipt
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={() => onAction('print')}
                >
                  Print Property Book
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VerifiedIcon />}
                  onClick={() => onAction('certify')}
                >
                  Certify
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={() => onAction('search')}
                >
                  Search
                </Button>
              </ButtonGroup>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyBookHeader; 