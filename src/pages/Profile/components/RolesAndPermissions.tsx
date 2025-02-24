import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const AVAILABLE_PERMISSIONS = [
  'Manage Users',
  'Approve Transfers',
  'View Inventory',
  'Edit Inventory',
  'Generate Reports',
  'Access Sensitive Items',
  'Manage Roles',
  'View Audit Logs',
  'Manage Blockchain Records',
  'Approve Hand Receipts',
] as const;

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface RolesAndPermissionsProps {
  roles: Role[];
}

const RolesAndPermissions: React.FC<RolesAndPermissionsProps> = ({ roles }) => {
  return (
    <Card>
      <CardHeader
        title="Roles and Permissions"
        action={
          <Tooltip title="Your roles determine what actions you can perform in the system">
            <IconButton size="small">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        {roles.map((role, index) => (
          <React.Fragment key={role.id}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {role.name}
                </Typography>
                <Chip
                  label="Active"
                  size="small"
                  color="primary"
                  sx={{ ml: 2 }}
                />
              </Box>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {role.description}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Permissions:
              </Typography>
              <List dense>
                {role.permissions.map((permission) => (
                  <ListItem key={permission.id}>
                    <ListItemText
                      primary={permission.name}
                      secondary={permission.description}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            {index < roles.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </React.Fragment>
        ))}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mt: 2,
            pt: 2,
            borderTop: '1px dashed',
            borderColor: 'divider',
          }}
        >
          Roles and permissions are managed by administrators. Contact your admin for changes.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RolesAndPermissions; 