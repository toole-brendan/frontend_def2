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