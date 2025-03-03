// Mock data for the Dashboard
export const accountabilityData = {
  overall: 99.4,
  sensitiveItems: { verified: 210, total: 210, lastVerified: "23FEB2025 0830", nextRequired: "27FEB2025" },
  categories: [
    { name: "Weapons", verified: 143, total: 143, lastVerified: "23FEB2025", status: "complete" },
    { name: "Vehicles", verified: 71, total: 72, lastVerified: "22FEB2025", status: "warning" },
    { name: "Communications", verified: 95, total: 95, lastVerified: "20FEB2025", status: "complete" },
    { name: "Optics/NVGs", verified: 63, total: 63, lastVerified: "23FEB2025", status: "complete" },
  ]
};

export const actionItems = [
  { priority: "HIGH", item: "New JLTV Receipt", type: "Acquisition", deadline: "TODAY", status: "urgent" },
  { priority: "HIGH", item: "SINCGARS (SN: RC-987-2441)", type: "Maintenance", deadline: "OVERDUE", status: "urgent" },
  { priority: "MEDIUM", item: "3rd PLT Hand Receipt", type: "Transfer", deadline: "27FEB", status: "warning" },
];

export const ntcReadiness = {
  daysToDeployment: 121,
  equipmentStatus: {
    required: 503,
    onHand: 342,
    criticalShortages: 27,
    serviceability: 84
  },
  milestones: [
    { name: "Equipment Identification", status: "complete", date: "Complete" },
    { name: "Initial Sourcing Plan", status: "pending", date: "01MAR (4 days)" },
    { name: "Maintenance Completion", status: "future", date: "15MAY" },
    { name: "Load Plans Due", status: "future", date: "01JUN" },
  ]
};

export const criticalEquipment = [
  { id: 1, equipment: "HMMWV", serialNumber: "HQ-237", status: "PMC", location: "Motor Pool", issue: "Brake system", action: "Maintenance Request", due: "28FEB" },
  { id: 2, equipment: "JLTV", serialNumber: "Pending", status: "In Process", location: "Brigade S4", issue: "New receipt", action: "Command Signature", due: "TODAY" },
  { id: 3, equipment: "SINCGARS", serialNumber: "RC-987-2441", status: "NMC", location: "Maintenance", issue: "Missing components", action: "FLIPL Initiation", due: "OVERDUE" },
  { id: 4, equipment: "M240B", serialNumber: "M2405689", status: "FMC", location: "Arms Room", issue: "None", action: "Weekly Verification", due: "28FEB" },
];

export const upcomingRequirements = [
  { name: "Sensitive Items Inventory", dueDate: "27FEB", type: "weekly", status: "2 days remaining" },
  { name: "Weapons Count Verification", dueDate: "28FEB", type: "weekly", status: "3 days remaining" },
  { name: "CSDP Monthly Review", dueDate: "01MAR", type: "weekly", status: "4 days remaining" },
  { name: "10% Cyclic Inventory (Vehicles)", dueDate: "28FEB", type: "monthly", status: "68% Complete" },
  { name: "Monthly Supply Activity Report", dueDate: "01MAR", type: "monthly", status: "Due 01MAR" },
  { name: "CSDP Formal Review", dueDate: "15APR", type: "quarterly", status: "49 days remaining" },
];

export const recentActivity = [
  { date: "25FEB", time: "0730", activity: "Sensitive Item Inventory", personnel: "1LT Chen", details: "Completed daily verification", status: "Complete" },
  { date: "24FEB", time: "1645", activity: "Equipment Transfer", personnel: "CW2 Patel", details: "Approved 4x M249 SAW to Range", status: "Temporary" },
  { date: "24FEB", time: "1432", activity: "Maintenance Request", personnel: "SSG Wilson", details: "HMMWV #HQ-237 brake system", status: "In Progress" },
  { date: "23FEB", time: "0915", activity: "CSDP Certification", personnel: "CPT Rodriguez", details: "Signed monthly certification", status: "Complete" },
];

export const quickActions = [
  { name: "Conduct Sensitive Item Inventory", icon: "Package" },
  { name: "Sign Pending Hand Receipts", icon: "QrCode" },
  { name: "Review Transfer Requests", icon: "ClipboardList" },
  { name: "Generate Property Report", icon: "BarChart" },
];

export const distributionData = [
  { name: "1st PLT", value: 180, color: "#8884d8" },
  { name: "2nd PLT", value: 200, color: "#82ca9d" },
  { name: "3rd PLT", value: 190, color: "#ffc658" },
  { name: "HQ PLT", value: 151, color: "#ff8042" },
];

export const readinessData = [
  { name: "JAN", value: 84 },
  { name: "FEB", value: 89 },
  { name: "MAR", value: 88 },
  { name: "APR", value: 92 },
  { name: "MAY", value: 95 },
  { name: "JUN", value: 91 },
];
