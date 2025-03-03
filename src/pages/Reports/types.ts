export type ReportType = 'inventory' | 'transfers' | 'maintenance' | 'custom';

export type ReportStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'published';

export interface MetricChange {
  value: string;
  timeframe: string;
  isPositive: boolean;
}

export interface Metric {
  value: string;
  change: MetricChange;
}

export interface InventoryMetrics {
  totalItems: Metric;
  itemsInGoodCondition: Metric;
  itemsNeedingMaintenance: Metric;
  criticalItems: Metric;
}

export interface TransferMetrics {
  totalTransfers: Metric;
  pendingApprovals: Metric;
  awaitingConfirmations: Metric;
  completedTransfers: Metric;
}

export interface MaintenanceMetrics {
  scheduledTasks: Metric;
  inProgressTasks: Metric;
  completedTasks: Metric;
  overdueTasks: Metric;
}

export interface ReportMetrics {
  inventory: InventoryMetrics;
  transfers: TransferMetrics;
  maintenance: MaintenanceMetrics;
}

export interface Personnel {
  name: string;
  rank: string;
  unit: string;
}

export interface Report {
  id: string;
  title: string;
  description?: string;
  type: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  approvedBy?: {
    id: string;
    name: string;
  };
}

export interface BlockchainRecord {
  transactionId: string;
  blockNumber: number;
  timestamp: string;
  action: 'REPORT_CREATED' | 'REPORT_UPDATED' | 'REPORT_APPROVED' | 'REPORT_REJECTED';
  reportId: string;
  personnel: {
    id: string;
    name: string;
  };
  signature: string;
}

export interface ReportData {
  id: string;
  type: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  createdBy: Personnel;
  lastGenerated: string;
  format: string;
  status: ReportStatus;
  blockchainHash: string;
  blockchainRecords: BlockchainRecord[];
  author?: string;
  reportType?: string;
  data?: {
    filters: ReportFilter;
  };
}

export interface ReportFilter {
  dateRange: {
    start: string;
    end: string;
  };
  status?: string[];
  unit?: string[];
  personnel?: string[];
  equipment?: string[];
  fields?: {
    itemDetails: boolean;
    location: boolean;
    status: boolean;
    history: boolean;
    blockchain: boolean;
  };
  customFields?: Record<string, unknown>;
}

export interface ReportConfig {
  name: string;
  type: ReportType;
  frequency: string;
  format: string;
  filters: ReportFilter;
}

export interface CustomReportConfig {
  title: string;
  description: string;
  filters: ReportFilter;
  metrics: string[];
  visualizations: {
    type: 'bar' | 'line' | 'pie' | 'table';
    config: Record<string, unknown>;
  }[];
}

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

export interface SortConfig {
  field: keyof ReportData;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  status: ReportStatus[];
  type: ReportType[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  searchTerm: string;
} 