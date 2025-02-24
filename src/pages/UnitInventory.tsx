import React from 'react';
import { Box, Typography } from '@mui/material';

const UnitInventory: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Unit Inventory
      </Typography>
      <Typography variant="body1">
        View and manage your unit's property and equipment inventory
      </Typography>
    </Box>
  );
};

export default UnitInventory; 