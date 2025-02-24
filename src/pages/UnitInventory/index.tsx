import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';

import MetricCard from './components/MetricCard';
import UnitHierarchySelector from './components/UnitHierarchySelector';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import ItemDetailsDrawer from './components/ItemDetailsDrawer';
import AddItemModal from './components/AddItemModal';
import { InventoryItem, InventoryFilters as InventoryFiltersType, ItemDetails, UnitHierarchy } from './types';

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

const mockItemDetails: ItemDetails = {
  ...mockInventoryItems[0],
  maintenanceHistory: [
    {
      id: 'm1',
      date: '2024-02-15',
      type: 'PMCS',
      description: 'Regular maintenance check',
      performedBy: 'SPC Johnson',
      nextDueDate: '2024-03-15',
    },
  ],
  assignmentHistory: [
    {
      id: 'a1',
      date: '2024-01-01',
      assignedTo: 'SGT Smith, John',
      assignedBy: 'LT Davis',
      action: 'issued',
    },
  ],
  documents: [
    {
      id: 'd1',
      name: 'Technical Manual',
      type: 'PDF',
      url: '/documents/tm-m4a1.pdf',
    },
  ],
};

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
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);
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

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(mockItemDetails); // In real app, fetch details
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
              <Typography variant="h4" gutterBottom>
                UNIT INVENTORY
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUnit[currentUnit.length - 1]}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsAddItemModalOpen(true)}
              sx={{
                bgcolor: '#2563eb',
                '&:hover': {
                  bgcolor: '#1d4ed8',
                },
              }}
            >
              Add Item
            </Button>
          </Box>
        </Box>

        {/* Metrics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Items"
              value={metrics.totalItems}
              icon={<InventoryIcon />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Items In Use"
              value={metrics.itemsInUse}
              icon={<CheckCircleIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Items Available"
              value={metrics.itemsAvailable}
              icon={<WarningIcon />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Under Maintenance"
              value={metrics.itemsUnderMaintenance}
              icon={<BuildIcon />}
              color="error"
            />
          </Grid>
        </Grid>

        {/* Unit Hierarchy Selector */}
        <UnitHierarchySelector
          currentUnit={currentUnit}
          onUnitSelect={handleUnitSelect}
          unitHierarchy={mockUnitHierarchy}
        />

        {/* Filters */}
        <InventoryFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSaveFilter={handleSaveFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Inventory Table */}
        <InventoryTable
          items={mockInventoryItems}
          onViewDetails={handleViewDetails}
          onTransfer={handleTransfer}
          onMaintenance={handleMaintenance}
          onViewQR={handleViewQR}
          onEdit={handleEdit}
        />

        {/* Item Details Drawer */}
        <ItemDetailsDrawer
          open={detailsDrawerOpen}
          onClose={() => setDetailsDrawerOpen(false)}
          item={selectedItem}
          onTransfer={handleTransfer}
          onMaintenance={handleMaintenance}
          onViewQR={handleViewQR}
        />

        {/* Add Item Modal */}
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