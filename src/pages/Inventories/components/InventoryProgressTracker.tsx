import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  LinearProgress, 
  Button, 
  Stack, 
  Divider, 
  Avatar, 
  useTheme,
  Chip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { activeInventories } from './mockData';

export const InventoryProgressTracker: React.FC = () => {
  const theme = useTheme();

  // Function to determine progress color based on completion percentage
  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success';
    if (progress >= 60) return 'primary';
    if (progress >= 30) return 'info';
    if (progress > 0) return 'warning';
    return 'error';
  };

  // Function to determine status chip color
  const getStatusColor = (status: string) => {
    if (status === 'Complete') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'Scheduled') return 'info';
    return 'warning';
  };

  // Function to render the appropriate icon based on icon type
  const getInventoryIcon = (iconType: string) => {
    switch(iconType) {
      case 'vehicle':
        return <DirectionsCarIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardHeader title="Current Inventory Progress" />
      <CardContent>
        <Stack spacing={3}>
          {activeInventories.map((inventory) => (
            <Box key={inventory.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    width: 32, 
                    height: 32,
                    mr: 1
                  }}
                >
                  {getInventoryIcon(inventory.icon)}
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium">
                  {inventory.name}
                </Typography>
                <Chip
                  label={inventory.status}
                  size="small"
                  color={getStatusColor(inventory.status)}
                  sx={{ ml: 'auto', fontWeight: "medium" }}
                />
              </Box>
              
              {inventory.progress > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={inventory.progress} 
                      color={getProgressColor(inventory.progress)}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {inventory.progress}%
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Not started
                  </Typography>
                </Box>
              )}
              
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="body2">
                    {inventory.itemsVerified}/{inventory.totalItems} items
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Started
                  </Typography>
                  <Typography variant="body2">
                    {inventory.startDate}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Due
                  </Typography>
                  <Typography variant="body2">
                    {inventory.dueDate}
                  </Typography>
                </Box>
              </Stack>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                  Assigned To:
                </Typography>
                <Avatar 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    fontSize: '0.75rem',
                    bgcolor: theme.palette.secondary.main,
                    mr: 1
                  }}
                >
                  {inventory.assignedToAvatar}
                </Avatar>
                <Typography variant="body2">
                  {inventory.assignedTo}
                </Typography>
              </Box>
              
              {inventory.lastCompleted && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Last Completed: {inventory.lastCompleted}
                </Typography>
              )}
              
              <Stack direction="row" spacing={1}>
                {inventory.status === 'In Progress' ? (
                  <Button 
                    size="small" 
                    variant="contained" 
                    startIcon={<PlayArrowIcon />}
                    color="primary"
                  >
                    Resume Inventory
                  </Button>
                ) : (
                  <Button 
                    size="small" 
                    variant="contained" 
                    startIcon={<PlayArrowIcon />}
                    color="primary"
                  >
                    Start Inventory
                  </Button>
                )}
                <Button 
                  size="small" 
                  variant="outlined" 
                  startIcon={<PersonAddIcon />}
                >
                  Assign
                </Button>
                <Button 
                  size="small" 
                  variant="text" 
                  startIcon={<VisibilityIcon />}
                >
                  Details
                </Button>
              </Stack>
              
              {activeInventories.indexOf(inventory) < activeInventories.length - 1 && (
                <Divider sx={{ mt: 2 }} />
              )}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}; 