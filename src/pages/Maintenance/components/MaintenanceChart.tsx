import React from 'react';
import { Box, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface MaintenanceMetric {
  completed: number;
  inProgress: number;
  pending: number;
  month: string;
}

interface MaintenanceChartProps {
  data?: MaintenanceMetric[];
}

const mockData: MaintenanceMetric[] = [
  { month: 'Jan', completed: 12, inProgress: 5, pending: 3 },
  { month: 'Feb', completed: 15, inProgress: 7, pending: 4 },
  { month: 'Mar', completed: 10, inProgress: 8, pending: 6 },
  { month: 'Apr', completed: 18, inProgress: 4, pending: 2 },
  { month: 'May', completed: 14, inProgress: 6, pending: 5 },
  { month: 'Jun', completed: 16, inProgress: 3, pending: 4 },
];

export const MaintenanceChart: React.FC<MaintenanceChartProps> = ({ data = mockData }) => {
  const theme = useTheme();

  const chartData = {
    months: data.map(d => d.month),
    completed: data.map(d => d.completed),
    inProgress: data.map(d => d.inProgress),
    pending: data.map(d => d.pending),
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <BarChart
        xAxis={[{
          data: chartData.months,
          scaleType: 'band',
          label: 'Months',
        }]}
        series={[
          {
            data: chartData.completed,
            label: 'Completed',
            stack: 'total',
            color: theme.palette.success.main,
          },
          {
            data: chartData.inProgress,
            label: 'In Progress',
            stack: 'total',
            color: theme.palette.warning.main,
          },
          {
            data: chartData.pending,
            label: 'Pending',
            stack: 'total',
            color: theme.palette.error.main,
          },
        ]}
        yAxis={[{
          label: 'Number of Tasks',
        }]}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'top', horizontal: 'middle' },
            padding: 8,
          },
        }}
      />
    </Box>
  );
}; 