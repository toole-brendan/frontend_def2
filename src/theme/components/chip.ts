import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createChipStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          // Add support for inactive status via a custom className
          '&.inactive': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.status.inactive, 0.2)
              : alpha(colors.status.inactive, 0.1),
            color: mode === 'dark'
              ? colors.status.inactive // Muted gray with reduced prominence
              : colors.status.inactive, // Neutral gray with matte finish
            '&::before': {
              backgroundColor: colors.status.inactive,
            },
          },
          borderRadius: tokens.borders.radius.none,
          height: 24,
          fontSize: tokens.typography.fontSize.xs,
          fontWeight: tokens.typography.fontWeights.medium,
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          border: mode === 'dark'
            ? `${tokens.borders.width.thin}px solid ${alpha(colors.border.light, 0.3)}`
            : `${tokens.borders.width.thin}px solid ${colors.border.light}`,
          position: 'relative',
          
          // Technical indicator style inspired by military
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            height: '50%',
            backgroundColor: mode === 'dark'
              ? alpha(colors.primary.main, 0.7)
              : colors.primary.main,
          },
        },
        filled: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.background.dark, 0.7)
            : alpha(colors.background.dark, 0.7),
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.background.dark, 0.9)
              : alpha(colors.background.dark, 0.9),
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          borderWidth: tokens.borders.width.thin,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.action.hover, 0.5)
              : alpha(colors.action.hover, 0.5),
          },
        },
        label: {
          paddingLeft: tokens.spacing.sm,
          paddingRight: tokens.spacing.sm,
        },
        icon: {
          color: 'inherit',
          marginRight: tokens.spacing.xs,
          marginLeft: tokens.spacing.xs,
        },
        deleteIcon: {
          color: 'inherit',
          opacity: 0.7,
          '&:hover': {
            opacity: 1,
            color: 'inherit',
          },
        },
        // Status variants
        colorPrimary: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.primary.main, 0.2)
            : alpha(colors.primary.main, 0.1),
          color: mode === 'dark'
            ? colors.primary.light
            : colors.primary.dark,
          '&::before': {
            backgroundColor: colors.primary.main,
          },
        },
        colorSecondary: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.secondary.main, 0.2)
            : alpha(colors.secondary.main, 0.1),
          color: mode === 'dark'
            ? colors.secondary.light
            : colors.secondary.dark,
          '&::before': {
            backgroundColor: colors.secondary.main,
          },
        },
        colorSuccess: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.success, 0.2)
            : alpha(colors.status.success, 0.1),
          color: mode === 'dark'
            ? colors.status.success  // Phosphorescent green with increased luminosity
            : colors.status.success, // Forest green with subtle metallic quality
          '&::before': {
            backgroundColor: colors.status.success,
          },
        },
        colorError: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.error, 0.2)
            : alpha(colors.status.error, 0.1),
          color: mode === 'dark'
            ? colors.status.error  // Emergency red with maximum visibility
            : colors.status.error, // Signal red with high visibility
          '&::before': {
            backgroundColor: colors.status.error,
          },
        },
        colorWarning: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.warning, 0.2)
            : alpha(colors.status.warning, 0.1),
          color: mode === 'dark'
            ? colors.status.warning // Hazard amber with higher saturation
            : colors.status.warning, // Amber with hazard-pattern undertone
          '&::before': {
            backgroundColor: colors.status.warning,
          },
        },
        colorInfo: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.info, 0.2)
            : alpha(colors.status.info, 0.1),
          color: mode === 'dark'
            ? colors.status.info
            : colors.status.info,
          '&::before': {
            backgroundColor: colors.status.info,
          },
        },
        // Size variants
        sizeSmall: {
          height: 20,
          fontSize: '0.65rem',
          '& .MuiChip-label': {
            paddingLeft: 6,
            paddingRight: 6,
          },
        },
        sizeMedium: {
          height: 24,
        },
      },
    },
  };
};

export default createChipStyles;
