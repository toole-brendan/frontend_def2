import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createDividerStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border.light,
          opacity: mode === 'dark' ? 0.15 : 0.25,
          transition: `border-color ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          marginTop: tokens.spacing.md,
          marginBottom: tokens.spacing.md,
          
          // Add technical pattern for horizontal dividers
          '&:not(.MuiDivider-vertical)': {
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '10px',
              height: '1px',
              backgroundColor: mode === 'dark' ? colors.primary.main : colors.primary.dark,
              opacity: 0.5,
            },
          },
          
          // Add technical pattern for vertical dividers
          '&.MuiDivider-vertical': {
            position: 'relative',
            height: 'auto',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '-4px',
              transform: 'translateY(-50%)',
              width: '1px',
              height: '10px',
              backgroundColor: mode === 'dark' ? colors.primary.main : colors.primary.dark,
              opacity: 0.5,
            },
          },
        },
        
        // Text divider
        textAlignLeft: {
          '&::before': {
            width: '0px',
            height: '0px',
          },
          '&::after': {
            borderColor: colors.border.light,
          },
        },
        textAlignCenter: {
          '&::before, &::after': {
            borderColor: colors.border.light,
          },
        },
        textAlignRight: {
          '&::after': {
            width: '0px',
            height: '0px',
          },
          '&::before': {
            borderColor: colors.border.light,
          },
        },
        
        // Status-based dividers using custom classNames
        '&.success': {
          borderColor: colors.status.success,
          opacity: mode === 'dark' ? 0.3 : 0.4,
          '&::before': {
            backgroundColor: colors.status.success,
          },
        },
        '&.warning': {
          borderColor: colors.status.warning,
          opacity: mode === 'dark' ? 0.3 : 0.4,
          '&::before': {
            backgroundColor: colors.status.warning,
          },
        },
        '&.error': {
          borderColor: colors.status.error,
          opacity: mode === 'dark' ? 0.3 : 0.4,
          '&::before': {
            backgroundColor: colors.status.error,
          },
        },
        '&.info': {
          borderColor: colors.status.info,
          opacity: mode === 'dark' ? 0.3 : 0.4,
          '&::before': {
            backgroundColor: colors.status.info,
          },
        },
        
        // Divider with dash pattern
        '&.dashed': {
          borderStyle: 'dashed',
          borderWidth: '1px',
        },
        
        // Heavy divider variant
        '&.heavy': {
          borderWidth: '2px',
          opacity: mode === 'dark' ? 0.25 : 0.35,
        },
        
        // Light divider variant
        '&.light': {
          borderWidth: '1px',
          opacity: mode === 'dark' ? 0.1 : 0.2,
        },
      },
    },
  };
};

export default createDividerStyles;
