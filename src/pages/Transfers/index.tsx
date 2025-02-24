import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
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
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
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
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom sx={{ textTransform: 'uppercase' }}>
        Transfers
      </Typography>

      {/* Status Bar */}
      <StatusBar metrics={mockMetrics} onMetricClick={handleMetricClick} />

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="transfer tabs"
          variant="fullWidth"
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
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={currentTab} index={0}>
        <TransferFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
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
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <InitiateTransferForm onSubmit={handleInitiateTransfer} />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <ConfirmReceiptTab
          pendingTransfers={mockTransfers.filter(t => t.status === 'PENDING')}
          onConfirmReceipt={handleConfirmTransfer}
          onViewDetails={handleViewDetails}
        />
      </TabPanel>

      {/* Modals */}
      <TransferDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        transfer={selectedTransfer}
        onDownload={() => {/* Handle download */}}
      />
    </Box>
  );
};

export default Transfers; 