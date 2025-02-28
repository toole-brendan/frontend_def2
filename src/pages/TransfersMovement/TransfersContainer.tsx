import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Alert,
  AlertTitle,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  QrCode as QrCodeIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

// Import components
import {
  TransferPipelineCard,
  PriorityTransfersCard,
  TransferActivitySummary,
  TransferManagementTable,
  QRScannerPanel,
  PendingApprovalsCard,
  TransferDetailPanel
} from './components';

// Import types and mock data
import { 
  Transfer, 
  TransferStage, 
  TransferPriority, 
  TransferFilter, 
  DocumentType, 
  QRScanResult,
  TransferActivity,
  Person,
  TransferPipeline,
  TransferMetrics
} from './types';

import { 
  mockTransfers, 
  mockPipeline, 
  mockActivities, 
  mockRecentScans,
  mockPendingTransfers, 
  mockDelegates,
  mockTransferMetrics
} from './mockData';

// Container Props Interface
export interface TransfersContainerProps {
  // Data
  headerData: {
    companyInfo: string;
    pendingTransfers: number;
    incomingTransfers: number;
    outgoingTransfers: number;
    temporaryHandReceipts: number;
    totalValueTransferred: number;
  };
  pipelineData: TransferPipeline;
  priorityTransfers: Transfer[];
  pendingApprovals: Transfer[];
  recentActivities: TransferActivity[];
  qrScanResults: QRScanResult[];
  delegates: Person[];
  metrics: TransferMetrics;

  // State
  selectedTransferId: string | null;
  detailsPanelOpen: boolean;
  scannerOpen: boolean;
  filters: TransferFilter[];
  currentStage: TransferStage;

  // Event handlers
  handleInitiateTransfer: () => void;
  handleProcessReceipt: () => void;
  handleScanQRCode: () => void;
  handleViewTransferDetails: (transferId: string) => void;
  handleApproveTransfer: (transferId: string, comments?: string, delegatedTo?: string) => void;
  handleDenyTransfer: (transferId: string, reason: string) => void;
  handleGenerateDocument: (transferId: string, documentType: DocumentType) => void;
  handleScan: (serialNumber: string) => Promise<QRScanResult>;
  handleClearScans: () => void;
  handleScanToTransfer: (scan: QRScanResult) => void;
  handleFilterChange: (filters: TransferFilter[]) => void;
  handleStageChange: (stage: TransferStage) => void;
  handlePrintDocuments: () => void;
  handleTrackLocation: (transferId: string) => void;
  handleViewActivityLog: (activityId: string) => void;
  handleDelegateApproval: (transferId: string, delegateId: string) => void;
  handleBatchApprove: (transferIds: string[]) => void;
  handleExportData: (format: 'PDF' | 'CSV' | 'EXCEL') => void;
  handleVerifyBlockchain: (transferId: string) => void;

  // State setters
  setSelectedTransferId: React.Dispatch<React.SetStateAction<string | null>>;
  setDetailsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setScannerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<TransferFilter[]>>;
  setCurrentStage: React.Dispatch<React.SetStateAction<TransferStage>>;
}

// Custom hook for managing container state and logic
export const useTransfersContainer = (): TransfersContainerProps => {
  // State
  const [selectedTransferId, setSelectedTransferId] = useState<string | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [filters, setFilters] = useState<TransferFilter[]>([]);
  const [currentStage, setCurrentStage] = useState<TransferStage>(TransferStage.INITIATED);

  // Event handlers
  const handleInitiateTransfer = () => {
    console.log('Initiating new transfer');
    // Implementation
  };

  const handleProcessReceipt = () => {
    console.log('Processing receipt');
    // Implementation
  };

  const handleScanQRCode = () => {
    setScannerOpen(true);
  };

  const handleViewTransferDetails = (transferId: string) => {
    setSelectedTransferId(transferId);
    setDetailsPanelOpen(true);
  };

  const handleApproveTransfer = (transferId: string, comments?: string, delegatedTo?: string) => {
    console.log('Approving transfer', { transferId, comments, delegatedTo });
    // Implementation
  };

  const handleDenyTransfer = (transferId: string, reason: string) => {
    console.log('Denying transfer', { transferId, reason });
    // Implementation
  };

  const handleGenerateDocument = (transferId: string, documentType: DocumentType) => {
    console.log('Generating document', { transferId, documentType });
    // Implementation
  };

  const handleScan = async (serialNumber: string): Promise<QRScanResult> => {
    console.log('Scanning', serialNumber);
    // Implementation
    return {
      itemId: `ITEM-${Math.random()}`,
      serialNumber,
      success: true,
      error: undefined
    };
  };

  const handleClearScans = () => {
    console.log('Clearing scans');
    // Implementation
  };

  const handleScanToTransfer = (scan: QRScanResult) => {
    console.log('Adding scan to transfer', scan);
    // Implementation
  };

  const handleFilterChange = (newFilters: TransferFilter[]) => {
    setFilters(newFilters);
  };

  const handleStageChange = (stage: TransferStage) => {
    setCurrentStage(stage);
  };

  const handlePrintDocuments = () => {
    console.log('Printing documents');
    // Implementation
  };

  const handleTrackLocation = (transferId: string) => {
    console.log('Tracking location', transferId);
    // Implementation
  };

  const handleViewActivityLog = (activityId: string) => {
    console.log('Viewing activity', activityId);
    // Implementation
  };

  const handleDelegateApproval = (transferId: string, delegateId: string) => {
    console.log('Delegating approval', { transferId, delegateId });
    // Implementation
  };

  const handleBatchApprove = (transferIds: string[]) => {
    console.log('Batch approving', transferIds);
    // Implementation
  };

  const handleExportData = (format: 'PDF' | 'CSV' | 'EXCEL') => {
    console.log('Exporting data', format);
    // Implementation
  };

  const handleVerifyBlockchain = (transferId: string) => {
    console.log('Verifying blockchain', transferId);
    // Implementation
  };

  return {
    // Data
    headerData: {
      companyInfo: 'B Company, 2-87 Infantry',
      pendingTransfers: 13,
      incomingTransfers: 37,
      outgoingTransfers: 24,
      temporaryHandReceipts: 8,
      totalValueTransferred: 1200000
    },
    pipelineData: mockPipeline,
    priorityTransfers: mockTransfers.filter(t => t.priority === TransferPriority.HIGH),
    pendingApprovals: mockPendingTransfers,
    recentActivities: mockActivities,
    qrScanResults: mockRecentScans,
    delegates: mockDelegates,
    metrics: mockTransferMetrics,

    // State
    selectedTransferId,
    detailsPanelOpen,
    scannerOpen,
    filters,
    currentStage,

    // Event handlers
    handleInitiateTransfer,
    handleProcessReceipt,
    handleScanQRCode,
    handleViewTransferDetails,
    handleApproveTransfer,
    handleDenyTransfer,
    handleGenerateDocument,
    handleScan,
    handleClearScans,
    handleScanToTransfer,
    handleFilterChange,
    handleStageChange,
    handlePrintDocuments,
    handleTrackLocation,
    handleViewActivityLog,
    handleDelegateApproval,
    handleBatchApprove,
    handleExportData,
    handleVerifyBlockchain,

    // State setters
    setSelectedTransferId,
    setDetailsPanelOpen,
    setScannerOpen,
    setFilters,
    setCurrentStage
  };
};

// TabPanel component for tab content
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
      id={`transfers-tabpanel-${index}`}
      aria-labelledby={`transfers-tab-${index}`}
      {...other}
      style={{ 
        height: '100%',
        width: '100%',
        position: 'relative'
      }}
    >
      {value === index && (
        <Box sx={{ 
          p: 2, 
          height: '100%',
          width: '100%',
          overflow: 'auto'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Main container component
const TransfersContainer: React.FC = () => {
  const props = useTransfersContainer();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Handler for tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }}>
      <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          aria-label="transfers tabs"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Dashboard" id="transfers-tab-0" />
          <Tab label="Manage Transfers" id="transfers-tab-1" />
          <Tab label="Scan Equipment" id="transfers-tab-2" />
        </Tabs>
      </Paper>

      {/* Dashboard Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {/* Left Section - Transfer Status */}
          <Grid item xs={12} lg={9}>
            <Stack spacing={2}>
              {/* Top Row - Transfer Pipeline and Priority */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TransferPipelineCard pipeline={props.pipelineData} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PriorityTransfersCard 
                    transfers={props.priorityTransfers}
                    onViewDetails={props.handleViewTransferDetails}
                  />
                </Grid>
              </Grid>

              {/* Main Transfer Management Table */}
              <Paper sx={{ p: 2 }}>
                <TransferManagementTable
                  transfers={mockTransfers}
                  onViewDetails={props.handleViewTransferDetails}
                  onApprove={props.handleApproveTransfer}
                  onDeny={(transferId) => props.handleDenyTransfer(transferId, 'Default denial reason')}
                  onGenerateDocument={props.handleGenerateDocument}
                  activeFilters={props.filters}
                  onFilterChange={props.handleFilterChange}
                />
              </Paper>

              {/* Bottom Section - Activity Log */}
              <Paper sx={{ p: 2 }}>
                <TransferActivitySummary 
                  recentActivities={props.recentActivities}
                  onViewActivity={props.handleViewActivityLog}
                  onViewTransfer={props.handleViewTransferDetails}
                />
              </Paper>
            </Stack>
          </Grid>

          {/* Right Section - Action Panels */}
          <Grid item xs={12} lg={3}>
            <Stack spacing={2}>
              {/* QR Scanner Panel */}
              {props.scannerOpen && (
                <Paper sx={{ p: 2 }}>
                  <QRScannerPanel
                    onScan={props.handleScan}
                    onClearScans={props.handleClearScans}
                    onScanToTransfer={props.handleScanToTransfer}
                    recentScans={props.qrScanResults}
                  />
                </Paper>
              )}

              {/* Pending Approvals */}
              <Paper sx={{ p: 2 }}>
                <PendingApprovalsCard
                  pendingTransfers={props.pendingApprovals}
                  onApprove={props.handleApproveTransfer}
                  onDeny={props.handleDenyTransfer}
                  onViewTransfer={(transfer) => props.handleViewTransferDetails(transfer.id)}
                  availableDelegates={props.delegates}
                />
              </Paper>

              {/* Equipment in Transit */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Equipment in Transit
                </Typography>
                {/* TODO: Implement Equipment in Transit component */}
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Manage Transfers Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <TransferManagementTable
            transfers={mockTransfers}
            onViewDetails={props.handleViewTransferDetails}
            onApprove={props.handleApproveTransfer}
            onDeny={(transferId) => props.handleDenyTransfer(transferId, 'Default denial reason')}
            onGenerateDocument={props.handleGenerateDocument}
            activeFilters={props.filters}
            onFilterChange={props.handleFilterChange}
          />
        </Box>
      </TabPanel>

      {/* Scan Equipment Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <QRScannerPanel
            onScan={props.handleScan}
            onClearScans={props.handleClearScans}
            onScanToTransfer={props.handleScanToTransfer}
            recentScans={props.qrScanResults}
          />
        </Box>
      </TabPanel>

      {/* Transfer Detail Panel */}
      {props.detailsPanelOpen && props.selectedTransferId && (
        <TransferDetailPanel
          transfer={mockTransfers.find(t => t.id === props.selectedTransferId)!}
          onActionClick={(action, item) => console.log(`Action ${action} on`, item)}
        />
      )}
    </Box>
  );
};

export default TransfersContainer; 