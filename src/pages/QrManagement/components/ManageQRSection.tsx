import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  QrCode as QrCodeIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { QRCodeDetails, QRStatus } from '../types';

interface ManageQRSectionProps {
  onViewQR: (qrDetails: QRCodeDetails) => void;
}

// Mock data - replace with actual data from your backend
const mockQRCodes: QRCodeDetails[] = [
  {
    id: '1',
    itemId: '1',
    createdAt: '2024-03-15T10:00:00Z',
    status: 'ACTIVE',
    actionType: 'TRANSFER',
    metadata: {
      serialNumber: true,
      currentStatus: true,
      location: true,
      assignedUser: true,
      timestamp: true,
    },
    item: {
      id: '1',
      name: 'M4A1 Carbine',
      serialNumber: 'M4A1-2023-001',
      category: 'Weapons',
      location: 'Armory A',
      status: 'AVAILABLE',
    },
  },
  {
    id: '2',
    itemId: '2',
    createdAt: '2024-03-14T15:30:00Z',
    status: 'ACTIVE',
    actionType: 'INVENTORY',
    metadata: {
      serialNumber: true,
      currentStatus: true,
      location: true,
      assignedUser: false,
      timestamp: true,
    },
    item: {
      id: '2',
      name: 'Night Vision Goggles',
      serialNumber: 'NVG-2023-002',
      category: 'Equipment',
      location: 'Storage B',
      status: 'ASSIGNED',
      assignedUser: 'John Smith',
    },
  },
];

const getStatusColor = (status: QRStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'error';
    case 'EXPIRED':
      return 'warning';
    default:
      return 'default';
  }
};

export const ManageQRSection: React.FC<ManageQRSectionProps> = ({ onViewQR }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Action Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockQRCodes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((qr) => (
                <TableRow key={qr.id}>
                  <TableCell>
                    <Typography variant="body2">{qr.item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {qr.item.serialNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {qr.actionType.charAt(0) + qr.actionType.slice(1).toLowerCase()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={qr.status}
                      size="small"
                      color={getStatusColor(qr.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(qr.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => onViewQR(qr)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Show QR Code">
                        <IconButton size="small">
                          <QrCodeIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
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
        count={mockQRCodes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}; 