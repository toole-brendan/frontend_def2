import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import type { User } from '../types';
import { AddEditUserModal } from './AddEditUserModal';

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

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleAddUser}
        >
          Add New User
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{getInitials(user.name)}</Avatar>
                      <Typography variant="body2">{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.rank}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.unit}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(user.lastActive), 'MMM dd, yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={getStatusColor(user.status)}
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
      />

      <AddEditUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={editingUser}
      />
    </Box>
  );
}; 