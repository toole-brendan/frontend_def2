import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import AppBar from './AppBar';
import SidebarComponent from './SidebarComponent';
import { NAV_ITEMS, SYSTEM_STATUS } from '../../app/routes';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar 
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
        userDisplayName="CPT Michael Rodriguez" // User display name
      />
      
      <SidebarComponent 
        variant={isMobile ? "temporary" : "permanent"}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        navItems={NAV_ITEMS}
        systemStatus={SYSTEM_STATUS}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 }, // Responsive padding
          mt: 8, // Height of AppBar
          backgroundColor: 'transparent',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
