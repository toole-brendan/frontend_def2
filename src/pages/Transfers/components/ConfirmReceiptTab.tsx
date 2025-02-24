import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Transfer, QRScanResult } from '../types';
import QRScanner from './QRScanner';
import TransferDetailsModal from './TransferDetailsModal';

interface ConfirmReceiptTabProps {
  pendingTransfers: Transfer[];
  onConfirmReceipt: (transfer: Transfer) => void;
  onViewDetails: (transfer: Transfer) => void;
}

const ConfirmReceiptTab: React.FC<ConfirmReceiptTabProps> = ({
  pendingTransfers,
  onConfirmReceipt,
  onViewDetails,
}) => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleQRScan = (result: QRScanResult) => {
    // Find transfer matching the scanned item
    const transfer = pendingTransfers.find(t =>
      t.items.some(item => item.id === result.itemId)
    );

    if (transfer) {
      setSelectedTransfer(transfer);
      setDetailsModalOpen(true);
    } else {
      // Handle no matching transfer found
      console.log('No pending transfer found for this item');
    }
  };

  return (
    <Box>
      {/* Quick Action Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Button
          variant="outlined"
          startIcon={<QrCodeScannerIcon />}
          onClick={() => setIsQRScannerOpen(true)}
          fullWidth
          sx={{ mb: 2 }}
        >
          Scan QR to Confirm Receipt
        </Button>
        <Typography variant="body2" color="text.secondary">
          Scan the QR code on any item to quickly confirm its receipt
        </Typography>
      </Paper>

      {/* Pending Transfers List */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Pending Transfers to Confirm
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
                    onClick={() => onViewDetails(transfer)}
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

      {/* QR Scanner Modal */}
      <QRScanner
        open={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanComplete={handleQRScan}
        title="Scan Item to Confirm Receipt"
      />

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