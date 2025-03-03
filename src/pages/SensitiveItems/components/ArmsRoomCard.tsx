import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Avatar, 
  useTheme 
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  Person as PersonIcon, 
  AccessTime as AccessTimeIcon, 
  Description as DescriptionIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';
import { ArmsRoomInfo } from '../../../types/sensitiveItems';

interface ArmsRoomCardProps {
  armsRoom: ArmsRoomInfo;
}

/**
 * ArmsRoomCard component displays the arms room status
 */
const ArmsRoomCard: React.FC<ArmsRoomCardProps> = ({ armsRoom }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ 
      borderRadius: 0, 
      p: 0, 
      mb: 3, 
      bgcolor: 'background.paper', 
      border: '1px solid rgba(140, 140, 160, 0.12)' 
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        borderBottom: '1px solid rgba(140, 140, 160, 0.12)' 
      }}>
        <Avatar 
          sx={{ 
            bgcolor: alpha(theme.palette.success.main, 0.15),
            color: theme.palette.success.main,
            width: 32,
            height: 32,
            borderRadius: 0
          }}
        >
          <ShieldIcon fontSize="small" />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
          {armsRoom.name}
        </Typography>
        <Box sx={{ 
          ml: 'auto', 
          bgcolor: alpha(theme.palette.success.main, 0.1), 
          px: 2, 
          py: 0.5, 
          borderRadius: 0,
          color: theme.palette.success.main,
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}>
          {armsRoom.status}
        </Box>
      </Box>
      
      {/* Last Access and Custodian */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Last Access */}
        <Box sx={{ 
          width: { xs: '100%', sm: '50%' }, 
          p: 2, 
          borderRight: { xs: 'none', sm: '1px solid rgba(140, 140, 160, 0.12)' }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Last Access
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
            {armsRoom.lastAccess.timestamp}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            BY {armsRoom.lastAccess.person}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {armsRoom.lastAccess.role}
          </Typography>
        </Box>
        
        {/* Current Custodian */}
        <Box sx={{ 
          width: { xs: '100%', sm: '50%' }, 
          p: 2
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Current Custodian
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            {armsRoom.custodian.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Appointed: {armsRoom.custodian.appointedDate}
          </Typography>
        </Box>
      </Box>
      
      {/* Weapons Status */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(140, 140, 160, 0.12)' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Weapons Status
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {armsRoom.weapons.stored}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stored
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {armsRoom.weapons.signedOut}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Signed Out
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {armsRoom.weapons.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      {/* Additional Status */}
      <Box sx={{ 
        display: 'flex', 
        borderTop: '1px solid rgba(140, 140, 160, 0.12)'
      }}>
        <Box sx={{ 
          width: '50%', 
          p: 2, 
          borderRight: '1px solid rgba(140, 140, 160, 0.12)'
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Temp Hand Receipts
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {armsRoom.tempHandReceipts}
          </Typography>
        </Box>
        <Box sx={{ width: '50%', p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Maintenance Items
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {armsRoom.maintenanceItems}
          </Typography>
        </Box>
      </Box>
      
      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        p: 2, 
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderTop: '1px solid rgba(140, 140, 160, 0.12)'
      }}>
        <Button 
          variant="outlined" 
          startIcon={<PersonIcon />} 
          sx={{ borderRadius: 0 }}
        >
          Contact Armorer
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<AccessTimeIcon />} 
          sx={{ borderRadius: 0 }}
        >
          Access Log
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<DescriptionIcon />} 
          sx={{ borderRadius: 0 }}
        >
          Review SOP
        </Button>
      </Box>
    </Paper>
  );
};

export default ArmsRoomCard;
