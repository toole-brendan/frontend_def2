import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { UserTable } from './components/UserTable';
import { ActivityLogs } from './components/ActivityLogs';
import { RolesPermissions } from './components/RolesPermissions';
import { UserFilters } from './components/UserFilters';
import { User } from './types';

// Mock data for initial development
const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'John Smith',
    rank: 'SGT',
    role: 'officer',
    unit: '1st Battalion',
    email: 'john.smith@army.mil',
    status: 'Active',
    lastActive: '2024-03-15T10:30:00Z',
    blockchainHash: '0x1234...5678',
  },
  {
    id: 'USR-002',
    name: 'Sarah Johnson',
    rank: 'CPL',
    role: 'soldier',
    unit: '2nd Battalion',
    email: 'sarah.johnson@army.mil',
    status: 'Active',
    lastActive: '2024-03-14T15:45:00Z',
    blockchainHash: '0x8765...4321',
  },
  {
    id: 'USR-003',
    name: 'Michael Davis',
    rank: 'SSG',
    role: 'nco',
    unit: '3rd Battalion',
    email: 'michael.davis@army.mil',
    status: 'Active',
    lastActive: '2024-03-13T09:15:00Z',
    blockchainHash: '0xabcd...efgh',
  },
  {
    id: 'USR-004',
    name: 'Jessica Brown',
    rank: 'SFC',
    role: 'supply_sergeant',
    unit: '4th Battalion',
    email: 'jessica.brown@army.mil',
    status: 'Inactive',
    lastActive: '2024-03-12T14:20:00Z',
    blockchainHash: '0x9876...5432',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-management-tabpanel-${index}`}
      aria-labelledby={`user-management-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">
              USER MANAGEMENT
            </Typography>
            {tabValue === 0 && (
              <TextField
                placeholder="Search..."
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
            )}
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Users" />
            <Tab label="Activity Logs" />
            <Tab label="Roles & Permissions" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <UserFilters />
          <UserTable searchQuery={searchQuery} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ActivityLogs />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <RolesPermissions />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default UserManagement; 