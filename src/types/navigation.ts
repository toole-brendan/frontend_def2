import { SvgIconComponent } from '@mui/icons-material';

export interface NavItemConfig {
  title: string;
  path: string;
  icon: SvgIconComponent;
}

export type DrawerVariant = 'permanent' | 'persistent' | 'temporary'; 