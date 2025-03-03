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
  ListItemIcon,
  LinearProgress,
  alpha,
  useTheme
} from '@mui/material';
import {
  TimerOutlined as TimerIcon,
  Assignment as InventoryIcon,
  CheckCircleOutline as CheckIcon
} from '@mui/icons-material';
import { UpcomingAccountabilityRequirementsProps, Requirement } from '../types';
import { cardWithCornerSx, sectionHeaderSx, buttonSx, linearProgressSx } from '../styles';

export const UpcomingAccountabilityRequirements: React.FC<UpcomingAccountabilityRequirementsProps> = ({
  weeklyRequirements,
  monthlyRequirements,
  quarterlyRequirements,
  onStartInventory
}) => {
  const theme = useTheme();
  
  // Helper function to render requirement item
  const renderRequirementItem = (requirement: Requirement) => {
    // Default to 0 if progress is undefined or null
    const progressValue = requirement.progress !== undefined && requirement.progress !== null 
      ? requirement.progress 
      : 0;
    
    const isDue = requirement.daysRemaining !== undefined && requirement.daysRemaining <= 3;
    
    return (
      <ListItem 
        disablePadding 
        sx={{ 
          display: 'block', 
          py: 1, 
          px: 0.5 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'medium',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {requirement.name}
          </Typography>
          <Box>
            {requirement.daysRemaining !== undefined && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDue ? theme.palette.warning.main : alpha(theme.palette.text.secondary, 0.8),
                  fontWeight: isDue ? 'bold' : 'normal',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                }}
              >
                {requirement.daysRemaining === 0 ? 'DUE TODAY' : 
                 requirement.daysRemaining < 0 ? 'OVERDUE' : 
                 `T-${requirement.daysRemaining} days`}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.7rem',
              fontFamily: 'monospace',
            }}
          >
            Due: {requirement.due}
          </Typography>
          {requirement.progress !== undefined && requirement.progress !== null && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: requirement.progress >= 75 ? theme.palette.success.main : theme.palette.warning.main,
                fontWeight: 'bold',
                fontFamily: 'monospace',
                fontSize: '0.7rem',
              }}
            >
              {requirement.progress}% Complete
            </Typography>
          )}
        </Box>
        {requirement.progress !== undefined && requirement.progress !== null && (
          <LinearProgress 
            variant="determinate" 
            value={requirement.progress} 
            sx={linearProgressSx(
              theme, 
              requirement.progress >= 75 
                ? theme.palette.success.main 
                : requirement.progress >= 50 
                  ? theme.palette.primary.main 
                  : theme.palette.warning.main
            )}
          />
        )}
      </ListItem>
    );
  };

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.success.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))}
    >
      <Box sx={{ p: 2 }}>
        {/* Card Title */}
        <Typography 
          variant="h6" 
          sx={sectionHeaderSx}
        >
          Upcoming Accountability Requirements
        </Typography>

        {/* Weekly Requirements Section */}
        {weeklyRequirements && weeklyRequirements.length > 0 && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TimerIcon fontSize="small" sx={{ mr: 1, color: theme.palette.warning.main }} />
              <Typography 
                variant="subtitle1" 
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.03em',
                }}
              >
                Weekly Requirements
              </Typography>
            </Box>
            <List disablePadding>
              {weeklyRequirements.map((req, index) => (
                <React.Fragment key={index}>
                  {renderRequirementItem(req)}
                  {index < weeklyRequirements.length - 1 && (
                    <Divider sx={{ my: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
            <Divider sx={{ my: 1.5 }} />
          </>
        )}

        {/* Monthly Requirements Section */}
        {monthlyRequirements && monthlyRequirements.length > 0 && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InventoryIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography 
                variant="subtitle1" 
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.03em',
                }}
              >
                Monthly Requirements
              </Typography>
            </Box>
            <List disablePadding>
              {monthlyRequirements.map((req, index) => (
                <React.Fragment key={index}>
                  {renderRequirementItem(req)}
                  {index < monthlyRequirements.length - 1 && (
                    <Divider sx={{ my: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
            <Divider sx={{ my: 1.5 }} />
          </>
        )}

        {/* Quarterly Requirements Section */}
        {quarterlyRequirements && quarterlyRequirements.length > 0 && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckIcon fontSize="small" sx={{ mr: 1, color: theme.palette.success.main }} />
              <Typography 
                variant="subtitle1" 
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.03em',
                }}
              >
                Quarterly Requirements
              </Typography>
            </Box>
            <List disablePadding>
              {quarterlyRequirements.map((req, index) => (
                <React.Fragment key={index}>
                  {renderRequirementItem(req)}
                  {index < quarterlyRequirements.length - 1 && (
                    <Divider sx={{ my: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </>
        )}

        {/* Start Inventory Button */}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={onStartInventory}
          sx={{ 
            mt: 2,
            ...buttonSx,
          }}
        >
          Start New Inventory
        </Button>
      </Box>
    </Paper>
  );
};
