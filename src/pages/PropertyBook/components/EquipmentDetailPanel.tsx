import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Divider,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Button,
} from '@mui/material';
import {
  Assignment as DocumentIcon,
  InfoOutlined as InfoIcon,
  LocalShipping as ShippingIcon,
  History as HistoryIcon,
  Build as BuildIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  PictureAsPdf as PdfIcon,
  Description as DocumentationIcon,
} from '@mui/icons-material';
import { PropertyItem } from './PropertyBookTable';

interface ComponentItem {
  id: string;
  name: string;
  nsn: string;
  qtyRequired: number;
  qtyOnHand: number;
  status: 'Complete' | 'Shortage' | 'Excess';
  location?: string;
  condition?: string;
}

interface HistoryRecord {
  id: string;
  date: string;
  action: string;
  user: string;
  notes?: string;
  documentNumber?: string;
}

interface DocumentRef {
  id: string;
  type: string;
  title: string;
  number: string;
  url?: string;
}

// Mock component data
const getMockComponents = (itemId: string): ComponentItem[] => [
  {
    id: `${itemId}-C1`,
    name: 'Carrying Case',
    nsn: '8465-01-534-1456',
    qtyRequired: 1,
    qtyOnHand: 1,
    status: 'Complete',
    location: 'Supply Room',
    condition: 'Serviceable',
  },
  {
    id: `${itemId}-C2`,
    name: 'Cleaning Kit',
    nsn: '1005-01-562-7393',
    qtyRequired: 1,
    qtyOnHand: 1,
    status: 'Complete',
    location: 'Arms Room',
    condition: 'Serviceable',
  },
  {
    id: `${itemId}-C3`,
    name: 'Spare Barrel',
    nsn: '1005-01-548-9781',
    qtyRequired: 1,
    qtyOnHand: 0,
    status: 'Shortage',
    location: 'On Order',
    condition: 'N/A',
  },
  {
    id: `${itemId}-C4`,
    name: 'Operator Manual',
    nsn: '1005-01-554-8137',
    qtyRequired: 1,
    qtyOnHand: 1,
    status: 'Complete',
    location: 'Supply Room',
    condition: 'Serviceable',
  },
  {
    id: `${itemId}-C5`,
    name: 'Tripod Mount',
    nsn: '1005-01-585-6247',
    qtyRequired: 1,
    qtyOnHand: 2,
    status: 'Excess',
    location: 'Arms Room',
    condition: 'Serviceable',
  },
];

// Mock history data
const getMockHistory = (itemId: string): HistoryRecord[] => [
  {
    id: `${itemId}-H1`,
    date: '2023-12-15',
    action: 'Inventory',
    user: '1LT CHEN',
    notes: 'Monthly sensitive items inventory',
  },
  {
    id: `${itemId}-H2`,
    date: '2023-11-01',
    action: 'Transfer',
    user: 'CPT RODRIGUEZ',
    notes: 'Transferred from 2nd PLT to 1st PLT',
    documentNumber: 'TR-2023-1101-45',
  },
  {
    id: `${itemId}-H3`,
    date: '2023-09-15',
    action: 'Maintenance',
    user: 'SFC TAYLOR',
    notes: 'Scheduled maintenance completed',
    documentNumber: 'MAINT-2023-0915-12',
  },
  {
    id: `${itemId}-H4`,
    date: '2023-07-21',
    action: 'Acquisition',
    user: 'MAJ WILSON',
    notes: 'Initial receipt from supply chain',
    documentNumber: 'RECEIPT-2023-0721-32',
  },
];

// Mock documentation data
const getMockDocuments = (itemId: string): DocumentRef[] => [
  {
    id: `${itemId}-D1`,
    type: 'Technical Manual',
    title: 'Operator Manual',
    number: 'TM 9-1005-319-10',
    url: '#',
  },
  {
    id: `${itemId}-D2`,
    type: 'Technical Manual',
    title: 'Maintenance Manual',
    number: 'TM 9-1005-319-23&P',
    url: '#',
  },
  {
    id: `${itemId}-D3`,
    type: 'Supply Catalog',
    title: 'Repair Parts and Special Tools List',
    number: 'SC 5180-95-CL-A07',
    url: '#',
  },
  {
    id: `${itemId}-D4`,
    type: 'Authorization Document',
    title: 'Modified Table of Organization and Equipment',
    number: 'MTOE FY23',
    url: '#',
  },
];

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
      id={`equipment-tabpanel-${index}`}
      aria-labelledby={`equipment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

interface EquipmentDetailPanelProps {
  item: PropertyItem;
}

const EquipmentDetailPanel: React.FC<EquipmentDetailPanelProps> = ({ item }) => {
  const [tabValue, setTabValue] = useState(0);
  const components = getMockComponents(item.id);
  const history = getMockHistory(item.id);
  const documents = getMockDocuments(item.id);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusChip = (status: string) => {
    let color: 'success' | 'warning' | 'error' | 'default' = 'default';
    
    switch (status) {
      case 'Complete':
        color = 'success';
        break;
      case 'Excess':
        color = 'warning';
        break;
      case 'Shortage':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <Paper sx={{ width: '100%', mt: 1, mb: 2 }} elevation={0} variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="equipment detail tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<InfoIcon />} label="General Information" iconPosition="start" />
          <Tab icon={<BuildIcon />} label="Components" iconPosition="start" />
          <Tab icon={<HistoryIcon />} label="History" iconPosition="start" />
          <Tab icon={<DocumentIcon />} label="Documentation" iconPosition="start" />
        </Tabs>
      </Box>

      {/* General Information Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Equipment Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">NSN:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" fontFamily="monospace" fontWeight="medium">{item.nsn}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">LIN:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" fontFamily="monospace" fontWeight="medium">{item.lin}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Nomenclature:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" fontWeight="medium">{item.nomenclature}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Serial Number:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" fontFamily="monospace" fontWeight="medium">{item.serialNumber}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Status:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Chip 
                  label={item.status} 
                  color={
                    item.status === 'Serviceable' ? 'success' : 
                    item.status === 'Maintenance' ? 'warning' : 
                    'error'
                  } 
                  size="small" 
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Authorization:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">MTOE FY23 Para 3-101</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Acquisition Date:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">Jul 21, 2023</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Current Assignment
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Location:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{item.location}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Hand Receipt:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{item.handReceiptHolder}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Sub Hand Receipt:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">N/A</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Last Verified:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{new Date(item.lastVerified).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Value:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" fontWeight="medium">${item.value.toLocaleString()}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Maintenance Due:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">Jan 15, 2024</Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" startIcon={<DocumentIcon />} size="small">
                View Hand Receipt
              </Button>
              <Button variant="outlined" startIcon={<PdfIcon />} size="small">
                Print Data Plate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Components Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Components of End Item / Basic Issue Items
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          The following components are associated with this equipment item.
        </Typography>
        
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Component</TableCell>
                <TableCell>NSN</TableCell>
                <TableCell align="center">Qty Required</TableCell>
                <TableCell align="center">Qty On Hand</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Condition</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {components.map((component) => (
                <TableRow 
                  key={component.id}
                  sx={{ 
                    bgcolor: component.status === 'Shortage' ? 'error.lighter' : 
                            component.status === 'Excess' ? 'warning.lighter' : 
                            'inherit'
                  }}
                >
                  <TableCell>{component.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {component.nsn}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{component.qtyRequired}</TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      color={
                        component.qtyOnHand < component.qtyRequired ? 'error.main' :
                        component.qtyOnHand > component.qtyRequired ? 'warning.main' :
                        'text.primary'
                      }
                      fontWeight="medium"
                    >
                      {component.qtyOnHand}
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(component.status)}</TableCell>
                  <TableCell>{component.location}</TableCell>
                  <TableCell>{component.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<BuildIcon />}
            size="small"
          >
            Order Missing Components
          </Button>
        </Box>
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Equipment History
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Chronological transaction history for this equipment item.
        </Typography>
        
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Document Number</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={record.action} 
                      size="small"
                      color={
                        record.action === 'Inventory' ? 'success' :
                        record.action === 'Maintenance' ? 'warning' :
                        record.action === 'Acquisition' ? 'info' :
                        'default'
                      }
                    />
                  </TableCell>
                  <TableCell>{record.user}</TableCell>
                  <TableCell>
                    {record.documentNumber ? (
                      <Link href="#" underline="hover">
                        {record.documentNumber}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="outlined" 
            startIcon={<HistoryIcon />}
            size="small"
          >
            View Complete History
          </Button>
        </Box>
      </TabPanel>

      {/* Documentation Tab */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Technical Documentation
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Reference materials and documentation for this equipment.
        </Typography>
        
        <Grid container spacing={2}>
          {documents.map((doc) => (
            <Grid item xs={12} sm={6} key={doc.id}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <DocumentationIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2">{doc.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.type} • {doc.number}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Link href={doc.url} target="_blank" rel="noopener">
                        <Button 
                          variant="text" 
                          size="small" 
                          endIcon={<ArrowForwardIcon />}
                        >
                          View Document
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Paper>
  );
};

export default EquipmentDetailPanel; 