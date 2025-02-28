import { useState, useCallback } from 'react';
import { PropertyItem, FilterState } from '../types';

interface UsePropertyBookProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  showSnackbar: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
  propertyItems: PropertyItem[];
}

export const usePropertyBook = ({
  filters,
  setFilters,
  selectedItems,
  setSelectedItems,
  showSnackbar,
  propertyItems
}: UsePropertyBookProps) => {
  
  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    // Handle tab changes (can be expanded as needed)
    console.log('Tab changed to:', newValue);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    console.log('Selected category:', categoryId);
  }, [setFilters]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, [setFilters]);

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
    console.log('Selected items:', selectedIds);
  }, [setSelectedItems]);

  const handleRowAction = useCallback((action: string, item: PropertyItem) => {
    console.log('Action:', action, 'Item:', item);
    
    // Show notification for the action
    let message = '';
    let severity: 'success' | 'info' | 'warning' | 'error' = 'info';
    
    switch (action) {
      case 'edit':
        message = `Editing ${item.nomenclature}`;
        severity = 'info';
        break;
      case 'transfer':
        message = `Initiated transfer for ${item.nomenclature}`;
        severity = 'info';
        break;
      case 'inventory':
        message = `${item.nomenclature} marked as verified`;
        severity = 'success';
        break;
      case 'maintenance':
        message = `${item.nomenclature} scheduled for maintenance`;
        severity = 'warning';
        break;
      case 'delete':
        message = `${item.nomenclature} removed from property book`;
        severity = 'error';
        break;
      default:
        message = `Action ${action} performed on ${item.nomenclature}`;
        severity = 'info';
    }
    
    showSnackbar(message, severity);
  }, [showSnackbar]);

  const handleBulkAction = useCallback((action: string, items: PropertyItem[], additionalData?: any) => {
    console.log('Bulk action:', action, 'Items:', items, 'Additional data:', additionalData);
    
    // Show notification for the bulk action
    let message = '';
    let severity: 'success' | 'info' | 'warning' | 'error' = 'info';
    
    switch (action) {
      case 'printHandReceipt':
        message = `Printing hand receipt for ${items.length} item(s)`;
        severity = 'info';
        break;
      case 'transfer':
        message = `Initiated transfer for ${items.length} item(s)`;
        severity = 'info';
        break;
      case 'updateStatus':
        message = `Updated ${items.length} item(s) to ${additionalData?.status} status`;
        severity = additionalData?.status === 'Serviceable' ? 'success' : 'warning';
        break;
      case 'inventoryVerify':
        message = `Marked ${items.length} item(s) as verified`;
        severity = 'success';
        break;
      case 'clearSelection':
        setSelectedItems([]);
        message = `Selection cleared`;
        severity = 'info';
        break;
      default:
        message = `Action ${action} performed on ${items.length} item(s)`;
        severity = 'info';
    }
    
    showSnackbar(message, severity);
  }, [showSnackbar, setSelectedItems]);

  // Apply filters to property items
  const getFilteredItems = useCallback(() => {
    return propertyItems.filter(item => {
      // Category filter
      const matchesCategory = 
        filters.category === 'all' || 
        item.category === filters.category ||
        item.subCategory === filters.category;
      
      // Status filter
      const matchesStatus = 
        filters.status === 'all' || 
        item.status.toLowerCase() === filters.status.toLowerCase();
      
      // Location filter
      const matchesLocation = 
        filters.location === 'All Locations' || 
        item.location === filters.location;
      
      // Hand receipt holder filter
      const matchesHandReceipt = 
        filters.handReceiptHolder === 'All Hand Receipt Holders' || 
        item.handReceiptHolder.includes(filters.handReceiptHolder.split(' ')[0]);
      
      // Text search filter
      const searchText = filters.searchText.toLowerCase();
      const matchesSearch = searchText === '' || 
        item.nomenclature.toLowerCase().includes(searchText) || 
        item.serialNumber.toLowerCase().includes(searchText) || 
        item.nsn.toLowerCase().includes(searchText) ||
        item.lin.toLowerCase().includes(searchText);
      
      // Date filters
      const lastVerifiedDate = new Date(item.lastVerified);
      const matchesVerifiedAfter = !filters.verifiedAfter || 
        lastVerifiedDate >= new Date(filters.verifiedAfter);
      const matchesVerifiedBefore = !filters.verifiedBefore || 
        lastVerifiedDate <= new Date(filters.verifiedBefore);
      
      return matchesCategory && matchesStatus && matchesLocation && 
            matchesHandReceipt && matchesSearch && 
            matchesVerifiedAfter && matchesVerifiedBefore;
    });
  }, [propertyItems, filters]);

  return {
    handleTabChange,
    handleCategorySelect,
    handleFilterChange,
    handleSelectionChange,
    handleRowAction,
    handleBulkAction,
    getFilteredItems
  };
}; 