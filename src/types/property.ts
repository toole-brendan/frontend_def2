export type PropertyStatus = 'FMC' | 'PMC' | 'NMC';

export interface PropertyItem {
  id: string;
  nsn: string;
  nomenclature: string;
  serialNumber: string;
  status: PropertyStatus;
  lastInspection: string;
  nextInspectionDue: string;
  location?: string;
  assignedTo?: string;
  category?: string;
  custodyStartDate?: string;
  blockchainTxId?: string;
  lin?: string; // Line Item Number
}

export interface PropertySummary {
  totalItems: number;
  serviceableItems: number;
  upcomingInspections: {
    next7Days: number;
    next30Days: number;
  };
  disputedItems: number;
}

export interface CustodyEvent {
  id: string;
  itemId: string;
  type: 'TRANSFER' | 'RECEIPT' | 'INVENTORY';
  fromUserId: string;
  toUserId: string;
  timestamp: string;
  notes?: string;
  attachments?: string[];
  blockchainTxId?: string;
}

export interface MaintenanceLog {
  id: string;
  itemId: string;
  type: 'SCHEDULED' | 'UNSCHEDULED' | 'REPAIR';
  description: string;
  performedBy: string;
  timestamp: string;
  nextDue?: string;
  parts?: string[];
  attachments?: string[];
  workOrderNumber?: string;
  technicianCertification?: string;
}

export interface InspectionChecklist {
  id: string;
  itemId: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  inspectedBy: string;
  timestamp: string;
  items: Array<{
    description: string;
    status: 'PASS' | 'FAIL' | 'N/A';
    notes?: string;
    deficiencyCategory?: 'CRITICAL' | 'MAJOR' | 'MINOR';
  }>;
  attachments?: string[];
  technicianCertification?: string;
  supervisorApproval?: {
    approvedBy: string;
    timestamp: string;
    notes?: string;
  };
}

export interface Attachment {
  id: string;
  itemId: string;
  type: 'IMAGE' | 'DOCUMENT' | 'OTHER';
  name: string;
  url: string;
  uploadedBy: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
  classification?: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  securityCaveats?: string[];
}

export interface MissingDocument {
  itemId: string;
  documentType: string;
  dueDate: string;
}

export interface ComplianceStatus {
  itemsInspected: {
    total: number;
    completed: number;
  };
  trainingCertifications: {
    total: number;
    completed: number;
  };
  missingDocuments: MissingDocument[];
}

export interface PropertyState {
  summary: PropertySummary;
  equipmentList: PropertyItem[];
  selectedItemId: string | null;
  selectedItemDetails: {
    item: PropertyItem | null;
    custodyHistory: CustodyEvent[];
    maintenanceLogs: MaintenanceLog[];
    inspectionChecklists: InspectionChecklist[];
    attachments: Attachment[];
  } | null;
  complianceStatus: ComplianceStatus;
  loading: {
    summary: boolean;
    equipmentList: boolean;
    itemDetails: boolean;
    compliance: boolean;
  };
  error: Partial<Record<keyof PropertyState['loading'], string>>;
  view: 'card' | 'table';
} 