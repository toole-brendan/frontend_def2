import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubHandReceiptStatusTable, SubHandReceiptActions } from './index';
import SubHandReceiptStructure from './SubHandReceiptStructure';

interface SubHandReceiptManagementPanelProps {
  // Add props if needed in the future
}

const SubHandReceiptManagementPanel: React.FC<SubHandReceiptManagementPanelProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          placeholder="Search by name or item..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Sub-Hand Receipt Status Table */}
      <SubHandReceiptStatusTable />
      
      {/* Sub-Hand Receipt Actions */}
      <SubHandReceiptActions />
      
      {/* Sub-Hand Receipt Structure */}
      <SubHandReceiptStructure />
    </Box>
  );
};

export default SubHandReceiptManagementPanel; 