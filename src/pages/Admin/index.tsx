import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Grid, 
  Button, 
  Tabs, 
  Tab, 
  CardHeader, 
  CardContent, 
  Divider, 
  Chip, 
  Stack, 
  styled,
  useTheme
} from '@mui/material';
import { 
  Shield, 
  Storage as Server, 
  Dataset as Database, 
  Refresh as RefreshCw, 
  People as Users, 
  Settings, 
  Smartphone, 
  Lock, 
  Description as FileText, 
  Timeline as Activity, 
  Link as ExternalLink, 
  WarningAmber as AlertTriangle, 
  CheckCircle as Check 
} from '@mui/icons-material';

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  padding: 0,
  overflow: 'hidden'
}));

const CardHeaderStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
}));

const StatusText = styled(Typography)<{ status?: string }>(({ status, theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  color: status === 'operational' || status === 'secure' || status === 'connected' 
    ? theme.palette.success.main
    : status === 'warning' 
      ? theme.palette.warning.main
      : status === 'error' 
        ? theme.palette.error.main
        : theme.palette.text.primary
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  boxShadow: 'none',
  padding: '6px 16px',
  borderRadius: 0
}));

const AdminSettingsPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('userManagement');
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.background.paper, 
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="h5" component="h1" fontWeight="bold">
              Admin & Settings - B Company, 2-87 Infantry
            </Typography>
            <Typography sx={{ color: theme.palette.warning.main, fontSize: '0.875rem', fontWeight: 500 }}>
              AUTHORIZED PERSONNEL ONLY - System Configuration Access
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button 
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                '&:hover': { bgcolor: theme.palette.primary.dark }, 
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 0
              }}
              variant="contained"
            >
              System Status
            </Button>
            <Button 
              sx={{ 
                bgcolor: theme.palette.success.main, 
                '&:hover': { bgcolor: theme.palette.success.dark },
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 0
              }}
              variant="contained"
            >
              Save Changes
            </Button>
            <Button 
              sx={{ 
                bgcolor: theme.palette.grey[700], 
                '&:hover': { bgcolor: theme.palette.grey[800] },
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 0
              }}
              variant="contained"
            >
              Security Log
            </Button>
          </Stack>
        </Box>
        <Box sx={{ 
          mt: 2, 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#cbd5e1',
          fontSize: '0.875rem'
        }}>
          <Typography variant="body2">Active Users: 37</Typography>
          <Typography variant="body2">Last Configuration Change: 24FEB2025 0910 (CPT Rodriguez)</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 0.5 }}>System Status:</Typography>
            <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Operational</Typography>
          </Box>
          <Typography variant="body2">Security Level: CAC-Enforced</Typography>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 1 }}>
        {/* System Status Section - Top Row */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* System Health Dashboard Card */}
          <Grid item xs={12} md={4}>
            <DarkPaper>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Server sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">System Health Dashboard</Typography>
                </Box>
                <StatusText status="operational">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ fontSize: 16, mr: 0.5 }} />
                    Operational
                  </Box>
                </StatusText>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Overall System:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>99.9% uptime (30 days)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>External Connections:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>4/4 Active</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Database Status:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Operational</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>API Services:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Operational</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Blockchain Network:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Operational</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mt: 2, mb: 1 }}>
                  Performance Metrics
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Response Time:</Typography>
                    <Typography variant="body2" fontWeight="medium">1.2s avg</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Mobile Sync:</Typography>
                    <Typography variant="body2" fontWeight="medium">37/37 devices</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Database Sync:</Typography>
                    <Typography variant="body2" fontWeight="medium">25FEB2025 0842</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Storage:</Typography>
                    <Typography variant="body2" fontWeight="medium">42% (217GB/512GB)</Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 2, 
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  pt: 2
                }}>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Full Diagnostics
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    System Logs
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Performance Report
                  </ActionButton>
                </Box>
              </Box>
            </DarkPaper>
          </Grid>

          {/* Security Status Card */}
          <Grid item xs={12} md={4}>
            <DarkPaper>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Shield sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">Security Status</Typography>
                </Box>
                <StatusText status="secure">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ fontSize: 16, mr: 0.5 }} />
                    Secure
                  </Box>
                </StatusText>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>CAC Authentication:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Enforced</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Failed Login Attempts:</Typography>
                    <Typography variant="body2" fontWeight="medium">3 (Last 24hrs)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Password Policy:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>DOD Compliant</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Open Security Tickets:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>0</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Last Security Scan:</Typography>
                    <Typography variant="body2" fontWeight="medium">24FEB2025</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mt: 2, mb: 1 }}>
                  Classification Handling
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Data Classification:</Typography>
                    <Typography variant="body2" fontWeight="medium">FOUO</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Classification Controls:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Active</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>PII Protection:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Enforced</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Document Marking:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Automated</Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 2, 
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  pt: 2
                }}>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Security Logs
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Access Report
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Force CAC Update
                  </ActionButton>
                </Box>
              </Box>
            </DarkPaper>
          </Grid>

          {/* External System Connections */}
          <Grid item xs={12} md={4}>
            <DarkPaper>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ExternalLink sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">Military System Integration</Typography>
                </Box>
                <StatusText status="connected">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ fontSize: 16, mr: 0.5 }} />
                    Connected
                  </Box>
                </StatusText>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>GCSS-Army:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Connected</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>SAMS-E:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Connected</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>PBUSE:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Connected</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Military CAC System:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Connected</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mt: 2, mb: 1 }}>
                  Data Exchange Metrics
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Inbound Transactions:</Typography>
                    <Typography variant="body2" fontWeight="medium">217 (Last 24hrs)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Outbound Transactions:</Typography>
                    <Typography variant="body2" fontWeight="medium">143 (Last 24hrs)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Sync Success Rate:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>99.7%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Data Validation:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>100%</Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 2, 
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  pt: 2
                }}>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Sync All Systems
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Connection Settings
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    View Logs
                  </ActionButton>
                </Box>
              </Box>
            </DarkPaper>
          </Grid>
        </Grid>

        {/* Main Content Area */}
        <Grid container spacing={3}>
          {/* Left Side - Main Content */}
          <Grid item xs={12} md={9}>
            <DarkPaper>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={0} 
                  aria-label="admin tabs" 
                  indicatorColor="primary" 
                  textColor="inherit"
                  sx={{ 
                    '& .MuiTab-root': { color: '#e2e8f0' },
                    '& .Mui-selected': { color: '#60a5fa' },
                    '& .MuiTabs-indicator': { backgroundColor: '#60a5fa' }
                  }}
                >
                  <Tab icon={<Users sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="User Management" />
                  <Tab icon={<FileText sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="Unit Configuration" />
                  <Tab icon={<Settings sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="System Configuration" />
                </Tabs>
              </Box>

              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">User Management</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="contained" 
                      size="small"
                      sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
                    >
                      Add User
                    </Button>
                    <Button variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                      Deactivate Selected
                    </Button>
                    <Button variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                      Assign Roles
                    </Button>
                  </Stack>
                </Box>

                {/* Placeholder for content */}
                <Box sx={{ 
                  height: 400, 
                  backgroundColor: 'rgba(0,0,0,0.1)', 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography color="text.secondary">User Management Table Would Appear Here</Typography>
                </Box>
              </Box>
            </DarkPaper>
          </Grid>

          {/* Right Side Panel */}
          <Grid item xs={12} md={3}>
            {/* Blockchain Configuration Card */}
            <DarkPaper sx={{ mb: 3 }}>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Database sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">Blockchain Security</Typography>
                </Box>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1 }}>
                  Verification Configuration
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Network:</Typography>
                    <Typography variant="body2" fontWeight="medium">Military Secured</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Verification Level:</Typography>
                    <Typography variant="body2" fontWeight="medium">High</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Smart Contracts:</Typography>
                    <Typography variant="body2" fontWeight="medium">Enabled</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1, mt: 1 }}>
                  Document Security
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Verification Depth:</Typography>
                    <Typography variant="body2" fontWeight="medium">All Transactions</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Signature Authority:</Typography>
                    <Typography variant="body2" fontWeight="medium">Command-Based</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1, mt: 1 }}>
                  Performance Settings
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Sync Frequency:</Typography>
                    <Typography variant="body2" fontWeight="medium">Real-time</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Offline Operation:</Typography>
                    <Typography variant="body2" fontWeight="medium">Enabled (72hrs)</Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }} fullWidth>
                    Test Verification
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }} fullWidth>
                    Update Settings
                  </ActionButton>
                </Stack>
              </Box>
            </DarkPaper>

            {/* Mobile Application Management */}
            <DarkPaper sx={{ mb: 3 }}>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Smartphone sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">Mobile Device Management</Typography>
                </Box>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1 }}>
                  Device Status
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Registered Devices:</Typography>
                    <Typography variant="body2" fontWeight="medium">37</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>iOS / Android:</Typography>
                    <Typography variant="body2" fontWeight="medium">22 / 15</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Last Sync Status:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>37/37 Current</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1, mt: 1 }}>
                  Security Policies
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Biometric Auth:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Enforced</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Remote Wipe:</Typography>
                    <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'medium' }}>Enabled</Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }} fullWidth>
                    Push Update
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }} fullWidth>
                    Security Audit
                  </ActionButton>
                </Stack>
              </Box>
            </DarkPaper>

            {/* Import/Export Tools */}
            <DarkPaper>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RefreshCw sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">Data Management Tools</Typography>
                </Box>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<FileText />}
                    sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}
                  >
                    Backup Now
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<FileText />}
                    sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}
                  >
                    Import Data
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<FileText />}
                    sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}
                  >
                    Export Records
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<Activity />}
                    sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}
                  >
                    Schedule Jobs
                  </Button>
                </Stack>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />

                <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1, mt: 1 }}>
                  Legacy System Migration
                </Typography>
                <Button 
                  fullWidth 
                  variant="contained" 
                  sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
                >
                  GCSS-Army Sync
                </Button>
              </Box>
            </DarkPaper>
          </Grid>
        </Grid>

        {/* Bottom Section (Full Width) */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Audit & Compliance Card */}
          <Grid item xs={12} md={6}>
            <DarkPaper>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Lock sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">System Audit & Compliance</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StatusChip 
                    label="Compliant" 
                    color="success" 
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Button size="small" sx={{ color: '#60a5fa' }}>Details</Button>
                </Box>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1 }}>
                      Audit Log Overview
                    </Typography>
                    <Box sx={{ 
                      height: 150, 
                      backgroundColor: 'rgba(0,0,0,0.1)', 
                      borderRadius: 1,
                      p: 1,
                      overflow: 'auto'
                    }}>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        Audit logs would appear here
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1 }}>
                      Regulatory Alignment
                    </Typography>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">AR 25-2 (Info. Assurance)</Typography>
                        <StatusChip label="Compliant" color="success" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">AR 380-5 (Info. Security)</Typography>
                        <StatusChip label="Compliant" color="success" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">AR 25-400-2 (Records)</Typography>
                        <StatusChip label="Compliant" color="success" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">AR 710-2 (Supply Policy)</Typography>
                        <StatusChip label="Compliant" color="success" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">AR 735-5 (Property Accountability)</Typography>
                        <StatusChip label="Review" color="warning" size="small" />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Security Audit
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Compliance Report
                  </ActionButton>
                  <ActionButton variant="outlined" size="small" sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}>
                    Export Logs
                  </ActionButton>
                </Stack>
              </Box>
            </DarkPaper>
          </Grid>
          
          {/* System Maintenance Tools */}
          <Grid item xs={12} md={6}>
            <DarkPaper>
              <CardHeaderStyled>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Settings sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight="medium">System Maintenance</Typography>
                </Box>
              </CardHeaderStyled>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1 }}>
                      Maintenance Operations
                    </Typography>
                    <Stack spacing={1}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          justifyContent: 'space-between', 
                          color: '#e2e8f0', 
                          borderColor: '#2d3748' 
                        }}
                      >
                        <Typography variant="body2">Database Optimization</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>Last: 23FEB2025</Typography>
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          justifyContent: 'space-between', 
                          color: '#e2e8f0', 
                          borderColor: '#2d3748' 
                        }}
                      >
                        <Typography variant="body2">Cache Management</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>Last: 24FEB2025</Typography>
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          justifyContent: 'space-between', 
                          color: '#e2e8f0', 
                          borderColor: '#2d3748' 
                        }}
                      >
                        <Typography variant="body2">System Update</Typography>
                        <Typography variant="body2" sx={{ color: '#4ade80' }}>Current</Typography>
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          justifyContent: 'space-between', 
                          color: '#e2e8f0', 
                          borderColor: '#2d3748' 
                        }}
                      >
                        <Typography variant="body2">Log Rotation</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>Auto (Daily)</Typography>
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" fontWeight="medium" sx={{ color: '#94a3b8', mb: 1 }}>
                      Performance Tuning
                    </Typography>
                    <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 1 }}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="body2">CPU Usage</Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>32%</Typography>
                        </Box>
                        <Box sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 5, height: 6 }}>
                          <Box sx={{ width: '32%', bgcolor: '#4ade80', borderRadius: 5, height: 6 }} />
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="body2">Memory</Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>58%</Typography>
                        </Box>
                        <Box sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 5, height: 6 }}>
                          <Box sx={{ width: '58%', bgcolor: '#f59e0b', borderRadius: 5, height: 6 }} />
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="body2">Storage</Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>42%</Typography>
                        </Box>
                        <Box sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 5, height: 6 }}>
                          <Box sx={{ width: '42%', bgcolor: '#4ade80', borderRadius: 5, height: 6 }} />
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="body2">Network</Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>27%</Typography>
                        </Box>
                        <Box sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 5, height: 6 }}>
                          <Box sx={{ width: '27%', bgcolor: '#4ade80', borderRadius: 5, height: 6 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
                    <AlertTriangle sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Maintenance scheduled: 28FEB2025 2300</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button 
                      size="small" 
                      variant="contained" 
                      sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
                    >
                      Run Diagnostics
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ color: '#e2e8f0', borderColor: '#2d3748' }}
                    >
                      Clear Cache
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </DarkPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminSettingsPage;
