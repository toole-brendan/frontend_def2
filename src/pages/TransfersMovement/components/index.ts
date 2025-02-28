// TransfersMovement Components Index
// This file exports all components for the Transfers & Movement page

// Export main components
export { default as TransferPipelineCard } from './TransferPipelineCard';
export { default as PriorityTransfersCard } from './PriorityTransfersCard';
export { default as TransferActivitySummary } from './TransferActivitySummary';
export { default as TransferManagementTable } from './TransferManagementTable';
export { default as QRScannerPanel } from './QRScannerPanel';
export { default as PendingApprovalsCard } from './PendingApprovalsCard';
export { default as TransferDetailPanel } from './TransferDetailPanel';

// The TransfersMovement page utilizes these recommended MUI components:
/**
 * Layout Structure:
 * - Box with flexbox styling for horizontal flow
 * - Grid container for main content areas
 * 
 * Key Components:
 * - Stepper, Step, and StepLabel for transfer workflow
 * - DataGrid for transfers table with custom status rendering
 * - Card with action buttons for pending transfers
 * - Tabs for filtering transfer types
 * - Dialog for document preview/generation
 * - Timeline and TimelineItem for transfer activity
 * - Pagination for transfer history navigation
 * - Autocomplete for equipment selection
 * - TextField with validation for transfer details
 * - ButtonGroup for aligned action buttons
 * 
 * Visualization Components:
 * - Custom TransferFlow component using Box with styled connectors
 * - ResponsiveContainer and BarChart from recharts for transfer metrics
 */ 