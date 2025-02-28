import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import RefreshIcon from '@mui/icons-material/Refresh';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import { QRScanResult } from '../types';

interface QRScannerPanelProps {
  onScan: (serialNumber: string) => Promise<QRScanResult>;
  onClearScans: () => void;
  onScanToTransfer: (scannedItem: QRScanResult) => void;
  recentScans: QRScanResult[];
}

const QRScannerPanel: React.FC<QRScannerPanelProps> = ({
  onScan,
  onClearScans,
  onScanToTransfer,
  recentScans
}) => {
  const [scanActive, setScanActive] = useState(false);
  const [manualEntry, setManualEntry] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivateScanner = () => {
    setScanActive(true);
    
    // In a real implementation, this would activate the device camera
    // and set up the QR code detection
  };

  const handleStopScanner = () => {
    setScanActive(false);
  };

  const handleManualEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManualEntry(event.target.value);
  };

  const handleManualScan = async () => {
    if (!manualEntry.trim()) {
      setError('Please enter a serial number');
      return;
    }

    setScanning(true);
    setError(null);

    try {
      await onScan(manualEntry.trim());
      setManualEntry('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error scanning item');
    } finally {
      setScanning(false);
    }
  };

  const renderScanArea = () => (
    <Paper 
      sx={{ 
        p: 2, 
        border: '2px dashed #ccc', 
        height: 250, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2,
        bgcolor: scanActive ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
        position: 'relative'
      }}
    >
      {scanActive ? (
        <>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Point camera at QR code on equipment
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleStopScanner}
            sx={{ position: 'absolute', bottom: 16, zIndex: 2 }}
          >
            Stop Scanner
          </Button>
        </>
      ) : (
        <>
          <QrCodeScannerIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Scan QR code to identify equipment
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<QrCodeScannerIcon />}
            onClick={handleActivateScanner}
            sx={{ mt: 2 }}
          >
            Activate Camera
          </Button>
        </>
      )}
    </Paper>
  );

  const renderManualEntry = () => (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Manual Entry
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Enter serial number"
          fullWidth
          value={manualEntry}
          onChange={handleManualEntryChange}
          error={!!error}
          helperText={error}
          sx={{ mr: 1 }}
        />
        <Button 
          variant="contained"
          onClick={handleManualScan}
          disabled={scanning || !manualEntry.trim()}
        >
          {scanning ? 'Scanning...' : 'Search'}
        </Button>
      </Box>
    </Paper>
  );

  const renderRecentScans = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2">
          Recent Scans ({recentScans.length})
        </Typography>
        {recentScans.length > 0 && (
          <Button 
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onClearScans}
          >
            Clear
          </Button>
        )}
      </Box>
      <List dense>
        {recentScans.length === 0 ? (
          <ListItem>
            <ListItemText 
              primary="No recent scans" 
              secondary="Scanned items will appear here" 
              primaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ) : (
          recentScans.map((scan) => (
            <ListItem 
              key={scan.itemId} 
              sx={{ 
                bgcolor: scan.success ? 'success.lightest' : 'error.lightest',
                borderRadius: 1,
                mb: 0.5
              }}
            >
              <ListItemIcon>
                {scan.success ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <ErrorIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={scan.serialNumber} 
                secondary={scan.success ? `Item ID: ${scan.itemId}` : scan.error} 
              />
              {scan.success && (
                <ListItemSecondaryAction>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => onScanToTransfer(scan)}
                  >
                    Use
                  </Button>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  const renderWorkflows = () => (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Scanning Workflows
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }}>
        <Button 
          variant="outlined" 
          size="small"
          startIcon={<InventoryIcon />}
          onClick={() => {/* Handle workflow selection */}}
        >
          Scan to Initiate Transfer
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          startIcon={<InventoryIcon />}
          onClick={() => {/* Handle workflow selection */}}
        >
          Scan to Receive Equipment
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<InventoryIcon />}
          onClick={() => {/* Handle workflow selection */}}
        >
          Scan to Verify Equipment
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          startIcon={<InventoryIcon />}
          onClick={() => {/* Handle workflow selection */}}
        >
          Scan to View Equipment Details
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <Card sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" fontWeight="medium" gutterBottom>
        Scan Equipment
      </Typography>
      
      {renderScanArea()}
      {renderManualEntry()}
      
      <Divider sx={{ my: 2 }} />
      
      {renderRecentScans()}
      
      <Divider sx={{ my: 2 }} />
      
      {renderWorkflows()}
    </Card>
  );
};

export default QRScannerPanel; 