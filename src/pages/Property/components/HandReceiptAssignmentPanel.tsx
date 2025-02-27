import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Stack,
  styled,
  Grid,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PrintIcon from '@mui/icons-material/Print';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { PropertyItem } from '../../../types/property';

interface HandReceiptAssignmentPanelProps {
  selectedItem: PropertyItem | null;
  onClose: () => void;
}

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
}));

const HandReceiptChain = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const HandReceiptAssignmentPanel: React.FC<HandReceiptAssignmentPanelProps> = ({ 
  selectedItem,
  onClose
}) => {
  if (!selectedItem) {
    return null;
  }

  // Determine hand receipt chain based on selected item
  const getHandReceiptChain = () => {
    const primaryHolder = 'CPT Rodriguez';
    let subHandReceiptHolder = '';
    let subSubHandReceiptHolder = '';
    
    switch (selectedItem.subHandReceipt) {
      case '1PLT':
        subHandReceiptHolder = '1LT Morgan (1st PLT)';
        subSubHandReceiptHolder = 'SSG Adams (Alpha Squad)';
        break;
      case '2PLT':
        subHandReceiptHolder = '1LT Chen (2nd PLT)';
        subSubHandReceiptHolder = 'SSG Brown (Alpha Squad)';
        break;
      case '3PLT':
        subHandReceiptHolder = '1LT Williams (3rd PLT)';
        subSubHandReceiptHolder = 'SSG Miller (Alpha Squad)';
        break;
      case 'HQ PLT':
        subHandReceiptHolder = '1LT Jackson (HQ PLT)';
        subSubHandReceiptHolder = 'SSG Rivera (Supply Room)';
        break;
      default:
        subHandReceiptHolder = 'N/A';
        subSubHandReceiptHolder = 'N/A';
    }
    
    return {
      primaryHolder,
      subHandReceiptHolder,
      subSubHandReceiptHolder
    };
  };

  const handReceiptChain = getHandReceiptChain();

  return (
    <Card variant="outlined">
      <CardHeader 
        title="Hand Receipt Assignment Panel" 
        subheader={`${selectedItem.nomenclature} (SN: ${selectedItem.serialNumber})`}
      />
      <CardContent>
        <HandReceiptChain>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Hand Receipt Chain
          </Typography>
          <List dense disablePadding>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Primary Hand Receipt" 
                secondary={handReceiptChain.primaryHolder} 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Sub-Hand Receipt" 
                secondary={handReceiptChain.subHandReceiptHolder} 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Sub-Sub-Hand Receipt" 
                secondary={
                  <Box display="flex" alignItems="center" gap={1}>
                    {handReceiptChain.subSubHandReceiptHolder}
                    <Chip 
                      size="small" 
                      icon={<VerifiedUserIcon />} 
                      label="Digitally verified" 
                      color="success" 
                    />
                  </Box>
                } 
              />
            </ListItem>
          </List>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Signed: 12JAN2025 (Digitally verified)
          </Typography>
        </HandReceiptChain>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Equipment Details
        </Typography>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">NSN:</Typography>
            <Typography variant="body2">{selectedItem.nsn}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">LIN:</Typography>
            <Typography variant="body2">{selectedItem.lin}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Serial Number:</Typography>
            <Typography variant="body2">{selectedItem.serialNumber}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Status:</Typography>
            <Typography variant="body2">
              <Chip 
                size="small" 
                label={selectedItem.status} 
                color={
                  selectedItem.status === 'FMC' ? 'success' :
                  selectedItem.status === 'NMCS' ? 'warning' :
                  selectedItem.status === 'NMCM' || selectedItem.status === 'NMC' ? 'error' : 'default'
                } 
              />
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Last Inventory:</Typography>
            <Typography variant="body2">{selectedItem.lastInventory}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Sensitive Item:</Typography>
            <Typography variant="body2">{selectedItem.isSensitiveItem ? 'Yes' : 'No'}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ActionButton
              variant="outlined"
              fullWidth
              startIcon={<SwapHorizIcon />}
            >
              Transfer to Different Sub-Hand Receipt
            </ActionButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionButton
              variant="outlined"
              fullWidth
              startIcon={<PrintIcon />}
            >
              Print Component Hand Receipt
            </ActionButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionButton
              variant="outlined"
              fullWidth
              startIcon={<AssignmentIcon />}
            >
              Generate Shortage Annex
            </ActionButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionButton
              variant="outlined"
              fullWidth
              startIcon={<UpdateIcon />}
            >
              Update Equipment Status
            </ActionButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HandReceiptAssignmentPanel; 