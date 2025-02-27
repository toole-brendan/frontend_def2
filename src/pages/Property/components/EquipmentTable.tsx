import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  Box,
  Typography,
  styled,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LinkIcon from '@mui/icons-material/Link';
import { PropertyItem } from '../../../types/property';
import { EquipmentFilters } from './EquipmentSearchFilter';

interface EquipmentTableProps {
  equipmentList: PropertyItem[];
  filters: EquipmentFilters;
  onSelectItem: (item: PropertyItem) => void;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'FMC':
    case 'Serviceable':
      return 'success';
    case 'NMCS':
    case 'Limited':
      return 'warning';
    case 'NMCM':
    case 'Unserviceable':
      return 'error';
    default:
      return 'default';
  }
};

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipmentList, filters, onSelectItem }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter equipment list based on filters
  const filteredEquipment = equipmentList.filter(item => {
    // Search query filter
    if (filters.searchQuery && !item.nomenclature.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !item.nsn.includes(filters.searchQuery) &&
        !item.serialNumber.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !item.lin.includes(filters.searchQuery)) {
      return false;
    }

    // Category filter
    if (filters.category !== 'ALL' && item.category !== filters.category) {
      return false;
    }

    // Other filters would be implemented here based on the actual data structure
    // This is a simplified implementation

    return true;
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredEquipment.map(item => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
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

  const handleRowClick = (item: PropertyItem) => {
    onSelectItem(item);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredEquipment.length) : 0;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Equipment Table (Hand Receipt View)
      </Typography>
      <Paper variant="outlined">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredEquipment.length}
                    checked={filteredEquipment.length > 0 && selected.length === filteredEquipment.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>NSN/LIN</TableCell>
                <TableCell>Nomenclature</TableCell>
                <TableCell>Serial</TableCell>
                <TableCell align="center">UI</TableCell>
                <TableCell align="center">Auth</TableCell>
                <TableCell align="center">OH</TableCell>
                <TableCell>Hand Receipt</TableCell>
                <TableCell>Sub-HR</TableCell>
                <TableCell>Last Verified</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipment
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isItemSelected = isSelected(item.id);

                  return (
                    <StyledTableRow
                      hover
                      onClick={() => handleRowClick(item)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(event, item.id);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {item.nsn}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.lin}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.nomenclature}</TableCell>
                      <TableCell>{item.serialNumber}</TableCell>
                      <TableCell align="center">EA</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell>
                        {item.subHandReceipt === '1PLT' ? '1LT Morgan' :
                         item.subHandReceipt === '2PLT' ? '1LT Chen' :
                         item.subHandReceipt === '3PLT' ? '1LT Williams' :
                         item.subHandReceipt === 'HQ PLT' ? '1LT Jackson' : 'CPT Rodriguez'}
                      </TableCell>
                      <TableCell>
                        {/* This would be dynamically populated based on actual data */}
                        {item.subHandReceipt === '1PLT' ? 'SSG Adams' :
                         item.subHandReceipt === '2PLT' ? 'SSG Brown' :
                         item.subHandReceipt === '3PLT' ? 'SSG Miller' :
                         item.subHandReceipt === 'HQ PLT' ? 'SSG Rivera' : 'N/A'}
                      </TableCell>
                      <TableCell>{item.lastInventory}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          color={getStatusColor(item.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={(e) => {
                              e.stopPropagation();
                              onSelectItem(item);
                            }}>
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Maintenance Log">
                            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                              <BuildIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Transfer">
                            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                              <SwapHorizIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Blockchain Record">
                            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                              <LinkIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEquipment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EquipmentTable; 