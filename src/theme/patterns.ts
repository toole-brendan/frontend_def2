import { alpha } from '@mui/material/styles';
import tokens from './tokens';

/**
 * Creates a set of reusable design patterns based on the current theme mode
 * These patterns can be applied to components to create a consistent industrial design aesthetic
 */
export const createPatterns = (mode: 'light' | 'dark') => {
  const colors = tokens.colors[mode];
  
  return {
    // Enhanced grid background pattern with higher contrast
    technicalGrid: {
      backgroundImage: mode === 'light'
        ? `linear-gradient(rgba(203, 213, 224, 0.08) 1px, transparent 1px), 
           linear-gradient(to right, rgba(203, 213, 224, 0.08) 1px, transparent 1px)`
        : `linear-gradient(rgba(226, 232, 240, 0.05) 1px, transparent 1px), 
           linear-gradient(to right, rgba(226, 232, 240, 0.05) 1px, transparent 1px)`,
      backgroundSize: '20px 20px', // Smaller, more precise grid
    },
    
    // Precision grid with measurement markings
    precisionGrid: {
      position: 'relative',
      backgroundImage: mode === 'light'
        ? `linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px), 
           linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px)`
        : `linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), 
           linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: mode === 'light'
          ? `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), 
             linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`
          : `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
             linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
        backgroundSize: '8px 8px',
        pointerEvents: 'none',
      }
    },
    
    // Enhanced technical corner markers
    technicalCorners: {
      position: 'relative',
      '&::before, &::after, &::first-line::before, &::last-line::after': {
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
      // Top-right corner
      '&::after': {
        top: 0,
        right: 0,
        borderTop: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
        borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
      },
      // Pseudo-elements for bottom corners
      '&::first-line::before': {
        bottom: 0,
        left: 0,
        borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
        borderLeft: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
      },
      '&::last-line::after': {
        bottom: 0,
        right: 0,
        borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
        borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
      },
    },
    
    // New machined edge effect
    machinedEdge: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: mode === 'dark'
          ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)'
          : 'linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.05) 100%)',
        pointerEvents: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: mode === 'dark'
          ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.2) 100%)'
          : 'linear-gradient(90deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.04) 50%, rgba(0, 0, 0, 0.02) 100%)',
        pointerEvents: 'none',
      }
    },
    
    // Bottom corners variant
    bottomCorners: {
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: 8,
        height: 8,
        pointerEvents: 'none',
        zIndex: 1,
      },
      // Bottom-left corner
      '&::before': {
        bottom: 0,
        left: 0,
        borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
        borderLeft: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
      },
      // Bottom-right corner
      '&::after': {
        bottom: 0,
        right: 0,
        borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
        borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
      },
    },
    
    // Enhanced industrial edge
    industrialEdge: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: mode === 'dark'
          ? `linear-gradient(90deg, rgba(226, 232, 240, 0) 0%, rgba(226, 232, 240, 0.08) 50%, rgba(226, 232, 240, 0) 100%)`
          : `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0) 100%)`,
        pointerEvents: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: mode === 'dark'
          ? `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)`
          : `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.04) 50%, rgba(0, 0, 0, 0) 100%)`,
        pointerEvents: 'none',
      }
    },
    
    // Enhanced measurement markings
    measurementMarkings: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundImage: mode === 'dark'
          ? `repeating-linear-gradient(to right, 
              transparent, 
              transparent 9px, 
              rgba(255, 255, 255, 0.15) 9px, 
              rgba(255, 255, 255, 0.15) 10px)`
          : `repeating-linear-gradient(to right, 
              transparent, 
              transparent 9px, 
              rgba(0, 0, 0, 0.1) 9px, 
              rgba(0, 0, 0, 0.1) 10px)`,
        pointerEvents: 'none',
      }
    },
    
    // Precision line markings
    precisionLines: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 2,
        height: '100%',
        backgroundImage: mode === 'dark'
          ? `repeating-linear-gradient(to bottom, 
              transparent, 
              transparent 4px, 
              rgba(255, 255, 255, 0.1) 4px, 
              rgba(255, 255, 255, 0.1) 8px)`
          : `repeating-linear-gradient(to bottom, 
              transparent, 
              transparent 4px, 
              rgba(0, 0, 0, 0.06) 4px, 
              rgba(0, 0, 0, 0.06) 8px)`,
        pointerEvents: 'none',
      }
    },
    
    // Enhanced technical indicator
    technicalIndicator: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: '50%',
        backgroundColor: mode === 'dark'
          ? alpha(colors.primary.main, 0.9)
          : colors.primary.main,
        pointerEvents: 'none',
      },
    },
    
    // Status indicator variants with higher contrast
    successIndicator: {
      '&::before': {
        backgroundColor: colors.status.success,
      },
    },
    warningIndicator: {
      '&::before': {
        backgroundColor: colors.status.warning,
      },
    },
    errorIndicator: {
      '&::before': {
        backgroundColor: colors.status.error,
      },
    },
    infoIndicator: {
      '&::before': {
        backgroundColor: colors.status.info,
      },
    },
    inactiveIndicator: {
      '&::before': {
        backgroundColor: colors.status.inactive,
      },
    },
    
    // Precision technical border
    technicalBorder: {
      border: `1px solid ${mode === 'dark' 
        ? colors.border.light 
        : colors.border.dark}`,
      borderRadius: tokens.borders.radius.none,
    },
    
    // Enhanced inset panel effect
    insetPanel: {
      boxShadow: mode === 'dark'
        ? 'inset 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0, 0, 0, 0.2)'
        : 'inset 0 1px 2px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(0, 0, 0, 0.03)',
    },
    
    // New industrial panel effect
    industrialPanel: {
      position: 'relative',
      backdropFilter: 'blur(12px)',
      backgroundColor: mode === 'dark' 
        ? alpha(colors.background.paper, 0.8)
        : alpha(colors.background.paper, 0.8),
      borderLeft: `1px solid ${mode === 'dark' 
        ? alpha(colors.border.light, 0.1)
        : alpha(colors.border.dark, 0.05)}`,
      borderTop: `1px solid ${mode === 'dark' 
        ? alpha(colors.border.light, 0.1)
        : alpha(colors.border.dark, 0.05)}`,
      borderRight: `1px solid ${mode === 'dark' 
        ? alpha(colors.border.dark, 0.2)
        : alpha(colors.border.dark, 0.08)}`,
      borderBottom: `1px solid ${mode === 'dark' 
        ? alpha(colors.border.dark, 0.2)
        : alpha(colors.border.dark, 0.08)}`,
    },
    
    // Enhanced hover effect
    technicalHover: {
      '&:hover': {
        backgroundColor: mode === 'dark' 
          ? alpha(colors.action.hover, 0.9)
          : alpha(colors.action.hover, 0.9),
      },
      '&:active': {
        backgroundColor: mode === 'dark'
          ? alpha(colors.action.selected, 0.9)
          : alpha(colors.action.selected, 0.9),
      },
    },
    
    // Enhanced technical overlay
    technicalOverlay: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        background: mode === 'dark'
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
          : 'linear-gradient(180deg, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0) 100%)',
      },
    },
    
    // New brushed metal effect
    brushedMetal: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: mode === 'dark'
          ? `repeating-linear-gradient(45deg, 
              rgba(255, 255, 255, 0.03), 
              rgba(255, 255, 255, 0.03) 1px, 
              transparent 1px, 
              transparent 2px)`
          : `repeating-linear-gradient(45deg, 
              rgba(0, 0, 0, 0.01), 
              rgba(0, 0, 0, 0.01) 1px, 
              transparent 1px, 
              transparent 2px)`,
        pointerEvents: 'none',
      }
    },
    
    // Paper texture for light mode
    paperTexture: {
      position: 'relative',
      ...(mode === 'light' && {
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.3,
        }
      })
    }
  };
};

export default createPatterns;
