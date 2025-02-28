import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Grid,
  Button,
  Stack
} from '@mui/material';
import {
  Verified as VerifiedIcon,
  LockPerson as LockPersonIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  ContactPage as ContactPageIcon,
  Visibility as VisibilityIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';

interface ArmsRoomStatusCardProps {
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
  const getStatusColor = (status: string): 'success' | 'error' | 'warning' => {
    if (status === 'SECURE') return 'success';
    if (status === 'UNSECURE') return 'error';
    return 'warning';
  };

  return (
    <Paper elevation={2} sx={{ height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          Arms Room Status - {location}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Security Status Banner */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            bgcolor: securityStatus === 'SECURE' ? 'success.light' : securityStatus === 'UNSECURE' ? 'error.light' : 'warning.light',
            color: securityStatus === 'SECURE' ? 'success.dark' : securityStatus === 'UNSECURE' ? 'error.dark' : 'warning.dark',
            borderRadius: 1,
            p: 1.5,
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LockPersonIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              Arms Room Security: {securityStatus}
            </Typography>
          </Box>
          <Chip 
            icon={securityStatus === 'SECURE' ? <VerifiedIcon /> : undefined} 
            label={securityStatus === 'SECURE' ? '✓' : '!'} 
            color={getStatusColor(securityStatus)} 
            variant="filled"
          />
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <AccessTimeIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Last Access:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                {lastAccess} ({lastAccessPerson}, {lastAccessRole})
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <PersonIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Current Custodian:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                {currentCustodian} (Appointed: {custodianAppointedDate})
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DescriptionIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Arms Room SOP:
              </Typography>
              <Chip 
                label={sopStatus} 
                size="small" 
                color="success" 
                sx={{ ml: 1 }} 
                variant="outlined"
              />
              <Typography variant="caption" sx={{ ml: 1 }}>
                (Rev. {sopRevisionDate})
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Quick Metrics
            </Typography>
            
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Weapons Stored:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {weaponsStored}/{weaponsTotal}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Weapons Signed Out:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {weaponsSignedOut}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Temporary Hand Receipts:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {tempHandReceipts}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Maintenance Items:
                </Typography>
                <Typography variant="body2" fontWeight="medium" color={maintenanceItems > 0 ? 'warning.main' : 'text.primary'}>
                  {maintenanceItems}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<ContactPageIcon />}
            onClick={onContactArmorer}
          >
            Contact Armorer
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={onViewAccessLog}
          >
            View Access Log
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<MenuBookIcon />}
            onClick={onReviewSOP}
          >
            Review SOP
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ArmsRoomStatusCard; 