import { Theme } from '@mui/material';

/**
 * Returns the appropriate color for a given status
 */
export const getStatusColor = (status: string, theme: Theme): string => {
  switch(status) {
    case "complete":
    case "FMC":
      return theme.palette.success.main;
    case "warning":
    case "PMC":
    case "pending":
      return theme.palette.warning.main;
    case "urgent":
    case "NMC":
    case "OVERDUE":
      return theme.palette.error.main;
    default:
      return theme.palette.info.main;
  }
};

/**
 * Returns the palette color based on the color key
 */
export const getPaletteColor = (colorKey: string, theme: Theme): string => {
  switch(colorKey) {
    case 'error':
      return theme.palette.error.main;
    case 'warning':
      return theme.palette.warning.main;
    case 'info':
      return theme.palette.info.main;
    case 'success':
      return theme.palette.success.main;
    case 'primary':
      return theme.palette.primary.main;
    case 'secondary':
      return theme.palette.secondary.main;
    default:
      return '#888888';
  }
};
