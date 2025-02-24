import React from 'react';
import {
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
  styled,
  Paper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
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
    <DashboardCard>
      <Box className="card-header">
        <Typography variant="h6">ROLES & PERMISSIONS</Typography>
        <Tooltip title="Your roles determine what actions you can perform in the system">
          <IconButton size="small">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Box className="card-content">
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
      </Box>
    </DashboardCard>
  );
};

export default RolesAndPermissions; 