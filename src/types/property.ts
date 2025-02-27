export type PropertyStatus = 'FMC' | 'NMC' | 'NMCS' | 'NMCM';
export type SubHandReceiptType = 'PRIMARY' | '1PLT' | '2PLT' | '3PLT' | 'HQ PLT';
export type EquipmentCategory = 'WEAPONS' | 'ROLLING_STOCK' | 'COMMS_CCI' | 'OPTICS_NVGS' | 'TPE_ITEMS' | 'COEI_BII' | 'CTA_50';
export type FLIPLStatus = 'OPEN' | 'CLOSED' | 'PENDING';

export interface PropertyItem {
  id: string;
  nomenclature: string;
  lin: string; // Line Item Number
  nsn: string;
  serialNumber: string; // Or bumper number for vehicles
  location: string;
  subHandReceipt: SubHandReceiptType;
  status: PropertyStatus;
  lastInventory: string;
  lastInspection?: string; // Date of last inspection
  nextInspectionDue?: string; // Date when next inspection is due
  inventoryType?: 'COC' | 'CYCLIC' | 'SENSITIVE' | 'MONTHLY';
  category: EquipmentCategory;
  isSensitiveItem: boolean;
  isCCI: boolean;
  flipl?: {
    status: FLIPLStatus;
    documentNumber?: string;
    openDate?: string;
  };
  maintenanceStatus?: {
    hasOpenWorkOrder: boolean;
    workOrderNumber?: string;
    deadline?: string;
    partsETA?: string;
  };
  blockchainTxId?: string;
  components?: {
    total: number;
    missing: number;
    shortages: Array<{
      nomenclature: string;
      nsn: string;
      quantity: number;
    }>;
  };
}

export interface PropertySummary {
  unitInfo: {
    unit: string;
    uic: string;
    primaryHandReceiptHolder: string;
  };
  mtoeAuthorization: {
    totalLines: number;
    fillPercentage: number;
  };
  sensitiveItems: {
    total: number;
    accounted: number;
    lastInventoryDate: string;
  };
  value: string; // Total value in dollars
  shortageAnnexes: number;
  lastUpdated: string;
  csdpStatus: 'GREEN' | 'AMBER' | 'RED';
}

export interface SubHandReceipt {
  type: SubHandReceiptType;
  holder: string;
  documentDate: string;
  itemCount: number;
}

export interface SupplyActivity {
  dtg: string;
  type: 'LATERAL_TRANSFER' | 'MAINTENANCE' | 'TURN_IN' | 'ISSUE';
  documentNumber: string;
  item: string;
  from: string;
  to: string;
  status: string;
  dueDate?: string;
}

export interface DeploymentSupport {
  ntcReadiness: string;
  jrpatStatus: string;
  tatRatPlanning: string;
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

export interface SensitiveItemsAccountability {
  dailyItems: {
    total: number;
    verified: number;
    reportComplete: boolean;
  };
  weeklyItems: {
    total: number;
    verified: number;
    dayComplete: string;
  };
  nextMonthlyInventory: string;
  openTracers: number;
  openSIRs: number;
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
  subHandReceipts: SubHandReceipt[];
  sensitiveItemsAccountability: SensitiveItemsAccountability;
  recentSupplyActivity: SupplyActivity[];
  deploymentSupport: DeploymentSupport;
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