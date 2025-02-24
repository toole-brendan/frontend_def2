import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { UserTable } from './components/UserTable';
import { UserFilters } from './components/UserFilters';
import { ActivityLogs } from './components/ActivityLogs';
import { RolesPermissions } from './components/RolesPermissions';

interface UserFiltersState {
  role: string;
  status: string;
  rank: string;
}

const UserManagement: React.FC = () => {
  const [searchQuery] = useState('');
  
  const handleFiltersChange = (filters: UserFiltersState) => {
    // TODO: Apply filters to the table data
    console.log('Filters changed:', filters);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserFilters onFiltersChange={handleFiltersChange} />
        </Grid>
        <Grid item xs={12}>
          <UserTable searchQuery={searchQuery} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ActivityLogs />
        </Grid>
        <Grid item xs={12} md={4}>
          <RolesPermissions />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserManagement; 