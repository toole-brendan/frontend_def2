/**
 * Type definitions for Sensitive Items management
 */

/**
 * Sensitive Item interface
 */
export interface SensitiveItem {
  id: string;
  item: string;
  type: string;
  serialNumber: string;
  category: string;
  location: string;
  assignedTo: string;
  lastVerified: string;
  status: 'Verified' | 'Pending Verification' | 'In Repair';
}

/**
 * Arms Room information interface
 */
export interface ArmsRoomInfo {
  name: string;
  status: 'SECURE' | 'OPEN' | 'LOCKED' | 'ALERT';
  lastAccess: {
    timestamp: string;
    person: string;
    role: string;
  };
  custodian: {
    name: string;
    appointedDate: string;
  };
  weapons: {
    stored: number;
    signedOut: number;
    total: number;
  };
  tempHandReceipts: number;
  maintenanceItems: number;
}

/**
 * Accountability statistics interface
 */
export interface AccountabilityStats {
  total: number;
  accounted: number;
  percentage: number;
}

/**
 * Inventory record interface
 */
export interface InventoryRecord {
  id: string;
  date: string;
  time: string;
  type: string;
  conductor: string;
  items: number;
  found: number;
  missing: number;
  status: 'Complete' | 'In Progress' | 'Pending';
  notes: string;
}

/**
 * Scheduled inventory interface
 */
export interface ScheduledInventory {
  id: string;
  date: string;
  time: string;
  type: string;
  conductor: string;
  items: number;
  status: 'Scheduled' | 'In Progress' | 'Complete';
  notes: string;
}

/**
 * Chart dataset interface
 */
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth?: number;
  tension?: number;
}

/**
 * Chart data interface
 */
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

/**
 * Analytics data interface
 */
export interface AnalyticsData {
  weeklyInventories: ChartData;
  itemCategoryDistribution: ChartData;
  verificationTrend: ChartData;
}

/**
 * Mock data interface
 */
export interface SensitiveItemsData {
  companyInfo: string;
  accountabilityStats: AccountabilityStats;
  nextInventory: string;
  armsRoom: ArmsRoomInfo;
  sensitiveItems: SensitiveItem[];
  inventoryHistory: InventoryRecord[];
  scheduleInventories: ScheduledInventory[];
  analytics: AnalyticsData;
}

/**
 * Action Card Props interface
 */
export interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonText: string;
  color: string;
  onClick?: () => void;
}

/**
 * Tab Panel Props interface
 */
export interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  padding?: number;
}

/**
 * Filter state interface
 */
export interface FilterState {
  type: string;
  location: string;
  status: string;
}
