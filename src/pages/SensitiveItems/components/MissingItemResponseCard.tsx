import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import {
  Warning as WarningIcon,
  NotificationsActive as AlarmIcon,
  Assignment as ClipboardIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface EmergencyContact {
  title: string;
  name?: string;
  phone: string;
}

interface MissingItemResponseCardProps {
  emergencyContacts: EmergencyContact[];
  onInitiateMissingItemProtocol: () => void;
}

const MissingItemResponseCard: React.FC<MissingItemResponseCardProps> = ({
  emergencyContacts,
  onInitiateMissingItemProtocol
}) => {
  return (
    <Paper elevation={3}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          bgcolor: 'error.main', // Using MUI error color
          color: 'white',
          p: 2,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      >
        <WarningIcon />
        <Typography variant="h6" component="h2">
          Missing Item Response Procedures
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
        {/* Response Steps */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AlarmIcon color="error" />
            <Typography color="text.primary">
              Immediately notify your chain of command and initiate emergency response procedures
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ClipboardIcon color="error" />
            <Typography color="text.primary">
              Document all details about when the item was last seen and any relevant circumstances
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LockIcon color="error" />
            <Typography color="text.primary">
              Secure the area and restrict access until investigation team arrives
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhoneIcon color="error" />
            <Typography color="text.primary">
              Contact all required personnel in the order listed below
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <InfoIcon color="error" />
            <Typography color="text.primary">
              Stand by for further instructions from command team
            </Typography>
          </Box>
        </Stack>

        {/* Contact List */}
        <List sx={{ mb: 3 }}>
          {emergencyContacts.map((contact, index) => (
            <ListItem 
              key={index}
              sx={{
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <ListItemIcon>
                <PhoneIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" component="span" color="text.primary">
                      {contact.title}
                    </Typography>
                    {contact.name && (
                      <Typography variant="body2" color="text.secondary" component="span">
                        ({contact.name})
                      </Typography>
                    )}
                    <Chip 
                      label="Required" 
                      size="small" 
                      sx={{ 
                        ml: 'auto',
                        bgcolor: 'error.light',
                        color: 'error.main',
                        fontWeight: 500
                      }} 
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {contact.phone}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Action Button */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          size="large"
          startIcon={<WarningIcon />}
          onClick={onInitiateMissingItemProtocol}
          sx={{ 
            py: 1.5,
            fontWeight: 500
          }}
        >
          Initiate Missing Item Protocol →
        </Button>
      </Box>
    </Paper>
  );
};

export default MissingItemResponseCard; 