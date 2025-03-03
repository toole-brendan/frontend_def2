import { ReactNode } from 'react';
import { NavItemConfig, DrawerVariant, SystemStatusConfig } from '../../../types/navigation';

export interface SidebarProps {
  variant?: DrawerVariant;
  open?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
  navItems?: NavItemConfig[];
  systemStatus?: SystemStatusConfig;
}

export interface SidebarHeaderProps {
  // Empty props as we no longer need any properties
}

export interface SidebarNavItemProps {
  item: NavItemConfig;
  index: number;
  collapsed: boolean;
  isActive: boolean;
  onNavigate: (path: string) => void;
}

export interface SidebarActionButtonsProps {
  collapsed: boolean;
  onNavigate: (path: string) => void;
}

export interface SidebarFooterProps {
  collapsed: boolean;
  systemStatus: SystemStatusConfig;
  handleToggleCollapse: () => void;
  handleLogout: () => void;
}

// Common props for the entire sidebar
export interface SidebarCommonProps {
  collapsed: boolean;
  children: ReactNode;
}
