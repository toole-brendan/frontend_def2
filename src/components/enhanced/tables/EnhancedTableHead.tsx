import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  useTheme
} from '@mui/material';
import { ColumnDef } from './types';

interface EnhancedTableHeadProps<T = any> {
  columns: ColumnDef<T>[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  selectable?: boolean;
  darkHeader?: boolean;
}

/**
 * Enhanced table head component that supports sorting and row selection
 */
export const EnhancedTableHead = <T extends object>({
  columns,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
  selectable = true,
  darkHeader = false
}: EnhancedTableHeadProps<T>) => {
  const theme = useTheme();

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const headerCellStyles = darkHeader 
    ? { 
        color: 'white',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[800] 
          : theme.palette.primary.main,
        fontWeight: 700,
      }
    : {
        fontWeight: 700,
      };

  const sortLabelStyles = darkHeader
    ? {
        color: 'white',
        '&.MuiTableSortLabel-active': {
          color: 'white',
        },
        '& .MuiTableSortLabel-icon': {
          color: 'white !important',
        },
      }
    : {};

  const checkboxStyles = darkHeader
    ? {
        color: 'white',
        '&.Mui-checked': {
          color: 'white',
        },
      }
    : {};

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox" sx={headerCellStyles}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all items',
              }}
              sx={checkboxStyles}
            />
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
            sx={{
              ...headerCellStyles,
              width: column.width,
            }}
          >
            {column.sortable !== false ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
                sx={sortLabelStyles}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
