import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  SwapHoriz as TransferIcon,
  Assignment as IssueIcon,
  AssignmentReturn as TurnInIcon,
  Build as MaintenanceIcon,
  OpenInNew as ViewIcon,
} from '@mui/icons-material';

type TransactionType = 'all' | 'transfers' | 'issues' | 'turn-ins' | 'maintenance';

interface Transaction {
  date: string;
  type: TransactionType;
  documentNumber: string;
  items: string;
  from: string;
  to: string;
  status: 'complete' | 'pending' | 'in-progress' | 'temporary';
}

const transactions: Transaction[] = [
  {
    date: '24FEB2025',
    type: 'transfers',
    documentNumber: 'TRX-2025-087',
    items: '4x M249 SAW',
    from: 'Arms Room',
    to: 'Range Control',
    status: 'temporary',
  },
  {
    date: '23FEB2025',
    type: 'issues',
    documentNumber: 'ISU-2025-065',
    items: 'JLTV #204987JT',
    from: 'BN Supply',
    to: 'B Co Motor Pool',
    status: 'complete',
  },
  {
    date: '22FEB2025',
    type: 'maintenance',
    documentNumber: 'MNT-2025-034',
    items: 'HMMWV #HQ-237',
    from: '3rd PLT',
    to: 'BN Maintenance',
    status: 'in-progress',
  },
];

const PropertyTransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<TransactionType>('all');

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: TransactionType,
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'complete':
        return 'success';
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'info';
      case 'temporary':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'transfers':
        return <TransferIcon />;
      case 'issues':
        return <IssueIcon />;
      case 'turn-ins':
        return <TurnInIcon />;
      case 'maintenance':
        return <MaintenanceIcon />;
      default:
        return <TransferIcon />;
    }
  };

  const filteredTransactions = transactions.filter(
    (transaction) => filter === 'all' || transaction.type === filter
  );

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold">
          Property Transaction History
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          size="small"
        >
          <ToggleButton value="all">
            All Types
          </ToggleButton>
          <ToggleButton value="transfers">
            Transfers
          </ToggleButton>
          <ToggleButton value="issues">
            Issues
          </ToggleButton>
          <ToggleButton value="turn-ins">
            Turn-ins
          </ToggleButton>
          <ToggleButton value="maintenance">
            Maintenance
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Transaction</TableCell>
            <TableCell>Document #</TableCell>
            <TableCell>Item(s)</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getTransactionIcon(transaction.type)}
                  <Typography variant="body2">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Link href="#" underline="hover">
                  {transaction.documentNumber}
                </Link>
              </TableCell>
              <TableCell>{transaction.items}</TableCell>
              <TableCell>{transaction.from}</TableCell>
              <TableCell>{transaction.to}</TableCell>
              <TableCell align="center">
                <Chip
                  label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  color={getStatusColor(transaction.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="View Details">
                  <IconButton size="small">
                    <ViewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="#" underline="hover">
          View All Transactions
        </Link>
      </Box>
    </Paper>
  );
};

export default PropertyTransactionHistory; 