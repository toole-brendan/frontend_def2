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
 * Transfers & Movement Page (Dark Mode)
 * 
 * This page manages the transfer of equipment between units, facilities, and 
 * individuals. It provides a modern dark-themed dashboard for:
 * 
 * Key Features:
 * - Summary cards for transfer statistics
 * - Interactive transfer pipeline visualization
 * - High priority transfers table
 * - Transfer activity summary and statistics
 * - Complete transfer management table
 * - QR code scanner with camera activation
 * - Transfers requiring action section
 * - Recent activity log with status indicators
 * 
 * The page uses Material-UI components with custom dark theme styling for a
 * clean, modern interface optimized for military logistics management.
 */
