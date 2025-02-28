import {
  DashboardData,
  EquipmentCategory,
  CommandAction,
  Milestone,
  EquipmentItem,
  Requirement,
  DashboardActivity,
  Action
} from './types';

export const mockDashboardData: DashboardData = {
  propertyStats: {
    totalItems: 721,
    serviceableItems: 650,
    maintenanceNeeded: 71,
    pendingTransfers: {
      count: 12,
      items: [
        { id: 'TR-001', itemName: 'M4A1 Carbine', from: '1st Platoon', to: 'Range' },
        { id: 'TR-002', itemName: 'HMMWV', from: 'Motor Pool', to: 'Maintenance' }
      ]
    },
    maintenanceRequests: {
      count: 24,
      items: [
        { id: 'MR-001', itemName: 'HMMWV #HQ-237', type: 'Corrective', priority: 'high' },
        { id: 'MR-002', itemName: 'SINCGARS Radio', type: 'Preventive', priority: 'medium' }
      ]
    },
    overdueItems: 5,
    categories: [
      { name: 'Weapons', value: 1200000, count: 143 },
      { name: 'Vehicles', value: 1800000, count: 72 },
      { name: 'Communications', value: 520000, count: 95 },
      { name: 'Optics', value: 430000, count: 63 },
      { name: 'Other', value: 250000, count: 348 }
    ],
    criticalItems: [
      { name: 'SINCGARS Radio', issue: 'Missing Components', status: 'CRITICAL' },
      { name: 'HMMWV #HQ-237', issue: 'Brake System', status: 'WARNING' }
    ]
  },
  personnelStats: {
    totalPersonnel: 156,
    fullyEquipped: 149,
    partiallyEquipped: 7,
    overdueItems: 3
  },
  activities: [
    { id: 'ACT-001', type: 'Maintenance', description: 'HMMWV #HQ-237 scheduled for repair', user: { rank: 'SSG', name: 'Wilson' }, timestamp: '24FEB2025 1432', status: 'IN PROGRESS' },
    { id: 'ACT-002', type: 'Transfer', description: 'M249 SAW transferred to range', user: { rank: 'CW2', name: 'Patel' }, timestamp: '24FEB2025 1645', status: 'COMPLETED' }
  ],
  notifications: [
    { id: 'NOT-001', type: 'high', message: 'Sensitive Items Inventory Due in 2 Days', timestamp: '25FEB2025 0800' },
    { id: 'NOT-002', type: 'medium', message: 'New JLTV Receipt Pending Signature', timestamp: '25FEB2025 0830' }
  ],
  unitInfo: {
    name: 'B Company, 2-87 Infantry',
    classVIIItems: 721,
    dollarValue: '$4,200,000',
    accountabilityRate: 99.4,
    sensitiveItemStatus: {
      accountedFor: 210,
      lastInventory: '23FEB2025 0830'
    }
  },
  accountabilityStatus: {
    overallRate: 99.4,
    subHandReceipts: [
      { officer: '1LT Chen', platoon: '1st PLT', itemCount: 143, status: 'OK' },
      { officer: '1LT Smith', platoon: '2nd PLT', itemCount: 136, status: 'OK' },
      { officer: '1LT Johnson', platoon: '3rd PLT', itemCount: 139, status: 'WARNING', statusMessage: '1 Item Pending Transfer' },
      { officer: 'SFC Taylor', platoon: 'HQ PLT', itemCount: 203, status: 'OK' }
    ]
  },
  commandDirectedActions: [
    { id: 'CDA-001', description: 'Complete Monthly Sensitive Items Inventory', dueDate: '27FEB2025', status: 'PENDING' },
    { id: 'CDA-002', description: 'Sign New JLTV Receipt', dueDate: '25FEB2025', status: 'OVERDUE' }
  ],
  sensitiveItems: [
    { nomenclature: 'M4A1 Carbine', serialOrNsn: 'M4-78921', subHandReceipt: '1st PLT', lastPmcs: '20FEB2025', status: 'FMC' },
    { nomenclature: 'M240B', serialOrNsn: 'M240-12345', subHandReceipt: '2nd PLT', lastPmcs: '20FEB2025', status: 'FMC' }
  ],
  maintenanceReadiness: {
    statuses: [
      { category: 'Weapons', total: 143, fmc: 141, pmcA: 2, pmcB: 0, nmc: 0 },
      { category: 'Vehicles', total: 72, fmc: 68, pmcA: 3, pmcB: 0, nmc: 1 },
      { category: 'Communications', total: 95, fmc: 93, pmcA: 1, pmcB: 0, nmc: 1 }
    ]
  },
  battalionActivities: [
    { id: 'BA-001', timestamp: '25FEB2025 0800', person: 'Battalion XO', description: 'Published updated Command Supply Guidance' },
    { id: 'BA-002', timestamp: '24FEB2025 1400', person: 'S4', description: 'Announced Change of Command Inventory for Charlie Co' }
  ],
  commandSupplyActions: [
    { id: 'CSA-001', label: 'Conduct Sensitive Item Inventory', icon: 'clipboard-check', action: 'sensitiveItemInventory' },
    { id: 'CSA-002', label: 'Sign Pending Hand Receipts', icon: 'file-signature', action: 'signHandReceipts' }
  ],
  gcssStatus: {
    connected: true,
    asOf: '25FEB2025 0842',
    pbo: 'CPT FRANKLIN (555-123-4567)',
    helpDesk: 'GCSS-ARMY HELP DESK: 1-866-547-1349'
  }
};

// Additional component-specific mock data

// AccountabilityStatusCard
export const mockEquipmentCategories: EquipmentCategory[] = [
  { name: "Weapons", count: "143/143", percentage: 100, lastVerified: "23FEB2025" },
  { name: "Vehicles", count: "71/72", percentage: 98.6, lastVerified: "23FEB2025", note: "1 at Battalion Maintenance" },
  { name: "Communications", count: "95/95", percentage: 100, lastVerified: "20FEB2025" },
  { name: "Optics/NVGs", count: "63/63", percentage: 100, lastVerified: "23FEB2025" }
];

// CommandActionItemsCard
export const mockCommandActions: CommandAction[] = [
  { priority: "HIGH", item: "New JLTV Receipt", type: "Acquisition", deadline: "TODAY", action: "Verify & Sign" },
  { priority: "HIGH", item: "SINCGARS (SN: RC-987-2441)", type: "Maintenance", deadline: "OVERDUE", action: "Initiate FLIPL" },
  { priority: "MEDIUM", item: "3rd PLT Hand Receipt", type: "Transfer", deadline: "27FEB", action: "Review & Sign" }
];

// NTCRotationReadinessCard
export const mockMilestones: Milestone[] = [
  { name: "Equipment Identification", status: "Complete", date: "", daysRemaining: null },
  { name: "Initial Sourcing Plan", status: "Pending", date: "01MAR", daysRemaining: 4 },
  { name: "Maintenance Completion", status: "Pending", date: "15MAY", daysRemaining: null },
  { name: "Load Plans Due", status: "Pending", date: "01JUN", daysRemaining: null }
];

// CriticalEquipmentStatusTable
export const mockEquipmentItems: EquipmentItem[] = [
  { equipment: "HMMWV", serialBumper: "HQ-237", status: "PMC", location: "Motor Pool", issue: "Brake system", actionRequired: "Maintenance Request", due: "28FEB" },
  { equipment: "JLTV", serialBumper: "Pending", status: "In Process", location: "Brigade S4", issue: "New receipt", actionRequired: "Command Signature", due: "TODAY" },
  { equipment: "SINCGARS", serialBumper: "RC-987-2441", status: "NMC", location: "Maintenance", issue: "Missing components", actionRequired: "FLIPL Initiation", due: "OVERDUE" },
  { equipment: "M240B", serialBumper: "M2405689", status: "FMC", location: "Arms Room", issue: "None", actionRequired: "Weekly Verification", due: "28FEB" }
];

// UpcomingAccountabilityRequirements
export const mockWeeklyRequirements: Requirement[] = [
  { name: "Sensitive Items Inventory", due: "27FEB", daysRemaining: 2 },
  { name: "Weapons Count Verification", due: "28FEB", daysRemaining: 3 },
  { name: "CSDP Monthly Review", due: "01MAR", daysRemaining: 4 }
];

export const mockMonthlyRequirements: Requirement[] = [
  { name: "10% Cyclic Inventory (Vehicles)", due: "28FEB", progress: 68 },
  { name: "Monthly Supply Activity Report", due: "01MAR", progress: null },
  { name: "Sub-Hand Receipt Review", due: "05MAR", progress: null }
];

export const mockQuarterlyRequirements: Requirement[] = [
  { name: "CSDP Formal Review", due: "15APR", daysRemaining: 49 }
];

// RecentActivityFeed
export const mockActivities: DashboardActivity[] = [
  { date: "25FEB", time: "0730", activity: "Sensitive Item Inventory", personnel: "1LT Chen", details: "Completed daily verification", status: "Complete" },
  { date: "24FEB", time: "1645", activity: "Equipment Transfer", personnel: "CW2 Patel", details: "Approved 4x M249 SAW to Range", status: "Temporary" },
  { date: "24FEB", time: "1432", activity: "Maintenance Request", personnel: "SSG Wilson", details: "HMMWV #HQ-237 brake system", status: "In Progress" },
  { date: "23FEB", time: "0915", activity: "CSDP Certification", personnel: "CPT Rodriguez", details: "Signed monthly certification", status: "Complete" }
];

// QuickActionPanel
export const mockQuickActions: Action[] = [
  { label: "Conduct Sensitive Item Inventory", icon: "clipboard-check", action: "sensitiveItemInventory" },
  { label: "Sign Pending Hand Receipts", icon: "file-signature", action: "signHandReceipts" },
  { label: "Review Transfer Requests", icon: "exchange-alt", action: "reviewTransfers" },
  { label: "Generate Property Report", icon: "chart-bar", action: "generateReport" },
  { label: "Initiate FLIPL", icon: "exclamation-triangle", action: "initiateFLIPL" },
  { label: "Schedule Change of Command Inventory", icon: "calendar", action: "scheduleInventory" }
]; 