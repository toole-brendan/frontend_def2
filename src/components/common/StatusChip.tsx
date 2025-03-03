import React from 'react';
import { Chip, alpha, useTheme } from '@mui/material';

export type StatusType = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'default'
  | 'serviceable'
  | 'limited'
  | 'shortage'
  | 'inactive';

interface StatusChipProps {
  status: StatusType | string;
  label?: string;
  size?: 'small' | 'medium';
  outlined?: boolean;
}

/**
 * Standardized status chip for consistent styling across the application
 * Maps status types to appropriate theme colors
 */
const StatusChip: React.FC<StatusChipProps> = ({ 
  status, 
  label, 
  size = 'small',
  outlined = false
}) => {
  const theme = useTheme();
  
  // Map status to color
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    // Map to theme palette colors
    switch (normalizedStatus) {
      case 'success':
      case 'serviceable':
        return theme.palette.success.main;
      case 'warning':
      case 'limited':
        return theme.palette.warning.main;
      case 'error':
      case 'shortage':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      case 'inactive':
        return theme.palette.text.disabled;
      default:
        return theme.palette.primary.main;
    }
  };
  
  const color = getStatusColor(status);
  const displayLabel = label || status;
  
  return (
    <Chip
      label={displayLabel}
      size={size}
      variant={outlined ? 'outlined' : 'filled'}
      sx={{ 
        backgroundColor: outlined ? 'transparent' : alpha(color, 0.15),
        color: color,
        fontWeight: 500,
        fontSize: size === 'small' ? '0.75rem' : '0.875rem',
        borderRadius: 0,
        height: size === 'small' ? 20 : 24,
        ...(outlined && {
          borderColor: color,
        })
      }}
    />
  );
};

export default StatusChip;
