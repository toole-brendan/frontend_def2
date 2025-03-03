import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Avatar,
  Tab,
  Tabs,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';

import {
  PhotoCamera as CameraIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
  LocalShipping as TruckIcon,
  Error as AlertCircleIcon,
  MoreVert as MoreVerticalIcon,
  FilterList as FilterIcon,
  CloudDownload as DownloadIcon,
  QrCode as QrCodeIcon,
  ArrowForward as ArrowRightIcon,
  Description as FileTextIcon,
  Search as SearchIcon,
  ExitToApp as LogOutIcon,
  Lock as LockIcon,
  Info as InfoIcon,
  Today as CalendarIcon,
  Person as UserIcon,
  Security as ShieldIcon,
} from '@mui/icons-material';

// Enhanced military-styled mock data
const transferData = [
  { id: 'TR-1225-08A', type: 'Receipt', items: 'JLTV, M1316A1 NSN 2320-01-670-6066', from: '10MTN DIV G4 SUPPLY', to: 'B CO 2-87 MTR POOL', initiated: '22FEB2025', due: 'TODAY', status: 'AWAITING RECEIPT', priority: 'HIGH' },
  { id: 'TR-1224-11B', type: 'Temp', items: 'M249 SAW NSN 1005-01-127-7510 (4)', from: 'B CO 2-87 ARMS RM', to: 'RNG CTRL FAC', initiated: '24FEB2025', due: '25FEB 1700', status: 'TEMP HAND RECEIPT', priority: 'HIGH' },
  { id: 'TR-1223-04C', type: 'Maint', items: 'HMMWV M1151A1 NSN 2320-01-540-1993', from: '3PLT B CO 2-87', to: 'BN MAINT SEC', initiated: '23FEB2025', due: '28FEB2025', status: 'AT MAINTENANCE', priority: 'ROUTINE' },
  { id: 'TR-1222-09D', type: 'Lateral', items: 'GEN SET MEP-1030 NSN 6115-01-574-7617 (2)', from: 'HQ PLT B CO 2-87', to: '1PLT B CO 2-87', initiated: '22FEB2025', due: '25FEB2025', status: 'COMPLETE', priority: 'ROUTINE' },
  { id: 'TR-1221-03E', type: 'Turn-in', items: 'RADIO SET AN/PRC-117G NSN 5820-01-579-6280', from: 'B CO 2-87 COMMO', to: '2BCT 10MTN S4', initiated: '21FEB2025', due: '27FEB2025', status: 'PENDING APPROVAL', priority: 'MEDIUM' }
];

const priorityTransfers = [
  { id: 'TR-1225-08A', type: 'Receipt', items: 'JLTV, M1316A1 NSN 2320-01-670-6066', fromTo: '2BCT 10MTN S4 → B CO 2-87', due: 'TODAY', status: 'INSP REQUIRED', action: 'INSPECT & SIGN' },
  { id: 'TR-1224-11B', type: 'Range', items: 'M249 SAW NSN 1005-01-127-7510 (4)', fromTo: 'ARMS RM → RNG CTRL', due: 'TODAY', status: 'DUE BY 1700', action: 'PROCESS RETURN' },
  { id: 'TR-1220-14F', type: 'NTC Prep', items: 'RADIO SET AN/PRC-152 (12)', fromTo: 'B CO 2-87 → COMMS CAGE', due: '28FEB', status: 'AWAITING BN APPROVAL', action: 'FOLLOW UP' }
];

const recentActivity = [
  { date: '25FEB2025', time: '1045', activity: 'APPROVAL', id: 'TR-1222-09D', personnel: 'CW2 PATEL, N.', items: 'GEN SET MEP-1030 (2)', status: 'COMPLETE' },
  { date: '25FEB2025', time: '0915', activity: 'INSPECTION', id: 'TR-1225-08A', personnel: 'SSG WILSON, T.', items: 'JLTV, M1316A1', status: 'IN PROCESS' },
  { date: '24FEB2025', time: '1645', activity: 'INITIATION', id: 'TR-1224-11B', personnel: '1LT CHEN, A.', items: 'M249 SAW (4)', status: 'TEMPORARY' }
];

const TransfersMovementPage: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: false,
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }));

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    if (status.includes('COMPLETE')) return {
      bg: theme.palette.success.main,
      text: theme.palette.common.white
    };
    if (status.includes('PENDING') || status.includes('AWAITING')) return {
      bg: theme.palette.warning.dark,
      text: theme.palette.common.white
    };
    if (status.includes('HIGH') || status.includes('INSP')) return {
      bg: theme.palette.error.dark,
      text: theme.palette.common.white
    };
    return {
      bg: theme.palette.primary.dark,
      text: theme.palette.common.white
    };
  };
  
  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    if (priority === 'HIGH') return {
      bg: theme.palette.error.dark,
      text: theme.palette.common.white
    };
    if (priority === 'MEDIUM') return {
      bg: theme.palette.warning.dark,
      text: theme.palette.common.white
    };
    return {
      bg: theme.palette.success.dark,
      text: theme.palette.common.white
    };
  };
  
  // Helper function to get type color
  const getTypeColor = (type: string) => {
    if (type === 'Receipt') return {
      bg: theme.palette.primary.dark,
      text: theme.palette.common.white
    };
    if (type === 'Temp' || type === 'Range') return {
      bg: '#6A1B9A', // Purple dark color
      text: theme.palette.common.white
    };
    if (type === 'Maint') return {
      bg: '#E65100', // Orange dark color
      text: theme.palette.common.white
    };
    if (type === 'Turn-in') return {
      bg: theme.palette.error.dark,
      text: theme.palette.common.white
    };
    if (type === 'NTC Prep') return {
      bg: theme.palette.info.dark,
      text: theme.palette.common.white
    };
    return {
      bg: theme.palette.grey[700],
      text: theme.palette.common.white
    };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // Define dark theme colors
  const darkTheme = {
    background: {
      default: '#121212',
      paper: '#1E1E1E',
      card: '#252525',
      elevated: '#2C2C2C'
    },
    accent: {
      blue: '#3D5AFE',
      teal: '#00B0FF',
      purple: '#7B1FA2',
      amber: '#FFB300'
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkTheme.background.default, pt: 3 }}>
      
      {/* Content Container */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3 
          }}>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 500, 
                  color: 'common.white',
                  mb: 0.5
                }}
              >
                Transfers & Movement
              </Typography>
              <Typography variant="body2" color="text.secondary">
                B Company Logistics | Last updated: {currentDateTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button 
                variant="text" 
                startIcon={<SearchIcon />}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { 
                    bgcolor: alpha(darkTheme.accent.blue, 0.1),
                    color: darkTheme.accent.blue
                  }
                }}
              >
                Search
              </Button>
              <Button 
                variant="text" 
                startIcon={<FilterIcon />}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { 
                    bgcolor: alpha(darkTheme.accent.blue, 0.1),
                    color: darkTheme.accent.blue
                  }
                }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<QrCodeIcon />}
                sx={{
                  bgcolor: darkTheme.accent.blue,
                  '&:hover': { bgcolor: alpha(darkTheme.accent.blue, 0.8) }
                }}
              >
                Scan QR
              </Button>
            </Box>
          </Box>
          
          {/* Modern Notification Banner */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: alpha(darkTheme.accent.amber, 0.15),
              borderRadius: 2,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AlertCircleIcon sx={{ mr: 2, color: darkTheme.accent.amber }} />
              <Box>
                <Typography sx={{ 
                  fontWeight: 500, 
                  color: darkTheme.accent.amber,
                  mb: 0.5
                }}>
                  Action Required
                </Typography>
                <Typography sx={{ color: alpha(darkTheme.accent.amber, 0.8) }}>
                  13 pending transfers waiting for your approval
                </Typography>
              </Box>
              <Button 
                variant="text" 
                size="small" 
                sx={{ 
                  ml: 'auto', 
                  color: darkTheme.accent.amber,
                  '&:hover': { bgcolor: alpha(darkTheme.accent.amber, 0.1) }
                }}
              >
                View All
              </Button>
            </Box>
          </Paper>
          
          {/* Modern Stats Cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: darkTheme.background.card,
                  backgroundImage: `linear-gradient(135deg, ${alpha(darkTheme.accent.blue, 0.15)}, transparent)`,
                  border: `1px solid ${alpha(darkTheme.accent.blue, 0.1)}`,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(darkTheme.accent.blue, 0.15)}`
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Incoming Transfers
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 400, 
                    color: 'white',
                    mb: 0.5
                  }}
                >
                  37
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: darkTheme.accent.blue
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: darkTheme.accent.blue,
                      mr: 1
                    }} 
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 500 
                    }}
                  >
                    Updated today
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: darkTheme.background.card,
                  backgroundImage: `linear-gradient(135deg, ${alpha(darkTheme.accent.purple, 0.15)}, transparent)`,
                  border: `1px solid ${alpha(darkTheme.accent.purple, 0.1)}`,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(darkTheme.accent.purple, 0.15)}`
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Outgoing Transfers
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 400, 
                    color: 'white',
                    mb: 0.5
                  }}
                >
                  24
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: darkTheme.accent.purple
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: darkTheme.accent.purple,
                      mr: 1
                    }} 
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 500 
                    }}
                  >
                    4 in process
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: darkTheme.background.card,
                  backgroundImage: `linear-gradient(135deg, ${alpha(darkTheme.accent.amber, 0.15)}, transparent)`,
                  border: `1px solid ${alpha(darkTheme.accent.amber, 0.1)}`,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(darkTheme.accent.amber, 0.15)}`
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Pending Approval
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 400, 
                    color: 'white',
                    mb: 0.5
                  }}
                >
                  13
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: darkTheme.accent.amber
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: darkTheme.accent.amber,
                      mr: 1
                    }} 
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 500
                    }}
                  >
                    Action required
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: darkTheme.background.card,
                  backgroundImage: `linear-gradient(135deg, ${alpha(darkTheme.accent.teal, 0.15)}, transparent)`,
                  border: `1px solid ${alpha(darkTheme.accent.teal, 0.1)}`,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(darkTheme.accent.teal, 0.15)}`
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Temporary Receipts
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 400, 
                    color: 'white',
                    mb: 0.5
                  }}
                >
                  8
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: theme.palette.error.light
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: theme.palette.error.main,
                      mr: 1
                    }} 
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 500
                    }}
                  >
                    2 overdue
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Transfer Status Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Transfer Pipeline Card */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0, 
                bgcolor: darkTheme.background.card,
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%'
              }}
            >
              <Box 
                sx={{ 
                  py: 1.5, 
                  px: 3, 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 500, 
                    color: 'common.white'
                  }}
                >
                  Transfer Pipeline
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 1 
                  }}
                >
                  <Chip 
                    label="Q1 Completion: 72%" 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(darkTheme.accent.blue, 0.15), 
                      color: darkTheme.accent.blue,
                      fontWeight: 'medium',
                      height: 24,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 4,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      height: 3,
                      top: '50%',
                      left: '5%',
                      right: '5%',
                      transform: 'translateY(-50%)',
                      background: `linear-gradient(to right, 
                        ${alpha('#607D8B', 0.3)} 0%, 
                        ${alpha(darkTheme.accent.amber, 0.3)} 25%, 
                        ${alpha(darkTheme.accent.blue, 0.3)} 50%, 
                        ${alpha('#FF9800', 0.3)} 75%, 
                        ${alpha(darkTheme.accent.teal, 0.3)} 100%)`
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mb: 1,
                        bgcolor: alpha('#607D8B', 0.1),
                        color: '#607D8B',
                        border: '2px solid #607D8B',
                        fontSize: '0.9rem'
                      }}
                    >
                      15
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">Initiated</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mb: 1,
                        bgcolor: alpha(darkTheme.accent.amber, 0.15),
                        color: darkTheme.accent.amber,
                        border: `2px solid ${darkTheme.accent.amber}`,
                        boxShadow: `0 0 10px ${alpha(darkTheme.accent.amber, 0.3)}`,
                        fontSize: '0.9rem'
                      }}
                    >
                      13
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">Pending<br/>Approval</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mb: 1,
                        bgcolor: alpha(darkTheme.accent.blue, 0.15),
                        color: darkTheme.accent.blue,
                        border: `2px solid ${darkTheme.accent.blue}`,
                        fontSize: '0.9rem'
                      }}
                    >
                      24
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">In<br/>Transit</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mb: 1,
                        bgcolor: alpha('#FF9800', 0.15),
                        color: '#FF9800',
                        border: '2px solid #FF9800',
                        fontSize: '0.9rem'
                      }}
                    >
                      9
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">Pending<br/>Receipt</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mb: 1,
                        bgcolor: alpha(darkTheme.accent.teal, 0.15),
                        color: darkTheme.accent.teal,
                        border: `2px solid ${darkTheme.accent.teal}`,
                        fontSize: '0.9rem'
                      }}
                    >
                      28
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">Completed</Typography>
                  </Box>
                </Box>
                
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    mt: 2,
                    borderBottom: 1,
                    borderColor: 'rgba(255,255,255,0.05)',
                    '& .MuiTab-root': {
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'text.secondary',
                      textTransform: 'none',
                      minHeight: 48,
                      '&:hover': {
                        color: 'text.primary'
                      }
                    },
                    '& .Mui-selected': {
                      color: darkTheme.accent.blue + ' !important'
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: darkTheme.accent.blue,
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    }
                  }}
                >
                  <Tab label="All Transfers" value="all" />
                  <Tab label="Pending Approval" value="pending" />
                  <Tab label="In Transit" value="transit" />
                  <Tab label="Pending Receipt" value="receipt" />
                </Tabs>

                <TableContainer sx={{ mt: 2 }}>
                  <Table size="small" sx={{ 
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      py: 1.5
                    }
                  }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ID</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>TYPE</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>FROM → TO</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>DUE</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transferData.slice(0, 3).map((transfer) => {
                        const statusColor = getStatusColor(transfer.status);
                        const typeColor = getTypeColor(transfer.type);
                        return (
                          <TableRow 
                            key={transfer.id} 
                            hover 
                            sx={{ 
                              '&:hover': { 
                                bgcolor: alpha(darkTheme.accent.blue, 0.05),
                                cursor: 'pointer'
                              }
                            }}
                          >
                            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                              {transfer.id}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={transfer.type} 
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(typeColor.bg, 0.15), 
                                  color: typeColor.bg,
                                  fontWeight: 'medium',
                                  height: 22,
                                  fontSize: '0.7rem'
                                }} 
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                              {transfer.from.substring(0, 12)} → {transfer.to.substring(0, 12)}
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="caption"
                                sx={{
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  color: transfer.due === 'TODAY' ? 'error.light' : 'text.secondary',
                                  bgcolor: transfer.due === 'TODAY' ? alpha(theme.palette.error.main, 0.1) : 'transparent',
                                }}
                              >
                                {transfer.due}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                  sx={{ 
                                    width: 8, 
                                    height: 8, 
                                    borderRadius: '50%', 
                                    bgcolor: statusColor.bg,
                                    mr: 1
                                  }} 
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {transfer.status.split(' ')[0]}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
          
          {/* Priority Transfers Card */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{ 
                bgcolor: darkTheme.background.card,
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%'
              }}
            >
              <Box
                sx={{ 
                  py: 1.5, 
                  px: 3, 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ 
                    fontWeight: 500, 
                    color: 'common.white'
                  }}
                >
                  High Priority Transfers
                </Typography>
                <Chip
                  label="ACTION REQUIRED"
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.error.main, 0.2),
                    color: theme.palette.error.light,
                    fontWeight: 'medium',
                    height: 24,
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
              
              <TableContainer>
                <Table 
                  size="small" 
                  sx={{ 
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      py: 1.5
                    }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ID</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>TYPE</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ITEMS</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>DUE</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {priorityTransfers.map((transfer) => {
                      const typeColor = getTypeColor(transfer.type);
                      return (
                        <TableRow 
                          key={transfer.id} 
                          hover 
                          sx={{ 
                            '&:hover': { 
                              bgcolor: alpha(darkTheme.accent.blue, 0.05),
                              cursor: 'pointer'
                            }
                          }}
                        >
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                            {transfer.id}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={transfer.type} 
                              size="small"
                              sx={{ 
                                bgcolor: alpha(typeColor.bg, 0.15), 
                                color: typeColor.bg,
                                fontWeight: 'medium',
                                height: 22,
                                fontSize: '0.7rem'
                              }} 
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                              {transfer.items}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {transfer.fromTo}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="caption"
                              sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                color: transfer.due === 'TODAY' ? 'error.light' : 'text.secondary',
                                bgcolor: transfer.due === 'TODAY' ? alpha(theme.palette.error.main, 0.1) : 'transparent',
                              }}
                            >
                              {transfer.due}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="contained" 
                              size="small"
                              sx={{ 
                                bgcolor: darkTheme.accent.blue,
                                fontSize: '0.7rem',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                  bgcolor: alpha(darkTheme.accent.blue, 0.8),
                                }
                              }}
                            >
                              {transfer.action}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Main Content Section - Transfer Management Table */}
        <Paper
          elevation={0}
          sx={{ 
            mb: 3, 
            bgcolor: darkTheme.background.card,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{ 
              py: 1.5, 
              px: 3, 
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  fontWeight: 500, 
                  color: 'common.white',
                  mr: 2
                }}
              >
                Transfer Management
              </Typography>
              <Chip
                label="DA FORM 3161/2062"
                size="small"
                sx={{ 
                  bgcolor: alpha('#757575', 0.5),
                  color: 'text.secondary',
                  height: 22,
                  fontSize: '0.7rem'
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="text"
                startIcon={<DownloadIcon fontSize="small" />}
                size="small"
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: alpha(darkTheme.accent.teal, 0.1),
                    color: darkTheme.accent.teal
                  }
                }}
              >
                Export
              </Button>
              <Button
                variant="text"
                startIcon={<FileTextIcon fontSize="small" />}
                size="small"
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: alpha(darkTheme.accent.teal, 0.1),
                    color: darkTheme.accent.teal
                  }
                }}
              >
                Documents
              </Button>
            </Box>
          </Box>
          
          <TableContainer>
            <Table
              size="small"
              sx={{ 
                '& .MuiTableCell-root': {
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  py: 1.5
                }
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>DOC #</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>TYPE</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ITEMS</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>FROM</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>TO</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>DUE/RETURN</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>STATUS</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>PRIORITY</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transferData.map((transfer) => {
                  const statusColor = getStatusColor(transfer.status);
                  const priorityColor = getPriorityColor(transfer.priority);
                  const typeColor = getTypeColor(transfer.type);
                  return (
                    <TableRow 
                      key={transfer.id} 
                      hover
                      sx={{ 
                        '&:hover': { 
                          bgcolor: alpha(darkTheme.accent.blue, 0.05),
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                        {transfer.id}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transfer.type} 
                          size="small"
                          sx={{ 
                            bgcolor: alpha(typeColor.bg, 0.15), 
                            color: typeColor.bg,
                            fontWeight: 'medium',
                            height: 22,
                            fontSize: '0.7rem'
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                        {transfer.items}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        {transfer.from}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        {transfer.to}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            color: transfer.due === 'TODAY' ? 'error.light' : 'text.secondary',
                            bgcolor: transfer.due === 'TODAY' ? alpha(theme.palette.error.main, 0.1) : 'transparent',
                          }}
                        >
                          {transfer.due}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              bgcolor: statusColor.bg,
                              mr: 1
                            }} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            {transfer.status.split(' ')[0]}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transfer.priority} 
                          size="small"
                          sx={{ 
                            bgcolor: alpha(priorityColor.bg, 0.15), 
                            color: priorityColor.bg === theme.palette.success.dark ? theme.palette.success.light : priorityColor.bg,
                            fontWeight: 'medium',
                            height: 22,
                            fontSize: '0.7rem'
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ color: 'text.secondary' }}>
                          <MoreVerticalIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Box 
              sx={{ 
                bgcolor: alpha('#212121', 0.4), 
                p: 1.5, 
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'text.secondary',
                fontSize: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="caption">
                Displaying 5 of 89 transfers
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: darkTheme.accent.blue,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                View all transfers
              </Typography>
            </Box>
          </TableContainer>
        </Paper>
        
        {/* Activity Section */}
        <Paper
          elevation={0}
          sx={{ 
            bgcolor: darkTheme.background.card,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{ 
              py: 1.5, 
              px: 3, 
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ 
                fontWeight: 500, 
                color: 'common.white'
              }}
            >
              Recent Transfer Activity
            </Typography>
            <Button
              variant="text"
              size="small"
              sx={{ 
                color: darkTheme.accent.teal,
                fontSize: '0.75rem',
                '&:hover': {
                  bgcolor: alpha(darkTheme.accent.teal, 0.1)
                }
              }}
            >
              View full history
            </Button>
          </Box>
          
          <TableContainer>
            <Table
              size="small"
              sx={{ 
                '& .MuiTableCell-root': {
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  py: 1.5
                }
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>DATE</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>TIME</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ACTIVITY</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>DOC #</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>PERSONNEL</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>ITEMS</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActivity.map((activity, index) => (
                  <TableRow 
                    key={index} 
                    hover
                    sx={{ 
                      '&:hover': { 
                        bgcolor: alpha(darkTheme.accent.blue, 0.05),
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                      {activity.date}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      {activity.time}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                      {activity.activity}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                      {activity.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      {activity.personnel}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      {activity.items}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {activity.status === 'COMPLETE' ? (
                          <CheckCircleIcon sx={{ color: theme.palette.success.light, mr: 0.5, fontSize: 14 }} />
                        ) : activity.status === 'IN PROCESS' ? (
                          <ClockIcon sx={{ color: darkTheme.accent.amber, mr: 0.5, fontSize: 14 }} />
                        ) : (
                          <TruckIcon sx={{ color: darkTheme.accent.blue, mr: 0.5, fontSize: 14 }} />
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {activity.status}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      
    </Box>
  );
};

export default TransfersMovementPage;
