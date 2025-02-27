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
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LinkIcon from '@mui/icons-material/Link';
import { format } from 'date-fns';
import { PropertyItem } from '../../../types/property';

interface EquipmentListTableProps {
  equipmentList: PropertyItem[];
  loading: boolean;
}

const EquipmentListTable: React.FC<EquipmentListTableProps> = ({ 
  equipmentList,
  loading
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SERVICEABLE':
      case 'OPERATIONAL':
        return 'success';
      case 'UNSERVICEABLE':
      case 'NEEDS_MAINTENANCE':
        return 'warning';
      case 'DAMAGED':
      case 'IN_REPAIR':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NSN</TableCell>
              <TableCell>Nomenclature</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Inspection</TableCell>
              <TableCell>Next Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: PropertyItem) => (
              <TableRow key={item.id}>
                <TableCell>{item.nsn}</TableCell>
                <TableCell>{item.nomenclature}</TableCell>
                <TableCell>{item.serialNumber}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    color={getStatusColor(item.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.lastInspection ? format(new Date(item.lastInspection), 'MMM dd, yyyy') : 'N/A'}</TableCell>
                <TableCell>{item.nextInspectionDue ? format(new Date(item.nextInspectionDue), 'MMM dd, yyyy') : 'N/A'}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Maintenance Log">
                      <IconButton size="small">
                        <BuildIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Transfer">
                      <IconButton size="small">
                        <SwapHorizIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Blockchain Record">
                      <IconButton size="small">
                        <LinkIcon fontSize="small" />
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
        count={equipmentList.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default EquipmentListTable; 