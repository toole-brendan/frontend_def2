import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Box, useTheme } from '@mui/material';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarNavContainer,
  SidebarNavSection,
  SidebarNavItem,
  SidebarFooter,
} from './Sidebar';
import { NavItemConfig, SystemStatusConfig } from '../../types/navigation';

interface SidebarComponentProps {
  variant: "permanent" | "temporary" | "persistent";
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  navItems: NavItemConfig[];
  systemStatus: SystemStatusConfig;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  variant,
  isMobile,
  open,
  onClose,
  navItems,
  systemStatus,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  // Check if an item is active
  const isItemActive = (item: NavItemConfig): boolean => {
    const currentPath = location.pathname;
    
    if (item.path === currentPath) {
      return true;
    }
    
    if (item.subItems) {
      return item.subItems.some((subItem: { path: string }) => subItem.path === currentPath);
    }
    
    return false;
  };

  // Group navigation items by section
  const mainNavItems = navItems.filter(item => !item.isAdminSection);
  const adminNavItems = navItems.filter(item => item.isAdminSection);

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <SidebarContainer collapsed={false}>
        {/* Header */}
        <SidebarHeader />
        
        {/* Navigation */}
        <SidebarNavContainer>
          {/* Main Nav Items */}
          <SidebarNavSection isFirst={true}>
            {mainNavItems.map((item, index) => (
              <SidebarNavItem
                key={`nav-${index}`}
                item={item}
                index={index}
                collapsed={false}
                isActive={isItemActive(item)}
                onNavigate={handleNavigation}
              />
            ))}
          </SidebarNavSection>
          
          {/* Admin Nav Items */}
          <SidebarNavSection isFirst={false}>
            {adminNavItems.map((item, index) => (
              <SidebarNavItem
                key={`admin-${index}`}
                item={item}
                index={index}
                collapsed={false}
                isActive={isItemActive(item)}
                onNavigate={handleNavigation}
              />
            ))}
          </SidebarNavSection>
          
          <Box sx={{ flexGrow: 1 }} />
        </SidebarNavContainer>
        
        {/* Footer */}
        <SidebarFooter
          collapsed={false}
          systemStatus={systemStatus}
          handleToggleCollapse={() => {}}
          handleLogout={() => navigate('/')}
        />
      </SidebarContainer>
    </Drawer>
  );
};

export default SidebarComponent;
