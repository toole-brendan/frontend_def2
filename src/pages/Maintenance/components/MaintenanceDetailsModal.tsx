import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
} from '@mui/material';
import {
  Wrench,
  User,
  FileText,
  Link,
  CheckCircle,
  Loader,
  Package,
  History,
  AlertTriangle,
} from 'lucide-react';
import {
  MaintenanceTask,
  MaintenanceStatus,
  MaintenancePriority,
} from '../types';

interface MaintenanceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  task: MaintenanceTask | null;
}

const getStatusColor = (status: MaintenanceStatus) => {
  const statusColors = {
    pending_approval: 'warning',
    scheduled: 'info',
    in_progress: 'primary',
    completed: 'success',
    cancelled: 'error',
    rejected: 'error',
  } as const;
  return statusColors[status];
};

const getPriorityColor = (priority: MaintenancePriority) => {
  const priorityColors = {
    routine: 'info',
    urgent: 'warning',
    emergency: 'error',
  } as const;
  return priorityColors[priority];
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const truncateHash = (hash: string) => {
  if (hash.length <= 13) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
};

export const MaintenanceDetailsModal: React.FC<MaintenanceDetailsModalProps> = ({
  open,
  onClose,
  task,
}) => {
  if (!task) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{task.title}</Typography>
          <Box>
            <Chip
              label={task.status.replace('_', ' ')}
              color={getStatusColor(task.status)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              label={task.priority}
              color={getPriorityColor(task.priority)}
              size="small"
            />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Equipment Details */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Wrench size={20} /> Equipment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body1">{task.equipment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Serial Number</Typography>
                  <Typography variant="body1">{task.equipment.serialNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Typography variant="body1">{task.equipment.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{task.equipment.location}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Task Details */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileText size={20} /> Task Details
              </Typography>
              <Typography variant="body1" paragraph>
                {task.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">Start Date</Typography>
                  <Typography variant="body1">{formatDate(task.startDate)}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">Due Date</Typography>
                  <Typography variant="body1">{formatDate(task.dueDate)}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">Completion Date</Typography>
                  <Typography variant="body1">{formatDate(task.completionDate)}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Personnel */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <User size={20} /> Assigned Personnel
              </Typography>
              <List dense>
                {task.assignedPersonnel.map((person) => (
                  <ListItem key={person.id}>
                    <ListItemText
                      primary={person.name}
                      secondary={`${person.role} • ${person.contact}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Parts Required */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Package size={20} /> Parts Required
              </Typography>
              <List dense>
                {task.partsRequired.map((part) => (
                  <ListItem key={part.id}>
                    <ListItemText
                      primary={part.name}
                      secondary={`Quantity: ${part.quantity}`}
                    />
                    <Chip
                      label={part.status}
                      color={part.status === 'available' ? 'success' : part.status === 'ordered' ? 'warning' : 'error'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Timeline */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <History size={20} /> Timeline
              </Typography>
              <List dense>
                {task.timeline.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {event.status === 'completed' && <CheckCircle color="success" size={20} />}
                        {event.status === 'pending' && <AlertTriangle color="warning" size={20} />}
                        {event.status === 'in_progress' && <Loader color="primary" size={20} />}
                      </ListItemIcon>
                      <ListItemText
                        primary={event.action}
                        secondary={`${formatDate(event.date)} • ${event.user}`}
                      />
                    </ListItem>
                    {index < task.timeline.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Blockchain Records */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link size={20} /> Blockchain Records
              </Typography>
              <List dense>
                {task.blockchainRecords.map((record, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={record.action}
                      secondary={`${formatDate(record.timestamp)} • Hash: ${truncateHash(record.hash)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Attachments and Notes */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileText size={20} /> Attachments
              </Typography>
              <List dense>
                {task.attachments.map((attachment) => (
                  <ListItem key={attachment.id}>
                    <ListItemText
                      primary={attachment.name}
                      secondary={attachment.type}
                    />
                    <Button size="small" href={attachment.url} target="_blank">
                      View
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileText size={20} /> Notes
              </Typography>
              <List dense>
                {task.notes.map((note, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={note} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}; 