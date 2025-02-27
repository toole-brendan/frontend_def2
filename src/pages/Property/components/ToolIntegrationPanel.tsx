import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Divider,
  Grid,
  Stack,
  Chip,
  LinearProgress,
  styled,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import InfoIcon from '@mui/icons-material/Info';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const StatusIndicator = styled(Box)<{ status: 'success' | 'warning' | 'error' | 'info' }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette[status].main,
  '& svg': {
    fontSize: '1rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
}));

const ProgressSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ProgressLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

const ToolIntegrationPanel: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tool Integration Panel
      </Typography>
      <Grid container spacing={3}>
        {/* GCSS-Army Integration */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardHeader 
              title="GCSS-Army Integration" 
              action={
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<SyncIcon />}
                >
                  Sync Now
                </Button>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <StatusIndicator status="success">
                  <CheckCircleIcon />
                  <Typography variant="body2">
                    Property Book Integration: Last sync with GCSS-Army 25FEB2025
                  </Typography>
                </StatusIndicator>
                
                <StatusIndicator status="success">
                  <CheckCircleIcon />
                  <Typography variant="body2">
                    MMDF Table Status: Current (updated 24FEB2025)
                  </Typography>
                </StatusIndicator>
                
                <StatusIndicator status="warning">
                  <WarningIcon />
                  <Typography variant="body2">
                    Supply Request Status: 7 open requests (Class II, IX)
                  </Typography>
                </StatusIndicator>
                
                <StatusIndicator status="info">
                  <BuildIcon />
                  <Typography variant="body2">
                    Maintenance Integration: 9 open 5988E records
                  </Typography>
                </StatusIndicator>
                
                <Divider />
                
                <Typography variant="subtitle2" gutterBottom>
                  Integration Actions
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <ActionButton
                      variant="outlined"
                      fullWidth
                      startIcon={<CloudSyncIcon />}
                    >
                      Sync Property Book
                    </ActionButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ActionButton
                      variant="outlined"
                      fullWidth
                      startIcon={<ListAltIcon />}
                    >
                      View Supply Requests
                    </ActionButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ActionButton
                      variant="outlined"
                      fullWidth
                      startIcon={<BuildIcon />}
                    >
                      Manage 5988E Records
                    </ActionButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ActionButton
                      variant="outlined"
                      fullWidth
                      startIcon={<InventoryIcon />}
                    >
                      Update MMDF Tables
                    </ActionButton>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Deployment Support Tools */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardHeader 
              title="Deployment Support Tools" 
              action={
                <Chip 
                  label="NTC Rotation 25-07" 
                  color="primary" 
                  size="small"
                />
              }
            />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                NTC Rotation Equipment Status:
              </Typography>
              
              <ProgressSection>
                <ProgressLabel>
                  <Typography variant="body2">Primary Combat Systems:</Typography>
                  <Typography variant="body2" fontWeight="medium" color="success.main">94% Ready</Typography>
                </ProgressLabel>
                <LinearProgress 
                  variant="determinate" 
                  value={94} 
                  color="success" 
                  sx={{ height: 8, borderRadius: 1 }} 
                />
              </ProgressSection>
              
              <StatusIndicator status="warning" sx={{ mb: 2 }}>
                <WarningIcon />
                <Typography variant="body2">
                  Shortages identified: 7 critical items
                </Typography>
              </StatusIndicator>
              
              <StatusIndicator status="info" sx={{ mb: 3 }}>
                <InfoIcon />
                <Typography variant="body2">
                  MTOE vs Deployment Equipment Delta: 23 items
                </Typography>
              </StatusIndicator>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Automated Packing List Generator:
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="TAT/AAA-162 Data Integration" 
                    secondary="Last updated: 23FEB2025"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Unit Load Planning Tool Connection" 
                    secondary="Connected to TC-AIMS II"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="TCP/MLC Data Current" 
                    secondary="Validated 22FEB2025"
                  />
                </ListItem>
              </List>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<LocalShippingIcon />}
                  >
                    Generate Packing Lists
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<DirectionsCarIcon />}
                  >
                    Update Vehicle Data
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<MilitaryTechIcon />}
                  >
                    NTC Equipment Report
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<InventoryIcon />}
                  >
                    Shortage Mitigation
                  </ActionButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolIntegrationPanel; 