import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List,
  ListItem,
  Divider,
  styled 
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { BattalionActivityFeedProps } from '../types';

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

const ActivityItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '0.75rem',
}));

const PersonName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.875rem',
}));

const ActivityDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
}));

export const BattalionActivityFeed: React.FC<BattalionActivityFeedProps> = ({ activities }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <HistoryIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">BATTALION S4 ACTIVITY FEED</Typography>
      </div>
      <div className="card-content">
        <List disablePadding>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ActivityItem>
                <Box sx={{ display: 'flex', width: '100%', mb: 0.5 }}>
                  <TimeStamp>{activity.timestamp}</TimeStamp>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <PersonName>{activity.person}</PersonName>
                </Box>
                <ActivityDescription>
                  {activity.description}
                </ActivityDescription>
              </ActivityItem>
              {index < activities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </StyledCard>
  );
}; 