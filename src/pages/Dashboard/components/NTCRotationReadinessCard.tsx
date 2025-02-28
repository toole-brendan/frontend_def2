import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import { NTCRotationReadinessCardProps } from '../types';

export const NTCRotationReadinessCard: React.FC<NTCRotationReadinessCardProps> = ({
  title,
  daysToDeployment,
  equipmentStatus,
  milestones,
  onViewNTCPlan
}) => {
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, borderRadius: 2 }}>
      {/* Card Header */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      
      {/* Deployment Countdown */}
      <Box sx={{ 
        mb: 2, 
        p: 1, 
        bgcolor: 'primary.light', 
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h5" fontWeight="bold" color="primary.dark">
          D-{daysToDeployment} Days
        </Typography>
        <Typography variant="caption" color="text.secondary">
          to Deployment
        </Typography>
      </Box>
      
      {/* Equipment Status */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Equipment Status
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Required Equipment:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {equipmentStatus.requiredItems} line items
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Current On-Hand:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {equipmentStatus.currentOnHand} items ({equipmentStatus.percentage}%)
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={equipmentStatus.percentage} 
          sx={{ mb: 1, height: 8, borderRadius: 1 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Critical Shortages:
          </Typography>
          <Typography variant="body2" fontWeight="medium" color="error.main">
            {equipmentStatus.criticalShortages} items
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Equipment Serviceability:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {equipmentStatus.serviceability}% Mission Capable
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Key Milestones */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Key Milestones
      </Typography>
      
      <List disablePadding dense>
        {milestones.map((milestone, index) => (
          <ListItem 
            key={index}
            disablePadding
            sx={{ py: 0.5 }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight="medium">
                    {milestone.name}
                  </Typography>
                  <Box>
                    {milestone.status === 'Complete' ? (
                      <Chip 
                        label="✓" 
                        color="success" 
                        size="small" 
                        sx={{ fontWeight: 'bold', minWidth: 32 }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {milestone.date}
                        {milestone.daysRemaining !== null && (
                          <Typography component="span" variant="caption" color="warning.main" sx={{ ml: 1 }}>
                            ({milestone.daysRemaining} days remaining)
                          </Typography>
                        )}
                      </Typography>
                    )}
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      
      {/* Action Button */}
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        sx={{ mt: 2 }}
        onClick={onViewNTCPlan}
      >
        View NTC Equipment Plan
      </Button>
    </Paper>
  );
}; 