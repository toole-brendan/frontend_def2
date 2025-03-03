import React from 'react';
import { Chip, useTheme, alpha } from '@mui/material';
import { chipSx } from '../../../theme/patterns';

interface TypeChipProps {
  type: 'HANDRECEIPT' | 'DA3161' | 'LATERAL' | 'INVENTORY' | 'OTHER';
  size?: 'small' | 'medium';
}

/**
 * TypeChip component for TransfersMovement
 * 
 * Displays a styled chip indicating transfer document type
 */
const TypeChip: React.FC<TypeChipProps> = ({ type, size = 'medium' }) => {
  const theme = useTheme();
  
  // Get color and label based on type
  const getTypeInfo = (type: TypeChipProps['type']) => {
    switch(type) {
      case 'HANDRECEIPT':
        return { color: theme.palette.primary.main, label: 'DA 2062' };
      case 'DA3161':
        return { color: theme.palette.secondary.main, label: 'DA 3161' };
      case 'LATERAL':
        return { color: theme.palette.info.main, label: 'LATERAL' };
      case 'INVENTORY':
        return { color: theme.palette.success.main, label: 'INVENTORY' };
      default:
        return { color: theme.palette.grey[500], label: 'OTHER' };
    }
  };
  
  const { color, label } = getTypeInfo(type);
  
  return (
    <Chip 
      label={label}
      size={size}
      sx={{
        ...chipSx(theme, color),
        fontWeight: 500,
        fontSize: '0.7rem'
      }}
    />
  );
};

export default TypeChip;
