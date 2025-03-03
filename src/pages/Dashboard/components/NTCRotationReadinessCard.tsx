import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress,
  alpha,
  useTheme
} from '@mui/material';
import { NTCRotationReadinessCardProps } from '../types';
import { cardWithCornerSx, sectionHeaderSx, buttonSx, chipSx, valueSx, linearProgressSx } from '../styles';
import { getStatusChipColor } from '../utils';

export const NTCRotationReadinessCard: React.FC<NTCRotationReadinessCardProps> = ({
  title,
  daysToDeployment,
  equipmentStatus,
  milestones,
  onViewNTCPlan
}) => {
  const theme = useTheme();

  // Helper function to get status chip color
  const renderStatusChip = (status: string) => {
    const statusColor = getStatusChipColor(status, theme);
    
    return (
      <Chip 
        label={status} 
        size="small"
        sx={chipSx(theme, statusColor)}
      />
    );
  };

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.info.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))}
    >
      <Box sx={{ p: 2 }}>
        {/* Card Title */}
        <Typography 
          variant="h6" 
          sx={sectionHeaderSx}
        >
          {title}
        </Typography>

        {/* Days to Deployment Counter */}
        <Box 
          sx={{ 
            my: 2, 
            p: 1.5, 
            bgcolor: alpha(theme.palette.warning.main, 0.08),
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{
              ...valueSx,
              color: theme.palette.warning.main
            }}
          >
            T-{daysToDeployment}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'medium',
              fontSize: '0.7rem',
            }}
          >
            Days to Deployment
          </Typography>
        </Box>

        {/* Equipment Status */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              mb: 1
            }}
          >
            Equipment Status
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography 
              variant="body2" 
              sx={{
                fontSize: '0.75rem',
                fontWeight: 'medium',
              }}
            >
              Equipment On-Hand
            </Typography>
            <Typography 
              variant="body2" 
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            >
              {equipmentStatus.currentOnHand}/{equipmentStatus.requiredItems} ({equipmentStatus.percentage}%)
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={equipmentStatus.percentage} 
            sx={linearProgressSx(theme, theme.palette.primary.main)}
          />
          
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography 
                variant="caption" 
                sx={{
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                }}
              >
                Critical Shortages:
              </Typography>
              <Typography 
                variant="caption" 
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  color: theme.palette.error.main,
                }}
              >
                {equipmentStatus.criticalShortages}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography 
                variant="caption" 
                sx={{
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                }}
              >
                Serviceability Rate:
              </Typography>
              <Typography 
                variant="caption" 
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  color: equipmentStatus.serviceability >= 90 ? theme.palette.success.main : theme.palette.warning.main,
                }}
              >
                {equipmentStatus.serviceability}%
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Milestones */}
        <Typography 
          variant="subtitle1" 
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            mb: 1
          }}
        >
          Key Milestones
        </Typography>
        
        <List disablePadding>
          {milestones.map((milestone, index) => (
            <ListItem 
              key={index}
              disablePadding
              sx={{ 
                py: 1, 
                px: 0.5,
                borderBottom: index < milestones.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none',
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontWeight: 'medium',
                        fontSize: '0.75rem',
                      }}
                    >
                      {milestone.name}
                    </Typography>
                    {renderStatusChip(milestone.status)}
                  </Box>
                }
                secondary={
                  <Typography 
                    variant="caption" 
                    component="div" 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mt: 0.5,
                    }}
                  >
                    <span style={{ 
                      color: 'text.secondary', 
                      fontFamily: 'monospace',
                      fontSize: '0.7rem'
                    }}>
                      {milestone.date}
                    </span>
                    {milestone.daysRemaining && (
                      <span style={{ 
                        color: theme.palette.warning.main,
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        fontSize: '0.7rem'
                      }}>
                        T-{milestone.daysRemaining} days
                      </span>
                    )}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* View NTC Plan Button */}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ 
            mt: 2,
            ...buttonSx
          }}
          onClick={onViewNTCPlan}
        >
          View NTC Preparation Plan
        </Button>
      </Box>
    </Paper>
  );
};
