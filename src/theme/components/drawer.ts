import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createDrawerStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: mode === 'dark' 
              ? alpha('#000000', 0.8)
              : alpha('#101114', 0.3),
            backdropFilter: 'blur(4px)',
          },
        },
        paper: {
          backgroundColor: mode === 'dark' 
            ? '#000000' // Pure black for drawer to match AppBar
            : colors.background.paper,
          borderRight: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          transition: `background-color ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          borderRadius: 0,
          
          // Add precision grid pattern to drawer
          backgroundImage: mode === 'dark'
            ? `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
               linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`
            : `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), 
               linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          
          // Add industrial edge style
          ...patterns.machinedEdge,
          
          // Add technical corner
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 10,
            height: 10,
            borderTop: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            pointerEvents: 'none',
            zIndex: 1,
          },
          
          // Add vertical precision lines on the right edge
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 4,
            backgroundImage: mode === 'dark'
              ? `repeating-linear-gradient(to bottom, 
                  transparent, 
                  transparent 9px, 
                  rgba(255, 255, 255, 0.1) 9px, 
                  rgba(255, 255, 255, 0.1) 10px)`
              : `repeating-linear-gradient(to bottom, 
                  transparent, 
                  transparent 9px, 
                  rgba(0, 0, 0, 0.05) 9px, 
                  rgba(0, 0, 0, 0.05) 10px)`,
            pointerEvents: 'none',
          }
        },
        paperAnchorLeft: {
          borderRight: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
        },
        paperAnchorRight: {
          borderLeft: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          
          // Adjust technical corner for right anchored drawer
          '&::before': {
            left: 0,
            right: 'auto',
            borderLeft: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderRight: 'none',
          },
          
          // Adjust precision lines for right anchored drawer
          '&::after': {
            left: 0,
            right: 'auto',
          }
        },
        paperAnchorTop: {
          borderBottom: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
        },
        paperAnchorBottom: {
          borderTop: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
        },
        // Special styles for temporary variant
        modal: {
          '& .MuiPaper-root': {
            boxShadow: mode === 'dark' 
              ? '0 0 24px rgba(0, 0, 0, 0.4)' 
              : '0 0 24px rgba(0, 0, 0, 0.1)',
          },
        },
        // Style for permanent/persistent drawer
        docked: {
          '& .MuiPaper-root': {
            // Add subtle metal effect for permanent drawers
            ...patterns.brushedMetal,
          },
        },
      },
    },
  };
};

export default createDrawerStyles;
