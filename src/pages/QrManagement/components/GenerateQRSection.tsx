import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Autocomplete,
} from '@mui/material';
import { Grid } from '../../../components/common/Grid';
import type { QRCodeDetails, GenerateQRFormData, ItemDetails } from '../types';

interface GenerateQRSectionProps {
  onQRGenerated: (qrDetails: QRCodeDetails) => void;
}

// Mock data - replace with actual data from your backend
const mockItems: ItemDetails[] = [
  {
    id: '1',
    name: 'M4A1 Carbine',
    serialNumber: 'M4A1-2023-001',
    category: 'Weapons',
    location: 'Armory A',
    status: 'AVAILABLE',
  },
  {
    id: '2',
    name: 'Night Vision Goggles',
    serialNumber: 'NVG-2023-002',
    category: 'Equipment',
    location: 'Storage B',
    status: 'ASSIGNED',
    assignedUser: 'John Smith',
  },
];

export const GenerateQRSection: React.FC<GenerateQRSectionProps> = ({ onQRGenerated }) => {
  const [formData, setFormData] = useState<GenerateQRFormData>({
    itemId: '',
    actionType: 'TRANSFER',
    actionDetails: {},
    metadata: {
      serialNumber: true,
      currentStatus: true,
      location: true,
      assignedUser: true,
      timestamp: true,
    },
  });

  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);

  const handleItemChange = (_event: any, newValue: ItemDetails | null) => {
    setSelectedItem(newValue);
    if (newValue) {
      setFormData((prev) => ({ ...prev, itemId: newValue.id }));
    }
  };

  const handleActionTypeChange = (event: any) => {
    setFormData((prev) => ({ ...prev, actionType: event.target.value }));
  };

  const handleMetadataChange = (field: keyof GenerateQRFormData['metadata']) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: !prev.metadata[field],
      },
    }));
  };

  const handleGenerate = () => {
    if (!selectedItem) return;

    // Mock QR generation - replace with actual API call
    const mockQRDetails: QRCodeDetails = {
      id: Math.random().toString(36).substr(2, 9),
      itemId: selectedItem.id,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      actionType: formData.actionType,
      metadata: formData.metadata,
      item: selectedItem,
    };

    onQRGenerated(mockQRDetails);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={mockItems}
            getOptionLabel={(option) => `${option.name} (${option.serialNumber})`}
            value={selectedItem}
            onChange={handleItemChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Item"
                required
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Action Type</InputLabel>
            <Select
              value={formData.actionType}
              onChange={handleActionTypeChange}
              label="Action Type"
            >
              <MenuItem value="TRANSFER">Transfer</MenuItem>
              <MenuItem value="INVENTORY">Inventory Check</MenuItem>
              <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Include in QR Code:
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.metadata.serialNumber}
                  onChange={() => handleMetadataChange('serialNumber')}
                />
              }
              label="Serial Number"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.metadata.currentStatus}
                  onChange={() => handleMetadataChange('currentStatus')}
                />
              }
              label="Current Status"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.metadata.location}
                  onChange={() => handleMetadataChange('location')}
                />
              }
              label="Location"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.metadata.assignedUser}
                  onChange={() => handleMetadataChange('assignedUser')}
                />
              }
              label="Assigned User"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.metadata.timestamp}
                  onChange={() => handleMetadataChange('timestamp')}
                />
              }
              label="Timestamp"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={!selectedItem}
              sx={{ minWidth: 200 }}
            >
              Generate QR Code
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}; 