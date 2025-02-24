import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';

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
    <Card>
      <CardHeader
        title="Chain of Command"
        action={
          <Tooltip title="Your direct reporting structure within the unit">
            <IconButton size="small">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 1 }}
          >
            Immediate Supervisor
          </Typography>
          <List disablePadding>
            <PersonListItem person={supervisor} />
          </List>
        </Box>

        {subordinates.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ mb: 1 }}
              >
                Direct Reports
              </Typography>
              <List disablePadding>
                {subordinates.map((subordinate) => (
                  <PersonListItem
                    key={subordinate.id}
                    person={subordinate}
                  />
                ))}
              </List>
            </Box>
          </>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mt: 3,
            pt: 2,
            borderTop: '1px dashed',
            borderColor: 'divider',
          }}
        >
          Chain of command information is synced from personnel records.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChainOfCommand; 