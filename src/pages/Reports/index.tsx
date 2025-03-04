import React, { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  useTheme,
  Snackbar,
  Alert,
  Divider,
  Avatar,
  alpha
} from '@mui/material';
import { 
  AlertTriangle, 
  Check, 
  Edit, 
  FileCheck, 
  AlertCircle,
  Plus,
  RefreshCw,
  Filter
} from 'lucide-react';
import { PageContainer, PageHeader } from '../../components/layout';
import { 
  ReportsList, 
  ReportFilters,
  ReportMetricsCard,
  PendingApprovals,
  ActivityTracker,
  ReportChart,
  ReportHistoryTimeline,
  BlockchainVerificationModal,
  CustomReportForm,
  GenerateReportModal,
  ReportGenerator
} from './components';
import { buttonSx, paperSx, sectionHeaderSx, cardWithCornerSx } from './styles';
import { ReportData, FilterConfig, ReportStatus, ReportType } from './types';
import { mockReports, mockReportMetrics } from './mockData';
import { filterReports } from './utils';

// Action notification states
type ActionType = 'success' | 'info' | 'warning' | 'error';
interface NotificationState {
  open: boolean;
  message: string;
  type: ActionType;
}

// Dialog states
interface DialogState {
  open: boolean;
  title: string;
  content: React.ReactNode | string;
  action?: () => void;
  actionText?: string;
}

// Tab Panel component
function TabPanel(props: { 
  children: React.ReactNode; 
  value: number; 
  index: number; 
  padding?: number 
}) {
  const { children, value, index, padding = 2, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: padding }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Reports: React.FC = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [reports, setReports] = useState<ReportData[]>(mockReports);
  const [filteredReports, setFilteredReports] = useState<ReportData[]>(mockReports);
  // @ts-ignore - Unused variable intentionally kept
  const [filters, setFilters] = useState<FilterConfig>({
    status: [],
    type: [],
    dateRange: {
      start: null,
      end: null
    },
    searchTerm: ''
  });
  
  // Modal states
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  
  // Action handling states
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    type: 'info'
  });
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: '',
    content: ''
  });
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Tab handling
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Filter handling
  const handleFilterChange = useCallback((newFilters: FilterConfig) => {
    setFilters(newFilters);
    
    let filtered = [...mockReports];
    
    // Apply search term filter
    if (newFilters.searchTerm) {
      filtered = filterReports(filtered, newFilters.searchTerm);
    }
    
    // Apply status filter
    if (newFilters.status.length > 0) {
      filtered = filtered.filter(report => 
        newFilters.status.includes(report.status as ReportStatus)
      );
    }
    
    // Apply type filter
    if (newFilters.type.length > 0) {
      filtered = filtered.filter(report => 
        newFilters.type.includes(report.type as any)
      );
    }
    
    // Apply date range filter
    if (newFilters.dateRange.start || newFilters.dateRange.end) {
      filtered = filtered.filter(report => {
        const createdAt = new Date(report.createdAt).getTime();
        const startDate = newFilters.dateRange.start 
          ? new Date(newFilters.dateRange.start).getTime() 
          : 0;
        const endDate = newFilters.dateRange.end 
          ? new Date(newFilters.dateRange.end).getTime() 
          : Infinity;
        
        return createdAt >= startDate && createdAt <= endDate;
      });
    }
    
    setFilteredReports(filtered);
  }, []);

  // Report actions
  const handleViewReport = (report: ReportData) => {
    setSelectedReport(report);
    setNotification({
      open: true,
      message: `Viewing report: ${report.title}`,
      type: 'info'
    });
  };

  const handleDownloadReport = (report: ReportData) => {
    setNotification({
      open: true,
      message: `Downloading ${report.format} report: ${report.title}`,
      type: 'success'
    });
  };

  const handleEditReport = (report: ReportData) => {
    setSelectedReport(report);
    setDialog({
      open: true,
      title: 'Edit Report',
      content: `You are about to edit the report: ${report.title}`,
      action: () => {
        setNotification({
          open: true,
          message: `Report "${report.title}" is now being edited`,
          type: 'info'
        });
        setDialog({ open: false, title: '', content: '' });
      },
      actionText: 'Continue'
    });
  };

  const handleCreateNewReport = () => {
    setGenerateModalOpen(true);
  };

  const handleMoreOptions = (report: ReportData, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedReport(report);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleApprove = () => {
    if (selectedReport) {
      setNotification({
        open: true,
        message: `Report "${selectedReport.title}" has been approved`,
        type: 'success'
      });
      handleMenuClose();
    }
  };

  const handleReject = () => {
    if (selectedReport) {
      setDialog({
        open: true,
        title: 'Reject Report',
        content: 'Please provide a reason for rejecting this report:',
        action: () => {
          setNotification({
            open: true,
            message: `Report "${selectedReport.title}" has been rejected`,
            type: 'warning'
          });
          setDialog({ open: false, title: '', content: '' });
          handleMenuClose();
        },
        actionText: 'Reject Report'
      });
    }
  };

  const handleDelete = () => {
    if (selectedReport) {
      setDialog({
        open: true,
        title: 'Delete Report',
        content: `Are you sure you want to delete the report "${selectedReport.title}"? This action cannot be undone.`,
        action: () => {
          // In a real app, we would call an API to delete the report
          const updatedReports = reports.filter(report => report.id !== selectedReport.id);
          setReports(updatedReports);
          setFilteredReports(filteredReports.filter(report => report.id !== selectedReport.id));
          
          setNotification({
            open: true,
            message: `Report "${selectedReport.title}" has been deleted`,
            type: 'success'
          });
          setDialog({ open: false, title: '', content: '' });
          handleMenuClose();
        },
        actionText: 'Delete'
      });
    }
  };

  const handleVerifyBlockchain = () => {
    if (selectedReport) {
      setVerificationModalOpen(true);
      handleMenuClose();
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      open: false
    });
  };

  const refreshData = () => {
    setNotification({
      open: true,
      message: 'Refreshing reports data...',
      type: 'info'
    });
    
    // In a real app, we would fetch fresh data from the API
    setTimeout(() => {
      setNotification({
        open: true,
        message: 'Reports data refreshed successfully',
        type: 'success'
      });
    }, 1000);
  };

  // Get Header actions
  const headerActions = (
    <>
      <IconButton size="small" onClick={refreshData}>
        <RefreshCw size={18} />
      </IconButton>
      <Button 
        variant="outlined" 
        startIcon={<Plus size={18} />}
        onClick={handleCreateNewReport}
        sx={buttonSx}
      >
        New Report
      </Button>
    </>
  );

  return (
    <PageContainer
      header={
        <PageHeader 
          title="Reports Management"
          actions={headerActions}
        />
      }
    >
      {/* Summary Section - Similar to PropertyBook */}
      <Paper sx={{ 
        p: 2, 
        mb: 3,
        bgcolor: theme.palette.mode === 'dark' ? '#121212' : theme.palette.background.paper,
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary
      }}>
        <Typography variant="h6" gutterBottom>REPORT SUMMARY</Typography>
        <Typography variant="body2" sx={{ 
          mb: 2, 
          color: theme.palette.mode === 'dark' ? 'text.secondary' : alpha(theme.palette.text.primary, 0.7) 
        }}>
          Overview of report status and metrics
        </Typography>
        
        <Divider sx={{ 
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
          my: 2 
        }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Reports:</Typography>
                <Typography variant="h6">{mockReports.length}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Pending Approval:</Typography>
                <Typography variant="h6">
                  {mockReports.filter(r => r.status === 'pending').length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Last Generated:</Typography>
                <Typography variant="h6">
                  {new Date(Math.max(...mockReports.map(r => new Date(r.createdAt).getTime())))
                    .toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Blockchain Verified:</Typography>
                <Typography variant="h6">
                  {mockReports.filter(r => r.blockchainHash).length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ 
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
          my: 2 
        }} />
      </Paper>

      {/* Tabs Navigation - Similar to SensitiveItems */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, px: 1 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Reports" />
          <Tab label="Pending Approval" />
          <Tab label="Report Analytics" />
          <Tab label="Scheduled Reports" />
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <TabPanel value={currentTab} index={0}>
        <Grid container spacing={3}>
          {/* Left Column - Status Cards and Filters */}
          <Grid item xs={12} md={4} lg={3}>
            <ReportMetricsCard 
              title="Report Metrics" 
              metrics={{
                totalItems: mockReportMetrics.inventory.totalItems,
                itemsInGoodCondition: mockReportMetrics.inventory.itemsInGoodCondition,
                itemsNeedingMaintenance: mockReportMetrics.inventory.itemsNeedingMaintenance,
                criticalItems: mockReportMetrics.inventory.criticalItems
              }} 
            />
            
            <Paper sx={paperSx(theme)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Report Filters
                </Typography>
                <ReportFilters onFilterChange={handleFilterChange} />
              </Box>
            </Paper>
            
            <Paper sx={{...cardWithCornerSx(theme, theme.palette.warning.main), mt: 3}}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Generate Report
                </Typography>
                <ReportGenerator onGenerate={(_: ReportType) => {
                  handleCloseDialog();
                  setNotification({
                    open: true,
                    message: 'Report generation initiated successfully',
                    type: 'success'
                  });
                }} />
              </Box>
            </Paper>
          </Grid>
          
          {/* Right Column - Reports List */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={paperSx(theme)}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={sectionHeaderSx}>
                    Reports List
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      startIcon={<Filter size={16} />}
                      size="small"
                      sx={{ ...buttonSx, borderRadius: '4px' }}
                    >
                      Filter
                    </Button>
                    <Button
                      startIcon={<Plus size={16} />}
                      variant="contained"
                      size="small"
                      onClick={handleCreateNewReport}
                      sx={{ ...buttonSx, borderRadius: '4px' }}
                    >
                      New Report
                    </Button>
                  </Box>
                </Box>
                <ReportsList 
                  reports={filteredReports}
                  onViewReport={handleViewReport}  
                  onDownloadReport={handleDownloadReport}
                  onEditReport={handleEditReport}
                  onMoreOptions={handleMoreOptions}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={currentTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={paperSx(theme)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Pending Approvals
                </Typography>
                <PendingApprovals
                  reports={mockReports.filter(report => report.status === 'pending')}
                  onApproveReport={handleApprove}
                  onRejectReport={handleReject}
                  onViewReport={handleViewReport}
                />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={cardWithCornerSx(theme, theme.palette.info.main)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Blockchain Verification
                </Typography>
                {selectedReport && (
                  <ReportHistoryTimeline 
                    history={selectedReport.blockchainRecords || []}
                  />
                )}
                {!selectedReport && (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                    Select a report to view its blockchain history
                  </Typography>
                )}
              </Box>
            </Paper>
            
            <Paper sx={{...paperSx(theme), mt: 3}}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Activity Tracker
                </Typography>
                <ActivityTracker activities={[]} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={currentTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={paperSx(theme)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Report Analytics
                </Typography>
                <ReportChart type="inventory" />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={paperSx(theme)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Report Metrics
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Reports
                  </Typography>
                  <Typography variant="h3" color="primary.main">
                    {mockReports.length}
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Approved
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                          bgcolor: alpha(theme.palette.success.main, 0.2), 
                          color: theme.palette.success.main,
                          width: 32,
                          height: 32,
                          borderRadius: 1
                        }}>
                          <Check size={16} />
                        </Avatar>
                        <Typography variant="h5" color="success.main">
                          {mockReports.filter(r => r.status === 'approved').length}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Pending
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                          bgcolor: alpha(theme.palette.warning.main, 0.2), 
                          color: theme.palette.warning.main,
                          width: 32,
                          height: 32,
                          borderRadius: 1
                        }}>
                          <AlertTriangle size={16} />
                        </Avatar>
                        <Typography variant="h5" color="warning.main">
                          {mockReports.filter(r => r.status === 'pending').length}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Rejected
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                          bgcolor: alpha(theme.palette.error.main, 0.2), 
                          color: theme.palette.error.main,
                          width: 32,
                          height: 32,
                          borderRadius: 1
                        }}>
                          <AlertCircle size={16} />
                        </Avatar>
                        <Typography variant="h5" color="error.main">
                          {mockReports.filter(r => r.status === 'rejected').length}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Draft
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                          bgcolor: alpha(theme.palette.info.main, 0.2), 
                          color: theme.palette.info.main,
                          width: 32,
                          height: 32,
                          borderRadius: 1
                        }}>
                          <Edit size={16} />
                        </Avatar>
                        <Typography variant="h5" color="info.main">
                          {mockReports.filter(r => r.status === 'draft').length}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={cardWithCornerSx(theme, theme.palette.primary.main)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Create Custom Report
                </Typography>
                <CustomReportForm
                  onSubmit={(data: any) => {
                    setNotification({
                      open: true,
                      message: `Custom report "${data.reportName}" has been created`,
                      type: 'success'
                    });
                  }}
                  onCancel={() => {}}
                />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={paperSx(theme)}>
              <Box sx={{ p: 2 }}>
                <Typography sx={sectionHeaderSx}>
                  Scheduled Reports
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  View and manage your scheduled report generation
                </Typography>
                
                {/* Content would go here */}
                <Typography variant="body1" sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                  Scheduled reports feature coming soon
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleApprove}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Check size={16} />
            <Typography>Approve</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleReject}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AlertTriangle size={16} />
            <Typography>Reject</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleVerifyBlockchain}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FileCheck size={16} />
            <Typography>Verify on Blockchain</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'error.main' }}>
            <AlertCircle size={16} />
            <Typography>Delete</Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Modals */}
      {selectedReport && (
        <BlockchainVerificationModal
          open={verificationModalOpen}
          onClose={() => setVerificationModalOpen(false)}
          report={{
            id: selectedReport.id,
            title: selectedReport.title,
            description: selectedReport.description,
            type: selectedReport.type,
            status: selectedReport.status === 'published' ? 'approved' : selectedReport.status,
            createdAt: selectedReport.createdAt,
            updatedAt: selectedReport.updatedAt || selectedReport.createdAt,
            createdBy: {
              id: '1',
              name: selectedReport.createdBy.name
            }
          }}
        />
      )}
      
      <GenerateReportModal
        open={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        onGenerate={(config: any) => {
          setNotification({
            open: true,
            message: `New ${config.reportType} report is being generated`,
            type: 'success'
          });
          setGenerateModalOpen(false);
        }}
      />

      {/* Notifications and Dialogs */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialog.open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          {typeof dialog.content === 'string' ? (
            <Typography>{dialog.content}</Typography>
          ) : (
            dialog.content
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialog.action && (
            <Button onClick={dialog.action} variant="contained">
              {dialog.actionText || 'Confirm'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Reports;
