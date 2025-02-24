export type ReportType = 'inventory' | 'transfers' | 'maintenance' | 'custom';

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

export interface BlockchainRecord {
  transactionId: string;
  action: 'REPORT_CREATED' | 'REPORT_UPDATED' | 'REPORT_APPROVED' | 'REPORT_REJECTED';
  timestamp: string;
  personnel: Personnel;
  details: Record<string, unknown>;
}

export interface ReportData {
  id: string;
  type: string;
  title: string;
  description?: string;
  createdAt: string;
  createdBy: Personnel;
  lastGenerated: string;
  format: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  blockchainHash: string;
  blockchainRecords: BlockchainRecord[];
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