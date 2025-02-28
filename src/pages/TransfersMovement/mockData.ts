import {
  Transfer,
  TransferType,
  TransferStage,
  TransferPriority,
  TransferMetrics,
  TransferPipeline,
  QRScanResult,
  TransferActivity
} from './types';

// Mock transfer items
const mockItems = [
  {
    id: 'ITEM-001',
    name: 'JLTV #204987JT',
    serialNumber: 'JLT-204987JT',
    nsn: '2320-01-637-5153',
    digitalTwinId: 'DT-JLTV-001',
    thumbnail: '/assets/images/jltv.jpg',
    currentCustodian: 'B Company, 2-87 Infantry',
    isSensitiveItem: false,
    condition: 'Serviceable',
    value: 450000
  },
  {
    id: 'ITEM-002',
    name: 'M249 SAW',
    serialNumber: 'M249-S-2467',
    nsn: '1005-01-342-0743',
    digitalTwinId: 'DT-M249-001',
    thumbnail: '/assets/images/m249.jpg',
    currentCustodian: 'B Co Arms Room',
    isSensitiveItem: true,
    condition: 'Serviceable',
    value: 4200
  },
  {
    id: 'ITEM-003',
    name: 'M249 SAW',
    serialNumber: 'M249-S-2468',
    nsn: '1005-01-342-0743',
    digitalTwinId: 'DT-M249-002',
    thumbnail: '/assets/images/m249.jpg',
    currentCustodian: 'B Co Arms Room',
    isSensitiveItem: true,
    condition: 'Serviceable',
    value: 4200
  },
  {
    id: 'ITEM-004',
    name: 'M249 SAW',
    serialNumber: 'M249-S-2469',
    nsn: '1005-01-342-0743',
    digitalTwinId: 'DT-M249-003',
    thumbnail: '/assets/images/m249.jpg',
    currentCustodian: 'B Co Arms Room',
    isSensitiveItem: true,
    condition: 'Serviceable',
    value: 4200
  },
  {
    id: 'ITEM-005',
    name: 'M249 SAW',
    serialNumber: 'M249-S-2470',
    nsn: '1005-01-342-0743',
    digitalTwinId: 'DT-M249-004',
    thumbnail: '/assets/images/m249.jpg',
    currentCustodian: 'B Co Arms Room',
    isSensitiveItem: true,
    condition: 'Serviceable',
    value: 4200
  },
  {
    id: 'ITEM-006',
    name: 'HMMWV #HQ-237',
    serialNumber: 'HQ-237-HMMWV',
    nsn: '2320-01-107-7155',
    digitalTwinId: 'DT-HMMWV-001',
    thumbnail: '/assets/images/hmmwv.jpg',
    currentCustodian: '3rd PLT, B Company',
    isSensitiveItem: false,
    condition: 'Maintenance Required',
    value: 220000
  },
  {
    id: 'ITEM-007',
    name: 'SINCGARS Radio',
    serialNumber: 'SIN-45678',
    nsn: '5820-01-357-0177',
    digitalTwinId: 'DT-RADIO-001',
    thumbnail: '/assets/images/radio.jpg',
    currentCustodian: 'B Company Comms',
    isSensitiveItem: true,
    condition: 'Serviceable',
    value: 18500
  },
  {
    id: 'ITEM-008',
    name: 'SINCGARS Radio',
    serialNumber: 'SIN-45679',
    nsn: '5820-01-357-0177',
    digitalTwinId: 'DT-RADIO-002',
    thumbnail: '/assets/images/radio.jpg',
    currentCustodian: 'B Company Comms',
    isSensitiveItem: true,
    condition: 'Serviceable',
    value: 18500
  },
  {
    id: 'ITEM-009',
    name: 'Generator 5kW',
    serialNumber: 'GEN-5KW-1234',
    nsn: '6115-01-274-7392',
    digitalTwinId: 'DT-GEN-001',
    thumbnail: '/assets/images/generator.jpg',
    currentCustodian: 'B Company Supply',
    isSensitiveItem: false,
    condition: 'Serviceable',
    value: 12000
  },
  {
    id: 'ITEM-010',
    name: 'Generator 5kW',
    serialNumber: 'GEN-5KW-1235',
    nsn: '6115-01-274-7392',
    digitalTwinId: 'DT-GEN-002',
    thumbnail: '/assets/images/generator.jpg',
    currentCustodian: 'B Company Supply',
    isSensitiveItem: false,
    condition: 'Serviceable',
    value: 12000
  }
];

// Mock entities
const mockEntities = {
  bco: {
    id: 'UNIT-001',
    name: 'B Company, 2-87 Infantry',
    type: 'UNIT',
    code: 'B/2-87'
  },
  armsRoom: {
    id: 'LOC-001',
    name: 'B Co Arms Room',
    type: 'UNIT',
    code: 'ARMS-B/2-87'
  },
  rangeControl: {
    id: 'LOC-002',
    name: 'Range Control',
    type: 'RANGE',
    code: 'RANGE-CTRL'
  },
  thirdPlt: {
    id: 'UNIT-002',
    name: '3rd PLT, B Company',
    type: 'UNIT',
    code: '3PLT-B/2-87'
  },
  bnMaint: {
    id: 'LOC-003',
    name: 'BN Maintenance',
    type: 'MAINTENANCE',
    code: 'MAINT-2-87'
  },
  div4: {
    id: 'UNIT-003',
    name: '10MTN DIV G4',
    type: 'SUPPLY',
    code: 'G4-10MTN'
  },
  motorPool: {
    id: 'LOC-004',
    name: 'B Co Motor Pool',
    type: 'UNIT',
    code: 'MP-B/2-87'
  },
  commsCage: {
    id: 'LOC-005',
    name: 'Comms Cage',
    type: 'SUPPLY',
    code: 'COMMS-2-87'
  }
} as const;

// Mock personnel
const mockPersonnel = {
  commander: {
    id: 'PER-001',
    name: 'Johnson',
    rank: 'CPT',
    position: 'Company Commander'
  },
  xo: {
    id: 'PER-002',
    name: 'Chen',
    rank: '1LT',
    position: 'Executive Officer'
  },
  supplySergeant: {
    id: 'PER-003',
    name: 'Wilson',
    rank: 'SSG',
    position: 'Supply Sergeant'
  },
  armorer: {
    id: 'PER-004',
    name: 'Martinez',
    rank: 'SGT',
    position: 'Unit Armorer'
  },
  maintOfficer: {
    id: 'PER-005',
    name: 'Patel',
    rank: 'CW2',
    position: 'Maintenance Officer'
  }
} as const;

// Mock transfers
export const mockTransfers: Transfer[] = [
  {
    id: 'T-2502-08',
    type: TransferType.RECEIPT,
    items: [mockItems[0]],
    from: mockEntities.div4,
    to: mockEntities.motorPool,
    initiatedBy: mockPersonnel.supplySergeant,
    dateInitiated: '2025-02-22T10:30:00Z',
    dueDate: (() => {
      const today = new Date();
      today.setHours(17, 0, 0, 0);
      return today.toISOString();
    })(),
    stage: TransferStage.PENDING_RECEIPT,
    priority: TransferPriority.HIGH,
    purpose: 'New equipment fielding',
    transportMethod: 'Organic transportation',
    blockchainTxId: '0x8a35b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198e7',
    documents: [
      {
        id: 'DOC-001',
        type: 'DA_FORM_3161',
        dateGenerated: '2025-02-22T10:45:00Z',
        url: '/docs/T-2502-08/da3161.pdf',
        signatures: [
          {
            role: 'Issuing Officer',
            name: 'Johnson',
            rank: 'MAJ',
            signedAt: '2025-02-22T10:50:00Z',
            verified: true
          }
        ],
        blockchainHash: '0x8a35b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198e7'
      }
    ],
    activities: [
      {
        id: 'ACT-001',
        transferId: 'T-2502-08',
        timestamp: '2025-02-22T10:30:00Z',
        activityType: 'INITIATION',
        user: mockPersonnel.supplySergeant,
        details: 'Transfer initiated from G4 to B Company',
        location: 'DIV HQ, Building 10250'
      },
      {
        id: 'ACT-002',
        transferId: 'T-2502-08',
        timestamp: '2025-02-22T10:45:00Z',
        activityType: 'APPROVAL',
        user: mockPersonnel.commander,
        details: 'Approved for receipt',
        location: 'B Company HQ, Building 8122'
      },
      {
        id: 'ACT-003',
        transferId: 'T-2502-08',
        timestamp: '2025-02-25T09:15:00Z',
        activityType: 'INSPECTION',
        user: mockPersonnel.supplySergeant,
        details: 'Equipment arrived for inspection',
        location: 'B Company Motor Pool'
      }
    ],
    location: {
      lat: 44.05,
      lng: -75.76,
      updatedAt: '2025-02-25T09:15:00Z'
    }
  },
  {
    id: 'T-2502-07',
    type: TransferType.RANGE,
    items: [mockItems[1], mockItems[2], mockItems[3], mockItems[4]],
    from: mockEntities.armsRoom,
    to: mockEntities.rangeControl,
    initiatedBy: mockPersonnel.xo,
    dateInitiated: '2025-02-24T08:15:00Z',
    dueDate: (() => {
      const today = new Date();
      today.setHours(17, 0, 0, 0);
      return today.toISOString();
    })(),
    returnDate: (() => {
      const today = new Date();
      today.setHours(17, 0, 0, 0);
      return today.toISOString();
    })(),
    stage: TransferStage.IN_TRANSIT,
    priority: TransferPriority.HIGH,
    purpose: 'Qualification range',
    transportMethod: 'Organic transportation',
    documents: [
      {
        id: 'DOC-002',
        type: 'DA_FORM_2062',
        dateGenerated: '2025-02-24T08:25:00Z',
        url: '/docs/T-2502-07/da2062.pdf',
        signatures: [
          {
            role: 'Issuing Officer',
            name: 'Martinez',
            rank: 'SGT',
            signedAt: '2025-02-24T08:30:00Z',
            verified: true
          },
          {
            role: 'Receiving Officer',
            name: 'Chen',
            rank: '1LT',
            signedAt: '2025-02-24T08:35:00Z',
            verified: true
          }
        ],
        blockchainHash: '0x9b25b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198f8'
      }
    ],
    activities: [
      {
        id: 'ACT-004',
        transferId: 'T-2502-07',
        timestamp: '2025-02-24T08:15:00Z',
        activityType: 'INITIATION',
        user: mockPersonnel.xo,
        details: 'Temporary transfer for range operations',
        location: 'B Company HQ, Building 8122'
      },
      {
        id: 'ACT-005',
        transferId: 'T-2502-07',
        timestamp: '2025-02-24T08:35:00Z',
        activityType: 'APPROVAL',
        user: mockPersonnel.commander,
        details: 'Approved for range operations',
        location: 'B Company HQ, Building 8122'
      },
      {
        id: 'ACT-006',
        transferId: 'T-2502-07',
        timestamp: '2025-02-24T16:45:00Z',
        activityType: 'RECEIPT',
        user: {
          id: 'PER-006',
          name: 'Taylor',
          rank: 'SFC',
          position: 'Range NCOIC'
        },
        details: 'Received at Range 17',
        location: 'Range 17'
      }
    ],
    location: {
      lat: 44.02,
      lng: -75.82,
      updatedAt: '2025-02-24T16:45:00Z'
    }
  },
  {
    id: 'T-2502-06',
    type: TransferType.MAINTENANCE,
    items: [mockItems[5]],
    from: mockEntities.thirdPlt,
    to: mockEntities.bnMaint,
    initiatedBy: mockPersonnel.xo,
    dateInitiated: '2025-02-23T09:30:00Z',
    dueDate: '2025-02-28T17:00:00Z',
    stage: TransferStage.IN_TRANSIT,
    priority: TransferPriority.ROUTINE,
    purpose: 'Scheduled maintenance',
    transportMethod: 'Self-delivery',
    documents: [
      {
        id: 'DOC-003',
        type: 'DA_FORM_2062',
        dateGenerated: '2025-02-23T09:35:00Z',
        url: '/docs/T-2502-06/da2404.pdf',
        signatures: [
          {
            role: 'Operator',
            name: 'Smith',
            rank: 'SPC',
            signedAt: '2025-02-23T09:40:00Z',
            verified: true
          }
        ],
        blockchainHash: '0x7c35b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198a9'
      }
    ],
    activities: [
      {
        id: 'ACT-007',
        transferId: 'T-2502-06',
        timestamp: '2025-02-23T09:30:00Z',
        activityType: 'INITIATION',
        user: mockPersonnel.xo,
        details: 'Initiated maintenance service request',
        location: 'B Company Motor Pool'
      },
      {
        id: 'ACT-008',
        transferId: 'T-2502-06',
        timestamp: '2025-02-23T10:15:00Z',
        activityType: 'APPROVAL',
        user: mockPersonnel.maintOfficer,
        details: 'Maintenance request approved',
        location: 'BN Maintenance Facility'
      }
    ],
    location: {
      lat: 44.04,
      lng: -75.79,
      updatedAt: '2025-02-23T10:15:00Z'
    }
  },
  {
    id: 'T-2501-14',
    type: TransferType.LATERAL,
    items: [mockItems[6], mockItems[7]],
    from: mockEntities.bco,
    to: mockEntities.commsCage,
    initiatedBy: mockPersonnel.supplySergeant,
    dateInitiated: '2025-01-28T13:45:00Z',
    dueDate: '2025-02-28T17:00:00Z',
    stage: TransferStage.PENDING_APPROVAL,
    priority: TransferPriority.HIGH,
    purpose: 'NTC Rotation Preparation',
    transportMethod: 'Hand carry',
    documents: [
      {
        id: 'DOC-004',
        type: 'DA_FORM_3161',
        dateGenerated: '2025-01-28T13:50:00Z',
        url: '/docs/T-2501-14/da3161.pdf',
        signatures: [
          {
            role: 'Issuing Officer',
            name: 'Wilson',
            rank: 'SSG',
            signedAt: '2025-01-28T13:55:00Z',
            verified: true
          }
        ],
        blockchainHash: '0x5d35b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198c2'
      }
    ],
    activities: [
      {
        id: 'ACT-009',
        transferId: 'T-2501-14',
        timestamp: '2025-01-28T13:45:00Z',
        activityType: 'INITIATION',
        user: mockPersonnel.supplySergeant,
        details: 'Lateral transfer initiated for NTC preparation',
        location: 'B Company HQ, Building 8122'
      }
    ]
  },
  {
    id: 'T-2502-05',
    type: TransferType.RECEIPT,
    items: [mockItems[8], mockItems[9]],
    from: mockEntities.div4,
    to: mockEntities.bco,
    initiatedBy: mockPersonnel.maintOfficer,
    dateInitiated: '2025-02-20T08:30:00Z',
    dueDate: '2025-02-25T17:00:00Z',
    stage: TransferStage.COMPLETED,
    priority: TransferPriority.MEDIUM,
    purpose: 'Equipment fielding',
    transportMethod: 'Commercial delivery',
    blockchainTxId: '0x6f35b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198d3',
    documents: [
      {
        id: 'DOC-005',
        type: 'DA_FORM_3161',
        dateGenerated: '2025-02-20T08:35:00Z',
        url: '/docs/T-2502-05/da3161.pdf',
        signatures: [
          {
            role: 'Issuing Officer',
            name: 'Roberts',
            rank: 'MAJ',
            signedAt: '2025-02-20T08:40:00Z',
            verified: true
          },
          {
            role: 'Receiving Officer',
            name: 'Patel',
            rank: 'CW2',
            signedAt: '2025-02-25T10:45:00Z',
            verified: true
          }
        ],
        blockchainHash: '0x6f35b7e0f3a623c88568a74a924f309363a08f1b44d9b6d98c97f0e98d2198d3'
      }
    ],
    activities: [
      {
        id: 'ACT-010',
        transferId: 'T-2502-05',
        timestamp: '2025-02-20T08:30:00Z',
        activityType: 'INITIATION',
        user: mockPersonnel.maintOfficer,
        details: 'Generator sets receipt from Division',
        location: 'DIV G4, Building 10250'
      },
      {
        id: 'ACT-011',
        transferId: 'T-2502-05',
        timestamp: '2025-02-20T09:15:00Z',
        activityType: 'APPROVAL',
        user: mockPersonnel.commander,
        details: 'Approved for receipt',
        location: 'B Company HQ, Building 8122'
      },
      {
        id: 'ACT-012',
        transferId: 'T-2502-05',
        timestamp: '2025-02-25T10:45:00Z',
        activityType: 'RECEIPT',
        user: mockPersonnel.maintOfficer,
        details: 'Equipment received and inspected',
        location: 'B Company Supply Room'
      }
    ]
  }
];

// Generate 20 additional transfers of various types
for (let i = 0; i < 20; i++) {
  const typeKeys = Object.keys(TransferType);
  const stageKeys = Object.keys(TransferStage);
  const priorityKeys = Object.keys(TransferPriority);
  
  const randomType = TransferType[typeKeys[Math.floor(Math.random() * typeKeys.length)] as keyof typeof TransferType];
  const randomStage = TransferStage[stageKeys[Math.floor(Math.random() * stageKeys.length)] as keyof typeof TransferStage];
  const randomPriority = TransferPriority[priorityKeys[Math.floor(Math.random() * priorityKeys.length)] as keyof typeof TransferPriority];
  
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-02-28');
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  
  const entityKeys = Object.keys(mockEntities);
  const randomFromEntityKey = entityKeys[Math.floor(Math.random() * entityKeys.length)];
  let randomToEntityKey;
  do {
    randomToEntityKey = entityKeys[Math.floor(Math.random() * entityKeys.length)];
  } while (randomToEntityKey === randomFromEntityKey);
  
  const randomFromEntity = mockEntities[randomFromEntityKey as keyof typeof mockEntities];
  const randomToEntity = mockEntities[randomToEntityKey as keyof typeof mockEntities];
  
  const personnelKeys = Object.keys(mockPersonnel);
  const randomPersonnelKey = personnelKeys[Math.floor(Math.random() * personnelKeys.length)];
  const randomPersonnel = mockPersonnel[randomPersonnelKey as keyof typeof mockPersonnel];
  
  const randomItemsCount = Math.floor(Math.random() * 3) + 1;
  const randomItems = [];
  for (let j = 0; j < randomItemsCount; j++) {
    const randomItemIndex = Math.floor(Math.random() * mockItems.length);
    randomItems.push(mockItems[randomItemIndex]);
  }
  
  mockTransfers.push({
    id: `T-AUTO-${i.toString().padStart(2, '0')}`,
    type: randomType,
    items: randomItems,
    from: randomFromEntity,
    to: randomToEntity,
    initiatedBy: randomPersonnel,
    dateInitiated: randomDate.toISOString(),
    dueDate: new Date(randomDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    stage: randomStage,
    priority: randomPriority,
    purpose: 'Auto-generated transfer',
    documents: [],
    activities: [
      {
        id: `ACT-AUTO-${i.toString().padStart(2, '0')}`,
        transferId: `T-AUTO-${i.toString().padStart(2, '0')}`,
        timestamp: randomDate.toISOString(),
        activityType: 'INITIATION',
        user: randomPersonnel,
        details: 'Auto-generated transfer initiated',
        location: 'Auto-generated location'
      }
    ]
  });
}

// Pipeline statistics
export const mockTransferPipeline: TransferPipeline = {
  stages: [
    {
      stage: TransferStage.INITIATED,
      count: mockTransfers.filter(t => t.stage === TransferStage.INITIATED).length,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.INITIATED)
    },
    {
      stage: TransferStage.PENDING_APPROVAL,
      count: mockTransfers.filter(t => t.stage === TransferStage.PENDING_APPROVAL).length,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.PENDING_APPROVAL)
    },
    {
      stage: TransferStage.IN_TRANSIT,
      count: mockTransfers.filter(t => t.stage === TransferStage.IN_TRANSIT).length,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.IN_TRANSIT)
    },
    {
      stage: TransferStage.PENDING_RECEIPT,
      count: mockTransfers.filter(t => t.stage === TransferStage.PENDING_RECEIPT).length,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.PENDING_RECEIPT)
    },
    {
      stage: TransferStage.COMPLETED,
      count: mockTransfers.filter(t => t.stage === TransferStage.COMPLETED).length,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.COMPLETED)
    }
  ]
};

// Metrics
export const mockTransferMetrics: TransferMetrics = {
  incomingTransfers: mockTransfers.filter(t => t.to.id === mockEntities.bco.id).length,
  outgoingTransfers: mockTransfers.filter(t => t.from.id === mockEntities.bco.id).length,
  pendingApproval: mockTransfers.filter(t => t.stage === TransferStage.PENDING_APPROVAL).length,
  temporaryHandReceipts: mockTransfers.filter(t => 
    t.type === TransferType.TEMPORARY || t.type === TransferType.RANGE
  ).length,
  stageBreakdown: {
    [TransferStage.INITIATED]: mockTransfers.filter(t => t.stage === TransferStage.INITIATED).length,
    [TransferStage.PENDING_APPROVAL]: mockTransfers.filter(t => t.stage === TransferStage.PENDING_APPROVAL).length,
    [TransferStage.IN_TRANSIT]: mockTransfers.filter(t => t.stage === TransferStage.IN_TRANSIT).length,
    [TransferStage.PENDING_RECEIPT]: mockTransfers.filter(t => t.stage === TransferStage.PENDING_RECEIPT).length,
    [TransferStage.COMPLETED]: mockTransfers.filter(t => t.stage === TransferStage.COMPLETED).length
  },
  typeBreakdown: {
    [TransferType.LATERAL]: mockTransfers.filter(t => t.type === TransferType.LATERAL).length,
    [TransferType.RECEIPT]: mockTransfers.filter(t => t.type === TransferType.RECEIPT).length,
    [TransferType.TURN_IN]: mockTransfers.filter(t => t.type === TransferType.TURN_IN).length,
    [TransferType.MAINTENANCE]: mockTransfers.filter(t => t.type === TransferType.MAINTENANCE).length,
    [TransferType.TEMPORARY]: mockTransfers.filter(t => t.type === TransferType.TEMPORARY).length,
    [TransferType.RANGE]: mockTransfers.filter(t => t.type === TransferType.RANGE).length
  },
  totalValueTransferred: mockTransfers.reduce((sum, transfer) => {
    return sum + transfer.items.reduce((itemSum, item) => itemSum + item.value, 0);
  }, 0)
};

// Mock QR scan results
export const mockRecentScans: QRScanResult[] = [
  {
    itemId: mockItems[0].id,
    serialNumber: mockItems[0].serialNumber,
    nsn: mockItems[0].nsn,
    success: true,
    error: undefined
  },
  {
    itemId: mockItems[1].id,
    serialNumber: mockItems[1].serialNumber,
    nsn: mockItems[1].nsn,
    success: true,
    error: undefined
  },
  {
    itemId: '',
    serialNumber: 'UNKNOWN-12345',
    nsn: undefined,
    success: false,
    error: 'Item not found in database'
  }
];

// Mock delegates for approvals
export const mockDelegates = [
  {
    id: 'PER-002',
    name: 'Chen',
    rank: '1LT',
    position: 'Executive Officer'
  },
  {
    id: 'PER-007',
    name: 'Rodriguez',
    rank: '1SG',
    position: 'First Sergeant'
  },
  {
    id: 'PER-003',
    name: 'Wilson',
    rank: 'SSG',
    position: 'Supply Sergeant'
  }
];

// Mock pipeline for the transfer process visualization
export const mockPipeline = {
  stages: [
    {
      stage: TransferStage.INITIATED,
      count: 15,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.INITIATED).slice(0, 3)
    },
    {
      stage: TransferStage.PENDING_APPROVAL,
      count: 20,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.PENDING_APPROVAL).slice(0, 3)
    },
    {
      stage: TransferStage.IN_TRANSIT,
      count: 5,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.IN_TRANSIT).slice(0, 3)
    },
    {
      stage: TransferStage.PENDING_RECEIPT,
      count: 36,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.PENDING_RECEIPT).slice(0, 3)
    },
    {
      stage: TransferStage.COMPLETED,
      count: 63,
      transfers: mockTransfers.filter(t => t.stage === TransferStage.COMPLETED).slice(0, 3)
    }
  ]
};

// Mock activities derived from transfers for recent activities display
export const mockActivities = mockTransfers.slice(0, 8).map(transfer => ({
  id: `ACT-${transfer.id}`,
  transferId: transfer.id,
  activityType: transfer.stage === TransferStage.PENDING_APPROVAL ? 'APPROVAL' : 
        transfer.stage === TransferStage.INITIATED ? 'INITIATION' :
        transfer.stage === TransferStage.PENDING_RECEIPT ? 'INSPECTION' :
        transfer.stage === TransferStage.IN_TRANSIT ? 'IN_TRANSIT' :
        transfer.stage === TransferStage.COMPLETED ? 'RECEIPT' : 'CANCELLATION',
  timestamp: new Date(transfer.dateInitiated).toISOString(),
  user: transfer.initiatedBy,
  details: `${transfer.initiatedBy.rank} ${transfer.initiatedBy.name} ${
    transfer.stage === TransferStage.PENDING_APPROVAL ? 'approved' : 
    transfer.stage === TransferStage.INITIATED ? 'initiated' :
    transfer.stage === TransferStage.PENDING_RECEIPT ? 'processed' :
    transfer.stage === TransferStage.IN_TRANSIT ? 'moved' :
    transfer.stage === TransferStage.COMPLETED ? 'completed' : 'updated'
  } transfer ${transfer.id} for ${transfer.items.length} item(s)`,
  location: `Building ${Math.floor(Math.random() * 100) + 1}`
})) as TransferActivity[];

// Mock pending transfers for approval (filtered from main transfers list)
export const mockPendingTransfers = mockTransfers.filter(
  transfer => transfer.stage === TransferStage.PENDING_APPROVAL
); 