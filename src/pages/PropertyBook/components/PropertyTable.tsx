import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  IconButton,
  Box,
  Tooltip,
  Typography,
  useTheme,
  Chip,
  alpha,
} from '@mui/material';
import {
  Info as InfoIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { PropertyItem } from '../types';
import { usePropertyBook } from '../context/PropertyBookContext';
import { StatusChip } from '../../../components/common';

interface PropertyTableProps {
  disablePaper?: boolean;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({ disablePaper = false }) => {
  const theme = useTheme();
  const { 
    filteredItems,
    selectedItems,
    toggleItemSelection,
    selectAllItems,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalItems,
    openItemDetails,
  } = usePropertyBook();

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle selection
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectAllItems(event.target.checked);
  };

  const handleSelectItem = (id: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleItemSelection(id);
  };

  // Handle row click
  const handleRowClick = (id: string) => () => {
    openItemDetails(id);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get displayed items based on pagination
  const displayedItems = filteredItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Calculate if all displayed items are selected
  const isAllSelected = displayedItems.length > 0 && displayedItems.every(item => 
    selectedItems.includes(item.id)
  );

  // Calculate if some but not all items are selected
  const isSomeSelected = displayedItems.some(item => 
    selectedItems.includes(item.id)
  ) && !isAllSelected;

  return (
    <>
      <TableContainer component={disablePaper ? 'div' : Paper} sx={{ ...(disablePaper ? {} : { borderRadius: 0, mb: 2 }) }}>
        <Table size="small" sx={{ '& .MuiTableCell-root': { py: 1.5 } }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isSomeSelected}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  inputProps={{ 'aria-label': 'select all items' }}
                />
              </TableCell>
              <TableCell>NSN/LIN</TableCell>
              <TableCell>Nomenclature</TableCell>
              <TableCell align="center">Qty Auth/OH</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <TableRow 
                  key={item.id}
                  selected={selectedItems.includes(item.id)}
                  hover
                  onClick={handleRowClick(item.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onClick={handleSelectItem(item.id)}
                      inputProps={{ 'aria-labelledby': `item-${item.id}` }}
                    />
                  </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: '0.75rem' }}>
                    {item.nsn}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                    {item.lin}
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 180 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {item.nomenclature}
                  </Typography>
                  {item.isSensitive && (
                    <Chip 
                      label="SENSITIVE"
                      size="small"
                      color="error"
                      sx={{ 
                        height: 16, 
                        fontSize: '0.65rem',
                        mt: 0.5
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>
                  <Typography variant="body2">
                    {item.qtyAuth}/{item.qtyOnHand}
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 120, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {item.serialNumber}
                </TableCell>
                  <TableCell sx={{ minWidth: 110 }}>{item.location}</TableCell>
                <TableCell sx={{ minWidth: 90, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {formatCurrency(item.value)}
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                  <StatusChip 
                    label={item.status} 
                    status={item.status.toLowerCase()}
                  />
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          openItemDetails(item.id);
                        }}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No property items found matching the current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
};

export default PropertyTable;
