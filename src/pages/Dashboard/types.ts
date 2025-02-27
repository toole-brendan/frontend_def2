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

export interface AccountabilityStatusCardProps {
  overallRate: number;
  subHandReceipts: SubHandReceipt[];
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

export interface DashboardHeaderProps {
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
}

export interface DashboardFooterProps {
  gcssStatus: {
    connected: boolean;
    asOf: string;
    pbo: string;
    helpDesk: string;
  };
} 