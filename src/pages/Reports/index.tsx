import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Badge,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  LinearProgress,
  Tooltip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { 
  Calendar, 
  Clock, 
  FileText, 
  AlertTriangle, 
  Check, 
  Download, 
  Search, 
  File, 
  Edit, 
  PlusCircle, 
  ChevronRight, 
  MoreVertical, 
  Clipboard, 
  FileCheck, 
  Users, 
  AlertCircle,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';

// Import components
import { ReportFilters } from './components/ReportFilters';
import { ReportChart } from './components/ReportChart';
import { GenerateReportModal } from './components/GenerateReportModal';
import { BlockchainVerificationModal } from './components/BlockchainVerificationModal';
import { CustomReportForm } from './components/CustomReportForm';
import type { ReportType, ReportData } from './types';

// Interfaces for mock data
interface Report {
  id: number;
  type: string;
  dueDate: string;
  frequency: string;
  status: string;
  lastSubmitted: string;
  assignee: string;
  actions: string[];
}

interface PendingSignature {
  id: number;
  document: string;
  type: string;
  requestor: string;
  received: string;
  due: string;
  priority: string;
  actions: string[];
}

interface Document {
  id: string;
  type: string;
  title: string;
  created: string;
  status: string;
  lastModified: string;
  verification: string;
  actions: string[];
}

interface FLIPL {
  id: string;
  items: string;
  value: string;
  initiated: string;
  stage: string;
  assignedTo: string;
  dueDate: string;
}

interface ActivityLog {
  date: string;
  time: string;
  activity: string;
  document: string;
  personnel: string;
  action: string;
  status: string;
}

const Reports: React.FC = () => {
  // State variables
  const [tabValue, setTabValue] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>(undefined);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [openCustomReportForm, setOpenCustomReportForm] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('inventory');

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle document selection
  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  // Handle generate report modal
  const handleOpenGenerateModal = (type: ReportType) => {
    setSelectedReportType(type);
    setOpenGenerateModal(true);
  };

  const handleCloseGenerateModal = () => {
    setOpenGenerateModal(false);
  };

  const handleGenerateReport = (data: ReportData) => {
    console.log('Generated report:', data);
    setOpenGenerateModal(false);
  };

  // Handle verification modal
  const handleOpenVerificationModal = () => {
    setOpenVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setOpenVerificationModal(false);
  };

  // Handle custom report form
  const handleOpenCustomReportForm = () => {
    setOpenCustomReportForm(true);
  };

  const handleCloseCustomReportForm = () => {
    setOpenCustomReportForm(false);
  };

  // Mock data for reports
  const requiredReports: Report[] = [
    { id: 1, type: 'Supply Activity Report', dueDate: '01MAR2025', frequency: 'Monthly', status: 'Due Soon (3 days)', lastSubmitted: '01FEB2025', assignee: 'CPT Rodriguez', actions: ['Generate'] },
    { id: 2, type: 'CSDP Certification', dueDate: '15MAR2025', frequency: 'Monthly', status: 'Upcoming (18 days)', lastSubmitted: '15FEB2025', assignee: '1SG Martinez', actions: ['View'] },
    { id: 3, type: 'Sensitive Items Report', dueDate: 'COMPLETE', frequency: 'Weekly', status: 'Complete', lastSubmitted: '23FEB2025', assignee: 'CPT Rodriguez', actions: ['Review'] }
  ];

  // Mock data for documents pending signature
  const pendingSignatures: PendingSignature[] = [
    { id: 1, document: 'Hand Receipt - 3rd PLT', type: 'DA 2062', requestor: '1LT Williams', received: '24FEB2025', due: '27FEB2025', priority: 'High', actions: ['Review & Sign'] },
    { id: 2, document: 'Supply Activity Report', type: 'Command', requestor: 'BN S4', received: '25FEB2025', due: '01MAR2025', priority: 'Medium', actions: ['Review & Sign'] },
    { id: 3, document: 'JLTV Transfer', type: 'DA 3161', requestor: 'SSG Wilson', received: '23FEB2025', due: '28FEB2025', priority: 'Medium', actions: ['Review & Sign'] }
  ];

  // Mock data for document management
  const documents: Document[] = [
    { id: 'HR-B-2025-112', type: 'DA 2062', title: '1st PLT Hand Receipt', created: '21FEB2025', status: 'Active', lastModified: '21FEB2025', verification: 'Verified', actions: ['View'] },
    { id: 'TRX-2025-087', type: 'DA 3161', title: 'JLTV Transfer', created: '20FEB2025', status: 'Pending', lastModified: '24FEB2025', verification: 'Pending', actions: ['Sign'] },
    { id: 'SAR-2025-02', type: 'Custom', title: 'Supply Activity Report', created: '01FEB2025', status: 'Approved', lastModified: '03FEB2025', verification: 'Verified', actions: ['Archive'] },
    { id: 'FLIPL-2025-004', type: 'DD 200', title: 'ACOG Sight Investigation', created: '18FEB2025', status: 'In Progress', lastModified: '24FEB2025', verification: 'N/A', actions: ['Update'] }
  ];

  // Mock data for FLIPLs
  const fliplData: FLIPL[] = [
    { id: '2025-004', items: 'ACOG Sight', value: '$1,200', initiated: '18FEB2025', stage: 'Investigation', assignedTo: '1LT Morgan', dueDate: '18MAR2025' },
    { id: '2025-003', items: 'Radio Components', value: '$4,250', initiated: '12FEB2025', stage: 'Legal Review', assignedTo: 'MAJ Ellis', dueDate: '02MAR2025' }
  ];

  // Mock data for activity log
  const activityLog: ActivityLog[] = [
    { date: '25FEB2025', time: '1430', activity: 'Signature', document: '3rd PLT Hand Receipt', personnel: '1LT Williams', action: 'Signed', status: 'Complete' },
    { date: '25FEB2025', time: '1045', activity: 'Creation', document: 'PMCS Records', personnel: 'SSG Wilson', action: 'Generated', status: 'Complete' },
    { date: '24FEB2025', time: '0915', activity: 'Submission', document: 'Supply Activity Report', personnel: 'CPT Rodriguez', action: 'Submitted to BN', status: 'Pending' }
  ];

  // Generate status chip based on status
  const getStatusChip = (status: string) => {
    if (status === 'Complete' || status === 'Verified' || status === 'Active' || status === 'Approved') {
      return <Chip color="success" label={status} size="small" icon={<Check size={16} />} />;
    } else if (status === 'Pending') {
      return <Chip color="warning" label={status} size="small" />;
    } else if (status === 'Due Soon (3 days)') {
      return <Chip color="error" label={status} size="small" icon={<AlertTriangle size={16} />} />;
    } else if (status === 'Upcoming (18 days)') {
      return <Chip color="info" label={status} size="small" icon={<Clock size={16} />} />;
    } else if (status === 'In Progress') {
      return <Chip color="primary" label={status} size="small" />;
    } else {
      return <Chip label={status} size="small" />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Reports & Documentation - B Company, 2-87 Infantry
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mr: 2 }} 
              startIcon={<PlusCircle size={20} />}
              onClick={() => handleOpenGenerateModal('inventory')}
            >
              Generate New Document
            </Button>
            <Button 
              variant="outlined" 
              sx={{ mr: 2 }} 
              startIcon={<FileText size={20} />}
            >
              Required Reports
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FileCheck size={20} />}
            >
              Document Library
            </Button>
          </Grid>
        </Grid>
        
        <Alert severity="warning" sx={{ my: 2 }}>
          <Typography sx={{ fontWeight: 'semibold' }}>
            MONTHLY SUPPLY ACTIVITY REPORT DUE: 3 DAYS REMAINING
          </Typography>
        </Alert>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'medium' }}>Required Reports</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'warning.main' }}>2 pending</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'medium' }}>Documents Generated</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>43 this month</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'medium' }}>Digital Signatures Pending</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'warning.main' }}>4</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'medium' }}>Blockchain Verified</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>231/287 (80%)</Typography>
              <LinearProgress variant="determinate" value={80} sx={{ mt: 1 }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Top Row Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Required Reports Card */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Required Reports" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 240 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Report Type</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requiredReports.map((report) => (
                      <TableRow key={report.id} hover>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.dueDate}</TableCell>
                        <TableCell>{getStatusChip(report.status)}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreVertical size={16} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<FileText size={16} />}
                  onClick={() => handleOpenGenerateModal('inventory')}
                >
                  Generate Report
                </Button>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  AR 710-2, AR 735-5 compliant
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Document Generation Card */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Generate Standard Forms" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>
                Hand Receipt Forms
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label="DA Form 2062" variant="outlined" clickable />
                <Chip label="DA Form 3161" variant="outlined" clickable />
                <Chip label="DA Form 3749" variant="outlined" clickable />
              </Box>
              
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>
                Maintenance Forms
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label="DA Form 5988-E" variant="outlined" clickable />
                <Chip label="DA Form 2404" variant="outlined" clickable />
                <Chip label="DA Form 2407" variant="outlined" clickable />
              </Box>
              
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>
                Accountability Forms
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label="DD Form 200" variant="outlined" clickable />
                <Chip label="DD Form 362" variant="outlined" clickable />
                <Chip label="DA Form 4949" variant="outlined" clickable />
              </Box>
              
              <Button 
                variant="contained" 
                sx={{ mt: 1 }} 
                startIcon={<File size={16} />}
              >
                Generate Selected Form
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Document Signing Queue */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge badgeContent={4} color="error">
                    <Typography variant="h6">Pending Signatures</Typography>
                  </Badge>
                </Box>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 240 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Document</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Due</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingSignatures.map((doc) => (
                      <TableRow key={doc.id} hover>
                        <TableCell>{doc.document}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label={doc.priority} 
                            color={doc.priority === 'High' ? 'error' : 'warning'} 
                          />
                        </TableCell>
                        <TableCell>{doc.due}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="secondary" startIcon={<Edit size={16} />}>
                  Digital Signature
                </Button>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'text.secondary' }}>
                    Average signature time: 1.2 days
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {/* Document Management Table */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Document Management" 
              action={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="outlined" size="small" sx={{ mr: 2 }} startIcon={<Search size={16} />}>
                    Search
                  </Button>
                  <IconButton>
                    <MoreVertical size={20} />
                  </IconButton>
                </Box>
              }
            />
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2 }}
            >
              <Tab label="All Documents" />
              <Tab label="Hand Receipts" />
              <Tab label="Transfers" />
              <Tab label="FLIPLs" />
              <Tab label="Reports" />
            </Tabs>
            <CardContent>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Document #</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Verification</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow 
                        key={doc.id}
                        hover
                        onClick={() => handleDocumentSelect(doc)}
                        selected={!!selectedDocument && selectedDocument.id === doc.id}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell><Typography variant="body2">{doc.id}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{doc.type}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{doc.title}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{doc.created}</Typography></TableCell>
                        <TableCell>{getStatusChip(doc.status)}</TableCell>
                        <TableCell>{getStatusChip(doc.verification)}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreVertical size={16} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" size="small" startIcon={<Clipboard size={16} />}>
                  Batch Print
                </Button>
                <Button variant="outlined" size="small" startIcon={<Download size={16} />}>
                  Export Selected
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Document Viewer Panel */}
          {selectedDocument && (
            <Card sx={{ mb: 3 }}>
              <CardHeader 
                title={`Document Viewer: ${selectedDocument.title}`}
                subheader={`Document ID: ${selectedDocument.id} | Type: ${selectedDocument.type}`}
                action={
                  <Box sx={{ display: 'flex' }}>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }} startIcon={<Download size={16} />}>
                      Download
                    </Button>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }} startIcon={<Edit size={16} />}>
                      Edit
                    </Button>
                    <IconButton>
                      <MoreVertical size={20} />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    p: 6, 
                    bgcolor: 'grey.100', 
                    mb: 2 
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Document preview would appear here
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Last modified: {selectedDocument.lastModified} | Status: {selectedDocument.status}
                  </Typography>
                    <Chip 
                      label="Blockchain Verified" 
                      size="small" 
                      color="success" 
                      icon={<Check size={16} />} 
                      variant={selectedDocument.verification === 'Verified' ? 'filled' : 'outlined'}
                      onClick={handleOpenVerificationModal}
                      sx={{ cursor: 'pointer' }}
                    />
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Document Activity Log */}
          <Card>
            <CardHeader 
              title="Document Activity Log" 
              action={
                <IconButton>
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Activity</TableCell>
                      <TableCell>Document</TableCell>
                      <TableCell>Personnel</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activityLog.map((activity, index) => (
                      <TableRow key={index} hover>
                        <TableCell><Typography variant="body2">{activity.date}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{activity.time}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{activity.activity}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{activity.document}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{activity.personnel}</Typography></TableCell>
                        <TableCell>{getStatusChip(activity.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="outlined" size="small" startIcon={<FileText size={16} />}>
                View Complete Log
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side Panel */}
        <Grid item xs={12} lg={4}>
          {/* Report Visualization Card */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Report Visualizations" 
              action={
                <IconButton>
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <ReportChart type="inventory" />
            </CardContent>
          </Card>

          {/* Document Analytics Card */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Documentation Metrics" 
              action={
                <IconButton>
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>92%</Typography>
                  <Typography variant="caption">Digital vs. Paper</Typography>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>1.3</Typography>
                  <Typography variant="caption">Avg. Processing Days</Typography>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>94%</Typography>
                  <Typography variant="caption">Error Reduction</Typography>
                </Paper>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  p: 3, 
                  bgcolor: 'grey.100', 
                  mb: 2,
                  height: 200
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <PieChartIcon size={60} color="#9e9e9e" style={{ opacity: 0.6 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    Document volume by type chart
                  </Typography>
                </Box>
              </Box>
              
              <Button 
                variant="outlined" 
                size="small" 
                fullWidth 
                startIcon={<BarChartIcon size={16} />}
                onClick={handleOpenCustomReportForm}
              >
                Custom Analysis
              </Button>
            </CardContent>
          </Card>

          {/* FLIPL Tracker Card */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Financial Liability Investigations" 
              action={
                <IconButton>
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Open investigations:</strong> 2 | <strong>Total value:</strong> $5,450
                </Typography>
              </Alert>
              
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>FLIPL #</TableCell>
                      <TableCell>Item(s)</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Stage</TableCell>
                      <TableCell>Due Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fliplData.map((flipl) => (
                      <TableRow key={flipl.id} hover>
                        <TableCell><Typography variant="body2">{flipl.id}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{flipl.items}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{flipl.value}</Typography></TableCell>
                        <TableCell><Chip size="small" label={flipl.stage} /></TableCell>
                        <TableCell><Typography variant="body2">{flipl.dueDate}</Typography></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Button 
                variant="contained" 
                color="warning" 
                size="small" 
                fullWidth 
                startIcon={<AlertCircle size={16} />}
              >
                Initiate FLIPL
              </Button>
            </CardContent>
          </Card>

          {/* Army Systems Integration Card */}
          <Card>
            <CardHeader 
              title="External Systems Integration" 
              action={
                <IconButton>
                  <MoreVertical size={20} />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Integration Status</Typography>
                <Paper sx={{ p: 2, mb: 1, bgcolor: 'success.light' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">GCSS-Army</Typography>
                    <Chip label="Connected" size="small" color="success" icon={<Check size={16} />} />
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, mb: 1, bgcolor: 'success.light' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">PBUSE Property Records</Typography>
                    <Chip label="Connected" size="small" color="success" icon={<Check size={16} />} />
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, mb: 1, bgcolor: 'warning.light' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Army Electronic Forms</Typography>
                    <Chip label="Sync Pending" size="small" color="warning" />
                  </Box>
                </Paper>
              </Box>
              
              <Typography 
                variant="caption" 
                sx={{ display: 'block', color: 'text.secondary', mb: 1 }}
              >
                Last Successful Sync: 25FEB2025 0842 | Documents Pending Upload: 3
              </Typography>
              
              <Button variant="outlined" size="small" fullWidth>
                Force Sync
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modals */}
      <GenerateReportModal
        open={openGenerateModal}
        onClose={handleCloseGenerateModal}
        onGenerate={handleGenerateReport}
      />

      {openVerificationModal && selectedDocument && (
        <BlockchainVerificationModal
          open={openVerificationModal}
          onClose={handleCloseVerificationModal}
          report={{
            id: selectedDocument.id,
            type: selectedDocument.type,
            title: selectedDocument.title,
            createdAt: selectedDocument.created,
            createdBy: {
              name: 'CPT John Doe',
              rank: 'CPT',
              unit: 'B Company, 2-87 Infantry'
            },
            lastGenerated: selectedDocument.lastModified,
            format: 'PDF',
            status: selectedDocument.status.toLowerCase() as any,
            blockchainHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
            blockchainRecords: [
              {
                transactionId: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
                action: 'REPORT_CREATED',
                timestamp: selectedDocument.created,
                personnel: {
                  name: 'CPT John Doe',
                  rank: 'CPT',
                  unit: 'B Company, 2-87 Infantry'
                },
                details: {
                  operation: 'Document Generation',
                  system: 'Property Book System'
                }
              },
              {
                transactionId: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
                action: 'REPORT_UPDATED',
                timestamp: selectedDocument.lastModified,
                personnel: {
                  name: 'CPT John Doe',
                  rank: 'CPT',
                  unit: 'B Company, 2-87 Infantry'
                },
                details: {
                  operation: 'Document Verification',
                  system: 'Blockchain Verification System'
                }
              }
            ]
          }}
        />
      )}

      {/* Custom Report Form Dialog */}
      <Dialog
        open={openCustomReportForm}
        onClose={handleCloseCustomReportForm}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Custom Report</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <CustomReportForm
              onGenerate={() => {
                handleCloseCustomReportForm();
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Reports;
