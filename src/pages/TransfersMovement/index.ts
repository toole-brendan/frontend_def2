// TransfersMovement Page Index
// This file exports the main page component and re-exports types and components

// Export all components from components directory
export * from './components';

// Export types
export * from './types';

// Export mock data for development
export * from './mockData';

// Export the main page component
export { default } from './TransfersMovementPage';

/**
 * Transfers & Movement Page
 * 
 * This page manages the transfer of equipment between units, facilities, and 
 * individuals. It provides tools for initiating transfers, approving/denying
 * transfer requests, tracking in-transit equipment, and completing receipts.
 * 
 * Key Features:
 * - Transfer pipeline visualization 
 * - Priority transfers dashboard
 * - Transfer activity timeline
 * - QR scanner for equipment processing
 * - Pending approvals management
 * - Full transfer management system with table view
 * 
 * The page uses Material-UI components extensively for UI rendering and follows
 * a component-based architecture for maintainability and code organization.
 */ 