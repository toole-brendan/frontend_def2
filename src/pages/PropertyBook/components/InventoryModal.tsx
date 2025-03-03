import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  SaveAlt as SaveIcon,
} from '@mui/icons-material';
import { usePropertyBook } from '../context/PropertyBookContext';
import { PropertyItem } from '../types';

export const InventoryModal: React.FC = () => {
  const theme = useTheme();
  const {
    inventoryModalOpen,
    closeInventoryModal,
    selectedItems,
    propertyItems,
    conductInventory,
  } = usePropertyBook();
  
  // Get the selected items' details
  const selectedItemsDetails = propertyItems.filter(item => 
    selectedItems.includes(item.id)
  );
  
  // Inventory state
  const [inventoryResults, setInventoryResults] = useState<Record<string, { 
    found: boolean; 
    notes: string; 
    condition: 'Serviceable' | 'Unserviceable' | 'Maintenance' | 'Shortage' | 'Missing';
  }>>({});
  
  // Initialize inventory results
  React.useEffect(() => {
    if (inventoryModalOpen && selectedItemsDetails.length > 0) {
      const initialResults: Record<string, { 
        found: boolean; 
        notes: string; 
        condition: 'Serviceable' | 'Unserviceable' | 'Maintenance' | 'Shortage' | 'Missing';
      }> = {};
      
      selectedItemsDetails.forEach(item => {
        initialResults[item.id] = {
          found: true,
          notes: '',
          condition: item.status,
        };
      });
      
      setInventoryResults(initialResults);
    }
  }, [inventoryModalOpen, selectedItemsDetails]);
  
  // Handle checkbox changes
  const handleFoundChange = (itemId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryResults(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        found: event.target.checked,
        condition: event.target.checked ? prev[itemId].condition : 'Missing',
      },
    }));
  };
  
  // Handle notes changes
  const handleNotesChange = (itemId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryResults(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        notes: event.target.value,
      },
    }));
  };
  
  // Handle condition changes
  const handleConditionChange = (itemId: string) => (event: SelectChangeEvent) => {
    setInventoryResults(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        condition: event.target.value as any,
      },
    }));
  };
  
  // Get inventory summary
  const getInventorySummary = () => {
    const total = selectedItemsDetails.length;
    const found = Object.values(inventoryResults).filter(result => result.found).length;
    const missing = total - found;
    
    return { total, found, missing };
  };
  
  // Handle inventory completion
  const handleComplete = () => {
    conductInventory(selectedItems);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).replace(/\s/g, '');
  
  // Calculate summary
  const summary = getInventorySummary();

  return (
    <Dialog 
      open={inventoryModalOpen} 
      onClose={closeInventoryModal}
      maxWidth="lg"
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
            Conduct Inventory
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Verify the presence and condition of selected items
          </Typography>
        </Box>
        <IconButton onClick={closeInventoryModal} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Inventory form fields */}
          <Grid item xs={12} md={8} lg={9}>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">Found</TableCell>
                    <TableCell>Nomenclature</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedItemsDetails.map(item => (
                    <TableRow key={item.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={inventoryResults[item.id]?.found || false}
                          onChange={handleFoundChange(item.id)}
                          color={inventoryResults[item.id]?.found ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.nomenclature}
                        </Typography>
                        {item.isSensitive && (
                          <Chip
                            label="SENSITIVE"
                            size="small"
                            color="error"
                            sx={{ height: 16, fontSize: '0.625rem' }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {item.serialNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={inventoryResults[item.id]?.condition || ''}
                            onChange={handleConditionChange(item.id)}
                            disabled={!inventoryResults[item.id]?.found}
                            sx={{ height: 32 }}
                          >
                            <MenuItem value="Serviceable">Serviceable</MenuItem>
                            <MenuItem value="Unserviceable">Unserviceable</MenuItem>
                            <MenuItem value="Maintenance">Maintenance</MenuItem>
                            <MenuItem value="Missing">Missing</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          placeholder="Add notes..."
                          fullWidth
                          value={inventoryResults[item.id]?.notes || ''}
                          onChange={handleNotesChange(item.id)}
                          sx={{ '& .MuiOutlinedInput-input': { py: 0.5 } }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          {/* Inventory summary */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper 
              variant="outlined" 
              sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Inventory Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Inventory Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {currentDate}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Items
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {summary.total}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Items Found
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon 
                    fontSize="small" 
                    sx={{ color: theme.palette.success.main, mr: 1 }} 
                  />
                  <Typography variant="body1" fontWeight="medium" color="success.main">
                    {summary.found}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Items Missing
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ErrorIcon 
                    fontSize="small" 
                    sx={{ 
                      color: summary.missing > 0 ? theme.palette.error.main : theme.palette.text.secondary, 
                      mr: 1 
                    }} 
                  />
                  <Typography 
                    variant="body1" 
                    fontWeight="medium"
                    color={summary.missing > 0 ? 'error.main' : 'text.secondary'}
                  >
                    {summary.missing}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px dashed rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                {summary.missing === 0 ? (
                  <Box sx={{ 
                    color: theme.palette.success.main, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    typography: 'body2',
                  }}>
                    <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    All items accounted for
                  </Box>
                ) : (
                  <Typography 
                    variant="body2" 
                    color="error"
                  >
                    Missing items must be reported
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
        <Button onClick={closeInventoryModal}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleComplete}
        >
          Complete Inventory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InventoryModal;
