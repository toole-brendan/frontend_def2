import React, { useState } from 'react';
import {
  Box,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  Badge,
  Collapse,
  Paper,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridRowSelectionModel,
  GridSortModel,
  GridValueFormatter,
  GridRowParams,
  GridEventListener,
} from '@mui/x-data-grid';
import {
  Visibility as VisibilityIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedUserIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Nightlight as NightVisionIcon,
  Lock as CryptoIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  GpsFixed as WeaponsIcon,
} from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

// Define the SensitiveItem interface
export interface SensitiveItem {
  id: string;
  category: 'Weapons' | 'NVGs' | 'Crypto' | 'Communications';
  nomenclature: string;
  serialNumber: string;
  nsn: string;
  lin: string;
  location: string;
  securityStatus: 'Secured' | 'In-Transit' | 'Maintenance' | 'Alert';
  handReceipt: string;
  verificationStatus: 'Verified' | 'Due Soon' | 'Overdue';
  lastVerified: string; // ISO date string
  verifiedBy: string;
  verificationHistory: Array<{
    date: string;
    status: string;
    verifiedBy: string;
    comments?: string;
  }>;
}

interface SensitiveItemsMasterTableProps {
  items: SensitiveItem[];
  loading?: boolean;
  onSelectionChange?: (selectedItems: string[]) => void;
  onRowAction?: (action: string, item: SensitiveItem) => void;
}

const SensitiveItemsMasterTable: React.FC<SensitiveItemsMasterTableProps> = ({
  items,
  loading = false,
  onSelectionChange,
  onRowAction,
}) => {
  const theme = useTheme();
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'category',
      sort: 'asc',
    }
  ]);

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

  // Handle row click to expand/collapse
  const handleRowClick = (params: GridRowParams) => {
    setExpandedRow(expandedRow === params.id ? null : params.id as string);
  };

  // Get category icon based on category type
  const getCategoryIcon = (category: SensitiveItem['category']) => {
    switch (category) {
      case 'Weapons':
        return <WeaponsIcon fontSize="small" sx={{ color: 'error.main' }} />;
      case 'NVGs':
        return <NightVisionIcon fontSize="small" sx={{ color: 'success.main' }} />;
      case 'Crypto':
        return <CryptoIcon fontSize="small" sx={{ color: 'warning.main' }} />;
      case 'Communications':
        return <SecurityIcon fontSize="small" sx={{ color: 'info.main' }} />;
      default:
        return <SecurityIcon fontSize="small" />;
    }
  };

  // Get verification status color
  const getVerificationStatusColor = (status: SensitiveItem['verificationStatus']) => {
    switch (status) {
      case 'Verified':
        return 'success';
      case 'Due Soon':
        return 'warning';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  // Get verification status icon
  const getVerificationStatusIcon = (status: SensitiveItem['verificationStatus']) => {
    switch (status) {
      case 'Verified':
        return <VerifiedUserIcon fontSize="small" />;
      case 'Due Soon':
        return <WarningIcon fontSize="small" />;
      case 'Overdue':
        return <ErrorIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Column definitions
  const columns: GridColDef[] = [
    {
      field: 'expand',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
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
      field: 'category',
      headerName: 'Category',
      width: 150,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getCategoryIcon(params.row.category)}
          <Typography variant="body2">
            {params.row.category}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'nomenclature',
      headerName: 'Nomenclature',
      width: 250,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Tooltip title={params.value as string}>
          <Typography variant="body2" noWrap fontWeight="medium">
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'serialNumber',
      headerName: 'Serial Number',
      width: 180,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          px: 1,
          py: 0.5,
          borderRadius: 1,
          width: 'fit-content'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '0.05em'
            }}
          >
            {params.value as string}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'nsn',
      headerName: 'NSN/LIN',
      width: 180,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Box>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {params.row.nsn}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            LIN: {params.row.lin}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 180,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationIcon fontSize="small" color="info" />
          <Typography variant="body2">
            {params.value as string}
          </Typography>
          <Chip 
            label={params.row.securityStatus} 
            size="small"
            color={
              params.row.securityStatus === 'Secured' ? 'success' :
              params.row.securityStatus === 'Alert' ? 'error' :
              params.row.securityStatus === 'In-Transit' ? 'warning' : 'info'
            }
            sx={{ height: 20, fontSize: '0.7rem' }}
          />
        </Box>
      ),
    },
    {
      field: 'handReceipt',
      headerName: 'Hand Receipt',
      width: 180,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {params.value as string}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'verificationStatus',
      headerName: 'Status',
      width: 150,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => {
        const status = params.value as SensitiveItem['verificationStatus'];
        const color = getVerificationStatusColor(status);
        const icon = getVerificationStatusIcon(status);
        
        return (
          <Chip 
            icon={icon || undefined}
            label={status} 
            color={color}
            size="small"
            sx={{ 
              fontWeight: 'medium',
              '& .MuiChip-icon': {
                color: 'inherit'
              }
            }}
          />
        );
      },
    },
    {
      field: 'lastVerified',
      headerName: 'Last Verified',
      width: 200,
      filterable: true,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => {
        const date = new Date(params.row.lastVerified);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        
        let color = 'text.primary';
        if (daysDiff > 30) color = 'error.main';
        else if (daysDiff > 15) color = 'warning.main';
        
        return (
          <Box>
            <Typography variant="body2" color={color}>
              {formatDate(params.row.lastVerified)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              By: {params.row.verifiedBy}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<SensitiveItem>) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => onRowAction && onRowAction('view', params.row)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Render verification history for expanded row
  const renderVerificationHistory = (item: SensitiveItem) => {
    return (
      <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
        <Typography variant="subtitle2" gutterBottom>
          Verification History
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          {item.verificationHistory.map((record, index) => (
            <Paper key={index} sx={{ p: 1.5, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" fontWeight="medium">
                  {formatDate(record.date)}
                </Typography>
                <Chip 
                  label={record.status} 
                  size="small" 
                  color={
                    record.status === 'Verified' ? 'success' :
                    record.status === 'Missing' ? 'error' : 'warning'
                  }
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Verified by: {record.verifiedBy}
              </Typography>
              {record.comments && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  "{record.comments}"
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    );
  };

  // Get row class name based on verification status
  const getRowClassName = (params: GridRowParams<SensitiveItem>) => {
    if (params.row.verificationStatus === 'Overdue') return 'overdue-row';
    if (params.row.verificationStatus === 'Due Soon') return 'due-soon-row';
    if (params.row.verificationStatus === 'Verified') return 'verified-row';
    return '';
  };

  return (
    <Box sx={{ height: 650, width: '100%', position: 'relative' }}>
      <DataGrid
        rows={items}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            printOptions: { disableToolbarButton: false },
            csvOptions: { disableToolbarButton: false },
          },
        }}
        getRowClassName={getRowClassName}
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectionModel}
        onSortModelChange={handleSortModelChange}
        sortModel={sortModel}
        onRowClick={handleRowClick}
        density="standard"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
          sorting: {
            sortModel: [
              {
                field: 'category',
                sort: 'asc',
              },
            ],
          },
          filter: {
            filterModel: {
              items: [],
            },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'background.paper',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .overdue-row': {
            bgcolor: alpha(theme.palette.error.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.2),
            },
          },
          '& .due-soon-row': {
            bgcolor: alpha(theme.palette.warning.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.warning.main, 0.2),
            },
          },
          '& .verified-row': {
            bgcolor: alpha(theme.palette.success.main, 0.05),
            '&:hover': {
              bgcolor: alpha(theme.palette.success.main, 0.1),
            },
          },
        }}
      />

      {/* Render the expanded verification history */}
      {expandedRow && items.find(item => item.id === expandedRow) && (
        <Collapse in={!!expandedRow} timeout="auto" unmountOnExit>
          {renderVerificationHistory(items.find(item => item.id === expandedRow)!)}
        </Collapse>
      )}
    </Box>
  );
};

export default SensitiveItemsMasterTable; 