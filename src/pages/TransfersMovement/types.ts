// Types for TransfersMovement

// Transfer item in the main transfer table
export interface TransferItem {
  id: string;
  type: string;
  items: string;
  from: string;
  to: string;
  initiated: string;
  due: string;
  status: string;
  priority: string;
}

// Priority transfer item in the high priority transfers section
export interface PriorityTransfer {
  id: string;
  type: string;
  items: string;
  fromTo: string;
  due: string;
  status: string;
  action: string;
}

// Recent activity item in the activity log
export interface ActivityItem {
  date: string;
  time: string;
  activity: string;
  id: string;
  personnel: string;
  items: string;
  status: string;
}

// Props for the ActionCard component
export interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonText: string;
  color: string;
}

// Props for the TypeChip component
export interface TypeChipProps {
  type: string;
}

// Props for the TransferPipeline component
export interface TransferPipelineProps {
  transfers: TransferItem[];
}

// Props for the TransferStatsCards component
export interface TransferStatsCardsProps {
  stats: {
    incoming: number;
    outgoing: number;
    pending: number;
    temporary: number;
  };
}

// Props for the PriorityTransfers component
export interface PriorityTransfersProps {
  transfers: PriorityTransfer[];
}

// Props for the TransferManagementTable component
export interface TransferManagementTableProps {
  transfers: TransferItem[];
}

// Props for the RecentActivity component
export interface RecentActivityProps {
  activities: ActivityItem[];
}
