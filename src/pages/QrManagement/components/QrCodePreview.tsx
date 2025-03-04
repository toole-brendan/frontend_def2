import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  alpha, 
  useTheme, 
  Divider, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { QrCode as QrCodeIcon, Check as CheckIcon } from '@mui/icons-material';

const QrCodePreview: React.FC = () => {
  const theme = useTheme();
  
  const paperSx = {
    p: 3,
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
  };

  return (
    <Paper sx={paperSx}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        QR Code Preview
      </Typography>
      
      {/* QR Code Visualization */}
      <Box 
        sx={{ 
          mt: 2, 
          p: 2, 
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 220,
          backgroundColor: alpha(theme.palette.background.default, 0.5)
        }}
      >
        <QrCodeIcon sx={{ fontSize: 120, color: alpha(theme.palette.text.primary, 0.15), mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          QR Code will appear here once data is submitted
        </Typography>
      </Box>
      
      {/* QR Details */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          QR Code Details
        </Typography>
        <Box 
          sx={{ 
            p: 2, 
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            borderRadius: 1,
            mt: 1
          }}
        >
          <Typography variant="body2" gutterBottom>
            <strong>Type:</strong> Equipment Tracking
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Format:</strong> Data Matrix Code  
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Size:</strong> Medium (2" x 2")
          </Typography>
          <Typography variant="body2">
            <strong>Material:</strong> Standard Paper
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {/* What Happens Next */}
      <Typography variant="subtitle2" gutterBottom>
        What Happens Next
      </Typography>
      <List dense sx={{ mt: 1 }}>
        <ListItem sx={{ px: 1 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              1
            </Box>
          </ListItemIcon>
          <ListItemText 
            primary="Digital twin record created with unique ID" 
            primaryTypographyProps={{ variant: 'body2' }} 
          />
        </ListItem>
        <ListItem sx={{ px: 1 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              2
            </Box>
          </ListItemIcon>
          <ListItemText 
            primary="QR code generated and verified on blockchain" 
            primaryTypographyProps={{ variant: 'body2' }} 
          />
        </ListItem>
        <ListItem sx={{ px: 1 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              3
            </Box>
          </ListItemIcon>
          <ListItemText 
            primary="Print label and attach to physical equipment" 
            primaryTypographyProps={{ variant: 'body2' }} 
          />
        </ListItem>
        <ListItem sx={{ px: 1 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              4
            </Box>
          </ListItemIcon>
          <ListItemText 
            primary="Equipment available for transfer and inventory" 
            primaryTypographyProps={{ variant: 'body2' }} 
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default QrCodePreview; 