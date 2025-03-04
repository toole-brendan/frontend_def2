import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Stack,
  useTheme,
  Collapse,
  Grid
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  Send as SendIcon,
  Print as PrintIcon,
  CheckCircle as CheckIcon,
  FileDownload as ExportIcon
} from '@mui/icons-material';
import { cardSx, tableSx, actionButtonSx } from '../styles';
import { CardHeader, StatusChip } from '../../../components/common';

// Mock data for maintenance requests
const maintenanceRequests = [
  {
    id: 'MR-2502-43',
    equipment: 'HMMWV #HQ-237',
    description: 'Brake system fault detected during PMCS. Vehicle pulls to the right when braking.',
    priority: 'Urgent',
    dateSubmitted: '24FEB2025',
    status: 'In Progress',
    eta: '28FEB2025',
    tech: 'SPC Davis',
    details: {
      location: 'Motor Pool, Bay 3',
      submittedBy: 'SGT Thompson',
      notes: 'Parts on order. Estimated arrival in 2 days.',
      partsStatus: 'Parts ordered 25FEB2025'
    }
  },
  {
    id: 'MR-2502-39',
    equipment: 'M240B #5689',
    description: 'Feeding mechanism malfunction. Failure to feed during test fire.',
    priority: 'Routine',
    dateSubmitted: '23FEB2025',
    status: 'Awaiting Parts',
    eta: '02MAR2025',
    tech: 'SGT Adams',
    details: {
      location: 'Arms Room',
      submittedBy: 'SSG Martinez',
      notes: 'Feed pawl spring needs replacement. Waiting on parts.',
      partsStatus: 'Requisition submitted, ETA 2 March'
    }
  },
  {
    id: 'MR-2502-38',
    equipment: 'SINCGARS #2441',
    description: 'Power failure when switching to battery operation. Works on vehicle power only.',
    priority: 'High',
    dateSubmitted: '22FEB2025',
    status: 'In Progress',
    eta: '26FEB2025',
    tech: 'SPC Rivera',
    details: {
      location: 'Commo Shop',
      submittedBy: 'LT Johnson',
      notes: 'Battery adapter appears faulty. Testing with replacement.',
      partsStatus: 'No parts needed at this time'
    }
  },
  {
    id: 'MR-2502-36',
    equipment: 'JLTV #209811',
    description: 'A/C system not functioning. Blows ambient air only.',
    priority: 'Medium',
    dateSubmitted: '21FEB2025',
    status: 'Pending Approval',
    eta: 'TBD',
    tech: 'Unassigned',
    details: {
      location: 'Motor Pool, Staging Area',
      submittedBy: 'PFC Lewis',
      notes: 'Awaiting maintenance officer approval for work order.',
      partsStatus: 'Not yet determined'
    }
  },
  {
    id: 'MR-2502-32',
    equipment: 'Generator #GEN-412',
    description: 'Intermittent power output. Voltage fluctuations under load.',
    priority: 'Critical',
    dateSubmitted: '20FEB2025',
    status: 'Assigned',
    eta: '25FEB2025',
    tech: 'SSG Williams',
    details: {
      location: 'Field Maintenance Area',
      submittedBy: 'CPT Rodriguez',
      notes: 'Critical for upcoming field exercise. Prioritize repair.',
      partsStatus: 'Initial diagnosis in progress'
    }
  },
  {
    id: 'MR-2502-29',
    equipment: 'M4A1 #AR15029',
    description: 'Excessive headspace. Failed go/no-go gauge check.',
    priority: 'High',
    dateSubmitted: '19FEB2025',
    status: 'Ready for Pickup',
    eta: 'Complete',
    tech: 'SPC Garcia',
    details: {
      location: 'Arms Room',
      submittedBy: 'SGT Wilson',
      notes: 'Replaced bolt. Function check complete and satisfactory.',
      partsStatus: 'Complete'
    }
  }
];

interface MaintenanceRequestTableProps {
  category?: string;
  onViewRequest: (requestId: string) => void;
}

const MaintenanceRequestTable: React.FC<MaintenanceRequestTableProps> = ({ 
  // @ts-ignore - Unused variable intentionally kept
  category,
  onViewRequest
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, requestId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRequestId(requestId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRequestId(null);
  };

  const handleExpandRow = (requestId: string) => {
    setExpandedRow(expandedRow === requestId ? null : requestId);
  };

  const handleViewRequest = (requestId: string) => {
    onViewRequest(requestId);
    handleMenuClose();
  };

  // Actions menu for table rows
  const actionsMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => selectedRequestId && handleViewRequest(selectedRequestId)}>
        <ViewIcon fontSize="small" sx={{ mr: 1 }} />
        View Details
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <PrintIcon fontSize="small" sx={{ mr: 1 }} />
        Print Work Order
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <SendIcon fontSize="small" sx={{ mr: 1 }} />
        Forward
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <CheckIcon fontSize="small" sx={{ mr: 1 }} />
        Mark Complete
      </MenuItem>
    </Menu>
  );

  return (
    <Paper 
      sx={{ 
        ...cardSx(theme),
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&::before': {
          bottom: 0,
          left: 0,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        },
        '&::after': {
          bottom: 0,
          right: 0,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
        }
      }}
    >
      <CardHeader
        title="Maintenance Requests"
        action={
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<PrintIcon />}
              sx={actionButtonSx(theme)}
            >
              Print Work Orders
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<ExportIcon />}
              sx={actionButtonSx(theme)}
            >
              Export
            </Button>
          </Stack>
        }
      />

      <TableContainer>
        <Table sx={tableSx(theme)} size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Request #</TableCell>
              <TableCell>Equipment</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Tech</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
                <React.Fragment key={request.id}>
                  <TableRow hover>
                    <TableCell padding="checkbox">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleExpandRow(request.id)}
                      >
                        {expandedRow === request.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {request.id}
                    </TableCell>
                    <TableCell>{request.equipment}</TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {request.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={request.priority.toLowerCase()} label={request.priority} />
                    </TableCell>
                    <TableCell>{request.dateSubmitted}</TableCell>
                    <TableCell>
                      <StatusChip status={request.status.replace(/\s+/g, '')} label={request.status} />
                    </TableCell>
                    <TableCell>{request.eta}</TableCell>
                    <TableCell>{request.tech}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuOpen(event, request.id)}
                      >
                        <MoreIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={10} padding="none" sx={{ border: 0 }}>
                      <Collapse in={expandedRow === request.id} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 2, px: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)' }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                              <Typography variant="subtitle2">Location</Typography>
                              <Typography variant="body2">{request.details.location}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography variant="subtitle2">Submitted By</Typography>
                              <Typography variant="body2">{request.details.submittedBy}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2">Notes</Typography>
                              <Typography variant="body2">{request.details.notes}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2">Parts Status</Typography>
                              <Typography variant="body2">{request.details.partsStatus}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={maintenanceRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {actionsMenu}
    </Paper>
  );
};

export default MaintenanceRequestTable; 