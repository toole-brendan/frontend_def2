export type QRStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
export type TrackingAction = 'TRANSFER' | 'INVENTORY' | 'MAINTENANCE';

export interface ItemDetails {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  location: string;
  assignedUser?: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE';
}

export interface QRCodeDetails {
  id: string;
  itemId: string;
  createdAt: string;
  expiresAt?: string;
  status: QRStatus;
  actionType: TrackingAction;
  metadata: {
    serialNumber: boolean;
    currentStatus: boolean;
    location: boolean;
    assignedUser: boolean;
    timestamp: boolean;
  };
  item: ItemDetails;
}

export interface GenerateQRFormData {
  itemId: string;
  actionType: TrackingAction;
  actionDetails: Record<string, any>;
  metadata: {
    serialNumber: boolean;
    currentStatus: boolean;
    location: boolean;
    assignedUser: boolean;
    timestamp: boolean;
  };
} 