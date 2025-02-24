import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { InventoryItem } from '../types';

interface AddItemFormData {
  name: string;
  nsn: string;
  serialNumber: string;
  status: 'available' | 'in_use' | 'under_maintenance';
  location: string;
  assignedTo: string;
  category: string;
  unit: string;
  acquisitionDate: Date | null;
  notes: string;
}

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddItemFormData) => void;
}

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'in_use', label: 'In Use' },
  { value: 'under_maintenance', label: 'Under Maintenance' },
];

const CATEGORY_OPTIONS = [
  { value: 'weapons', label: 'Weapons' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'comms', label: 'Communications' },
  { value: 'optics', label: 'Optics' },
  { value: 'medical', label: 'Medical' },
];

const LOCATION_OPTIONS = [
  { value: 'arms_room', label: 'Arms Room' },
  { value: 'motor_pool', label: 'Motor Pool' },
  { value: 'supply_room', label: 'Supply Room' },
  { value: 'comms_room', label: 'Comms Room' },
  { value: 'medical_bay', label: 'Medical Bay' },
];

export const AddItemModal: React.FC<AddItemModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AddItemFormData>({
    name: '',
    nsn: '',
    serialNumber: '',
    status: 'available',
    location: '',
    assignedTo: '',
    category: '',
    unit: '',
    acquisitionDate: null,
    notes: '',
  });

  const handleChange = (field: keyof AddItemFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: '',
      nsn: '',
      serialNumber: '',
      status: 'available',
      location: '',
      assignedTo: '',
      category: '',
      unit: '',
      acquisitionDate: null,
      notes: '',
    });
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.nsn &&
      formData.serialNumber &&
      formData.category &&
      formData.location &&
      formData.unit
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Add New Item</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="NSN"
              value={formData.nsn}
              onChange={(e) => handleChange('nsn', e.target.value)}
              required
              helperText="National Stock Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Serial Number"
              value={formData.serialNumber}
              onChange={(e) => handleChange('serialNumber', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Location</InputLabel>
              <Select
                value={formData.location}
                label="Location"
                onChange={(e) => handleChange('location', e.target.value)}
              >
                {LOCATION_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Unit"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              required
              helperText="e.g., 1st Platoon, 2nd Squad"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Assigned To"
              value={formData.assignedTo}
              onChange={(e) => handleChange('assignedTo', e.target.value)}
              helperText="Leave blank if unassigned"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Acquisition Date"
                value={formData.acquisitionDate}
                onChange={(date) => handleChange('acquisitionDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              multiline
              rows={4}
              helperText="Additional information about the item"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid()}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal; 