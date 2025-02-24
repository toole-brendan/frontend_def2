import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Avatar,
  styled,
  Card,
  Button,
} from '@mui/material';
import {
  SwapHoriz as TransferIcon,
  Build as MaintenanceIcon,
  Assignment as InspectionIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Activity } from '../types';

interface RecentActivityFeedProps {
  activities: Activity[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  width: '100%',
}));

const ActivityChip = styled(Chip)(() => ({
  borderRadius: '16px',
  fontWeight: 500,
  fontSize: '0.75rem',
}));

const ActivityList = styled(List)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  minHeight: '250px',
  maxHeight: '250px',
  padding: 0,
  marginBottom: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '3px',
  },
}));

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'Transfer':
      return <TransferIcon fontSize="small" />;
    case 'Maintenance':
      return <MaintenanceIcon fontSize="small" />;
    case 'Inspection':
      return <InspectionIcon fontSize="small" />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'Transfer':
      return 'primary';
    case 'Maintenance':
      return 'warning';
    case 'Inspection':
      return 'info';
  }
};

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <StyledCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 1, mb: 1 }}>
        <Typography variant="h6">Recent Activity</Typography>
        <Button
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          View All
        </Button>
      </Box>
      <ActivityList>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            sx={{
              py: 1,
              px: 1,
              borderBottom: 1,
              borderColor: 'divider',
              '&:last-child': {
                borderBottom: 0,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: `${getActivityColor(activity.type)}.light`,
                  color: `${getActivityColor(activity.type)}.main`,
                  mr: 1,
                }}
              >
                {getActivityIcon(activity.type)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
                  <Typography variant="subtitle2" noWrap>
                    {activity.user.rank} {activity.user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </Typography>
                </Box>
                <ListItemText
                  primary={activity.description}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { mb: 0.25 }
                  }}
                  secondary={
                    <ActivityChip
                      size="small"
                      label={activity.status}
                      color={activity.status === 'COMPLETED' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  }
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </ActivityList>
    </StyledCard>
  );
}; 