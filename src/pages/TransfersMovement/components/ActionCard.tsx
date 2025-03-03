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
import { titleTypographySx } from '../../../theme/patterns';

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
      borderRadius: 1,
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.divider}`,
      borderLeft: `3px solid ${color}`,
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start' }}>
        <Avatar 
          sx={{ 
            bgcolor: alpha(color, 0.1), 
            color: color, 
            mr: 2,
            borderRadius: 0, 
            width: 40, 
            height: 40 
          }}
        >
          {icon}
        </Avatar>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            sx={titleTypographySx(theme, 'medium')}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {subtitle}
          </Typography>
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ 
              fontSize: '0.75rem',
              textTransform: 'none',
              fontWeight: 'medium',
              borderColor: alpha(color, 0.5),
              color: color,
              '&:hover': {
                borderColor: color,
                bgcolor: alpha(color, 0.05)
              }
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActionCard;
