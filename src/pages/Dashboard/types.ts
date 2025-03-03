export interface PendingTransfer {
  id: string;
  itemName: string;
  from: string;
  to: string;
}

export interface MaintenanceRequest {
  id: string;
  itemName: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  name: string;
  value: number;
  count: number;
}

export interface CriticalItem {
  name: string;
  issue: string;
  status: 'CRITICAL' | 'WARNING';
}

export interface PersonnelStats {
  totalPersonnel: number;
  fullyEquipped: number;
  partiallyEquipped: number;
  overdueItems: number;
}

export interface User {
  rank: string;
  name: string;
}

export interface Activity {
  id: string;
  type: 'Transfer' | 'Maintenance' | 'Inspection';
  description: string;
  user: User;
  timestamp: string;
  status: 'COMPLETED' | 'IN PROGRESS';
}

export interface Notification {
  id: string;
  type: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}

export interface PropertyStats {
  totalItems: number;
  serviceableItems: number;
  maintenanceNeeded: number;
  pendingTransfers: {
    count: number;
    items: PendingTransfer[];
  };
  maintenanceRequests: {
    count: number;
    items: MaintenanceRequest[];
  };
  overdueItems: number;
  categories: Category[];
  criticalItems: CriticalItem[];
}

export interface DashboardData {
  propertyStats: PropertyStats;
  personnelStats: PersonnelStats;
  activities: Activity[];
  notifications: Notification[];
  unitInfo: {
    name: string;
    classVIIItems: number;
    dollarValue: string;
    accountabilityRate: number;
    sensitiveItemStatus: {
      accountedFor: number;
      lastInventory: string;
    };
  };
  accountabilityStatus: {
    overallRate: number;
    subHandReceipts: SubHandReceipt[];
  };
  commandDirectedActions: CommandDirectedAction[];
  sensitiveItems: SensitiveItem[];
  maintenanceReadiness: {
    statuses: MaintenanceStatus[];
  };
  battalionActivities: BattalionActivity[];
  commandSupplyActions: CommandSupplyAction[];
  gcssStatus: {
    connected: boolean;
    asOf: string;
    pbo: string;
    helpDesk: string;
  };
}

export interface UnitInventoryOverviewProps {
  stats: {
    criticalItems: Array<{
      name: string;
      issue: string;
      status: 'CRITICAL' | 'WARNING';
    }>;
  };
  onViewAll: () => void;
}

export interface PersonnelOverviewProps {
  stats: PersonnelStats;
}

export interface SubHandReceipt {
  officer: string;
  platoon: string;
  itemCount: number;
  status: 'OK' | 'WARNING' | 'ERROR';
  statusMessage?: string;
}

export interface CommandDirectedAction {
  id: string;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'OVERDUE' | 'COMPLETED';
}

export interface SensitiveItem {
  nomenclature: string;
  serialOrNsn: string;
  subHandReceipt: string;
  lastPmcs: string;
  status: 'FMC' | 'PMC-A' | 'PMC-B' | 'NMC';
}

export interface MaintenanceStatus {
  category: string;
  total: number;
  fmc: number;
  pmcA: number;
  pmcB: number;
  nmc: number;
}

export interface BattalionActivity {
  id: string;
  timestamp: string;
  person: string;
  description: string;
}

export interface CommandSupplyAction {
  id: string;
  label: string;
  icon: string;
  action: string;
}

export interface CommandDirectedActionsProps {
  actions: CommandDirectedAction[];
}

export interface SensitiveItemsTableProps {
  items: SensitiveItem[];
}

export interface MaintenanceReadinessCardProps {
  statuses: MaintenanceStatus[];
}

export interface BattalionActivityFeedProps {
  activities: BattalionActivity[];
}

export interface CommandSupplyActionsProps {
  actions: CommandSupplyAction[];
}

// Dashboard Header - Combined definition
export interface DashboardHeaderProps {
  // Legacy props
  unitInfo?: {
    name: string;
    classVIIItems: number;
    dollarValue: string;
    accountabilityRate: number;
    sensitiveItemStatus: {
      accountedFor: number;
      lastInventory: string;
    };
  };
  // New props
  title?: string;
  user?: string;
  totalValue?: string;
  equipmentItems?: number;
  sensitiveItemsStatus?: string;
  dateTime?: string;
}

export interface DashboardFooterProps {
  gcssStatus: {
    connected: boolean;
    asOf: string;
    pbo: string;
    helpDesk: string;
  };
}

// Equipment Category
export interface EquipmentCategory {
  name: string;
  count: string;
  percentage: number;
  lastVerified: string;
  note?: string;
}

// Accountability Status Card - Combined definition
export interface AccountabilityStatusCardProps {
  overallRate: number;
  // Legacy props
  subHandReceipts?: SubHandReceipt[];
  // New props
  sensitiveItems?: {
    verified: string;
    lastVerification: string;
    nextRequired: string;
  };
  equipmentCategories?: EquipmentCategory[];
  onStartInventory?: () => void;
}

// Command Action Items Card
export interface CommandAction {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  item: string;
  type: string;
  deadline: string;
  action: string;
}

export interface CommandActionItemsCardProps {
  actions: CommandAction[];
  onViewAllActions: () => void;
}

// NTC Rotation Readiness Card
export interface Milestone {
  name: string;
  status: 'Complete' | 'Pending' | 'Delayed';
  date: string;
  daysRemaining: number | null;
}

export interface NTCRotationReadinessCardProps {
  title: string;
  daysToDeployment: number;
  equipmentStatus: {
    requiredItems: number;
    currentOnHand: number;
    percentage: number;
    criticalShortages: number;
    serviceability: number;
  };
  milestones: Milestone[];
  onViewNTCPlan: () => void;
}

// Property Distribution Visualization
export interface PropertyDistributionVisualizationProps {}

// Critical Equipment Status Table
export interface EquipmentItem {
  equipment: string;
  serialBumper: string;
  status: 'FMC' | 'PMC' | 'NMC' | 'In Process';
  location: string;
  issue: string;
  actionRequired: string;
  due: string;
}

export interface CriticalEquipmentStatusTableProps {
  equipment: EquipmentItem[];
}

// Upcoming Accountability Requirements
export interface Requirement {
  name: string;
  due: string;
  daysRemaining?: number;
  progress?: number | null;
}

export interface UpcomingAccountabilityRequirementsProps {
  weeklyRequirements: Requirement[];
  monthlyRequirements: Requirement[];
  quarterlyRequirements: Requirement[];
  onStartInventory: () => void;
}

// Recent Activity Feed
export interface DashboardActivity {
  date: string;
  time: string;
  activity: string;
  personnel: string;
  details: string;
  status: 'Complete' | 'In Progress' | 'Temporary';
}

export interface RecentActivityFeedProps {
  activities: DashboardActivity[];
  onViewAllActivity: () => void;
}

// Quick Action Panel
export interface Action {
  label: string;
  icon: string;
  action: string | (() => void);
}

export interface QuickActionPanelProps {
  actions: Action[];
}

// System Status Footer
export interface SystemStatusFooterProps {
  connectionStatus: string;
  lastUpdate: string;
  mobileAppStatus: string;
  systemNotice: string;
}

// Equipment Readiness Chart
export interface ReadinessDataPoint {
  name: string;
  value: number;
}

export interface EquipmentReadinessChartProps {
  data: ReadinessDataPoint[];
}
