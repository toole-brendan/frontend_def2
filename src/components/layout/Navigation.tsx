import React from 'react';
import Sidebar from './Sidebar';
import { NavItemConfig } from '../../types/navigation';

interface NavigationProps {
  isMobile: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  navItems: NavItemConfig[];
}

const Navigation: React.FC<NavigationProps> = ({ isMobile, mobileOpen, onDrawerToggle, navItems }) => {
  return (
    <>
      <Sidebar 
        variant={isMobile ? "temporary" : "permanent"} 
        isMobile={isMobile}
        open={mobileOpen}
        onClose={onDrawerToggle}
        navItems={navItems}
      />
    </>
  );
};

export default Navigation; 