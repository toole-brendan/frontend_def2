import React from 'react';
import { Box, Stack, useTheme, alpha, Chip } from '@mui/material';
import { 
  QrCode as QrCodeIcon,
  TaskAlt as TaskAltIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { QrMetricsHeaderProps } from '../types';

/**
 * QrMetricsHeader component
 * Displays key metrics about QR codes at the top of the page
 */
const QrMetricsHeader: React.FC<QrMetricsHeaderProps> = ({ metrics }) => {
  const theme = useTheme();
  
  return (
    <Stack 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={3} 
      alignItems={{ xs: 'flex-start', md: 'center' }} 
      sx={{ mt: 2 }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 1,
          borderRadius: 1,
          background: alpha(theme.palette.success.main, 0.1),
        }}
      >
        <Chip
          icon={<QrCodeIcon />}
          label={`Active QR Codes: ${metrics.totalActive}`}
          sx={{
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.dark,
            fontWeight: 500,
            '& .MuiChip-icon': {
              color: theme.palette.success.main,
            }
          }}
        />
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 1,
          borderRadius: 1,
          background: alpha(theme.palette.info.main, 0.1),
        }}
      >
        <Chip
          icon={<TaskAltIcon />}
          label={`Unassigned QR Codes: ${metrics.unassigned}`}
          sx={{
            backgroundColor: alpha(theme.palette.info.main, 0.1),
            color: theme.palette.info.dark,
            fontWeight: 500,
            '& .MuiChip-icon': {
              color: theme.palette.info.main,
            }
          }}
        />
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 1,
          borderRadius: 1,
          background: alpha(theme.palette.warning.main, 0.1),
        }}
      >
        <Chip
          icon={<WarningIcon />}
          label={`Damaged QR Codes: ${metrics.damaged}`}
          sx={{
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            color: theme.palette.warning.dark,
            fontWeight: 500,
            '& .MuiChip-icon': {
              color: theme.palette.warning.main,
            }
          }}
        />
      </Box>
    </Stack>
  );
};

export default QrMetricsHeader; 