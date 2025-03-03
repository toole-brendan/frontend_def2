import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button,
  LinearProgress,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import { Timeline as MetricsIcon, ErrorOutline as NonMissionCapableIcon } from '@mui/icons-material';
import { getStatusColor } from '../utils';
import { cardWithCornerSx, sectionHeaderSx, buttonSx } from '../styles';

interface CategoryData {
  category: string;
  readinessRate: number;
  total: number;
  mission_capable: number;
}

interface ReadinessByCategoryCardProps {
  categoryData: CategoryData[];
}

export const ReadinessByCategoryCard: React.FC<ReadinessByCategoryCardProps> = ({
  categoryData
}) => {
  const theme = useTheme();

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.success.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))}
    >
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={sectionHeaderSx}
        >
          Readiness by Category
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          {categoryData.map((category, index) => {
            const statusColor = getStatusColor(category.readinessRate, theme);
            
            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 'medium',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {category.category}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        color: statusColor,
                        fontFamily: 'monospace',
                        letterSpacing: '0.05em',
                        fontSize: '0.75rem',
                      }}
                    >
                      {category.readinessRate}% Ready
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        ml: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                      }}
                    >
                      ({category.mission_capable}/{category.total})
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={category.readinessRate} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 0,
                    bgcolor: alpha(statusColor, 0.1),
                    '.MuiLinearProgress-bar': {
                      transition: 'transform 0.3s ease',
                      bgcolor: statusColor
                    }
                  }}
                />
              </Box>
            );
          })}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              startIcon={<MetricsIcon />}
              sx={buttonSx}
            >
              View Detailed Metrics
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              startIcon={<NonMissionCapableIcon />}
              sx={buttonSx}
            >
              View NMC Equipment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
