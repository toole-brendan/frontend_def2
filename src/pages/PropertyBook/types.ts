export interface PropertyItem {
  id: string;
  lin: string;
  nsn: string;
  nomenclature: string;
  serialNumber: string;
  qtyAuth: number;
  qtyOnHand: number;
  location: string;
  handReceiptHolder: string;
  status: 'Serviceable' | 'Unserviceable' | 'Maintenance' | 'Shortage' | 'Missing';
  lastVerified: string;
  category: string;
  subCategory: string;
  value: number;
  isSensitive?: boolean;
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

export interface PropertyBookHeaderProps {
  unit: string;
  primaryHolder: string;
  totalItems: number;
  totalValue: number;
  lastReconciliation: string;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  currentTab: number;
  onAction: (action: string) => void;
}

export interface PropertyBookTableProps {
  items: PropertyItem[];
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export interface PropertyBookSummaryProps {
  stats: {
    totalItems: number;
    shortageStatus: number;
    excessStatus: number;
  };
}

export type TransactionType = 'Transfer' | 'Issue' | 'Maintenance';

export interface Transaction {
  date: string;
  type: TransactionType;
  description: string;
}

export interface PropertyTransactionHistoryProps {
  recentTransactions: Transaction[];
}

export interface StatsDataItem {
  name: string;
  count: number;
  value: string;
}

export interface StatsData {
  totalItems: number;
  totalValue: string;
  categories: StatsDataItem[];
} 