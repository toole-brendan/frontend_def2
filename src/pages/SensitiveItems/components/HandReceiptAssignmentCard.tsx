import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Stack,
  Chip
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Add as AddIcon
} from '@mui/icons-material';

interface HandReceiptData {
  platoon: string;
  responsible: string;
  itemCount: number;
  daysOld: number;
}

interface HandReceiptAssignmentCardProps {
  handReceipts: HandReceiptData[];
  onViewHandReceipts: () => void;
  onGenerateSubHandReceipt: () => void;
}

const HandReceiptAssignmentCard: React.FC<HandReceiptAssignmentCardProps> = ({
  handReceipts,
  onViewHandReceipts,
  onGenerateSubHandReceipt
}) => {
  // Calculate totals and find oldest/newest
  const totalItems = handReceipts.reduce((sum, receipt) => sum + receipt.itemCount, 0);
  const oldestReceipt = handReceipts.reduce(
    (oldest, current) => current.daysOld > oldest.daysOld ? current : oldest, 
    handReceipts[0]
  );
  const newestReceipt = handReceipts.reduce(
    (newest, current) => current.daysOld < newest.daysOld ? current : newest, 
    handReceipts[0]
  );

  return (
    <Paper elevation={2} sx={{ height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <AssignmentIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Sensitive Item Hand Receipt Status
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="subtitle2" gutterBottom>
              Hand Receipt Distribution
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                mb: 2
              }}
            >
              {handReceipts.map((receipt) => (
                <Box
                  key={receipt.platoon}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DescriptionIcon color="action" sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">
                      {receipt.platoon} ({receipt.responsible})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {receipt.itemCount} items
                    </Typography>
                    <Chip 
                      label={`${receipt.daysOld} days old`}
                      size="small"
                      variant="outlined"
                      color={receipt.daysOld > 90 ? 'warning' : 'default'}
                      sx={{ ml: 1, minWidth: 80 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ height: 120, bgcolor: 'action.hover', borderRadius: 1, p: 1, mb: 2 }}>
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                Bar chart showing distribution across platoons would display here
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle2" gutterBottom>
              Sub-Hand Receipt Status
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  All hand receipts current:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  Yes
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Oldest hand receipt:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {oldestReceipt.platoon} ({oldestReceipt.daysOld} days old)
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Newest hand receipt:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {newestReceipt.platoon} ({newestReceipt.daysOld} days old)
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Total sensitive items on hand receipts:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {totalItems}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Stack spacing={1}>
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                onClick={onViewHandReceipts}
                fullWidth
              >
                View Hand Receipts
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={onGenerateSubHandReceipt}
                fullWidth
              >
                Generate Sub-Hand Receipt
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default HandReceiptAssignmentCard; 