import React, { useState } from 'react';
import {
  Drawer,
  List,
  Divider,
  useTheme,
  Box,
  Typography,
  IconButton,
  Badge,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Button,
} from '@mui/material';
import {
  AddCircleOutline as CreateTransferIcon,
  Description as ReportIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  Logout as LogoutIcon,
  NotificationsActive as NotificationsActiveIcon,
  QrCode as QrCodeIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItemConfig, DrawerVariant, SystemStatusConfig } from '../../types/navigation';
import NavItem from './NavItem';
import { NAV_ITEMS, ROUTES } from '../../app/routes';

// Create an icons map to help TypeScript understand the icons are used
export const icons = {
  DashboardIcon: AccountCircle,
  PropertyBookIcon: AccountCircle,
  InventoryIcon: AccountCircle,
  OperationsIcon: AccountCircle,
  TransfersIcon: AccountCircle,
  InventoriesIcon: AccountCircle,
  MaintenanceIcon: AccountCircle,
  ReportsIcon: AccountCircle,
  AdminToolsIcon: AccountCircle,
  SupportIcon: AccountCircle,
  LogoutIcon,
  WarehouseIcon: AccountCircle,
  SuppliersIcon: AccountCircle,
  PaymentsIcon: AccountCircle,
  AlertsIcon: AccountCircle,
  AnalyticsIcon: AccountCircle,
  TeamIcon: AccountCircle,
  SettingsIcon: AccountCircle,
};

// Enhanced navigation item interface that extends NavItemConfig
interface EnhancedNavItem extends NavItemConfig {
  badge?: number;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  subtitle?: string;
}

interface SidebarProps {
  variant: DrawerVariant;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  navItems: NavItemConfig[];
  systemStatus: SystemStatusConfig;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  variant, 
  open, 
  onClose,
  navItems,
  isMobile,
  systemStatus,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize collapsed state from localStorage or default to false
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  
  // Initialize warehousesOpen state from localStorage or default to false
  const [warehousesOpen, setWarehousesOpen] = useState(() => {
    const savedState = localStorage.getItem('warehousesOpen');
    return savedState ? JSON.parse(savedState) : false;
  });
  
  const drawerWidth = collapsed ? 72 : 260;

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const toggleWarehouses = () => {
    const newState = !warehousesOpen;
    setWarehousesOpen(newState);
    localStorage.setItem('warehousesOpen', JSON.stringify(newState));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  };

  // Enhanced navigation items with badges and counts
  const enhancedNavItems: EnhancedNavItem[] = navItems.map(item => ({
    ...item,
    // Add badge or subtitle based on item title if needed
    ...(item.title === 'Dashboard' ? { badge: 5 } : {}),
    ...(item.title === 'Inventory' ? { subtitle: '12,483 SKUs' } : {}),
    ...(item.title === 'Transfers' ? { subtitle: '18 active' } : {}),
    ...(item.title === 'Alerts' ? { badge: 8, badgeColor: 'error' } : {}),
  }));

  const renderNavItem = (item: EnhancedNavItem, index: number) => {
    const isActive = location.pathname === item.path;
    
    return (
      <ListItemButton
        key={index}
        onClick={() => navigate(item.path)}
        selected={isActive}
        sx={{
          minHeight: 48,
          px: 2.5,
          py: 1,
          borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
          backgroundColor: isActive 
            ? theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.04)' 
            : 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.03)',
          },
          justifyContent: collapsed ? 'center' : 'initial',
          mb: 0.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: 'center',
            color: isActive 
              ? theme.palette.primary.main 
              : theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)' 
                : 'rgba(0, 0, 0, 0.7)',
          }}
        >
          {item.badge ? (
            <Badge
              badgeContent={item.badge}
              color={item.badgeColor as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' || 'error'}
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: '0 4px',
                },
              }}
            >
              <item.icon />
            </Badge>
          ) : (
            <item.icon />
          )}
        </ListItemIcon>
        
        {!collapsed && (
          <>
            <ListItemText
              primary={item.title}
              secondary={item.subtitle}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: isActive ? 600 : 400,
                color: isActive 
                  ? theme.palette.primary.main 
                  : theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(0, 0, 0, 0.9)',
                noWrap: true,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                color: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.6)' 
                  : 'rgba(0, 0, 0, 0.6)',
                noWrap: true,
              }}
              sx={{ opacity: collapsed ? 0 : 1 }}
            />
          </>
        )}
      </ListItemButton>
    );
  };

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          marginTop: { xs: '64px', md: '72px' },
          height: { xs: 'calc(100% - 64px)', md: 'calc(100% - 72px)' },
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
      {/* Main Navigation Items */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1, // Take available space
          overflow: 'auto', // Enable scrolling for this section
          minHeight: 0, // Important for flexbox scrolling
          pt: 2, // Add padding at the top
        }}
      >
        <List sx={{ py: 1 }}>
          {enhancedNavItems.map(renderNavItem)}
        </List>
        
        <Divider sx={{ backgroundColor: theme.palette.divider, my: 1 }} />
        
        {/* System Status Section */}
        <Box sx={{ px: 2, py: 1, mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            System Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            {systemStatus.connectionStatus === 'connected' ? (
              <WifiIcon fontSize="small" color="success" sx={{ mr: 1 }} />
            ) : (
              <WifiOffIcon fontSize="small" color="error" sx={{ mr: 1 }} />
            )}
            <Typography variant="caption" color="text.secondary">
              {systemStatus.connectionStatus === 'connected' ? 'Connected' : 'Offline'}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Last Sync: {systemStatus.lastSync}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {systemStatus.version}
          </Typography>
        </Box>
      </Box>
      
      {/* Bottom Actions Section - Fixed at bottom */}
      <Box sx={{ flexShrink: 0, mt: 'auto' }}>
        {/* Sidebar Toggle */}
        <Box sx={{ 
          justifyContent: 'center', 
          mb: 2,
          display: { xs: 'none', sm: 'flex' },
        }}>
          <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <IconButton
              onClick={toggleCollapse}
              sx={{
                color: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.7)' 
                  : 'rgba(0, 0, 0, 0.7)',
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : '1px solid rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Quick Actions */}
        <Box sx={{ 
          p: collapsed ? 1 : 2,
          pt: 0,
        }}>
          {!collapsed ? (
            <>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<QrCodeIcon />}
                onClick={() => navigate(ROUTES.DASHBOARD)}
                sx={{ mb: 1 }}
              >
                Scan QR Code
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CreateTransferIcon />}
                onClick={() => navigate(ROUTES.TRANSFERS)}
                sx={{ 
                  mb: 1, 
                  color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'rgba(0, 0, 0, 0.23)'
                }}
              >
                Create Transfer
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReportIcon />}
                onClick={() => navigate(ROUTES.REPORTS)}
                sx={{ 
                  mb: 1,
                  color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'rgba(0, 0, 0, 0.23)'
                }}
              >
                Generate Report
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Scan QR Code" placement="right">
                <IconButton
                  color="primary"
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                  sx={{ 
                    backgroundColor: theme.palette.primary.main, 
                    color: 'white', 
                    '&:hover': { 
                      backgroundColor: theme.palette.primary.dark 
                    } 
                  }}
                >
                  <QrCodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Create Transfer" placement="right">
                <IconButton
                  onClick={() => navigate(ROUTES.TRANSFERS)}
                  sx={{ 
                    border: theme.palette.mode === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid rgba(0, 0, 0, 0.23)', 
                    color: theme.palette.text.primary 
                  }}
                >
                  <CreateTransferIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Generate Report" placement="right">
                <IconButton
                  onClick={() => navigate(ROUTES.REPORTS)}
                  sx={{ 
                    border: theme.palette.mode === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid rgba(0, 0, 0, 0.23)', 
                    color: theme.palette.text.primary 
                  }}
                >
                  <ReportIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        
        {/* Logout Button */}
        <Box sx={{ 
          pb: 2, 
          display: 'flex', 
          justifyContent: collapsed ? 'center' : 'flex-start', 
          px: collapsed ? 0 : 2,
        }}>
          <Button
            variant="text"
            color="inherit"
            onClick={handleLogout}
            startIcon={!collapsed && <LogoutIcon />}
            sx={{ 
              color: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)' 
                : 'rgba(0, 0, 0, 0.7)',
              justifyContent: collapsed ? 'center' : 'flex-start',
              minWidth: collapsed ? 'auto' : '100%',
            }}
          >
            {collapsed ? <LogoutIcon /> : 'Logout'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 