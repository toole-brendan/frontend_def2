import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  styled,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LinkIcon from '@mui/icons-material/Link';
import { format } from 'date-fns';
import { useProperty } from '../../hooks/useProperty';
import { PropertySkeleton } from './PropertySkeleton';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { PropertyItem } from '../../types/property';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

const Property: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [condition, setCondition] = useState('all');
  const [readiness, setReadiness] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    summary,
    equipmentList,
    loadSummary,
    loadEquipmentList,
    loadComplianceStatus,
    loading,
    error,
  } = useProperty();

  const handleRetry = useCallback(() => {
    loadSummary();
    loadEquipmentList();
    loadComplianceStatus();
  }, [loadSummary, loadEquipmentList, loadComplianceStatus]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Starting to load data...');
        await loadSummary();
        console.log('Summary loaded');
        await loadEquipmentList();
        console.log('Equipment list loaded');
        await loadComplianceStatus();
        console.log('Compliance status loaded');
      } catch (error) {
        console.error('Error in Property component:', error);
      }
    };
    loadData();
  }, [loadSummary, loadEquipmentList, loadComplianceStatus]);

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

  const renderHeader = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          MY PROPERTY
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and track your assigned equipment
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          placeholder="Search by item name or serial number..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <IconButton onClick={handleRetry}>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );

  const renderSummaryCards = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <div className="card-content">
            <Typography variant="h4" color="primary" gutterBottom>
              {summary.totalItems}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Total Items
            </Typography>
          </div>
        </DashboardCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <div className="card-content">
            <Typography variant="h4" color="success.main" gutterBottom>
              {summary.serviceableItems} ({Math.round((summary.serviceableItems / summary.totalItems) * 100)}%)
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Serviceable Items
            </Typography>
          </div>
        </DashboardCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <div className="card-content">
            <Typography variant="h4" color="warning.main" gutterBottom>
              {summary.upcomingInspections.next30Days}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Upcoming Inspections (30 Days)
            </Typography>
          </div>
        </DashboardCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <div className="card-content">
            <Typography variant="h4" color="error.main" gutterBottom>
              {summary.disputedItems}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Disputed Items
            </Typography>
          </div>
        </DashboardCard>
      </Grid>
    </Grid>
  );

  const renderFilters = () => (
    <DashboardCard sx={{ mb: 3 }}>
      <div className="card-header">
        <Typography variant="h6">Filters</Typography>
      </div>
      <div className="card-content">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="weapons">Weapons</MenuItem>
              <MenuItem value="equipment">Equipment</MenuItem>
              <MenuItem value="vehicles">Vehicles</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Condition</InputLabel>
            <Select
              value={condition}
              label="Condition"
              onChange={(e) => setCondition(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="SERVICEABLE">Serviceable</MenuItem>
              <MenuItem value="UNSERVICEABLE">Unserviceable</MenuItem>
              <MenuItem value="DAMAGED">Damaged</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Readiness</InputLabel>
            <Select
              value={readiness}
              label="Readiness"
              onChange={(e) => setReadiness(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="OPERATIONAL">Operational</MenuItem>
              <MenuItem value="NEEDS_MAINTENANCE">Needs Maintenance</MenuItem>
              <MenuItem value="IN_REPAIR">In Repair</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </DashboardCard>
  );

  const renderEquipmentList = () => {
    console.log('Render state:', { loading, error, equipmentList });
    
    if (loading.summary || loading.equipmentList || loading.compliance) {
      return <PropertySkeleton />;
    }

    const hasError = error.summary || error.equipmentList || error.compliance;
    if (hasError) {
      console.log('Error details:', error);
      return (
        <ErrorDisplay 
          title="Error Loading Property Data"
          message={error.summary || error.equipmentList || error.compliance || "Failed to load property data"}
          onRetry={handleRetry}
        />
      );
    }

    return (
      <TableContainer component={Paper}>
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
            {equipmentList.map((item: PropertyItem) => (
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
                <TableCell>{format(new Date(item.lastInspection), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(new Date(item.nextInspectionDue), 'MMM dd, yyyy')}</TableCell>
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
      </TableContainer>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {renderHeader()}
      {renderSummaryCards()}
      {renderFilters()}
      {renderEquipmentList()}
    </Container>
  );
};

export default Property; 