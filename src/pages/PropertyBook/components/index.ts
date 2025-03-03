import { PropertyItem as PropertyBookTableItem } from '../types';

// Direct component imports
export { default as EquipmentCategoryTree } from './EquipmentCategoryTree';
export { default as FilterPanel } from './FilterPanel';
export { default as PropertyBookTable } from './PropertyBookTable';
export { default as EquipmentDetailPanel } from './EquipmentDetailPanel';
export { default as BulkActionToolbar } from './BulkActionToolbar';
export { StatsCards } from './StatsCards';
export { default as HandReceiptStructure } from './HandReceiptStructure';
export { default as PropertyBookSummaryCard } from './PropertyBookSummaryCard';
export { default as HandReceiptManagementCard } from './HandReceiptManagementCard';
export { default as SensitiveItemsStatusCard } from './SensitiveItemsStatusCard';
export { default as PropertyTransactionHistory } from './PropertyTransactionHistory';
export { default as PropertyBookHeader } from './PropertyBookHeader';
export { default as PropertyBookSummary } from './PropertyBookSummary';

// Type definitions for components that may be used elsewhere
export interface EquipmentCategoryTreeProps {
  onCategorySelect: (categoryId: string) => void;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  selectedCategory: string;
}

export interface BulkActionToolbarProps {
  selectedItems: PropertyBookTableItem[];
  onBulkAction: (action: string, items: PropertyBookTableItem[], additionalData?: any) => void;
  onClearSelection: () => void;
}

export interface FilterState {
  status: string;
  location: string;
  handReceiptHolder: string;
  searchText: string;
  category: string;
  verifiedAfter: string;
  verifiedBefore: string;
} 