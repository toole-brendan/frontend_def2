import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  useTheme, 
  SxProps, 
  Theme 
} from '@mui/material';
import { StatusCard } from './StatusCard';

interface EquipmentCategory {
  name: string;
  fmc: number; // Fully Mission Capable
  pmc: number; // Partially Mission Capable
  nmc: number; // Not Mission Capable
}

interface EquipmentStatusCardProps {
  categories?: EquipmentCategory[];
  title?: string;
  action?: React.ReactNode;
  onViewDetailClick?: () => void;
  sx?: SxProps<Theme>;
}

/**
 * Equipment Status Card component with Defense Industrial Modern Design styling.
 * Displays equipment mission capability status by category.
 */
export const EquipmentStatusCard: React.FC<EquipmentStatusCardProps> = ({
  categories = [
    { 
      name: 'Vehicles', 
      fmc: 42, // Fully Mission Capable
      pmc: 20, // Partially Mission Capable
      nmc: 10  // Not Mission Capable
    },
    { 
      name: 'Weapons', 
      fmc: 128, 
      pmc: 12, 
      nmc: 3 
    },
    { 
      name: 'Comms', 
      fmc: 80, 
      pmc: 13, 
      nmc: 2
    },
    { 
      name: 'Optics', 
      fmc: 59, 
      pmc: 3, 
      nmc: 1
    }
  ],
  title = "Equipment Status Overview",
  action,
  onViewDetailClick = () => {},
  sx
}) => {
  const theme = useTheme();

  return (
    <StatusCard 
      title={title}
      action={action}
      withPattern={true}
      sx={sx}
    >
      <Stack spacing={2}>
        {categories.map((category) => {
          const total = category.fmc + category.pmc + category.nmc;
          const fmcPercent = (category.fmc / total) * 100;
          const pmcPercent = (category.pmc / total) * 100;
          const nmcPercent = (category.nmc / total) * 100;
          
          return (
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
                  sx={{ letterSpacing: '0.015em' }}
                >
                  {category.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                  }}
                >
                  TOTAL: {total}
                </Typography>
              </Stack>
              
              {/* Technical progress bar with measurement markings */}
              <Box sx={{ position: 'relative' }}>
                {/* Background measurement grid */}
                <Box 
                  sx={{ 
                    height: 12, 
                    width: '100%',
                    position: 'relative',
                    bgcolor: theme.palette.mode === 'light' 
                      ? 'rgba(0,0,0,0.05)' 
                      : 'rgba(255,255,255,0.05)',
                    borderRadius: 0, // Square for technical look
                    overflow: 'hidden',
                    // Add measurement markings
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      backgroundImage: theme.palette.mode === 'light'
                        ? 'linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)'
                        : 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '10% 100%',
                      pointerEvents: 'none',
                    }
                  }}
                >
                  {/* Status bars */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      height: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: `${fmcPercent}%`,
                        bgcolor: theme.palette.success.main,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        // Add subtle gradient for depth
                        background: `linear-gradient(to right, ${theme.palette.success.dark}, ${theme.palette.success.main})`
                      }}
                    />
                    <Box 
                      sx={{ 
                        width: `${pmcPercent}%`,
                        bgcolor: theme.palette.warning.main,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: `linear-gradient(to right, ${theme.palette.warning.dark}, ${theme.palette.warning.main})`
                      }}
                    />
                    <Box 
                      sx={{ 
                        width: `${nmcPercent}%`,
                        bgcolor: theme.palette.error.main,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: `linear-gradient(to right, ${theme.palette.error.dark}, ${theme.palette.error.main})`
                      }}
                    />
                  </Box>
                </Box>
                
                {/* Add measurement tick marks above the bar */}
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
                        ? 'rgba(0,0,0,0.3)'
                        : 'rgba(255,255,255,0.3)',
                      transform: 'translateX(-50%)'
                    }}
                  />
                ))}
              </Box>
              
              {/* Legend */}
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ mt: 1 }}
              >
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: 0, // Square for technical look
                      bgcolor: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.dark}`
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    FMC: {category.fmc}
                  </Typography>
                </Stack>
                
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: 0, // Square for technical look
                      bgcolor: theme.palette.warning.main,
                      border: `1px solid ${theme.palette.warning.dark}`
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    PMC: {category.pmc}
                  </Typography>
                </Stack>
                
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: 0, // Square for technical look
                      bgcolor: theme.palette.error.main,
                      border: `1px solid ${theme.palette.error.dark}`
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    NMC: {category.nmc}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Stack>
      
      {/* View Details Button */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2
        }}
      >
        <Box
          component="button"
          onClick={onViewDetailClick}
          sx={{ 
            px: 1.5, 
            py: 0.5,
            bgcolor: 'transparent',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 0,
            color: theme.palette.primary.main,
            fontWeight: 500,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            cursor: 'pointer',
            transition: 'all 150ms ease',
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              color: 'white'
            },
            '&:focus': {
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
            },
            // Technical corners
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 3,
              height: 3,
              backgroundColor: theme.palette.primary.main,
            },
            '&::before': {
              top: 0,
              right: 0,
            },
            '&::after': {
              bottom: 0,
              left: 0,
            },
          }}
        >
          View Detailed Status Report
        </Box>
      </Box>
    </StatusCard>
  );
};

export default EquipmentStatusCard;
