import { SvgIconComponent } from '@mui/icons-material';

export interface SubNavItemConfig {
  title: string;
  path: string;
}

export interface NavItemConfig {
  title: string;
  path: string;
  icon: SvgIconComponent;
  notificationCount?: number;
  subItems?: SubNavItemConfig[];
  isAdminSection?: boolean;
}

export interface SystemStatusConfig {
  connectionStatus: 'connected' | 'offline';
  lastSync: string;
  version: string;
}

export type DrawerVariant = 'permanent' | 'persistent' | 'temporary'; 