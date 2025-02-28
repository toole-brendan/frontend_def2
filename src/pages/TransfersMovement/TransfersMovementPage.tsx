import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  styled
} from '@mui/material';
import {
  Add as AddIcon,
  QrCode as QrCodeIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

import {
  TransferPipelineCard,
  PriorityTransfersCard,
  TransferActivitySummary,
  TransferManagementTable,
  QRScannerPanel,
  PendingApprovalsCard,
  TransferDetailPanel
} from './components';

import { 
  TransferStage,
  Transfer,
  TransferPriority,
  TransferActivity,
  Person,
  TransferPipeline,
  DocumentType,
  QRScanResult
} from './types';

import {
  mockTransfers,
  mockPipeline,
  mockActivities,
  mockPendingTransfers,
  mockDelegates
} from './mockData';

// Styled components for layout
const PageWrapper = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 64px)', // Adjust based on your header height
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 350px',
  gridTemplateRows: 'auto 1fr auto',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  overflow: 'hidden',
}));

const MainSection = styled(Box)(({ theme }) => ({
  gridColumn: '1',
  gridRow: '1 / span 2',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  overflow: 'hidden',
}));

const SideSection = styled(Box)(({ theme }) => ({
  gridColumn: '2',
  gridRow: '1 / span 3',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  overflow: 'auto',
}));

const BottomSection = styled(Box)(({ theme }) => ({
  gridColumn: '1',
  gridRow: '3',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// Main page component
const TransfersMovementPage: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTransferId, setSelectedTransferId] = useState<string | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const steps = Object.values(TransferStage);

  // Event handlers
  const handleViewDetails = (transferId: string) => {
    setSelectedTransferId(transferId);
    setDetailsPanelOpen(true);
  };

  const handleApproveTransfer = (transferId: string, comments?: string, delegatedTo?: string) => {
    console.log('Approving transfer:', transferId, comments, delegatedTo);
  };

  const handleDenyTransfer = (transferId: string, reason: string) => {
    console.log('Denying transfer:', transferId, reason);
  };

  const handleGenerateDocument = (transferId: string, documentType: DocumentType) => {
    console.log('Generating document:', transferId, documentType);
  };

  const handleViewActivity = (activityId: string) => {
    console.log('Viewing activity:', activityId);
  };

  const handleScan = async (serialNumber: string): Promise<QRScanResult> => {
    return {
      itemId: `ITEM-${serialNumber}`,
      serialNumber,
      success: true
    };
  };

  const handleClearScans = () => {
    console.log('Clearing scans');
  };

  const handleScanToTransfer = (scan: QRScanResult) => {
    console.log('Using scan in transfer:', scan);
  };

  return (
    <PageWrapper>
      {/* Header with actions */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Transfers & Movement</Typography>
          <ButtonGroup variant="contained" size="small">
            <Button startIcon={<AddIcon />}>New Transfer</Button>
            <Button startIcon={<QrCodeIcon />} onClick={() => setScannerOpen(true)}>Scan QR</Button>
            <Button startIcon={<ReceiptIcon />}>Process Receipt</Button>
          </ButtonGroup>
        </Box>
        
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Main content */}
      <ContentWrapper>
        <MainSection>
          <StyledPaper>
            <TransferPipelineCard pipeline={mockPipeline} />
          </StyledPaper>
          <StyledPaper sx={{ flex: 1 }}>
            <TransferManagementTable
              transfers={mockTransfers}
              onViewDetails={handleViewDetails}
              onApprove={handleApproveTransfer}
              onDeny={(transferId) => handleDenyTransfer(transferId, 'Default denial reason')}
              onGenerateDocument={handleGenerateDocument}
            />
          </StyledPaper>
        </MainSection>

        <SideSection>
          <StyledPaper>
            <PendingApprovalsCard
              pendingTransfers={mockPendingTransfers}
              onApprove={handleApproveTransfer}
              onDeny={handleDenyTransfer}
              onViewTransfer={(transfer) => handleViewDetails(transfer.id)}
              availableDelegates={mockDelegates}
            />
          </StyledPaper>
          <StyledPaper>
            <PriorityTransfersCard
              transfers={mockTransfers.filter(t => t.priority === TransferPriority.HIGH)}
              onViewDetails={handleViewDetails}
            />
          </StyledPaper>
        </SideSection>

        <BottomSection>
          <StyledPaper>
            <TransferActivitySummary
              recentActivities={mockActivities}
              onViewActivity={handleViewActivity}
              onViewTransfer={handleViewDetails}
            />
          </StyledPaper>
          <StyledPaper>
            <Typography variant="h6">Document Generation</Typography>
            {/* Document generation content */}
          </StyledPaper>
        </BottomSection>
      </ContentWrapper>

      {/* Modals */}
      <TransferDetailPanel
        transfer={mockTransfers.find(t => t.id === selectedTransferId) || mockTransfers[0]}
        onActionClick={(action, item) => console.log('Action:', action, item)}
      />
      <QRScannerPanel
        onScan={handleScan}
        onClearScans={handleClearScans}
        onScanToTransfer={handleScanToTransfer}
        recentScans={[]}
      />
    </PageWrapper>
  );
};

export default TransfersMovementPage; 