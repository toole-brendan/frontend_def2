// Common types for the Inventories & Inspections page components

export interface InventoryData {
  id: string;
  type: string;
  schedule: string;
  items: number;
  progress: number;
  status: string;
  officer: string;
  due: string;
  dueDate: Date;
}

export interface DiscrepancyData {
  id: string;
  item: string;
  serialNumber: string;
  expected: string;
  found: string;
  location: string;
  status: string;
}

export interface InventoryEvent {
  date: Date;
  type: string;
}

export interface InventoryRequirement {
  date: string;
  title: string;
  type: string;
}

export interface InventoryType {
  name: string;
  color: string;
  type: string;
}

export interface ActiveInventory {
  id: string;
  name: string;
  progress: number;
  itemsVerified: number;
  totalItems: number;
  startDate: string;
  dueDate: string;
  assignedTo: string;
  assignedToAvatar: string;
  status: string;
  lastCompleted?: string;
  icon: string;
}

export interface ComplianceItem {
  type: string;
  requirement: string;
  frequency: string;
  lastConducted: string;
  nextDue: string;
  status: string;
} 