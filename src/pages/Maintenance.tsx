import React from 'react';
import { Box, Typography } from '@mui/material';

const Maintenance: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Maintenance
      </Typography>
      <Typography variant="body1">
        Track maintenance schedules and repair status for military equipment
      </Typography>
    </Box>
  );
};

export default Maintenance; 