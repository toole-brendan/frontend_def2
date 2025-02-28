import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  Grid,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Build as BuildIcon,
  Compare as CompareIcon,
  TransferWithinAStation as TransferIcon,
  ReportProblem as ReportIcon,
  Verified as VerifiedIcon,
  Image as ImageIcon,
  FactCheck as FactCheckIcon,
  Timer as TimerIcon,
  Person as PersonIcon
} from '@mui/icons-material';

interface VerificationEvent {
  date: string;
  verifier: string;
  status: 'Verified' | 'Missing' | 'Damaged';
  comments?: string;
}

interface TransferEvent {
  date: string;
  from: string;
  to: string;
  reason: string;
  documentNumber: string;
}

interface MaintenanceEvent {
  date: string;
  type: string;
  technician: string;
  resolution: string;
  nextScheduled?: string;
}

interface Component {
  name: string;
  serialNumber?: string;
  model?: string;
  status: 'Present' | 'Missing' | 'Damaged';
}

interface SecurityRequirement {
  requirement: string;
  category: 'Storage' | 'Transportation' | 'Handling' | 'Reporting';
}

interface SensitiveItemDetail {
  id: string;
  category: string;
  nomenclature: string;
  serialNumber: string;
  nsn: string;
  lin: string;
  model: string;
  manufacturer: string;
  acquisitionDate?: string;
  value: number;
  components: Component[];
  verificationHistory: VerificationEvent[];
  transferHistory: TransferEvent[];
  maintenanceHistory: MaintenanceEvent[];
  securityRequirements: SecurityRequirement[];
}

interface ItemDetailPanelProps {
  item: SensitiveItemDetail;
  open: boolean;
  onClose: () => void;
  onVerifyItem: (id: string) => void;
  onTransferItem: (id: string) => void;
  onReportIssue: (id: string) => void;
  onRequestMaintenance: (id: string) => void;
}

const ItemDetailPanel: React.FC<ItemDetailPanelProps> = ({
  item,
  open,
  onClose,
  onVerifyItem,
  onTransferItem,
  onReportIssue,
  onRequestMaintenance
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!open || !item) return null;

  return (
    <Paper 
      elevation={4}
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 500,
        height: '100vh',
        zIndex: 1200,
        overflowY: 'auto',
        borderLeft: '1px solid',
        borderLeftColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Typography variant="h6" fontWeight="bold">
            Item Details
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {item.nomenclature}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {item.category} • SN: {item.serialNumber}
          </Typography>
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="item detail tabs"
            variant="fullWidth"
          >
            <Tab label="Item Details" icon={<AssignmentIcon />} iconPosition="start" />
            <Tab label="Accountability" icon={<HistoryIcon />} iconPosition="start" />
            <Tab label="Documentation" icon={<DescriptionIcon />} iconPosition="start" />
            <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Content based on selected tab */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          {activeTab === 0 && (
            <Box>
              <Box sx={{ 
                bgcolor: 'background.default', 
                p: 2, 
                borderRadius: 1, 
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 150,
                border: '1px dashed',
                borderColor: 'divider'
              }}>
                <ImageIcon color="action" sx={{ mr: 1 }} />
                <Typography color="text.secondary">
                  Item photo would display here
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Specifications
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    NSN:
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {item.nsn}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    LIN:
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {item.lin}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Model:
                  </Typography>
                  <Typography variant="body1">
                    {item.model}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Manufacturer:
                  </Typography>
                  <Typography variant="body1">
                    {item.manufacturer}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Acquisition Date:
                  </Typography>
                  <Typography variant="body1">
                    {item.acquisitionDate || 'Not available'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Value:
                  </Typography>
                  <Typography variant="body1">
                    ${item.value.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Associated Components
              </Typography>
              
              <List disablePadding>
                {item.components.map((component, index) => (
                  <ListItem 
                    key={index} 
                    divider={index < item.components.length - 1}
                    sx={{ py: 1 }}
                  >
                    <ListItemText
                      primary={component.name}
                      secondary={component.serialNumber ? `SN: ${component.serialNumber}` : undefined}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                    <Chip 
                      label={component.status} 
                      size="small"
                      color={
                        component.status === 'Present' 
                          ? 'success' 
                          : component.status === 'Missing' 
                            ? 'error' 
                            : 'warning'
                      }
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {activeTab === 1 && (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Verification History
              </Typography>
              
              <List disablePadding sx={{ mb: 3 }}>
                {item.verificationHistory.map((event, index) => (
                  <ListItem 
                    key={index} 
                    divider={index < item.verificationHistory.length - 1}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar 
                        sx={{ 
                          width: 28, 
                          height: 28,
                          bgcolor: event.status === 'Verified' 
                            ? 'success.main' 
                            : event.status === 'Missing' 
                              ? 'error.main' 
                              : 'warning.main' 
                        }}
                      >
                        <VerifiedIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={`${event.status} by ${event.verifier}`}
                      secondary={event.date + (event.comments ? ` - ${event.comments}` : '')}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Transfer History
              </Typography>
              
              <List disablePadding sx={{ mb: 3 }}>
                {item.transferHistory.map((event, index) => (
                  <ListItem 
                    key={index} 
                    divider={index < item.transferHistory.length - 1}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
                        <TransferIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={`From ${event.from} to ${event.to}`}
                      secondary={`${event.date} - ${event.reason} (Doc #: ${event.documentNumber})`}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Maintenance History
              </Typography>
              
              <List disablePadding>
                {item.maintenanceHistory.map((event, index) => (
                  <ListItem 
                    key={index} 
                    divider={index < item.maintenanceHistory.length - 1}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'warning.main' }}>
                        <BuildIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={event.type}
                      secondary={`${event.date} - ${event.technician} - ${event.resolution}`}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {activeTab === 2 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FactCheckIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" align="center">
                      Serial Number Verification Photo
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AssignmentIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" align="center">
                      DA Form 3749 (Equipment Receipt)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <DescriptionIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" align="center">
                      Technical Manual
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SecurityIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" align="center">
                      Arms Room Weapons Card
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Document History
                </Typography>
                
                <List disablePadding>
                  <ListItem divider sx={{ py: 1 }}>
                    <ListItemIcon>
                      <TimerIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Last Serial Number Verification"
                      secondary="15FEB2025 0930 by CPT Rodriguez"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem divider sx={{ py: 1 }}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Current Hand Receipt Holder"
                      secondary="1LT Morgan since 10JAN2025"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 1 }}>
                    <ListItemIcon>
                      <BuildIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Last Maintenance Service"
                      secondary="03FEB2025 - Preventive Maintenance"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
          
          {activeTab === 3 && (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Security Requirements
              </Typography>
              
              <List disablePadding>
                {item.securityRequirements.map((req, index) => (
                  <ListItem 
                    key={index} 
                    divider={index < item.securityRequirements.length - 1}
                    sx={{ py: 1 }}
                  >
                    <ListItemText
                      primary={req.requirement}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                    <Chip 
                      label={req.category} 
                      size="small"
                      color={
                        req.category === 'Storage' 
                          ? 'primary' 
                          : req.category === 'Transportation' 
                            ? 'info' 
                            : req.category === 'Reporting'
                              ? 'error'
                              : 'warning'
                      }
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: '#fff9f9', borderRadius: 1, border: '1px solid', borderColor: 'error.light' }}>
                <Typography variant="subtitle2" color="error" fontWeight="bold" gutterBottom>
                  Loss Reporting Procedures
                </Typography>
                
                <Typography variant="body2" paragraph>
                  If this sensitive item is discovered missing, immediately:
                </Typography>
                <Box component="ol" sx={{ pl: 2, mt: 0 }}>
                  <Typography component="li" variant="body2">Notify the Commander and First Sergeant</Typography>
                  <Typography component="li" variant="body2">Secure the area where the item was last seen</Typography>
                  <Typography component="li" variant="body2">Contact the PMO at 555-123-8910</Typography>
                  <Typography component="li" variant="body2">Initiate sensitive item inventory</Typography>
                  <Typography component="li" variant="body2">Prepare DD Form 200 (FLIPL)</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Regulatory References
                </Typography>
                
                <List dense disablePadding>
                  <ListItem>
                    <ListItemText 
                      primary="AR 710-2, Para 2-12: Sensitive Items Inventory Requirements" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="AR 190-11: Physical Security of Arms, Ammunition, and Explosives"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="DA PAM 710-2-1: Using Unit Supply System"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
        </Box>
        
        {/* Action buttons */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<CompareIcon />}
              onClick={() => onVerifyItem(item.id)}
              fullWidth
            >
              Conduct Verification
            </Button>
            <Button
              variant="outlined"
              startIcon={<TransferIcon />}
              onClick={() => onTransferItem(item.id)}
              fullWidth
            >
              Transfer Item
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ReportIcon />}
              color="warning"
              onClick={() => onReportIssue(item.id)}
              fullWidth
            >
              Report Issue
            </Button>
            <Button
              variant="outlined"
              startIcon={<BuildIcon />}
              onClick={() => onRequestMaintenance(item.id)}
              fullWidth
            >
              Maintenance
            </Button>
          </Stack>
          <Button
            variant="text"
            fullWidth
            onClick={onClose}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ItemDetailPanel; 