import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container,
  styled,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Transfer, TransferMetrics, TransferFilters as TransferFiltersType } from './types';
import StatusBar from './components/StatusBar';
import TransferTable from './components/TransferTable';
import TransferFilters from './components/TransferFilters';
import TransferDetailsModal from './components/TransferDetailsModal';
import InitiateTransferForm from './components/InitiateTransferForm';
import ConfirmReceiptTab from './components/ConfirmReceiptTab';
import PageTitle from '../../components/common/PageTitle';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`transfer-tabpanel-${index}`}
    aria-labelledby={`transfer-tab-${index}`}
  >
    {value === index && <Box>{children}</Box>}
  </div>
);

const Transfers: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<TransferFiltersType>({});

  // Mock data
  const mockMetrics: TransferMetrics = {
    pending: 5,
    completedToday: 10,
    awaitingApproval: 2,
  };

  const mockTransfers: Transfer[] = [
    {
      id: 'TR-001',
      from: { id: '1', name: 'John Smith', rank: 'SGT' },
      to: { id: '2', name: 'Jane Doe', rank: 'CPL' },
      items: [
        {
          id: 'ITEM-001',
          name: 'M4 Carbine',
          serialNumber: 'SN123456',
          currentCustodian: 'John Smith',
        },
      ],
      dateInitiated: '2024-02-24T10:00:00Z',
      status: 'PENDING',
    },
    // Add more mock transfers as needed
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleViewDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setDetailsModalOpen(true);
  };

  const handleConfirmTransfer = (transfer: Transfer) => {
    // Handle transfer confirmation logic
    console.log('Confirming transfer:', transfer.id);
  };

  const handleMetricClick = (status: string) => {
    setFilters({ ...filters, status: [status as any] });
    setCurrentTab(0); // Switch to My Transfers tab
  };

  const handleInitiateTransfer = (data: any) => {
    // Handle transfer initiation logic
    console.log('Initiating transfer:', data);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <PageTitle variant="h4" gutterBottom>
            TRANSFERS
          </PageTitle>
          <Typography variant="body2" color="text.secondary">
            Manage equipment transfers and track chain of custody
          </Typography>
        </Box>

        {/* Status Bar */}
        <Box sx={{ mb: 4 }}>
          <StatusBar metrics={mockMetrics} onMetricClick={handleMetricClick} />
        </Box>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="transfer tabs"
          >
            <Tab
              icon={<SwapHorizIcon />}
              label="My Transfers"
              id="transfer-tab-0"
              aria-controls="transfer-tabpanel-0"
            />
            <Tab
              icon={<AddIcon />}
              label="Initiate Transfer"
              id="transfer-tab-1"
              aria-controls="transfer-tabpanel-1"
            />
            <Tab
              icon={<CheckCircleIcon />}
              label="Confirm Receipt"
              id="transfer-tab-2"
              aria-controls="transfer-tabpanel-2"
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={currentTab} index={0}>
          <DashboardCard>
            <div className="card-header">
              <Typography variant="h6">MY TRANSFERS</Typography>
            </div>
            <div className="card-content">
              <TransferFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
              <Box sx={{ mt: 2 }}>
                <TransferTable
                  transfers={mockTransfers}
                  onViewDetails={handleViewDetails}
                  onConfirm={handleConfirmTransfer}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  totalCount={mockTransfers.length}
                  onPageChange={setPage}
                  onRowsPerPageChange={setRowsPerPage}
                />
              </Box>
            </div>
          </DashboardCard>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <DashboardCard>
            <div className="card-header">
              <Typography variant="h6">INITIATE TRANSFER</Typography>
            </div>
            <div className="card-content">
              <InitiateTransferForm onSubmit={handleInitiateTransfer} />
            </div>
          </DashboardCard>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <DashboardCard>
            <div className="card-header">
              <Typography variant="h6">CONFIRM RECEIPT</Typography>
            </div>
            <div className="card-content">
              <ConfirmReceiptTab
                pendingTransfers={mockTransfers.filter(t => t.status === 'PENDING')}
                onConfirmReceipt={handleConfirmTransfer}
              />
            </div>
          </DashboardCard>
        </TabPanel>

        {/* Modals */}
        <TransferDetailsModal
          open={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          transfer={selectedTransfer}
          onDownload={() => {/* Handle download */}}
        />
      </Box>
    </Container>
  );
};

export default Transfers; 