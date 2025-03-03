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

  // Content area sizing based on sidebar state
  const contentMargin = () => {
    if (isMobile) return '0px';
    if (sidebarCollapsed) return '64px';
    return '240px';
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
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: contentMargin(),
          // Technical grid background for entire app
          backgroundImage: theme.palette.mode === 'light'
            ? `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px', // Larger grid for app background
        }}
      >
        {children}
        
        {/* Footer with technical and industrial styling */}
        <Box
          component="footer"
          sx={{
            mt: 'auto',
            pt: 2,
            pb: 1,
            px: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            opacity: 0.7,
            // Technical striped pattern
            backgroundImage: theme.palette.mode === 'light'
              ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.03) 10px, rgba(0, 0, 0, 0.03) 20px)'
              : 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.02) 10px, rgba(255, 255, 255, 0.02) 20px)',
          }}
        >
          <Box component="small">
            Defense Industrial Modern Design • {new Date().getFullYear()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedMainLayout;
