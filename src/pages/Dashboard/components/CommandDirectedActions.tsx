import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  Chip,
  styled 
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { CommandDirectedActionsProps } from '../types';

const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
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

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
  const colors = {
    PENDING: {
      bg: theme.palette.info.light,
      color: theme.palette.info.dark,
    },
    OVERDUE: {
      bg: theme.palette.error.light,
      color: theme.palette.error.dark,
    },
    COMPLETED: {
      bg: theme.palette.success.light,
      color: theme.palette.success.dark,
    },
  };

  const statusColor = colors[status as keyof typeof colors] || colors.PENDING;

  return {
    backgroundColor: statusColor.bg,
    color: statusColor.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: 24,
  };
});

export const CommandDirectedActions: React.FC<CommandDirectedActionsProps> = ({ actions }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <AssignmentIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">COMMAND DIRECTED ACTIONS</Typography>
      </div>
      <div className="card-content">
        <List>
          {actions.map((action) => (
            <ListItem 
              key={action.id}
              sx={{ 
                py: 1.5, 
                px: 0,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {action.description}
                </Typography>
                <StatusChip 
                  label={action.status} 
                  status={action.status}
                  size="small"
                />
              </Box>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Due: {action.dueDate}
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                >
                  Execute Action
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </div>
    </StyledCard>
  );
}; 