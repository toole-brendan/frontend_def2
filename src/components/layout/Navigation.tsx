import React from 'react';
import SidebarComponent from './SidebarComponent';
import { NavItemConfig, SystemStatusConfig } from '../../types/navigation';

interface NavigationProps {
  isMobile: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  navItems: NavItemConfig[];
}

// Mock system status for development
const mockSystemStatus: SystemStatusConfig = {
  connectionStatus: 'connected',
  lastSync: new Date().toISOString(),
  version: '1.0.0'
};

const Navigation: React.FC<NavigationProps> = ({ isMobile, mobileOpen, onDrawerToggle, navItems }) => {
  return (
    <>
      <SidebarComponent 
        variant={isMobile ? "temporary" : "permanent"} 
        isMobile={isMobile}
        open={mobileOpen}
        onClose={onDrawerToggle}
        navItems={navItems}
        systemStatus={mockSystemStatus}
      />
    </>
  );
};

export default Navigation; 