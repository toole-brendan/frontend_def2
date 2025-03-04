import React from 'react';
import { Grid, Paper, Typography, Box, alpha, useTheme, Button, Alert, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip, TextField, MenuItem } from '@mui/material';
import { 
  Report as ReportIcon, 
  Refresh as RefreshIcon,
  ErrorOutline as ErrorOutlineIcon,
  Help as HelpIcon
} from '@mui/icons-material';

// Mock data for damaged QR codes
const mockDamagedQrCodes = [
  {
    id: 'QR-1024',
    equipment: 'Radio PRC-117G',
    serialNumber: 'SN-2500',
    reportedOn: '24 FEB 2025',
    reportedBy: 'SGT Williams',
    status: 'Awaiting Replacement',
    damageDescription: 'QR code torn during field exercise'
  },
  {
    id: 'QR-1032',
    equipment: 'M4 Carbine',
    serialNumber: 'SN-3422',
    reportedOn: '20 FEB 2025',
    reportedBy: '1LT Smith',
    status: 'Replaced',
    damageDescription: 'Water damage, completely illegible'
  },
  {
    id: 'QR-1045',
    equipment: 'ACOG Scope',
    serialNumber: 'SN-4381',
    reportedOn: '22 FEB 2025',
    reportedBy: 'SFC Johnson',
    status: 'Awaiting Replacement',
    damageDescription: 'Label partially torn, difficult to scan'
  },
  {
    id: 'QR-1053',
    equipment: 'HMMWV',
    serialNumber: 'SN-1092',
    reportedOn: '18 FEB 2025',
    reportedBy: 'SSG Miller',
    status: 'Replaced',
    damageDescription: 'Exposed to extreme temperature, label damaged'
  }
];

const DamagedQrCodesTab: React.FC = () => {
  const theme = useTheme();
  
  const paperSx = {
    p: 3,
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`,
    mb: 3
  };

  return (
    <Grid container spacing={3}>
      {/* Damaged QR Codes Table */}
      <Grid item xs={12}>
        <Paper sx={paperSx}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Damaged QR Codes
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<ReportIcon />}
              sx={{ 
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' }
              }}
            >
              Report Damaged QR
            </Button>
          </Box>
          
          <Alert 
            severity="warning" 
            icon={<ErrorOutlineIcon />}
            sx={{ mb: 3 }}
          >
            Damaged QR codes should be reported immediately to maintain equipment accountability. New QR codes will be generated for approved replacement requests.
          </Alert>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>QR ID</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Reported On</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDamagedQrCodes.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell>{row.equipment}</TableCell>
                    <TableCell>{row.serialNumber}</TableCell>
                    <TableCell>{row.reportedOn}</TableCell>
                    <TableCell>{row.reportedBy}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        color={row.status === 'Awaiting Replacement' ? 'warning' : 'success'}
                        variant={row.status === 'Awaiting Replacement' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.status === 'Awaiting Replacement' && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          startIcon={<RefreshIcon fontSize="small" />}
                        >
                          Generate Replacement
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      
      {/* Report Damage Form */}
      <Grid item xs={12}>
        <Paper sx={paperSx}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Report Damaged QR Code
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Left Column - Form */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="QR Code ID"
                    helperText="If QR code is unreadable, enter equipment information below"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Equipment Type"
                    size="small"
                    defaultValue=""
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="communication">Communication</MenuItem>
                    <MenuItem value="weapon">Weapon</MenuItem>
                    <MenuItem value="optic">Optic</MenuItem>
                    <MenuItem value="vehicle">Vehicle</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nomenclature"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Serial Number"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Damage Description"
                    multiline
                    rows={3}
                    size="small"
                    placeholder="Describe the damage and how it occurred"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Replacement Instructions"
                    multiline
                    rows={2}
                    size="small"
                    placeholder="Any special instructions for replacement"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="outlined" color="inherit">
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<ReportIcon />}
                      sx={{ 
                        boxShadow: 'none',
                        '&:hover': { boxShadow: 'none' }
                      }}
                    >
                      Submit Damage Report
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Right Column - Information */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  backgroundColor: alpha(theme.palette.background.default, 0.6),
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 3
                }}
              >
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Replacement Process
                </Typography>
                <Box component="ol" sx={{ pl: 2, mb: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Submit damage report with accurate information
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Supply officer reviews and approves replacement
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    New QR code is generated and printed
                  </Typography>
                  <Typography component="li" variant="body2">
                    Old QR code is deactivated in the system
                  </Typography>
                </Box>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  backgroundColor: alpha(theme.palette.info.light, 0.1),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HelpIcon color="info" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Damage Prevention Tips
                  </Typography>
                </Box>
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Use weatherproof QR codes for outdoor equipment
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Apply protective covers in harsh environments
                  </Typography>
                  <Typography component="li" variant="body2">
                    Place QR codes in areas with minimal abrasion
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DamagedQrCodesTab; 