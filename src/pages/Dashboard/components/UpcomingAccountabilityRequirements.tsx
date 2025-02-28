import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { UpcomingAccountabilityRequirementsProps } from '../types';

export const UpcomingAccountabilityRequirements: React.FC<UpcomingAccountabilityRequirementsProps> = ({
  weeklyRequirements,
  monthlyRequirements,
  quarterlyRequirements,
  onStartInventory
}) => {
  // Helper function to render a requirement item
  const renderRequirementItem = (requirement: { name: string; due: string; daysRemaining?: number; progress?: number | null; }) => {
    return (
      <ListItem disablePadding sx={{ py: 1 }}>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }} component="span">
                {requirement.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {requirement.daysRemaining !== undefined && (
                  <Chip 
                    label={`${requirement.daysRemaining} days`}
                    color={requirement.daysRemaining < 2 ? 'warning' : 'default'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                )}
                <Typography variant="body2" color="text.secondary" component="span">
                  Due: {requirement.due}
                </Typography>
              </Box>
            </Box>
          }
          secondary={
            requirement.progress !== undefined && requirement.progress !== null ? (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={requirement.progress} 
                  sx={{ flexGrow: 1, mr: 1, height: 8, borderRadius: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {requirement.progress}% Complete
                </Typography>
              </Box>
            ) : null
          }
        />
      </ListItem>
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Required Inventories & Actions
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onStartInventory}
        >
          Start Required Inventory
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Weekly Requirements */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader 
              title={
                <Typography variant="subtitle1" fontWeight="bold">
                  Weekly Requirements
                </Typography>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <List disablePadding>
                {weeklyRequirements.map((req, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    {renderRequirementItem(req)}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Monthly Requirements */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader 
              title={
                <Typography variant="subtitle1" fontWeight="bold">
                  Monthly Requirements
                </Typography>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <List disablePadding>
                {monthlyRequirements.map((req, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    {renderRequirementItem(req)}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Quarterly Requirements */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader 
              title={
                <Typography variant="subtitle1" fontWeight="bold">
                  Quarterly Requirements
                </Typography>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <List disablePadding>
                {quarterlyRequirements.map((req, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    {renderRequirementItem(req)}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}; 