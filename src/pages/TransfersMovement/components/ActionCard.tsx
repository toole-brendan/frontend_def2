import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  alpha,
  useTheme,
} from '@mui/material';
import { ActionCardProps } from '../types';

/**
 * ActionCard component for TransfersMovement
 * 
 * A styled card with an icon, title, subtitle, and action button
 */
const ActionCard: React.FC<ActionCardProps> = ({ 
  icon, 
  title, 
  subtitle, 
  buttonText, 
  color 
}) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ 
      mb: 2, 
      bgcolor: 'background.paper',
      borderRadius: 0,
      borderLeft: `3px solid ${color}`,
      border: '1px solid rgba(140, 140, 160, 0.12)',
      boxShadow: theme.palette.mode === 'dark' 
        ? `0 0 0 1px ${alpha(color, 0.1)}, inset 0 0 0 1px ${alpha(color, 0.05)}`
        : `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 16,
        height: 16,
        borderStyle: 'solid',
        borderWidth: '0 16px 16px 0',
        borderColor: `transparent ${alpha(color, theme.palette.mode === 'dark' ? 0.3 : 0.2)} transparent transparent`,
        zIndex: 1,
      },
    }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', mb: 1.5 }}>
          <Avatar 
            sx={{ 
              bgcolor: alpha(color, 0.15),
              color: color,
              width: 32,
              height: 32,
              mr: 1.5,
              borderRadius: 0,
              border: `1px solid ${alpha(color, 0.3)}`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -1,
                right: -1,
                width: 6,
                height: 6,
                bgcolor: 'transparent',
                borderTop: `1px solid ${color}`,
                borderRight: `1px solid ${color}`,
              },
            }}
          >
            {icon}
          </Avatar>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              pt: 0.5, 
              fontWeight: 600,
              letterSpacing: '0.01em',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800],
            }}
          >
            {title}
          </Typography>
        </Box>
        
        <Typography 
          variant="h5" 
          fontWeight="500" 
          color={color} 
          sx={{ 
            my: 1.5,
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '40%',
              height: 2,
              bgcolor: alpha(color, 0.3),
            }
          }}
        >
          {subtitle}
        </Typography>
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            bgcolor: color, 
            '&:hover': { bgcolor: color, filter: 'brightness(0.9)' },
            borderRadius: 0,
            fontWeight: 'medium',
            letterSpacing: '0.03em',
            boxShadow: `0 0 0 1px ${alpha(color, 0.5)}`,
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Paper>
  );
};

export default ActionCard;
