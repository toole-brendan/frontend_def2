import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Divider,
  alpha
} from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Metric } from '../types';
import { cardWithCornerSx } from '../styles';
import { titleTypographySx } from '../../../theme/patterns';

interface MetricCardProps {
  title: string;
  metrics: Record<string, Metric>;
  accentColor?: string;
}

const ReportMetricsCard: React.FC<MetricCardProps> = ({
  title,
  metrics,
  accentColor
}) => {
  const theme = useTheme();
  const accent = accentColor || theme.palette.primary.main;

  return (
    <Card sx={cardWithCornerSx(theme, accent)}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: alpha(accent, 0.05),
            borderBottom: `1px solid ${alpha(accent, 0.1)}`
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              ...titleTypographySx(theme, 'medium'),
              color: accent
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Metrics */}
        <Box sx={{ p: 2 }}>
          <Grid container spacing={3}>
            {Object.entries(metrics).map(([key, metric], index) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ 
                      display: 'block',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                      letterSpacing: '0.5px',
                      mb: 0.5
                    }}
                  >
                    {key.replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography
                      variant="h5"
                      component="div"
                      fontWeight="medium"
                      sx={{ mr: 1 }}
                    >
                      {metric.value}
                    </Typography>
                    {metric.change && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: metric.change.isPositive
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          mb: 0.5
                        }}
                      >
                        {metric.change.isPositive ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{ ml: 0.5 }}
                        >
                          {metric.change.value} ({metric.change.timeframe})
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                {index % 2 === 0 && (
                  <Divider orientation="vertical" sx={{ display: { xs: 'none', sm: 'block' } }} />
                )}
                {index < Object.entries(metrics).length - 1 && (
                  <Divider sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }} />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportMetricsCard;
