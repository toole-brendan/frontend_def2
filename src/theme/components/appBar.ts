import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createAppBarStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' 
            ? '#000000' // Pure black for AppBar
            : alpha(colors.background.paper, 0.95),
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          boxShadow: 'none',
          borderRadius: 0,
          zIndex: theme.zIndex.appBar,
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          
          // Add machined edge effect
          ...patterns.machinedEdge,
          
          // Add measurement markings to the bottom edge
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            backgroundImage: mode === 'dark'
              ? `repeating-linear-gradient(to right, 
                transparent, 
                transparent 19px, 
                rgba(255, 255, 255, 0.15) 19px, 
                rgba(255, 255, 255, 0.15) 20px)`
              : `repeating-linear-gradient(to right, 
                transparent, 
                transparent 19px, 
                rgba(0, 0, 0, 0.08) 19px, 
                rgba(0, 0, 0, 0.08) 20px)`,
            pointerEvents: 'none',
          },
          
          // Add industrial corner indicators to bottom left and bottom right
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 12,
            height: 12,
            borderLeft: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            borderBottom: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
            pointerEvents: 'none',
          },
          
          // Add subtle technical grid overlay
          '.MuiToolbar-root': {
            minHeight: 64,
            padding: '0 16px',
            backgroundImage: mode === 'dark'
              ? `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
                 linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`
              : `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), 
                 linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            position: 'relative',
            
            // Add a subtle gradient overlay for depth
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: mode === 'dark'
                ? 'linear-gradient(to bottom, rgba(26, 32, 44, 0.3) 0%, rgba(26, 32, 44, 0) 100%)'
                : 'linear-gradient(to bottom, rgba(247, 250, 252, 0.3) 0%, rgba(247, 250, 252, 0) 100%)',
              pointerEvents: 'none',
            },
            
            // Highlight the right corner
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 12,
              height: 12,
              borderRight: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
              borderTop: `2px solid ${mode === 'dark' ? colors.primary.main : colors.primary.main}`,
              pointerEvents: 'none',
            },
          },
          
          // Apply specialized styles for different color variants
          '&.MuiAppBar-colorDefault': {
            backgroundColor: mode === 'dark' 
              ? '#000000' // Pure black for AppBar
              : alpha(colors.background.paper, 0.95),
          },
          '&.MuiAppBar-colorPrimary': {
            backgroundColor: mode === 'dark' 
              ? '#000000' // Pure black for AppBar
              : alpha(colors.background.paper, 0.95),
          },
          '&.MuiAppBar-colorSecondary': {
            backgroundColor: mode === 'dark' 
              ? '#000000' // Pure black for AppBar
              : alpha(colors.background.paper, 0.95),
          },
          
          // Enhanced position styles with special effects for each position type
          '&.MuiAppBar-positionFixed': {
            backdropFilter: 'blur(12px)',
          },
          '&.MuiAppBar-positionSticky': {
            backdropFilter: 'blur(8px)',
          },
          '&.MuiAppBar-positionAbsolute': {
            backdropFilter: 'none',
          },
          '&.MuiAppBar-positionStatic': {
            backdropFilter: 'none',
          },
          
          // Add brushed metal effect for special AppBars
          '&.metal-appbar': {
            ...patterns.brushedMetal,
          },
        },
      },
    },
  };
};

export default createAppBarStyles;
