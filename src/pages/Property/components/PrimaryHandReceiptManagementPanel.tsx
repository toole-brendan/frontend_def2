import React from 'react';
import { Grid } from '@mui/material';

// Import from the index file to ensure we're using the correct exports
import { HandReceiptOverviewCard, HandReceiptActionsCard } from './index';

interface PrimaryHandReceiptManagementPanelProps {
  onRetry: () => void;
}

const PrimaryHandReceiptManagementPanel: React.FC<PrimaryHandReceiptManagementPanelProps> = ({ 
  onRetry 
}) => {
  return (
    <Grid container spacing={3}>
      {/* Overview Card */}
      <Grid item xs={12} md={6}>
        <HandReceiptOverviewCard />
      </Grid>

      {/* Hand Receipt Actions */}
      <Grid item xs={12} md={6}>
        <HandReceiptActionsCard />
      </Grid>
    </Grid>
  );
};

export default PrimaryHandReceiptManagementPanel; 