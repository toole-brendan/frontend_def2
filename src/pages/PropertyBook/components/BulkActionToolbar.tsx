import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Divider,
  Chip,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import {
  Print as PrintIcon,
  LocalShipping as TransferIcon,
  Assignment as InventoryIcon,
  Label as StatusIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Build as MaintenanceIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { PropertyItem } from './PropertyBookTable';

interface BulkActionToolbarProps {
  selectedItems: PropertyItem[];
  onBulkAction: (action: string, items: PropertyItem[], additionalData?: any) => void;
  onClearSelection: () => void;
}

const BulkActionToolbar: React.FC<BulkActionToolbarProps> = ({
  selectedItems,
  onBulkAction,
  onClearSelection,
}) => {
  const [statusMenuEl, setStatusMenuEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<{
    type: string;
    title: string;
    message: string;
    confirmLabel: string;
    status?: string;
  } | null>(null);

  const handleOpenStatusMenu = (event: React.MouseEvent<HTMLElement>) => {
    setStatusMenuEl(event.currentTarget);
  };

  const handleCloseStatusMenu = () => {
    setStatusMenuEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentAction(null);
  };

  const handleActionConfirm = () => {
    if (currentAction) {
      onBulkAction(
        currentAction.type, 
        selectedItems, 
        currentAction.status ? { status: currentAction.status } : undefined
      );
      handleDialogClose();
    }
  };

  const confirmAction = (
    type: string,
    title: string,
    message: string,
    confirmLabel: string,
    status?: string
  ) => {
    setCurrentAction({
      type,
      title,
      message,
      confirmLabel,
      status,
    });
    setDialogOpen(true);
  };

  // Handle status selection
  const handleStatusSelect = (status: string) => {
    confirmAction(
      'updateStatus',
      'Update Equipment Status',
      `Are you sure you want to update ${selectedItems.length} item(s) to "${status}" status?`,
      'Update Status',
      status
    );
    handleCloseStatusMenu();
  };

  // Handle printing hand receipts
  const handlePrintHandReceipt = () => {
    confirmAction(
      'printHandReceipt',
      'Print Hand Receipt',
      `Generate hand receipt for ${selectedItems.length} selected item(s)?`,
      'Print'
    );
  };

  // Handle transfer items
  const handleTransferItems = () => {
    confirmAction(
      'transfer',
      'Transfer Equipment',
      `Are you sure you want to initiate transfer for ${selectedItems.length} selected item(s)?`,
      'Transfer'
    );
  };

  // Handle inventory verification
  const handleInventoryVerification = () => {
    confirmAction(
      'inventoryVerify',
      'Verify Equipment',
      `Mark ${selectedItems.length} selected item(s) as verified today?`,
      'Verify'
    );
  };

  // Group selected items by category for display
  const getCategoryBreakdown = () => {
    const categories: Record<string, number> = {};
    
    selectedItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = 0;
      }
      categories[item.category]++;
    });
    
    return Object.entries(categories).slice(0, 3).map(([category, count]) => (
      <Chip 
        key={category}
        label={`${category}: ${count}`}
        size="small"
        variant="outlined"
        sx={{ ml: 1 }}
      />
    ));
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          position: 'sticky',
          bottom: 16,
          zIndex: 10,
          p: 2,
          mx: 2,
          mb: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: (theme) => theme.shadows[8],
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
          </Typography>
          
          {selectedItems.length > 0 && getCategoryBreakdown()}
          
          <Tooltip title="Clear selection">
            <IconButton 
              size="small" 
              onClick={onClearSelection}
              sx={{ ml: 1, color: 'primary.contrastText' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PrintIcon />}
            onClick={handlePrintHandReceipt}
            size="small"
          >
            Print Hand Receipt
          </Button>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<TransferIcon />}
            onClick={handleTransferItems}
            size="small"
          >
            Transfer Selected
          </Button>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<StatusIcon />}
            onClick={handleOpenStatusMenu}
            size="small"
          >
            Update Status
          </Button>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<InventoryIcon />}
            onClick={handleInventoryVerification}
            size="small"
          >
            Inventory Selected
          </Button>
        </Box>
      </Paper>

      {/* Status Menu */}
      <Menu
        anchorEl={statusMenuEl}
        open={Boolean(statusMenuEl)}
        onClose={handleCloseStatusMenu}
      >
        <MenuItem onClick={() => handleStatusSelect('Serviceable')}>
          <CheckIcon color="success" fontSize="small" sx={{ mr: 1 }} />
          Serviceable
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('Maintenance')}>
          <MaintenanceIcon color="warning" fontSize="small" sx={{ mr: 1 }} />
          Maintenance
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('Unserviceable')}>
          <CancelIcon color="error" fontSize="small" sx={{ mr: 1 }} />
          Unserviceable
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('Shortage')}>
          <WarningIcon color="error" fontSize="small" sx={{ mr: 1 }} />
          Shortage
        </MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {currentAction?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentAction?.message}
          </DialogContentText>
          {currentAction?.type === 'printHandReceipt' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Items to include:
              </Typography>
              <Box sx={{ ml: 2 }}>
                {selectedItems.slice(0, 5).map((item) => (
                  <Typography key={item.id} variant="body2">
                    • {item.nomenclature} ({item.serialNumber})
                  </Typography>
                ))}
                {selectedItems.length > 5 && (
                  <Typography variant="body2">
                    • And {selectedItems.length - 5} more item(s)
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleActionConfirm} 
            color="primary" 
            variant="contained" 
            autoFocus
          >
            {currentAction?.confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkActionToolbar; 