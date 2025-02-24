import React from 'react';
import { Box, Typography } from '@mui/material';

const UserManagement: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Typography variant="body1">
        Manage user accounts, roles, and permissions for property book access
      </Typography>
    </Box>
  );
};

export default UserManagement; 