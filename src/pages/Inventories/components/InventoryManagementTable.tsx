import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Chip, 
  IconButton, 
  Menu, 
  MenuItem, 
  LinearProgress, 
  Toolbar, 
  Tabs, 
  Tab, 
  useTheme,
  Divider,
  CardHeader,
  alpha
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import { inventoryRows } from './mockData';

interface InventoryManagementTableProps {
  onStartInventory: (inventoryId: string) => void;
}

export const InventoryManagementTable: React.FC<InventoryManagementTableProps> = ({ onStartInventory }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedInventory, setSelectedInventory] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, inventoryId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedInventory(inventoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStartInventory = () => {
    if (selectedInventory) {
      onStartInventory(selectedInventory);
      handleMenuClose();
    }
  };

  // Function to determine status color
  const getStatusColor = (status: string) => {
    if (status === 'Complete') return theme.palette.success.main;
    if (status === 'In Progress') return theme.palette.primary.main;
    if (status === 'Scheduled') return theme.palette.info.main;
    if (status.includes('Discrepancies')) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Function to render the action buttons for each row
  const renderActionCell = (params: GridRenderCellParams) => {
    const status = params.row.status;
    
    let actionLabel = 'Start';
    if (status === 'In Progress') actionLabel = 'Resume';
    else if (status.includes('Discrepancies')) actionLabel = 'Review';
    else if (status === 'Scheduled' && params.row.due !== '27FEB' && params.row.due !== '28FEB') actionLabel = 'Plan';
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button 
          size="small" 
          variant="contained" 
          color="primary"
          onClick={() => onStartInventory(params.row.id)}
          startIcon={status.includes('Discrepancies') ? <ArticleIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
          sx={{ 
            mr: 1, 
            borderRadius: 0,
            fontWeight: 'medium',
            fontSize: '0.7rem',
            letterSpacing: '0.03em',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
            textTransform: 'uppercase'
          }}
        >
          {actionLabel}
        </Button>
        <IconButton
          size="small"
          onClick={(event) => handleMenuClick(event, params.row.id)}
          sx={{
            border: '1px solid rgba(140, 140, 160, 0.2)',
            borderRadius: 0,
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  // Function to render the progress cell
  const renderProgressCell = (params: GridRenderCellParams) => {
    const progress = params.value as number;
    
    if (progress === 0) {
      return <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>Not Started</Typography>;
    }
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress === 100 ? 'success' : 'primary'}
            sx={{ 
              height: 8, 
              borderRadius: 0,
              '.MuiLinearProgress-bar': {
                transition: 'transform 0.3s ease'
              }
            }}
          />
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.75rem', 
            fontWeight: 'medium', 
            minWidth: '36px',
            textAlign: 'right'
          }}
        >
          {`${progress}%`}
        </Typography>
      </Box>
    );
  };

  // Function to render the status cell
  const renderStatusCell = (params: GridRenderCellParams) => {
    const status = params.value as string;
    const statusColor = getStatusColor(status);
    
    return (
      <Chip
        label={status}
        size="small"
        sx={{ 
          fontWeight: 'medium',
          borderRadius: 0,
          bgcolor: alpha(statusColor, 0.1),
          color: statusColor,
          height: 20,
          fontSize: '0.7rem',
          letterSpacing: '0.03em',
        }}
      />
    );
  };

  // Function to render the ID cell
  const renderIdCell = (params: GridRenderCellParams) => {
    return (
      <Typography 
        variant="body2" 
        sx={{ 
          fontFamily: 'monospace', 
          fontSize: '0.75rem', 
          letterSpacing: '0.05em',
          fontWeight: 'medium'
        }}
      >
        {params.value}
      </Typography>
    );
  };

  // Function to render the due date cell
  const renderDueCell = (params: GridRenderCellParams) => {
    const due = params.value as string;
    const isUrgent = due === '27FEB' || due === '28FEB';
    
    return (
      <Typography 
        variant="body2" 
        sx={{ 
          fontFamily: 'monospace', 
          fontSize: '0.75rem', 
          letterSpacing: '0.05em',
          fontWeight: isUrgent ? 'bold' : 'normal',
          color: isUrgent ? 'error.main' : 'text.primary',
        }}
      >
        {due}
      </Typography>
    );
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { 
      field: 'type', 
      headerName: 'TYPE', 
      width: 180, 
      sortable: true,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'schedule', 
      headerName: 'SCHEDULE', 
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'items', 
      headerName: 'ITEMS', 
      width: 100, 
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 'medium' }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'progress', 
      headerName: 'PROGRESS', 
      width: 150, 
      renderCell: renderProgressCell 
    },
    { 
      field: 'status', 
      headerName: 'STATUS', 
      width: 150, 
      renderCell: renderStatusCell 
    },
    { 
      field: 'officer', 
      headerName: 'OFFICER', 
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'due', 
      headerName: 'DUE', 
      width: 100,
      renderCell: renderDueCell
    },
    { 
      field: 'actions', 
      headerName: 'ACTIONS', 
      width: 150, 
      sortable: false, 
      renderCell: renderActionCell 
    }
  ];

  return (
    <Paper 
      sx={{ 
        p: 0, 
        mb: 3, 
        borderRadius: 0,
        border: '2px solid rgba(140, 140, 160, 0.12)',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
          : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardHeader 
        title="Inventory Management" 
        action={
          <IconButton 
            aria-label="refresh"
            sx={{
              border: '1px solid rgba(140, 140, 160, 0.2)',
              borderRadius: 0,
            }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        }
      />
      <Divider />
      
      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          aria-label="inventory filter tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '0.85rem',
              minHeight: 40,
              py: 1,
            },
            '& .Mui-selected': {
              fontWeight: 'bold',
            },
            '& .MuiTabs-indicator': {
              height: 3,
            }
          }}
        >
          <Tab label="All Inventories" />
          <Tab label="Sensitive Items" />
          <Tab label="Cyclic" />
          <Tab label="Command Directed" />
          <Tab label="CSDP" />
        </Tabs>
      </Box>
      
      {/* Main Data Grid */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={inventoryRows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'dueDate', sort: 'asc' }],
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          checkboxSelection
          disableColumnMenu
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'medium',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.02),
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            },
            '& .MuiCheckbox-root': {
              borderRadius: 0,
            }
          }}
        />
      </Box>
      
      {/* Footer */}
      <Box 
        sx={{ 
          p: 1.5, 
          borderTop: '1px solid rgba(140, 140, 160, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.03) : alpha(theme.palette.grey[100], 0.5),
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>
          Showing {inventoryRows.length} of 12 inventories
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.primary.main,
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 'medium',
            letterSpacing: '0.03em',
            '&:hover': { 
              textDecoration: 'underline',
              color: alpha(theme.palette.primary.main, 0.8),
            }
          }}
        >
          View all inventories
        </Typography>
      </Box>
      
      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiMenuItem-root': {
            fontSize: '0.85rem',
          }
        }}
      >
        <MenuItem onClick={handleStartInventory}>
          <PlayArrowIcon fontSize="small" sx={{ mr: 1 }} />
          Start/Resume Inventory
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
      </Menu>
    </Paper>
  );
};
