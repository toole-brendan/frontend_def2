import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  IconButton,
  useTheme,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Print as PrintIcon,
  History as HistoryIcon,
  LocationOn as LocationIcon,
  Description as DocumentIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { usePropertyBook } from '../context/PropertyBookContext';
import { StatusChip } from '../../../components/common';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`item-details-tabpanel-${index}`}
      aria-labelledby={`item-details-tab-${index}`}
      {...other}
      style={{ paddingTop: 16 }}
    >
      {value === index && children}
    </div>
  );
};

export const ItemDetailsModal: React.FC = () => {
  const theme = useTheme();
  const {
    itemDetailsModalOpen,
    closeItemDetails,
    itemDetailsId,
    getItemById,
    recentTransactions,
  } = usePropertyBook();
  
  const [tabValue, setTabValue] = React.useState(0);
  
  // Get the selected item
  const selectedItem = itemDetailsId ? getItemById(itemDetailsId) : null;
  
  if (!selectedItem) {
    return null;
  }
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Sample history data - in a real app, this would be specific to the item
  const itemHistory = [
    {
      date: '15FEB2025',
      action: 'Inventory',
      user: 'CPT Rodriguez',
      notes: 'Quarterly inventory - item present'
    },
    {
      date: '15NOV2024',
      action: 'Maintenance',
      user: 'SFC Johnson',
      notes: 'Routine maintenance performed'
    },
    {
      date: '15AUG2024',
      action: 'Transfer',
      user: 'LT Smith',
      notes: 'Transferred from Alpha Company'
    },
  ];
  
  // Sample documents - in a real app, this would be specific to the item
  const relatedDocuments = [
    { id: 'doc1', name: 'Hand Receipt', date: '01JAN2025' },
    { id: 'doc2', name: 'Maintenance Record', date: '15NOV2024' },
    { id: 'doc3', name: 'Transfer Documentation', date: '15AUG2024' },
  ];

  return (
    <Dialog 
      open={itemDetailsModalOpen} 
      onClose={closeItemDetails}
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
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 1
      }}>
        <Box>
          <Typography variant="h6" component="div">
            Item Details
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {selectedItem.nomenclature}
          </Typography>
        </Box>
        <IconButton onClick={closeItemDetails} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {/* Main item information */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Nomenclature
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {selectedItem.nomenclature}
                {selectedItem.isSensitive && (
                  <Chip
                    label="SENSITIVE"
                    size="small"
                    color="error"
                    sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                  />
                )}
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  NSN
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {selectedItem.nsn}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  LIN
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {selectedItem.lin}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Serial Number
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {selectedItem.serialNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Value
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {formatCurrency(selectedItem.value)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status
              </Typography>
              <StatusChip label={selectedItem.status} status={selectedItem.status.toLowerCase()} />
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Location
                </Typography>
                <Typography variant="body1">
                  {selectedItem.location}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Hand Receipt Holder
                </Typography>
                <Typography variant="body1">
                  {selectedItem.handReceiptHolder}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category
                </Typography>
                <Typography variant="body1">
                  {selectedItem.category}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Subcategory
                </Typography>
                <Typography variant="body1">
                  {selectedItem.subCategory}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Quantity Authorized
                </Typography>
                <Typography variant="body1">
                  {selectedItem.qtyAuth}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Quantity On Hand
                </Typography>
                <Typography variant="body1">
                  {selectedItem.qtyOnHand}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Tabs for additional information */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="item details tabs">
            <Tab 
              label="History" 
              id="item-details-tab-0"
              aria-controls="item-details-tabpanel-0"
              icon={<HistoryIcon fontSize="small" />}
              iconPosition="start"
            />
            <Tab 
              label="Location" 
              id="item-details-tab-1"
              aria-controls="item-details-tabpanel-1"
              icon={<LocationIcon fontSize="small" />}
              iconPosition="start"
            />
            <Tab 
              label="Documents" 
              id="item-details-tab-2"
              aria-controls="item-details-tabpanel-2"
              icon={<DocumentIcon fontSize="small" />}
              iconPosition="start"
            />
          </Tabs>
        </Box>
        
        {/* History Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>{entry.user}</TableCell>
                    <TableCell>{entry.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Location Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body1" gutterBottom>
              Current Location: <strong>{selectedItem.location}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This item is currently located in {selectedItem.location} under the responsibility of {selectedItem.handReceiptHolder}.
            </Typography>
            
            <Typography variant="body2" gutterBottom>
              Last Verification: <strong>{selectedItem.lastVerified}</strong>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <VerifiedIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 1 }} />
              <Typography variant="body2" sx={{ color: theme.palette.success.main }}>
                Item verified present during last inventory
              </Typography>
            </Box>
          </Box>
        </TabPanel>
        
        {/* Documents Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relatedDocuments.map(doc => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => console.log(`View document ${doc.id}`)}>
                        <PrintIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
        <Box>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="primary"
            onClick={() => console.log('Edit item details')}
            sx={{ mr: 1 }}
          >
            Edit Details
          </Button>
          <Button
            startIcon={<PrintIcon />}
            variant="outlined"
            onClick={() => console.log('Print item details')}
          >
            Print Details
          </Button>
        </Box>
        <Button onClick={closeItemDetails}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDetailsModal;
