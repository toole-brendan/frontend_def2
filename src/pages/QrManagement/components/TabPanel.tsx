import React from 'react';
import { Box } from '@mui/material';
import { TabPanelProps } from '../types';

/**
 * TabPanel component for rendering tab content conditionally
 * Only renders when the current tab value matches the index
 */
const TabPanel: React.FC<TabPanelProps> = ({ 
  children, 
  value, 
  index,
  ...other 
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`qr-tabpanel-${index}`}
      aria-labelledby={`qr-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel; 