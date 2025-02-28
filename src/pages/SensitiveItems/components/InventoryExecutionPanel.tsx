import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Grid,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Alert
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import {
  QrCodeScanner as QrCodeScannerIcon,
  Camera as CameraIcon,
  Edit as EditIcon,
  Pause as PauseIcon,
  Report as ReportIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Videocam as VideocamIcon,
  Check as CheckIcon,
  QueryBuilder as QueryBuilderIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

interface SensitiveItem {
  id: string;
  category: string;
  nomenclature: string;
  serialNumber: string;
  location: string;
  handReceipt: string;
  verified: boolean;
}

interface InventoryExecutionPanelProps {
  open: boolean;
  onClose: () => void;
  items: SensitiveItem[];
  onCompleteInventory: (verifiedItems: string[], unverifiedItems: string[], notes: string) => void;
  onPauseInventory: () => void;
  onReportDiscrepancy: (itemId: string, issue: string) => void;
}

const InventoryExecutionPanel: React.FC<InventoryExecutionPanelProps> = ({
  open,
  onClose,
  items = [], // Provide default empty array to avoid undefined errors
  onCompleteInventory,
  onPauseInventory,
  onReportDiscrepancy
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [inventoryType, setInventoryType] = useState('daily');
  const [inventoryMethod, setInventoryMethod] = useState('qrCode');
  const [verifiedItems, setVerifiedItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<SensitiveItem | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [notes, setNotes] = useState('');
  const [discrepancyDialogOpen, setDiscrepancyDialogOpen] = useState(false);
  const [discrepancyItem, setDiscrepancyItem] = useState<SensitiveItem | null>(null);
  const [discrepancyNote, setDiscrepancyNote] = useState('');
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  // Calculate progress
  const progress = items.length > 0 ? Math.round((verifiedItems.length / items.length) * 100) : 0;
  const remainingItems = items.filter(item => !verifiedItems.includes(item.id));
  
  // Steps for inventory process
  const steps = ['Select Inventory Type', 'Choose Method', 'Verify Items', 'Review & Submit'];

  const handleNext = () => {
    if (activeStep === 2 && verifiedItems.length < items.length) {
      // If leaving verification step with unverified items, show warning
      setShowLeaveWarning(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleConfirmLeave = () => {
    setShowLeaveWarning(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleCancelLeave = () => {
    setShowLeaveWarning(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInventoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryType(event.target.value);
  };

  const handleInventoryMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryMethod(event.target.value);
  };

  const handleItemVerification = (item: SensitiveItem) => {
    if (item) {
      setCurrentItem(item);
      setScannerActive(true);
    }
  };

  const handleVerificationSuccess = () => {
    if (currentItem) {
      setVerifiedItems(prev => [...prev, currentItem.id]);
      setScannerActive(false);
      setCurrentItem(null);
    }
  };

  const handleVerificationCancel = () => {
    setScannerActive(false);
    setCurrentItem(null);
  };

  const handleReportDiscrepancy = (item: SensitiveItem) => {
    if (item) {
      setDiscrepancyItem(item);
      setDiscrepancyDialogOpen(true);
    }
  };

  const handleSubmitDiscrepancy = () => {
    if (discrepancyItem && discrepancyNote.trim()) {
      try {
        onReportDiscrepancy(discrepancyItem.id, discrepancyNote);
      } catch (error) {
        console.error('Error reporting discrepancy:', error);
        alert('Failed to report discrepancy. Please try again.');
      }
      setDiscrepancyDialogOpen(false);
      setDiscrepancyItem(null);
      setDiscrepancyNote('');
    }
  };

  const handleCloseWithConfirm = () => {
    if (verifiedItems.length > 0 && activeStep > 0) {
      setShowCloseConfirmation(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setShowCloseConfirmation(false);
    onClose();
  };

  const cancelClose = () => {
    setShowCloseConfirmation(false);
  };

  const handleCompleteInventory = () => {
    // Safety check for empty arrays
    if (items.length === 0) {
      alert('No items to inventory');
      return;
    }
    
    const unverifiedItemIds = items
      .filter(item => !verifiedItems.includes(item.id))
      .map(item => item.id);
    
    try {
      onCompleteInventory(verifiedItems, unverifiedItemIds, notes.trim());
      onClose();
    } catch (error) {
      console.error('Error completing inventory:', error);
      alert('Failed to complete inventory. Please try again.');
    }
  };

  const handlePauseWithSave = () => {
    try {
      onPauseInventory();
      onClose();
    } catch (error) {
      console.error('Error pausing inventory:', error);
      alert('Failed to pause inventory. Please try again.');
    }
  };

  const resetInventoryState = () => {
    setActiveStep(0);
    setVerifiedItems([]);
    setCurrentItem(null);
    setScannerActive(false);
    setNotes('');
    setDiscrepancyDialogOpen(false);
    setDiscrepancyItem(null);
    setDiscrepancyNote('');
    setShowLeaveWarning(false);
    setShowCloseConfirmation(false);
  };

  // If the panel is closed, we should reset state for next time it opens
  useEffect(() => {
    if (!open) {
      resetInventoryState();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Dialog 
      open={open} 
      fullScreen 
      onClose={handleCloseWithConfirm}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="bold">
              Conduct Sensitive Item Inventory
            </Typography>
            <IconButton onClick={handleCloseWithConfirm} edge="end">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Box sx={{ width: '100%', p: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          
          <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
            {items.length === 0 && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                No items available for inventory. Please add sensitive items to the system or check your filters.
              </Alert>
            )}
            
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Select Inventory Type
                </Typography>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <RadioGroup
                    aria-label="inventory-type"
                    name="inventory-type"
                    value={inventoryType}
                    onChange={handleInventoryTypeChange}
                  >
                    <Paper 
                      elevation={inventoryType === 'daily' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryType === 'daily' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryType === 'daily' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="daily" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Daily Check (visual verification)</Typography>
                            <Typography variant="body2" color="text.secondary">Quick visual verification of all sensitive items. Required daily per AR 710-2.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                    
                    <Paper 
                      elevation={inventoryType === 'weekly' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryType === 'weekly' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryType === 'weekly' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="weekly" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Weekly Serial Number Verification</Typography>
                            <Typography variant="body2" color="text.secondary">Detailed verification of all sensitive items by serial number. Required weekly.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                    
                    <Paper 
                      elevation={inventoryType === 'monthly' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryType === 'monthly' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryType === 'monthly' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="monthly" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Monthly 100% Inventory</Typography>
                            <Typography variant="body2" color="text.secondary">Complete accountability inventory of all items. Required monthly per AR 710-2.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                    
                    <Paper 
                      elevation={inventoryType === 'change' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryType === 'change' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryType === 'change' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="change" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Change of Command/Hand Receipt</Typography>
                            <Typography variant="body2" color="text.secondary">Required upon change of primary or sub-hand receipt holder.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                    
                    <Paper 
                      elevation={inventoryType === 'special' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryType === 'special' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryType === 'special' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="special" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Special/Emergency Inventory</Typography>
                            <Typography variant="body2" color="text.secondary">For emergency situations or command directed inventory.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Choose Inventory Method
                </Typography>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <RadioGroup
                    aria-label="inventory-method"
                    name="inventory-method"
                    value={inventoryMethod}
                    onChange={handleInventoryMethodChange}
                  >
                    <Paper 
                      elevation={inventoryMethod === 'qrCode' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryMethod === 'qrCode' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryMethod === 'qrCode' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="qrCode" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">QR Code Scan (recommended)</Typography>
                            <Typography variant="body2" color="text.secondary">Scan QR codes attached to each sensitive item for fastest verification.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                    
                    <Paper 
                      elevation={inventoryMethod === 'manual' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryMethod === 'manual' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryMethod === 'manual' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="manual" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Manual Serial Number Entry</Typography>
                            <Typography variant="body2" color="text.secondary">Manually enter or verify serial numbers for each item.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                    
                    <Paper 
                      elevation={inventoryMethod === 'assisted' ? 3 : 1} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: inventoryMethod === 'assisted' ? 2 : 0,
                        borderColor: 'primary.main',
                        bgcolor: inventoryMethod === 'assisted' ? 'action.hover' : 'background.paper'
                      }}
                    >
                      <FormControlLabel 
                        value="assisted" 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Assisted Mode (multiple verifiers)</Typography>
                            <Typography variant="body2" color="text.secondary">Collaborative inventory with multiple personnel scanning simultaneously.</Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            
            {activeStep === 2 && (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <DataGrid
                  rows={items}
                  columns={[
                    { field: 'serialNumber', headerName: 'Serial Number', flex: 1 },
                    { field: 'nomenclature', headerName: 'Nomenclature', flex: 1 },
                    { field: 'category', headerName: 'Category', flex: 1 },
                    { field: 'location', headerName: 'Location', flex: 1 },
                    { field: 'handReceipt', headerName: 'Hand Receipt', flex: 1 },
                    {
                      field: 'verified',
                      headerName: 'Status',
                      flex: 1,
                      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
                        <Chip
                          label={verifiedItems.includes(params.row.id) ? 'Verified' : 'Pending'}
                          color={verifiedItems.includes(params.row.id) ? 'success' : 'warning'}
                          size="small"
                        />
                      ),
                    },
                    {
                      field: 'actions',
                      headerName: 'Actions',
                      flex: 1,
                      sortable: false,
                      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleItemVerification(params.row)}
                            disabled={verifiedItems.includes(params.row.id)}
                          >
                            <QrCodeScannerIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleReportDiscrepancy(params.row)}
                          >
                            <ReportIcon />
                          </IconButton>
                        </Stack>
                      ),
                    },
                  ]}
                  autoHeight
                  sx={{ 
                    flex: 1,
                    minHeight: 400,
                    '& .MuiDataGrid-root': {
                      border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid #f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#fafafa',
                      borderBottom: '2px solid #f0f0f0',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                      backgroundColor: '#fff',
                    },
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  pageSizeOptions={[10, 25, 50, 100]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={false}
                  getRowId={(row: SensitiveItem) => row.id}
                />
              </Box>
            )}
            
            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Review & Submit Inventory
                </Typography>
                
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Inventory Summary
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Inventory Type
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {inventoryType === 'daily' && 'Daily Check'}
                          {inventoryType === 'weekly' && 'Weekly Verification'}
                          {inventoryType === 'monthly' && 'Monthly 100%'}
                          {inventoryType === 'change' && 'Change of Hand Receipt'}
                          {inventoryType === 'special' && 'Special Inventory'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Verification Method
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {inventoryMethod === 'qrCode' && 'QR Code Scan'}
                          {inventoryMethod === 'manual' && 'Manual Entry'}
                          {inventoryMethod === 'assisted' && 'Assisted Mode'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Total Items
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {items.length}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Items Verified
                        </Typography>
                        <Typography 
                          variant="body1" 
                          fontWeight="medium"
                          color={verifiedItems.length === items.length ? 'success.main' : 'warning.main'} 
                        >
                          {verifiedItems.length}/{items.length}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  {verifiedItems.length < items.length && (
                    <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 1, mb: 3 }}>
                      <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                        Warning: Unverified Items
                      </Typography>
                      <Typography variant="body2" color="warning.dark">
                        {items.length - verifiedItems.length} items have not been verified. 
                        Unverified items will be marked for follow-up.
                      </Typography>
                    </Box>
                  )}
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Inventory Notes
                  </Typography>
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Enter any notes or comments about this inventory..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Paper>
                
                <Box sx={{ 
                  bgcolor: 'success.light', 
                  p: 2, 
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'success.main'
                }}>
                  <Typography variant="subtitle2" color="success.dark" gutterBottom>
                    Digital Signature Required
                  </Typography>
                  <Typography variant="body2" color="success.dark">
                    By completing this inventory, you are digitally certifying that you have 
                    physically verified all reported items. This action is subject to AR 25-2 and UCMJ.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* Scanner dialog */}
          {scannerActive && currentItem && (
            <Dialog open={scannerActive} onClose={handleVerificationCancel} maxWidth="sm" fullWidth>
              <DialogTitle>
                Verify Item
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" gutterBottom>
                  {currentItem.nomenclature}
                </Typography>
                <Typography variant="body2">
                  Serial Number: <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{currentItem.serialNumber}</Box>
                </Typography>
                
                <Box sx={{ 
                  height: 250, 
                  bgcolor: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                  borderRadius: 1
                }}>
                  <VideocamIcon sx={{ fontSize: 48, color: 'white', opacity: 0.7 }} />
                </Box>
                
                <Typography variant="caption" align="center" sx={{ display: 'block', mt: 1 }}>
                  Position QR code or serial number in the camera view
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleVerificationCancel} color="inherit">
                  Cancel
                </Button>
                <Button onClick={handleVerificationSuccess} variant="contained" startIcon={<CheckIcon />}>
                  Mark as Verified
                </Button>
              </DialogActions>
            </Dialog>
          )}
          
          {/* Discrepancy dialog */}
          <Dialog 
            open={discrepancyDialogOpen} 
            onClose={() => setDiscrepancyDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle color="warning.main">
              Report Discrepancy
            </DialogTitle>
            <DialogContent>
              {discrepancyItem && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    {discrepancyItem.nomenclature}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Serial Number: {discrepancyItem.serialNumber}
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Describe the issue"
                    multiline
                    rows={4}
                    value={discrepancyNote}
                    onChange={(e) => setDiscrepancyNote(e.target.value)}
                    placeholder="Describe the discrepancy in detail..."
                    required
                    error={discrepancyNote.trim() === ''}
                    helperText={discrepancyNote.trim() === '' ? "Description is required" : ""}
                    sx={{ mt: 2 }}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDiscrepancyDialogOpen(false)} color="inherit">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitDiscrepancy} 
                variant="contained" 
                color="warning"
                disabled={!discrepancyNote || discrepancyNote.trim() === ''}
              >
                Report Issue
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Warning dialog for unverified items */}
          <Dialog
            open={showLeaveWarning}
            onClose={handleCancelLeave}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon color="warning" />
              Unverified Items
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You still have {items.length - verifiedItems.length} unverified items. 
                Are you sure you want to proceed? Unverified items will be marked for follow-up.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelLeave} color="inherit">
                Stay and Complete
              </Button>
              <Button onClick={handleConfirmLeave} variant="contained" color="warning">
                Proceed Anyway
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Close confirmation dialog */}
          <Dialog
            open={showCloseConfirmation}
            onClose={cancelClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle color="error.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon color="error" />
              Discard Inventory?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You are about to close the inventory without saving. All verification progress will be lost.
                Would you like to save your progress by pausing the inventory instead?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelClose} color="inherit">
                Cancel
              </Button>
              <Button onClick={handlePauseWithSave} variant="contained" color="primary">
                Pause & Save
              </Button>
              <Button onClick={confirmClose} variant="outlined" color="error">
                Discard & Close
              </Button>
            </DialogActions>
          </Dialog>
        </DialogContent>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            startIcon={<PauseIcon />}
            onClick={handlePauseWithSave}
            sx={{ mr: 1 }}
          >
            Pause Inventory
          </Button>
          
          <Box>
            {activeStep > 0 && (
              <Button
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            )}
            
            {activeStep < steps.length - 1 ? (
              <Button 
                variant="contained" 
                onClick={handleNext} 
                endIcon={<ArrowForwardIcon />}
                disabled={(activeStep === 0 && !inventoryType) || 
                          (activeStep === 1 && !inventoryMethod) ||
                          items.length === 0}
              >
                Next
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleCompleteInventory}
                startIcon={<CheckCircleIcon />}
                disabled={items.length === 0}
              >
                Complete Inventory
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default InventoryExecutionPanel; 