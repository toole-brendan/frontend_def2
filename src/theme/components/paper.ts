import { Theme } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createPaperStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  // @ts-ignore - Unused variable intentionally kept
  const _patterns = createPatterns(mode);
  
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.background.paper, // Using updated paper color from tokens
          borderRadius: tokens.borders.radius.none,
          // Add consistent stronger border to ALL paper elements with !important
          border: `2px solid ${mode === 'dark' ? colors.border.default : colors.border.default} !important`,
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          
          // Add inner shadow for depth
          ...(mode === 'dark' ? {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }
          } : {})
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: mode === 'dark' 
            ? tokens.shadows.dark.sm
            : tokens.shadows.light.sm,
        },
        elevation2: {
          boxShadow: mode === 'dark' 
            ? tokens.shadows.dark.md
            : tokens.shadows.light.md,
        },
        elevation3: {
          boxShadow: mode === 'dark' 
            ? tokens.shadows.dark.lg
            : tokens.shadows.light.lg,
        },
        elevation4: {
          boxShadow: mode === 'dark' 
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        // For additional elevation levels
        elevation6: {
          boxShadow: mode === 'dark' 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
        },
        elevation8: {
          boxShadow: mode === 'dark' 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        },
        elevation12: {
          boxShadow: mode === 'dark' 
            ? '0 35px 60px -15px rgba(0, 0, 0, 0.5)'
            : '0 35px 60px -15px rgba(0, 0, 0, 0.2)',
        },
        elevation16: {
          boxShadow: mode === 'dark' 
            ? '0 50px 80px -20px rgba(0, 0, 0, 0.6)'
            : '0 50px 80px -20px rgba(0, 0, 0, 0.25)',
        },
        elevation24: {
          boxShadow: mode === 'dark' 
            ? '0 70px 100px -25px rgba(0, 0, 0, 0.7)'
            : '0 70px 100px -25px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  };
};

export default createPaperStyles;
