import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  styled,
} from '@mui/material';
import { PropertyItem } from '../../../types/property';
import { EquipmentSearchFilter } from './index';
import { EquipmentTable } from './index';
import { HandReceiptAssignmentPanel } from './index';
import { EquipmentFilters } from './EquipmentSearchFilter';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
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

interface EquipmentDetailPanelProps {
  equipmentList: PropertyItem[];
  selectedItem: PropertyItem | null;
  onSelectItem: (item: PropertyItem) => void;
  onClosePanel: () => void;
}

const EquipmentDetailPanel: React.FC<EquipmentDetailPanelProps> = ({
  equipmentList,
  selectedItem,
  onSelectItem,
  onClosePanel
}) => {
  const [equipmentFilters, setEquipmentFilters] = React.useState<EquipmentFilters>({
    searchQuery: '',
    authorization: 'ALL',
    handReceipt: 'ALL',
    category: 'ALL',
    status: 'ALL',
  });

  return (
    <DashboardCard sx={{ mb: 4 }}>
      <div className="card-header">
        <Typography variant="h6">EQUIPMENT DETAIL & HAND RECEIPT ASSIGNMENT</Typography>
      </div>
      <div className="card-content">
        <Grid container spacing={3}>
          {/* Equipment Search & Filter */}
          <Grid item xs={12}>
            <EquipmentSearchFilter onFilterChange={setEquipmentFilters} />
          </Grid>
          
          {/* Equipment Table and Hand Receipt Assignment Panel */}
          <Grid item xs={12} md={selectedItem ? 8 : 12}>
            <EquipmentTable 
              equipmentList={equipmentList} 
              filters={equipmentFilters}
              onSelectItem={onSelectItem}
            />
          </Grid>
          
          {/* Hand Receipt Assignment Panel (conditional rendering) */}
          {selectedItem && (
            <Grid item xs={12} md={4}>
              <HandReceiptAssignmentPanel 
                selectedItem={selectedItem}
                onClose={onClosePanel}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </DashboardCard>
  );
};

export default EquipmentDetailPanel; 