import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

interface PageContainerProps {
  children: ReactNode;
  header?: ReactNode;
}

/**
 * Standardized container for all pages in the application
 * Ensures consistent spacing, background color, and layout
 */
const PageContainer: React.FC<PageContainerProps> = ({ children, header }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        color: 'text.primary',
        minHeight: '100vh',
        p: 3,
        bgcolor: theme => theme.palette.background.default,
      }}
    >
      {header && (
        <Box sx={{ mb: 3 }}>
          {header}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default PageContainer;
