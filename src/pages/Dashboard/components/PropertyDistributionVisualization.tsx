import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  CircularProgress,
  Tooltip as MuiTooltip,
  alpha
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Info as InfoIcon } from '@mui/icons-material';
import { PropertyDistributionVisualizationProps } from '../types';

// Enhanced mock data including location information
const equipmentData = [
  {
    category: 'Vehicles',
    '1st PLT': 20,
    '2nd PLT': 18,
    '3rd PLT': 19,
    'HQ PLT': 14,
    FMC: 58,
    PMC: 10,
    NMC: 3,
    'Motor Pool': 52,
    'Field': 10,
    'Maintenance': 9,
    'Other': 0
  },
  {
    category: 'Weapons',
    '1st PLT': 40,
    '2nd PLT': 35,
    '3rd PLT': 42,
    'HQ PLT': 26,
    FMC: 135,
    PMC: 5,
    NMC: 3,
    'Arms Room': 128,
    'Field': 15,
    'Other': 0
  },
  {
    category: 'Comms',
    '1st PLT': 25,
    '2nd PLT': 22,
    '3rd PLT': 24,
    'HQ PLT': 24,
    FMC: 78,
    PMC: 12,
    NMC: 5,
    'Comms Room': 55,
    'Field': 20,
    'Vehicle Mounted': 15,
    'Other': 5
  },
  {
    category: 'Optics',
    '1st PLT': 18,
    '2nd PLT': 15,
    '3rd PLT': 18,
    'HQ PLT': 12,
    FMC: 55,
    PMC: 6,
    NMC: 2,
    'Arms Room': 42,
    'Field': 12,
    'Other': 9
  },
  {
    category: 'Field Equipment',
    '1st PLT': 55,
    '2nd PLT': 50,
    '3rd PLT': 60,
    'HQ PLT': 35,
    FMC: 175,
    PMC: 20,
    NMC: 5,
    'Supply Room': 140,
    'Field': 40,
    'Other': 20
  }
];

export const PropertyDistributionVisualization: React.FC<PropertyDistributionVisualizationProps> = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'platoon' | 'status' | 'location'>('platoon');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Simulate a data refresh when changing view modes
  const handleViewChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    newView: 'platoon' | 'status' | 'location' | null,
  ) => {
    if (newView !== null) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setViewMode(newView);
        setLoading(false);
      }, 500);
    }
  }, []);
  
  const handleBarClick = useCallback((data: any) => {
    setSelectedCategory(data.activeLabel);
    // In a real app, this could trigger a modal or other UI component
    console.log(`Selected category: ${data.activeLabel}`);
  }, []);
  
  const renderBars = () => {
    const barColors = {
      platoon: {
        '1st PLT': theme.palette.primary.main,
        '2nd PLT': theme.palette.success.main,
        '3rd PLT': theme.palette.warning.main,
        'HQ PLT': theme.palette.error.main
      },
      status: {
        'FMC': theme.palette.success.main,
        'PMC': theme.palette.warning.main,
        'NMC': theme.palette.error.main
      },
      location: {
        'Field': theme.palette.primary.main,
        'Motor Pool': theme.palette.success.main,
        'Arms Room': theme.palette.warning.main,
        'Comms Room': theme.palette.info.main,
        'Supply Room': theme.palette.secondary.main,
        'Maintenance': theme.palette.error.main,
        'Vehicle Mounted': theme.palette.info.dark,
        'Other': theme.palette.grey[500]
      }
    };

    if (viewMode === 'platoon') {
      return [
        <Bar key="1stPlt" dataKey="1st PLT" fill={barColors.platoon['1st PLT']} stackId="a" />,
        <Bar key="2ndPlt" dataKey="2nd PLT" fill={barColors.platoon['2nd PLT']} stackId="a" />,
        <Bar key="3rdPlt" dataKey="3rd PLT" fill={barColors.platoon['3rd PLT']} stackId="a" />,
        <Bar key="hqPlt" dataKey="HQ PLT" fill={barColors.platoon['HQ PLT']} stackId="a" />
      ];
    } else if (viewMode === 'status') {
      return [
        <Bar key="fmc" dataKey="FMC" fill={barColors.status['FMC']} stackId="a" />,
        <Bar key="pmc" dataKey="PMC" fill={barColors.status['PMC']} stackId="a" />,
        <Bar key="nmc" dataKey="NMC" fill={barColors.status['NMC']} stackId="a" />
      ];
    } else {
      // Dynamically generate bars based on available location data
      return Object.keys(barColors.location).map(location => 
        <Bar 
          key={location} 
          dataKey={location} 
          fill={barColors.location[location as keyof typeof barColors.location]} 
          stackId="a"
        />
      );
    }
  };
  
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Property Distribution Visualization
          </Typography>
          <MuiTooltip title="View equipment distribution across different dimensions. Toggle between views using the buttons to the right.">
            <InfoIcon fontSize="small" sx={{ ml: 1, color: theme.palette.text.secondary }} />
          </MuiTooltip>
        </Box>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          size="small"
          disabled={loading}
          sx={{ 
            '& .MuiToggleButton-root': {
              border: `1px solid ${theme.palette.divider}`,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }
            }
          }}
        >
          <ToggleButton value="platoon">
            <Typography variant="caption">By Platoon</Typography>
          </ToggleButton>
          <ToggleButton value="status">
            <Typography variant="caption">By Status</Typography>
          </ToggleButton>
          <ToggleButton value="location">
            <Typography variant="caption">By Location</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Chart or Loading */}
      <Box sx={{ height: 300, width: '100%', position: 'relative' }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={equipmentData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              onClick={handleBarClick}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`${value} items`, name]}
                labelFormatter={(label) => `Category: ${label}`}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  boxShadow: theme.shadows[3]
                }}
              />
              <Legend />
              {renderBars()}
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
      
      {/* Selected Category Info or Instructions */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        {selectedCategory ? 
          `Selected: ${selectedCategory} - Click another category to view details or click a legend item to toggle visibility.` :
          'Click on a bar to select a category. Click on a legend item to toggle its visibility.'}
      </Typography>
      {/* View Mode Description */}
      <Box sx={{ mt: 1, p: 1, backgroundColor: alpha(theme.palette.primary.main, 0.1), borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {viewMode === 'platoon' && 'Current View: Equipment distribution by platoon shows how assets are allocated across different units.'}
          {viewMode === 'status' && 'Current View: Equipment status shows the operational condition (FMC: Fully Mission Capable, PMC: Partially Mission Capable, NMC: Not Mission Capable).'}
          {viewMode === 'location' && 'Current View: Physical location of equipment shows where assets are currently stationed or stored.'}
        </Typography>
      </Box>
    </Paper>
  );
};
