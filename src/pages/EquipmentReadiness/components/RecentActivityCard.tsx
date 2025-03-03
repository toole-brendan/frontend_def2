import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { History as HistoryIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { getStatusChipColor } from '../utils';
import { cardWithCornerSx, sectionHeaderSx, buttonSx } from '../styles';

interface ActivityItem {
  action: string;
  item: string;
  user: string;
  datetime: string;
  status: string;
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities
}) => {
  const theme = useTheme();

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))}
    >
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={sectionHeaderSx}
        >
          Recent Maintenance Activity
        </Typography>
        
        <List disablePadding sx={{ mb: 2 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <HistoryIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        fontSize: '0.8rem',
                      }}
                    >
                      {activity.action}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      variant="caption"
                      sx={{ 
                        display: 'block',
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        letterSpacing: '0.03em',
                        color: 'text.secondary'
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 'medium' }}>
                        {activity.item}
                      </Box> • {activity.user} • {activity.datetime}
                    </Typography>
                  }
                />
                <Chip 
                  label={activity.status} 
                  size="small"
                  sx={{ 
                    fontWeight: 'medium',
                    borderRadius: 0,
                    height: 20,
                    fontSize: '0.7rem',
                    bgcolor: alpha(getStatusChipColor(activity.status, theme), 0.1),
                    color: getStatusChipColor(activity.status, theme),
                    letterSpacing: '0.03em',
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        
        <Button 
          variant="outlined" 
          color="secondary" 
          fullWidth
          endIcon={<ArrowForwardIcon fontSize="small" />}
          sx={buttonSx}
        >
          View All Activity
        </Button>
      </Box>
    </Paper>
  );
};
