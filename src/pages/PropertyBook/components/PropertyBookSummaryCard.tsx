import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import {
  Description as DocumentIcon,
  Warning as WarningIcon,
  ArrowUpward as ExcessIcon,
  ArrowDownward as ShortageIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const PropertyBookSummaryCard: React.FC = () => {
  const summaryData = {
    authorized: 721,
    onHandPercentage: 99.6,
    shortages: 3,
    excess: 0,
    criticalItems: [
      { name: 'M4 Carbine', status: 'shortage', count: -2 },
      { name: 'DAGR', status: 'shortage', count: -1 },
      { name: 'HMMWV', status: 'maintenance', count: 2 },
    ],
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Property Book Summary
        </Typography>
        <Button
          size="small"
          startIcon={<DocumentIcon />}
          variant="outlined"
        >
          View MTOE
        </Button>
      </Box>

      {/* Authorization Summary */}
      <List dense>
        <ListItem>
          <ListItemText
            primary="Equipment Authorized"
            secondary={`${summaryData.authorized} line items`}
          />
          <Chip
            label={`${summaryData.onHandPercentage}%`}
            color="success"
            size="small"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Shortage Status"
            secondary={`${summaryData.shortages} line items short`}
          />
          <Chip
            label={summaryData.shortages}
            color={summaryData.shortages > 0 ? 'error' : 'success'}
            size="small"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Excess Status"
            secondary={`${summaryData.excess} excess items`}
          />
          <Chip
            label={summaryData.excess}
            color={summaryData.excess > 0 ? 'warning' : 'success'}
            size="small"
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Critical Items Section */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2" color="error" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon fontSize="small" />
          Critical Items
        </Typography>
      </Box>

      <List dense>
        {summaryData.criticalItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              {item.status === 'shortage' ? (
                <ShortageIcon color="error" />
              ) : item.status === 'excess' ? (
                <ExcessIcon color="warning" />
              ) : (
                <CheckIcon color="success" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={
                item.status === 'shortage'
                  ? `Shortage: ${Math.abs(item.count)} units`
                  : item.status === 'maintenance'
                  ? `In Maintenance: ${item.count} units`
                  : `Excess: ${item.count} units`
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PropertyBookSummaryCard; 