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
  Button,
  Divider,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Tabs,
  Tab,
  Menu,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LinkIcon from '@mui/icons-material/Link';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { format } from 'date-fns';
import { useProperty } from '../../hooks/useProperty';
import { PropertySkeleton } from './PropertySkeleton';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { PropertyItem } from '../../types/property';
import PageTitle from '../../components/common/PageTitle';
import { 
  SubHandReceiptStatusTable, 
  SubHandReceiptActions, 
  PbuseIntegrationPanel,
  EquipmentSearchFilter,
  EquipmentTable,
  HandReceiptAssignmentPanel,
  DAForm2062PreviewPanel,
  ToolIntegrationPanel,
  PropertyHeader,
  PrimaryHandReceiptManagementPanel,
  SubHandReceiptManagementPanel,
  DigitalHandReceiptPreviewPanel,
  EquipmentDetailPanel,
  EquipmentListPanel
} from './components';
import { EquipmentFilters } from './components/EquipmentSearchFilter';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(3),
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

const StatusIndicator = styled(Box)<{ status: 'success' | 'warning' | 'error' }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette[status].main,
  '& svg': {
    fontSize: '1rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
}));

// Sub-hand receipt tree item
interface TreeItemProps {
  depth?: number;
}

const TreeItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'depth',
})<TreeItemProps>(({ theme, depth = 0 }) => ({
  paddingLeft: theme.spacing(2 + depth * 3),
  borderLeft: depth > 0 ? `1px dashed ${theme.palette.divider}` : 'none',
  marginLeft: depth > 0 ? theme.spacing(2) : 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-tabpanel-${index}`}
      aria-labelledby={`property-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Collapsible card component
interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  isPinnable?: boolean;
  id: string;
  pinnedCards: string[];
  onTogglePin: (id: string) => void;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  defaultExpanded = false,
  isPinnable = false,
  id,
  pinnedCards,
  onTogglePin
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || pinnedCards.includes(id));
  const isPinned = pinnedCards.includes(id);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTogglePin(id);
  };

  return (
    <DashboardCard>
      <div 
        className="card-header" 
        onClick={handleToggleExpand}
        style={{ cursor: 'pointer' }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isPinnable && (
            <Tooltip title={isPinned ? "Unpin from dashboard" : "Pin to dashboard"}>
              <IconButton size="small" onClick={handleTogglePin} sx={{ mr: 1 }}>
                {isPinned ? <PushPinIcon fontSize="small" /> : <PushPinOutlinedIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}
          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </div>
      <Collapse in={expanded}>
        <div className="card-content">
          {children}
        </div>
      </Collapse>
    </DashboardCard>
  );
};

const Property: React.FC = () => {
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // Action menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // Pinned cards state
  const [pinnedCards, setPinnedCards] = useState<string[]>(['primary-hand-receipt']);
  
  const [selectedItem, setSelectedItem] = useState<PropertyItem | null>(null);
  const [equipmentFilters, setEquipmentFilters] = useState<EquipmentFilters>({
    searchQuery: '',
    authorization: 'ALL',
    handReceipt: 'ALL',
    category: 'ALL',
    status: 'ALL',
  });

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
        await loadSummary();
        await loadEquipmentList();
        await loadComplianceStatus();
      } catch (error) {
        console.error('Error in Property component:', error);
      }
    };
    loadData();
  }, [loadSummary, loadEquipmentList, loadComplianceStatus]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSelectItem = (item: PropertyItem) => {
    setSelectedItem(item);
  };

  const handleClosePanel = () => {
    setSelectedItem(null);
  };

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
  };

  const handleTogglePin = (id: string) => {
    setPinnedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id) 
        : [...prev, id]
    );
  };

  const handleFilterChange = (filters: EquipmentFilters) => {
    setEquipmentFilters(filters);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section with Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <PropertyHeader />
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mr: 1 }}
              onClick={handleRetry}
              startIcon={<RefreshIcon />}
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              onClick={handleActionsClick}
              endIcon={<MoreVertIcon />}
            >
              Actions
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleActionsClose}
            >
              <MenuItem onClick={handleActionsClose}>Generate DA Form 2062</MenuItem>
              <MenuItem onClick={handleActionsClose}>Export to Excel</MenuItem>
              <MenuItem onClick={handleActionsClose}>Print Hand Receipt</MenuItem>
              <MenuItem onClick={handleActionsClose}>PBUSE Integration</MenuItem>
              <MenuItem onClick={handleActionsClose}>Tool Integration</MenuItem>
              <Divider />
              <MenuItem onClick={handleActionsClose}>Manage Pinned Cards</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Tabs Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="property management tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Overview" id="property-tab-0" aria-controls="property-tabpanel-0" />
            <Tab label="Equipment" id="property-tab-1" aria-controls="property-tabpanel-1" />
            <Tab label="Hand Receipts" id="property-tab-2" aria-controls="property-tabpanel-2" />
            <Tab label="Integrations" id="property-tab-3" aria-controls="property-tabpanel-3" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <CollapsibleCard 
            title="PRIMARY HAND RECEIPT MANAGEMENT" 
            id="primary-hand-receipt"
            defaultExpanded={true}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <PrimaryHandReceiptManagementPanel onRetry={handleRetry} />
          </CollapsibleCard>

          <CollapsibleCard 
            title="SUB-HAND RECEIPT MANAGEMENT" 
            id="sub-hand-receipt"
            defaultExpanded={false}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <SubHandReceiptManagementPanel />
          </CollapsibleCard>

          <CollapsibleCard 
            title="EQUIPMENT SUMMARY" 
            id="equipment-summary"
            defaultExpanded={false}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <EquipmentListPanel 
              equipmentList={equipmentList}
              loading={loading}
              error={error}
              onRetry={handleRetry}
            />
          </CollapsibleCard>
        </TabPanel>

        {/* Equipment Tab */}
        <TabPanel value={tabValue} index={1}>
          <CollapsibleCard 
            title="EQUIPMENT SEARCH & FILTERS" 
            id="equipment-filters"
            defaultExpanded={true}
            isPinnable={false}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <EquipmentSearchFilter onFilterChange={handleFilterChange} />
          </CollapsibleCard>

          <CollapsibleCard 
            title="EQUIPMENT LIST" 
            id="equipment-list"
            defaultExpanded={true}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <EquipmentTable 
              equipmentList={equipmentList}
              filters={equipmentFilters}
              onSelectItem={handleSelectItem}
            />
          </CollapsibleCard>

          {selectedItem && (
            <CollapsibleCard 
              title="EQUIPMENT DETAILS" 
              id="equipment-details"
              defaultExpanded={true}
              isPinnable={false}
              pinnedCards={pinnedCards}
              onTogglePin={handleTogglePin}
            >
              <EquipmentDetailPanel 
                equipmentList={equipmentList}
                selectedItem={selectedItem}
                onSelectItem={handleSelectItem}
                onClosePanel={handleClosePanel}
              />
            </CollapsibleCard>
          )}
        </TabPanel>

        {/* Hand Receipts Tab */}
        <TabPanel value={tabValue} index={2}>
          <CollapsibleCard 
            title="HAND RECEIPT ASSIGNMENT" 
            id="hand-receipt-assignment"
            defaultExpanded={true}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <HandReceiptAssignmentPanel 
              selectedItem={selectedItem}
              onClose={handleClosePanel}
            />
          </CollapsibleCard>

          <CollapsibleCard 
            title="SUB-HAND RECEIPT STATUS" 
            id="sub-hand-receipt-status"
            defaultExpanded={true}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <SubHandReceiptStatusTable />
          </CollapsibleCard>

          <CollapsibleCard 
            title="DA FORM 2062 PREVIEW" 
            id="da-form-preview"
            defaultExpanded={false}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <DAForm2062PreviewPanel />
          </CollapsibleCard>
        </TabPanel>

        {/* Integrations Tab */}
        <TabPanel value={tabValue} index={3}>
          <CollapsibleCard 
            title="PBUSE INTEGRATION" 
            id="pbuse-integration"
            defaultExpanded={true}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <PbuseIntegrationPanel />
          </CollapsibleCard>

          <CollapsibleCard 
            title="TOOL INTEGRATION" 
            id="tool-integration"
            defaultExpanded={true}
            isPinnable={true}
            pinnedCards={pinnedCards}
            onTogglePin={handleTogglePin}
          >
            <ToolIntegrationPanel />
          </CollapsibleCard>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Property; 