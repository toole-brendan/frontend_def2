import React from 'react';
import { 
  Box, 
  Card, 
  CardHeader as MuiCardHeader, 
  CardHeaderProps as MuiCardHeaderProps,
  CardContent, 
  Typography, 
  useTheme, 
  SxProps, 
  Theme 
} from '@mui/material';

// Create CSS for the industrial pattern background
// This creates a subtle technical grid background
const industrialPatternStyles = `
.industrial-pattern {
  position: relative;
}

.industrial-pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* Light mode grid pattern */
.light-mode .industrial-pattern::before {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Dark mode grid pattern */
.dark-mode .industrial-pattern::before {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = industrialPatternStyles;
  document.head.appendChild(styleElement);
}

// Props for the enhanced CardHeader component
interface EnhancedCardHeaderProps extends Omit<MuiCardHeaderProps, 'title'> {
  title: React.ReactNode;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

// Enhanced CardHeader with Defense Industrial Modern Design styling
export const EnhancedCardHeader: React.FC<EnhancedCardHeaderProps> = ({
  title,
  action,
  sx,
  ...props
}) => {
  return (
    <MuiCardHeader
      title={
        typeof title === 'string' ? (
          <Typography variant="h6" fontWeight={600} sx={{ letterSpacing: '0.025em' }}>
            {title}
          </Typography>
        ) : (
          title
        )
      }
      action={action}
      sx={{ 
        p: 2, 
        pb: 1,
        '& .MuiCardHeader-action': { 
          m: 0, 
          alignSelf: 'center' 
        },
        ...sx 
      }}
      {...props}
    />
  );
};

// Props for the StatusCard component
interface StatusCardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  withPattern?: boolean;
  noPadding?: boolean;
  borderPosition?: 'top' | 'left' | 'right' | 'bottom' | 'none';
  borderColor?: string;
}

/**
 * Base card component with Defense Industrial Modern Design styling.
 * Serves as the foundation for all enhanced status cards.
 */
export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  action,
  children,
  sx,
  contentSx,
  withPattern = true,
  noPadding = false,
  borderPosition = 'none',
  borderColor,
}) => {
  const theme = useTheme();
  
  // Determine border styling based on position
  const getBorderStyle = () => {
    if (borderPosition === 'none') return {};
    
    const color = borderColor || theme.palette.primary.main;
    
    switch (borderPosition) {
      case 'top':
        return { borderTop: `3px solid ${color}` };
      case 'left':
        return { borderLeft: `3px solid ${color}` };
      case 'right':
        return { borderRight: `3px solid ${color}` };
      case 'bottom':
        return { borderBottom: `3px solid ${color}` };
      default:
        return {};
    }
  };
  
  return (
    <Card
      elevation={0}
      className={withPattern ? 'industrial-pattern' : undefined}
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1, // Slightly rounded corners
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
        },
        // Corner markers for technical look
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
        ...getBorderStyle(),
        ...sx,
      }}
    >
      <EnhancedCardHeader title={title} action={action} />
      
      <CardContent
        sx={{
          pt: 1,
          pb: noPadding ? 0 : 2,
          px: noPadding ? 0 : 2,
          '&:last-child': { pb: noPadding ? 0 : 2 },
          position: 'relative',
          zIndex: 1, // Ensure content is above the pattern background
          ...contentSx,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
