import React, { useState } from 'react';
  // @ts-ignore - Unused variable intentionally kept
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Box, TextField, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, ListItemIcon, IconButton, FormHelperText, Paper, SelectChangeEvent,  } from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { usePropertyBook } from '../context/PropertyBookContext';

export const TransferModal: React.FC = () => {
  
  const {
    transferModalOpen,
    closeTransferModal,
    selectedItems,
    propertyItems,
    transferItems,
  } = usePropertyBook();
  
  // State for the transfer form
  const [recipient, setRecipient] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<{ recipient?: string; reason?: string }>({});
  const [dateOfTransfer, setDateOfTransfer] = useState(
    new Date().toISOString().slice(0, 10)
  );
  
  // Get the selected items' details
  const selectedItemsDetails = propertyItems.filter(item => 
    selectedItems.includes(item.id)
  );
  
  // Get unique hand receipt holders for recipient dropdown
  const handReceiptHolders = React.useMemo(() => {
    const uniqueHolders = new Set<string>();
    propertyItems.forEach(item => uniqueHolders.add(item.handReceiptHolder));
    // Add some additional mock recipients for demo purposes
    uniqueHolders.add('LT Johnson');
    uniqueHolders.add('SSG Wilson');
    uniqueHolders.add('SFC Clark');
    return Array.from(uniqueHolders).sort();
  }, [propertyItems]);
  
  // Handle form changes
  const handleRecipientChange = (event: SelectChangeEvent) => {
    setRecipient(event.target.value);
    if (errors.recipient) {
      setErrors({ ...errors, recipient: undefined });
    }
  };
  
  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
    if (errors.reason) {
      setErrors({ ...errors, reason: undefined });
    }
  };
  
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfTransfer(event.target.value);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    const newErrors: { recipient?: string; reason?: string } = {};
    
    if (!recipient) {
      newErrors.recipient = 'Recipient is required';
    }
    
    if (!reason) {
      newErrors.reason = 'Reason for transfer is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Process transfer
    transferItems(recipient, selectedItems);
  };
  
  // Reset form when dialog closes
  const handleClose = () => {
    setRecipient('');
    setReason('');
    setErrors({});
    setDateOfTransfer(new Date().toISOString().slice(0, 10));
    closeTransferModal();
  };
  
  // Calculate total value
  const totalValue = selectedItemsDetails.reduce(
    (sum, item) => sum + item.value, 
    0
  );
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog 
      open={transferModalOpen} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 0 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        <Box>
          <Typography variant="h6" component="div">
            Transfer Items
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Transfer selected property to another hand receipt holder
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Left side - Transfer form */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Transfer Details
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth
                  error={!!errors.recipient}
                >
                  <InputLabel id="recipient-label">Transfer To</InputLabel>
                  <Select
                    labelId="recipient-label"
                    id="recipient"
                    value={recipient}
                    label="Transfer To"
                    onChange={handleRecipientChange}
                  >
                    <MenuItem value="" disabled>
                      <em>Select a recipient</em>
                    </MenuItem>
                    {handReceiptHolders.map(holder => (
                      <MenuItem key={holder} value={holder}>{holder}</MenuItem>
                    ))}
                  </Select>
                  {errors.recipient && (
                    <FormHelperText>{errors.recipient}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Date of Transfer"
                  type="date"
                  fullWidth
                  value={dateOfTransfer}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Reason for Transfer"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Explain why these items are being transferred..."
                  value={reason}
                  onChange={handleReasonChange}
                  error={!!errors.reason}
                  helperText={errors.reason}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" gutterBottom>
                Transfer Summary
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Items to Transfer:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="medium">
                    {selectedItemsDetails.length}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Value:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(totalValue)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          {/* Right side - Item list */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Items to Transfer
            </Typography>
            
            <Paper 
              variant="outlined" 
              sx={{ 
                maxHeight: 350, 
                overflow: 'auto',
                '& .MuiListItem-root': {
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }
              }}
            >
              <List disablePadding>
                {selectedItemsDetails.length > 0 ? (
                  selectedItemsDetails.map(item => (
                    <ListItem key={item.id}>
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.nomenclature}
                        secondary={
                          <>
                            <Typography variant="caption" component="span">
                              SN: {item.serialNumber}
                            </Typography>
                            <br />
                            <Typography variant="caption" component="span">
                              {formatCurrency(item.value)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText 
                      primary="No items selected" 
                      secondary="Please select items to transfer first"
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
            
            {selectedItemsDetails.length > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                These items will be transferred to the selected recipient. This action will be recorded in the property book history.
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={handleSubmit}
          disabled={selectedItemsDetails.length === 0}
        >
          Complete Transfer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferModal;
