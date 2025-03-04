import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { SidebarNavItemProps } from './types';

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  // @ts-ignore - Unused variable intentionally kept
  index,
  collapsed,
  isActive,
  onNavigate
}) => {
  const theme = useTheme();
  

  return (
    <ListItem 
      disablePadding 
      sx={{ 
        display: 'block',
      }}
    >
      <ListItemButton
        selected={isActive}
        onClick={() => onNavigate(item.path)}
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
                noWrap: false, // Allow text to wrap
              }}
              sx={{
                flex: '1 1 auto',
                mr: item.notificationCount ? 1 : 0,
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
                  flexShrink: 0,
                }}
              />
            )}
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarNavItem;
