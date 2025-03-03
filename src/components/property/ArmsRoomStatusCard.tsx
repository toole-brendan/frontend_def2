import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import {
  Security as SecurityIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  AccessTime as AccessTimeIcon,
  ContactPhone as ContactPhoneIcon,
  History as HistoryIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';

export interface ArmsRoomStatusCardProps {
  location: string;
  securityStatus: 'SECURE' | 'UNSECURE' | 'MAINTENANCE';
  lastAccess: string;
  lastAccessPerson: string;
  lastAccessRole: string;
  currentCustodian: string;
  custodianAppointedDate: string;
  sopStatus: string;
  sopRevisionDate: string;
  weaponsStored: number;
  weaponsTotal: number;
  weaponsSignedOut: number;
  tempHandReceipts: number;
  maintenanceItems: number;
  onContactArmorer: () => void;
  onViewAccessLog: () => void;
  onReviewSOP: () => void;
}

const ArmsRoomStatusCard: React.FC<ArmsRoomStatusCardProps> = ({
  location,
  securityStatus,
  lastAccess,
  lastAccessPerson,
  lastAccessRole,
  currentCustodian,
  custodianAppointedDate,
  sopStatus,
  sopRevisionDate,
  weaponsStored,
  weaponsTotal,
  weaponsSignedOut,
  tempHandReceipts,
  maintenanceItems,
  onContactArmorer,
  onViewAccessLog,
  onReviewSOP
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Security Status */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SecurityIcon sx={{ mr: 1, color: securityStatus === 'SECURE' ? '#22C55E' : '#EF4444' }} />
            <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
              {location}
            </Typography>
            <Chip
              label={securityStatus}
              color={securityStatus === 'SECURE' ? 'success' : 'error'}
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Grid>

        {/* Last Access */}
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: '#1A1A1A', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" color="grey.500" gutterBottom>
              Last Access
            </Typography>
            <Typography variant="body1" color="white">
              {lastAccess} by {lastAccessPerson}
            </Typography>
            <Typography variant="body2" color="grey.500">
              {lastAccessRole}
            </Typography>
          </Box>
        </Grid>

        {/* Current Custodian */}
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: '#1A1A1A', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" color="grey.500" gutterBottom>
              Current Custodian
            </Typography>
            <Typography variant="body1" color="white">
              {currentCustodian}
            </Typography>
            <Typography variant="body2" color="grey.500">
              Appointed: {custodianAppointedDate}
            </Typography>
          </Box>
        </Grid>

        {/* Weapons Status */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: '#1A1A1A', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" color="grey.500" gutterBottom>
              Weapons Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h4" color="white">
                  {weaponsStored}
                </Typography>
                <Typography variant="body2" color="grey.500">
                  Stored
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4" color="white">
                  {weaponsSignedOut}
                </Typography>
                <Typography variant="body2" color="grey.500">
                  Signed Out
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4" color="white">
                  {weaponsTotal}
                </Typography>
                <Typography variant="body2" color="grey.500">
                  Total
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: '#1A1A1A', p: 2, borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="grey.500">
                  Temp Hand Receipts
                </Typography>
                <Typography variant="h5" color="white">
                  {tempHandReceipts}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="grey.500">
                  Maintenance Items
                </Typography>
                <Typography variant="h5" color="white">
                  {maintenanceItems}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ContactPhoneIcon />}
              onClick={onContactArmorer}
              sx={{ color: 'white', borderColor: 'grey.700' }}
            >
              Contact Armorer
            </Button>
            <Button
              variant="outlined"
              startIcon={<HistoryIcon />}
              onClick={onViewAccessLog}
              sx={{ color: 'white', borderColor: 'grey.700' }}
            >
              Access Log
            </Button>
            <Button
              variant="outlined"
              startIcon={<MenuBookIcon />}
              onClick={onReviewSOP}
              sx={{ color: 'white', borderColor: 'grey.700' }}
            >
              Review SOP
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArmsRoomStatusCard; 