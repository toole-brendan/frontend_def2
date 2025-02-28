import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Chip, 
  Divider, 
  FormControl, 
  Grid, 
  IconButton, 
  InputLabel, 
  MenuItem, 
  Paper, 
  Select, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  TextField, 
  Tooltip, 
  Typography, 
  useTheme,
  alpha
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
  FileDownload as FileDownloadIcon, 
  FilterList as FilterListIcon, 
  Info as InfoIcon, 
  Sort as SortIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

type TransactionType = 'LATERAL_TRANSFER' | 'ISSUE' | 'TURN_IN' | 'MAINTENANCE';

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  documentNumber: string;
  items: {
    nomenclature: string;
    quantity: number;
  }[];
  fromParty: string;
  toParty: string;
  status: 'COMPLETE' | 'PENDING' | 'CANCELLED';
  notes?: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  onViewDetails?: (transaction: Transaction) => void;
  onExport?: (selectedTransactions: Transaction[], dateRange: [Date | null, Date | null]) => void;
}

export const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({
  transactions,
  onViewDetails,
  onExport,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
  
  // Transaction type color mapping
  const typeColors = {
    LATERAL_TRANSFER: theme.palette.info.main,
    ISSUE: theme.palette.success.main,
    TURN_IN: theme.palette.warning.main,
    MAINTENANCE: theme.palette.secondary.main,
  };
  
  // Status colors
  const statusColors = {
    COMPLETE: theme.palette.success.main,
    PENDING: theme.palette.warning.main,
    CANCELLED: theme.palette.error.main,
  };
  
  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    // Type filter
    if (selectedType && transaction.type !== selectedType) {
      return false;
    }
    
    // Date range filter
    if (dateRange[0] && new Date(transaction.date) < dateRange[0]) {
      return false;
    }
    if (dateRange[1]) {
      const endDate = new Date(dateRange[1]);
      endDate.setHours(23, 59, 59, 999); // End of day
      if (new Date(transaction.date) > endDate) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  // Pagination
  const paginatedTransactions = sortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Toggle sort order
  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Toggle row expansion
  const handleToggleExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  
  // Handle transaction selection
  const handleSelectTransaction = (transaction: Transaction) => {
    if (selectedTransactions.find(t => t.id === transaction.id)) {
      setSelectedTransactions(selectedTransactions.filter(t => t.id !== transaction.id));
    } else {
      setSelectedTransactions([...selectedTransactions, transaction]);
    }
  };
  
  // Handle export
  const handleExport = () => {
    if (onExport) {
      onExport(selectedTransactions.length > 0 ? selectedTransactions : filteredTransactions, dateRange);
    }
  };
  
  // Get color for transaction type
  const getTypeColor = (type: TransactionType) => typeColors[type];
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader 
        title="Transaction History" 
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Button 
            variant="outlined" 
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            size="small"
          >
            Export
          </Button>
        }
      />
      <Divider />
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
              <Select
                labelId="transaction-type-label"
                id="transaction-type"
                value={selectedType}
                label="Transaction Type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="LATERAL_TRANSFER">Lateral Transfer</MenuItem>
                <MenuItem value="ISSUE">Issue</MenuItem>
                <MenuItem value="TURN_IN">Turn-in</MenuItem>
                <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="From Date"
                value={dateRange[0]}
                onChange={(date) => setDateRange([date, dateRange[1]])}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="To Date"
                value={dateRange[1]}
                onChange={(date) => setDateRange([dateRange[0], date])}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Tooltip title={`Sort by Date (${sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})`}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleSortToggle}
                  startIcon={<SortIcon />}
                >
                  {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                </Button>
              </Tooltip>
              <Tooltip title="Reset Filters">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedType('');
                    setDateRange([null, null]);
                    setSortOrder('desc');
                  }}
                  startIcon={<FilterListIcon />}
                >
                  Reset
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <CardContent sx={{ p: 0 }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" width={48}></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Document #</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction) => {
                const isExpanded = expandedRow === transaction.id;
                return (
                  <React.Fragment key={transaction.id}>
                    <TableRow 
                      hover 
                      sx={{ 
                        '&:hover': { 
                          cursor: 'pointer',
                          bgcolor: alpha(theme.palette.primary.main, 0.04)
                        }
                      }}
                    >
                      <TableCell padding="checkbox">
                        <IconButton
                          size="small"
                          onClick={() => handleToggleExpand(transaction.id)}
                        >
                          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.type.replace('_', ' ')}
                          size="small"
                          sx={{
                            bgcolor: alpha(getTypeColor(transaction.type), 0.1),
                            color: getTypeColor(transaction.type),
                            fontWeight: 'medium',
                          }}
                        />
                      </TableCell>
                      <TableCell>{transaction.documentNumber}</TableCell>
                      <TableCell>{transaction.items.length} item(s)</TableCell>
                      <TableCell>{transaction.fromParty}</TableCell>
                      <TableCell>{transaction.toParty}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          size="small"
                          sx={{
                            bgcolor: alpha(statusColors[transaction.status], 0.1),
                            color: statusColors[transaction.status],
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => onViewDetails?.(transaction)}
                          >
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={9} sx={{ py: 0 }}>
                          <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Items in Transaction
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Item</TableCell>
                                  <TableCell align="center">Quantity</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {transaction.items.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{item.nomenclature}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            {transaction.notes && (
                              <Box mt={2}>
                                <Typography variant="subtitle2">Notes:</Typography>
                                <Typography variant="body2">{transaction.notes}</Typography>
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
              {paginatedTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No transactions found matching the filter criteria.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
}; 