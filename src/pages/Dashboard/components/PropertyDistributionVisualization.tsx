import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  ToggleButtonGroup,
  ToggleButton,
  useTheme
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
import { PropertyDistributionVisualizationProps } from '../types';

// Mock data - in a real application, this would come from props
const equipmentData = [
  {
    category: 'Vehicles',
    '1st PLT': 20,
    '2nd PLT': 18,
    '3rd PLT': 19,
    'HQ PLT': 14,
    FMC: 58,
    PMC: 10,
    NMC: 3
  },
  {
    category: 'Weapons',
    '1st PLT': 40,
    '2nd PLT': 35,
    '3rd PLT': 42,
    'HQ PLT': 26,
    FMC: 135,
    PMC: 5,
    NMC: 3
  },
  {
    category: 'Comms',
    '1st PLT': 25,
    '2nd PLT': 22,
    '3rd PLT': 24,
    'HQ PLT': 24,
    FMC: 78,
    PMC: 12,
    NMC: 5
  },
  {
    category: 'Optics',
    '1st PLT': 18,
    '2nd PLT': 15,
    '3rd PLT': 18,
    'HQ PLT': 12,
    FMC: 55,
    PMC: 6,
    NMC: 2
  },
  {
    category: 'Field Equipment',
    '1st PLT': 55,
    '2nd PLT': 50,
    '3rd PLT': 60,
    'HQ PLT': 35,
    FMC: 175,
    PMC: 20,
    NMC: 5
  }
];

export const PropertyDistributionVisualization: React.FC<PropertyDistributionVisualizationProps> = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'platoon' | 'status' | 'location'>('platoon');
  
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'platoon' | 'status' | 'location' | null,
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };
  
  const renderBars = () => {
    if (viewMode === 'platoon') {
      return [
        <Bar key="1stPlt" dataKey="1st PLT" fill="#3f51b5" stackId="a" />,
        <Bar key="2ndPlt" dataKey="2nd PLT" fill="#4caf50" stackId="a" />,
        <Bar key="3rdPlt" dataKey="3rd PLT" fill="#ff9800" stackId="a" />,
        <Bar key="hqPlt" dataKey="HQ PLT" fill="#f44336" stackId="a" />
      ];
    } else if (viewMode === 'status') {
      return [
        <Bar key="fmc" dataKey="FMC" fill="#4caf50" stackId="a" />,
        <Bar key="pmc" dataKey="PMC" fill="#ff9800" stackId="a" />,
        <Bar key="nmc" dataKey="NMC" fill="#f44336" stackId="a" />
      ];
    } else {
      // For location view (simplified example)
      return [
        <Bar key="field" dataKey="Field" fill="#3f51b5" stackId="a" />,
        <Bar key="motorpool" dataKey="Motor Pool" fill="#4caf50" stackId="a" />,
        <Bar key="armsroom" dataKey="Arms Room" fill="#ff9800" stackId="a" />,
        <Bar key="other" dataKey="Other" fill="#f44336" stackId="a" />
      ];
    }
  };
  
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Property Distribution Visualization
        </Typography>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          size="small"
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
      
      {/* Chart */}
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={equipmentData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [`${value} items`, name]}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Legend />
            {renderBars()}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      
      {/* Info Text */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Click on a legend item to toggle its visibility in the chart. Hover over bars for detailed information.
      </Typography>
    </Paper>
  );
}; 