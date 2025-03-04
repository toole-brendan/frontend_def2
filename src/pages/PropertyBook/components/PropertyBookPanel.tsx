import React from 'react';
  // @ts-ignore - Unused variable intentionally kept
import { Paper, Box, Divider, useTheme } from '@mui/material';
import FilterPanel from './FilterPanel';
import ActionsToolbar from './ActionsToolbar';
import PropertyTable from './PropertyTable';

export const PropertyBookPanel: React.FC = () => {
  

  return (
    <Paper 
      sx={{ 
        borderRadius: 0,
        overflow: 'hidden', // Ensures everything stays within the Paper boundaries
        mb: 3
      }}
    >
      {/* Search and Filters - removing its Paper wrapper */}
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <FilterPanel disablePaper />
      </Box>
      
      <Divider />
      
      {/* Actions Toolbar - integrated within the same container */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'background.paper'
      }}>
        <ActionsToolbar disableBorder />
      </Box>
      
      <Divider />
      
      {/* Property Table - removing its Paper wrapper */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <PropertyTable disablePaper />
      </Box>
    </Paper>
  );
};

export default PropertyBookPanel;
