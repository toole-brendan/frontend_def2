import React from 'react';
import { 
  Box, 
  Typography, 
  Alert, 
  Button,
  Grid,
  Chip
} from '@mui/material';
import { WarningAmber as WarningIcon } from '@mui/icons-material';

interface SensitiveItemsHeaderProps {
  companyInfo: string;
  alertMessage?: string;
  daysRemaining?: number;
  totalItems: number;
  accountedItems: number;
  lastInventory: string;
  lastInventoryOfficer: string;
  nextRequired: string;
  regulation: string;
  onConductInventory: () => void;
  onPrintList: () => void;
  onReportMissing: () => void;
}

const SensitiveItemsHeader: React.FC<SensitiveItemsHeaderProps> = ({
  companyInfo,
  alertMessage,
  daysRemaining,
  totalItems,
  accountedItems,
  lastInventory,
  lastInventoryOfficer,
  nextRequired,
  regulation,
  onConductInventory,
  onPrintList,
  onReportMissing
}) => {
  const percentage = totalItems > 0 ? Math.round((accountedItems / totalItems) * 100) : 0;
  const showAlert = daysRemaining !== undefined && daysRemaining <= 7;
  
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Sensitive Items Management - {companyInfo}
      </Typography>
      
      {showAlert && (
        <Alert 
          icon={<WarningIcon />}
          severity="warning"
          variant="filled" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" variant="outlined" size="small">
              View Details
            </Button>
          }
        >
          {alertMessage || `SENSITIVE ITEM INVENTORY REQUIRED: ${daysRemaining} DAYS REMAINING`}
        </Alert>
      )}
      
      {/* Critical Stats */}
      <Grid container sx={{ mb: 2 }} spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Total Sensitive Items
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {totalItems}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Status
            </Typography>
            <Typography variant="h5" fontWeight="bold" color={percentage === 100 ? 'success.main' : 'warning.main'}>
              {accountedItems}/{totalItems} Accounted For ({percentage}%)
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Inventory
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {lastInventory} <Typography component="span" variant="body2" fontStyle="italic">({lastInventoryOfficer})</Typography>
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Next Required
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" fontWeight="bold" color={daysRemaining && daysRemaining <= 3 ? 'error.main' : 'text.primary'}>
                {nextRequired}
              </Typography>
              <Chip 
                size="small" 
                label={regulation} 
                sx={{ ml: 1, fontSize: '0.7rem' }} 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onConductInventory}
          size="large"
        >
          Conduct Inventory
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={onPrintList}
          size="large"
        >
          Print Sensitive Items List
        </Button>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={onReportMissing}
          size="large"
        >
          Report Missing Item
        </Button>
      </Box>
    </Box>
  );
};

export default SensitiveItemsHeader; 