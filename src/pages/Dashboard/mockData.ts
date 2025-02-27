import { DashboardData } from './types';

export const mockDashboardData: DashboardData = {
  propertyStats: {
    totalItems: 1250,
    serviceableItems: 980,
    maintenanceNeeded: 180,
    pendingTransfers: {
      count: 45,
      items: [
        {
          id: 'TRF-001',
          itemName: 'M4 Carbine',
          from: 'Alpha Company',
          to: 'Bravo Company',
        },
        {
          id: 'TRF-002',
          itemName: 'HMMWV',
          from: 'Charlie Company',
          to: 'HQ Company',
        },
        {
          id: 'TRF-003',
          itemName: 'Night Vision Goggles',
          from: 'Delta Company',
          to: 'Alpha Company',
        },
      ],
    },
    maintenanceRequests: {
      count: 65,
      items: [
        {
          id: 'MNT-001',
          itemName: 'HMMWV #234',
          type: 'Scheduled Maintenance',
          priority: 'medium',
        },
        {
          id: 'MNT-002',
          itemName: 'Radio Set #45',
          type: 'Repair',
          priority: 'high',
        },
        {
          id: 'MNT-003',
          itemName: 'M2 .50 Cal #12',
          type: 'Inspection',
          priority: 'low',
        },
      ],
    },
    overdueItems: 90,
    categories: [
      { name: 'Weapons', value: 450, count: 450 },
      { name: 'Vehicles', value: 200, count: 200 },
      { name: 'Communications', value: 350, count: 350 },
      { name: 'Other', value: 250, count: 250 },
    ],
    criticalItems: [
      {
        name: 'HMMWV #234',
        issue: 'Overdue maintenance',
        status: 'CRITICAL',
      },
      {
        name: 'Radio Set #45',
        issue: 'Malfunctioning',
        status: 'CRITICAL',
      },
      {
        name: 'M2 .50 Cal #12',
        issue: 'Inspection needed',
        status: 'WARNING',
      },
    ],
  },
  personnelStats: {
    totalPersonnel: 150,
    fullyEquipped: 120,
    partiallyEquipped: 25,
    overdueItems: 5,
  },
  activities: [
    {
      id: 'ACT-001',
      type: 'Transfer',
      description: 'M4 Carbine transferred to Bravo Company',
      user: {
        rank: 'SGT',
        name: 'John Smith',
      },
      timestamp: '2023-10-15T10:30:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'ACT-002',
      type: 'Maintenance',
      description: 'HMMWV #234 scheduled maintenance',
      user: {
        rank: 'SPC',
        name: 'Jane Doe',
      },
      timestamp: '2023-10-15T09:15:00Z',
      status: 'IN PROGRESS',
    },
    {
      id: 'ACT-003',
      type: 'Inspection',
      description: 'Monthly weapons inspection',
      user: {
        rank: 'SSG',
        name: 'Mike Johnson',
      },
      timestamp: '2023-10-14T15:45:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'ACT-004',
      type: 'Transfer',
      description: 'Night Vision Goggles transferred to Charlie Company',
      user: {
        rank: 'CPL',
        name: 'Sarah Williams',
      },
      timestamp: '2023-10-14T14:20:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'ACT-005',
      type: 'Maintenance',
      description: 'Radio Set #45 repair completed',
      user: {
        rank: 'SPC',
        name: 'Robert Davis',
      },
      timestamp: '2023-10-14T13:10:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'ACT-006',
      type: 'Inspection',
      description: 'Quarterly vehicle inspection',
      user: {
        rank: 'SSG',
        name: 'James Wilson',
      },
      timestamp: '2023-10-14T11:30:00Z',
      status: 'IN PROGRESS',
    },
    {
      id: 'ACT-007',
      type: 'Transfer',
      description: 'Ammunition resupply to Delta Company',
      user: {
        rank: 'SGT',
        name: 'Emily Brown',
      },
      timestamp: '2023-10-14T10:45:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'ACT-008',
      type: 'Maintenance',
      description: 'M2 .50 Cal maintenance request submitted',
      user: {
        rank: 'SPC',
        name: 'Michael Taylor',
      },
      timestamp: '2023-10-14T09:30:00Z',
      status: 'IN PROGRESS',
    },
    {
      id: 'ACT-009',
      type: 'Inspection',
      description: 'Communications equipment check',
      user: {
        rank: 'SSG',
        name: 'David Martinez',
      },
      timestamp: '2023-10-14T08:15:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'ACT-010',
      type: 'Transfer',
      description: 'Medical supplies transferred to Aid Station',
      user: {
        rank: 'SGT',
        name: 'Lisa Anderson',
      },
      timestamp: '2023-10-13T16:45:00Z',
      status: 'COMPLETED',
    },
  ],
  notifications: [
    {
      id: 'NOTIF-001',
      type: 'high',
      message: 'Critical maintenance required for HMMWV #234',
      timestamp: '2023-10-15T08:00:00Z',
    },
    {
      id: 'NOTIF-002',
      type: 'medium',
      message: 'Pending transfer requests require approval',
      timestamp: '2023-10-15T07:30:00Z',
    },
    {
      id: 'NOTIF-003',
      type: 'low',
      message: 'Monthly inventory report is ready for review',
      timestamp: '2023-10-14T16:00:00Z',
    },
  ],
  unitInfo: {
    name: "B CO, 2-87 IN BN, 2BCT",
    classVIIItems: 721,
    dollarValue: "$4.2M",
    accountabilityRate: 99.4,
    sensitiveItemStatus: {
      accountedFor: 100,
      lastInventory: "25FEB2025 0600"
    }
  },
  accountabilityStatus: {
    overallRate: 99.4,
    subHandReceipts: [
      {
        officer: "1LT Parker",
        platoon: "1st PLT",
        itemCount: 143,
        status: "OK"
      },
      {
        officer: "1LT Chen",
        platoon: "2nd PLT",
        itemCount: 138,
        status: "OK"
      },
      {
        officer: "1LT Garcia",
        platoon: "3rd PLT",
        itemCount: 156,
        status: "WARNING",
        statusMessage: "1 FLIPL pending"
      },
      {
        officer: "1SG Martinez",
        platoon: "HQ",
        itemCount: 284,
        status: "OK"
      }
    ]
  },
  commandDirectedActions: [
    {
      id: "CDA-001",
      description: "JLTV #W55639 - Accept on Property Book",
      dueDate: "1700 Today",
      status: "PENDING"
    },
    {
      id: "CDA-002",
      description: "SINCGARS RT-1523F (SN: RC-987-2441) - FLIPL Initiation",
      dueDate: "Yesterday",
      status: "OVERDUE"
    },
    {
      id: "CDA-003",
      description: "3rd PLT Sub-Hand Receipt - Command Signature Required",
      dueDate: "NLT 1600 27FEB",
      status: "PENDING"
    },
    {
      id: "CDA-004",
      description: "CSDP Monthly Certification",
      dueDate: "28FEB",
      status: "PENDING"
    }
  ],
  sensitiveItems: [
    {
      nomenclature: "M2A1 .50 Cal",
      serialOrNsn: "SN: M2-456832",
      subHandReceipt: "1LT Chen",
      lastPmcs: "23FEB2025",
      status: "FMC"
    },
    {
      nomenclature: "M240B",
      serialOrNsn: "SN: M2405689",
      subHandReceipt: "1LT Parker",
      lastPmcs: "24FEB2025",
      status: "FMC"
    },
    {
      nomenclature: "DAGR",
      serialOrNsn: "NSN: 5825-01-526-4783",
      subHandReceipt: "1LT Garcia",
      lastPmcs: "22FEB2025",
      status: "FMC"
    }
  ],
  maintenanceReadiness: {
    statuses: [
      {
        category: "M1097A2 HMMWV",
        total: 14,
        fmc: 12,
        pmcA: 0,
        pmcB: 0,
        nmc: 2
      },
      {
        category: "FMTVs",
        total: 4,
        fmc: 4,
        pmcA: 0,
        pmcB: 0,
        nmc: 0
      },
      {
        category: "JLTVs",
        total: 2,
        fmc: 2,
        pmcA: 0,
        pmcB: 0,
        nmc: 0
      }
    ]
  },
  battalionActivities: [
    {
      id: "BA-001",
      timestamp: "25FEB2025 0730",
      person: "1LT Chen",
      description: "Completed Weekly SI Inventory IAW AR 710-2"
    },
    {
      id: "BA-002",
      timestamp: "24FEB2025 1645",
      person: "CW2 Patel (BN PBO)",
      description: "Approved lateral transfer of 4x M249 SAW"
    },
    {
      id: "BA-003",
      timestamp: "24FEB2025 1432",
      person: "SSG Wilson",
      description: "Submitted 5988-E for HMMWV #HQ-237"
    },
    {
      id: "BA-004",
      timestamp: "23FEB2025 0915",
      person: "CPT Rodriguez",
      description: "Signed monthly CSDP certification"
    },
    {
      id: "BA-005",
      timestamp: "22FEB2025 1100",
      person: "SPC Diaz",
      description: "Completed JLIST inventory (100% accountability)"
    }
  ],
  commandSupplyActions: [
    {
      id: "CSA-001",
      label: "Conduct SI Inventory",
      icon: "inventory",
      action: "/inventory/sensitive-items"
    },
    {
      id: "CSA-002",
      label: "Process 3161 Transfer",
      icon: "swap_horiz",
      action: "/transfers/new"
    },
    {
      id: "CSA-003",
      label: "Generate Sub-Hand Receipt",
      icon: "description",
      action: "/property/sub-hand-receipts/new"
    },
    {
      id: "CSA-004",
      label: "Initiate FLIPL",
      icon: "report_problem",
      action: "/property/flipl/new"
    }
  ],
  gcssStatus: {
    connected: true,
    asOf: "25FEB2025 0842",
    pbo: "CW2 Patel (S4 AOIC)",
    helpDesk: "767-1401"
  }
}; 