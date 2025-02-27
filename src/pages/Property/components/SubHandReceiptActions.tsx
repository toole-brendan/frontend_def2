import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PrintIcon from '@mui/icons-material/Print';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InventoryIcon from '@mui/icons-material/Inventory';
import DrawIcon from '@mui/icons-material/Draw';
import SyncIcon from '@mui/icons-material/Sync';

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
}));

const SubHandReceiptActions: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Sub-Hand Receipt Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            color="primary"
          >
            Create New Sub-Hand Receipt
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<AutorenewIcon />}
          >
            Bulk Renew Selected
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<PrintIcon />}
          >
            Print Selected
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<SwapHorizIcon />}
          >
            Transfer Between Sub-Hand Receipts
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<InventoryIcon />}
          >
            Conduct Inventory of Selected
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<DrawIcon />}
          >
            Manage Digital Signatures
          </ActionButton>
        </Grid>
        <Grid item xs={12}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<SyncIcon />}
            color="secondary"
          >
            Update PBUSE Sub-Hand Receipt Annex
          </ActionButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubHandReceiptActions; 