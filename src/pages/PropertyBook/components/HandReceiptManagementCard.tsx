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
  ButtonGroup,
  Chip,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Update as UpdateIcon,
  Print as PrintIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const HandReceiptManagementCard: React.FC = () => {
  const handReceiptData = {
    primary: {
      holder: 'CPT Rodriguez',
      signedDate: '15JAN2025',
    },
    subHandReceipts: {
      total: 4,
      current: 4,
      percentage: 100,
      lastUpdated: '21FEB2025',
    },
    expiring: [
      {
        unit: '3rd PLT',
        expirationDate: '15MAR2025',
        daysRemaining: 22,
      },
    ],
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Hand Receipt Management
        </Typography>
        <Chip
          label={`${handReceiptData.subHandReceipts.percentage}% Current`}
          color="success"
          size="small"
        />
      </Box>

      {/* Primary Hand Receipt Status */}
      <List dense>
        <ListItem>
          <ListItemIcon>
            <AssignmentIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Primary Hand Receipt"
            secondary={`Signed ${handReceiptData.primary.signedDate} (${handReceiptData.primary.holder})`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon color="success" />
          </ListItemIcon>
          <ListItemText
            primary="Sub-hand Receipts"
            secondary={`${handReceiptData.subHandReceipts.current} of ${handReceiptData.subHandReceipts.total} current`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Last Updated"
            secondary={handReceiptData.subHandReceipts.lastUpdated}
          />
        </ListItem>
      </List>

      {/* Expiring Hand Receipts */}
      {handReceiptData.expiring.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon fontSize="small" />
              Expiring Soon
            </Typography>
          </Box>
          <List dense>
            {handReceiptData.expiring.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.unit}
                  secondary={`Expires ${item.expirationDate} (${item.daysRemaining} days)`}
                />
                <Chip
                  label={`${item.daysRemaining} days`}
                  color="warning"
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Action Buttons */}
      <Box sx={{ mt: 2 }}>
        <ButtonGroup variant="outlined" size="small" fullWidth>
          <Button startIcon={<AssignmentIcon />}>
            New Receipt
          </Button>
          <Button startIcon={<UpdateIcon />}>
            Update
          </Button>
          <Button startIcon={<PrintIcon />}>
            Print
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default HandReceiptManagementCard; 