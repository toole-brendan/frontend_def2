import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Shield as ShieldIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  QrCodeScanner as QrCodeScannerIcon,
  History as HistoryIcon,
  Print as PrintIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';
import { SensitiveItem } from '../../../types/sensitiveItems';

interface ItemDetailsModalProps {
  selectedItem: SensitiveItem | null;
  open: boolean;
  onClose: () => void;
}

/**
 * ItemDetailsModal component displays detailed information about a sensitive item
 */
const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  selectedItem,
  open,
  onClose
}) => {
  const theme = useTheme();

  if (!selectedItem) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                width: 32,
                height: 32,
                mr: 1.5,
                borderRadius: 0
              }}
            >
              <ShieldIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6">{selectedItem.item}</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">ITEM DETAILS</Typography>
            <Box sx={{ mt: 1, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Type</Typography>
                  <Typography variant="body1">{selectedItem.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Typography variant="body1">Category {selectedItem.category}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Serial Number</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{selectedItem.serialNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Current Location</Typography>
                  <Typography variant="body1">{selectedItem.location}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Assigned To</Typography>
                  <Typography variant="body1">{selectedItem.assignedTo}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Typography variant="subtitle2" color="text.secondary">VERIFICATION STATUS</Typography>
            <Box sx={{ mt: 1, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Last Verified</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{selectedItem.lastVerified}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={selectedItem.status} 
                    size="small" 
                    color={selectedItem.status === 'Verified' ? 'success' : selectedItem.status === 'In Repair' ? 'warning' : 'primary'}
                    sx={{ borderRadius: 0 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Blockchain Verification</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <VerifiedUserIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body1">Verified on blockchain ({selectedItem.lastVerified})</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">VERIFICATION HISTORY</Typography>
            <List sx={{ mt: 1, mb: 3 }}>
              <ListItem>
                <ListItemIcon>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.15),
                      color: theme.palette.success.main,
                      width: 24,
                      height: 24,
                      borderRadius: 0
                    }}
                  >
                    <CheckCircleIcon fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText 
                  primary="Verified during daily inventory" 
                  secondary={`${selectedItem.lastVerified} - ${selectedItem.assignedTo}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.15),
                      color: theme.palette.success.main,
                      width: 24,
                      height: 24,
                      borderRadius: 0
                    }}
                  >
                    <CheckCircleIcon fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText 
                  primary="Verified during daily inventory" 
                  secondary="24FEB2025 1700 - 1LT Morgan"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.15),
                      color: theme.palette.success.main,
                      width: 24,
                      height: 24,
                      borderRadius: 0
                    }}
                  >
                    <CheckCircleIcon fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText 
                  primary="Verified during daily inventory" 
                  secondary="24FEB2025 0730 - 1LT Morgan"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.15),
                      color: theme.palette.success.main,
                      width: 24,
                      height: 24,
                      borderRadius: 0
                    }}
                  >
                    <CheckCircleIcon fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText 
                  primary="Verified during daily inventory" 
                  secondary="23FEB2025 1700 - 1LT Williams"
                />
              </ListItem>
            </List>

            <Typography variant="subtitle2" color="text.secondary">ACTIONS</Typography>
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<QrCodeScannerIcon />}
                sx={{ borderRadius: 0 }}
              >
                Verify Now
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<HistoryIcon />}
                sx={{ borderRadius: 0 }}
              >
                Full History
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<PrintIcon />}
                sx={{ borderRadius: 0 }}
              >
                Print Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ borderRadius: 0 }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDetailsModal;
