import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Divider,
  useTheme,
  Tooltip,
  IconButton,
  Collapse,
  Button,
  alpha
} from '@mui/material';
import { 
  CloudDone as CloudDoneIcon,
  DevicesOther as DevicesIcon,
  NotificationsActive as NotificationIcon,
  InfoOutlined as InfoIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { SystemStatusFooterProps } from '../types';

export const SystemStatusFooter: React.FC<SystemStatusFooterProps> = ({
  connectionStatus,
  lastUpdate,
  mobileAppStatus,
  systemNotice
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  // @ts-ignore - Unused variable intentionally kept
  const [systemInfo, _setSystemInfo] = useState({
    version: 'HandReceipt Defense v1.4.2',
    dataVersion: 'GCSS-Army 2025.03.1',
    uptime: '15 days, 7 hours',
    nextScheduledMaintenance: '10MAR2025'
  });
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format current time
  const formattedTime = useCallback(() => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }, [currentTime]);
  
  // Handle refresh click
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  // Status pulse animation
  // @ts-ignore - Unused variable intentionally kept
  const _pulseAnimation = {
    '@keyframes pulse': {
      '0%': {
        boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)'
      },
      '70%': {
        boxShadow: '0 0 0 5px rgba(76, 175, 80, 0)'
      },
      '100%': {
        boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)'
      }
    },
    animation: 'pulse 2s infinite'
  };
  
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mt: 2, 
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'light' 
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.background.paper, 0.2),
        backdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        overflow: 'hidden'
      }}
    >
      {/* Main Status Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 1.5,
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* Connection Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
          <Tooltip title="System is connected to GCSS-Army and syncing normally" arrow>
            <Chip 
              size="small"
              icon={<CloudDoneIcon fontSize="small" />}
              label={connectionStatus}
              clickable
              onClick={handleRefresh}
              sx={{ 
                backgroundColor: theme.palette.success.main, 
                color: '#fff',
                mr: 2,
                '&:hover': {
                  backgroundColor: theme.palette.success.dark,
                },
                transition: 'background-color 0.3s'
              }}
            />
          </Tooltip>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Updated: {lastUpdate}
            </Typography>
            <Tooltip title="Refresh connection status" arrow>
              <IconButton 
                size="small" 
                onClick={handleRefresh}
                color="primary"
                sx={{ p: 0.5 }}
              >
                <RefreshIcon 
                  fontSize="small" 
                  sx={{ 
                    animation: refreshing ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }} 
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Current Time */}
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 0, mx: { xs: 0, sm: 2 } }}>
          <Box component="span" sx={{ fontFamily: 'monospace' }}>
            {formattedTime()}
          </Box> Local
        </Typography>
        
        {/* Mobile Status */}
        <Tooltip title="Mobile app sync status" arrow>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 0,
              cursor: 'pointer',
              '&:hover': { color: theme.palette.primary.main }
            }}
          >
            <DevicesIcon fontSize="small" sx={{ mr: 1, color: theme.palette.info.main }} />
            <Typography variant="body2" color="text.secondary">
              {mobileAppStatus}
            </Typography>
          </Box>
        </Tooltip>
        
        {/* System Notice - Only show if there's a notice */}
        {systemNotice && (
          <Tooltip title="Important system notices" arrow>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, sm: 2 }, flexGrow: 0 }}>
              <Chip 
                size="small"
                icon={<NotificationIcon fontSize="small" />}
                label="NOTICE"
                sx={{ 
                  backgroundColor: alpha(theme.palette.warning.main, 0.2), 
                  color: theme.palette.warning.dark,
                  mr: 1
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {systemNotice || "No system notices at this time"}
              </Typography>
            </Box>
          </Tooltip>
        )}
        
        {/* Expand/Collapse Button */}
        <Tooltip title={expanded ? "Hide system details" : "Show system details"} arrow>
          <IconButton 
            size="small" 
            onClick={() => setExpanded(!expanded)}
            sx={{ p: 0.5, ml: 'auto' }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Expanded System Info */}
      <Collapse in={expanded}>
        <Divider />
        <Box sx={{ p: 1.5, backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                System Version
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {systemInfo.version}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Data Version
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {systemInfo.dataVersion}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                System Uptime
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {systemInfo.uptime}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Next Scheduled Maintenance
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {systemInfo.nextScheduledMaintenance}
              </Typography>
            </Box>
            
            <Box sx={{ ml: 'auto' }}>
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<InfoIcon />}
                sx={{ fontSize: '0.8rem' }}
              >
                System Status
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};
