import { Theme } from '@mui/material';
import {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  actionButtonSx,
  chipSx,
  valueSx,
  tableCellSx,
  tableHeadCellSx,
  linearProgressSx
} from '../../theme/patterns';

// Export common patterns for reuse
export {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  actionButtonSx,
  chipSx,
  valueSx,
  tableCellSx,
  tableHeadCellSx,
  linearProgressSx
};

// Dashboard specific styles

// Stat card styling
export const statCardSx = (theme: Theme) => ({
  ...cardWithCornerSx(theme, theme.palette.primary.main),
  p: 2,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// Chart container
export const chartContainerSx = {
  width: '100%',
  height: 200,
  mt: 2,
};

// Task card styling
export const taskCardSx = (theme: Theme, priority: string) => {
  let accentColor = theme.palette.primary.main;
  
  if (priority === 'high') {
    accentColor = theme.semantic.status.error;
  } else if (priority === 'medium') {
    accentColor = theme.semantic.status.warning;
  } else if (priority === 'low') {
    accentColor = theme.semantic.status.success;
  }
  
  return {
    ...cardWithCornerSx(theme, accentColor),
    p: 2,
    mb: 2,
  };
};

// Alert card styling
export const alertCardSx = (theme: Theme, severity: string) => {
  let accentColor = theme.palette.primary.main;
  
  if (severity === 'critical') {
    accentColor = theme.semantic.status.error;
  } else if (severity === 'warning') {
    accentColor = theme.semantic.status.warning;
  } else if (severity === 'info') {
    accentColor = theme.semantic.status.info;
  }
  
  return {
    ...cardWithCornerSx(theme, accentColor),
    p: 2,
    mb: 2,
  };
};

// Inventory item styling
export const inventoryItemSx = (theme: Theme) => ({
  ...paperSx(theme),
  p: 2,
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
