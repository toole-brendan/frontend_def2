import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
  useTheme
} from '@mui/material';
;
import { DataTableProps, ColumnDef } from './types';
import { EnhancedTableHead } from './EnhancedTableHead';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';

// Helper function to get value from a row based on column definition
const getCellValue = <T extends object>(row: T, column: ColumnDef<T>): any => {
  if (column.getValue) {
    return column.getValue(row);
  }
  
  return (row as any)[column.id];
};

// Helper function for sorting
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends string | number | symbol>(
  order: 'asc' | 'desc',
  orderBy: Key,
): (
  a: { [key in Key]: any },
  b: { [key in Key]: any },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Stable sort function
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * DataTable Component
 * A reusable, configurable data table component with sorting, filtering, and pagination
 */
export const DataTable = <T extends object>({
  data,
  columns,
  title = 'Data Table',
  selectable = true,
  searchable = true,
  onSearch,
  // @ts-ignore - Unused variable intentionally kept
  searchValue,
  filterable = true,
  onFilter,
  filterComponent,
  pagination = true,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  className,
  sx = {},
  onRowClick,
  idField = 'id',
  actions = [],
  selectionActions = [],
  rowActions = [],
  defaultSortDirection = 'asc',
  defaultSortColumn,
  cellRenderers,
  loading = false,
  emptyMessage = 'No data to display',
  error,
  elevation = 0,
  dense = false,
}: DataTableProps<T>) => {
  const theme = useTheme();
  const defaultOrderBy = defaultSortColumn || (columns[0]?.id as string);
  
  // State
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultSortDirection);
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Handlers
  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => String((n as any)[idField]));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Calculate empty rows for pagination
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // Memoize sorted and paginated data
  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy as any))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, order, orderBy, page, rowsPerPage],
  );

  // Render a cell based on column definition and cell renderers
  const renderCell = (row: T, column: ColumnDef<T>, index: number) => {
    const value = getCellValue(row, column);
    
    // Use column's custom render function if provided
    if (column.renderCell) {
      return column.renderCell(value, row, index);
    }
    
    // Look for matching renderer in cellRenderers
    if (cellRenderers) {
      // Check for column specific renderer
      if (cellRenderers.custom && cellRenderers.custom[column.id]) {
        return cellRenderers.custom[column.id](value, row);
      }
      
      // Check for specific data type renderers
      if (column.id === 'status' && cellRenderers.status) {
        return cellRenderers.status(value, row);
      }
      
      if ((column.id.includes('date') || column.id.includes('Date')) && cellRenderers.date) {
        return cellRenderers.date(value, row);
      }
      
      if (column.numeric && cellRenderers.numeric) {
        return cellRenderers.numeric(value, row);
      }
      
      if (typeof value === 'boolean' && cellRenderers.boolean) {
        return cellRenderers.boolean(value, row);
      }
    }
    
    // Default rendering based on data type
    if (value === null || value === undefined) {
      return <Typography variant="body2">—</Typography>;
    }
    
    if (typeof value === 'boolean') {
      return <Typography variant="body2">{value ? 'Yes' : 'No'}</Typography>;
    }
    
    return <Typography variant="body2">{value}</Typography>;
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        ...sx
      }}
      className={className}
    >
      <Paper 
        elevation={elevation}
        sx={{ 
          width: '100%', 
          mb: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          selectionActions={selectionActions}
          actions={actions}
          searchable={searchable}
          onSearch={onSearch}
          filterable={filterable}
          onFilter={onFilter}
          filterComponent={filterComponent}
        />
        
        <TableContainer>
          {loading ? (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                p: 4 
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                color: theme.palette.error.main
              }}
            >
              <Typography>{error}</Typography>
            </Box>
          ) : data.length === 0 ? (
            <Box 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                color: theme.palette.text.secondary
              }}
            >
              <Typography>{emptyMessage}</Typography>
            </Box>
          ) : (
            <Table
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                columns={columns}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                selectable={selectable}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const id = String((row as any)[idField]);
                  const isItemSelected = isSelected(id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        if (selectable) {
                          handleClick(event, id);
                        }
                        if (onRowClick) {
                          onRowClick(row, index);
                        }
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={id}
                      selected={isItemSelected}
                      sx={{ cursor: onRowClick || selectable ? 'pointer' : 'default' }}
                    >
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      )}
                      
  // @ts-ignore - Unused variable intentionally kept
                      {columns.map((column, _columnIndex) => {
                        return (
                          <TableCell 
                            key={`${id}-${column.id}`}
                            align={column.numeric ? 'right' : 'left'}
                            padding={column.disablePadding ? 'none' : 'normal'}
                          >
                            {renderCell(row, column, index)}
                          </TableCell>
                        );
                      })}
                      
                      {rowActions.length > 0 && (
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            {rowActions
                              .filter(action => {
                                if (typeof action.visible === 'function') {
                                  return action.visible(row);
                                }
                                return action.visible !== false;
                              })
                              .map((action) => (
                                <IconButton 
                                  key={action.key}
                                  size="small" 
                                  color={action.color || 'primary'}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(row);
                                  }}
                                >
                                  {action.icon}
                                </IconButton>
                              ))}
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (rowActions.length > 0 ? 1 : 0)} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        
        {pagination && data.length > 0 && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
};
