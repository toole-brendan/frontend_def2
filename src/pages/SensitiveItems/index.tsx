import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  alpha,
  useTheme,
  Avatar,
  Divider
} from '@mui/material';
import { CardHeader, KpiStatsCard } from '../../components/common';
import {
  QrCodeScanner as QrCodeScannerIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  FileDownload as FileDownloadIcon,
  Shield as ShieldIcon,
  CalendarToday as CalendarIcon,
  CheckCircleOutline as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Task as TaskIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  VerifiedUser as VerifiedIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Mock data
const mockData = {
  companyInfo: "B Company, 2-87 Infantry",
  accountabilityStats: {
    total: 210,
    accounted: 209,
    percentage: 99.5
  },
  nextInventory: "Today 1700",
  armsRoom: {
    name: "Alpha Company Arms Room",
    status: "SECURE",
    lastAccess: {
      timestamp: "25FEB2025 0730",
      person: "1LT Chen",
      role: "Arms Room Officer"
    },
    custodian: {
      name: "SFC Martinez",
      appointedDate: "01JAN2025"
    },
    weapons: {
      stored: 143,
      signedOut: 7,
      total: 150
    },
    tempHandReceipts: 3,
    maintenanceItems: 2
  },
  sensitiveItems: [
    { 
      id: '1', 
      item: 'M4 Carbine', 
      type: 'Weapon', 
      serialNumber: '12496352', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '1LT Morgan', 
      lastVerified: '25FEB2025 0730' 
    },
    { 
      id: '2', 
      item: 'M9 Pistol', 
      type: 'Weapon', 
      serialNumber: '11857493', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: 'CPT Rodriguez', 
      lastVerified: '25FEB2025 0735' 
    },
    { 
      id: '3', 
      item: 'M240B', 
      type: 'Weapon', 
      serialNumber: 'M2405689', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '1LT Chen', 
      lastVerified: '25FEB2025 0740' 
    }
  ]
};

// Styled ActionCard component with HandReceipt styling
const ActionCard = ({ icon, title, subtitle, buttonText, color }: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  buttonText: string; 
  color: string 
}) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      mb: 2, 
      bgcolor: 'background.paper',
      borderRadius: 0,
      borderLeft: `3px solid ${color}`,
      border: '1px solid rgba(140, 140, 160, 0.12)'
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', mb: 1.5 }}>
          <Avatar 
            sx={{ 
              bgcolor: alpha(color, 0.15),
              color: color,
              width: 32,
              height: 32,
              mr: 1.5,
              borderRadius: 0
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="subtitle1" sx={{ pt: 0.5 }}>{title}</Typography>
        </Box>
        
        <Typography variant="h5" fontWeight="500" color={color} sx={{ my: 1.5 }}>
          {subtitle}
        </Typography>
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            bgcolor: color, 
            '&:hover': { bgcolor: color, filter: 'brightness(0.9)' },
            borderRadius: 0
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

// Status chip component
const StatusChip = ({ label, status }: { label: string, status: string }) => {
  const theme = useTheme();
  let color = theme.palette.info.main;
  
  switch(status.toLowerCase()) {
    case 'success':
    case 'complete':
    case 'compliant':
    case 'on track':
      color = theme.palette.success.main;
      break;
    case 'warning':
    case 'in progress':
    case 'pending':
      color = theme.palette.warning.main;
      break;
    case 'error':
    case 'failed':
    case 'overdue':
      color = theme.palette.error.main;
      break;
  }
  
  return (
    <Chip
      label={label}
      size="small"
      sx={{ 
        backgroundColor: alpha(color, 0.1),
        color: color,
        fontWeight: 500,
        fontSize: '0.75rem',
        borderRadius: 0,
        height: 20
      }}
    />
  );
};

const SensitiveItems = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
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
          Sensitive Items Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
          <Button 
            variant="outlined" 
            startIcon={<FileDownloadIcon />}
            sx={{ borderRadius: 0 }}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Status Cards */}
      <Grid container spacing={2} sx={{ mb: 3, mx: 1 }}>
        {/* Next Required Inventory */}
        <Grid item xs={12} md={4}>
          <KpiStatsCard 
            icon={<CalendarIcon fontSize="small" />}
            title="Next Required Inventory"
            value={`Daily: ${mockData.nextInventory}`}
            subtitle="Daily verification requirement"
            color={theme.palette.primary.main}
          />
        </Grid>

        {/* Accountability */}
        <Grid item xs={12} md={4}>
          <KpiStatsCard 
            icon={<CheckCircleIcon fontSize="small" />}
            title="Accountability"
            value={`${mockData.accountabilityStats.accounted}/${mockData.accountabilityStats.total} (${mockData.accountabilityStats.percentage}%)`}
            subtitle="Sensitive items accounted for"
            color={theme.palette.success.main}
          />
        </Grid>

        {/* Scan QR Code */}
        <Grid item xs={12} md={4}>
          <KpiStatsCard 
            icon={<QrCodeScannerIcon fontSize="small" />}
            title="Scan QR Code"
            value="Code"
            subtitle="Scan to verify sensitive items"
            color={theme.palette.info.main}
            bgColor={alpha(theme.palette.info.main, 0.1)}
          />
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Left Column - Arms Room and Action Cards */}
        <Grid item xs={12} md={4}>
          {/* Arms Room Status Card */}
          <Paper sx={{ borderRadius: 0, p: 0, mb: 3, bgcolor: 'background.paper', border: '1px solid rgba(140, 140, 160, 0.12)' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(140, 140, 160, 0.12)' }}>
              <Avatar 
                sx={{ 
                  bgcolor: alpha(theme.palette.success.main, 0.15),
                  color: theme.palette.success.main,
                  width: 32,
                  height: 32,
                  borderRadius: 0
                }}
              >
                <ShieldIcon fontSize="small" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                {mockData.armsRoom.name}
              </Typography>
              <Box sx={{ 
                ml: 'auto', 
                bgcolor: alpha(theme.palette.success.main, 0.1), 
                px: 2, 
                py: 0.5, 
                borderRadius: 0,
                color: theme.palette.success.main,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {mockData.armsRoom.status}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* Last Access */}
              <Box sx={{ 
                width: { xs: '100%', sm: '50%' }, 
                p: 2, 
                borderRight: { xs: 'none', sm: '1px solid rgba(140, 140, 160, 0.12)' }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Last Access
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {mockData.armsRoom.lastAccess.timestamp}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  BY {mockData.armsRoom.lastAccess.person}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mockData.armsRoom.lastAccess.role}
                </Typography>
              </Box>
              
              {/* Current Custodian */}
              <Box sx={{ 
                width: { xs: '100%', sm: '50%' }, 
                p: 2
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Current Custodian
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  {mockData.armsRoom.custodian.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Appointed: {mockData.armsRoom.custodian.appointedDate}
                </Typography>
              </Box>
            </Box>
            
            {/* Weapons Status */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(140, 140, 160, 0.12)' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Weapons Status
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {mockData.armsRoom.weapons.stored}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stored
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {mockData.armsRoom.weapons.signedOut}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Signed Out
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {mockData.armsRoom.weapons.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
            {/* Additional Status */}
            <Box sx={{ 
              display: 'flex', 
              borderTop: '1px solid rgba(140, 140, 160, 0.12)'
            }}>
              <Box sx={{ 
                width: '50%', 
                p: 2, 
                borderRight: '1px solid rgba(140, 140, 160, 0.12)'
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Temp Hand Receipts
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {mockData.armsRoom.tempHandReceipts}
                </Typography>
              </Box>
              <Box sx={{ width: '50%', p: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Maintenance Items
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {mockData.armsRoom.maintenanceItems}
                </Typography>
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              p: 2, 
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              borderTop: '1px solid rgba(140, 140, 160, 0.12)'
            }}>
              <Button 
                variant="outlined" 
                startIcon={<PersonIcon />} 
                sx={{ borderRadius: 0 }}
              >
                Contact Armorer
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<AccessTimeIcon />} 
                sx={{ borderRadius: 0 }}
              >
                Access Log
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<DescriptionIcon />} 
                sx={{ borderRadius: 0 }}
              >
                Review SOP
              </Button>
            </Box>
          </Paper>

          {/* Conduct Inventory */}
          <ActionCard 
            icon={<AssignmentIcon />}
            title="Conduct Inventory"
            subtitle="Daily Check"
            buttonText="Start Inventory"
            color={theme.palette.primary.main}
          />

          {/* Weekly Status */}
          <ActionCard 
            icon={<ShieldIcon />}
            title="Weekly Status"
            subtitle="7/7 Complete"
            buttonText="View Report"
            color={theme.palette.success.main}
          />
        </Grid>

        {/* Right Column - Tabs and Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ borderRadius: 0, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid rgba(140, 140, 160, 0.12)' }}>
            {/* Tabs */}
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                px: 2,
                '& .MuiTabs-indicator': {
                  height: 3
                }
              }}
            >
              <Tab label="Current Inventory (210)" sx={{ textTransform: 'none' }} />
              <Tab label="Inventory History" sx={{ textTransform: 'none' }} />
              <Tab label="Schedule" sx={{ textTransform: 'none' }} />
              <Tab label="Reports & Analytics" sx={{ textTransform: 'none' }} />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ p: 0 }}>
              {/* Current Inventory Tab */}
              {currentTab === 0 && (
                <Box>
                  {/* Search and Filter */}
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(140, 140, 160, 0.12)' }}>
                    <TextField
                      placeholder="Search by nomenclature, serial number, or location..."
                      variant="outlined"
                      size="small"
                      sx={{ 
                        width: '70%',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 0
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box>
                      <Button 
                        variant="outlined" 
                        startIcon={<FilterListIcon />} 
                        sx={{ mr: 1, borderRadius: 0 }}
                      >
                        Filter
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<FileDownloadIcon />} 
                        sx={{ borderRadius: 0 }}
                      >
                        Export
                      </Button>
                    </Box>
                  </Box>

                  {/* Items Table */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'medium', 
                            fontSize: '0.75rem', 
                            letterSpacing: '0.05em',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05) 
                          }}>
                            ITEM
                          </TableCell>
                          <TableCell sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'medium', 
                            fontSize: '0.75rem', 
                            letterSpacing: '0.05em',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05)
                          }}>
                            SERIAL NUMBER
                          </TableCell>
                          <TableCell sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'medium', 
                            fontSize: '0.75rem', 
                            letterSpacing: '0.05em',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05)
                          }}>
                            LOCATION
                          </TableCell>
                          <TableCell sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'medium', 
                            fontSize: '0.75rem', 
                            letterSpacing: '0.05em',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05)
                          }}>
                            ASSIGNED TO
                          </TableCell>
                          <TableCell sx={{ 
                            textTransform: 'uppercase', 
                            fontWeight: 'medium', 
                            fontSize: '0.75rem', 
                            letterSpacing: '0.05em',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05)
                          }}>
                            LAST VERIFIED
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockData.sensitiveItems.map((item) => (
                          <TableRow key={item.id} sx={{ 
                            '&:hover': { bgcolor: 'action.hover' }
                          }}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                                    color: theme.palette.primary.main,
                                    width: 28,
                                    height: 28,
                                    mr: 1.5,
                                    borderRadius: 0
                                  }}
                                >
                                  <ShieldIcon sx={{ fontSize: 16 }} />
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{item.item}</Typography>
                                  <Typography variant="caption" color="text.secondary">{item.type}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{item.serialNumber}</Typography>
                              <Typography variant="caption" color="text.secondary">CAT: {item.category}</Typography>
                            </TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.assignedTo}</TableCell>
                            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.lastVerified}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SensitiveItems;
