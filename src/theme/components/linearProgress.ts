import { Theme, alpha } from '@mui/material/styles';
import tokens from '../tokens';
import createPatterns from '../patterns';

export const createLinearProgressStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  const colors = tokens.colors[mode];
  // @ts-ignore - Unused variable intentionally kept
  const _patterns = createPatterns(mode);
  
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borders.radius.none,
          height: 6,
          backgroundColor: mode === 'dark'
            ? 'rgba(226, 232, 240, 0.1)'
            : 'rgba(74, 85, 104, 0.1)',
          overflow: 'visible',
          position: 'relative',
          // Apply measurement markings manually
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            width: '1px',
            height: '8px',
            marginTop: '-4px',
            backgroundColor: mode === 'dark' 
              ? 'rgba(226, 232, 240, 0.1)' 
              : 'rgba(74, 85, 104, 0.2)',
            pointerEvents: 'none',
          },
          '&::before': {
            left: '25%',
          },
          '&::after': {
            left: '75%',
          },
          // Add a thin border
          border: `1px solid ${mode === 'dark'
            ? alpha(colors.border.light, 0.2)
            : alpha(colors.border.dark, 0.1)}`,
        },
        bar: {
          borderRadius: tokens.borders.radius.none,
          // Add industrial-style background pattern
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: mode === 'dark'
              ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.05) 75%, transparent 75%, transparent)'
              : 'linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 75%, transparent 75%, transparent)',
            backgroundSize: '10px 10px',
            zIndex: 1,
          },
        },
        colorPrimary: {
          '& .MuiLinearProgress-bar': {
            backgroundColor: colors.primary.main,
          },
        },
        colorSecondary: {
          '& .MuiLinearProgress-bar': {
            backgroundColor: colors.secondary.main,
          },
        },
        // Status variants using custom classNames
        '&.success': {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.success, 0.1)
            : alpha(colors.status.success, 0.05),
          '& .MuiLinearProgress-bar': {
            backgroundColor: colors.status.success,
          },
        },
        '&.warning': {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.warning, 0.1)
            : alpha(colors.status.warning, 0.05),
          '& .MuiLinearProgress-bar': {
            backgroundColor: colors.status.warning,
          },
        },
        '&.error': {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.error, 0.1)
            : alpha(colors.status.error, 0.05),
          '& .MuiLinearProgress-bar': {
            backgroundColor: colors.status.error,
          },
        },
        '&.info': {
          backgroundColor: mode === 'dark'
            ? alpha(colors.status.info, 0.1)
            : alpha(colors.status.info, 0.05),
          '& .MuiLinearProgress-bar': {
            backgroundColor: colors.status.info,
          },
        },
        // Progress buffer
        buffer: {
          backgroundColor: mode === 'dark'
            ? alpha(colors.primary.main, 0.1)
            : alpha(colors.primary.main, 0.05),
        },
        dashed: {
          backgroundImage: mode === 'dark'
            ? `radial-gradient(${alpha(colors.primary.main, 0.15)} 0%, ${alpha(colors.primary.main, 0.15)} 16%, transparent 42%)`
            : `radial-gradient(${alpha(colors.primary.main, 0.1)} 0%, ${alpha(colors.primary.main, 0.1)} 16%, transparent 42%)`,
          backgroundSize: '10px 10px',
        },
      },
    },
  };
};

export default createLinearProgressStyles;
