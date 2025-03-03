import { alpha, Theme } from '@mui/material';

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

// Button styling
export const buttonSx = {
  borderRadius: 0,
  borderColor: 'rgba(140, 140, 160, 0.2)',
  fontWeight: 'medium',
  letterSpacing: '0.03em',
};

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
