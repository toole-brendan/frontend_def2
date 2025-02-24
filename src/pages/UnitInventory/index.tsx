import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  styled,
  Paper,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';
import { Add as AddIcon } from '@mui/icons-material';
import PageTitle from '../../components/common/PageTitle';

import UnitHierarchySelector from './components/UnitHierarchySelector';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import ItemDetailsDrawer from './components/ItemDetailsDrawer';
import AddItemModal from './components/AddItemModal';
import { InventoryItem, InventoryFilters as InventoryFiltersType, UnitHierarchy } from './types';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

// Mock data for initial testing
const mockUnitHierarchy: UnitHierarchy = {
  id: 'cco',
  name: 'C CO, 2-506 IN, 3BCT, 101st ABN DIV (AASLT)',
  level: 'company',
  children: [
    {
      id: '1stPlt',
      name: '1st Platoon',
      level: 'platoon',
      children: [
        {
          id: '1stSquad1',
          name: '1st Squad',
          level: 'squad',
          children: [
            { id: 'alpha1', name: 'Alpha Team', level: 'team' },
            { id: 'bravo1', name: 'Bravo Team', level: 'team' },
          ],
        },
        {
          id: '2ndSquad1',
          name: '2nd Squad',
          level: 'squad',
          children: [
            { id: 'alpha2', name: 'Alpha Team', level: 'team' },
            { id: 'bravo2', name: 'Bravo Team', level: 'team' },
          ],
        },
        {
          id: '3rdSquad1',
          name: 'Weapons Squad',
          level: 'squad',
        },
      ],
    },
    {
      id: '2ndPlt',
      name: '2nd Platoon',
      level: 'platoon',
      children: [
        {
          id: '1stSquad2',
          name: '1st Squad',
          level: 'squad',
          children: [
            { id: 'alpha3', name: 'Alpha Team', level: 'team' },
            { id: 'bravo3', name: 'Bravo Team', level: 'team' },
          ],
        },
        {
          id: '2ndSquad2',
          name: '2nd Squad',
          level: 'squad',
          children: [
            { id: 'alpha4', name: 'Alpha Team', level: 'team' },
            { id: 'bravo4', name: 'Bravo Team', level: 'team' },
          ],
        },
        {
          id: '3rdSquad2',
          name: 'Weapons Squad',
          level: 'squad',
        },
      ],
    },
    {
      id: '3rdPlt',
      name: '3rd Platoon',
      level: 'platoon',
      children: [
        {
          id: '1stSquad3',
          name: '1st Squad',
          level: 'squad',
          children: [
            { id: 'alpha5', name: 'Alpha Team', level: 'team' },
            { id: 'bravo5', name: 'Bravo Team', level: 'team' },
          ],
        },
        {
          id: '2ndSquad3',
          name: '2nd Squad',
          level: 'squad',
          children: [
            { id: 'alpha6', name: 'Alpha Team', level: 'team' },
            { id: 'bravo6', name: 'Bravo Team', level: 'team' },
          ],
        },
        {
          id: '3rdSquad3',
          name: 'Weapons Squad',
          level: 'squad',
        },
      ],
    },
    {
      id: 'wpnsPlt',
      name: 'Weapons Platoon',
      level: 'platoon',
      children: [
        { id: 'mortarSection', name: 'Mortar Section', level: 'squad' },
        { id: 'assaultSection', name: 'Assault Section', level: 'squad' },
      ],
    },
    {
      id: 'hq',
      name: 'HQ Section',
      level: 'platoon',
    },
  ],
};

const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'M4A1 Carbine',
    nsn: '1005-01-382-0953',
    serialNumber: 'W123456',
    status: 'in_use',
    location: 'Arms Room',
    assignedTo: 'SGT Smith, John',
    unit: '1st Platoon, 2nd Squad',
    category: 'weapons',
    lastUpdated: '2024-03-15',
  },
  // Add more mock items as needed
];

const UnitInventory: React.FC = () => {
  // State management
  const [currentUnit, setCurrentUnit] = useState<string[]>(['C CO, 2-506 IN, 3BCT, 101st ABN DIV (AASLT)']);
  const [filters, setFilters] = useState<InventoryFiltersType>({
    search: '',
    status: '',
    category: '',
    location: '',
    assignedTo: '',
    unitLevel: '',
  });
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // Metrics calculations (mock data)
  const metrics = {
    totalItems: 250,
    itemsInUse: 150,
    itemsAvailable: 80,
    itemsUnderMaintenance: 20,
  };

  // Event handlers
  const handleUnitSelect = (unitPath: string[]) => {
    setCurrentUnit(unitPath);
  };

  const handleFilterChange = (newFilters: InventoryFiltersType) => {
    setFilters(newFilters);
  };

  const handleSaveFilter = () => {
    // Implement save filter functionality
    console.log('Saving filter:', filters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      location: '',
      assignedTo: '',
      unitLevel: '',
    });
  };

  const handleViewDetails = () => {
    setDetailsDrawerOpen(true);
  };

  const handleTransfer = (item: InventoryItem) => {
    console.log('Transfer item:', item);
  };

  const handleMaintenance = (item: InventoryItem) => {
    console.log('Maintenance for item:', item);
  };

  const handleViewQR = (item: InventoryItem) => {
    console.log('View QR for item:', item);
  };

  const handleEdit = (item: InventoryItem) => {
    console.log('Edit item:', item);
  };

  const handleAddItem = (data: any) => {
    console.log('Add item:', data);
    setIsAddItemModalOpen(false);
    // TODO: Implement item addition logic
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <PageTitle variant="h4" gutterBottom>
                UNIT INVENTORY
              </PageTitle>
              <Typography variant="body2" color="text.secondary">
                {currentUnit[currentUnit.length - 1]}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsAddItemModalOpen(true)}
            >
              Add Item
            </Button>
          </Box>
        </Box>

        {/* Metrics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard>
              <div className="card-content">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                    }}
                  >
                    <InventoryIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="primary">
                      {metrics.totalItems}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Items
                    </Typography>
                  </Box>
                </Box>
              </div>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard>
              <div className="card-content">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'warning.light',
                      color: 'warning.main',
                    }}
                  >
                    <CheckCircleIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="warning.main">
                      {metrics.itemsInUse}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Items In Use
                    </Typography>
                  </Box>
                </Box>
              </div>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard>
              <div className="card-content">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'success.light',
                      color: 'success.main',
                    }}
                  >
                    <WarningIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="success.main">
                      {metrics.itemsAvailable}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Items Available
                    </Typography>
                  </Box>
                </Box>
              </div>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard>
              <div className="card-content">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'error.light',
                      color: 'error.main',
                    }}
                  >
                    <BuildIcon />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="error.main">
                      {metrics.itemsUnderMaintenance}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Under Maintenance
                    </Typography>
                  </Box>
                </Box>
              </div>
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Unit Hierarchy Selector */}
        <DashboardCard sx={{ mb: 3 }}>
          <div className="card-header">
            <Typography variant="h6">UNIT BREAKDOWN</Typography>
          </div>
          <div className="card-content">
            <UnitHierarchySelector
              currentUnit={currentUnit}
              onUnitSelect={handleUnitSelect}
              unitHierarchy={mockUnitHierarchy}
            />
          </div>
        </DashboardCard>

        {/* Filters */}
        <DashboardCard sx={{ mb: 3 }}>
          <div className="card-header">
            <Typography variant="h6">FILTERS</Typography>
          </div>
          <div className="card-content">
            <InventoryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onSaveFilter={handleSaveFilter}
              onClearFilters={handleClearFilters}
            />
          </div>
        </DashboardCard>

        {/* Inventory Table */}
        <DashboardCard>
          <div className="card-header">
            <Typography variant="h6">INVENTORY ITEMS</Typography>
          </div>
          <div className="card-content">
            <InventoryTable
              items={mockInventoryItems}
              onViewDetails={handleViewDetails}
              onTransfer={handleTransfer}
              onMaintenance={handleMaintenance}
              onViewQR={handleViewQR}
              onEdit={handleEdit}
            />
          </div>
        </DashboardCard>

        {/* Modals and Drawers */}
        <ItemDetailsDrawer
          open={detailsDrawerOpen}
          onClose={() => setDetailsDrawerOpen(false)}
          item={null}
          onTransfer={handleTransfer}
          onMaintenance={handleMaintenance}
          onViewQR={handleViewQR}
        />

        <AddItemModal
          open={isAddItemModalOpen}
          onClose={() => setIsAddItemModalOpen(false)}
          onSubmit={handleAddItem}
        />
      </Box>
    </Container>
  );
};

export default UnitInventory; 