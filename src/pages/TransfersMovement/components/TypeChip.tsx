import React from 'react';
import {
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import { TypeChipProps } from '../types';

/**
 * TypeChip component for TransfersMovement
 * 
 * Displays the transfer type in a styled chip, with color coded by type
 */
const TypeChip: React.FC<TypeChipProps> = ({ type }) => {
  const theme = useTheme();
  
  const getTypeColor = (type: string) => {
    if (type === 'Receipt') return theme.palette.primary.main;
    if (type === 'Temp' || type === 'Range') return theme.palette.secondary.main;
    if (type === 'Maint') return theme.palette.warning.main;
    if (type === 'Turn-in') return theme.palette.error.main;
    if (type === 'NTC Prep') return theme.palette.info.main;
    if (type === 'Lateral') return theme.palette.success.main;
    return theme.palette.grey[700];
  };
  
  const color = getTypeColor(type);
  
  return (
    <Chip
      label={type}
      size="small"
      sx={{
        backgroundColor: alpha(color, 0.1),
        color: color,
        fontWeight: 500,
        fontSize: '0.75rem',
        borderRadius: 0,
        height: 20
      }}
    />
  );
};

export default TypeChip;
