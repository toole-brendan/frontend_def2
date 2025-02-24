import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Transfer } from '../types';
import TransferDetailsModal from './TransferDetailsModal';

interface ConfirmReceiptTabProps {
  pendingTransfers: Transfer[];
  onConfirmReceipt: (transfer: Transfer) => void;
}

const ConfirmReceiptTab: React.FC<ConfirmReceiptTabProps> = ({
  pendingTransfers,
  onConfirmReceipt,
}) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);

  const handleViewDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setDetailsModalOpen(true);
  };

  return (
    <Box>
      {/* Pending Transfers List */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Pending Transfers to Confirm
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review and confirm receipt of property transfers assigned to you
          </Typography>
        </Box>
        <Divider />
        <List>
          {pendingTransfers.map((transfer, index) => (
            <React.Fragment key={transfer.id}>
              <ListItem>
                <ListItemText
                  primary={`Transfer ID: ${transfer.id}`}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="text.primary">
                        From: {transfer.from.rank} {transfer.from.name}
                      </Typography>
                      <br />
                      {`${transfer.items.length} item${transfer.items.length > 1 ? 's' : ''}`}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="view details"
                    onClick={() => handleViewDetails(transfer)}
                    sx={{ mr: 1 }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="confirm receipt"
                    onClick={() => onConfirmReceipt(transfer)}
                    color="primary"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < pendingTransfers.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {pendingTransfers.length === 0 && (
            <ListItem>
              <ListItemText
                primary="No pending transfers"
                secondary="You don't have any transfers waiting for confirmation"
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Transfer Details Modal */}
      <TransferDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        transfer={selectedTransfer}
        onDownload={() => {/* Handle download */}}
      />
    </Box>
  );
};

export default ConfirmReceiptTab; 