export interface InventoryItem {
  id: string;
  name: string;
  nsn: string;
  serialNumber: string;
  status: 'available' | 'in_use' | 'under_maintenance';
  location: string;
  assignedTo: string | null;
  unit: string;
  category: string;
  lastUpdated: string;
}

export interface UnitHierarchy {
  id: string;
  name: string;
  level: 'company' | 'platoon' | 'squad' | 'team';
  children?: UnitHierarchy[];
}

export interface InventoryMetrics {
  totalItems: number;
  itemsInUse: number;
  itemsAvailable: number;
  itemsUnderMaintenance: number;
}

export interface InventoryFilters {
  search: string;
  status: string;
  category: string;
  location: string;
  assignedTo: string;
  unitLevel: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: InventoryFilters;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  performedBy: string;
  nextDueDate?: string;
}

export interface AssignmentHistory {
  id: string;
  date: string;
  assignedTo: string;
  assignedBy: string;
  action: 'issued' | 'returned';
}

export interface ItemDetails extends InventoryItem {
  maintenanceHistory: MaintenanceRecord[];
  assignmentHistory: AssignmentHistory[];
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
} 