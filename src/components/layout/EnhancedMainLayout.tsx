import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AppBar from './AppBar';
import EnhancedSidebar from './EnhancedSidebar';
import { NAV_ITEMS, SYSTEM_STATUS } from '../../app/routes';

interface EnhancedMainLayoutProps {
  children: React.ReactNode;
}

/**
 * Enhanced Main Layout component implementing the Defense Industrial Modern Design aesthetic
 * Drop-in replacement for the original MainLayout component
 */
const EnhancedMainLayout: React.FC<EnhancedMainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const savedState = localStorage.getItem('sidebarCollapsed');
      return savedState ? JSON.parse(savedState) : false;
    } catch (e) {
      return false;
    }
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCollapseToggle = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsedState));
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      
      <AppBar 
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
        userDisplayName="CPT Michael Rodriguez"
      />
      
      <EnhancedSidebar 
        variant={isMobile ? "temporary" : "permanent"}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        onToggle={handleCollapseToggle}
        navItems={NAV_ITEMS}
        systemStatus={SYSTEM_STATUS}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          mt: 8, // Height of AppBar
          backgroundColor: 'transparent',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          // Spacing adjustment for sidebar
          ...(sidebarOpen && !isMobile && {
            marginLeft: sidebarCollapsed ? 8 : 24,
          }),
          // Add subtle grid pattern for Defense Industrial Modern Design
          ...(theme.palette.mode === 'light' && {
            backgroundImage: 'linear-gradient(rgba(203, 213, 224, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 224, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }),
          ...(theme.palette.mode === 'dark' && {
            backgroundImage: 'linear-gradient(rgba(226, 232, 240, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(226, 232, 240, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }),
          // Subtle border effect
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '72px',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)',
            opacity: theme.palette.mode === 'dark' ? 0.3 : 0.1,
            pointerEvents: 'none',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default EnhancedMainLayout;
