import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  styled,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BackupIcon from '@mui/icons-material/Backup';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';
import BlockIcon from '@mui/icons-material/Block';
import QrCodeIcon from '@mui/icons-material/QrCode';
import InventoryIcon from '@mui/icons-material/Inventory';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

const Settings: React.FC = () => {
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoSync: true,
    syncInterval: '15',
    language: 'en-US',
    blockchainNetwork: 'ethereum',
    qrCodeFormat: 'standard',
    autoBackup: true,
    inventoryThreshold: '10',
    apiEndpoint: 'https://api.handreceipt.mil',
  });

  const handleSettingChange = (setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                SETTINGS
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure HandReceipt system preferences and blockchain settings
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save Changes
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* General Settings */}
          <Grid item xs={12} md={6}>
            <DashboardCard>
              <div className="card-header">
                <Typography variant="h6">General Settings</Typography>
              </div>
              <div className="card-content">
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dark Mode"
                      secondary="Enable dark theme for the interface"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.darkMode}
                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Notifications"
                      secondary="Enable transfer and inventory alerts"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications}
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Language"
                      secondary="Select your preferred language"
                    />
                    <ListItemSecondaryAction>
                      <TextField
                        select
                        size="small"
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                      </TextField>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </div>
            </DashboardCard>
          </Grid>

          {/* Blockchain Settings */}
          <Grid item xs={12} md={6}>
            <DashboardCard>
              <div className="card-header">
                <Typography variant="h6">Blockchain Settings</Typography>
              </div>
              <div className="card-content">
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BlockIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Blockchain Network"
                      secondary="Select the blockchain network for transactions"
                    />
                    <ListItemSecondaryAction>
                      <TextField
                        select
                        size="small"
                        value={settings.blockchainNetwork}
                        onChange={(e) => handleSettingChange('blockchainNetwork', e.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="ethereum">Ethereum</option>
                        <option value="polygon">Polygon</option>
                        <option value="avalanche">Avalanche</option>
                      </TextField>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <QrCodeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="QR Code Format"
                      secondary="Configure QR code generation format"
                    />
                    <ListItemSecondaryAction>
                      <TextField
                        select
                        size="small"
                        value={settings.qrCodeFormat}
                        onChange={(e) => handleSettingChange('qrCodeFormat', e.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="standard">Standard</option>
                        <option value="compact">Compact</option>
                        <option value="enhanced">Enhanced Security</option>
                      </TextField>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Inventory Alert Threshold"
                      secondary="Set minimum inventory level for alerts"
                    />
                    <ListItemSecondaryAction>
                      <TextField
                        type="number"
                        size="small"
                        value={settings.inventoryThreshold}
                        onChange={(e) => handleSettingChange('inventoryThreshold', e.target.value)}
                        sx={{ width: 100 }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </div>
            </DashboardCard>
          </Grid>

          {/* Security Settings */}
          <Grid item xs={12}>
            <DashboardCard>
              <div className="card-header">
                <Typography variant="h6">Security Settings</Typography>
              </div>
              <div className="card-content">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Two-Factor Authentication
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Add an extra layer of security to your account
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<SecurityIcon />}
                      >
                        Configure 2FA
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Digital Signature Management
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Manage your blockchain transaction signatures
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                      >
                        Manage Keys
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Security Requirements
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        • Minimum 12 character password
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        • Biometric verification for transfers
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        • Blockchain transaction confirmation
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Settings; 