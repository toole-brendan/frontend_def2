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
import { cardSx } from '../../../theme/patterns';

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
  const color = borderColor || theme.palette.primary.main;
  
  // Get the border style based on position
  let borderStyle = {};
  if (borderPosition === 'top') {
    borderStyle = { borderTop: `3px solid ${color}` };
  } else if (borderPosition === 'left') {
    borderStyle = { borderLeft: `3px solid ${color}` };
  } else if (borderPosition === 'right') {
    borderStyle = { borderRight: `3px solid ${color}` };
  } else if (borderPosition === 'bottom') {
    borderStyle = { borderBottom: `3px solid ${color}` };
  }
  
  const baseStyles = cardSx(theme, undefined, withPattern);
  
  return (
    <Card
      elevation={0}
      className={withPattern ? 'industrial-pattern' : undefined}
      sx={{
        ...baseStyles,
        ...borderStyle,
        ...(sx || {})
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
