import { SensitiveItemsData } from '../../../types/sensitiveItems';

// Extended mock data
const mockData: SensitiveItemsData = {
  companyInfo: "B Company, 2-87 Infantry",
  accountabilityStats: {
    total: 210,
    accounted: 209,
    percentage: 99.5
  },
  nextInventory: "Today 1700",
  armsRoom: {
    name: "Alpha Company Arms Room",
    status: "SECURE",
    lastAccess: {
      timestamp: "25FEB2025 0730",
      person: "1LT Chen",
      role: "Arms Room Officer"
    },
    custodian: {
      name: "SFC Martinez",
      appointedDate: "01JAN2025"
    },
    weapons: {
      stored: 143,
      signedOut: 7,
      total: 150
    },
    tempHandReceipts: 3,
    maintenanceItems: 2
  },
  sensitiveItems: [
    { 
      id: '1', 
      item: 'M4 Carbine', 
      type: 'Weapon', 
      serialNumber: '12496352', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '1LT Morgan', 
      lastVerified: '25FEB2025 0730',
      status: 'Verified'
    },
    { 
      id: '2', 
      item: 'M9 Pistol', 
      type: 'Weapon', 
      serialNumber: '11857493', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: 'CPT Rodriguez', 
      lastVerified: '25FEB2025 0735',
      status: 'Verified'
    },
    { 
      id: '3', 
      item: 'M240B', 
      type: 'Weapon', 
      serialNumber: 'M2405689', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '1LT Chen', 
      lastVerified: '25FEB2025 0740',
      status: 'Verified'
    },
    { 
      id: '4', 
      item: 'M249 SAW', 
      type: 'Weapon', 
      serialNumber: 'LW12937', 
      category: 'A', 
      location: 'Range Control', 
      assignedTo: '1LT Chen', 
      lastVerified: '24FEB2025 1400',
      status: 'Verified'
    },
    { 
      id: '5', 
      item: 'ACOG Sight', 
      type: 'Optic', 
      serialNumber: 'AC45690', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '1LT Morgan', 
      lastVerified: '25FEB2025 0730',
      status: 'Verified'
    },
    { 
      id: '6', 
      item: 'PAS-13 Thermal Sight', 
      type: 'Optic', 
      serialNumber: '13879TR', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '1LT Williams', 
      lastVerified: '25FEB2025 0745',
      status: 'Verified'
    },
    { 
      id: '7', 
      item: 'DAGR GPS', 
      type: 'Electronics', 
      serialNumber: '45R-6789', 
      category: 'A', 
      location: 'Comms Cage', 
      assignedTo: '1LT Williams', 
      lastVerified: '25FEB2025 0800',
      status: 'Verified'
    },
    { 
      id: '8', 
      item: 'SINCGARS Radio', 
      type: 'Comms', 
      serialNumber: 'RC-987-2441', 
      category: 'A', 
      location: 'Maintenance', 
      assignedTo: 'Comms Team', 
      lastVerified: '23FEB2025 1500',
      status: 'In Repair'
    },
    { 
      id: '9', 
      item: 'PVS-14 NVG', 
      type: 'Optic', 
      serialNumber: 'NV567321', 
      category: 'A', 
      location: 'Arms Room', 
      assignedTo: '2LT Johnson', 
      lastVerified: '25FEB2025 0750',
      status: 'Pending Verification'
    },
    { 
      id: '10', 
      item: 'ANCD', 
      type: 'Crypto', 
      serialNumber: 'CYP78654', 
      category: 'A', 
      location: 'S-2 Vault', 
      assignedTo: 'CPT Rodriguez', 
      lastVerified: '25FEB2025 0810',
      status: 'Verified'
    }
  ],
  inventoryHistory: [
    {
      id: 'INV-2502-1',
      date: '25FEB2025',
      time: '0730',
      type: 'Daily Check',
      conductor: '1LT Chen',
      items: 210,
      found: 209,
      missing: 1,
      status: 'Complete',
      notes: 'SINCGARS Radio at maintenance'
    },
    {
      id: 'INV-2402-1',
      date: '24FEB2025',
      time: '0715',
      type: 'Daily Check',
      conductor: '1LT Morgan',
      items: 210,
      found: 210,
      missing: 0,
      status: 'Complete',
      notes: 'All items verified'
    },
    {
      id: 'INV-2302-1',
      date: '23FEB2025',
      time: '0730',
      type: 'Daily Check',
      conductor: '1LT Williams',
      items: 210,
      found: 208,
      missing: 2,
      status: 'Complete',
      notes: 'SINCGARS sent to maintenance, M249 SAW signed out to range'
    },
    {
      id: 'INV-1902-1',
      date: '19FEB2025',
      time: '0930',
      type: 'Weekly Check',
      conductor: 'CPT Rodriguez',
      items: 210,
      found: 210,
      missing: 0,
      status: 'Complete',
      notes: 'Command-directed 100% inventory'
    }
  ],
  scheduleInventories: [
    {
      id: 'SINV-2502-1',
      date: '25FEB2025',
      time: '1700',
      type: 'Daily Check',
      conductor: 'CPT Rodriguez',
      items: 210,
      status: 'Scheduled',
      notes: 'End of day verification'
    },
    {
      id: 'SINV-2602-1',
      date: '26FEB2025',
      time: '0730',
      type: 'Daily Check',
      conductor: '1LT Morgan',
      items: 210,
      status: 'Scheduled',
      notes: 'Morning verification'
    },
    {
      id: 'SINV-2602-2',
      date: '26FEB2025',
      time: '1700',
      type: 'Daily Check',
      conductor: '1LT Chen',
      items: 210,
      status: 'Scheduled',
      notes: 'End of day verification'
    },
    {
      id: 'SINV-0103-1',
      date: '01MAR2025',
      time: '0900',
      type: 'Monthly Check',
      conductor: 'CPT Rodriguez',
      items: 210,
      status: 'Scheduled',
      notes: 'Monthly 100% sensitive items inventory'
    },
    {
      id: 'SINV-1503-1',
      date: '15MAR2025',
      time: '0900',
      type: 'CSDP',
      conductor: '1SG Martinez',
      items: 210,
      status: 'Scheduled',
      notes: 'Command Supply Discipline Program review'
    }
  ],
  analytics: {
    weeklyInventories: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Inventories Conducted',
          data: [7, 7, 7, 6],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Discrepancies Found',
          data: [0, 1, 2, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    itemCategoryDistribution: {
      labels: ['Weapons', 'Optics', 'Comms', 'Crypto', 'Electronics'],
      datasets: [
        {
          label: 'Distribution',
          data: [150, 32, 18, 5, 5],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    verificationTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Verification Compliance',
          data: [98, 100, 99.5, 100, 100, 99.5],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          tension: 0.2
        }
      ]
    }
  }
};

export default mockData;
