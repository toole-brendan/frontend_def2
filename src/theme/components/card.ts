import { Theme } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createCardStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          borderRadius: tokens.borders.radius.none,
          boxShadow: 'none',
          // Enhanced border with !important to ensure it shows up
          border: `2px solid ${mode === 'dark' ? colors.border.default : colors.border.default} !important`,
          backgroundImage: 'none',
          overflow: 'visible',
          position: 'relative',
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          
          // Industrial corner markers
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: 8,
            height: 8,
            pointerEvents: 'none',
            zIndex: 1,
          },
          
          // Top-left corner
          '&::before': {
            top: 0,
            left: 0,
            borderTop: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderLeft: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
          },
          
          // Bottom-right corner
          '&::after': {
            bottom: 0,
            right: 0,
            borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
          },
          
          // Add machined edge effect
          '&:not(.MuiPaper-elevation0)': {
            boxShadow: mode === 'dark' 
              ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)' 
              : '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.03)',
          },
          
          // Add brushed metal effect for status cards (applied via className)
          '&.metal-card': {
            ...patterns.brushedMetal,
          },
          
          // Add paper texture for light mode
          ...(mode === 'light' && {
            ...patterns.paperTexture,
          }),
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 16px 8px 16px',
          borderBottom: `1px solid ${mode === 'dark' ? colors.border.medium : colors.border.default}`,
          ...patterns.machinedEdge,
        },
        title: {
          fontSize: tokens.typography.fontSize.md,
          fontWeight: tokens.typography.fontWeights.semibold,
          color: mode === 'dark' ? colors.text.primary : colors.text.primary,
          letterSpacing: tokens.typography.letterSpacing.wide,
        },
        subheader: {
          fontSize: tokens.typography.fontSize.sm,
          color: mode === 'dark' ? colors.text.secondary : colors.text.secondary,
          marginTop: 2,
        },
        action: {
          marginTop: -4,
          marginRight: -4,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          borderTop: `1px solid ${mode === 'dark' ? colors.border.medium : colors.border.default}`,
          justifyContent: 'flex-end',
        },
      },
    },
  };
};

export default createCardStyles;
