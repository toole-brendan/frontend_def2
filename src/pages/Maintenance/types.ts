export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  location: string;
}

export interface Personnel {
  id: string;
  name: string;
  role: string;
  contact: string;
}

export interface Timeline {
  date: string;
  action: string;
  user: string;
  status: 'completed' | 'pending' | 'in_progress';
}

export interface Part {
  id: string;
  name: string;
  quantity: number;
  status: 'available' | 'ordered' | 'backordered';
}

export interface BlockchainRecord {
  hash: string;
  timestamp: string;
  action: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

export type MaintenanceStatus = 'pending_approval' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';
export type MaintenancePriority = 'routine' | 'urgent' | 'emergency';
export type MaintenanceCategory = 'preventive' | 'corrective' | 'condition_based' | 'predictive';

export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  category: MaintenanceCategory;
  equipment: Equipment;
  assignedPersonnel: Personnel[];
  timeline: Timeline[];
  startDate?: string;
  dueDate?: string;
  completionDate?: string;
  partsRequired: Part[];
  blockchainRecords: BlockchainRecord[];
  attachments: Attachment[];
  notes: string[];
} 