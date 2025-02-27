import React from 'react';
import { Box } from '@mui/material';
import { PropertyItem } from '../../../types/property';
import { PropertySkeleton } from '../PropertySkeleton';
import { ErrorDisplay } from '../../../components/common/ErrorDisplay';
import EquipmentListTable from './EquipmentListTable';

interface EquipmentListPanelProps {
  equipmentList: PropertyItem[];
  loading: {
    summary: boolean;
    equipmentList: boolean;
    compliance: boolean;
  };
  error: {
    summary: string | null;
    equipmentList: string | null;
    compliance: string | null;
  };
  onRetry: () => void;
}

const EquipmentListPanel: React.FC<EquipmentListPanelProps> = ({
  equipmentList,
  loading,
  error,
  onRetry
}) => {
  const isLoading = loading.summary || loading.equipmentList || loading.compliance;
  const hasError = error.summary || error.equipmentList || error.compliance;
  const errorMessage = error.summary || error.equipmentList || error.compliance || "Failed to load property data";

  return (
    <Box>
      {isLoading ? (
        <PropertySkeleton />
      ) : hasError ? (
        <ErrorDisplay 
          title="Error Loading Property Data"
          message={errorMessage}
          onRetry={onRetry}
        />
      ) : (
        <EquipmentListTable 
          equipmentList={equipmentList}
          loading={isLoading}
        />
      )}
    </Box>
  );
};

export default EquipmentListPanel; 