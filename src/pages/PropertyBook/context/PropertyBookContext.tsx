import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PropertyItem, FilterState, Transaction, TransactionType } from '../types';
import { mockPropertyItems } from '../mockData';

// Default filter state
const defaultFilters: FilterState = {
  status: 'all',
  location: 'all',
  handReceiptHolder: 'all',
  searchText: '',
  category: 'all',
  verifiedAfter: '',
  verifiedBefore: '',
};

// Define the context type
interface PropertyBookContextType {
  // Data states
  propertyItems: PropertyItem[];
  filteredItems: PropertyItem[];
  selectedItems: string[];
  categories: { id: string; name: string; count: number }[];
  recentTransactions: Transaction[];
  
  // Pagination
  page: number;
  rowsPerPage: number;
  totalItems: number;
  
  // Filters
  filters: FilterState;
  
  // Modal states
  itemDetailsModalOpen: boolean;
  itemDetailsId: string | null;
  transferModalOpen: boolean;
  inventoryModalOpen: boolean;
  addItemModalOpen: boolean;
  da2062ModalOpen: boolean;
  
  // Action handlers
  setSelectedItems: (items: string[]) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: (select: boolean) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Modal handlers
  openItemDetails: (id: string) => void;
  closeItemDetails: () => void;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  openInventoryModal: () => void;
  closeInventoryModal: () => void;
  openAddItemModal: () => void;
  closeAddItemModal: () => void;
  openDA2062Modal: () => void;
  closeDA2062Modal: () => void;
  
  // Action functions
  transferItems: (recipientId: string, items?: string[]) => void;
  conductInventory: (items?: string[]) => void;
  printPropertyBook: () => void;
  exportToExcel: () => void;
  generateDA2062: (items?: string[]) => void;
  certifyPropertyBook: () => void;
  requestAddition: (item: Partial<PropertyItem>) => void;
  getItemById: (id: string) => PropertyItem | undefined;
}

// Create the context
export const PropertyBookContext = createContext<PropertyBookContextType | undefined>(undefined);

// Provider component
export const PropertyBookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data states
  const [propertyItems, setPropertyItems] = useState<PropertyItem[]>(mockPropertyItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<PropertyItem[]>(mockPropertyItems);
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filter states
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  
  // Modal states
  const [itemDetailsModalOpen, setItemDetailsModalOpen] = useState(false);
  const [itemDetailsId, setItemDetailsId] = useState<string | null>(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [da2062ModalOpen, setDA2062ModalOpen] = useState(false);
  
  // Mock transactions
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    { date: '01MAR2025', type: 'Transfer', description: 'M4A1 Carbine transferred to Alpha Company' },
    { date: '25FEB2025', type: 'Maintenance', description: 'JLTV sent to maintenance facility' },
    { date: '15FEB2025', type: 'Issue', description: 'Night vision devices issued to 3rd platoon' },
  ]);
  
  // Categories derived from property items
  const categories = React.useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    propertyItems.forEach(item => {
      const count = categoryMap.get(item.category) || 0;
      categoryMap.set(item.category, count + 1);
    });
    
    return Array.from(categoryMap.entries()).map(([category, count]) => ({
      id: category.toLowerCase(),
      name: category,
      count,
    }));
  }, [propertyItems]);
  
  // Apply filters to property items
  useEffect(() => {
    let result = [...propertyItems];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }
    
    // Filter by location
    if (filters.location !== 'all') {
      result = result.filter(item => item.location === filters.location);
    }
    
    // Filter by hand receipt holder
    if (filters.handReceiptHolder !== 'all') {
      result = result.filter(item => item.handReceiptHolder === filters.handReceiptHolder);
    }
    
    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter(item => 
        item.category.toLowerCase() === filters.category.toLowerCase() ||
        item.subCategory.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Filter by search text
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      result = result.filter(item =>
        item.nomenclature.toLowerCase().includes(searchLower) ||
        item.serialNumber.toLowerCase().includes(searchLower) ||
        item.nsn.toLowerCase().includes(searchLower) ||
        item.lin.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by verified dates if provided
    if (filters.verifiedAfter) {
      result = result.filter(item => new Date(item.lastVerified) >= new Date(filters.verifiedAfter));
    }
    
    if (filters.verifiedBefore) {
      result = result.filter(item => new Date(item.lastVerified) <= new Date(filters.verifiedBefore));
    }
    
    setFilteredItems(result);
    
    // Reset page when filters change
    setPage(0);
  }, [propertyItems, filters]);
  
  // Reset selected items when filtered items change
  useEffect(() => {
    setSelectedItems([]);
  }, [filters]);
  
  // Action handlers
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(itemId => itemId !== id)
        : [...prevSelected, id]
    );
  };
  
  const selectAllItems = (select: boolean) => {
    if (select) {
      // Just select the items on the current page
      const currentPageItems = filteredItems
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(item => item.id);
      setSelectedItems(currentPageItems);
    } else {
      setSelectedItems([]);
    }
  };
  
  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };
  
  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };
  
  // Modal handlers
  const openItemDetails = (id: string) => {
    setItemDetailsId(id);
    setItemDetailsModalOpen(true);
  };
  
  const closeItemDetails = () => {
    setItemDetailsModalOpen(false);
    setItemDetailsId(null);
  };
  
  const openTransferModal = () => {
    setTransferModalOpen(true);
  };
  
  const closeTransferModal = () => {
    setTransferModalOpen(false);
  };
  
  const openInventoryModal = () => {
    setInventoryModalOpen(true);
  };
  
  const closeInventoryModal = () => {
    setInventoryModalOpen(false);
  };
  
  const openAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  
  const closeAddItemModal = () => {
    setAddItemModalOpen(false);
  };
  
  // Action functions with mock implementations
  const transferItems = (recipientId: string, items: string[] = selectedItems) => {
    // Mock implementation to simulate transfer
    console.log(`Transferring items ${items.join(', ')} to ${recipientId}`);
    
    // Add to recent transactions
    const itemNames = items.map(id => {
      const item = propertyItems.find(i => i.id === id);
      return item ? item.nomenclature : 'Unknown item';
    }).join(', ');
    
    const newTransaction: Transaction = {
      date: new Date().toLocaleDateString('en-US', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }).replace(/\s/g, ''),
      type: 'Transfer',
      description: `${itemNames} transferred to ${recipientId}`
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev]);
    closeTransferModal();
  };
  
  const conductInventory = (items: string[] = selectedItems) => {
    console.log(`Conducting inventory for items: ${items.join(', ')}`);
    closeInventoryModal();
    
    // Add to recent transactions
    const newTransaction: Transaction = {
      date: new Date().toLocaleDateString('en-US', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }).replace(/\s/g, ''),
      type: 'Issue',
      description: `Inventory conducted for ${items.length} item(s)`
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev]);
  };
  
  const printPropertyBook = () => {
    console.log('Printing property book');
    alert('Printing property book...');
  };
  
  const exportToExcel = () => {
    console.log('Exporting to Excel');
    alert('Exporting to Excel...');
  };
  
  const openDA2062Modal = () => {
    setDA2062ModalOpen(true);
  };
  
  const closeDA2062Modal = () => {
    setDA2062ModalOpen(false);
  };
  
  const generateDA2062 = (items: string[] = selectedItems) => {
    console.log(`Generating DA Form 2062 for items: ${items.join(', ')}`);
    
    // Add to recent transactions
    const newTransaction: Transaction = {
      date: new Date().toLocaleDateString('en-US', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }).replace(/\s/g, ''),
      type: 'Issue',
      description: `DA Form 2062 generated for ${items.length} item(s)`
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev]);
    
    // Open the modal to display the generated form
    openDA2062Modal();
  };
  
  const certifyPropertyBook = () => {
    console.log('Certifying property book');
    alert('Property Book certified!');
  };
  
  const requestAddition = (item: Partial<PropertyItem>) => {
    console.log('Requesting addition of item', item);
    closeAddItemModal();
    
    // Add to recent transactions
    const newTransaction: Transaction = {
      date: new Date().toLocaleDateString('en-US', { 
        day: '2-digit', month: 'short', year: 'numeric' 
      }).replace(/\s/g, ''),
      type: 'Issue',
      description: `Addition requested for ${item.nomenclature || 'new item'}`
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev]);
  };
  
  const getItemById = (id: string) => {
    return propertyItems.find(item => item.id === id);
  };
  
  // Context value
  const contextValue: PropertyBookContextType = {
    propertyItems,
    filteredItems,
    selectedItems,
    categories,
    recentTransactions,
    page,
    rowsPerPage,
    totalItems: filteredItems.length,
    filters,
    itemDetailsModalOpen,
    itemDetailsId,
    transferModalOpen,
    inventoryModalOpen,
    addItemModalOpen,
    da2062ModalOpen,
    setSelectedItems,
    toggleItemSelection,
    selectAllItems,
    setPage,
    setRowsPerPage,
    setFilters,
    resetFilters,
    openItemDetails,
    closeItemDetails,
    openTransferModal,
    closeTransferModal,
    openInventoryModal,
    closeInventoryModal,
    openAddItemModal,
    closeAddItemModal,
    openDA2062Modal,
    closeDA2062Modal,
    transferItems,
    conductInventory,
    printPropertyBook,
    exportToExcel,
    generateDA2062,
    certifyPropertyBook,
    requestAddition,
    getItemById,
  };
  
  return (
    <PropertyBookContext.Provider value={contextValue}>
      {children}
    </PropertyBookContext.Provider>
  );
};

// Custom hook for using the context
export const usePropertyBook = () => {
  const context = useContext(PropertyBookContext);
  if (context === undefined) {
    throw new Error('usePropertyBook must be used within a PropertyBookProvider');
  }
  return context;
};
