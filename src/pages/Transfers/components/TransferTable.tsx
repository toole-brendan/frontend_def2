import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  Typography,
  TablePagination,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Transfer, TransferStatus } from '../types';

interface TransferTableProps {
  transfers: Transfer[];
  onViewDetails: (transfer: Transfer) => void;
  onConfirm: (transfer: Transfer) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const getStatusColor = (status: TransferStatus): string => {
  const statusColors = {
    PENDING: '#ff9800',
    COMPLETED: '#4caf50',
    AWAITING_APPROVAL: '#2196f3',
    REJECTED: '#f44336',
  };
  return statusColors[status];
};

const TransferTable: React.FC<TransferTableProps> = ({
  transfers,
  onViewDetails,
  onConfirm,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderMobileCard = (transfer: Transfer) => (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderLeft: `4px solid ${getStatusColor(transfer.status)}`,
      }}
      elevation={1}
    >
      <Typography variant="subtitle2" gutterBottom>
        Transfer ID: {transfer.id}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        From: {transfer.from.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        To: {transfer.to.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Date: {new Date(transfer.dateInitiated).toLocaleDateString()}
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onViewDetails(transfer)}
        >
          View Details
        </Button>
        {transfer.status === 'PENDING' && (
          <Button
            size="small"
            variant="contained"
            onClick={() => onConfirm(transfer)}
          >
            Confirm
          </Button>
        )}
      </Box>
    </Paper>
  );

  const renderDesktopTable = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transfer ID</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer.id}>
              <TableCell>{transfer.id}</TableCell>
              <TableCell>{transfer.from.name}</TableCell>
              <TableCell>{transfer.to.name}</TableCell>
              <TableCell>
                {transfer.items.length === 1
                  ? transfer.items[0].name
                  : `${transfer.items.length} items`}
              </TableCell>
              <TableCell>
                {new Date(transfer.dateInitiated).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Chip
                  label={transfer.status}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(transfer.status),
                    color: 'white',
                  }}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onViewDetails(transfer)}
                  >
                    View Details
                  </Button>
                  {transfer.status === 'PENDING' && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => onConfirm(transfer)}
                    >
                      Confirm
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      {isMobile ? (
        <Box sx={{ p: 2 }}>
          {transfers.map((transfer) => renderMobileCard(transfer))}
        </Box>
      ) : (
        renderDesktopTable()
      )}
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
};

export default TransferTable; 