import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ReportType } from '../types';

interface ReportChartProps {
  type: ReportType | string;
}

// Sample data for the chart
const chartData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 61 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 67 },
  { name: 'Jul', value: 70 },
];

const ReportChart: React.FC<ReportChartProps> = ({ type }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Report Activity
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar 
            dataKey="value" 
            fill={theme.palette.primary.main} 
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ReportChart; 