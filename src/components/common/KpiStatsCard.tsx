import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Button, 
  useTheme,
  alpha
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

interface KpiStatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string | React.ReactNode;
  trend?: boolean;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  action?: React.ReactNode;
  bgColor?: string;
  color?: string;
  borderPosition?: 'left' | 'top' | 'right' | 'bottom';
}

/**
 * A KPI Stats Card component matching the HandReceipt styling
 */
const KpiStatsCard: React.FC<KpiStatsCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  trend = false, 
  trendValue = "", 
  trendDirection = 'up',
  action, 
  bgColor = "transparent", 
  color,
  borderPosition = 'left'
}) => {
  const theme = useTheme();
  const accentColor = color || theme.palette.primary.main;
  
  // Determine border styling based on position
  const borderStyle = {
    left: { borderLeft: `3px solid ${accentColor}` },
    top: { borderTop: `3px solid ${accentColor}` },
    right: { borderRight: `3px solid ${accentColor}` },
    bottom: { borderBottom: `3px solid ${accentColor}` },
  }[borderPosition];

  return (
    <Card sx={{ 
      height: '100%',
      bgcolor: bgColor,
      ...borderStyle,
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', mb: 1.5 }}>
          <Avatar 
            sx={{ 
              bgcolor: alpha(accentColor, 0.15),
              color: accentColor,
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
        
        <Typography variant="h3" fontWeight="500" color={accentColor} sx={{ my: 1.5 }}>
          {value}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {subtitle}
        </Typography>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {/* You can add an arrow icon here based on trendDirection */}
            <Typography variant="caption" color={trendDirection === 'up' ? 'success.main' : 'error.main'}>
              {trendValue}
            </Typography>
          </Box>
        )}
        
        {action ? (
          <Box sx={{ mt: 1 }}>
            {action}
          </Box>
        ) : (
          title && (
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="text" 
                color="primary" 
                endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                sx={{ fontSize: '0.75rem', p: 0 }}
              >
                View Details
              </Button>
            </Box>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default KpiStatsCard;
