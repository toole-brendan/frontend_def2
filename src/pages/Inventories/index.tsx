import React from 'react';
import { 
  Box, 
  Button, 
  IconButton, 
  Tabs,
  Tab,
  Paper,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import { PageContainer, PageHeader } from '../../components/layout';
import {
  RefreshOutlined as RefreshIcon,
  QrCode as QrCodeIcon,
  CloudDownload as DownloadIcon,
  Dashboard as DashboardIcon,
  PlaylistAddCheck as ActiveInventoriesIcon,
  CalendarMonth as ScheduleIcon,
  Verified as ComplianceIcon,
  Build as ToolsIcon
} from '@mui/icons-material';
import {
  InventoriesHeader,
  InventoryScheduleCard,
  InventoryComplianceCard,
  InventoryProgressTracker,
  InventoryManagementTable,
  InventoryExecutionPanel,
  DiscrepancyManagementPanel,
  InventoryToolsCard,
  InventoryAnalyticsCard,
  ChangeOfCommandPlanner,
  InspectionPreparationCard,
  InventoryActivityLog
} from './components';

// Import new tab components (we'll create these later)
import InventoryOverviewTab from './tabs/InventoryOverviewTab';
import ActiveInventoriesTab from './tabs/ActiveInventoriesTab';
import SchedulePlanningTab from './tabs/SchedulePlanningTab';
import ComplianceReportsTab from './tabs/ComplianceReportsTab';
import ToolsResourcesTab from './tabs/ToolsResourcesTab';

// Create TabPanel component for rendering tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `inventory-tab-${index}`,
    'aria-controls': `inventory-tabpanel-${index}`,
  };
}

const InventoriesPage: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeInventory, setActiveInventory] = React.useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStartInventory = (inventoryId: string) => {
    setActiveInventory(inventoryId);
    // Switch to the Active Inventories tab
    setActiveTab(1);
  };

  // Header actions for the PageHeader
  const headerActions = (
    <>
      <IconButton 
        size="small"
        sx={{ 
          border: '1px solid rgba(140, 140, 160, 0.2)',
          borderRadius: 0,
        }}
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
      <Button 
        variant="outlined" 
        startIcon={<QrCodeIcon />}
        sx={{ 
          borderRadius: 0,
          borderColor: 'rgba(140, 140, 160, 0.2)',
          fontWeight: 'medium',
          letterSpacing: '0.03em',
        }}
      >
        Scan QR Code
      </Button>
      <Button 
        variant="outlined" 
        startIcon={<DownloadIcon />}
        sx={{ 
          borderRadius: 0,
          borderColor: 'rgba(140, 140, 160, 0.2)',
          fontWeight: 'medium',
          letterSpacing: '0.03em',
        }}
      >
        Export Data
      </Button>
    </>
  );

  return (
    <PageContainer
      header={
        <PageHeader 
          title="Inventories & Inspections"
          actions={headerActions}
        />
      }
    >
      {/* Tabs Navigation */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          borderRadius: 0
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          aria-label="inventory tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              minHeight: 48,
              fontSize: '0.9rem',
            }
          }}
        >
          <Tab 
            icon={<DashboardIcon fontSize="small" />} 
            iconPosition="start" 
            label="Inventory Overview" 
            {...a11yProps(0)} 
          />
          <Tab 
            icon={<ActiveInventoriesIcon fontSize="small" />} 
            iconPosition="start" 
            label="Active Inventories" 
            {...a11yProps(1)} 
          />
          <Tab 
            icon={<ScheduleIcon fontSize="small" />} 
            iconPosition="start" 
            label="Schedule & Planning" 
            {...a11yProps(2)} 
          />
          <Tab 
            icon={<ComplianceIcon fontSize="small" />} 
            iconPosition="start" 
            label="Compliance & Reports" 
            {...a11yProps(3)} 
          />
          <Tab 
            icon={<ToolsIcon fontSize="small" />} 
            iconPosition="start" 
            label="Tools & Resources" 
            {...a11yProps(4)} 
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={activeTab} index={0}>
        <InventoryOverviewTab onStartInventory={handleStartInventory} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <ActiveInventoriesTab 
          activeInventory={activeInventory} 
          onStartInventory={handleStartInventory} 
        />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <SchedulePlanningTab />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <ComplianceReportsTab />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <ToolsResourcesTab />
      </TabPanel>
    </PageContainer>
  );
};

export default InventoriesPage;
