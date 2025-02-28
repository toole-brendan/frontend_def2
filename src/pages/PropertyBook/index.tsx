import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Paper,
  Divider,
  Tabs,
  Tab,
  Typography,
  ButtonGroup,
  Button,
  Breadcrumbs,
  Link,
  styled,
  useTheme,
  Collapse,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterListIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import { TreeView, TreeItem } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import { ResponsiveContainer, Treemap } from 'recharts';
import { 
  EquipmentCategoryTree, 
  FilterPanel, 
  PropertyBookTable, 
  BulkActionToolbar,
  StatsCards,
  PropertyItem,
  HandReceiptStructure,
  PropertyBookSummaryCard,
  HandReceiptManagementCard,
  SensitiveItemsStatusCard,
  PropertyTransactionHistory
} from './components';
import PropertyBookHeader from './components/PropertyBookHeader';
import { usePropertyBook } from './hooks/usePropertyBook';
import { mockPropertyItems } from './mockData';
import { FilterState } from './types';

// Styled components for layout
const PageWrapper = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  overflow: 'auto',
  position: 'relative',
  minHeight: 0,
}));

const CategorySection = styled(Box)(({ theme }) => ({
  width: '240px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

const RightPanel = styled(Box)(({ theme }) => ({
  width: '300px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
}));

const TableSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  gap: theme.spacing(2),
  minHeight: 0,
}));

const BottomSection = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  overflow: 'auto',
  maxHeight: '200px',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  padding: theme.spacing(2),
  flex: 1,
}));

// Header components
const HeaderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  overflow: 'visible',
  flexShrink: 0,
  '& .MuiTabs-root': {
    minHeight: 'auto',
  },
  '& .MuiTab-root': {
    minHeight: '48px',
    padding: theme.spacing(1, 2),
  },
  '& .MuiBreadcrumbs-ol': {
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}));

// Add new styled components for progressive disclosure
const CollapsibleSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PropertyBook: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    location: 'All Locations',
    handReceiptHolder: 'All Hand Receipt Holders',
    searchText: '',
    category: 'all',
    verifiedAfter: '',
    verifiedBefore: '',
  });
  const [expandedSections, setExpandedSections] = useState({
    filters: false,
    categories: true,
    handReceipts: false,
    details: false,
    history: false
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { 
    handleTabChange,
    handleCategorySelect,
    handleFilterChange,
    handleSelectionChange,
    handleRowAction,
    handleBulkAction,
    getFilteredItems
  } = usePropertyBook({
    filters,
    setFilters,
    selectedItems,
    setSelectedItems,
    showSnackbar: () => {},
    propertyItems: mockPropertyItems
  });

  const handleHeaderAction = (action: 'generate' | 'print' | 'certify' | 'search') => {
    console.log('Header action:', action);
  };

  const filteredItems = getFilteredItems();

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <PageWrapper>
      <HeaderSection>
        <PropertyBookHeader 
          unit="B Company, 2-87 Infantry"
          primaryHolder={{
            name: "Michael Rodriguez",
            rank: "CPT"
          }}
          stats={{
            totalLineItems: 721,
            totalValue: "$4,237,580",
            lastReconciliation: "15FEB2025"
          }}
          onAction={handleHeaderAction}
        />

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
          <ButtonGroup size="small">
            <Tooltip title="List View">
              <IconButton 
                color={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              >
                <ViewListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Grid View">
              <IconButton
                color={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              >
                <ViewModuleIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>

        {/* Navigation Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Primary Hand Receipt" />
          <Tab label="Sub-Hand Receipts" />
          <Tab label="Shortage Annexes" />
        </Tabs>

        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          sx={{ 
            mt: 1,
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'nowrap',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }
          }}
        >
          <Link color="inherit" href="#">Property Book</Link>
          <Link color="inherit" href="#">Primary Hand Receipt</Link>
          <Typography color="textPrimary" noWrap>Current View</Typography>
        </Breadcrumbs>
      </HeaderSection>

      <ContentWrapper>
        {/* Left Panel with Collapsible Sections */}
        <CategorySection>
          <CollapsibleSection>
            <SectionHeader onClick={() => toggleSection('categories')}>
              <Typography variant="subtitle1">Equipment Categories</Typography>
              <IconButton size="small">
                {expandedSections.categories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </SectionHeader>
            <Collapse in={expandedSections.categories}>
              <StyledPaper elevation={0}>
                <EquipmentCategoryTree onCategorySelect={handleCategorySelect} />
              </StyledPaper>
            </Collapse>
          </CollapsibleSection>

          <CollapsibleSection>
            <SectionHeader onClick={() => toggleSection('handReceipts')}>
              <Typography variant="subtitle1">Hand Receipt Structure</Typography>
              <IconButton size="small">
                {expandedSections.handReceipts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </SectionHeader>
            <Collapse in={expandedSections.handReceipts}>
              <StyledPaper elevation={0}>
                <HandReceiptStructure />
              </StyledPaper>
            </Collapse>
          </CollapsibleSection>

          <CollapsibleSection>
            <SectionHeader onClick={() => toggleSection('filters')}>
              <Typography variant="subtitle1">Filters</Typography>
              <IconButton size="small">
                {expandedSections.filters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </SectionHeader>
            <Collapse in={expandedSections.filters}>
              <StyledPaper elevation={0}>
                <FilterPanel 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  selectedCategory={filters.category}
                />
              </StyledPaper>
            </Collapse>
          </CollapsibleSection>
        </CategorySection>

        {/* Main Content Area */}
        <MainContent>
          <TableSection>
            {selectedItems.length > 0 && (
              <BulkActionToolbar 
                selectedItems={selectedItems.map(id => {
                  const item = mockPropertyItems.find(item => item.id === id);
                  return item as PropertyItem;
                })} 
                onBulkAction={handleBulkAction}
                onClearSelection={handleClearSelection}
              />
            )}
            
            <StyledPaper sx={{ flex: 1 }}>
              <PropertyBookTable 
                items={filteredItems}
                filters={filters}
                loading={false}
                onSelectionChange={handleSelectionChange}
                onRowAction={handleRowAction}
                onBulkAction={handleBulkAction}
                viewMode={viewMode}
              />
            </StyledPaper>
          </TableSection>
        </MainContent>

        {/* Right Panel with Collapsible Sections */}
        <RightPanel>
          <CollapsibleSection>
            <SectionHeader onClick={() => toggleSection('details')}>
              <Typography variant="subtitle1">Property Details</Typography>
              <IconButton size="small">
                {expandedSections.details ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </SectionHeader>
            <Collapse in={expandedSections.details}>
              <PropertyBookSummaryCard />
              <HandReceiptManagementCard />
              <SensitiveItemsStatusCard />
            </Collapse>
          </CollapsibleSection>

          <CollapsibleSection>
            <SectionHeader onClick={() => toggleSection('history')}>
              <Typography variant="subtitle1">Transaction History</Typography>
              <IconButton size="small">
                {expandedSections.history ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </SectionHeader>
            <Collapse in={expandedSections.history}>
              <PropertyTransactionHistory />
            </Collapse>
          </CollapsibleSection>
        </RightPanel>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default PropertyBook; 