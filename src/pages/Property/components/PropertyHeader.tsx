import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  styled,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageTitle from '../../../components/common/PageTitle';

const StatusIndicator = styled(Box)<{ status: 'success' | 'warning' | 'error' }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette[status].main,
  '& svg': {
    fontSize: '1rem',
  },
}));

interface PropertyHeaderProps {
  // Add props if needed in the future
}

const PropertyHeader: React.FC<PropertyHeaderProps> = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <PageTitle variant="h4" gutterBottom>
        Property Book - B Company, 2-87 Infantry, 10th Mountain Division
      </PageTitle>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Last PBUSE Synchronization: 25FEB2025 0730 - 
          </Typography>
          <Chip size="small" label="RECONCILED" color="success" />
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <StatusIndicator status="success">
            <CheckCircleIcon />
            <Typography variant="body2">GCSS-Army Connection</Typography>
          </StatusIndicator>
          <StatusIndicator status="success">
            <CheckCircleIcon />
            <Typography variant="body2">PBUSE Connection</Typography>
          </StatusIndicator>
          <Typography variant="body2">
            Last Data Backup: 25FEB2025 0842
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 4 }} />
    </Box>
  );
};

export default PropertyHeader; 