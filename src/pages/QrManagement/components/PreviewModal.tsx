import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Grid } from '../../../components/common/Grid';
import { QRCodeSVG } from 'qrcode.react';
import CheckIcon from '@mui/icons-material/Check';
import type { GenerateQRFormData, ItemDetails } from '../types';

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: GenerateQRFormData;
  selectedItem: ItemDetails | null;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  open,
  onClose,
  onConfirm,
  formData,
  selectedItem,
}) => {
  if (!selectedItem) return null;

  const qrValue = JSON.stringify({
    itemId: selectedItem.id,
    actionType: formData.actionType,
    metadata: formData.metadata,
    timestamp: new Date().toISOString(),
  });

  const includedFields = Object.entries(formData.metadata)
    .filter(([_, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim());

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6">Preview QR Code</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                QR Code Configuration
              </Typography>
              <Typography variant="body2" paragraph>
                The following information will be encoded in the QR code:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Item"
                    secondary={`${selectedItem.name} (${selectedItem.serialNumber})`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Action Type"
                    secondary={formData.actionType.charAt(0) + formData.actionType.slice(1).toLowerCase()}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Included Fields"
                    secondary={includedFields.join(', ')}
                  />
                </ListItem>
              </List>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Note: The QR code will be active immediately after generation and can be used for tracking the specified item.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                backgroundColor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <QRCodeSVG
                value={qrValue}
                size={200}
                level="H"
                includeMargin
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                Preview of generated QR code
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Generate QR Code
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 