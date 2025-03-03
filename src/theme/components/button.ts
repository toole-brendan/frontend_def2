import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createButtonStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: tokens.borders.radius.none,
          fontWeight: tokens.typography.fontWeights.medium,
          padding: '6px 16px',
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          letterSpacing: tokens.typography.letterSpacing.wide,
          ...patterns.technicalCorners,
          // Military-style precision with crisp edges
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: mode === 'dark' 
              ? `1px solid rgba(226, 232, 240, 0.08)` 
              : `1px solid rgba(74, 85, 104, 0.08)`,
            pointerEvents: 'none',
          },
        },
        contained: {
          boxShadow: mode === 'dark' 
            ? tokens.shadows.dark.sm
            : tokens.shadows.light.sm,
          backgroundColor: mode === 'dark' ? colors.primary.main : colors.primary.main,
          '&:hover': {
            boxShadow: mode === 'dark' 
              ? `0 0 0 1px rgba(226, 232, 240, 0.2), 0 3px 6px rgba(0, 0, 0, 0.5)` 
              : `0 0 0 1px rgba(74, 85, 104, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15)`,
            backgroundColor: mode === 'dark' ? colors.primary.light : colors.primary.dark,
          },
          '&:active': {
            boxShadow: mode === 'dark' 
              ? `0 0 0 1px rgba(226, 232, 240, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.4)` 
              : `0 0 0 1px rgba(74, 85, 104, 0.2), inset 0 1px 2px rgba(0, 0, 0, 0.2)`,
          },
        },
        outlined: {
          borderWidth: `${tokens.borders.width.thin}px`,
          borderColor: mode === 'dark' ? colors.border.light : colors.border.dark,
          '&:hover': {
            borderColor: colors.border.dark,
            backgroundColor: colors.action.hover,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(226, 232, 240, 0.04)' 
              : 'rgba(74, 85, 104, 0.04)',
          },
        },
        // Add variant for status colors
        containedSuccess: {
          backgroundColor: colors.status.success,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.status.success, 0.8)
              : alpha(colors.status.success, 0.9),
          },
        },
        containedError: {
          backgroundColor: colors.status.error,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.status.error, 0.8)
              : alpha(colors.status.error, 0.9),
          },
        },
        containedWarning: {
          backgroundColor: colors.status.warning,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.status.warning, 0.8)
              : alpha(colors.status.warning, 0.9),
          },
        },
        containedInfo: {
          backgroundColor: colors.status.info,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.status.info, 0.8)
              : alpha(colors.status.info, 0.9),
          },
        },
      },
    },
  };
};

export default createButtonStyles;
