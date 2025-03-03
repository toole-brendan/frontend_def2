import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Shield as ShieldIcon,
  Close as CloseIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Camera as CameraIcon,
  CheckCircle as CheckCircleIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  InfoOutlined as InfoIcon,
  Share as ShareIcon,
  CheckCircle as CheckCircleCompleteIcon
} from '@mui/icons-material';

// Mock QR Scanner Component
const QrScanner = ({ onResult, isActive }: { onResult: (result: string) => void, isActive: boolean }) => {
  useEffect(() => {
    // Simulate finding a QR code after 2 seconds
    if (isActive) {
      const timer = setTimeout(() => {
        onResult('WEAPON-M4-991234567');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onResult]);
  
  return (
    <Box sx={{ 
      width: '100%', 
      height: 300, 
      bgcolor: alpha('#000', 0.9), 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      mb: 3
    }}>
      {/* Scanner overlay with animated scanner line */}
      <Box sx={{ 
        position: 'absolute',
        width: '80%',
        height: '80%',
        border: '2px solid rgba(0, 255, 0, 0.5)',
        borderRadius: 1
      }}>
        <Box sx={{ 
          position: 'absolute',
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(0, 255, 0, 0.7)',
          animation: 'scan 2s infinite',
          '@keyframes scan': {
            '0%': { top: '0%' },
            '50%': { top: '100%' },
            '100%': { top: '0%' }
          }
        }} />
      </Box>
      
      <QrCodeScannerIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 40, mb: 2 }} />
      <Typography variant="body1" color="white">
        Camera Viewfinder Active
      </Typography>
      <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" sx={{ mt: 1 }}>
        Position QR code within the green box
      </Typography>
    </Box>
  );
};

interface InventoryModalProps {
  open: boolean;
  onClose: () => void;
  showScanner: boolean;
  scanComplete: boolean;
  handleScannerToggle: () => void;
  simulateScanComplete: () => void;
}

/**
 * InventoryModal component for conducting sensitive items inventory
 */
const InventoryModal: React.FC<InventoryModalProps> = ({
  open,
  onClose,
  showScanner,
  scanComplete,
  handleScannerToggle,
  simulateScanComplete
}) => {
  const theme = useTheme();
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  // Handle QR scan result
  const handleScanResult = (result: string) => {
    setScannedItems(prev => [...prev, result]);
    setScanProgress(prev => {
      const newProgress = prev + 1;
      // Once we've "scanned" a few items, complete the process
      if (newProgress >= 3) {
        setTimeout(() => {
          simulateScanComplete();
          setIsScanning(false);
        }, 1000);
      }
      return newProgress;
    });
  };
  
  // Start scanning function
  const startScanning = () => {
    setIsScanning(true);
    handleScannerToggle();
    setScanProgress(0);
    setScannedItems([]);
  };

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
            <Typography variant="h6">Conduct Sensitive Items Inventory</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {!showScanner ? (
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
              Daily Sensitive Items Inventory - 25FEB2025 1700
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              You are about to conduct the daily sensitive items inventory for B Company, 2-87 Infantry. This inventory requires verification of all 210 sensitive items.
            </Typography>
            
            <Box sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), p: 2, mb: 3, border: `1px solid ${alpha(theme.palette.info.main, 0.3)}` }}>
              <Typography variant="subtitle2" color="info.main" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <InfoIcon fontSize="small" sx={{ mr: 1 }} /> Inventory Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Type</Typography>
                  <Typography variant="body1">Daily Check</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Date/Time</Typography>
                  <Typography variant="body1">25FEB2025 1700</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Items to Verify</Typography>
                  <Typography variant="body1">210 Items</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Conducted By</Typography>
                  <Typography variant="body1">CPT Rodriguez</Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
              Inventory Methods
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)', height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                        <QrCodeScannerIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1">QR Code Scan</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Use your device's camera to scan QR codes on each sensitive item. This is the fastest and most secure method with blockchain verification.
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      startIcon={<CameraIcon />} 
                      onClick={startScanning}
                      sx={{ borderRadius: 0 }}
                    >
                      Start Scanning
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)', height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(theme.palette.info.main, 0.15),
                          color: theme.palette.info.main,
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          borderRadius: 0
                        }}
                      >
                        <ListAltIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1">Manual Check</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Verify items manually using a checklist. This method allows you to mark items as verified individually.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      startIcon={<CheckCircleIcon />} 
                      sx={{ borderRadius: 0 }}
                    >
                      Open Checklist
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)', height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(theme.palette.success.main, 0.15),
                          color: theme.palette.success.main,
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          borderRadius: 0
                        }}
                      >
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1">Team Inventory</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Conduct inventory with multiple team members simultaneously for faster processing.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      startIcon={<ShareIcon />} 
                      sx={{ borderRadius: 0 }}
                    >
                      Assign Team
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              IMPORTANT NOTES
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              • All discrepancies must be reported immediately to the Commander and S-4<br />
              • Ensure all items are physically observed and verified<br />
              • Document serial numbers for any items with damaged or missing QR codes<br />
              • Inventory must be completed and submitted by 1800
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            {!scanComplete ? (
              <>
                {/* QR Scanner Component */}
                <QrScanner onResult={handleScanResult} isActive={isScanning} />
                
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Scanning for QR Codes...
                </Typography>
                
                {scannedItems.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Scanned Items: ({scannedItems.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      {scannedItems.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          size="small"
                          color="primary"
                          sx={{ borderRadius: 0 }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <CircularProgress size={60} variant={scanProgress > 0 ? "determinate" : "indeterminate"} value={scanProgress > 0 ? (scanProgress / 3) * 100 : undefined} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {scanProgress === 0 ? "Point camera at QR code on sensitive item" : `${scanProgress} items scanned - continue scanning...`}
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ 
                  width: '100%', 
                  p: 3, 
                  bgcolor: alpha(theme.palette.success.light, 0.1), 
                  border: `1px solid ${theme.palette.success.light}`,
                  mb: 3
                }}>
                  <CheckCircleCompleteIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" color="success.main" sx={{ mb: 1 }}>
                    Scan Complete!
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    All sensitive items have been scanned and verified.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Chip 
                      label="210/210 Items Verified" 
                      color="success" 
                      icon={<CheckCircleCompleteIcon />}
                      sx={{ borderRadius: 0 }}
                    />
                  </Box>
                </Box>
                
                <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
                  Inventory Summary
                </Typography>
                <TableContainer component={Paper} sx={{ mb: 3, borderRadius: 0 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Total Items</TableCell>
                        <TableCell>Verified</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Weapons</TableCell>
                        <TableCell>150</TableCell>
                        <TableCell>150</TableCell>
                        <TableCell>
                          <Chip 
                            label="Verified" 
                            size="small" 
                            color="success"
                            sx={{ borderRadius: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Optics</TableCell>
                        <TableCell>32</TableCell>
                        <TableCell>32</TableCell>
                        <TableCell>
                          <Chip 
                            label="Verified" 
                            size="small" 
                            color="success"
                            sx={{ borderRadius: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Communications</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>
                          <Chip 
                            label="Verified" 
                            size="small" 
                            color="success"
                            sx={{ borderRadius: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Other Sensitive Items</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>
                          <Chip 
                            label="Verified" 
                            size="small" 
                            color="success"
                            sx={{ borderRadius: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {showScanner && scanComplete ? (
          <>
            <Button onClick={onClose} sx={{ borderRadius: 0 }}>Cancel</Button>
            <Button variant="contained" onClick={onClose} sx={{ borderRadius: 0 }}>Submit Inventory Report</Button>
          </>
        ) : (
          <Button onClick={onClose} sx={{ borderRadius: 0 }}>Cancel</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InventoryModal;
