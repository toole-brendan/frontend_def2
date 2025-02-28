import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import { SystemStatusFooterProps } from '../types';

export const SystemStatusFooter: React.FC<SystemStatusFooterProps> = ({
  connectionStatus,
  lastUpdate,
  mobileAppStatus,
  systemNotice
}) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mt: 2, 
        p: 1.5, 
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(0, 0, 0, 0.03)' 
          : 'rgba(255, 255, 255, 0.05)'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        {/* Connection Status */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip 
            size="small"
            icon={
              <Box 
                component="span" 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: 'success.main',
                  mr: 0.5
                }} 
              />
            }
            label={connectionStatus}
            sx={{ 
              backgroundColor: 'rgba(76, 175, 80, 0.1)', 
              color: 'success.dark',
              mr: 2
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {lastUpdate}
          </Typography>
        </Box>
        
        {/* Mobile Status */}
        <Typography variant="body2" color="text.secondary">
          {mobileAppStatus}
        </Typography>
        
        {/* System Notice */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip 
            size="small"
            icon={
              <Box 
                component="span" 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: 'warning.main',
                  mr: 0.5
                }} 
              />
            }
            label="NOTICE"
            sx={{ 
              backgroundColor: 'rgba(255, 152, 0, 0.1)', 
              color: 'warning.dark',
              mr: 1
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {systemNotice}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}; 