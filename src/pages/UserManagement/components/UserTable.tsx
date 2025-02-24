import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Button,
  Typography,
  Tooltip,
  TablePagination,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Block as BlockIcon,
  Link as LinkIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { User } from '../types';
import { AddEditUserModal } from './AddEditUserModal';
import { DashboardCard } from '../../../components/common/DashboardCard';

interface UserTableProps {
  searchQuery: string;
}

// Mock data for initial development
const mockUsers: User[] = [
  {
    id: '1',
    name: 'LT Smith',
    rank: 'LT',
    role: 'officer',
    unit: '1st Battalion',
    email: 'smith@army.mil',
    status: 'Active',
    lastActive: '2024-03-15T10:30:00Z',
    blockchainHash: '0x1234...5678',
  },
  {
    id: '2',
    name: 'SGT Jones',
    rank: 'SGT',
    role: 'soldier',
    unit: '2nd Battalion',
    email: 'jones@army.mil',
    status: 'Active',
    lastActive: '2024-03-14T15:45:00Z',
    blockchainHash: '0x8765...4321',
  },
];

// Helper function to get user initials
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Helper function to get status color
const getStatusColor = (status: string): "success" | "error" | "warning" => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'error';
    default:
      return 'warning';
  }
};

export const UserTable: React.FC<UserTableProps> = ({ searchQuery }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(mockUsers.map(user => user.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDeactivate = (userId: string) => {
    // TODO: Implement user deactivation with blockchain
    console.log('Deactivating user:', userId);
  };

  const handleDeactivateSelected = () => {
    // TODO: Implement bulk deactivation with blockchain
    console.log('Deactivating selected users:', selected);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tableContent = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleAddUser}
        >
          Add New User
        </Button>
      </Box>

      {selected.length > 0 && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            {selected.length} users selected
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<BlockIcon />}
            onClick={handleDeactivateSelected}
          >
            Deactivate Selected
          </Button>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < mockUsers.length}
                  checked={selected.length === mockUsers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  selected={selected.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(user.id) !== -1}
                      onChange={() => handleSelect(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{getInitials(user.name)}</Avatar>
                      <Typography variant="body2">{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.rank}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.unit}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{format(new Date(user.lastActive), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Tooltip title="Edit User">
                        <IconButton size="small" onClick={() => handleEdit(user)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Blockchain Record">
                        <IconButton size="small">
                          <LinkIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deactivate User">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeactivate(user.id)}
                        >
                          <BlockIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
      />

      <AddEditUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={editingUser}
      />
    </>
  );

  return (
    <DashboardCard
      title="User Management"
      content={tableContent}
    />
  );
}; 