import React, { useState } from 'react';
import {
  Box,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Toolbar,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridValueGetter,
  GridRenderCellParams,
  GridToolbar,
  GridRowSelectionModel,
  GridFilterModel,
  GridSortModel,
  GridValueFormatter,
  GridRowParams,
  GridEventListener,
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AssignmentTurnedIn as AssignmentIcon,
  LocalShipping as TransferIcon,
  Build as MaintenanceIcon,
  MoreVert as MoreVertIcon,
  Room as LocationIcon,
  Store as SupplyRoomIcon,
  DirectionsCar as MotorPoolIcon,
  Security as ArmsRoomIcon,
  Radio as CommsIcon,
  Person as PersonIcon,
  VerifiedUser as SensitiveIcon,
  LockOpen as UnsecuredIcon,
  ArrowDownward as ArrowDownwardIcon,
  HelpOutline as HelpOutlineIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  ViewColumn,
  FilterList,
  GridView,
  History as HistoryIcon,
  QrCode as QrCodeIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { PropertyFilters } from './FilterPanel';
import EquipmentDetailPanel from './EquipmentDetailPanel';
import BulkActionToolbar from './BulkActionToolbar';
import { alpha } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  borderRadius: '4px',
  height: '24px',
  backgroundColor: status === 'Serviceable' 
    ? theme.palette.success.dark
    : status === 'Maintenance'
    ? theme.palette.warning.dark
    : theme.palette.error.dark,
  color: theme.palette.common.white,
}));

const SensitiveItemIcon = styled(SecurityIcon)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.error.main,
  fontSize: '1rem',
  marginRight: theme.spacing(0.5),
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-main': {
    backgroundColor: theme.palette.background.paper,
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

export interface PropertyItem {
  id: string;
  lin: string;
  nsn: string;
  nomenclature: string;
  serialNumber: string;
  qtyAuth: number;
  qtyOnHand: number;
  location: string;
  handReceiptHolder: string;
  status: 'Serviceable' | 'Unserviceable' | 'Maintenance' | 'Shortage' | 'Missing';
  lastVerified: string; // ISO date string
  category: string;
  subCategory: string;
  value: number;
  isSensitive?: boolean; // Flag for sensitive items
  securityCode?: string; // Security classification code
}

interface PropertyBookTableProps {
  items: PropertyItem[];
  filters: PropertyFilters;
  loading?: boolean;
  viewMode: 'list' | 'grid';
  onSelectionChange?: (selectedIds: string[]) => void;
  onRowAction?: (action: string, item: PropertyItem) => void;
  onBulkAction?: (action: string, items: PropertyItem[]) => void;
}

interface DetailPanelProps {
  row: PropertyItem;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ row }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
        <Tab label="General Info" />
        <Tab label="Components" />
        <Tab label="History" />
        <Tab label="Documentation" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary" component="div">
                Serial Number:
              </Typography>
              <Typography component="div">{row.serialNumber || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary" component="div">
                Location:
              </Typography>
              <Typography component="div">{row.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary" component="div">
                Status:
              </Typography>
              <Typography component="div">{row.status}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary" component="div">
                Hand Receipt:
              </Typography>
              <Typography component="div">{row.handReceiptHolder}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

interface RowProps {
  item: PropertyItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onExpand: (id: string) => void;
  isExpanded: boolean;
}

const Row: React.FC<RowProps> = ({ item, isSelected, onSelect, onExpand, isExpanded }) => {
  return (
    <>
      <TableRow
        hover
        selected={isSelected}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <StyledTableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(item.id)}
            color="primary"
          />
        </StyledTableCell>
        <StyledTableCell>
          <IconButton size="small" onClick={() => onExpand(item.id)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {item.isSensitive && <SensitiveItemIcon />}
            {item.lin}
            <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
              {item.nsn}
            </Typography>
          </Box>
        </StyledTableCell>
        <StyledTableCell>{item.nomenclature}</StyledTableCell>
        <StyledTableCell>{item.category}</StyledTableCell>
        <StyledTableCell align="center">{item.qtyAuth}</StyledTableCell>
        <StyledTableCell align="center">{item.qtyOnHand}</StyledTableCell>
        <StyledTableCell>
          <StatusChip
            label={item.status}
            status={item.status}
            size="small"
          />
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell colSpan={8} sx={{ py: 0 }}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  General Info
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Serial Number:
                    </Typography>
                    <Typography>{item.serialNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Location:
                    </Typography>
                    <Typography>{item.location}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Status:
                    </Typography>
                    <StatusChip label={item.status} status={item.status} size="small" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Hand Receipt:
                    </Typography>
                    <Typography>{item.handReceiptHolder}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" size="small">
                  Print Receipt
                </Button>
                <Button variant="outlined" size="small">
                  Transfer
                </Button>
                <Button variant="outlined" size="small">
                  Update Status
                </Button>
              </Box>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

const PropertyBookTable: React.FC<PropertyBookTableProps> = ({
  items,
  filters,
  loading = false,
  viewMode = 'list',
  onSelectionChange,
  onRowAction,
  onBulkAction,
}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<PropertyItem | null>(null);
  const [detailTab, setDetailTab] = useState(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'category',
      sort: 'asc',
    }
  ]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectionChange = (newSelectionModel: GridRowSelectionModel) => {
    setSelectionModel(newSelectionModel);
    if (onSelectionChange) {
      onSelectionChange(newSelectionModel as string[]);
    }
  };

  const handleSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

  const handleRowClick = (params: GridRowParams) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(params.id as string)) {
      newExpandedRows.delete(params.id as string);
    } else {
      newExpandedRows.add(params.id as string);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, item: PropertyItem) => {
    event.stopPropagation();
    setActionMenuAnchor(event.currentTarget);
    setSelectedItem(item);
  };

  const handleActionClose = () => {
    setActionMenuAnchor(null);
    setSelectedItem(null);
  };

  const handleActionSelect = (action: string) => {
    if (selectedItem && onRowAction) {
      onRowAction(action, selectedItem);
    }
    handleActionClose();
  };

  const handleBulkAction = (action: string, items: PropertyItem[]) => {
    if (onBulkAction) {
      onBulkAction(action, items);
    }
  };

  const handleClearSelection = () => {
    setSelectionModel([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'Arms Room':
        return <ArmsRoomIcon fontSize="small" />;
      case 'Motor Pool':
        return <MotorPoolIcon fontSize="small" />;
      case 'Supply Room':
        return <SupplyRoomIcon fontSize="small" />;
      case 'Comms Room':
        return <CommsIcon fontSize="small" />;
      default:
        return <LocationIcon fontSize="small" />;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'Serviceable':
        return 'success';
      case 'Unserviceable':
        return 'error';
      case 'Maintenance':
        return 'warning';
      case 'Missing':
      case 'Shortage':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatSerialNumber = (serialNumber: string): string => {
    let formatted = serialNumber.replace(/[^a-zA-Z0-9]/g, '');
    
    if (/^(M4|M16|M240|M249|M2)/i.test(formatted)) {
      if (formatted.length > 8) {
        return `${formatted.substring(0, 6)}-${formatted.substring(6, 8)}`;
      }
    }
    
    if (formatted.length > 5 && /^[A-Z]/i.test(formatted)) {
      const match = formatted.match(/^([A-Z]+)(\d+)/i);
      if (match && match.length === 3) {
        return `${match[1]}-${match[2]}`;
      }
    }
    
    return serialNumber;
  };

  const columns: GridColDef[] = [
    {
      field: 'select',
      type: 'actions',
      width: 50,
      getActions: () => [],
    },
    {
      field: 'lin_nsn',
      headerName: 'LIN/NSN',
      width: 150,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.row.lin}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.nsn}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'nomenclature',
      headerName: 'Nomenclature',
      width: 200,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.isSensitive && (
            <Tooltip title="Sensitive Item">
              <SecurityIcon color="error" fontSize="small" />
            </Tooltip>
          )}
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Typography variant="body2">
          {params.row.category} / {params.row.subCategory}
        </Typography>
      ),
    },
    {
      field: 'qty_auth',
      headerName: 'QTY Auth',
      width: 100,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'qty_oh',
      headerName: 'QTY OH',
      width: 100,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => {
        const status = params.value as string;
        
        return (
          <Chip
            label={status}
            size="small"
            sx={(theme) => {
              let backgroundColor;
              let textColor;
              
              switch (status.toLowerCase()) {
                case 'serviceable':
                  backgroundColor = alpha(theme.palette.success.main, 0.1);
                  textColor = theme.palette.success.main;
                  break;
                case 'maintenance':
                  backgroundColor = alpha(theme.palette.warning.main, 0.1);
                  textColor = theme.palette.warning.main;
                  break;
                case 'unserviceable':
                  backgroundColor = alpha(theme.palette.error.main, 0.1);
                  textColor = theme.palette.error.main;
                  break;
                default:
                  backgroundColor = alpha(theme.palette.text.secondary, 0.1);
                  textColor = theme.palette.text.secondary;
              }
              
              return {
                backgroundColor,
                color: textColor,
                fontWeight: 'medium',
              };
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: '',
      width: 50,
      sortable: false,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <IconButton
          size="small"
          onClick={(e) => handleActionClick(e, params.row)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const getRowClassName = (params: any) => {
    if (params.row.isSensitive) return 'sensitive-row';
    if (params.row.status === 'Missing') return 'missing-row';
    if (params.row.status === 'Shortage') return 'shortage-row';
    if (params.row.status === 'Unserviceable') return 'unserviceable-row';
    return '';
  };

  const getSelectedItems = (): PropertyItem[] => {
    return items.filter((item) => selectionModel.includes(item.id));
  };

  const renderListView = () => (
    <Box sx={{ height: 600, width: '100%' }}>
      <StyledDataGrid
        rows={items}
        columns={columns}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
            minHeight: '48px',
          },
          '& .MuiDataGrid-cell': {
            padding: '12px',
          },
        }}
      />
      
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={() => handleActionSelect('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('transfer')}>
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Transfer" />
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('inventory')}>
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('maintenance')}>
          <ListItemIcon>
            <MaintenanceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Maintenance" />
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" sx={{ color: 'error.main' }} />
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {renderListView()}
    </Box>
  );
};

export default PropertyBookTable; 