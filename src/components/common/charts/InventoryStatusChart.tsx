import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

export interface InventoryStatusData {
  name: string;
  value: number;
  color?: string;
}

interface InventoryStatusChartProps {
  data: InventoryStatusData[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
}

export const InventoryStatusChart: React.FC<InventoryStatusChartProps> = ({
  data,
  title,
  height = 200,
  showLegend = true,
  showTooltip = true,
}) => {
  const theme = useTheme();
  
  // Default colors based on theme
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 1.5,
            border: 1,
            borderColor: 'divider',
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {payload[0].name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${payload[0].value} (${((payload[0].value / getTotalValue()) * 100).toFixed(1)}%)`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const getTotalValue = () => {
    return data.reduce((total, item) => total + item.value, 0);
  };

  return (
    <Box sx={{ width: '100%', height }}>
      {title && (
        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={height * 0.25}
            outerRadius={height * 0.4}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || defaultColors[index % defaultColors.length]} 
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && (
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: '10px' }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}; 