import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  Edit as EditIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';
import { ReportStatusBadge } from './';
import { ReportData, TableColumn, SortConfig } from '../types';
import { formatReportDate } from '../utils';
import { tableContainerSx } from '../styles';

interface ReportsListProps {
  reports: ReportData[];
  onViewReport: (report: ReportData) => void;
  onDownloadReport: (report: ReportData) => void;
  onEditReport: (report: ReportData) => void;
  onMoreOptions: (report: ReportData, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  onViewReport,
  onDownloadReport,
  onEditReport,
  onMoreOptions
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'createdAt',
    direction: 'desc'
  });

  const columns: TableColumn[] = [
    { id: 'title', label: 'Report Title', minWidth: 200 },
    { id: 'type', label: 'Type', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'createdAt', label: 'Created', minWidth: 120, format: (value) => formatReportDate(value) },
    { id: 'lastGenerated', label: 'Generated', minWidth: 120, format: (value) => formatReportDate(value) },
    { id: 'createdBy', label: 'Author', minWidth: 150, format: (value) => value.name },
    { id: 'actions', label: 'Actions', minWidth: 120, align: 'right' }
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (field: keyof ReportData) => {
    const isAsc = sortConfig.field === field && sortConfig.direction === 'asc';
    setSortConfig({
      field,
      direction: isAsc ? 'desc' : 'asc'
    });
  };

  // Sort the reports based on current sort configuration
  const sortedReports = React.useMemo(() => {
    const sortableReports = [...reports];
    return sortableReports.sort((a, b) => {
      const field = sortConfig.field;
      
      // Handle special fields that need comparison logic
      if (field === 'createdAt' || field === 'lastGenerated') {
        const dateA = new Date(a[field] as string).getTime();
        const dateB = new Date(b[field] as string).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // Handle createdBy field (Personnel object)
      if (field === 'createdBy') {
        const nameA = a.createdBy.name.toLowerCase();
        const nameB = b.createdBy.name.toLowerCase();
        return sortConfig.direction === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      
      // Handle regular string fields
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return sortConfig.direction === 'asc'
          ? (a[field] as string).localeCompare(b[field] as string)
          : (b[field] as string).localeCompare(a[field] as string);
      }
      
      return 0;
    });
  }, [reports, sortConfig]);

  // Paginate the data
  const paginatedReports = sortedReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={tableContainerSx(theme)}>
      <TableContainer>
        <Table stickyHeader aria-label="reports table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id !== 'actions' ? (
                    <TableSortLabel
                      active={sortConfig.field === column.id}
                      direction={sortConfig.field === column.id ? sortConfig.direction : 'asc'}
                      onClick={() => handleRequestSort(column.id as keyof ReportData)}
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
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={report.id}>
                {columns.map((column) => {
                  if (column.id === 'actions') {
                    return (
                      <TableCell key={column.id} align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => onViewReport(report)}
                              sx={{ mr: 1 }}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton
                              size="small"
                              onClick={() => onDownloadReport(report)}
                              sx={{ mr: 1 }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => onEditReport(report)}
                              sx={{ mr: 1 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="More">
                            <IconButton
                              size="small"
                              onClick={(e) => onMoreOptions(report, e)}
                            >
                              <MoreIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    );
                  } else if (column.id === 'status') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <ReportStatusBadge status={report.status} size="small" />
                      </TableCell>
                    );
                  } else {
                    const value = report[column.id as keyof ReportData];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && value !== undefined
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReportsList; 