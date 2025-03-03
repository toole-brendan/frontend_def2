export const readinessData = {
  overallReadiness: 87,
  equipmentStatus: {
    fullyMissionCapable: 245,
    partiallyMissionCapable: 32,
    nonMissionCapable: 18,
    totalEquipment: 295
  },
  maintenanceStatus: {
    scheduledServices: 14,
    pendingWorkOrders: 27,
    deadlinedItems: 18
  },
  readinessByCategory: [
    { category: "Vehicles", readinessRate: 92, total: 85, mission_capable: 78 },
    { category: "Communications", readinessRate: 89, total: 112, mission_capable: 100 },
    { category: "Weapons Systems", readinessRate: 95, total: 63, mission_capable: 60 },
    { category: "Power Generation", readinessRate: 72, total: 35, mission_capable: 25 }
  ],
  recentActivity: [
    { action: "5988-E Submitted", item: "HMMWV #A23145", user: "SPC Thompson", datetime: "25FEB2025 0730", status: "Pending" },
    { action: "Service Complete", item: "Generator #P45128", user: "SSG Wilson", datetime: "24FEB2025 1630", status: "Complete" },
    { action: "Deadline Report", item: "LMTV #B56789", user: "1LT Chen", datetime: "24FEB2025 0900", status: "Approved" }
  ]
};
