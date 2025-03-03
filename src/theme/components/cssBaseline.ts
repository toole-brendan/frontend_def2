import { Theme } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createCssBaselineStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  const patterns = createPatterns(mode);
  
  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          boxSizing: 'border-box',
          scrollBehavior: 'smooth',
        },
        '*, *::before, *::after': {
          boxSizing: 'inherit',
        },
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: mode === 'dark' ? '#000000' : colors.background.default,
          color: colors.text.primary,
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut}`,
          overflowX: 'hidden',
          minHeight: '100vh',
          
          // Add subtle technical grid background only in light mode
          ...(mode === 'light' && {
            backgroundImage: `linear-gradient(rgba(203, 213, 224, 0.05) 1px, transparent 1px), 
                              linear-gradient(to right, rgba(203, 213, 224, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }),
          
          // Add very subtle noise texture for dark mode
          ...(mode === 'dark' && {
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.025'/%3E%3C/svg%3E")`,
          }),
        },
        
        // Enhanced scrollbar styles
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: mode === 'dark' ? '#050505' : '#F7FAFC',
          borderRadius: 0,
        },
        '*::-webkit-scrollbar-thumb': {
          background: mode === 'dark' ? '#202020' : '#CBD5E0',
          borderRadius: 0,
          
          // Add industrial corner accents to scrollbar thumb
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: 4,
            height: 4,
            borderColor: mode === 'dark' ? colors.primary.main : colors.primary.main,
          },
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: mode === 'dark' ? '#4C566A' : '#A0AEC0',
        },
        
        // Customize selection color
        '::selection': {
          backgroundColor: mode === 'dark' 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(37, 99, 235, 0.2)',
          color: mode === 'dark' ? '#F8F9FA' : '#101114',
        },
        
        // Improve default link styling
        'a': {
          color: mode === 'dark' ? colors.primary.light : colors.primary.dark,
          textDecoration: 'none',
          transition: `color ${tokens.transitions.duration.fast} ${tokens.transitions.easing.easeInOut}`,
          
          '&:hover': {
            color: mode === 'dark' ? colors.primary.main : colors.primary.main,
            textDecoration: 'underline',
          },
        },
        
        // Apply technical font to code blocks
        'code, pre': {
          fontFamily: tokens.typography.fontFamilies.mono,
          fontSize: '0.9em',
          backgroundColor: mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.2)' 
            : 'rgba(0, 0, 0, 0.05)',
          borderRadius: tokens.borders.radius.sm,
          padding: '0.2em 0.4em',
        },
        
        // Define global transition classes
        '.theme-transition': {
          transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.easing.easeInOut} !important`,
          transitionDelay: '0s !important',
        },
        
        // Technical grid class that can be applied to any container
        '.technical-grid': {
          ...patterns.technicalGrid,
        },
        
        // Precision grid class for measuring/data visualization elements
        '.precision-grid': {
          ...patterns.precisionGrid,
        },
        
        // Industrial panel class
        '.industrial-panel': {
          ...patterns.industrialPanel,
        },
        
        // Brushed metal effect
        '.brushed-metal': {
          ...patterns.brushedMetal,
        },
        
        // Machined edge effect
        '.machined-edge': {
          ...patterns.machinedEdge,
        },
        
        // Add inset panel effect
        '.inset-panel': {
          ...patterns.insetPanel,
        },
        
        // Status indicator classes
        '.status-success': {
          ...patterns.technicalIndicator,
          ...patterns.successIndicator,
        },
        '.status-warning': {
          ...patterns.technicalIndicator,
          ...patterns.warningIndicator,
        },
        '.status-error': {
          ...patterns.technicalIndicator,
          ...patterns.errorIndicator,
        },
        '.status-info': {
          ...patterns.technicalIndicator,
          ...patterns.infoIndicator,
        },
        '.status-inactive': {
          ...patterns.technicalIndicator,
          ...patterns.inactiveIndicator,
        },
      },
    },
  };
};

export default createCssBaselineStyles;
