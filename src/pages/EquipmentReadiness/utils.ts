import { Theme } from '@mui/material';

// Helper functions for the Equipment Readiness page

/**
 * Determines the color to use for readiness indicators based on percentage
 */
export const getStatusColor = (rate: number, theme: Theme) => {
  if (rate >= 90) return theme.palette.success.main;
  if (rate >= 80) return theme.palette.primary.main;
  if (rate >= 70) return theme.palette.warning.main;
  return theme.palette.error.main;
};

/**
 * Determines the color for status chips
 */
export const getStatusChipColor = (status: string, theme: Theme) => {
  switch(status) {
    case "Complete": return theme.palette.success.main;
    case "Approved": return theme.palette.info.main;
    default: return theme.palette.warning.main;
  }
};
