import React from 'react';
import { Box, Container, SxProps, Theme, useTheme } from '@mui/material';
import { pageContainerSx } from '../../theme/patterns';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Page container component that provides consistent spacing and layout
 */
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  description,
  header,
  sx,
}) => {
  const theme = useTheme();
  
  return (
    <Container 
      component="section"
      sx={{
        ...pageContainerSx(theme),
        ...(sx || {})
      }}
    >
      {title && !header && (
        <Box
          component="header" 
          role="presentation"
          sx={{ mb: 4, display: 'none' }} // Visually hidden but accessible to screen readers
        >
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </Box>
      )}
      
      {header && (
        <Box component="header" role="presentation">
          {header}
        </Box>
      )}
      
      {children}
    </Container>
  );
};

export default PageContainer;
