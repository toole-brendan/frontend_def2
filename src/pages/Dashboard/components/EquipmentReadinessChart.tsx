import React from 'react';
import { Box, Card, useTheme } from '@mui/material';
import { CardHeader } from '../../../components/common';
import { IconButton } from '@mui/material';
import { MoreVertical } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer
} from 'recharts';
import { EquipmentReadinessChartProps } from '../types';

export const EquipmentReadinessChart: React.FC<EquipmentReadinessChartProps> = ({ data }) => {
  const theme = useTheme();
  
  return (
    <Card>
      <CardHeader 
        title="Equipment Readiness Trend" 
        subtitle="Operational readiness over time"
        action={<IconButton><MoreVertical size={20} /></IconButton>}
      />
      <Box sx={{ height: 300, p: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorReady" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke={theme.palette.divider} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis 
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              domain={[60, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
              formatter={(value: any) => [`${value}%`, 'Readiness']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={theme.palette.primary.main} 
              fillOpacity={1} 
              fill="url(#colorReady)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
