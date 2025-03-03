import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  alpha,
  useTheme,
  Avatar,
} from '@mui/material';
import { CardHeader, StatusChip } from '../../components/common';
import { PageContainer, PageHeader } from '../../components/layout';
import {
  Print as PrintIcon,
  FileDownload as ExportIcon,
  Description as DocumentIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';

// Import our components
import { PropertyBookProvider, usePropertyBook } from './context/PropertyBookContext';
import { PropertyItem } from './types';
import PropertyBookPanel from './components/PropertyBookPanel';
import ItemDetailsModal from './components/ItemDetailsModal';
import TransferModal from './components/TransferModal';
import InventoryModal from './components/InventoryModal';
import AddItemModal from './components/AddItemModal';
import DA2062Modal from './components/DA2062Modal';
import { mockPropertyItems } from './mockData';

// Main component
const PropertyBookContent: React.FC = () => {
  const { propertyItems, selectedItems, da2062ModalOpen, closeDA2062Modal } = usePropertyBook();
  
  // Get the selected property items for the DA2062 modal
  const selectedPropertyItems = selectedItems
    .map(id => propertyItems.find(item => item.id === id))
    .filter((item): item is PropertyItem => !!item);
  const theme = useTheme();

  // Empty header actions (buttons removed)
  const headerActions = null;

  return (
      <PageContainer
        header={
          <PageHeader 
            title="Property Book" 
            actions={headerActions}
          />
        }
      >
        {/* Welcome Header */}
        <Box sx={{ 
          mb: 3, 
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mx: 3
        }}>
          <Box>
            <Typography variant="h4" fontWeight="500">
              B Company, 2-87 Infantry
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Total Line Items: {mockPropertyItems.length}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12, alignSelf: 'center' }} />
              <Typography variant="body2" color="text.secondary">
                Total Value: ${mockPropertyItems.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </Typography>
            </Box>
          </Box>
          
          {/* Buttons removed as requested */}
        </Box>

        {/* Summary Section */}
        <Paper sx={{ 
          p: 2, 
          mb: 3,
          bgcolor: '#121212',
          color: 'white'
        }}>
          <Typography variant="h6" gutterBottom>PROPERTY BOOK SUMMARY</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Overview of property book status and requirements
          </Typography>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Primary Hand Receipt Holder:</Typography>
                  <Typography variant="h6">CPT MICHAEL RODRIGUEZ</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Last Full Inventory:</Typography>
                  <Typography variant="h6">15JAN2025</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Next Required Inventory:</Typography>
                  <Typography variant="h6">15APR2025</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Days Remaining:</Typography>
                  <Typography variant="h6">60</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Typography variant="caption">
              <Box component="span" sx={{ color: theme.palette.success.main, fontWeight: 'medium' }}>100%</Box> of sensitive items accounted for
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Last Verified: 23FEB2025
            </Typography>
          </Box>
        </Paper>

        {/* Main Grid */}
        <Grid container spacing={3}>
          {/* Integrated Property Book Panel */}
          <Grid item xs={12} lg={9} xl={10}>
            <PropertyBookPanel />
          </Grid>

          {/* Right Column - Stats and Status */}
          <Grid item xs={12} lg={3} xl={2}>
            <Paper sx={{ 
              p: 3, 
              mb: 2, 
              borderRadius: 0, 
              position: 'sticky', 
              top: 16,
              bgcolor: '#121212',
              color: 'white'
            }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>PROPERTY DETAILS</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Summary and statistics</Typography>
              
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
              
              <Typography variant="body2" color="text.secondary" gutterBottom>Equipment Authorized</Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'medium', 
                  color: '#6e9eeb',
                  mb: 0.5 
                }}
              >
                {mockPropertyItems.reduce((sum, item) => sum + item.qtyAuth, 0)} 
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>items</Typography>
              
              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Shortage Status</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(theme.palette.error.main, 0.2), 
                      color: theme.palette.error.main,
                      width: 32,
                      height: 32,
                      borderRadius: 0
                    }}>
                      <ErrorIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h4" color="error.main" fontWeight="medium">
                      {mockPropertyItems.filter(item => item.qtyAuth > item.qtyOnHand).length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Excess Status</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.2), 
                      color: theme.palette.success.main,
                      width: 32,
                      height: 32,
                      borderRadius: 0
                    }}>
                      <CheckCircleIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h4" color="success.main" fontWeight="medium">
                      {mockPropertyItems.filter(item => item.qtyOnHand > item.qtyAuth).length}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Modal Components */}
        <ItemDetailsModal />
        <TransferModal />
        <InventoryModal />
        <AddItemModal />
        <DA2062Modal 
          open={da2062ModalOpen} 
          onClose={closeDA2062Modal}
          items={selectedPropertyItems}
        />
      </PageContainer>
  );
};

// Wrapper component that provides the context
export const PropertyBook: React.FC = () => {
  return (
    <PropertyBookProvider>
      <PropertyBookContent />
    </PropertyBookProvider>
  );
};

export default PropertyBook;
