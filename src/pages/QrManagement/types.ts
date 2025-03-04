/**
 * Types for the QR Management page and components
 */

// Tab values for navigation
export type TabValue = 'generate' | 'print' | 'manage' | 'damaged';

// Metrics displayed in the header
export interface QrMetrics {
  totalActive: number;
  unassigned: number;
  damaged: number;
}

// QR Code data structure
export interface QrCode {
  id: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'damaged';
  assignedTo?: string;
  equipmentType?: string;
  serialNumber?: string;
  nomenclature?: string;
  location?: string;
}

// Damaged QR Code report
export interface DamagedQrReport {
  id: string;
  qrCodeId: string;
  equipment: string;
  serialNumber: string;
  reportedOn: string;
  reportedBy: string;
  status: 'pending' | 'approved' | 'rejected' | 'replaced';
  damageDescription: string;
}

// Tab Panel Props
export interface TabPanelProps {
  children?: React.ReactNode;
  index: TabValue;
  value: TabValue;
}

// QR Tab Navigation Props
export interface QrTabNavigationProps {
  currentTab: TabValue;
  onChange: (value: TabValue) => void;
}

// QR Metrics Header Props
export interface QrMetricsHeaderProps {
  metrics: QrMetrics;
}

export interface QrCodeData {
  id: string;
  equipmentCategory: string;
  subCategory: string;
  nsn?: string;
  serialNumber: string;
  nomenclature: string;
  description?: string;
  model?: string;
  manufacturer?: string;
  acquisitionDate?: string;
  assignedTo?: string;
  location?: string;
  createdDate: string;
  printStatus: 'Printed' | 'Never Printed' | 'Reprint Needed';
  status: 'Assigned' | 'Available' | 'Pending Deactivation';
  blockchainVerified: boolean;
}

export interface DamagedQrCodeData {
  id: string;
  equipment: string;
  serialNumber: string;
  reportedOn: string;
  reportedBy: string;
  status: 'Awaiting Replacement' | 'Replaced';
  damageDescription?: string;
} 