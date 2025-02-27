import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Stack,
} from '@mui/material';

interface HandReceiptOverviewCardProps {
  // Add props if needed in the future
}

export const HandReceiptOverviewCard: React.FC<HandReceiptOverviewCardProps> = () => {
  return (
    <Card variant="outlined">
      <CardHeader title="Primary Hand Receipt Overview" />
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Primary Hand Receipt Holder:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                CPT Rodriguez, Michael A.
              </Typography>
              <Chip size="small" label="Digitally signed 18JAN2025" color="success" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Change of Command Status:</Typography>
            <Typography variant="body2" fontWeight="medium">
              Inventory 94% Complete - Due 28FEB2025
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Hand Receipt Scope:</Typography>
            <Typography variant="body2" fontWeight="medium">
              721 lines / $4,237,580 total value
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">PBUSE Discrepancies:</Typography>
            <Typography variant="body2" fontWeight="medium" color="error.main">
              3 Items (Requires PBO action)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Document Number:</Typography>
            <Typography variant="body2" fontWeight="medium">
              HR-287IN-BCO-2025-01
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Also add a default export to maintain compatibility with the index.ts file
export default HandReceiptOverviewCard; 