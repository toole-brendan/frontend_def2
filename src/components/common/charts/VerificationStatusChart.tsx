import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,  } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

export interface VerificationData {
  name: string;
  verified: number;
  pending: number;
  overdue: number;
}

interface VerificationStatusChartProps {
  data: VerificationData[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  stacked?: boolean;
}

export const VerificationStatusChart: React.FC<VerificationStatusChartProps> = ({
  data,
  title,
  height = 250,
  showLegend = true,
  showTooltip = true,
  stacked = false,
}) => {
  const theme = useTheme();
  
  // Colors for verification status
  const colors = {
    verified: theme.palette.success.main,
    pending: theme.palette.warning.main,
    overdue: theme.palette.error.main,
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
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
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Box 
              key={`tooltip-${index}`}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                my: 0.5 
              }}
            >
              <Box 
                sx={{ 
                  width: 12, 
                  height: 12, 
                  backgroundColor: entry.fill, 
                  mr: 1, 
                  borderRadius: '50%' 
                }} 
              />
              <Typography variant="body2" color="text.secondary">
                {`${entry.name}: ${entry.value}`}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height }}>
      {title && (
        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && (
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          )}
          <Bar 
            dataKey="verified" 
            name="Verified" 
            fill={colors.verified} 
            stackId={stacked ? "a" : undefined} 
          />
          <Bar 
            dataKey="pending" 
            name="Pending" 
            fill={colors.pending} 
            stackId={stacked ? "a" : undefined} 
          />
          <Bar 
            dataKey="overdue" 
            name="Overdue" 
            fill={colors.overdue} 
            stackId={stacked ? "a" : undefined} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}; 