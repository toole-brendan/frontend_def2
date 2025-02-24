import React from 'react';
import { Box, Typography } from '@mui/material';

const MyProperty: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Property
      </Typography>
      <Typography variant="body1">
        View and manage your assigned military property and equipment
      </Typography>
    </Box>
  );
};

export default MyProperty; 