import { useState, useEffect, useCallback } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import mockData from '../utils/mockData';
import { SensitiveItem, FilterState } from '../../../types/sensitiveItems';

/**
 * Custom hook for managing sensitive items state
 */
const useSensitiveItems = () => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  // Tab state
  const [currentTab, setCurrentTab] = useState(0);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredItems, setFilteredItems] = useState(mockData.sensitiveItems);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    type: 'All',
    location: 'All',
    status: 'All'
  });
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Modal states
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SensitiveItem | null>(null);
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false);
  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [actionItem, setActionItem] = useState<SensitiveItem | null>(null);
  
  // Scanner states
  const [showScanner, setShowScanner] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // Filter options
  const typeOptions = ['All', 'Weapon', 'Optic', 'Comms', 'Crypto', 'Electronics'];
  const locationOptions = ['All', 'Arms Room', 'Range Control', 'Comms Cage', 'S-2 Vault', 'Maintenance'];
  const statusOptions = ['All', 'Verified', 'Pending Verification', 'In Repair'];

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter menu open
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  // Handle filter menu close
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Handle filter changes
  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [type]: value
    });
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = mockData.sensitiveItems;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilters.type !== 'All') {
      filtered = filtered.filter(item => item.type === selectedFilters.type);
    }

    if (selectedFilters.location !== 'All') {
      filtered = filtered.filter(item => item.location === selectedFilters.location);
    }

    if (selectedFilters.status !== 'All') {
      filtered = filtered.filter(item => item.status === selectedFilters.status);
    }

    setFilteredItems(filtered);
    handleFilterClose();
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedFilters({
      type: 'All',
      location: 'All',
      status: 'All'
    });
    setSearchTerm('');
    setFilteredItems(mockData.sensitiveItems);
    handleFilterClose();
  };

  // Handle inventory modal
  const handleInventoryModalOpen = () => {
    setIsInventoryModalOpen(true);
  };

  const handleInventoryModalClose = () => {
    setIsInventoryModalOpen(false);
    setScanComplete(false);
  };

  // Handle item details modal
  const handleItemDetailsOpen = (item: SensitiveItem) => {
    setSelectedItem(item);
    setItemDetailsOpen(true);
  };

  const handleItemDetailsClose = () => {
    setItemDetailsOpen(false);
  };

  // Handle action menu
  const handleActionMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, item: SensitiveItem) => {
    setActionAnchorEl(event.currentTarget);
    setActionItem(item);
  };

  const handleActionMenuClose = () => {
    setActionAnchorEl(null);
  };

  // Handle pagination
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle QR scanner
  const handleScannerToggle = () => {
    setShowScanner(!showScanner);
  };

  // Simulate scan complete
  const simulateScanComplete = useCallback(() => {
    setIsVerifying(true);
    setTimeout(() => {
      setScanComplete(true);
      setIsVerifying(false);
    }, 1500);
  }, []);
  
  // Simulate data loading
  const refreshData = useCallback(() => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false);
      // In a real implementation, this would fetch fresh data from the API
      console.log('Data refreshed');
    }, 1000);
  }, []);

  // Apply initial filters
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedFilters]);

  // Global loading backdrop
  const LoadingBackdrop = () => (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading || isExporting}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return {
    // Loading states
    isLoading,
    setIsLoading,
    isVerifying,
    isExporting,
    setIsExporting,
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
    setSearchTerm,
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
    actionItem,
    handleActionMenuOpen,
    handleActionMenuClose,
    
    // Scanner states
    showScanner,
    scanComplete,
    handleScannerToggle,
    simulateScanComplete
  };
};

export default useSensitiveItems;
