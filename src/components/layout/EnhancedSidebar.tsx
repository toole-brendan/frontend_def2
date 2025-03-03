import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  useTheme,
  alpha,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { NAV_ITEMS, SYSTEM_STATUS } from '../../app/routes';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarNavContainer,
  SidebarNavSection,
  SidebarNavItem,
  SidebarActionButtons,
  SidebarFooter,
  SidebarProps
} from './Sidebar';

// Drawer width
const drawerWidth = 260;
const collapsedDrawerWidth = 72;

const EnhancedSidebar: React.FC<SidebarProps> = ({
  variant = 'permanent',
  open = true,
  isMobile = false,
  onClose = () => {},
  onToggle = () => {},
  navItems = NAV_ITEMS,
  systemStatus = SYSTEM_STATUS,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize expandedItems state from localStorage or default to empty array
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    try {
      const savedState = localStorage.getItem('sidebarExpandedItems');
      return savedState ? JSON.parse(savedState) : [];
    } catch (e) {
      return [];
    }
  });

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const savedState = localStorage.getItem('sidebarCollapsed');
      return savedState ? JSON.parse(savedState) : false;
    } catch (e) {
      return false;
    }
  });

  // Save expanded items to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarExpandedItems', JSON.stringify(expandedItems));
  }, [expandedItems]);

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  // Toggle expanded sections
  const toggleExpand = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Toggle sidebar collapse
  const handleToggleCollapse = () => {
    setCollapsed(prev => !prev);
    onToggle();
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  // Calculate drawer width based on collapsed state
  const sidebarWidth = collapsed ? collapsedDrawerWidth : drawerWidth;

  // Check if an item or its children are active
  const isItemActive = (item: any): boolean => {
    const currentPath = location.pathname;
    
    if (item.path === currentPath) {
      return true;
    }
    
    if (item.subItems) {
      return item.subItems.some((subItem: any) => subItem.path === currentPath);
    }
    
    return false;
  };

  // Group navigation items by section
  const mainNavItems = navItems.filter(item => !item.isAdminSection);
  const adminNavItems = navItems.filter(item => item.isAdminSection);

  return (
    <Drawer
      variant={variant}
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : theme.semantic.background.tertiary,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          marginTop: { xs: '64px', md: '72px' },
          height: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 72px)' },
          display: 'flex',
          flexDirection: 'column',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
              : 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)',
            pointerEvents: 'none',
          },
        },
      }}
    >
      <SidebarContainer collapsed={collapsed}>
        {/* Header with navigation title and collapse/expand button */}
        <SidebarHeader />
        
        {/* Navigation container with scrollable content */}
        <SidebarNavContainer>
          {/* Main Navigation Section */}
          <SidebarNavSection isFirst={true}>
            {mainNavItems.map((item, index) => (
              <SidebarNavItem
                key={`${item.title.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                item={item}
                index={index}
                collapsed={collapsed}
                isActive={isItemActive(item)}
                onNavigate={handleNavigation}
              />
            ))}
          </SidebarNavSection>
          
          {/* Admin Navigation Section */}
          <SidebarNavSection isFirst={false}>
            {adminNavItems.map((item, index) => (
              <SidebarNavItem
                key={`${item.title.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                item={item}
                index={index}
                collapsed={collapsed}
                isActive={isItemActive(item)}
                onNavigate={handleNavigation}
              />
            ))}
            
            {/* Collapse/Expand Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 2, 
              mb: 1,
              px: 1
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}>
                <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
                  <IconButton 
                    onClick={handleToggleCollapse} 
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    sx={{
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                      borderRadius: 0,
                      backgroundColor: alpha(theme.palette.primary.main, collapsed ? 0.2 : 0.15),
                      color: theme.palette.primary.main,
                      width: collapsed ? 46 : 36,
                      height: 36,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, collapsed ? 0.3 : 0.25),
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </SidebarNavSection>
          
          {/* Spacer to push buttons to bottom */}
          <Box sx={{ flexGrow: 1 }} /> 
        </SidebarNavContainer>
        
        {/* Action Buttons */}
        <SidebarActionButtons 
          collapsed={collapsed} 
          onNavigate={handleNavigation} 
        />
        
        {/* Footer with system info and logout */}
        <SidebarFooter 
          collapsed={collapsed} 
          systemStatus={systemStatus}
          handleToggleCollapse={handleToggleCollapse}
          handleLogout={handleLogout}
        />
      </SidebarContainer>
    </Drawer>
  );
};

export default EnhancedSidebar;
