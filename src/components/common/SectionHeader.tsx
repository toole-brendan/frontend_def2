import React from 'react';
import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material';
import { titleTypographySx } from '../../theme/patterns';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'large' | 'medium' | 'small';
  withUnderline?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * A standardized section header component for consistent typography
 * throughout the application.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  action,
  variant = 'medium',
  withUnderline = false,
  sx,
}) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        mb: 2,
        ...(sx || {})
      }}
    >
      <Box>
        <Typography 
          variant={variant === 'large' ? 'h4' : variant === 'medium' ? 'h6' : 'subtitle1'}
          sx={titleTypographySx(theme, variant, withUnderline)}
        >
          {title}
        </Typography>
        
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {description}
          </Typography>
        )}
      </Box>
      
      {action && (
        <Box sx={{ ml: 2 }}>
          {action}
        </Box>
      )}
    </Box>
  );
};

export default SectionHeader; 