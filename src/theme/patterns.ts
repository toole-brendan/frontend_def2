import { alpha, Theme, SxProps } from '@mui/material';
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

/**
 * Common UI Patterns for Defense Frontend
 * These are reusable styling patterns that should be used across all pages
 * to ensure consistency in the application.
 */

// Common paper styling for all cards
export const paperSx = (theme: Theme) => ({
  p: 0, 
  borderRadius: 0,
  border: '2px solid rgba(140, 140, 160, 0.12)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
    : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
});

// Card with clipped corner decoration
export const cardWithCornerSx = (theme: Theme, accentColor: string) => ({
  ...paperSx(theme),
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderStyle: 'solid',
    borderWidth: '0 16px 16px 0',
    borderColor: `transparent ${accentColor} transparent transparent`,
    zIndex: 1,
  }
});

// Section header typography styling
export const sectionHeaderSx = {
  fontWeight: 'bold', 
  mb: 2,
  textTransform: 'uppercase',
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
};

// Standard button styling pattern used throughout the application
export const buttonSx = (theme: Theme, variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary') => ({
  borderRadius: 1, // Slightly rounded corners for industrial look
  fontWeight: 500,
  textTransform: 'none' as const,
  letterSpacing: '0.02em',
  px: 2,
  py: 0.75,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: `0 2px 8px ${alpha(theme.palette[variant].main, 0.25)}`,
  },
});

// Action button styling - used for buttons in toolbars and action areas
export const actionButtonSx = (theme: Theme) => ({
  ...buttonSx(theme),
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.05em',
  boxShadow: 'none',
});

// Consistent toolbar styling pattern
export const toolbarSx = (theme: Theme, hasSelectedItems = false) => ({
  p: 1,
  my: 1,
  borderRadius: 1,
  ...(hasSelectedItems
    ? {
        bgcolor: alpha(theme.palette.primary.main, 0.12),
      }
    : {}),
  // Add subtle border for consistent industrial look
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['background-color', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
});

// Consistent card styling pattern
export const cardSx = (theme: Theme, accentColor?: string, withPattern = true): SxProps<Theme> => ({
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 1, // Slightly rounded corners
  borderTop: accentColor ? `3px solid ${accentColor}` : undefined,
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)',
  },
  // Technical look with corner markers
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'transparent',
    borderColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  '&::before': {
    top: 0,
    left: 0,
    borderTop: `1px solid ${theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)'}`,
    borderLeft: `1px solid ${theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)'}`,
  },
  '&::after': {
    top: 0,
    right: 0,
    borderTop: `1px solid ${theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)'}`,
    borderRight: `1px solid ${theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)'}`,
  },
  ...(withPattern ? {
    backgroundImage: theme.palette.mode === 'light'
      ? 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)'
      : 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  } : {})
});

// Consistent text field styling pattern
export const textFieldSx = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.5)
        : alpha(theme.palette.primary.main, 0.7),
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
  },
});

// Consistent icon button styling
export const iconButtonSx = (theme: Theme) => ({
  borderRadius: 1,
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
});

// Chip styling
export const chipSx = (theme: Theme, color: string) => ({
  fontWeight: 'medium',
  borderRadius: 0,
  height: 20,
  fontSize: '0.7rem',
  bgcolor: alpha(color, 0.1),
  color: color,
  fontFamily: 'monospace',
  letterSpacing: '0.03em',
});

// Value text styling - for numbers and important metrics
export const valueSx = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
  letterSpacing: '0.05em',
};

// Table styling
export const tableCellSx = {
  borderBottom: '1px solid rgba(140, 140, 160, 0.12)',
  padding: '8px 16px',
  fontSize: '0.8rem',
};

export const tableHeadCellSx = {
  ...tableCellSx,
  fontWeight: 'medium',
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  letterSpacing: '0.03em',
  backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.05),
};

// Progress styling
export const linearProgressSx = (theme: Theme, color: string) => ({
  height: 8,
  borderRadius: 0,
  bgcolor: alpha(color, 0.1),
  '.MuiLinearProgress-bar': {
    transition: 'transform 0.3s ease',
    bgcolor: color
  }
});

// Selection indicator used in toolbars
export const selectionIndicatorSx = (theme: Theme) => ({
  display: 'flex', 
  alignItems: 'center', 
  px: 1.5,
  py: 0.75,
  borderRadius: 1,
  bgcolor: alpha(theme.palette.primary.main, 0.1),
});

// Toolbar box container
export const toolbarContainerSx = (theme: Theme, hasSelectedItems = false, disableBorder = false) => ({
  display: 'flex', 
  flexWrap: 'wrap',
  gap: { xs: 1, md: 2 },
  bgcolor: hasSelectedItems ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
  borderRadius: disableBorder ? 0 : 1,
  border: !disableBorder && hasSelectedItems ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
  transition: 'all 0.2s ease-in-out',
  ...(disableBorder ? {} : { mb: 3, p: hasSelectedItems ? 2 : 1.5 })
});

// Modal styling
export const modalContainerSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
  bgcolor: 'background.paper',
  borderRadius: 0,
  border: '2px solid rgba(140, 140, 160, 0.12)',
  boxShadow: 24,
  p: 0,
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

// Modal header
export const modalHeaderSx = (theme: Theme) => ({
  bgcolor: alpha(theme.palette.primary.main, 0.05),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  py: 2,
  px: 3,
});

// Modal content
export const modalContentSx = {
  p: 3,
  overflow: 'auto',
};

// Modal actions
export const modalActionsSx = (theme: Theme) => ({
  p: 2,
  bgcolor: alpha(theme.palette.background.default, 0.03),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
});

// Form field container
export const formFieldSx = {
  mb: 2,
};

// Divider with label
export const labeledDividerSx = (theme: Theme) => ({
  my: 3,
  color: theme.palette.text.secondary,
  '&::before, &::after': {
    borderColor: alpha(theme.palette.text.primary, 0.1),
  },
});

// Status related styles
export const statusFMCSx = (theme: Theme) => ({
  bgcolor: alpha(theme.semantic.status.success, 0.1),
  color: theme.semantic.status.success,
  fontWeight: 'medium',
});

export const statusPMCSx = (theme: Theme) => ({
  bgcolor: alpha(theme.semantic.status.warning, 0.1),
  color: theme.semantic.status.warning,
  fontWeight: 'medium',
});

export const statusNMCSx = (theme: Theme) => ({
  bgcolor: alpha(theme.semantic.status.error, 0.1),
  color: theme.semantic.status.error,
  fontWeight: 'medium',
});

export const statusAdminSx = (theme: Theme) => ({
  bgcolor: alpha(theme.semantic.status.inactive, 0.1),
  color: theme.semantic.status.inactive,
  fontWeight: 'medium',
});

// Typography Styles
export const headingSx = (theme: Theme) => ({
  fontWeight: 600,
  letterSpacing: '0.01em',
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: theme.palette.primary.main,
  }
});

/**
 * Standardized typography styling for component titles
 * 
 * @param theme - Material-UI theme object
 * @param variant - Size variant ('large', 'medium', 'small')
 * @param withUnderline - Whether to add an underline accent
 * @returns SxProps object with typography styling
 */
export const titleTypographySx = (
  theme: Theme, 
  variant: 'large' | 'medium' | 'small' = 'medium',
  withUnderline: boolean = false
): SxProps<Theme> => {
  // Base styles for all title variants
  const baseStyles = {
    fontWeight: 600,
    letterSpacing: '0.01em',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1.5),
  };
  
  // Variant-specific styles
  const variantStyles = {
    large: {
      fontSize: '1.5rem', // h4 equivalent
      lineHeight: 1.3,
    },
    medium: {
      fontSize: '1.25rem', // h6 equivalent
      lineHeight: 1.4,
    },
    small: {
      fontSize: '1rem', // subtitle1 equivalent
      fontWeight: 500,
      lineHeight: 1.5,
    },
  };
  
  // Underline styles if enabled
  const underlineStyles = withUnderline ? {
    position: 'relative',
    paddingBottom: theme.spacing(1),
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 32,
      height: 2,
      backgroundColor: theme.palette.primary.main,
    }
  } : {};
  
  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...underlineStyles,
  };
};

// Consistent grid styling for layout containers
export const gridContainerSx = (theme: Theme) => ({
  '& > .MuiGrid-item': {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
});

// Consistent page container styling
export const pageContainerSx = (theme: Theme) => ({
  p: { xs: 2, sm: 3 },
  maxWidth: 1400,
  margin: '0 auto',
  width: '100%',
});

// Consistent page header styling
export const pageHeaderSx = (theme: Theme) => ({
  mb: 3,
  pb: 2,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 2,
  '& .MuiTypography-h4': {
    fontSize: { xs: '1.5rem', sm: '2rem' },
    fontWeight: 600,
    letterSpacing: '0.01em',
    position: 'relative',
    paddingLeft: 2,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 5,
      backgroundColor: theme.palette.primary.main,
    }
  }
});

// Consistent divider styling
export const technicalDividerSx = (theme: Theme) => ({
  my: 3,
  opacity: 0.6,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    height: 6,
    width: 1,
    backgroundColor: theme.palette.divider,
  },
  '&::before': {
    left: 0,
  },
  '&::after': {
    right: 0,
  }
});
