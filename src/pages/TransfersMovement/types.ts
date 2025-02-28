import { ReactNode } from 'react';

// Types for Transfer Management

// Enum for transfer types
export enum TransferType {
  LATERAL = 'Lateral Transfer',
  RECEIPT = 'Receipt',
  TURN_IN = 'Turn-in',
  MAINTENANCE = 'Maintenance',
  TEMPORARY = 'Temporary Issue',
  RANGE = 'Range Issue'
}

// Enum for transfer stages/status
export enum TransferStage {
  INITIATED = 'Initiated',
  PENDING_APPROVAL = 'Pending Approval',
  IN_TRANSIT = 'In Transit',
  PENDING_RECEIPT = 'Pending Receipt',
  COMPLETED = 'Completed'
}

// Enum for transfer priority
export enum TransferPriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  ROUTINE = 'Routine'
}

// Document types
export type DocumentType = 'DA_FORM_3161' | 'DA_FORM_2062' | 'DD_FORM_1348_1A' | 'LATERAL_TRANSFER' | 'TEMP_HAND_RECEIPT' | 'OTHER';

// Signature on a document
export interface Signature {
  role: string;
  name: string;
  rank: string;
  signedAt: string;
  verified: boolean;
}

// Document associated with a transfer
export interface Document {
  id: string;
  type: DocumentType;
  dateGenerated: string;
  url: string;
  signatures: Signature[];
  blockchainHash?: string;
}

// Activity/event in a transfer's lifecycle
export interface TransferActivity {
  id: string;
  transferId: string;
  timestamp: string;
  activityType: 'INITIATION' | 'APPROVAL' | 'INSPECTION' | 'IN_TRANSIT' | 'RECEIPT' | 'REJECTION' | 'CANCELLATION';
  user: Person;
  details: string;
  location?: string;
  relatedDocumentId?: string;
}

// Item being transferred
export interface TransferItem {
  id: string;
  name: string;
  serialNumber: string;
  nsn: string;
  digitalTwinId?: string;
  thumbnail?: string;
  currentCustodian: string;
  isSensitiveItem: boolean;
  condition: string;
  value: number;
}

// Entity (unit, facility, etc.)
export interface Entity {
  id: string;
  name: string;
  type: string;
  code: string;
}

// Person
export interface Person {
  id: string;
  name: string;
  rank: string;
  position: string;
}

// Location data
export interface GeoLocation {
  lat: number;
  lng: number;
  updatedAt: string;
}

// Transfer
export interface Transfer {
  id: string;
  type: TransferType;
  items: TransferItem[];
  from: Entity;
  to: Entity;
  initiatedBy: Person;
  dateInitiated: string;
  dueDate: string;
  returnDate?: string; // For temporary/range transfers
  stage: TransferStage;
  priority: TransferPriority;
  purpose: string;
  transportMethod?: string;
  documents: Document[];
  activities: TransferActivity[];
  comments?: string;
  blockchainTxId?: string;
  location?: GeoLocation;
}

// Transfer pipeline
export interface TransferPipelineStage {
  stage: TransferStage;
  count: number;
  transfers: Transfer[];
}

export interface TransferPipeline {
  stages: TransferPipelineStage[];
}

// Transfer metrics
export interface TransferMetrics {
  incomingTransfers: number;
  outgoingTransfers: number;
  pendingApproval: number;
  temporaryHandReceipts: number;
  stageBreakdown: Record<TransferStage, number>;
  typeBreakdown: Record<TransferType, number>;
  totalValueTransferred: number;
}

// QR Scanner results
export interface QRScanResult {
  itemId: string;
  serialNumber: string;
  nsn?: string;
  success: boolean;
  error?: string;
}

// Component Props

export interface TransferPipelineCardProps {
  pipeline: TransferPipeline;
  onClickStage?: (stage: TransferStage) => void;
}

export interface PriorityTransfersCardProps {
  transfers: Transfer[];
  onViewDetails: (transferId: string) => void;
}

export interface TransferActivitySummaryProps {
  recentActivities: TransferActivity[];
  onViewActivity?: (activityId: string) => void;
  onViewTransfer?: (transferId: string) => void;
}

export interface TransferManagementTableProps {
  transfers: Transfer[];
  onViewDetails: (transferId: string) => void;
  onApprove?: (transferId: string) => void;
  onDeny?: (transferId: string) => void;
  onGenerateDocument?: (transferId: string, documentType: DocumentType) => void;
  activeFilters?: TransferFilter[];
  onFilterChange?: (filters: TransferFilter[]) => void;
}

export interface TransferDetailPanelProps {
  transfer: Transfer;
  onClose: () => void;
  onApprove?: (transferId: string, comments?: string) => void;
  onDeny?: (transferId: string, reason: string) => void;
  onGenerateDocument?: (transferId: string, documentType: DocumentType) => void;
  onPrintDocument?: (documentId: string) => void;
  onAddItem?: (transferId: string) => void;
  onRemoveItem?: (transferId: string, itemId: string) => void;
  onComplete?: (transferId: string) => void;
}

export interface QRScannerPanelProps {
  onScan: (result: QRScanResult) => void;
  onClearScans: () => void;
  onTransferScannedItems: () => void;
  recentScans: QRScanResult[];
}

export interface PendingApprovalsCardProps {
  pendingTransfers: Transfer[];
  onApprove: (transferId: string, comments?: string, delegatedTo?: string) => void;
  onDeny: (transferId: string, reason: string) => void;
  onViewDetails: (transferId: string) => void;
  delegates?: Person[];
}

// Filter for transfers table
export interface TransferFilter {
  field: 'type' | 'stage' | 'priority' | 'from' | 'to' | 'initiatedBy' | 'dateInitiated' | 'dueDate';
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: string | number | boolean | TransferType | TransferStage | TransferPriority;
}

// Tab configuration type
export interface TransferTab {
  id: string;
  label: string;
  icon?: ReactNode;
  component: ReactNode;
}

// Transfer pipeline stats
export interface TransferPipeline {
  stages: {
    stage: TransferStage;
    count: number;
    transfers: Transfer[];
  }[];
} 