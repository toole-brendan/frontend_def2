import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { SidebarFooterProps } from './types';

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  collapsed,
  systemStatus,
  handleToggleCollapse,
  handleLogout
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(
          theme.palette.background.default, 
          theme.palette.mode === 'dark' ? 0.5 : 0.8
        ),
        width: '100%',
        p: collapsed ? 1 : 1.5,
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
              {' '}
              <Typography 
                component="span" 
                variant="caption" 
                color="primary"
                sx={{ 
                  fontSize: '0.675rem', 
                  fontWeight: 600,
                }}
              >
                {systemStatus.version.split(' ').slice(1).join(' ')}
              </Typography>
            </Typography>
          </Stack>
          
          {/* Buttons Container */}
          <Box sx={{ 
            mt: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            {/* Logout Button */}
            <Button
              variant="text"
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
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
            
                        {/* Collapse Sidebar Button */}
            <Tooltip title="Collapse sidebar">
              <IconButton 
                onClick={handleToggleCollapse} 
                aria-label="Collapse sidebar"
                sx={{
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                  borderRadius: 0,
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  width: 36,
                  height: 36,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.25),
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
              mb: 0.5
            }}
          >
            v{systemStatus.version.split(' ')[2]}
          </Typography>
          
          {/* Special Expand button - given prominence in collapsed view */}
          <Box sx={{ 
            pt: 1,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Tooltip title="Expand sidebar">
              <IconButton 
                onClick={handleToggleCollapse} 
                aria-label="Expand sidebar"
                sx={{
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                  borderRadius: 0,
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                  width: 46,
                  height: 36,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Tooltip>
            
            <Box sx={{ 
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              pt: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}>
              {/* Logout Button */}
              <IconButton
                size="small"
                onClick={handleLogout}
                sx={{ 
                  color: theme.palette.text.secondary,
                  borderRadius: 0,
                  width: 36,
                  height: 36,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SidebarFooter;
