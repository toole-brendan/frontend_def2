import React from 'react';
  // @ts-ignore - Unused variable intentionally kept
import { Box, Typography, Button, Card, CardContent, Avatar, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ActionCardProps } from '../../../types/sensitiveItems';

/**
 * ActionCard component with styled UI for action buttons
 */
const ActionCard: React.FC<ActionCardProps> = ({ 
  icon, 
  title, 
  subtitle, 
  buttonText, 
  color, 
  onClick
}) => {
  
  
  return (
    <Card sx={{ 
      mb: 2, 
      bgcolor: 'background.paper',
      borderRadius: 0,
      borderLeft: `3px solid ${color}`,
      border: '1px solid rgba(140, 140, 160, 0.12)'
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', mb: 1.5 }}>
          <Avatar 
            sx={{ 
              bgcolor: alpha(color, 0.15),
              color: color,
              width: 32,
              height: 32,
              mr: 1.5,
              borderRadius: 0
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="subtitle1" sx={{ pt: 0.5 }}>{title}</Typography>
        </Box>
        
        <Typography variant="h5" fontWeight="500" color={color} sx={{ my: 1.5 }}>
          {subtitle}
        </Typography>
        
        <Button 
          variant="contained" 
          fullWidth 
          onClick={onClick}
          sx={{ 
            bgcolor: color, 
            '&:hover': { bgcolor: color, filter: 'brightness(0.9)' },
            borderRadius: 0
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
