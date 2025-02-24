import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  styled,
  Paper,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';

const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
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

interface AccountSettingsProps {
  is2FAEnabled: boolean;
  onPasswordChange: (oldPassword: string, newPassword: string) => void;
  onToggle2FA: (enabled: boolean) => void;
  onNotificationPreferencesChange: (preferences: NotificationPreferences) => void;
}

interface NotificationPreferences {
  emailTransfers: boolean;
  emailMaintenance: boolean;
  inAppNotifications: boolean;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  is2FAEnabled,
  onPasswordChange,
  onToggle2FA,
  onNotificationPreferencesChange,
}) => {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    emailTransfers: true,
    emailMaintenance: true,
    inAppNotifications: true,
  });

  const handlePasswordSubmit = () => {
    if (newPassword === confirmPassword) {
      onPasswordChange(oldPassword, newPassword);
      setPasswordDialogOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleNotificationSave = () => {
    onNotificationPreferencesChange(notificationPrefs);
    setNotificationDialogOpen(false);
  };

  return (
    <DashboardCard>
      <Box className="card-header">
        <Typography variant="h6">ACCOUNT SETTINGS</Typography>
      </Box>
      
      <Box className="card-content">
        <List disablePadding>
          <ListItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              primary="Password"
              secondary="Change your account password"
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPasswordDialogOpen(true)}
              >
                Change
              </Button>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider component="li" sx={{ my: 1 }} />

          <ListItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary={is2FAEnabled ? 'Enabled' : 'Disabled'}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={is2FAEnabled}
                onChange={(e) => onToggle2FA(e.target.checked)}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider component="li" sx={{ my: 1 }} />

          <ListItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Notification Preferences"
              secondary="Manage how you receive notifications"
              sx={{ pr: 8 }}
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setNotificationDialogOpen(true)}
              >
                Configure
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        {/* Password Change Dialog */}
        <Dialog
          open={passwordDialogOpen}
          onClose={() => setPasswordDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                error={newPassword !== confirmPassword && confirmPassword !== ''}
                helperText={
                  newPassword !== confirmPassword && confirmPassword !== ''
                    ? 'Passwords do not match'
                    : ''
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handlePasswordSubmit}
              variant="contained"
              disabled={
                !oldPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            >
              Change Password
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notification Preferences Dialog */}
        <Dialog
          open={notificationDialogOpen}
          onClose={() => setNotificationDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Notification Preferences</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications for Transfers"
                  secondary="Receive email notifications for property transfers"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notificationPrefs.emailTransfers}
                    onChange={(e) =>
                      setNotificationPrefs({
                        ...notificationPrefs,
                        emailTransfers: e.target.checked,
                      })
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email Notifications for Maintenance"
                  secondary="Receive email notifications for maintenance updates"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notificationPrefs.emailMaintenance}
                    onChange={(e) =>
                      setNotificationPrefs({
                        ...notificationPrefs,
                        emailMaintenance: e.target.checked,
                      })
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="In-App Notifications"
                  secondary="Receive notifications within the application"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notificationPrefs.inAppNotifications}
                    onChange={(e) =>
                      setNotificationPrefs({
                        ...notificationPrefs,
                        inAppNotifications: e.target.checked,
                      })
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNotificationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleNotificationSave} variant="contained">
              Save Preferences
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardCard>
  );
};

export default AccountSettings; 