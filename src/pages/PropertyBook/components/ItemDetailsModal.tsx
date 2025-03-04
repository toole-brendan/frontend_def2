import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  useTheme,
  IconButton,
  alpha,
  Theme,
} from '@mui/material';
import { Close as CloseIcon, EditOutlined as EditIcon, PrintOutlined as PrintIcon, LocationOn as LocationIcon, Build as MaintenanceIcon,  } from '@mui/icons-material';
import { PropertyItem } from '../types';
;
import { 
  modalContainerSx, 
  modalHeaderSx, 
  modalContentSx, 
  modalActionsSx, 
  buttonSx,
  statusFMCSx,
  statusPMCSx,
  statusNMCSx,
  statusAdminSx 
} from '../../../theme/patterns';

interface ItemDetailsModalProps {
  open: boolean;
  onClose: () => void;
  item: PropertyItem | null;
}

// Helper function to get status style
const getStatusStyle = (theme: Theme, status: string) => {
  switch(status) {
    case 'FMC': return statusFMCSx(theme);
    case 'PMC': return statusPMCSx(theme);
    case 'NMC': return statusNMCSx(theme);
    case 'ADMIN': return statusAdminSx(theme);
    default: return {};
  }
};

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ open, onClose, item }) => {
  const theme = useTheme();
  
  // If no item, don't render the modal contents
  if (!item) return <Modal open={open} onClose={onClose}><Box></Box></Modal>;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalContainerSx}>
        {/* Modal Header */}
        <Box sx={modalHeaderSx(theme)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="medium">
              Item Details
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={item.status} 
                size="small" 
                sx={getStatusStyle(theme, item.status)}
              />
              <IconButton size="small" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        
        {/* Modal Content */}
        <Box sx={modalContentSx}>
          <Grid container spacing={3}>
            {/* Left Column - Item Data */}
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                {/* NSN & Part Number */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    NSN
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {item.nsn}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    LIN
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {item.lin}
                  </Typography>
                </Grid>
              
                {/* Category & Serial Number */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {item.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Serial Number
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {item.serialNumber}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                
                {/* Description */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Nomenclature
                  </Typography>
                  <Typography variant="body1">
                    {item.nomenclature}
                  </Typography>
                </Grid>
                
                {/* Quantities */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Quantity Authorized
                  </Typography>
                  <Typography variant="body1">
                    {item.qtyAuth}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Value
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    ${item.value?.toLocaleString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                
                {/* Location & Accountability */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Current Location
                  </Typography>
                  <Typography variant="body1">
                    {item.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    Hand Receipt Holder
                  </Typography>
                  <Typography variant="body1">
                    {item.handReceiptHolder}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Right Column - Item Actions & Additional Data */}
            <Grid item xs={12} md={5}>
              <Box sx={{
                p: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                  Quick Actions
                </Typography>
                
                <Grid container spacing={1}>
                  {/* Edit Item */}
                  <Grid item xs={6} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<EditIcon />}
                      size="small"
                      sx={buttonSx}
                    >
                      Edit Item
                    </Button>
                  </Grid>
                  
                  {/* Print Details */}
                  <Grid item xs={6} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<PrintIcon />}
                      size="small"
                      sx={buttonSx}
                    >
                      Print Details
                    </Button>
                  </Grid>
                  
                  {/* View Location */}
                  <Grid item xs={6} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<LocationIcon />}
                      size="small"
                      sx={buttonSx}
                    >
                      View Location
                    </Button>
                  </Grid>
                  
                  {/* Maintenance */}
                  <Grid item xs={6} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<MaintenanceIcon />}
                      size="small"
                      sx={buttonSx}
                    >
                      Maintenance
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Additional Item Details */}
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                Additional Details
              </Typography>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Verified
                </Typography>
                <Typography variant="body2">
                  {item.lastVerified || 'Not verified yet'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Sub-Category
                </Typography>
                <Typography variant="body2">
                  {item.subCategory || 'Not categorized'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Quantity On Hand
                </Typography>
                <Typography variant="body2">
                  {item.qtyOnHand}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {/* Modal Footer */}
        <Box sx={modalActionsSx(theme)}>
          <Button variant="outlined" color="inherit" onClick={onClose} sx={buttonSx}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemDetailsModal;
