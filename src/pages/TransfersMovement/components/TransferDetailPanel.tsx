import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Stack,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArticleIcon from '@mui/icons-material/Article';
import HistoryIcon from '@mui/icons-material/History';
import PrintIcon from '@mui/icons-material/Print';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SecurityIcon from '@mui/icons-material/Security';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Transfer, TransferStage, TransferType, TransferItem, TransferDocument } from '../types';

interface TransferDetailPanelProps {
  transfer: Transfer;
  onActionClick: (action: string, transfer: Transfer | TransferItem | TransferDocument) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Tab Panel Component
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`transfer-tabpanel-${index}`}
      aria-labelledby={`transfer-tab-${index}`}
      {...other}
      style={{ padding: '16px 0' }}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TransferDetailPanel: React.FC<TransferDetailPanelProps> = ({
  transfer,
  onActionClick
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Get action buttons based on transfer stage
  const getActionButtons = () => {
    switch (transfer.stage) {
      case TransferStage.PENDING_APPROVAL:
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onActionClick('approve', transfer)}
              sx={{ mr: 1 }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onActionClick('deny', transfer)}
              sx={{ mr: 1 }}
            >
              Deny
            </Button>
            <Button
              variant="outlined"
              onClick={() => onActionClick('requestInfo', transfer)}
            >
              Request Info
            </Button>
          </>
        );
      case TransferStage.PENDING_RECEIPT:
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onActionClick('processReceipt', transfer)}
              sx={{ mr: 1 }}
            >
              Process Receipt
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onActionClick('reportDiscrepancy', transfer)}
            >
              Report Discrepancy
            </Button>
          </>
        );
      case TransferStage.COMPLETED:
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => onActionClick('viewReceipt', transfer)}
              sx={{ mr: 1 }}
            >
              View Receipt
            </Button>
            <Button
              variant="outlined"
              onClick={() => onActionClick('processFollowUp', transfer)}
            >
              Process Follow-up
            </Button>
          </>
        );
      default:
        return (
          <>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => onActionClick('printDocuments', transfer)}
              sx={{ mr: 1 }}
            >
              Print Documents
            </Button>
            <Button
              variant="outlined"
              startIcon={<LocationOnIcon />}
              onClick={() => onActionClick('trackStatus', transfer)}
              sx={{ mr: 1 }}
            >
              Track Status
            </Button>
            <Button
              variant="outlined"
              startIcon={<NoteAddIcon />}
              onClick={() => onActionClick('addNote', transfer)}
            >
              Add Note
            </Button>
          </>
        );
    }
  };

  return (
    <Box>
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', mb: 3 }}>
        {getActionButtons()}
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            label="Transfer Details" 
            icon={<InfoIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Equipment Items" 
            icon={<InventoryIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Documentation" 
            icon={<ArticleIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Transfer History" 
            icon={<HistoryIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>
      
      {/* Transfer Details Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Transfer Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><InfoIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Transfer Type" 
                    secondary={transfer.type} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><RecentActorsIcon /></ListItemIcon>
                  <ListItemText 
                    primary="From/To" 
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">
                          {transfer.from.name}
                        </Typography>
                        <ArrowForwardIcon sx={{ mx: 1 }} fontSize="small" />
                        <Typography variant="body2">
                          {transfer.to.name}
                        </Typography>
                      </Box>
                    } 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><HistoryIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Date Initiated" 
                    secondary={formatDate(transfer.dateInitiated)} 
                  />
                </ListItem>
                {transfer.dueDate && (
                  <ListItem>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Due Date" 
                      secondary={formatDate(transfer.dueDate)} 
                    />
                  </ListItem>
                )}
                {transfer.returnDate && (
                  <ListItem>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Return Date" 
                      secondary={formatDate(transfer.returnDate)} 
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemIcon><InfoIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Current Status" 
                    secondary={
                      <Chip 
                        label={transfer.stage} 
                        size="small" 
                        color={
                          transfer.stage === TransferStage.COMPLETED ? 'success' :
                          transfer.stage === TransferStage.PENDING_APPROVAL ? 'warning' :
                          transfer.stage === TransferStage.PENDING_RECEIPT ? 'error' : 'primary'
                        } 
                      />
                    } 
                  />
                </ListItem>
                {transfer.purpose && (
                  <ListItem>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Purpose" 
                      secondary={transfer.purpose} 
                    />
                  </ListItem>
                )}
                {transfer.transportMethod && (
                  <ListItem>
                    <ListItemIcon><LocationOnIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Transportation Method" 
                      secondary={transfer.transportMethod} 
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Authorization Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><RecentActorsIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Initiated By" 
                    secondary={`${transfer.initiatedBy.rank} ${transfer.initiatedBy.name}`} 
                  />
                </ListItem>
                {transfer.blockchainTxId && (
                  <ListItem>
                    <ListItemIcon><VerifiedIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Blockchain Verification" 
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            label="Verified" 
                            size="small" 
                            color="success" 
                            icon={<VerifiedIcon />} 
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="caption" component="span">
                            {`ID: ${transfer.blockchainTxId.substring(0, 8)}...`}
                          </Typography>
                        </Box>
                      } 
                    />
                  </ListItem>
                )}
                {transfer.notes && (
                  <ListItem>
                    <ListItemIcon><NoteAddIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Notes" 
                      secondary={transfer.notes} 
                    />
                  </ListItem>
                )}
              </List>
              
              {transfer.location && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Current Location
                  </Typography>
                  <Box sx={{ mt: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last updated: {formatDate(transfer.location.updatedAt)}
                    </Typography>
                    <Button 
                      startIcon={<LocationOnIcon />}
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => onActionClick('viewLocation', transfer)}
                    >
                      View on Map
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Equipment Items Tab */}
      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>NSN</TableCell>
                <TableCell>Current Custodian</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfer.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.isSensitiveItem && (
                        <SecurityIcon 
                          fontSize="small" 
                          color="error" 
                          sx={{ mr: 1 }} 
                        />
                      )}
                      {item.name}
                    </Box>
                  </TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.nsn || 'N/A'}</TableCell>
                  <TableCell>{item.currentCustodian}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(item.value)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => onActionClick('viewItemDetails', item)}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {transfer.items.some(item => item.components && item.components.length > 0) && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Components / BII / COEI
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                This transfer includes items with components. Expand each item to view its components.
              </Typography>
              <Button 
                variant="outlined"
                size="small"
                onClick={() => onActionClick('viewAllComponents', transfer)}
              >
                View All Components
              </Button>
            </Paper>
          </Box>
        )}
      </TabPanel>
      
      {/* Documentation Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Transfer Documents
              </Typography>
              <List>
                {transfer.documents.map((doc) => (
                  <ListItem key={doc.id}>
                    <ListItemIcon><ArticleIcon /></ListItemIcon>
                    <ListItemText 
                      primary={doc.type.replace(/_/g, ' ')} 
                      secondary={formatDate(doc.dateGenerated)} 
                    />
                    <Button 
                      size="small"
                      variant="outlined"
                      onClick={() => onActionClick('viewDocument', doc)}
                    >
                      View
                    </Button>
                  </ListItem>
                ))}
                {transfer.documents.length === 0 && (
                  <ListItem>
                    <ListItemText 
                      primary="No documents available" 
                      secondary="Documents will be generated when the transfer is processed" 
                    />
                  </ListItem>
                )}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Generate Documentation
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => onActionClick('generateDA3161', transfer)}
                >
                  DA 3161
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => onActionClick('generateDA2062', transfer)}
                >
                  DA 2062
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => onActionClick('generateDD1348', transfer)}
                >
                  DD 1348-1A
                </Button>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Digital Signatures
              </Typography>
              <List dense>
                {transfer.documents.length > 0 && transfer.documents[0].signatures.map((sig, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {sig.verified ? (
                        <VerifiedIcon color="success" />
                      ) : (
                        <VerifiedIcon color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={sig.role} 
                      secondary={`${sig.rank} ${sig.name} - ${formatDate(sig.signedAt)}`} 
                    />
                  </ListItem>
                ))}
                {(transfer.documents.length === 0 || transfer.documents[0].signatures.length === 0) && (
                  <ListItem>
                    <ListItemText 
                      primary="No signatures available" 
                      secondary="Signatures will be collected when the transfer is processed" 
                    />
                  </ListItem>
                )}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Blockchain Verification
              </Typography>
              {transfer.blockchainTxId ? (
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    This transfer has been verified on the blockchain.
                  </Typography>
                  <Link 
                    component="button"
                    variant="body2"
                    onClick={() => onActionClick('viewBlockchain', transfer)}
                  >
                    View Blockchain Record
                  </Link>
                </Box>
              ) : (
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Blockchain verification pending
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Transfer History Tab */}
      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Activity Timeline
          </Typography>
          
          <Timeline position="alternate" sx={{ mt: 2 }}>
            {transfer.activities.map((activity, index) => (
              <TimelineItem key={activity.id}>
                <TimelineSeparator>
                  <TimelineDot 
                    color={
                      activity.activityType === 'APPROVAL' ? 'success' :
                      activity.activityType === 'DENIAL' ? 'error' :
                      activity.activityType === 'INSPECTION' ? 'warning' :
                      'primary'
                    }
                  />
                  {index < transfer.activities.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle2">
                    {activity.activityType.replace(/_/g, ' ')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(activity.timestamp)}
                  </Typography>
                  <Typography variant="body2">
                    {`${activity.user.rank} ${activity.user.name}`}
                  </Typography>
                  <Typography variant="body2">
                    {activity.details}
                  </Typography>
                  {activity.location && (
                    <Typography variant="caption" color="text.secondary">
                      Location: {activity.location}
                    </Typography>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          
          {transfer.activities.length === 0 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No activity recorded yet
              </Typography>
            </Box>
          )}
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default TransferDetailPanel; 