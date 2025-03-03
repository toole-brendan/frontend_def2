import React from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Button, 
  useTheme,
  alpha,
  Paper,
  Divider
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { ChevronRight } from 'lucide-react';

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
 * A KPI Stats Card component with military/industrial styling
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
  bgColor,
  color,
  borderPosition = 'left'
}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const accentColor = color || theme.palette.primary.main;
  
  // Define the clipped corner size
  const cornerSize = 16;
  
  return (
    <Card sx={{ 
      height: '100%',
      bgcolor: mode === 'dark' ? 'transparent' : bgColor || theme.palette.background.paper,
      border: `1px solid ${mode === 'dark' ? alpha(accentColor, 0.3) : alpha(accentColor, 0.2)}`,
      position: 'relative',
      boxShadow: mode === 'dark' 
        ? `0 0 0 1px ${alpha(accentColor, 0.1)}, inset 0 0 0 1px ${alpha(accentColor, 0.05)}`
        : `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
      
      // Clip the top-right corner for military style
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: `0 ${cornerSize}px ${cornerSize}px 0`,
        borderColor: `transparent ${alpha(accentColor, mode === 'dark' ? 0.8 : 0.2)} transparent transparent`,
        zIndex: 1,
      },
      
      // Removed measurement marks along the right edge
      
      overflow: 'hidden',
    }}>
      {/* Header Section with Icon and Title */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 1.5,
          pl: 2,
          pr: 2,
          bgcolor: alpha(accentColor, mode === 'dark' ? 0.15 : 0.07),
          borderBottom: `1px solid ${alpha(accentColor, mode === 'dark' ? 0.25 : 0.15)}`,
          position: 'relative',
          
          // Add small corner clips to the left side of header
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 6,
            height: 6,
            bgcolor: 'transparent',
            borderTop: `1px solid ${alpha(accentColor, 0.5)}`,
            borderLeft: `1px solid ${alpha(accentColor, 0.5)}`,
          },
          
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 6,
            height: 6,
            bgcolor: 'transparent',
            borderBottom: `1px solid ${alpha(accentColor, 0.5)}`,
            borderLeft: `1px solid ${alpha(accentColor, 0.5)}`,
          },
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
            bgcolor: alpha(accentColor, 0.2),
            color: accentColor,
            mr: 1.5,
            border: `1px solid ${alpha(accentColor, 0.3)}`,
            position: 'relative',
            
            // Add technical corner to the icon box
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -1,
              right: -1,
              width: 6,
              height: 6,
              bgcolor: 'transparent',
              borderTop: `1px solid ${accentColor}`,
              borderRight: `1px solid ${accentColor}`,
            },
          }}
        >
          {icon}
        </Box>
        
        <Typography 
          variant="subtitle2" 
          fontWeight="600"
          sx={{ 
            color: mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800],
            letterSpacing: '0.01em',
            fontSize: '0.8rem',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </Typography>
      </Box>
      
      {/* Main Content */}
      <Box 
        sx={{ 
          p: 2,
          pt: 2.5,
          pb: action ? 1.5 : 2,
          // Removed grid background pattern
        }}
      >
        {/* Value display */}
        <Typography 
          variant="h2" 
          fontWeight="600" 
          color={accentColor} 
          sx={{ 
            fontSize: '2.5rem',
            lineHeight: 1.1,
            mb: 1,
            position: 'relative',
            display: 'inline-block',
            
            // Add underlining effect
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '40%',
              height: 3,
              bgcolor: alpha(accentColor, 0.3),
            }
          }}
        >
          {value}
        </Typography>
        
        {/* Subtitle */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.75rem',
            mb: 2,
            maxWidth: '95%',
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: 4,
              height: 4,
              bgcolor: accentColor,
              mr: 1,
              opacity: 0.5,
            }
          }}
        >
          {subtitle}
        </Typography>
        
        {/* Trend indicator */}
        {trend && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1.5,
              p: 0.5,
              pl: 1,
              width: 'fit-content',
              bgcolor: alpha(
                trendDirection === 'up' ? theme.palette.success.main : theme.palette.error.main, 
                0.1
              ),
              border: `1px solid ${alpha(
                trendDirection === 'up' ? theme.palette.success.main : theme.palette.error.main,
                0.2
              )}`,
            }}
          >
            <Typography 
              variant="caption" 
              fontWeight="600"
              color={trendDirection === 'up' ? 'success.main' : 'error.main'}
            >
              {trendValue}
            </Typography>
          </Box>
        )}
        
        {/* Action */}
        {action ? (
          <Box sx={{ mt: 2 }}>
            {action}
          </Box>
        ) : (
          title && (
            <Box 
              sx={{ 
                mt: 2,
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                color: accentColor,
                fontSize: '0.75rem',
                fontWeight: 600, // Increased from 500 for better visibility
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.03em',
                '&:hover': {
                  color: theme.palette.mode === 'dark' ? alpha(accentColor, 0.85) : alpha(accentColor, 0.7),
                }
                // Removed underline effect and animation
              }}
            >
              VIEW DETAILS
              <ChevronRight size={14} style={{ marginLeft: 4 }} />
            </Box>
          )
        )}
      </Box>
    </Card>
  );
};

export default KpiStatsCard;
