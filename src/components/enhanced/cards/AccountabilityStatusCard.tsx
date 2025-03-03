import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  Stack, 
  useTheme, 
  SxProps, 
  Theme,
  Divider
} from '@mui/material';
import { StatusCard } from './StatusCard';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';

interface CategoryData {
  name: string;
  count: string;
  percentage: number;
  status: 'operational' | 'warning' | 'critical' | 'inactive';
  note?: string;
}

interface LastInventoryData {
  [key: string]: string;
}

interface AccountabilityStatusCardProps {
  overall?: number;
  categories?: CategoryData[];
  lastInventory?: LastInventoryData;
  title?: string;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Accountability Status Card component with Defense Industrial Modern Design styling.
 * Displays overall accountability percentage and details by category.
 */
export const AccountabilityStatusCard: React.FC<AccountabilityStatusCardProps> = ({
  overall = 99.4,
  categories = [
    { name: 'Weapons Systems', count: '143/143', percentage: 100, status: 'operational' },
    { name: 'Communications', count: '95/95', percentage: 100, status: 'operational' },
    { name: 'Vehicles', count: '71/72', percentage: 98.6, status: 'warning', note: '1 at maintenance' },
    { name: 'Optics/NVGs', count: '63/63', percentage: 100, status: 'operational' }
  ],
  lastInventory = {
    'Weapons': '23FEB2025',
    'Communications': '20FEB2025',
    'Vehicles': '22FEB2025',
    'Optics': '23FEB2025'
  },
  title = "Accountability Status",
  action,
  sx
}) => {
  const theme = useTheme();

  // Helper function to get status color
  const getStatusColor = (status: CategoryData['status']): string => {
    switch (status) {
      case 'operational':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'critical':
        return theme.palette.error.main;
      case 'inactive':
        return theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(0, 0, 0, 0.3)';
      default:
        return theme.palette.info.main;
    }
  };

  return (
    <StatusCard 
      title={title}
      action={action}
      withPattern={true}
      sx={sx}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 2
        }}
      >
        <CircularProgressWithLabel 
          value={overall} 
          size={120}
          thickness={6}
        />
      </Box>
      
      <Divider sx={{ 
        my: 2, 
        opacity: 0.6,
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          height: 6,
          width: 1,
          top: -2,
          backgroundColor: theme.palette.divider,
        },
        '&::before': {
          left: 0,
        },
        '&::after': {
          right: 0,
        }
      }} />
      
      <Stack spacing={1.5} sx={{ mt: 2 }}>
        {categories.map((category) => (
          <Box key={category.name}>
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              <Typography 
                variant="body2" 
                fontWeight={500}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    backgroundColor: getStatusColor(category.status),
                    mr: 1,
                    borderRadius: 0, // Square for technical look
                  }
                }}
              >
                {category.name}
              </Typography>
              <Typography 
                variant="body2" 
                fontWeight={600}
                sx={{ 
                  color: getStatusColor(category.status),
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {category.count}
                {category.note && (
                  <Typography 
                    component="span" 
                    variant="caption" 
                    sx={{ ml: 1, color: 'text.secondary' }}
                  >
                    ({category.note})
                  </Typography>
                )}
              </Typography>
            </Stack>
            
            <Box sx={{ position: 'relative' }}>
              <LinearProgress 
                variant="determinate" 
                value={category.percentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 0, // Square for technical look
                  backgroundColor: theme.palette.mode === 'light' 
                    ? 'rgba(0,0,0,0.05)' 
                    : 'rgba(255,255,255,0.05)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getStatusColor(category.status),
                    borderRadius: 0, // Square for technical look
                    transition: 'transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)'
                  }
                }}
              />
              
              {/* Add measurement tick marks */}
              {[0, 25, 50, 75, 100].map(mark => (
                <Box
                  key={mark}
                  sx={{
                    position: 'absolute',
                    left: `${mark}%`,
                    top: -2,
                    height: 4,
                    width: 1,
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(0,0,0,0.2)'
                      : 'rgba(255,255,255,0.2)',
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
            </Box>
            
            <Typography 
              variant="caption" 
              color="text.secondary"
              fontFamily="'JetBrains Mono', monospace"
              sx={{ 
                display: 'block', 
                mt: 0.5,
                fontSize: '0.65rem',
                letterSpacing: 0,
              }}
            >
              Last Inventory: {lastInventory[category.name.split('/')[0]]}
            </Typography>
          </Box>
        ))}
      </Stack>
    </StatusCard>
  );
};

export default AccountabilityStatusCard;
