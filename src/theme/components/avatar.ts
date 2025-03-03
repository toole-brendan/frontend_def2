import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createAvatarStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borders.radius.none,
          fontFamily: tokens.typography.fontFamilies.primary,
          fontWeight: tokens.typography.fontWeights.medium,
          
          // Add technical corners for military/industrial look
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: 4,
            height: 4,
            backgroundColor: 'transparent',
            pointerEvents: 'none',
            zIndex: 1,
          },
          '&::before': {
            top: 0,
            left: 0,
            borderTop: `1px solid ${alpha(colors.primary.main, 0.7)}`,
            borderLeft: `1px solid ${alpha(colors.primary.main, 0.7)}`,
          },
          '&::after': {
            top: 0,
            right: 0,
            borderTop: `1px solid ${alpha(colors.primary.main, 0.7)}`,
            borderRight: `1px solid ${alpha(colors.primary.main, 0.7)}`,
          },
          
          // Status-based variants with className
          '&.success': {
            backgroundColor: alpha(colors.status.success, mode === 'dark' ? 0.2 : 0.1),
            color: colors.status.success,
            border: `1px solid ${alpha(colors.status.success, mode === 'dark' ? 0.5 : 0.3)}`,
          },
          '&.warning': {
            backgroundColor: alpha(colors.status.warning, mode === 'dark' ? 0.2 : 0.1),
            color: colors.status.warning,
            border: `1px solid ${alpha(colors.status.warning, mode === 'dark' ? 0.5 : 0.3)}`,
          },
          '&.error': {
            backgroundColor: alpha(colors.status.error, mode === 'dark' ? 0.2 : 0.1),
            color: colors.status.error,
            border: `1px solid ${alpha(colors.status.error, mode === 'dark' ? 0.5 : 0.3)}`,
          },
          '&.info': {
            backgroundColor: alpha(colors.status.info, mode === 'dark' ? 0.2 : 0.1),
            color: colors.status.info,
            border: `1px solid ${alpha(colors.status.info, mode === 'dark' ? 0.5 : 0.3)}`,
          },
        },
        colorDefault: {
          backgroundColor: mode === 'dark' 
            ? colors.background.control
            : colors.background.dark,
          color: mode === 'dark'
            ? colors.text.primary
            : colors.text.primary,
          border: `1px solid ${mode === 'dark' 
            ? alpha(colors.border.light, 0.3)
            : alpha(colors.border.dark, 0.3)}`,
        },
        // Size variants
        sizeLarge: {
          width: 48,
          height: 48,
          fontSize: tokens.typography.fontSize.xl,
        },
        sizeMedium: {
          width: 40,
          height: 40,
          fontSize: tokens.typography.fontSize.md,
        },
        sizeSmall: {
          width: 32,
          height: 32,
          fontSize: tokens.typography.fontSize.sm,
        },
        // For square avatars
        square: {
          borderRadius: tokens.borders.radius.none,
        },
        // For rounded avatars
        rounded: {
          borderRadius: tokens.borders.radius.none,
        },
        // For avatar groups
        ':first-of-type': {
          marginLeft: 0,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root': {
            borderColor: mode === 'dark'
              ? colors.background.default
              : colors.background.paper,
            marginLeft: -8,
            boxShadow: `0 0 0 1px ${mode === 'dark' 
              ? colors.background.default 
              : colors.background.paper}`,
            
            '&:first-of-type': {
              marginLeft: 0,
            },
          },
        },
      },
    },
  };
};

export default createAvatarStyles;
