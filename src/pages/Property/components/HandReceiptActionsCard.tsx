import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Alert,
  styled,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import WarningIcon from '@mui/icons-material/Warning';

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
}));

interface HandReceiptActionsCardProps {
  // Add props if needed in the future
}

export const HandReceiptActionsCard: React.FC<HandReceiptActionsCardProps> = () => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardHeader title="Hand Receipt Actions" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ActionButton 
              variant="outlined" 
              fullWidth 
              startIcon={<PrintIcon />}
            >
              Print Complete DA 2062
            </ActionButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionButton 
              variant="outlined" 
              fullWidth 
              startIcon={<FileDownloadIcon />}
            >
              Export to PBUSE Format
            </ActionButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionButton 
              variant="outlined" 
              fullWidth 
              startIcon={<AssignmentIcon />}
            >
              Generate Sub-Hand Receipts
            </ActionButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionButton 
              variant="outlined" 
              fullWidth 
              startIcon={<EventIcon />}
            >
              Schedule Change of Command Inventory
            </ActionButton>
          </Grid>
          <Grid item xs={12}>
            <ActionButton 
              variant="outlined" 
              fullWidth 
              startIcon={<UpdateIcon />}
            >
              Request Equipment Updates from PBO
            </ActionButton>
          </Grid>
        </Grid>
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ mt: 2 }}
        >
          2 pending PBUSE transactions require your approval
        </Alert>
      </CardContent>
    </Card>
  );
};

// Also add a default export to maintain compatibility with the index.ts file
export default HandReceiptActionsCard; 