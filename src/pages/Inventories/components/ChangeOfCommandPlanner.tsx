import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Tab,
  Tabs,
  Paper,
  useTheme
} from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CommuteIcon from '@mui/icons-material/Commute';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BookIcon from '@mui/icons-material/Book';

interface ChangeOfCommandPlannerProps {
  simplified?: boolean;
}

export const ChangeOfCommandPlanner: React.FC<ChangeOfCommandPlannerProps> = ({ simplified = false }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Card elevation={2}>
      <CardHeader 
        title="Special Inventory Planning" 
        action={<MilitaryTechIcon />}
      />
      <CardContent>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 2 }}
        >
          <Tab 
            label="Change of Command" 
            icon={<AssignmentIcon />} 
            iconPosition="start"
            sx={{ fontSize: '0.8rem', minHeight: 'auto', py: 1 }}
          />
          <Tab 
            label="Pre-Deployment" 
            icon={<CommuteIcon />} 
            iconPosition="start"
            sx={{ fontSize: '0.8rem', minHeight: 'auto', py: 1 }}
          />
        </Tabs>

        {activeTab === 0 ? (
          <Box>
            <Typography variant="body2" paragraph>
              Plan and execute a comprehensive Change of Command inventory with this guidance.
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: theme.palette.background.default }}>
              <Typography variant="subtitle2" gutterBottom>
                Change of Command Requirements
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="100% Property Accountability" 
                    secondary="All items on hand receipt must be verified"
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Shortage Annex Required" 
                    secondary="All shortages must be documented"
                  />
                </ListItem>
              </List>
            </Paper>
            
            <List dense disablePadding>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <EventAvailableIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Timeline Calculator" 
                  secondary="Based on item count and inventory complexity"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PeopleIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Personnel Requirements Estimation" 
                  secondary="Calculate required staff for timely completion"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssignmentTurnedInIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Task Delegation Planner" 
                  secondary="Assign responsibilities and track completion"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssignmentIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Document Preparation Checklist" 
                  secondary="Ensure all required documentation is ready"
                />
              </ListItem>
            </List>
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" paragraph>
              Prepare your unit for deployment to NTC with comprehensive inventory planning.
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 1.5, mb: 2, backgroundColor: theme.palette.background.default }}>
              <Typography variant="subtitle2" gutterBottom>
                NTC Preparation Requirements
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="MTOE Validation" 
                    secondary="All MTOE items must be accounted for"
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Sensitive Items Focus" 
                    secondary="Special attention to weapons and comms"
                  />
                </ListItem>
              </List>
            </Paper>
            
            <List dense disablePadding>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssignmentIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Equipment Identification Workflow" 
                  secondary="Identify all equipment for rotation"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <WarningIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Shortage Mitigation Planning" 
                  secondary="Plan for critical equipment shortages"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssignmentTurnedInIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Serviceability Verification" 
                  secondary="Ensure all equipment is fully mission capable"
                />
              </ListItem>
            </List>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrowIcon />}
            size="small"
          >
            Start Planning
          </Button>
          <Box>
            <Button
              variant="outlined"
              startIcon={<FileCopyIcon />}
              size="small"
              sx={{ mr: 1 }}
            >
              Use Template
            </Button>
            <Button
              variant="text"
              startIcon={<BookIcon />}
              size="small"
            >
              View SOP
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 