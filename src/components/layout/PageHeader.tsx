import React, { ReactNode } from 'react';
import { Box, Typography, Divider, useTheme } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  divider?: boolean;
}

/**
 * Standardized header for all pages in the application
 * Ensures consistent title, subtitle, and action button layout
 */
const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  actions,
  divider = true
}) => {
  const theme = useTheme();
  
  return (
    <Box 
      component="header" 
      sx={{ 
        py: 1.5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        ...(divider && {
          borderBottom: '1px solid',
          borderColor: 'divider',
        }),
        mb: divider ? 3 : 2
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="600" color="primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      
      {actions && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
