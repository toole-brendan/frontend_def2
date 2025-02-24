import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Box,
  Typography,
  Radio,
} from '@mui/material';
import {
  CheckCircle,
  XCircle,
  Eye,
  Link,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { MaintenanceTask, MaintenanceStatus, MaintenancePriority } from '../types';

interface MaintenanceTableProps {
  tasks: MaintenanceTask[];
  selectedTask: MaintenanceTask | null;
  onSelectTask: (task: MaintenanceTask) => void;
  onApprove: (task: MaintenanceTask) => void;
  onReject: (task: MaintenanceTask) => void;
  onComplete: (task: MaintenanceTask) => void;
  onCancel: (task: MaintenanceTask) => void;
  onViewDetails: (task: MaintenanceTask) => void;
  onViewBlockchain: (task: MaintenanceTask) => void;
  onGenerateDA2404: (task: MaintenanceTask) => void;
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
  return new Date(dateString).toLocaleDateString();
};

export const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  tasks,
  selectedTask,
  onSelectTask,
  onApprove,
  onReject,
  onComplete,
  onCancel,
  onViewDetails,
  onViewBlockchain,
  onGenerateDA2404,
}) => {
  const renderActionButtons = (task: MaintenanceTask) => {
    switch (task.status) {
      case 'pending_approval':
        return (
          <>
            <Tooltip title="Approve">
              <IconButton size="small" onClick={() => onApprove(task)} color="success">
                <CheckCircle size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject">
              <IconButton size="small" onClick={() => onReject(task)} color="error">
                <XCircle size={18} />
              </IconButton>
            </Tooltip>
          </>
        );
      case 'in_progress':
        return (
          <Tooltip title="Mark Complete">
            <IconButton size="small" onClick={() => onComplete(task)} color="success">
              <CheckCircle2 size={18} />
            </IconButton>
          </Tooltip>
        );
      case 'scheduled':
        return (
          <Tooltip title="Cancel">
            <IconButton size="small" onClick={() => onCancel(task)} color="error">
              <XCircle size={18} />
            </IconButton>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>Equipment</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Box sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No maintenance tasks found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow 
                key={task.id}
                hover
                onClick={() => onSelectTask(task)}
                selected={selectedTask?.id === task.id}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox">
                  <Radio
                    checked={selectedTask?.id === task.id}
                    onChange={() => onSelectTask(task)}
                    value={task.id}
                    name="task-radio-button"
                    size="small"
                  />
                </TableCell>
                <TableCell>{task.equipment.name}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Chip
                    label={task.status.replace('_', ' ')}
                    color={getStatusColor(task.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {task.category.replace('_', ' ')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Clock size={16} />
                    {formatDate(task.dueDate)}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {renderActionButtons(task)}
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); onViewDetails(task); }}>
                        <Eye size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Blockchain Record">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); onViewBlockchain(task); }}>
                        <Link size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Generate DA 2404">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); onGenerateDA2404(task); }}>
                        <FileText size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 