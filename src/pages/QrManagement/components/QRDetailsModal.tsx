import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { Grid } from '../../../components/common/Grid';
import { QRCodeSVG } from 'qrcode.react';
import type { QRCodeDetails } from '../types';

interface QRDetailsModalProps {
  open: boolean;
  onClose: () => void;
  qrDetails: QRCodeDetails | null;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ width: 140, flexShrink: 0 }}
    >
      {label}:
    </Typography>
    <Box sx={{ flex: 1 }}>{value}</Box>
  </Box>
);

export const QRDetailsModal: React.FC<QRDetailsModalProps> = ({
  open,
  onClose,
  qrDetails,
}) => {
  if (!qrDetails) return null;

  const qrValue = JSON.stringify({
    id: qrDetails.id,
    itemId: qrDetails.itemId,
    actionType: qrDetails.actionType,
    metadata: qrDetails.metadata,
  });

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
        <Typography variant="h6">QR Code Details</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Item Information
              </Typography>
              <DetailRow
                label="Name"
                value={
                  <Typography variant="body2">
                    {qrDetails.item.name}
                  </Typography>
                }
              />
              <DetailRow
                label="Serial Number"
                value={
                  <Typography variant="body2">
                    {qrDetails.item.serialNumber}
                  </Typography>
                }
              />
              <DetailRow
                label="Category"
                value={
                  <Typography variant="body2">
                    {qrDetails.item.category}
                  </Typography>
                }
              />
              <DetailRow
                label="Location"
                value={
                  <Typography variant="body2">
                    {qrDetails.item.location}
                  </Typography>
                }
              />
              <DetailRow
                label="Status"
                value={
                  <Chip
                    label={qrDetails.item.status}
                    size="small"
                    color={qrDetails.item.status === 'AVAILABLE' ? 'success' : 'warning'}
                  />
                }
              />
              {qrDetails.item.assignedUser && (
                <DetailRow
                  label="Assigned To"
                  value={
                    <Typography variant="body2">
                      {qrDetails.item.assignedUser}
                    </Typography>
                  }
                />
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                QR Code Information
              </Typography>
              <DetailRow
                label="Action Type"
                value={
                  <Typography variant="body2">
                    {qrDetails.actionType.charAt(0) + qrDetails.actionType.slice(1).toLowerCase()}
                  </Typography>
                }
              />
              <DetailRow
                label="Created"
                value={
                  <Typography variant="body2">
                    {new Date(qrDetails.createdAt).toLocaleString()}
                  </Typography>
                }
              />
              <DetailRow
                label="Status"
                value={
                  <Chip
                    label={qrDetails.status}
                    size="small"
                    color={qrDetails.status === 'ACTIVE' ? 'success' : 'error'}
                  />
                }
              />
              <DetailRow
                label="Included Data"
                value={
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {Object.entries(qrDetails.metadata)
                      .filter(([_, value]) => value)
                      .map(([key]) => (
                        <Chip
                          key={key}
                          label={key.replace(/([A-Z])/g, ' $1').trim()}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                  </Box>
                }
              />
            </Box>
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
                Scan to view item details
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={onClose}>
          Download QR Code
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 