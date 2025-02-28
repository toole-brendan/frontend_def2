import React from 'react';
import { 
  Treemap, 
  ResponsiveContainer, 
  Tooltip,
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

export interface CategoryData {
  name: string;
  size: number;
  color?: string;
  fill?: string;
  children?: CategoryData[];
}

interface CategoryDistributionChartProps {
  data: CategoryData[];
  title?: string;
  height?: number;
  showTooltip?: boolean;
}

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  data,
  title,
  height = 300,
  showTooltip = true,
}) => {
  const theme = useTheme();
  
  // Default colors based on theme
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  // Assign colors to data if not already provided
  const processedData = data.map((item, index) => ({
    ...item,
    fill: item.color || item.fill || defaultColors[index % defaultColors.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 1.5,
            border: 1,
            borderColor: 'divider',
            boxShadow: 1,
            borderRadius: 1,
            minWidth: 150,
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Quantity: ${data.size}`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, size } = props;
    const fontSize = width < 50 ? 10 : width < 100 ? 12 : 14;
    
    // Only show text if there's enough space
    if (width < 30 || height < 30) return null;
    
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height}>
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: theme.palette.getContrastText(theme.palette.primary.main),
              fontSize: `${fontSize}px`
            }}
          >
            <div style={{fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center'}}>{name}</div>
            {height > 50 && <div>{size}</div>}
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <Box sx={{ width: '100%', height }}>
      {title && (
        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={processedData}
          dataKey="size"
          stroke={theme.palette.background.paper}
          fill={theme.palette.primary.main}
          content={<CustomContent />}
        >
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
        </Treemap>
      </ResponsiveContainer>
    </Box>
  );
}; 