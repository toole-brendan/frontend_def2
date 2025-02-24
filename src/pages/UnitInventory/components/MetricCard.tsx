import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface MetricCardProps {
  title: string;
  value: number;
  color?: 'primary' | 'success' | 'warning' | 'error';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  color = 'primary',
  icon,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: alpha(theme.palette[color].main, 0.1),
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette[color].main, 0.2),
            color: theme.palette[color].main,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" color={theme.palette[color].main}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default MetricCard; 