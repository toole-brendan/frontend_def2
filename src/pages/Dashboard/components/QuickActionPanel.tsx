import React from 'react';
import { Box, Typography, Paper, Grid, Button, useTheme } from '@mui/material';
import { QuickActionPanelProps } from '../types';

export const QuickActionPanel: React.FC<QuickActionPanelProps> = ({
  actions
}) => {
  const theme = useTheme();
  
  // Helper function to handle action click
  const handleActionClick = (action: string | (() => void)) => {
    if (typeof action === 'function') {
      action();
    } else if (typeof action === 'string') {
      // Handle string actions, such as navigation
      console.log('String action:', action);
      // You might implement navigation or other string-based actions here
    }
  };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: '100%', 
        p: 2, 
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper
      }}
    >
      {/* Card Header */}
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        gutterBottom 
        color={theme.palette.text.primary}
      >
        Commander's Quick Actions
      </Typography>
      
      {/* Action Buttons Grid */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {actions.map((action, index) => (
          <Grid item xs={6} md={4} key={index}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => handleActionClick(action.action)}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '0.8rem',
                lineHeight: 1.2,
                textTransform: 'none',
                fontWeight: 'bold',
                whiteSpace: 'normal',
                bgcolor: theme.palette.mode === 'light' 
                  ? 'primary.light' 
                  : 'primary.dark',
                color: theme.palette.mode === 'light' 
                  ? 'primary.dark' 
                  : 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText'
                }
              }}
            >
              {/* Add icon placeholder - in production you would use actual icons */}
              <Box sx={{ 
                fontSize: '1.5rem', 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.2)'
              }}>
                {action.icon === 'clipboard-check' && '✓'}
                {action.icon === 'file-signature' && '📝'}
                {action.icon === 'exchange-alt' && '⇄'}
                {action.icon === 'chart-bar' && '📊'}
                {action.icon === 'exclamation-triangle' && '⚠️'}
                {action.icon === 'calendar' && '📅'}
              </Box>
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 