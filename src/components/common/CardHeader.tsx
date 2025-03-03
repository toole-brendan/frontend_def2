import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { titleTypographySx } from '../../theme/patterns';

interface CardHeaderProps {
  title: string;
  subtitle?: string | React.ReactNode;
  action?: React.ReactNode;
}

/**
 * A consistent card header component matching the HandReceipt styling
 */
const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      mb: 2,
      pb: 1.5,
      borderBottom: `1px solid ${theme.palette.divider}`
    }}>
      <Box>
        <Typography 
          variant="h6" 
          component="div" 
          sx={titleTypographySx(theme, 'medium')}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" component="div" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  );
};

export default CardHeader;
