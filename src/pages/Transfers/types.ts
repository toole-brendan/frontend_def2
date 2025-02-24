import { ReactNode } from 'react';

export interface TransferItem {
  id: string;
  name: string;
  serialNumber: string;
  digitalTwinId?: string;
  thumbnail?: string;
  currentCustodian: string;
}

export interface Transfer {
  id: string;
  from: {
    id: string;
    name: string;
    rank: string;
  };
  to: {
    id: string;
    name: string;
    rank: string;
  };
  items: TransferItem[];
  dateInitiated: string;
  status: TransferStatus;
  blockchainTxId?: string;
  notes?: string;
  attachedFiles?: AttachedFile[];
}

export type TransferStatus = 
  | 'PENDING'
  | 'COMPLETED'
  | 'AWAITING_APPROVAL'
  | 'REJECTED';

export interface AttachedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface TransferMetrics {
  pending: number;
  completedToday: number;
  awaitingApproval: number;
}

export interface TransferFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: TransferStatus[];
  searchTerm?: string;
}

export interface QRScanResult {
  itemId: string;
  serialNumber: string;
  success: boolean;
  error?: string;
}

// Tab configuration type
export interface TransferTab {
  id: string;
  label: string;
  icon?: ReactNode;
  component: ReactNode;
} 