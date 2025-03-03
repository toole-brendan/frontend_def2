import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Tabs,
  Tab,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Pagination,
  alpha,
  useTheme,
  InputBase,
  Avatar
} from '@mui/material';
import { CardHeader } from '../../components/common';
import {
  Print as PrintIcon,
  FileDownload as ExportIcon,
  Description as DocumentIcon,
  Search as SearchIcon,
  VerifiedUser as VerifiedIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  ExpandMore as ExpandMoreIcon,
  Tune as TuneIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

// Status chip component
const StatusChip = ({ status, label }: { status: string, label: string }) => {
  const theme = useTheme();
  let color;
  switch (status.toLowerCase()) {
    case 'serviceable':
      color = theme.palette.success.main;
      break;
    case 'limited':
      color = theme.palette.warning.main;
      break;
    case 'shortage':
      color = theme.palette.error.main;
      break;
    default:
      color = theme.palette.info.main;
  }
  
  return (
    <Chip
      label={label}
      size="small"
      sx={{ 
        backgroundColor: alpha(color, 0.2),
        color: color,
        fontWeight: 500,
        fontSize: '0.75rem',
        borderRadius: 0,
        height: 20
      }}
    />
  );
};

// Verification chip component
const VerificationChip = ({ verified, ...props }: { verified: boolean, [x: string]: any }) => {
  const theme = useTheme();
  return (
    <Chip
      size="small"
      sx={{
        backgroundColor: verified ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.grey[500], 0.1),
        color: verified ? theme.palette.success.main : theme.palette.text.secondary,
        '& .MuiChip-icon': {
          color: verified ? theme.palette.success.main : theme.palette.text.secondary,
        },
        borderRadius: 0,
        height: 20
      }}
      {...props}
    />
  );
};

// Mock data
const mockPropertyItems = [
  {
    id: '1',
    nsn: '1005-01-567-7905',
    lin: 'Rifle, 5.56mm',
    nomenclature: 'Rifle, 5.56mm',
    serialNumber: '12496352',
    location: 'Arms Room',
    value: 1480,
    status: 'Serviceable',
    qtyAuth: 1,
    qtyOnHand: 1,
  },
  {
    id: '2',
    nsn: '1005-01-663-1986',
    lin: 'Machine Gun, 5.56mm',
    nomenclature: 'Machine Gun, 5.56mm',
    serialNumber: 'LW12937',
    location: 'Arms Room',
    value: 4850,
    status: 'Limited',
    qtyAuth: 1,
    qtyOnHand: 1,
  },
  {
    id: '3',
    nsn: '2320-01-371-9577',
    lin: 'HMMWV',
    nomenclature: 'HMMWV',
    serialNumber: '987654',
    location: 'Motor Pool',
    value: 120000,
    status: 'Serviceable',
    qtyAuth: 1,
    qtyOnHand: 1,
  }
];

const categories = [
  { id: 'weapons', name: 'Weapons Systems', count: 143 },
  { id: 'small-arms', name: 'Small Arms', count: 132, parent: 'weapons' },
  { id: 'crew-served', name: 'Crew-Served', count: 11, parent: 'weapons' },
  { id: 'vehicles', name: 'Vehicles', count: 72 },
  { id: 'communications', name: 'Communications', count: 95 },
  { id: 'optics', name: 'Optics/Electronics', count: 63 },
  { id: 'field-equipment', name: 'Field Equipment', count: 210 },
  { id: 'office', name: 'Office/Garrison', count: 138 },
];

export const PropertyBook: React.FC = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('weapons');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [detailTab, setDetailTab] = useState<number>(0);
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(mockPropertyItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setDetailTab(newValue);
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      color: 'text.primary',
      minHeight: '100vh',
      p: 3
    }}>
      {/* Header */}
      <Box 
        component="header" 
        sx={{ 
          py: 1.5, 
          px: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.default',
          mb: 3
        }}
      >
        <Typography variant="h5" fontWeight="600" color="primary">
          Property Book
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            startIcon={<PrintIcon />}
            sx={{ borderRadius: 0 }}
          >
            Print Property Book
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ExportIcon />}
            sx={{ borderRadius: 0 }}
          >
            Export to Excel
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<DocumentIcon />}
            sx={{ borderRadius: 0 }}
          >
            Generate DA Form
          </Button>
        </Box>
      </Box>

      {/* Welcome Header */}
      <Box sx={{ 
        mb: 3, 
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '1px solid',
        borderColor: 'divider',
        mx: 3
      }}>
        <Box>
          <Typography variant="h4" fontWeight="500">
            B Company, 2-87 Infantry
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Total Line Items: 721
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12, alignSelf: 'center' }} />
            <Typography variant="body2" color="text.secondary">
              Total Value: $4,237,580
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button 
            variant="outlined"
            sx={{ borderRadius: 0 }}
          >
            Request Addition/Turn-in
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            sx={{ borderRadius: 0 }}
          >
            Certify Property Book
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 0 }}
          >
            Conduct Inventory
          </Button>
        </Box>
      </Box>

      {/* Summary Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <CardHeader 
          title="Property Book Summary"
          subtitle="Overview of property book status and requirements"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Primary Hand Receipt Holder:</Typography>
                <Typography variant="h6">CPT Michael Rodriguez</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Last Full Inventory:</Typography>
                <Typography variant="h6">15JAN2025</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Next Required Inventory:</Typography>
                <Typography variant="h6">15APR2025</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Days Remaining:</Typography>
                <Typography variant="h6">60</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ 
          mt: 1.5, 
          pt: 1.5,
          borderTop: '1px dashed rgba(140, 140, 160, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography variant="caption">
            <Box component="span" sx={{ color: theme.palette.success.main, fontWeight: 'medium' }}>100%</Box> of sensitive items accounted for
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last Verified: 23FEB2025
          </Typography>
        </Box>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Left Column - Categories */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2, borderRadius: 0 }}>
            <CardHeader 
              title="Property Categories"
              subtitle="Items organized by type"
              action={<IconButton><TuneIcon /></IconButton>}
            />
            <List dense>
              {categories.filter(cat => !cat.parent).map((category) => (
                <React.Fragment key={category.id}>
                  <ListItem 
                    selected={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    sx={{ 
                      borderRadius: 0,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                        },
                      }
                    }}
                  >
                    <ListItemText 
                      primary={`${category.name} (${category.count})`} 
                    />
                    <KeyboardArrowRightIcon fontSize="small" />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Middle Column - Property Table */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Button variant="contained" color="primary" size="small" sx={{ borderRadius: 0 }}>
              Transfer Selected
            </Button>
            <Button variant="outlined" size="small" sx={{ borderRadius: 0 }}>
              Print Hand Receipt
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 0, mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={handleSelectAll}
                      checked={selectedItems.length === mockPropertyItems.length && mockPropertyItems.length > 0}
                      indeterminate={selectedItems.length > 0 && selectedItems.length < mockPropertyItems.length}
                    />
                  </TableCell>
                  <TableCell>NSN/LIN</TableCell>
                  <TableCell>Nomenclature</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPropertyItems.map((item) => (
                  <TableRow 
                    key={item.id}
                    selected={selectedItems.includes(item.id)}
                    hover
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemSelect(item.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.nsn}</TableCell>
                    <TableCell>{item.nomenclature}</TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.serialNumber}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>${item.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusChip 
                        label={item.status} 
                        status={item.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing 1-3 of 721 items
            </Typography>
            <Pagination count={10} size="small" />
          </Box>
        </Grid>

        {/* Right Column - Stats and Status */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2, borderRadius: 0 }}>
            <CardHeader 
              title="Property Details"
              subtitle="Summary and statistics"
            />
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Equipment Authorized
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                12 items
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Shortage Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(theme.palette.error.main, 0.1), 
                      color: theme.palette.error.main,
                      width: 32,
                      height: 32,
                      borderRadius: 0
                    }}>
                      <ErrorIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h5" color="error" fontWeight="medium">
                      6
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Excess Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.1), 
                      color: theme.palette.success.main,
                      width: 32,
                      height: 32,
                      borderRadius: 0
                    }}>
                      <CheckCircleIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h5" color="success.main" fontWeight="medium">
                      0
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyBook;
