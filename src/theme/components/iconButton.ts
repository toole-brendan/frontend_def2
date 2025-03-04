import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createIconButtonStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  // @ts-ignore - Unused variable intentionally kept
  const _patterns = createPatterns(mode);
  
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borders.radius.none,
          padding: tokens.spacing.xs,
          transition: `all ${tokens.transitions.duration.fast} ${tokens.transitions.easing.easeInOut}`,
          
          // Add square technical border when focused
          '&:focus-visible': {
            outline: 'none',
            boxShadow: 'none',
            border: `1px solid ${colors.primary.main}`,
          },
          
          // Add hover effect
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.action.hover, 0.8)
              : alpha(colors.action.hover, 0.8),
          },
          
          // Add status variants with className
          '&.success': {
            color: colors.status.success,
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? alpha(colors.status.success, 0.15)
                : alpha(colors.status.success, 0.1),
            },
          },
          '&.warning': {
            color: colors.status.warning,
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? alpha(colors.status.warning, 0.15)
                : alpha(colors.status.warning, 0.1),
            },
          },
          '&.error': {
            color: colors.status.error,
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? alpha(colors.status.error, 0.15)
                : alpha(colors.status.error, 0.1),
            },
          },
          '&.info': {
            color: colors.status.info,
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? alpha(colors.status.info, 0.15)
                : alpha(colors.status.info, 0.1),
            },
          },
          
          // Border variant with className
          '&.bordered': {
            border: `1px solid ${mode === 'dark' 
              ? colors.border.light 
              : colors.border.dark}`,
            
            '&:hover': {
              borderColor: colors.primary.main,
            },
            
            // Status border variants
            '&.success': {
              borderColor: alpha(colors.status.success, 0.5),
              '&:hover': {
                borderColor: colors.status.success,
              },
            },
            '&.warning': {
              borderColor: alpha(colors.status.warning, 0.5),
              '&:hover': {
                borderColor: colors.status.warning,
              },
            },
            '&.error': {
              borderColor: alpha(colors.status.error, 0.5),
              '&:hover': {
                borderColor: colors.status.error,
              },
            },
            '&.info': {
              borderColor: alpha(colors.status.info, 0.5),
              '&:hover': {
                borderColor: colors.status.info,
              },
            },
          },
        },
        // Size variants
        sizeSmall: {
          padding: tokens.spacing.xs / 2,
          fontSize: '1rem',
        },
        sizeMedium: {
          padding: tokens.spacing.xs,
          fontSize: '1.25rem',
        },
        sizeLarge: {
          padding: tokens.spacing.sm,
          fontSize: '1.5rem',
        },
        // Color variants
        colorPrimary: {
          color: colors.primary.main,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.primary.main, 0.15)
              : alpha(colors.primary.main, 0.1),
          },
        },
        colorSecondary: {
          color: colors.secondary.main,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.secondary.main, 0.15)
              : alpha(colors.secondary.main, 0.1),
          },
        },
        colorSuccess: {
          color: colors.status.success,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.status.success, 0.15)
              : alpha(colors.status.success, 0.1),
          },
        },
        colorError: {
          color: colors.status.error,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.status.error, 0.15)
              : alpha(colors.status.error, 0.1),
          },
        },
        colorWarning: {
          color: colors.status.warning,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.status.warning, 0.15)
              : alpha(colors.status.warning, 0.1),
          },
        },
        colorInfo: {
          color: colors.status.info,
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? alpha(colors.status.info, 0.15)
              : alpha(colors.status.info, 0.1),
          },
        },
      },
    },
  };
};

export default createIconButtonStyles;
