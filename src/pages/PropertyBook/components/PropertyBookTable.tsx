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
} from '@mui/material';
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
} from '@mui/icons-material';
import { PropertyFilters } from './FilterPanel';
import EquipmentDetailPanel from './EquipmentDetailPanel';
import BulkActionToolbar from './BulkActionToolbar';

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
  onBulkAction?: (action: string, items: PropertyItem[], additionalData?: any) => void;
}

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
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'category',
      sort: 'asc',
    }
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle selection changes
  const handleSelectionChange = (newSelectionModel: GridRowSelectionModel) => {
    setSelectionModel(newSelectionModel);
    if (onSelectionChange) {
      onSelectionChange(newSelectionModel as string[]);
    }
  };

  // Handle sort model changes
  const handleSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

  // Handle row action menu
  const handleActionClick = (event: React.MouseEvent<HTMLElement>, item: PropertyItem) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedItem(item);
  };

  const handleActionClose = () => {
    setActionMenuAnchor(null);
  };

  const handleActionSelect = (action: string) => {
    if (selectedItem && onRowAction) {
      onRowAction(action, selectedItem);
    }
    handleActionClose();
  };

  // Handle row click for expansion
  const handleRowClick: GridEventListener<'rowClick'> = (params, event) => {
    // Prevent expansion when clicking on actions or checkboxes
    const target = event.target as HTMLElement;
    if (target && (
      target.closest('.MuiCheckbox-root') || 
      target.closest('.actions-cell') ||
      // Prevent expansion when clicking on clickable elements
      target.closest('button') || 
      target.closest('a')
    )) {
      return;
    }
    
    // Toggle expansion
    if (expandedRow === params.row.id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(params.row.id);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string, items: PropertyItem[], additionalData?: any) => {
    if (onBulkAction) {
      onBulkAction(action, items, additionalData);
    }
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectionModel([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  // Get location icon based on location string
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

  // Get status chip color
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

  // Format serial number according to Army standards
  const formatSerialNumber = (serialNumber: string): string => {
    // Implementation of Army serial number formatting
    // This is a simplified version - actual implementation would depend on exact Army standards
    
    // Remove any spaces or special characters
    let formatted = serialNumber.replace(/[^a-zA-Z0-9]/g, '');
    
    // If it's a weapon serial number (usually starting with specific prefixes)
    if (/^(M4|M16|M240|M249|M2)/i.test(formatted)) {
      // Format as XXXXXX-XX (first 6 chars, dash, last 2)
      if (formatted.length > 8) {
        return `${formatted.substring(0, 6)}-${formatted.substring(6, 8)}`;
      }
    }
    
    // Vehicle or equipment format (often has model-serial structure)
    if (formatted.length > 5 && /^[A-Z]/i.test(formatted)) {
      // Split model prefix from numbers
      const match = formatted.match(/^([A-Z]+)(\d+)/i);
      if (match && match.length === 3) {
        return `${match[1]}-${match[2]}`;
      }
    }
    
    // If no specific format applies, return as is
    return serialNumber;
  };

  // Column definitions
  const columns: GridColDef[] = [
    {
      field: 'expand',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setExpandedRow(expandedRow === params.row.id ? null : params.row.id);
          }}
        >
          {expandedRow === params.row.id ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      ),
    },
    {
      field: 'lin',
      headerName: 'LIN/NSN',
      width: 180,
      filterable: true,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => {
        const isSensitive = params.row.isSensitive;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isSensitive && (
              <Tooltip title="Sensitive Item">
                <SensitiveIcon
                  fontSize="small"
                  color="error"
                  sx={{ mr: 1 }}
                />
              </Tooltip>
            )}
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {params.row.lin}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                {params.row.nsn}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'nomenclature',
      headerName: 'Nomenclature',
      width: 250,
      filterable: true,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Tooltip title={params.value as string}>
          <Typography variant="body2" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      filterable: true,
      valueGetter: (params: { row: PropertyItem }) => {
        if (!params || !params.row) return '';
        return `${params.row.category || ''}${params.row.subCategory ? ` / ${params.row.subCategory}` : ''}`;
      },
    },
    {
      field: 'qtyAuth',
      headerName: 'QTY Auth',
      type: 'number',
      width: 90,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'qtyOnHand',
      headerName: 'QTY OH',
      type: 'number',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<PropertyItem>) => {
        const qtyAuth = params.row.qtyAuth;
        const qtyOH = params.row.qtyOnHand;
        const color = qtyOH < qtyAuth ? 'error.main' : qtyOH > qtyAuth ? 'warning.main' : 'success.main';
        
        return (
          <Typography variant="body2" fontWeight="medium" color={color}>
            {qtyOH}
          </Typography>
        );
      },
    },
    {
      field: 'serialNumber',
      headerName: 'Serial Number',
      width: 150,
      filterable: true,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => {
        const formattedSerial = formatSerialNumber(params.value as string);
        const isSensitive = params.row.isSensitive;
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: 'monospace',
                fontWeight: isSensitive ? 'bold' : 'normal',
                color: isSensitive ? 'error.main' : 'text.primary',
                bgcolor: isSensitive ? 'error.lighter' : 'transparent',
                px: isSensitive ? 1 : 0,
                borderRadius: 1,
              }}
            >
              {formattedSerial}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
      filterable: true,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={params.value as string}>
            {getLocationIcon(params.value as string)}
          </Tooltip>
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'handReceiptHolder',
      headerName: 'Hand Receipt',
      width: 150,
      filterable: true,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      filterable: true,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => {
        const status = params.value as string;
        const color = getStatusColor(status);
        
        // Enhanced status indicator with icon and color coding
        return (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            bgcolor: `${color}.lighter`,
            py: 0.5,
            px: 1,
            borderRadius: 2,
          }}>
            {status === 'Serviceable' && <SensitiveIcon fontSize="small" color="success" />}
            {status === 'Maintenance' && <MaintenanceIcon fontSize="small" color="warning" />}
            {status === 'Unserviceable' && <UnsecuredIcon fontSize="small" color="error" />}
            {status === 'Shortage' && <ArrowDownwardIcon fontSize="small" color="error" />}
            {status === 'Missing' && <HelpOutlineIcon fontSize="small" color="error" />}
            <Typography 
              variant="body2" 
              fontWeight="medium"
              color={`${color}.main`}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'lastVerified',
      headerName: 'Last Verified',
      width: 130,
      type: 'date',
      filterable: true,
      valueGetter: (params: { row: PropertyItem }) => {
        if (!params || !params.row || !params.row.lastVerified) return null;
        return new Date(params.row.lastVerified);
      },
      renderCell: (params: GridRenderCellParams<PropertyItem>) => {
        if (!params.row || !params.row.lastVerified) {
          return <Typography variant="body2">Not verified</Typography>;
        }
        
        const date = new Date(params.row.lastVerified);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        
        let color = 'text.primary';
        if (daysDiff > 180) color = 'error.main';
        else if (daysDiff > 90) color = 'warning.main';
        
        return (
          <Typography variant="body2" color={color}>
            {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </Typography>
        );
      },
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 110,
      type: 'number',
      filterable: true,
      valueFormatter: (params: { value: number }) => {
        if (params.value === undefined || params.value === null) return '$0';
        return `$${params.value.toLocaleString()}`;
      },
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<PropertyItem>) => (
        <Box className="actions-cell">
          <IconButton size="small" onClick={(e) => handleActionClick(e, params.row)}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
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

  // Get selected items from selection model
  const getSelectedItems = (): PropertyItem[] => {
    return items.filter((item) => selectionModel.includes(item.id));
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderGridView = () => (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" noWrap>
                {item.nomenclature}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                NSN: {item.nsn}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={item.status}
                  size="small"
                  color={getStatusColor(item.status)}
                  sx={{ mr: 1 }}
                />
                {item.isSensitive && (
                  <Chip
                    icon={<SensitiveIcon />}
                    label="Sensitive"
                    size="small"
                    color="warning"
                  />
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Location: {item.location}
              </Typography>
              <Typography variant="body2">
                Qty: {item.qtyOnHand}/{item.qtyAuth}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                size="small"
                onClick={(e) => handleActionClick(e, item)}
              >
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderListView = () => (
    <Box sx={{ height: '600px', width: '100%' }}>
      <DataGrid
        rows={items}
        columns={columns}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        onRowClick={handleRowClick}
        getRowClassName={getRowClassName}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
      
      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={() => handleActionSelect('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('transfer')}>
          <ListItemIcon>
            <TransferIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Transfer</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('inventory')}>
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Inventory</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('maintenance')}>
          <ListItemIcon>
            <MaintenanceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Maintenance</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PropertyBookTable; 