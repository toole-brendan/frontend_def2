import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar
} from '@mui/x-data-grid';
import {
  Visibility as ViewIcon,
  ThumbUp as ApproveIcon,
  ThumbDown as DenyIcon,
  Description as DocumentIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { 
  TransferManagementTableProps, 
  TransferPriority, 
  TransferStage, 
  TransferType, 
  DocumentType,
  Transfer
} from '../types';

// Helper function to format dates
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Not specified';
  
  try {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Invalid date format:', error);
    return 'Invalid date';
  }
};

const TransferManagementTable: React.FC<TransferManagementTableProps> = ({
  transfers,
  onViewDetails,
  onApprove,
  onDeny,
  onGenerateDocument,
  activeFilters,
  onFilterChange
}) => {
  const theme = useTheme();
  const [pageSize, setPageSize] = useState<number>(10);
  
  // Define the columns for the data grid
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'Transfer ID', 
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight="medium">
          {params.row.id}
        </Typography>
      )
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        const typeValue = transfer.type;
        let color;
        
        switch (typeValue) {
          case TransferType.LATERAL:
            color = '#3F51B5'; // Indigo
            break;
          case TransferType.RECEIPT:
            color = '#009688'; // Teal
            break;
          case TransferType.TURN_IN:
            color = '#795548'; // Brown
            break;
          case TransferType.MAINTENANCE:
            color = '#FF5722'; // Deep Orange
            break;
          case TransferType.TEMPORARY:
            color = '#673AB7'; // Deep Purple
            break;
          case TransferType.RANGE:
            color = '#E91E63'; // Pink
            break;
          default:
            color = '#757575'; // Grey
        }
        
        return (
          <Chip
            label={typeValue}
            size="small"
            sx={{
              backgroundColor: `${color}20`,
              color: color,
              fontWeight: 500,
              borderRadius: 1
            }}
          />
        );
      }
    },
    { 
      field: 'stage', 
      headerName: 'Status', 
      width: 170,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        const stageValue = transfer.stage;
        let color;
        
        switch (stageValue) {
          case TransferStage.INITIATED:
            color = '#2196F3'; // Blue
            break;
          case TransferStage.PENDING_APPROVAL:
            color = '#FFC107'; // Amber
            break;
          case TransferStage.IN_TRANSIT:
            color = '#FF9800'; // Orange
            break;
          case TransferStage.PENDING_RECEIPT:
            color = '#F44336'; // Red
            break;
          case TransferStage.COMPLETED:
            color = '#4CAF50'; // Green
            break;
          default:
            color = '#757575'; // Grey
        }
        
        return (
          <Chip
            label={stageValue}
            size="small"
            sx={{
              backgroundColor: `${color}20`,
              color: color,
              fontWeight: 500,
              borderRadius: 1
            }}
          />
        );
      }
    },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        const priorityValue = transfer.priority;
        let color;
        
        switch (priorityValue) {
          case TransferPriority.HIGH:
            color = '#D32F2F'; // Red
            break;
          case TransferPriority.MEDIUM:
            color = '#F57C00'; // Orange
            break;
          case TransferPriority.ROUTINE:
            color = '#388E3C'; // Green
            break;
          default:
            color = '#757575'; // Grey
        }
        
        return (
          <Box display="flex" alignItems="center">
            {priorityValue === TransferPriority.HIGH && (
              <FlagIcon fontSize="small" sx={{ color, mr: 0.5 }} />
            )}
            <Chip
              label={priorityValue}
              size="small"
              sx={{
                backgroundColor: `${color}20`,
                color: color,
                fontWeight: 500,
                borderRadius: 1
              }}
            />
          </Box>
        );
      }
    },
    { 
      field: 'dateInitiated', 
      headerName: 'Date Initiated', 
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        return <Typography variant="body2">{formatDate(transfer.dateInitiated)}</Typography>;
      }
    },
    { 
      field: 'dueDate', 
      headerName: 'Due Date', 
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        const dueDate = transfer.dueDate;
        const date = new Date(dueDate);
        const today = new Date();
        const isOverdue = date < today;
        const isDueToday = date.toDateString() === today.toDateString();
        
        return (
          <Typography 
            variant="body2"
            sx={{ 
              color: isOverdue ? 'error.main' : isDueToday ? 'warning.main' : 'inherit',
              fontWeight: isOverdue || isDueToday ? 'bold' : 'normal'
            }}
          >
            {formatDate(dueDate)}
          </Typography>
        );
      }
    },
    { 
      field: 'from', 
      headerName: 'From', 
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        return <Typography variant="body2">{transfer.from.name}</Typography>;
      }
    },
    { 
      field: 'to', 
      headerName: 'To', 
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        return <Typography variant="body2">{transfer.to.name}</Typography>;
      }
    },
    { 
      field: 'items', 
      headerName: 'Items', 
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        const itemCount = transfer.items.length;
        return (
          <Chip
            label={`${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            size="small"
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 240,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const transfer = params.row as Transfer;
        
        return (
          <Box>
            <Tooltip title="View details">
              <IconButton 
                size="small"
                onClick={() => onViewDetails(transfer.id)}
                sx={{ mr: 1 }}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            {onApprove && transfer.stage === TransferStage.PENDING_APPROVAL && (
              <Tooltip title="Approve transfer">
                <IconButton 
                  size="small"
                  color="success"
                  onClick={() => onApprove(transfer.id)}
                  sx={{ mr: 1 }}
                >
                  <ApproveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            
            {onDeny && transfer.stage === TransferStage.PENDING_APPROVAL && (
              <Tooltip title="Deny transfer">
                <IconButton 
                  size="small"
                  color="error"
                  onClick={() => onDeny(transfer.id)}
                  sx={{ mr: 1 }}
                >
                  <DenyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            
            {onGenerateDocument && (
              <Tooltip title="Generate document">
                <IconButton 
                  size="small"
                  color="primary"
                  onClick={() => {
                    // This would typically open a dropdown or dialog to select document type
                    // For now, we'll just use a default document type
                    onGenerateDocument(transfer.id, 'DA_FORM_3161' as DocumentType);
                  }}
                >
                  <DocumentIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      }
    }
  ];

  return (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2] }}>
      <CardContent sx={{ height: '100%', p: 0 }}>
        <Box sx={{ height: '100%', width: '100%', minHeight: 400, overflow: 'auto' }}>
          <DataGrid
            rows={transfers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: pageSize },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            onPaginationModelChange={(model) => setPageSize(model.pageSize)}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 }
              }
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell:focus': {
                outline: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.background.default
                  : theme.palette.grey[100]
              },
              width: '100%'
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransferManagementTable; 