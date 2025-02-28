import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const UserManagement: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          User Management
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Component Under Development
          </Typography>
          <Typography variant="body1">
            The User Management module is currently being developed. This section will provide tools for managing users, roles, permissions, and unit configurations within the system.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserManagement; 