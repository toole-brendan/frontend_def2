import React from 'react';
import EnhancedSidebar from './EnhancedSidebar';
import { NavItemConfig, SystemStatusConfig } from '../../types/navigation';
import { SYSTEM_STATUS } from '../../app/routes';

interface EnhancedNavigationProps {
  isMobile: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  navItems: NavItemConfig[];
  systemStatus?: SystemStatusConfig;
}

/**
 * Enhanced Navigation component that serves as a drop-in replacement for the original Navigation component
 * Implements the Defense Industrial Modern Design aesthetic
 */
const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  isMobile,
  mobileOpen,
  onDrawerToggle,
  navItems,
  systemStatus = SYSTEM_STATUS,
}) => {
  return (
    <EnhancedSidebar
      variant={isMobile ? 'temporary' : 'permanent'}
      isMobile={isMobile}
      open={mobileOpen}
      onClose={onDrawerToggle}
      onToggle={onDrawerToggle}
      navItems={navItems}
      systemStatus={systemStatus}
    />
  );
};

export default EnhancedNavigation;
