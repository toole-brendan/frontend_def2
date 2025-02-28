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
  CardHeader
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
    if (status === 'Complete') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'Scheduled') return 'info';
    if (status.includes('Discrepancies')) return 'warning';
    return 'error';
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
          startIcon={status.includes('Discrepancies') ? <ArticleIcon /> : <PlayArrowIcon />}
          sx={{ mr: 1 }}
        >
          {actionLabel}
        </Button>
        <IconButton
          size="small"
          onClick={(event) => handleMenuClick(event, params.row.id)}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    );
  };

  // Function to render the progress cell
  const renderProgressCell = (params: GridRenderCellParams) => {
    const progress = params.value as number;
    
    if (progress === 0) {
      return <Typography variant="body2">Not Started</Typography>;
    }
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress === 100 ? 'success' : 'primary'}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {`${progress}%`}
        </Typography>
      </Box>
    );
  };

  // Function to render the status cell
  const renderStatusCell = (params: GridRenderCellParams) => {
    return (
      <Chip
        label={params.value}
        size="small"
        color={getStatusColor(params.value as string)}
        sx={{ fontWeight: 'medium' }}
      />
    );
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 180, sortable: true },
    { field: 'schedule', headerName: 'Schedule', width: 150 },
    { field: 'items', headerName: 'Items', width: 100, type: 'number' },
    { 
      field: 'progress', 
      headerName: 'Progress', 
      width: 150, 
      renderCell: renderProgressCell 
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150, 
      renderCell: renderStatusCell 
    },
    { field: 'officer', headerName: 'Officer', width: 150 },
    { field: 'due', headerName: 'Due', width: 100 },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150, 
      sortable: false, 
      renderCell: renderActionCell 
    }
  ];

  return (
    <Paper elevation={2}>
      <CardHeader 
        title="Inventory Management" 
        action={
          <IconButton aria-label="refresh">
            <RefreshIcon />
          </IconButton>
        }
      />
      <Divider />
      
      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="inventory filter tabs">
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
          }}
        />
      </Box>
      
      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleStartInventory}>
          <PlayArrowIcon fontSize="small" sx={{ mr: 1 }} />
          Start/Resume Inventory
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          View Details
        </MenuItem>
      </Menu>
    </Paper>
  );
}; 