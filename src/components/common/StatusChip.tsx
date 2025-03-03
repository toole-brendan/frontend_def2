import React from 'react';
import { Chip, alpha, useTheme, Theme } from '@mui/material';
import { 
  statusFMCSx,
  statusPMCSx, 
  statusNMCSx, 
  statusAdminSx,
  chipSx
} from '../../theme/patterns';

export type StatusType = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'default'
  | 'serviceable'
  | 'limited'
  | 'shortage'
  | 'inactive'
  | 'FMC'
  | 'PMC'
  | 'NMC'
  | 'ADMIN';

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
  
  // Get the appropriate styling based on status
  const getStatusStyle = (status: string, theme: Theme) => {
    const normalizedStatus = status.toLowerCase();
    
    // Special military statuses
    if (normalizedStatus === 'fmc') return statusFMCSx(theme);
    if (normalizedStatus === 'pmc') return statusPMCSx(theme);
    if (normalizedStatus === 'nmc') return statusNMCSx(theme);
    if (normalizedStatus === 'admin') return statusAdminSx(theme);
    
    // Map to theme palette colors
    let color: string;
    
    switch (normalizedStatus) {
      case 'success':
      case 'serviceable':
        color = theme.semantic.status.success;
        break;
      case 'warning':
      case 'limited':
        color = theme.semantic.status.warning;
        break;
      case 'error':
      case 'shortage':
        color = theme.semantic.status.error;
        break;
      case 'info':
        color = theme.semantic.status.info;
        break;
      case 'inactive':
        color = theme.semantic.status.inactive;
        break;
      default:
        color = theme.palette.primary.main;
    }
    
    return chipSx(theme, color);
  };
  
  const displayLabel = label || status;
  const statusStyle = getStatusStyle(status, theme);
  
  return (
    <Chip
      label={displayLabel}
      size={size}
      variant={outlined ? 'outlined' : 'filled'}
      sx={{ 
        ...statusStyle,
        ...(outlined && {
          bgcolor: 'transparent',
          borderColor: statusStyle.color,
        }),
        ...(size === 'medium' && {
          height: 24,
          fontSize: '0.875rem',
        })
      }}
    />
  );
};

export default StatusChip;
