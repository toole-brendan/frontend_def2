import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Tooltip,
  IconButton,
  styled,
  Paper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';

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

interface MilitaryPerson {
  id: string;
  name: string;
  rank: string;
  position: string;
  profilePicture?: string;
}

interface ChainOfCommandProps {
  supervisor: MilitaryPerson;
  subordinates: MilitaryPerson[];
}

const ChainOfCommand: React.FC<ChainOfCommandProps> = ({
  supervisor,
  subordinates,
}) => {
  const PersonListItem = ({ person }: { person: MilitaryPerson }) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={person.profilePicture}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1">
            {person.rank} {person.name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {person.position}
          </Typography>
        }
      />
    </ListItem>
  );

  return (
    <DashboardCard>
      <Box className="card-header">
        <Typography variant="h6">CHAIN OF COMMAND</Typography>
        <Tooltip title="Your direct reporting structure within the unit">
          <IconButton size="small">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Box className="card-content">
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Reports To
        </Typography>
        <List disablePadding>
          <PersonListItem person={supervisor} />
        </List>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Direct Reports
          </Typography>
          <List disablePadding>
            {subordinates.map((subordinate) => (
              <React.Fragment key={subordinate.id}>
                <PersonListItem person={subordinate} />
                {subordinate.id !== subordinates[subordinates.length - 1].id && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ChainOfCommand; 