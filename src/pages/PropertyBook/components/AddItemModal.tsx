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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  FormHelperText,
  // @ts-ignore - Unused variable intentionally kept
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { usePropertyBook } from '../context/PropertyBookContext';
import { PropertyItem } from '../types';

export const AddItemModal: React.FC = () => {
  
  const { addItemModalOpen, closeAddItemModal, requestAddition, categories } = usePropertyBook();
  
  // Form state
  const [formValues, setFormValues] = useState<Partial<PropertyItem>>({
    nomenclature: '',
    nsn: '',
    lin: '',
    serialNumber: '',
    qtyAuth: 1,
    qtyOnHand: 1,
    location: 'Supply Room',
    handReceiptHolder: 'SFC TAYLOR',
    status: 'Serviceable',
    lastVerified: new Date().toISOString().slice(0, 10),
    category: 'Weapons',
    subCategory: 'Small Arms',
    value: 0,
    isSensitive: false,
  });
  
  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Get unique locations and hand receipt holders from the context
  const { propertyItems } = usePropertyBook();
  
  const locations = React.useMemo(() => {
    const uniqueLocations = new Set<string>();
    propertyItems.forEach(item => uniqueLocations.add(item.location));
    return Array.from(uniqueLocations).sort();
  }, [propertyItems]);
  
  const handReceiptHolders = React.useMemo(() => {
    const uniqueHolders = new Set<string>();
    propertyItems.forEach(item => uniqueHolders.add(item.handReceiptHolder));
    return Array.from(uniqueHolders).sort();
  }, [propertyItems]);
  
  // Statuses for form
  const statuses = ['Serviceable', 'Unserviceable', 'Maintenance', 'Shortage', 'Missing'];
  
  // Handle form field changes
  const handleTextChange = (field: keyof typeof formValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value: string | number | boolean = event.target.value;
    
    // Convert numeric fields to numbers
    if (['qtyAuth', 'qtyOnHand', 'value'].includes(field)) {
      value = Number(value) || 0;
    }
    
    setFormValues({
      ...formValues,
      [field]: value,
    });
    
    // Clear error if field has an error
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };
  
  const handleSelectChange = (field: keyof typeof formValues) => (
    event: SelectChangeEvent
  ) => {
    setFormValues({
      ...formValues,
      [field]: event.target.value,
    });
    
    // Clear error if field has an error
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };
  
  const handleCheckboxChange = (field: keyof typeof formValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({
      ...formValues,
      [field]: event.target.checked,
    });
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formValues.nomenclature) {
      newErrors.nomenclature = 'Nomenclature is required';
    }
    
    if (!formValues.nsn) {
      newErrors.nsn = 'NSN is required';
    }
    
    if (!formValues.serialNumber) {
      newErrors.serialNumber = 'Serial number is required';
    }
    
    if (!formValues.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formValues.handReceiptHolder) {
      newErrors.handReceiptHolder = 'Hand receipt holder is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Generate a random ID
    const newItem: Partial<PropertyItem> = {
      ...formValues,
      id: `ITEM-${Date.now()}`,
    };
    
    // Process addition
    requestAddition(newItem);
    
    // Reset form
    handleClose();
  };
  
  // Reset form when dialog closes
  const handleClose = () => {
    setFormValues({
      nomenclature: '',
      nsn: '',
      lin: '',
      serialNumber: '',
      qtyAuth: 1,
      qtyOnHand: 1,
      location: 'Supply Room',
      handReceiptHolder: 'SFC TAYLOR',
      status: 'Serviceable',
      lastVerified: new Date().toISOString().slice(0, 10),
      category: 'Weapons',
      subCategory: 'Small Arms',
      value: 0,
      isSensitive: false,
    });
    setErrors({});
    closeAddItemModal();
  };

  return (
    <Dialog 
      open={addItemModalOpen} 
      onClose={handleClose}
      maxWidth="md"
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
            Add New Item
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Add a new item to the property book
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Item Information
            </Typography>
          </Grid>
          
          {/* Row 1 */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nomenclature"
              fullWidth
              value={formValues.nomenclature}
              onChange={handleTextChange('nomenclature')}
              error={!!errors.nomenclature}
              helperText={errors.nomenclature}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.isSensitive}
                  onChange={handleCheckboxChange('isSensitive')}
                  color="error"
                />
              }
              label="Sensitive Item"
            />
          </Grid>
          
          {/* Row 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="NSN"
              fullWidth
              value={formValues.nsn}
              onChange={handleTextChange('nsn')}
              error={!!errors.nsn}
              helperText={errors.nsn}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="LIN"
              fullWidth
              value={formValues.lin}
              onChange={handleTextChange('lin')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Serial Number"
              fullWidth
              value={formValues.serialNumber}
              onChange={handleTextChange('serialNumber')}
              error={!!errors.serialNumber}
              helperText={errors.serialNumber}
              required
            />
          </Grid>
          
          {/* Row 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={formValues.category || ''}
                label="Category"
                onChange={handleSelectChange('category')}
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Subcategory"
              fullWidth
              value={formValues.subCategory}
              onChange={handleTextChange('subCategory')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Value"
              type="number"
              fullWidth
              value={formValues.value}
              onChange={handleTextChange('value')}
              InputProps={{
                startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
              }}
            />
          </Grid>
          
          {/* Row 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Quantity Authorized"
              type="number"
              fullWidth
              value={formValues.qtyAuth}
              onChange={handleTextChange('qtyAuth')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Quantity On Hand"
              type="number"
              fullWidth
              value={formValues.qtyOnHand}
              onChange={handleTextChange('qtyOnHand')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={formValues.status || ''}
                label="Status"
                onChange={handleSelectChange('status')}
              >
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Last Verified"
              type="date"
              fullWidth
              value={formValues.lastVerified}
              onChange={handleTextChange('lastVerified')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          {/* Row 5 */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.location} required>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                value={formValues.location || ''}
                label="Location"
                onChange={handleSelectChange('location')}
              >
                {locations.map(location => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </Select>
              {errors.location && <FormHelperText>{errors.location}</FormHelperText>}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.handReceiptHolder} required>
              <InputLabel id="holder-label">Hand Receipt Holder</InputLabel>
              <Select
                labelId="holder-label"
                value={formValues.handReceiptHolder || ''}
                label="Hand Receipt Holder"
                onChange={handleSelectChange('handReceiptHolder')}
              >
                {handReceiptHolders.map(holder => (
                  <MenuItem key={holder} value={holder}>{holder}</MenuItem>
                ))}
              </Select>
              {errors.handReceiptHolder && <FormHelperText>{errors.handReceiptHolder}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
