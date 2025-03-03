import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Badge,
  Chip,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowRight as ExpandLessIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CircleOutlined as StatusIcon,
  AccountCircle as AccountCircleIcon,
  QrCodeScanner as QrCodeIcon,
  SwapHoriz as SwapHorizIcon, 
  Description as ReportIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { NavItemConfig, DrawerVariant, SystemStatusConfig } from '../../types/navigation';
import { NAV_ITEMS, SYSTEM_STATUS } from '../../app/routes';

// Drawer width
const drawerWidth = 280;
const collapsedDrawerWidth = 72;

interface EnhancedSidebarProps {
  variant?: DrawerVariant;
  open?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
  navItems?: NavItemConfig[];
  systemStatus?: SystemStatusConfig;
}

const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
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

  // Determine current active item based on location path
  const getActiveItem = (): string => {
    const path = location.pathname;
    
    // Check for exact match first
    const exactMatch = navItems.find(item => item.path === path);
    if (exactMatch) return exactMatch.title.toLowerCase().replace(/\s+/g, '-');
    
    // Check for sub-item match
    for (const item of navItems) {
      if (item.subItems) {
        const subItemMatch = item.subItems.find(subItem => subItem.path === path);
        if (subItemMatch) return subItemMatch.title.toLowerCase().replace(/\s+/g, '-');
      }
    }

    // Check if the path is a sub-path of any item
    for (const item of navItems) {
      if (path.startsWith(item.path + '/')) {
        return item.title.toLowerCase().replace(/\s+/g, '-');
      }
    }
    
    return '';
  };

  const activeItem = getActiveItem();

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

  // Generate ID for an item (used for expanded state tracking)
  const getItemId = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  // Check if an item or its children are active
  const isItemActive = (item: NavItemConfig): boolean => {
    const currentPath = location.pathname;
    
    if (item.path === currentPath) {
      return true;
    }
    
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === currentPath);
    }
    
    return false;
  };

  // Render a navigation item
  const renderNavItem = (item: NavItemConfig, index: number) => {
    const itemId = getItemId(item.title);
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.includes(itemId);
    const hasChildren = item.subItems && item.subItems.length > 0;

    return (
      <React.Fragment key={`${itemId}-${index}`}>
        <ListItem 
          disablePadding 
          sx={{ 
            display: 'block',
          }}
        >
          <ListItemButton
            selected={isActive}
            onClick={() => handleNavigation(item.path)}
            sx={{
              minHeight: 48,
              px: 2.5,
              py: 1,
              borderLeft: isActive 
                ? `3px solid ${theme.palette.primary.main}` 
                : '3px solid transparent',
              backgroundColor: isActive
                ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.1 : 0.05)
                : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.08)
                  : alpha(theme.palette.primary.main, 0.03),
              },
              position: 'relative',
              ...(collapsed && {
                justifyContent: 'center',
                px: 2,
              }),
              ...(!collapsed && isActive && {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  backgroundColor: theme.palette.primary.main,
                },
              }),
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
              {item.notificationCount ? (
                <Badge
                  badgeContent={item.notificationCount}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -3,
                      top: 3,
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? theme.palette.primary.main 
                        : theme.palette.primary.dark,
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
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.025em',
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(0, 0, 0, 0.9)',
                    noWrap: true,
                  }}
                />
                
                {item.notificationCount && (
                  <Chip
                    size="small"
                    label={item.notificationCount}
                    color="primary"
                    sx={{ 
                      height: 20, 
                      fontSize: 11,
                      borderRadius: 0,
                      fontWeight: 600,
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? theme.palette.primary.main 
                        : theme.palette.primary.dark,
                    }}
                  />
                )}
                
                {hasChildren && (
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => toggleExpand(itemId, e)}
                    sx={{ 
                      ml: 1,
                      color: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </IconButton>
                )}
              </>
            )}
          </ListItemButton>
        </ListItem>
        
        {hasChildren && !collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems?.map((subItem, subIndex) => {
                const subItemActive = location.pathname === subItem.path;
                
                return (
                  <ListItem 
                    key={`${getItemId(subItem.title)}-${subIndex}`} 
                    disablePadding 
                    sx={{ display: 'block' }}
                  >
                    <ListItemButton
                      selected={subItemActive}
                      onClick={() => handleNavigation(subItem.path)}
                      sx={{
                        pl: 7,
                        minHeight: 36,
                        backgroundColor: subItemActive
                          ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.1 : 0.05)
                          : 'transparent',
                        borderLeft: subItemActive
                          ? `3px solid ${theme.palette.primary.main}`
                          : '3px solid transparent',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.08)
                            : alpha(theme.palette.primary.main, 0.03),
                        },
                      }}
                    >
                      <ListItemText
                        primary={subItem.title}
                        primaryTypographyProps={{
                          fontSize: 13,
                          fontWeight: subItemActive ? 600 : 400,
                          color: subItemActive
                            ? theme.palette.primary.main
                            : theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : 'rgba(0, 0, 0, 0.7)',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
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
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(12px)',
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['width', 'border-color'], {
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
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)',
            opacity: theme.palette.mode === 'dark' ? 1 : 0.3,
            pointerEvents: 'none',
          },
        },
      }}
    >
      {/* User Profile Section */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: collapsed ? 'center' : 'flex-start',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={1.5}
          sx={{ width: '100%', mb: collapsed ? 0 : 1 }}
        >
          <Avatar 
            sx={{ 
              width: 42, 
              height: 42, 
              bgcolor: theme.palette.primary.main,
              borderRadius: 0,  // Square avatar for military/industrial look
            }}
          >
            <AccountCircleIcon />
          </Avatar>
          
          {!collapsed && (
            <Box sx={{ overflow: 'hidden', width: '100%' }}>
              <Typography 
                variant="subtitle1" 
                noWrap 
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                CPT Michael Rodriguez
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                noWrap
                sx={{ 
                  fontSize: '0.75rem',
                  letterSpacing: '0.01em',
                }}
              >
                B Co, 2-87 IN BN
              </Typography>
            </Box>
          )}
          
          <Box sx={{ flexGrow: 1 }} />
          
{collapsed ? (
  <IconButton 
    onClick={handleToggleCollapse} 
    size="small"
    sx={{
      position: 'absolute',
      right: '-12px',
      top: '16px',
      zIndex: 1200,
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 0,
      width: 24,
      height: 24,
      '&:hover': {
        bgcolor: theme.palette.primary.dark,
      },
    }}
  >
    <ChevronRightIcon fontSize="small" />
  </IconButton>
) : (
  <IconButton 
    onClick={handleToggleCollapse} 
    size="small"
    sx={{
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 0,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    }}
  >
    <ChevronLeftIcon />
  </IconButton>
)}
        </Stack>
        
        {!collapsed && (
          <Stack 
            direction="row" 
            spacing={1}
            alignItems="center"
            sx={{ pl: 0.5, mb: 1 }}
          >
            <StatusIcon 
              sx={{ 
                fontSize: 10, 
                color: systemStatus.connectionStatus === 'connected'
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }} 
            />
            <Typography 
              variant="caption" 
              sx={{ 
                letterSpacing: '0.025em', 
                fontWeight: 500,
                textTransform: 'uppercase', 
                fontSize: '0.7rem',
              }}
            >
              {systemStatus.connectionStatus === 'connected' ? 'CONNECTED' : 'OFFLINE'}
            </Typography>
          </Stack>
        )}
      </Box>
      
      {/* Navigation Items */}
      <Box sx={{ overflow: 'auto', flex: 1, px: 1 }}>
        {/* Main Navigation */}
        <List component="nav" sx={{ p: 1 }}>
          {mainNavItems.map(renderNavItem)}
        </List>
        
        <Divider 
          sx={{ 
            my: 1, 
            borderColor: theme.palette.divider,
            opacity: 0.8,
          }} 
        />
        
        {/* Admin Navigation */}
        <List component="nav" sx={{ p: 1 }}>
          {adminNavItems.map(renderNavItem)}
        </List>
      </Box>
      
      {/* Quick Actions */}
      <Box 
        sx={{ 
          p: collapsed ? 1 : 2,
          pt: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {!collapsed ? (
          <>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<QrCodeIcon />}
              onClick={() => navigate('/defense/dashboard')}
              sx={{ 
                mb: 1, 
                textTransform: 'none',
                borderRadius: 0,
                fontWeight: 500,
                letterSpacing: '0.02em',
                boxShadow: theme.shadows[1],
              }}
            >
              Scan QR Code
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SwapHorizIcon />}
              onClick={() => navigate('/defense/transfers')}
              sx={{ 
                mb: 1, 
                color: theme.palette.text.primary,
                borderColor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.primary.main, 0.5)
                  : alpha(theme.palette.primary.main, 0.5),
                borderRadius: 0,
                textTransform: 'none',
                fontWeight: 500,
                letterSpacing: '0.02em',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              Create Transfer
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ReportIcon />}
              onClick={() => navigate('/defense/reports')}
              sx={{ 
                mb: 1,
                color: theme.palette.text.primary,
                borderColor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.primary.main, 0.5)
                  : alpha(theme.palette.primary.main, 0.5),
                borderRadius: 0,
                textTransform: 'none',
                fontWeight: 500,
                letterSpacing: '0.02em',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              Generate Report
            </Button>
          </>
        ) : (
          <Stack direction="column" spacing={1} alignItems="center">
            <IconButton
              color="primary"
              onClick={() => navigate('/defense/dashboard')}
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
                color: theme.palette.common.white,
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <QrCodeIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate('/defense/transfers')}
              sx={{ 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                color: theme.palette.text.primary,
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <SwapHorizIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate('/defense/reports')}
              sx={{ 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                color: theme.palette.text.primary,
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <ReportIcon />
            </IconButton>
          </Stack>
        )}
      </Box>
      
      {/* System Status Footer */}
      <Box 
        sx={{ 
          p: 1.5, 
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(
            theme.palette.background.default, 
            theme.palette.mode === 'dark' ? 0.5 : 0.8
          ),
        }}
      >
        {!collapsed ? (
          <>
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  fontWeight: 500, 
                  letterSpacing: '0.02em',
                  fontSize: '0.675rem',
                }}
              >
                Last Sync:
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontFamily: '"JetBrains Mono", "SF Mono", monospace',
                  fontSize: '0.675rem',
                  color: alpha(theme.palette.text.primary, 0.8),
                }}
              >
                {systemStatus.lastSync}
              </Typography>
            </Stack>
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
            >
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: '0.675rem' }}
              >
                Version:
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '0.675rem',
                  color: alpha(theme.palette.text.primary, 0.7),
                }}
              >
                {systemStatus.version.split(' ')[0]}
                <Typography 
                  component="span" 
                  variant="caption" 
                  color="primary"
                  sx={{ 
                    fontSize: '0.675rem', 
                    fontWeight: 600,
                    ml: 0.5,
                  }}
                >
                  {systemStatus.version.split(' ')[1]} {systemStatus.version.split(' ')[2]}
                </Typography>
              </Typography>
            </Stack>
            
            {/* Logout Button */}
            <Button
              variant="text"
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
                mt: 1,
                color: theme.palette.text.secondary,
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '0.75rem',
                px: 0.5,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.main,
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block',
                textAlign: 'center',
                color: theme.palette.text.secondary,
                fontSize: '0.675rem',
                mb: 1
              }}
            >
              v{systemStatus.version.split(' ')[2]}
            </Typography>
            
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{ 
                color: theme.palette.text.secondary,
                width: '100%',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  color: theme.palette.primary.main,
                },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default EnhancedSidebar;

// Helper Button component for TypeScript support
const Button: React.FC<any> = ({ 
  children, 
  variant = 'text',
  color = 'inherit',
  fullWidth = false,
  startIcon = null,
  onClick = () => {},
  sx = {} 
}) => {
  const theme = useTheme();

  // Base styles based on variant
  let baseStyles = {};
  if (variant === 'contained') {
    baseStyles = {
      backgroundColor: color === 'primary' ? theme.palette.primary.main : 'inherit',
      color: color === 'primary' ? theme.palette.primary.contrastText : theme.palette.text.primary,
      '&:hover': {
        backgroundColor: color === 'primary' ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.08),
      }
    };
  } else if (variant === 'outlined') {
    baseStyles = {
      border: `1px solid ${color === 'primary' ? theme.palette.primary.main : theme.palette.divider}`,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      }
    };
  }

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: startIcon ? 'flex-start' : 'center',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 0,
        cursor: 'pointer',
        fontSize: '0.875rem',
        backgroundColor: 'transparent',
        color: 'inherit',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s',
        ...baseStyles,
        ...sx
      }}
    >
      {startIcon && (
        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
          {startIcon}
        </Box>
      )}
      {children}
    </Box>
  );
};
