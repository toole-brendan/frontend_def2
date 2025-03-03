import { Theme } from '@mui/material';

/**
 * Determines the color to use for readiness and status indicators based on percentage
 */
export const getStatusColor = (percentage: number, theme: Theme) => {
  if (percentage >= 98) return theme.palette.success.main;
  if (percentage >= 90) return theme.palette.primary.main;
  if (percentage >= 80) return theme.palette.warning.main;
  return theme.palette.error.main;
};

/**
 * Determines the color for priority indicators
 */
export const getPriorityColor = (priority: string, theme: Theme) => {
  switch(priority.toUpperCase()) {
    case 'HIGH':
      return theme.palette.error.main;
    case 'MEDIUM':
      return theme.palette.warning.main;
    default:
      return theme.palette.success.main;
  }
};

/**
 * Determines the color for status chips
 */
export const getStatusChipColor = (status: string, theme: Theme) => {
  switch(status.toUpperCase()) {
    case 'COMPLETE':
    case 'VERIFIED':
    case 'APPROVED':
      return theme.palette.success.main;
    case 'PENDING':
    case 'WARNING':
    case 'IN PROGRESS':
      return theme.palette.warning.main;
    case 'ERROR':
    case 'FAILED':
    case 'OVERDUE':
      return theme.palette.error.main;
    default:
      return theme.palette.info.main;
  }
};

/**
 * Format numerical values with proper military formatting
 */
export const formatMilitaryValue = (value: number | string): string => {
  if (typeof value === 'string' && value.includes('$')) {
    return value; // Already formatted currency
  }
  
  if (typeof value === 'number') {
    // Format number with commas
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  return value.toString();
};

/**
 * Format a date in military format
 */
export const formatMilitaryDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return date; // Assume already formatted
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  
  return `${day}${month}${year}`;
};
