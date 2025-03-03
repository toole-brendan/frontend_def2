import { 
  ReportData, 
  ReportMetrics, 
  Personnel, 
  BlockchainRecord,
  ReportType,
  ReportStatus  
} from './types';

// Mock personnel data
export const mockPersonnel: Personnel[] = [
  { name: 'John Smith', rank: 'Captain', unit: 'Alpha Company' },
  { name: 'Sarah Johnson', rank: 'Lieutenant', unit: 'Bravo Company' },
  { name: 'Michael Chen', rank: 'Sergeant', unit: 'Charlie Company' },
  { name: 'David Wilson', rank: 'Major', unit: 'HQ' },
  { name: 'Jessica Martinez', rank: 'Specialist', unit: 'Delta Company' },
];

// Mock blockchain records
export const mockBlockchainRecords: BlockchainRecord[] = [
  {
    transactionId: 'tx_8a7d6f9e2c3b5a',
    action: 'REPORT_CREATED',
    timestamp: '2023-09-15T10:30:45Z',
    personnel: mockPersonnel[0],
    details: { ipfsHash: 'Qm6f8a9d2c3b5e7f' }
  },
  {
    transactionId: 'tx_2e3d4f5a6b7c8d',
    action: 'REPORT_UPDATED',
    timestamp: '2023-09-16T14:25:12Z',
    personnel: mockPersonnel[1],
    details: { changedFields: ['status', 'description'] }
  },
  {
    transactionId: 'tx_9f8e7d6c5b4a3',
    action: 'REPORT_APPROVED',
    timestamp: '2023-09-17T09:15:33Z',
    personnel: mockPersonnel[3],
    details: { comments: 'Approved after review' }
  }
];

// Mock report data
export const mockReports: ReportData[] = [
  {
    id: 'rep-001',
    type: 'inventory',
    title: 'Monthly Inventory Status Report',
    description: 'Comprehensive overview of all inventory items and their current status',
    createdAt: '2023-09-15T08:30:00Z',
    updatedAt: '2023-09-17T09:15:33Z',
    dueDate: '2023-09-30T23:59:59Z',
    createdBy: mockPersonnel[0],
    lastGenerated: '2023-09-17T09:20:00Z',
    format: 'PDF',
    status: 'approved',
    blockchainHash: 'bch_5a4b3c2d1e',
    blockchainRecords: mockBlockchainRecords,
    author: 'John Smith',
    reportType: 'inventory',
    data: {
      filters: {
        dateRange: {
          start: '2023-08-15T00:00:00Z',
          end: '2023-09-15T23:59:59Z'
        },
        status: ['active', 'maintenance'],
        unit: ['Alpha Company', 'Bravo Company']
      }
    }
  },
  {
    id: 'rep-002',
    type: 'transfers',
    title: 'Quarterly Transfer Activity',
    description: 'Summary of all equipment transfers between units',
    createdAt: '2023-09-10T11:45:00Z',
    updatedAt: '2023-09-12T15:30:22Z',
    createdBy: mockPersonnel[1],
    lastGenerated: '2023-09-12T15:35:00Z',
    format: 'Excel',
    status: 'published',
    blockchainHash: 'bch_7f8e9d0c1b',
    blockchainRecords: [mockBlockchainRecords[0], mockBlockchainRecords[1]],
    author: 'Sarah Johnson',
    reportType: 'transfers',
    data: {
      filters: {
        dateRange: {
          start: '2023-06-01T00:00:00Z',
          end: '2023-09-01T23:59:59Z'
        },
        unit: ['All Units']
      }
    }
  },
  {
    id: 'rep-003',
    type: 'maintenance',
    title: 'Weekly Maintenance Schedule',
    description: 'Schedule of upcoming maintenance tasks and overdue items',
    createdAt: '2023-09-18T09:00:00Z',
    createdBy: mockPersonnel[2],
    lastGenerated: '2023-09-18T09:05:00Z',
    format: 'HTML',
    status: 'draft',
    blockchainHash: 'bch_2a3b4c5d6e',
    blockchainRecords: [mockBlockchainRecords[0]],
    author: 'Michael Chen',
    reportType: 'maintenance',
    data: {
      filters: {
        dateRange: {
          start: '2023-09-18T00:00:00Z',
          end: '2023-09-25T23:59:59Z'
        },
        status: ['scheduled', 'overdue']
      }
    }
  },
  {
    id: 'rep-004',
    type: 'custom',
    title: 'Equipment Readiness Assessment',
    description: 'Custom report on critical equipment readiness metrics',
    createdAt: '2023-09-14T14:20:00Z',
    dueDate: '2023-09-21T23:59:59Z',
    createdBy: mockPersonnel[3],
    lastGenerated: '2023-09-14T14:25:00Z',
    format: 'PDF',
    status: 'pending',
    blockchainHash: 'bch_6d5e4f3g2h',
    blockchainRecords: [mockBlockchainRecords[0], mockBlockchainRecords[1]],
    author: 'David Wilson',
    reportType: 'custom',
    data: {
      filters: {
        dateRange: {
          start: '2023-08-01T00:00:00Z',
          end: '2023-09-14T23:59:59Z'
        },
        equipment: ['M1A1', 'HMMWV', 'M4A1']
      }
    }
  },
  {
    id: 'rep-005',
    type: 'inventory',
    title: 'Sensitive Items Inventory',
    description: 'Detailed inventory of all sensitive items and their custodians',
    createdAt: '2023-09-16T16:10:00Z',
    createdBy: mockPersonnel[4],
    lastGenerated: '2023-09-16T16:15:00Z',
    format: 'PDF',
    status: 'rejected',
    blockchainHash: 'bch_8i7h6g5f4e',
    blockchainRecords: mockBlockchainRecords,
    author: 'Jessica Martinez',
    reportType: 'inventory',
    data: {
      filters: {
        dateRange: {
          start: '2023-09-01T00:00:00Z',
          end: '2023-09-16T23:59:59Z'
        },
        fields: {
          itemDetails: true,
          location: true,
          status: true,
          history: true,
          blockchain: true
        }
      }
    }
  }
];

// Mock report metrics
export const mockReportMetrics: ReportMetrics = {
  inventory: {
    totalItems: {
      value: '1,245',
      change: { value: '+12', timeframe: 'past month', isPositive: true }
    },
    itemsInGoodCondition: {
      value: '1,087',
      change: { value: '+15', timeframe: 'past month', isPositive: true }
    },
    itemsNeedingMaintenance: {
      value: '158',
      change: { value: '-3', timeframe: 'past month', isPositive: true }
    },
    criticalItems: {
      value: '42',
      change: { value: '0', timeframe: 'past month', isPositive: true }
    }
  },
  transfers: {
    totalTransfers: {
      value: '87',
      change: { value: '+23', timeframe: 'past quarter', isPositive: true }
    },
    pendingApprovals: {
      value: '12',
      change: { value: '+4', timeframe: 'past week', isPositive: false }
    },
    awaitingConfirmations: {
      value: '8',
      change: { value: '-2', timeframe: 'past week', isPositive: true }
    },
    completedTransfers: {
      value: '67',
      change: { value: '+21', timeframe: 'past quarter', isPositive: true }
    }
  },
  maintenance: {
    scheduledTasks: {
      value: '35',
      change: { value: '+8', timeframe: 'past week', isPositive: false }
    },
    inProgressTasks: {
      value: '14',
      change: { value: '+2', timeframe: 'past week', isPositive: true }
    },
    completedTasks: {
      value: '42',
      change: { value: '+12', timeframe: 'past month', isPositive: true }
    },
    overdueTasks: {
      value: '7',
      change: { value: '-3', timeframe: 'past week', isPositive: true }
    }
  }
};

// Sample report types for dropdown options
export const reportTypeOptions: { value: ReportType; label: string }[] = [
  { value: 'inventory', label: 'Inventory Report' },
  { value: 'transfers', label: 'Transfer Activity' },
  { value: 'maintenance', label: 'Maintenance Schedule' },
  { value: 'custom', label: 'Custom Report' }
];

// Sample report status options for filtering
export const reportStatusOptions: { value: ReportStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'published', label: 'Published' }
]; 