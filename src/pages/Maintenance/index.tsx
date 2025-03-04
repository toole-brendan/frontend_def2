import React, { useState } from 'react';
import { 
  Grid, 
  Button,
  Stack,
  useTheme 
} from '@mui/material';
import { 
  Add as AddIcon,
  QrCode as QrCodeIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { PageContainer, PageHeader } from '../../components/layout';
import MaintenanceStatusOverview from './components/MaintenanceStatusOverview';
import MaintenanceRequestNavigator from './components/MaintenanceRequestNavigator';
import RequestFilters from './components/RequestFilters';
import MaintenanceRequestTable from './components/MaintenanceRequestTable';
import PartsManagementCard from './components/PartsManagementCard';
import { actionButtonSx } from './styles';

const Maintenance: React.FC = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('my-requests');
  const [, setFilters] = useState<Record<string, string>>({});
  
  // Modal state
  const [, setQrScannerOpen] = useState(false);
  const [, setNewRequestOpen] = useState(false);
  const [, setRequestDetailOpen] = useState(false);
  const [, setSelectedRequestId] = useState<string | null>(null);
  
  const handleScanQrCode = () => {
    setQrScannerOpen(true);
  };
  
  const handleCreateNewRequest = () => {
    setNewRequestOpen(true);
  };
  
  const handleViewRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setRequestDetailOpen(true);
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };
  
  const handleTrackPart = (partId: string) => {
    console.log('Tracking part:', partId);
    // Implement part tracking functionality
  };
  
  const handleExpeditePart = (partId: string) => {
    console.log('Expediting part:', partId);
    // Implement part expedite functionality
  };

  return (
    <PageContainer
      header={
        <PageHeader 
          title="Maintenance"
          actions={
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNewRequest}
                sx={actionButtonSx(theme)}
              >
                Submit New Request
              </Button>
              <Button
                variant="outlined"
                startIcon={<QrCodeIcon />}
                onClick={handleScanQrCode}
                sx={actionButtonSx(theme)}
              >
                Scan QR Code
              </Button>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                sx={actionButtonSx(theme)}
              >
                Print DA Form 5988-E
              </Button>
            </Stack>
          }
        />
      }
    >
      <Grid container spacing={3}>
        {/* Top Section - Status Overview */}
        <Grid item xs={12}>
          <MaintenanceStatusOverview onScanQrCode={handleScanQrCode} />
        </Grid>
        
        {/* Main Content Area - Three-Panel Layout */}
        <Grid container item xs={12} spacing={3}>
          {/* Left Panel */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              <MaintenanceRequestNavigator onCategorySelect={handleCategorySelect} />
              <RequestFilters onFilterChange={handleFilterChange} />
            </Stack>
          </Grid>
          
          {/* Center Panel */}
          <Grid item xs={12} md={6}>
            <MaintenanceRequestTable 
              category={selectedCategory} 
              onViewRequest={handleViewRequest} 
            />
          </Grid>
          
          {/* Right Panel */}
          <Grid item xs={12} md={3}>
            <PartsManagementCard 
              onTrackPart={handleTrackPart}
              onExpeditePart={handleExpeditePart}
              onOrderParts={() => console.log('Order parts')}
              onTrackShipments={() => console.log('Track shipments')}
              onManageInventory={() => console.log('Manage inventory')}
            />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Maintenance;
