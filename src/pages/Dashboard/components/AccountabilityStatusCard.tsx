import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
  Stack
} from '@mui/material';
import { AccountabilityStatusCardProps } from '../types';

export const AccountabilityStatusCard: React.FC<AccountabilityStatusCardProps> = ({
  overallRate,
  sensitiveItems,
  equipmentCategories,
  onStartInventory,
  subHandReceipts
}) => {
  // Helper function to determine color based on percentage
  const getStatusColor = (percentage: number): 'success' | 'warning' | 'error' => {
    if (percentage >= 98) return 'success';
    if (percentage >= 90) return 'warning';
    return 'error';
  };

  // Handle legacy mode vs new mode
  const isLegacyMode = subHandReceipts && subHandReceipts.length > 0;

  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Accountability Status
      </Typography>

      {/* Accountability Gauge */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
          my: 2,
          height: 180 
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={160}
          thickness={4}
          sx={{ position: 'absolute', color: 'grey.300' }}
        />
        <CircularProgress
          variant="determinate"
          value={overallRate}
          size={160}
          thickness={4}
          sx={{ 
            position: 'absolute', 
            color: `${getStatusColor(overallRate)}.main`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {overallRate}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Overall Accountability
          </Typography>
        </Box>
      </Box>

      {/* New Dashboard Mode */}
      {!isLegacyMode && (
        <>
          {/* Sensitive Items Section */}
          {sensitiveItems && (
            <Box sx={{ mb: 2, p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Sensitive Items
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                {sensitiveItems.verified}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Last: {sensitiveItems.lastVerification}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                  Next: {sensitiveItems.nextRequired}
                </Typography>
              </Stack>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 1 }}
                onClick={onStartInventory}
              >
                Conduct Sensitive Item Inventory
              </Button>
            </Box>
          )}

          {/* Equipment Categories */}
          {equipmentCategories && equipmentCategories.length > 0 && (
            <>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Equipment Categories
              </Typography>
              <List disablePadding>
                {equipmentCategories.map((category, index) => (
                  <ListItem 
                    key={index}
                    disablePadding
                    sx={{ 
                      py: 1, 
                      borderBottom: index < equipmentCategories.length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="medium">
                          {category.name}: {category.count} ({category.percentage}%)
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <span style={{ color: 'text.secondary' }}>
                            Last verified {category.lastVerified}
                          </span>
                          {category.note && (
                            <span style={{ color: '#ED6C02' }}> {/* warning.main color */}
                              {category.note}
                            </span>
                          )}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </>
      )}

      {/* Legacy Mode - Display Sub-Hand Receipts */}
      {isLegacyMode && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Sub-Hand Receipt Breakdown
          </Typography>
          <List disablePadding>
            {subHandReceipts.map((receipt, index) => (
              <ListItem 
                key={index}
                disablePadding
                sx={{ 
                  py: 1, 
                  borderBottom: index < subHandReceipts.length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>
                        {receipt.officer} ({receipt.platoon})
                      </span>
                      <span>
                        {receipt.itemCount} items
                      </span>
                    </Typography>
                  }
                  secondary={receipt.statusMessage}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
}; 