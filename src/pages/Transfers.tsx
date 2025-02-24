import React from 'react';
import { Box, Typography } from '@mui/material';

const Transfers: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transfers
      </Typography>
      <Typography variant="body1">
        Manage property transfers and hand receipts between units and individuals
      </Typography>
    </Box>
  );
};

export default Transfers; 