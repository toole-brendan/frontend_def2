import React, { useState, useEffect } from 'react';
import { 
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  CssBaseline
} from '@mui/material';
import AppBar from './AppBar';
import EnhancedSidebar from './EnhancedSidebar';
import { NAV_ITEMS, SYSTEM_STATUS } from '../../app/routes';

interface AppContainerProps {
  children: React.ReactNode;
}

/**
 * AppContainer is the main layout component that wraps the entire application.
 * It manages the AppBar, Sidebar, and main content area.
 */
const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const savedState = localStorage.getItem('sidebarCollapsed');
      return savedState ? JSON.parse(savedState) : false;
    } catch (e) {
      return false;
    }
  });

  const drawerWidth = sidebarCollapsed ? 72 : 260;

  // Update collapsed state whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        setSidebarCollapsed(JSON.parse(savedState));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar 
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
        userDisplayName="CPT Michael Rodriguez"
      />

      {/* Sidebar - Mobile (Drawer) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <EnhancedSidebar 
            variant="temporary"
            isMobile={true}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onToggle={() => handleSidebarCollapse(!sidebarCollapsed)}
            navItems={NAV_ITEMS}
            systemStatus={SYSTEM_STATUS}
          />
        </Drawer>
      )}

      {/* Sidebar - Desktop (Permanent) */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
              position: 'relative',
              height: '100%',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            width: drawerWidth,
            flexShrink: 0,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
          open
        >
          <EnhancedSidebar 
            variant="permanent"
            isMobile={false}
            open={true}
            onClose={() => {}}
            onToggle={() => handleSidebarCollapse(!sidebarCollapsed)}
            navItems={NAV_ITEMS}
            systemStatus={SYSTEM_STATUS}
          />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pt: { xs: 8, md: 10 },
          height: '100vh',
          overflow: 'auto',
          bgcolor: theme.palette.background.default,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
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
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '1600px', 
            mx: 'auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppContainer;
