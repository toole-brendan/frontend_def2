import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BuildIcon from '@mui/icons-material/Build';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { ItemDetails } from '../types';

interface ItemDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  item: ItemDetails | null;
  onTransfer: (item: ItemDetails) => void;
  onMaintenance: (item: ItemDetails) => void;
  onViewQR: (item: ItemDetails) => void;
}

const ItemDetailsDrawer: React.FC<ItemDetailsDrawerProps> = ({
  open,
  onClose,
  item,
  onTransfer,
  onMaintenance,
  onViewQR,
}) => {
  if (!item) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '400px',
          p: 3,
        },
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Item Details</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {/* General Info */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>General Information</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Item Name" secondary={item.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="NSN" secondary={item.nsn} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Serial Number" secondary={item.serialNumber} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Category" secondary={item.category} />
            </ListItem>
          </List>
        </Box>

        <Divider />

        {/* Current Status */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>Current Status</Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Status"
                secondary={
                  <Chip
                    label={item.status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                    size="small"
                    color={
                      item.status === 'available'
                        ? 'success'
                        : item.status === 'in_use'
                        ? 'warning'
                        : 'error'
                    }
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Location" secondary={item.location} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Assigned To" secondary={item.assignedTo || 'Unassigned'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Unit" secondary={item.unit} />
            </ListItem>
          </List>
        </Box>

        <Divider />

        {/* Assignment History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>Assignment History</Typography>
          <List dense>
            {item.assignmentHistory.map((history) => (
              <ListItem key={history.id}>
                <ListItemText
                  primary={`${history.action === 'issued' ? 'Issued to' : 'Returned from'} ${history.assignedTo}`}
                  secondary={`By ${history.assignedBy} on ${new Date(history.date).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* Maintenance History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>Maintenance History</Typography>
          <List dense>
            {item.maintenanceHistory.map((maintenance) => (
              <ListItem key={maintenance.id}>
                <ListItemText
                  primary={maintenance.type}
                  secondary={
                    <>
                      <Typography variant="body2">{maintenance.description}</Typography>
                      <Typography variant="caption">
                        Performed by {maintenance.performedBy} on {new Date(maintenance.date).toLocaleDateString()}
                      </Typography>
                      {maintenance.nextDueDate && (
                        <Typography variant="caption" color="error" display="block">
                          Next due: {new Date(maintenance.nextDueDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* Documents */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>Documents</Typography>
          <List dense>
            {item.documents.map((doc) => (
              <ListItem key={doc.id}>
                <ListItemText
                  primary={doc.name}
                  secondary={doc.type}
                />
                <Button size="small" href={doc.url} target="_blank">
                  View
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<SwapHorizIcon />}
            onClick={() => onTransfer(item)}
            fullWidth
          >
            Transfer
          </Button>
          <Button
            variant="outlined"
            startIcon={<BuildIcon />}
            onClick={() => onMaintenance(item)}
            fullWidth
          >
            Maintenance
          </Button>
          <Button
            variant="outlined"
            startIcon={<QrCodeIcon />}
            onClick={() => onViewQR(item)}
            fullWidth
          >
            QR Code
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default ItemDetailsDrawer; 