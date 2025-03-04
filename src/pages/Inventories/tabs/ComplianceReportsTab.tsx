import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Description as DocumentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { InventoryComplianceCard } from '../components';

const ComplianceReportsTab: React.FC = () => {
  const theme = useTheme();

  // Mock data for compliance items
  const complianceItems = [
    {
      type: 'Sensitive Items',
      requirement: 'Weekly',
      frequency: 'Every 7 days',
      lastConducted: '20 FEB 2025',
      nextDue: '27 FEB 2025',
      status: 'Due Soon',
      statusType: 'warning'
    },
    {
      type: 'Weapons',
      requirement: 'Monthly',
      frequency: 'Every 30 days',
      lastConducted: '05 FEB 2025',
      nextDue: '05 MAR 2025',
      status: 'On Track',
      statusType: 'success'
    },
    {
      type: 'Communication Equipment',
      requirement: 'Monthly',
      frequency: 'Every 30 days',
      lastConducted: '12 FEB 2025',
      nextDue: '12 MAR 2025',
      status: 'On Track',
      statusType: 'success'
    },
    {
      type: 'Vehicles',
      requirement: 'Quarterly',
      frequency: 'Every 90 days',
      lastConducted: '15 JAN 2025',
      nextDue: '15 APR 2025',
      status: 'On Track',
      statusType: 'success'
    },
    {
      type: 'Cyclic 10%',
      requirement: 'Monthly',
      frequency: '10% of inventory',
      lastConducted: '05 FEB 2025',
      nextDue: '05 MAR 2025',
      status: '68% Complete',
      statusType: 'info'
    },
    {
      type: 'CSDP',
      requirement: 'Annual',
      frequency: 'Yearly',
      lastConducted: '10 OCT 2024',
      nextDue: '10 OCT 2025',
      status: 'Compliant',
      statusType: 'success'
    }
  ];

  // Mock data for historical reports
  const historicalReports = [
    {
      title: 'Monthly CSDP Compliance Report',
      date: '01 FEB 2025',
      author: 'CPT Rodriguez',
      format: 'PDF',
      status: 'Completed'
    },
    {
      title: 'Quarterly Inventory Status Report',
      date: '15 JAN 2025',
      author: '1LT Chen',
      format: 'PDF',
      status: 'Completed'
    },
    {
      title: 'Annual Property Accountability Assessment',
      date: '12 DEC 2024',
      author: 'MAJ Thompson',
      format: 'PDF',
      status: 'Completed'
    },
    {
      title: 'Change of Command Inventory Report',
      date: '15 NOV 2024',
      author: 'LTC Rodriguez',
      format: 'PDF',
      status: 'Completed'
    }
  ];

  // Function to render status chip
  const renderStatusChip = (status: string, type: string) => {
    let color: 'error' | 'warning' | 'info' | 'success' | 'default' = 'default';
    
    switch(type) {
      case 'success':
        color = 'success';
        break;
      case 'warning':
        color = 'warning';
        break;
      case 'info':
        color = 'info';
        break;
      case 'error':
        color = 'error';
        break;
    }
    
    return (
      <Chip 
        label={status} 
        color={color}
        size="small"
        sx={{ 
          borderRadius: 0, 
          fontWeight: 'medium',
          fontSize: '0.7rem',
          height: 20
        }}
      />
    );
  };

  // Calculate overall compliance score
  const complianceScore = 87; // This would be calculated based on actual data

  return (
    <Box>
      {/* Compliance Overview */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          mb: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4
        }}
      >
        {/* Compliance Score */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress 
              variant="determinate" 
              value={complianceScore} 
              size={80}
              thickness={4}
              sx={{
                color: complianceScore > 90 
                  ? theme.palette.success.main 
                  : complianceScore > 70 
                    ? theme.palette.warning.main 
                    : theme.palette.error.main,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                {complianceScore}%
              </Typography>
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'medium', mb: 0.5 }}>
              Compliance Score
            </Typography>
            <Typography variant="body2" color="text.secondary">
              5 of 6 inventory types are fully compliant
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'inline-block', 
                mt: 1,
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                px: 1,
                py: 0.5,
                borderRadius: 0,
                fontWeight: 'medium'
              }}
            >
              ACTION REQUIRED: Sensitive Items due in 2 days
            </Typography>
          </Box>
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Divider sx={{ width: '100%', display: { xs: 'block', md: 'none' } }} />
        
        {/* Quick Stats */}
        <Box sx={{ display: 'flex', gap: 4, flexGrow: 1, justifyContent: 'space-around' }}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              TOTAL INVENTORIES
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
              6
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              COMPLIANT
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'medium', color: theme.palette.success.main }}>
              5
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              ATTENTION NEEDED
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'medium', color: theme.palette.warning.main }}>
              1
            </Typography>
          </Box>
        </Box>
        
        {/* Actions */}
        <Box>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              borderRadius: 0,
              fontWeight: 'medium',
              letterSpacing: '0.03em'
            }}
          >
            Generate Report
          </Button>
        </Box>
      </Paper>

      {/* Compliance Table */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1)
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            Compliance Status
          </Typography>
          <Button
            startIcon={<PrintIcon />}
            size="small"
            sx={{
              borderRadius: 0,
              fontWeight: 'medium',
              letterSpacing: '0.03em'
            }}
          >
            Print
          </Button>
        </Box>
        
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Inventory Type</TableCell>
                <TableCell>Requirement</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Last Conducted</TableCell>
                <TableCell>Next Due</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complianceItems.map((item, index) => (
                <TableRow 
                  key={index}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="medium">
                      {item.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.requirement}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.frequency}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {item.lastConducted}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: item.statusType === 'warning' ? 'bold' : 'normal',
                        color: item.statusType === 'warning' ? theme.palette.error.main : 'inherit'
                      }}
                    >
                      {item.nextDue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {renderStatusChip(item.status, item.statusType)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant={item.statusType === 'warning' ? 'contained' : 'outlined'}
                      sx={{
                        borderRadius: 0,
                        minWidth: '80px',
                        fontSize: '0.7rem',
                        fontWeight: 'medium'
                      }}
                    >
                      {item.statusType === 'warning' ? 'Start' : 'View'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Historical Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              border: '1px solid', 
              borderColor: alpha(theme.palette.divider, 0.1),
              borderRadius: 0
            }}
          >
            <CardHeader 
              title="Historical Reports" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              action={
                <Button
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: 0,
                    fontWeight: 'medium',
                    letterSpacing: '0.03em'
                  }}
                >
                  Save As Template
                </Button>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Report Title</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historicalReports.map((report, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04)
                          }
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PdfIcon fontSize="small" sx={{ mr: 1, color: theme.palette.error.main }} />
                            <Typography variant="body2" fontWeight="medium">
                              {report.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {report.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {report.author}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={report.format}
                            size="small"
                            sx={{ 
                              borderRadius: 0, 
                              fontWeight: 'medium',
                              fontSize: '0.7rem',
                              height: 20,
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                              color: theme.palette.error.main
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            startIcon={<DownloadIcon fontSize="small" />}
                            size="small"
                            sx={{
                              borderRadius: 0,
                              minWidth: '100px',
                              fontSize: '0.7rem',
                              fontWeight: 'medium'
                            }}
                          >
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              border: '1px solid', 
              borderColor: alpha(theme.palette.divider, 0.1),
              borderRadius: 0
            }}
          >
            <CardHeader 
              title="Generate New Report" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            />
            <CardContent sx={{ pt: 0 }}>
              <List disablePadding>
                <ListItem 
                  button 
                  sx={{ 
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon>
                    <DocumentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Monthly Compliance Report"
                    secondary="Summary of all inventory compliance statuses"
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem 
                  button 
                  sx={{ 
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon>
                    <DocumentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Detailed Inventory Status"
                    secondary="Complete inventory record with serial numbers"
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem 
                  button 
                  sx={{ 
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon>
                    <DocumentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Discrepancy Report"
                    secondary="List of all unresolved inventory discrepancies"
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem 
                  button 
                  sx={{ 
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon>
                    <DocumentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Custom Report"
                    secondary="Build a report with selected parameters"
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<PdfIcon />}
                  fullWidth
                  sx={{
                    borderRadius: 0,
                    fontWeight: 'medium',
                    letterSpacing: '0.03em'
                  }}
                >
                  Create Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplianceReportsTab; 