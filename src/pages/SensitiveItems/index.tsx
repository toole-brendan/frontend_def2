import React from 'react';
import {
  Box,
  Paper,
  Button,
  Grid,
  Tabs,
  Tab,
  IconButton,
  useTheme
} from '@mui/material';
import {
  QrCodeScanner as QrCodeScannerIcon,
  Refresh as RefreshIcon,
  FileDownload as FileDownloadIcon,
  Shield as ShieldIcon,
  CalendarToday as CalendarIcon,
  CheckCircleOutline as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { KpiStatsCard } from '../../components/common';
import { PageContainer, PageHeader } from '../../components/layout';

// Components
import ArmsRoomCard from './components/ArmsRoomCard';
import ActionCard from './components/ActionCards';
import InventoryTable from './components/InventoryTable';
import InventoryHistoryTab from './components/InventoryHistoryTab';
import ScheduleTab from './components/ScheduleTab';
import AnalyticsTab from './components/AnalyticsTab';
import ItemDetailsModal from './components/ItemDetailsModal';
import InventoryModal from './components/InventoryModal';

// Custom hook
import useSensitiveItems from './hooks/useSensitiveItems';

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
      id={`sensitive-items-tabpanel-${index}`}
      aria-labelledby={`sensitive-items-tab-${index}`}
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

/**
 * SensitiveItems page component
 */
const SensitiveItems: React.FC = () => {
  const theme = useTheme();
  
  const {
    // UI state
    LoadingBackdrop,
    refreshData,
    
    // Data
    mockData,
    filteredItems,
    typeOptions,
    locationOptions,
    statusOptions,
    
    // Tab state
    currentTab,
    handleTabChange,
    
    // Search and filter state
    searchTerm,
    handleSearchChange,
    filterAnchorEl,
    handleFilterClick,
    handleFilterClose,
    selectedFilters,
    handleFilterChange,
    applyFilters,
    resetFilters,
    
    // Pagination state
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    
    // Modal states
    isInventoryModalOpen,
    handleInventoryModalOpen,
    handleInventoryModalClose,
    selectedItem,
    itemDetailsOpen,
    handleItemDetailsOpen,
    handleItemDetailsClose,
    actionAnchorEl,
    handleActionMenuOpen,
    handleActionMenuClose,
    
    // Scanner states
    showScanner,
    scanComplete,
    handleScannerToggle,
    simulateScanComplete
  } = useSensitiveItems();

  /**
   * Handle export to Excel
   */
  const handleExport = () => {
    console.log('Exporting sensitive items to Excel...');
    
    // In a real implementation, this would use xlsx library:
    // const workbook = XLSX.utils.book_new();
    // const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sensitive Items');
    // XLSX.writeFile(workbook, 'sensitive_items_inventory.xlsx');
    
    // Simulate export delay
    setTimeout(() => {
      // For now, we'll just mock the functionality
      alert('Exported sensitive_items_inventory.xlsx successfully!');
    }, 1500);
  };

  // Get Header actions
  const headerActions = (
    <>
      <IconButton size="small" onClick={refreshData}>
        <RefreshIcon />
      </IconButton>
      <Button 
        variant="outlined" 
        startIcon={<FileDownloadIcon />}
        onClick={handleExport}
        sx={{ borderRadius: 0 }}
      >
        Export Data
      </Button>
    </>
  );

  return (
    <>
      {/* Global loading backdrop */}
      <LoadingBackdrop />
    <PageContainer
      header={
        <PageHeader 
          title="Sensitive Items Management"
          actions={headerActions}
        />
      }
    >
      {/* Status Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
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
          <Box sx={{ position: 'relative' }}>
            <KpiStatsCard 
              icon={<QrCodeScannerIcon fontSize="small" />}
              title="Scan QR Code"
              value="Scan for Quick Verification"
              subtitle="Verify items with blockchain"
              color={theme.palette.info.main}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // First open the inventory modal, then activate the scanner
                handleInventoryModalOpen();
                setTimeout(() => {
                  handleScannerToggle();
                }, 300);
              }}
              sx={{ 
                position: 'absolute', 
                bottom: 16, 
                right: 16,
                borderRadius: 0,
                bgcolor: theme.palette.info.main
              }}
            >
              Scan
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Left Column - Arms Room and Action Cards */}
        <Grid item xs={12} md={4}>
          {/* Arms Room Status Card */}
          <ArmsRoomCard armsRoom={mockData.armsRoom} />

          {/* Conduct Inventory */}
          <ActionCard 
            icon={<AssignmentIcon />}
            title="Conduct Inventory"
            subtitle="Daily Check"
            buttonText="Start Inventory"
            color={theme.palette.primary.main}
            onClick={handleInventoryModalOpen}
          />

          {/* Weekly Status */}
          <ActionCard 
            icon={<ShieldIcon />}
            title="Weekly Status"
            subtitle="7/7 Complete"
            buttonText="View Report"
            color={theme.palette.success.main}
          />

          {/* Missing Item Alert */}
          <ActionCard 
            icon={<WarningIcon />}
            title="Missing Item Alert"
            subtitle="1 Item Pending"
            buttonText="View Details"
            color={theme.palette.error.main}
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
            {/* Current Inventory Tab */}
            <TabPanel value={currentTab} index={0} padding={0}>
              <InventoryTable 
                filteredItems={filteredItems}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                filterAnchorEl={filterAnchorEl}
                handleFilterClick={handleFilterClick}
                handleFilterClose={handleFilterClose}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleItemDetailsOpen={handleItemDetailsOpen}
                actionAnchorEl={actionAnchorEl}
                actionItem={selectedItem}
                handleActionMenuOpen={handleActionMenuOpen}
                handleActionMenuClose={handleActionMenuClose}
                typeOptions={typeOptions}
                locationOptions={locationOptions}
                statusOptions={statusOptions}
              />
            </TabPanel>

            {/* Inventory History Tab */}
            <TabPanel value={currentTab} index={1}>
              <InventoryHistoryTab 
                inventoryHistory={mockData.inventoryHistory}
              />
            </TabPanel>

            {/* Schedule Tab */}
            <TabPanel value={currentTab} index={2}>
              <ScheduleTab 
                scheduleInventories={mockData.scheduleInventories}
                handleInventoryModalOpen={handleInventoryModalOpen}
              />
            </TabPanel>

            {/* Reports & Analytics Tab */}
            <TabPanel value={currentTab} index={3}>
              <AnalyticsTab 
                analytics={mockData.analytics}
              />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Item Details Modal */}
      <ItemDetailsModal 
        selectedItem={selectedItem}
        open={itemDetailsOpen}
        onClose={handleItemDetailsClose}
      />

      {/* Inventory Modal */}
      <InventoryModal 
        open={isInventoryModalOpen}
        onClose={handleInventoryModalClose}
        showScanner={showScanner}
        scanComplete={scanComplete}
        handleScannerToggle={handleScannerToggle}
        simulateScanComplete={simulateScanComplete}
      />
    </PageContainer>
    </>
  );
};

export default SensitiveItems;
