import React from 'react';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';

interface CircularProgressWithLabelProps {
  value: number;
  size?: number;
  thickness?: number;
  fontSize?: string | number;
  fontWeight?: number;
  showPercent?: boolean;
  label?: React.ReactNode;
  labelPosition?: 'inside' | 'bottom';
}

/**
 * Circular progress indicator with centered label.
 * Used in Defense Industrial Modern Design status cards.
 */
export const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
  size = 120,
  thickness = 6,
  fontSize = 'h4',
  fontWeight = 700,
  showPercent = true,
  label,
  labelPosition = 'inside'
}) => {
  const theme = useTheme();
  
  // Determine color based on value
  const getColor = (value: number): string => {
    if (value >= 90) return theme.palette.success.main;
    if (value >= 70) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Calculate display value (never exceed 100)
  const displayValue = Math.min(Math.max(0, value), 100);
  
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {/* Background circle */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={thickness}
          sx={{ 
            color: theme.palette.mode === 'light'
              ? 'rgba(0, 0, 0, 0.05)' 
              : 'rgba(255, 255, 255, 0.05)',
            // Add technical grid marks around the circle
            '&:before': {
              content: '""',
              position: 'absolute',
              top: -4,
              left: '50%',
              height: 8,
              width: 1,
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.15)' 
                : 'rgba(255, 255, 255, 0.15)',
              transform: 'translateX(-50%)',
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: '50%',
              height: 8,
              width: 1,
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.15)' 
                : 'rgba(255, 255, 255, 0.15)',
              transform: 'translateX(-50%)',
            }
          }}
        />
        
        {/* Actual progress */}
        <CircularProgress
          variant="determinate"
          value={displayValue}
          size={size}
          thickness={thickness}
          sx={{ 
            color: getColor(displayValue),
            position: 'absolute',
            left: 0,
            // Technical industrial styling
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'butt', // Square line cap for technical look
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }
          }}
        />
        
        {/* Measurement markers - create dots around the circle for a technical look */}
        {[0, 25, 50, 75].map((marker) => {
          const angle = (marker / 100) * 360;
          const radians = (angle - 90) * (Math.PI / 180);
          const markerSize = 3;
          const radius = size / 2;
          
          // Calculate position
          const x = radius + (radius - thickness) * Math.cos(radians);
          const y = radius + (radius - thickness) * Math.sin(radians);
          
          return (
            <Box
              key={marker}
              sx={{
                position: 'absolute',
                top: y - markerSize / 2,
                left: x - markerSize / 2,
                width: markerSize,
                height: markerSize,
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.3)' 
                  : 'rgba(255, 255, 255, 0.3)',
                borderRadius: 0, // Square markers for technical look
              }}
            />
          );
        })}
        
        {labelPosition === 'inside' && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {label || (
              <Typography
                variant={fontSize as any}
                component="div"
                sx={{ fontWeight, letterSpacing: '0.025em' }}
              >
                {`${Math.round(displayValue)}${showPercent ? '%' : ''}`}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      
      {labelPosition === 'bottom' && (
        <Typography
          variant="body2"
          component="div"
          sx={{ mt: 1, fontWeight: 500, textAlign: 'center' }}
        >
          {label || `${Math.round(displayValue)}${showPercent ? '%' : ''}`}
        </Typography>
      )}
    </Box>
  );
};

export default CircularProgressWithLabel;
