import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Card, 
  useTheme, 
  IconButton, 
  Menu, 
  MenuItem, 
  Tooltip, 
  CircularProgress,
  Typography,
  alpha
} from '@mui/material';
import { CardHeader } from '../../../components/common';
import { MoreVertical } from 'lucide-react';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { EquipmentReadinessChartProps } from '../types';

export const EquipmentReadinessChart: React.FC<EquipmentReadinessChartProps> = ({ data }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<'6m' | '1y'>('6m');
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMenuItemClick = (option: string) => {
    setLoading(true);
    
    // Simulate loading time for data refresh
    setTimeout(() => {
      if (option === 'refresh') {
        console.log('Refreshing data...');
      } else if (option === '6m' || option === '1y') {
        setTimeFrame(option as '6m' | '1y');
        console.log(`Changing time frame to ${option}...`);
      } else if (option === 'export') {
        console.log('Exporting data...');
      }
      setLoading(false);
    }, 800);
    
    handleMenuClose();
  };
  
  const handleChartClick = useCallback((data: any) => {
    if (data && data.activeLabel) {
      setSelectedMonth(data.activeLabel);
      console.log(`Selected month: ${data.activeLabel}`);
    }
  }, []);
  
  // Set the threshold lines for readiness targets
  const targetLine = 90; // Target readiness
  const criticalLine = 70; // Critical threshold
  
  const chartData = data.slice(timeFrame === '6m' ? data.length - 6 : 0);
  
  return (
    <Card>
      <CardHeader 
        title="Equipment Readiness Trend"
        action={
          <>
            <Tooltip 
              title="Shows operational readiness percentage over time. Target is 90% or above."
              placement="top"
            >
              <InfoIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
            </Tooltip>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertical size={20} />
            </IconButton>
          </>
        }
        subtitle={
          selectedMonth 
            ? `${selectedMonth}: ${data.find(d => d.name === selectedMonth)?.value}% Readiness Rate` 
            : "Operational readiness over time"
        }
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('refresh')}>Refresh Data</MenuItem>
        <MenuItem 
          onClick={() => handleMenuItemClick('6m')}
          selected={timeFrame === '6m'}
        >
          Last 6 Months
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuItemClick('1y')}
          selected={timeFrame === '1y'}
        >
          Full Year
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('export')}>Export Chart</MenuItem>
      </Menu>
      <Box sx={{ height: 300, p: 2, position: 'relative' }}>
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
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onClick={handleChartClick}
          >
            <defs>
              <linearGradient id="colorReady" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="areaAboveTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.15} />
                <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="areaBelowCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.15} />
                <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={theme.palette.divider} strokeDasharray="3 3" />
            {/* Reference areas for target and critical zones */}
            <ReferenceArea
              y1={targetLine}
              y2={100}
              fill="url(#areaAboveTarget)"
              fillOpacity={0.2}
            />
            <ReferenceArea
              y1={60}
              y2={criticalLine}
              fill="url(#areaBelowCritical)"
              fillOpacity={0.2}
            />
            
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
            
            {/* Reference lines for targets */}
            <ReferenceLine 
              y={targetLine} 
              label={{ 
                value: 'Target', 
                position: 'right',
                fill: theme.palette.success.main,
                fontSize: 12
              }} 
              stroke={theme.palette.success.main}
              strokeDasharray="3 3" 
            />
            <ReferenceLine 
              y={criticalLine} 
              label={{ 
                value: 'Critical', 
                position: 'right',
                fill: theme.palette.error.main,
                fontSize: 12
              }} 
              stroke={theme.palette.error.main}
              strokeDasharray="3 3" 
            />
            
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                padding: '8px 12px'
              }}
              formatter={(value: any) => [`${value}%`, 'Readiness']}
              labelStyle={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '5px' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorReady)"
              activeDot={{ r: 6, stroke: theme.palette.background.paper, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
      </Box>
      
      {/* Chart legend and help text */}
      <Box sx={{ p: 2, pt: 0, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Showing {timeFrame === '6m' ? 'last 6 months' : 'full year'} data
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Click on a point for details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: theme.palette.success.main, mr: 1 }} />
            <Typography variant="caption" color="text.secondary">Target (90%+)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: theme.palette.warning.main, mr: 1 }} />
            <Typography variant="caption" color="text.secondary">Acceptable (70-90%)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: theme.palette.error.main, mr: 1 }} />
            <Typography variant="caption" color="text.secondary">Critical (&lt;70%)</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
