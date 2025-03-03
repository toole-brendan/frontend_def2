import { alpha, Theme } from '@mui/material';
import {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  tableCellSx,
  tableHeadCellSx
} from '../../theme/patterns';

// Export common patterns for reuse
export {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  tableCellSx,
  tableHeadCellSx
};

// Report specific styles
export const reportCardSx = (theme: Theme) => ({
  ...paperSx(theme),
  mb: 2,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 0 0 1px rgba(226, 232, 240, 0.08), 0 4px 8px rgba(0, 0, 0, 0.3)'
      : '0 0 0 1px rgba(74, 85, 104, 0.08), 0 4px 8px rgba(0, 0, 0, 0.15)',
  }
});

// Report status chip styling
export const statusChipSx = (status: string, theme: Theme) => {
  const statusColors = {
    draft: theme.semantic.status.info,
    pending: theme.semantic.status.warning,
    approved: theme.semantic.status.success,
    rejected: theme.semantic.status.error,
    published: theme.palette.primary.main,
  };
  
  const color = statusColors[status as keyof typeof statusColors] || theme.palette.grey[500];
  
  return {
    backgroundColor: alpha(color, 0.1),
    color: color,
    fontWeight: 'medium',
    fontSize: '0.75rem',
    borderRadius: 0,
    height: 20,
    border: `1px solid ${alpha(color, 0.2)}`,
  };
};

// Tab styling
export const tabSx = {
  textTransform: 'none',
  fontWeight: 'medium',
  minWidth: 100,
};

// Table styling
export const tableContainerSx = (theme: Theme) => ({
  ...paperSx(theme),
  maxHeight: '70vh',
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.background.paper, 0.8) 
      : theme.palette.grey[50],
    fontWeight: 600,
  }
}); 