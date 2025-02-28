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
  status: "Serviceable" | "Unserviceable" | "Maintenance" | "Shortage" | "Missing";
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