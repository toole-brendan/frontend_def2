import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  MenuItem, 
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import QrCodePreview from './QrCodePreview';

const GenerateQrCodeTab: React.FC = () => {
  const theme = useTheme();
  
  const paperSx = {
    p: 3,
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
  };

  return (
    <Grid container spacing={3}>
      {/* Left Column - Form */}
      <Grid item xs={12} md={8}>
        <Paper sx={paperSx}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Create Digital Twin & QR Code
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            {/* Basic Information Section */}
            <Typography variant="subtitle2" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  id="equipmentCategory"
                  label="Equipment Category"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="communications">Communications</MenuItem>
                  <MenuItem value="weapons">Weapons</MenuItem>
                  <MenuItem value="vehicles">Vehicles</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  id="subCategory"
                  label="Sub-Category"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="radios">Radios</MenuItem>
                  <MenuItem value="computers">Computers</MenuItem>
                  <MenuItem value="optics">Optics</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Equipment Details Section */}
            <Typography variant="subtitle2" gutterBottom>
              Equipment Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="nsn"
                  label="NSN/LIN"
                  variant="outlined"
                  size="small"
                  placeholder="e.g. 1234-01-456-7890"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="serialNumber"
                  label="Serial Number"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nomenclature"
                  label="Nomenclature"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Technical Specifications */}
            <Typography variant="subtitle2" gutterBottom>
              Technical Specifications
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="model"
                  label="Model"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="manufacturer"
                  label="Manufacturer"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="acquisitionDate"
                  label="Acquisition Date"
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Assignment & Location */}
            <Typography variant="subtitle2" gutterBottom>
              Assignment & Location
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="assignedTo"
                  label="Assigned To"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="unassigned">Unassigned</MenuItem>
                  <MenuItem value="user1">SFC Johnson</MenuItem>
                  <MenuItem value="user2">1LT Smith</MenuItem>
                  <MenuItem value="user3">SGT Williams</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="location"
                  label="Physical Location"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="armory">Armory</MenuItem>
                  <MenuItem value="motorpool">Motor Pool</MenuItem>
                  <MenuItem value="supplyroom">Supply Room</MenuItem>
                  <MenuItem value="commo">COMMO Shop</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* QR Code Configuration */}
            <Typography variant="subtitle2" gutterBottom>
              QR Code Configuration
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="qrSize"
                  label="QR Code Size"
                  variant="outlined"
                  size="small"
                  defaultValue="medium"
                >
                  <MenuItem value="small">Small (1" x 1")</MenuItem>
                  <MenuItem value="medium">Medium (2" x 2")</MenuItem>
                  <MenuItem value="large">Large (3" x 3")</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="labelType"
                  label="Label Type"
                  variant="outlined"
                  size="small"
                  defaultValue="standard"
                >
                  <MenuItem value="standard">Standard Paper</MenuItem>
                  <MenuItem value="weatherproof">Weatherproof</MenuItem>
                  <MenuItem value="metallic">Metallic/Durable</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked />
                  }
                  label="Print After Generation"
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
              <Button variant="outlined" color="inherit">
                Clear Form
              </Button>
              <Button variant="outlined" color="primary">
                Save as Draft
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' }
                }}
              >
                Generate QR Code
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Right Column - Preview */}
      <Grid item xs={12} md={4}>
        <Box sx={{ position: 'sticky', top: 90 }}>
          <QrCodePreview />
        </Box>
      </Grid>
    </Grid>
  );
};

export default GenerateQrCodeTab; 