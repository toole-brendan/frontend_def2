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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Button,
  styled,
} from '@mui/material';
import {
  SwapHoriz as TransferIcon,
  Assignment as IssueIcon,
  AssignmentReturn as TurnInIcon,
  Build as MaintenanceIcon,
  OpenInNew as ViewIcon,
} from '@mui/icons-material';

type TransactionType = 'all' | 'transfers' | 'issues' | 'turn-ins' | 'maintenance';

export interface Transaction {
  date: string;
  type: TransactionType;
  documentNumber: string;
  items: string;
  from: string;
  to: string;
  status: 'complete' | 'pending' | 'in-progress' | 'temporary';
}

interface PropertyTransactionHistoryProps {
  recentTransactions: Transaction[];
}

const TransactionList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  '& .MuiListItem-root': {
    padding: theme.spacing(1, 0),
  },
}));

const PropertyTransactionHistory: React.FC<PropertyTransactionHistoryProps> = ({
  recentTransactions
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

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

  const getTransactionIcon = (type: Transaction['type']) => {
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

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold">
          Property Transaction History
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="All Types" />
          <Tab label="Transfers" />
          <Tab label="Issues" />
        </Tabs>
      </Box>

      <TransactionList>
        {recentTransactions.map((transaction, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemIcon>
              {getTransactionIcon(transaction.type)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{transaction.date}</span>
                  <span style={{ color: 'primary.main' }}>{transaction.type}</span>
                </Typography>
              }
              secondary={transaction.items}
            />
          </ListItem>
        ))}
      </TransactionList>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          fullWidth
          variant="text"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => console.log('View all transactions')}
        >
          View All Transactions
        </Button>
      </Box>
    </Paper>
  );
};

export default PropertyTransactionHistory; 