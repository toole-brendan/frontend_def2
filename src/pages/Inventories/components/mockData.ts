import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { 
  InventoryData, 
  DiscrepancyData, 
  InventoryEvent, 
  InventoryRequirement,
  InventoryType,
  ActiveInventory,
  ComplianceItem
} from './types';

// Mock data for upcoming requirements
export const upcomingRequirements: InventoryRequirement[] = [
  { date: '27FEB', title: 'Weekly Sensitive Items', type: 'sensitive' },
  { date: '28FEB', title: 'Complete Monthly 10% (Vehicles)', type: 'cyclic' },
  { date: '01MAR', title: 'Monthly CSDP Review', type: 'csdp' },
  { date: '15MAR', title: 'Arms Room Custodian Change', type: 'arms' },
  { date: '15APR', title: 'Quarterly CSDP Inspection', type: 'csdp' }
];

// Mock inventory type colors for legend
export const inventoryTypes: InventoryType[] = [
  { name: 'Sensitive Items', color: '#ef5350', type: 'sensitive' }, // red
  { name: 'Cyclic Inventory', color: '#42a5f5', type: 'cyclic' }, // blue
  { name: 'Completed', color: '#66bb6a', type: 'completed' }, // green
  { name: 'Command Directed', color: '#ffca28', type: 'command' }, // yellow
  { name: 'CSDP Events', color: '#ab47bc', type: 'csdp' } // purple
];

// Mock calendar events for highlighting dates
export const calendarEvents: InventoryEvent[] = [
  { date: new Date(2025, 1, 27), type: 'sensitive' }, // 27FEB2025
  { date: new Date(2025, 1, 28), type: 'cyclic' }, // 28FEB2025
  { date: new Date(2025, 2, 1), type: 'csdp' }, // 01MAR2025
  { date: new Date(2025, 2, 15), type: 'arms' }, // 15MAR2025
  { date: new Date(2025, 3, 15), type: 'csdp' }, // 15APR2025
  { date: new Date(2025, 1, 20), type: 'completed' }, // Previous inventory
  { date: new Date(2025, 1, 23), type: 'completed' }, // Previous inventory
];

// Mock active inventory data
export const activeInventories: ActiveInventory[] = [
  {
    id: 'cyclic-vehicles',
    name: 'Monthly 10% Cyclic (Vehicles)',
    progress: 68,
    itemsVerified: 49,
    totalItems: 72,
    startDate: '20FEB2025',
    dueDate: '28FEB2025',
    assignedTo: '1LT Chen',
    assignedToAvatar: 'JC',
    status: 'In Progress',
    icon: 'vehicle'
  },
  {
    id: 'sensitive-weekly',
    name: 'Weekly Sensitive Items',
    progress: 0,
    itemsVerified: 0,
    totalItems: 210,
    startDate: '-',
    dueDate: '27FEB2025',
    assignedTo: 'CPT Rodriguez',
    assignedToAvatar: 'MR',
    status: 'Scheduled',
    lastCompleted: '23FEB2025 (100% verified)',
    icon: 'assignment'
  }
];

// Mock data for compliance table
export const complianceData: ComplianceItem[] = [
  { 
    type: 'Sensitive Items', 
    requirement: 'AR 710-2, Para 2-12', 
    frequency: 'Weekly', 
    lastConducted: '23FEB2025', 
    nextDue: '27FEB2025', 
    status: 'On Track' 
  },
  { 
    type: 'Cyclic (10%)', 
    requirement: 'AR 710-2, Para 2-12', 
    frequency: 'Monthly', 
    lastConducted: 'In Progress', 
    nextDue: '28FEB2025', 
    status: '68% Complete' 
  },
  { 
    type: 'CSDP Review', 
    requirement: 'AR 710-2, Para 2-8', 
    frequency: 'Monthly', 
    lastConducted: '01FEB2025', 
    nextDue: '01MAR2025', 
    status: 'Due Soon' 
  },
  { 
    type: 'Sub-Hand Receipt', 
    requirement: 'AR 710-2, Para 2-10', 
    frequency: 'Quarterly', 
    lastConducted: '15JAN2025', 
    nextDue: '15APR2025', 
    status: 'On Track' 
  },
  { 
    type: 'Change of Command', 
    requirement: 'AR 735-5, Para 2-8', 
    frequency: 'As Required', 
    lastConducted: '15NOV2024', 
    nextDue: 'N/A', 
    status: 'Complete' 
  }
];

// Mock data for inventory management
export const inventoryRows: InventoryData[] = [
  {
    id: 'si-weekly-27feb',
    type: 'Sensitive Items',
    schedule: 'Weekly',
    items: 210,
    progress: 0,
    status: 'Scheduled',
    officer: 'CPT Rodriguez',
    due: '27FEB',
    dueDate: new Date(2025, 1, 27)
  },
  {
    id: 'cyclic-vehicles-feb',
    type: 'Cyclic (Vehicles)',
    schedule: 'Monthly',
    items: 72,
    progress: 68,
    status: 'In Progress',
    officer: '1LT Chen',
    due: '28FEB',
    dueDate: new Date(2025, 1, 28)
  },
  {
    id: 'comms-command-feb',
    type: 'Comms Equipment',
    schedule: 'Command',
    items: 95,
    progress: 100,
    status: '2 Discrepancies',
    officer: '1LT Williams',
    due: 'Complete',
    dueDate: new Date(2025, 1, 22) // Completed already
  },
  {
    id: 'arms-custodian-mar',
    type: 'Arms Room',
    schedule: 'Change of Custodian',
    items: 143,
    progress: 0,
    status: 'Scheduled',
    officer: '1SG Martinez',
    due: '15MAR',
    dueDate: new Date(2025, 2, 15)
  },
  {
    id: 'ntc-predeployment-jun',
    type: 'NTC Pre-Deployment',
    schedule: 'Command',
    items: 342,
    progress: 0,
    status: 'Scheduled',
    officer: 'CPT Rodriguez',
    due: '01JUN',
    dueDate: new Date(2025, 5, 1)
  }
];

// Mock data for discrepancies
export const discrepancyRows: DiscrepancyData[] = [
  {
    id: 'disc-1',
    item: 'SINCGARS',
    serialNumber: 'RC-987-2441',
    expected: 'Comms Cage',
    found: 'Not Found',
    location: 'Unknown',
    status: 'Open'
  },
  {
    id: 'disc-2',
    item: 'Barrel, M240B',
    serialNumber: 'B-4567',
    expected: 'Arms Room',
    found: 'Found',
    location: 'Maintenance',
    status: 'Resolved'
  },
  {
    id: 'disc-3',
    item: 'ACH Helmet',
    serialNumber: 'H-12432',
    expected: '1st PLT',
    found: 'Damaged',
    location: '1st PLT',
    status: 'In Process'
  }
]; 