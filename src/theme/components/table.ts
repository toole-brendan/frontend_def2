import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createTableStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          // Add technical corner marker to top-left of table head
          position: 'relative',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            borderTop: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderLeft: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            pointerEvents: 'none',
            zIndex: 1,
          },
          
          // Add measurement markings to the top
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundImage: mode === 'dark'
              ? `repeating-linear-gradient(to right, 
                  transparent, 
                  transparent 19px, 
                  rgba(255, 255, 255, 0.15) 19px, 
                  rgba(255, 255, 255, 0.15) 20px)`
              : `repeating-linear-gradient(to right, 
                  transparent, 
                  transparent 19px, 
                  rgba(0, 0, 0, 0.1) 19px, 
                  rgba(0, 0, 0, 0.1) 20px)`,
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          // Add technical corner marker to bottom-right of table body
          position: 'relative',
          
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 8,
            height: 8,
            borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            pointerEvents: 'none',
            zIndex: 1,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // Add measurement markings to first row cell
          '&:first-of-type td:first-of-type::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundImage: mode === 'dark'
              ? `repeating-linear-gradient(to bottom, 
                  transparent, 
                  transparent 9px, 
                  rgba(255, 255, 255, 0.1) 9px, 
                  rgba(255, 255, 255, 0.1) 10px)`
              : `repeating-linear-gradient(to bottom, 
                  transparent, 
                  transparent 9px, 
                  rgba(0, 0, 0, 0.06) 9px, 
                  rgba(0, 0, 0, 0.06) 10px)`,
            pointerEvents: 'none',
          },
          
          transition: `background-color ${tokens.transitions.duration.fast} ${tokens.transitions.easing.easeOut}`,
          
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.background.light, 0.2) 
              : alpha(colors.background.dark, 0.05),
          },
          
          // Zebra striping for better readability
          '&:nth-of-type(even)': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.background.light, 0.05) 
              : alpha(colors.background.dark, 0.02),
          },
          
          // Selected row styling
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.primary.main, 0.12) 
              : alpha(colors.primary.main, 0.08),
            
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? alpha(colors.primary.main, 0.2) 
                : alpha(colors.primary.main, 0.12),
            },
          },
        },
        head: {
          backgroundColor: mode === 'dark' 
            ? alpha(colors.background.dark, 0.6) 
            : alpha(colors.background.dark, 0.05),
          
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? alpha(colors.background.dark, 0.6) 
              : alpha(colors.background.dark, 0.05),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          padding: '10px 16px',
          fontSize: tokens.typography.fontSize.sm,
          position: 'relative',
          
          '&:first-of-type': {
            paddingLeft: 16,
          },
          '&:last-of-type': {
            paddingRight: 16,
          },
        },
        head: {
          fontWeight: tokens.typography.fontWeights.semibold,
          color: mode === 'dark' ? colors.text.primary : colors.text.primary,
          borderBottom: `2px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.12)' 
            : 'rgba(0, 0, 0, 0.08)'}`,
          whiteSpace: 'nowrap',
          padding: '12px 16px',
          letterSpacing: tokens.typography.letterSpacing.wide,
          
          // Add industrial edge effect to header cells
          ...patterns.machinedEdge,
        },
        body: {
          color: mode === 'dark' ? colors.text.secondary : colors.text.secondary,
        },
        footer: {
          borderBottom: 'none',
          fontWeight: tokens.typography.fontWeights.medium,
          color: mode === 'dark' ? colors.text.primary : colors.text.primary,
          borderTop: `2px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.12)' 
            : 'rgba(0, 0, 0, 0.08)'}`,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          backgroundColor: mode === 'dark' 
            ? alpha(colors.background.paper, 0.5) 
            : colors.background.paper,
          position: 'relative',
          
          // Add technical grid pattern to table background
          backgroundImage: mode === 'dark'
            ? `linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), 
               linear-gradient(to right, rgba(255, 255, 255, 0.01) 1px, transparent 1px)`
            : `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), 
               linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          
          // Apply brushed metal effect for certain tables
          '&.metal-table': {
            ...patterns.brushedMetal,
          },
          
          // Apply technical grid for data tables
          '&.data-table': {
            ...patterns.technicalGrid,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          backgroundColor: mode === 'dark' 
            ? alpha(colors.background.dark, 0.3) 
            : alpha(colors.background.dark, 0.02),
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          overflow: 'hidden',
          ...patterns.industrialEdge,
        },
        selectIcon: {
          color: mode === 'dark' ? colors.text.secondary : colors.text.secondary,
        },
        select: {
          paddingLeft: 8,
          paddingRight: 24,
        },
        actions: {
          marginLeft: 20,
        },
      },
    },
  };
};

export default createTableStyles;
