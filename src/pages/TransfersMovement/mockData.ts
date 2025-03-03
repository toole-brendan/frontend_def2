import { TransferItem, PriorityTransfer, ActivityItem, TransferDocType } from './types';

// Enhanced military-styled mock data
export const transferData: TransferItem[] = [
  { id: 'TR-1225-08A', type: 'HANDRECEIPT', items: 'JLTV, M1316A1 NSN 2320-01-670-6066', from: '10MTN DIV G4 SUPPLY', to: 'B CO 2-87 MTR POOL', initiated: '22FEB2025', due: 'TODAY', status: 'AWAITING RECEIPT', priority: 'HIGH' },
  { id: 'TR-1224-11B', type: 'DA3161', items: 'M249 SAW NSN 1005-01-127-7510 (4)', from: 'B CO 2-87 ARMS RM', to: 'RNG CTRL FAC', initiated: '24FEB2025', due: '25FEB 1700', status: 'TEMP HAND RECEIPT', priority: 'HIGH' },
  { id: 'TR-1223-04C', type: 'DA3161', items: 'HMMWV M1151A1 NSN 2320-01-540-1993', from: '3PLT B CO 2-87', to: 'BN MAINT SEC', initiated: '23FEB2025', due: '28FEB2025', status: 'AT MAINTENANCE', priority: 'ROUTINE' },
  { id: 'TR-1222-09D', type: 'LATERAL', items: 'GEN SET MEP-1030 NSN 6115-01-574-7617 (2)', from: 'HQ PLT B CO 2-87', to: '1PLT B CO 2-87', initiated: '22FEB2025', due: '25FEB2025', status: 'COMPLETE', priority: 'ROUTINE' },
  { id: 'TR-1221-03E', type: 'INVENTORY', items: 'RADIO SET AN/PRC-117G NSN 5820-01-579-6280', from: 'B CO 2-87 COMMO', to: '2BCT 10MTN S4', initiated: '21FEB2025', due: '27FEB2025', status: 'PENDING APPROVAL', priority: 'MEDIUM' }
];

export const priorityTransfers: PriorityTransfer[] = [
  { 
    id: 'TR-1225-08A', 
    type: 'HANDRECEIPT', 
    docNumber: 'HAND RECEIPT 08A-25', 
    unit: 'B CO 2-87 Infantry',
    items: 'JLTV, M1316A1 NSN 2320-01-670-6066', 
    fromTo: '2BCT 10MTN S4 → B CO 2-87', 
    due: 'TODAY', 
    dueDate: '25 Feb 2025',
    daysLeft: 'Due Today',
    status: 'OVERDUE', 
    action: 'INSPECT & SIGN' 
  },
  { 
    id: 'TR-1224-11B', 
    type: 'DA3161', 
    docNumber: 'DA 3161 11B-24',
    unit: 'Range Control',
    items: 'M249 SAW NSN 1005-01-127-7510 (4)', 
    fromTo: 'ARMS RM → RNG CTRL', 
    due: 'TODAY', 
    dueDate: '25 Feb 2025 1700',
    daysLeft: 'Due by 1700',
    status: 'PENDING', 
    action: 'PROCESS RETURN' 
  },
  { 
    id: 'TR-1220-14F', 
    type: 'LATERAL', 
    docNumber: 'LT-XFER 14F-20',
    unit: 'COMMS Section',
    items: 'RADIO SET AN/PRC-152 (12)', 
    fromTo: 'B CO 2-87 → COMMS CAGE', 
    due: '28FEB', 
    dueDate: '28 Feb 2025',
    daysLeft: '3 days remaining',
    status: 'PENDING', 
    action: 'FOLLOW UP' 
  }
];

export const recentActivity: ActivityItem[] = [
  { date: '25FEB2025', time: '1045', activity: 'APPROVAL', id: 'TR-1222-09D', personnel: 'CW2 PATEL, N.', items: 'GEN SET MEP-1030 (2)', status: 'COMPLETE' },
  { date: '25FEB2025', time: '0915', activity: 'INSPECTION', id: 'TR-1225-08A', personnel: 'SSG WILSON, T.', items: 'JLTV, M1316A1', status: 'IN PROCESS' },
  { date: '24FEB2025', time: '1645', activity: 'INITIATION', id: 'TR-1224-11B', personnel: '1LT CHEN, A.', items: 'M249 SAW (4)', status: 'TEMPORARY' }
];

// Transfer statistics summary
export const transferStats = {
  incoming: 37,
  outgoing: 24,
  pending: 13,
  temporary: 8
};

// Transfer pipeline step counts
export const pipelineStats = {
  initiated: 15,
  pendingApproval: 13,
  inTransit: 24,
  pendingReceipt: 9,
  completed: 28
};
