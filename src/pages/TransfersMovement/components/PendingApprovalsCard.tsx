import React, { useState } from 'react';
import {
  Card,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Chip,
  Badge,
  Avatar,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  IconButton,
  Stack
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Transfer, TransferPriority } from '../types';

interface PendingApprovalsCardProps {
  pendingTransfers: Transfer[];
  onApprove: (transferId: string, comments: string, delegateTo?: string) => void;
  onDeny: (transferId: string, reason: string) => void;
  onViewTransfer: (transfer: Transfer) => void;
  availableDelegates: {
    id: string;
    name: string;
    rank: string;
    position: string;
  }[];
}

const PendingApprovalsCard: React.FC<PendingApprovalsCardProps> = ({
  pendingTransfers,
  onApprove,
  onDeny,
  onViewTransfer,
  availableDelegates
}) => {
  const [expandedTransferId, setExpandedTransferId] = useState<string | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [denialDialogOpen, setDenialDialogOpen] = useState(false);
  const [selectedTransferId, setSelectedTransferId] = useState<string | null>(null);
  const [approvalComments, setApprovalComments] = useState('');
  const [denialReason, setDenialReason] = useState('');
  const [delegateId, setDelegateId] = useState('');

  const toggleExpanded = (transferId: string) => {
    setExpandedTransferId(expandedTransferId === transferId ? null : transferId);
  };

  const handleApprovalOpen = (transferId: string) => {
    setSelectedTransferId(transferId);
    setApprovalComments('');
    setDelegateId('');
    setApprovalDialogOpen(true);
  };

  const handleDenialOpen = (transferId: string) => {
    setSelectedTransferId(transferId);
    setDenialReason('');
    setDenialDialogOpen(true);
  };

  const handleApprovalClose = () => {
    setApprovalDialogOpen(false);
  };

  const handleDenialClose = () => {
    setDenialDialogOpen(false);
  };

  const handleApprove = () => {
    if (selectedTransferId) {
      onApprove(selectedTransferId, approvalComments, delegateId || undefined);
      setApprovalDialogOpen(false);
    }
  };

  const handleDeny = () => {
    if (selectedTransferId) {
      onDeny(selectedTransferId, denialReason);
      setDenialDialogOpen(false);
    }
  };

  // Group transfers by priority
  const groupedTransfers = pendingTransfers.reduce<{
    [key in TransferPriority]: Transfer[];
  }>(
    (acc, transfer) => {
      acc[transfer.priority].push(transfer);
      return acc;
    },
    {
      [TransferPriority.HIGH]: [],
      [TransferPriority.MEDIUM]: [],
      [TransferPriority.ROUTINE]: []
    }
  );

  // Helper function to render the priority badge
  const renderPriorityBadge = (priority: TransferPriority) => {
    switch (priority) {
      case TransferPriority.HIGH:
        return (
          <Chip
            icon={<PriorityHighIcon />}
            label="High Priority"
            color="error"
            size="small"
            sx={{ ml: 1 }}
          />
        );
      case TransferPriority.MEDIUM:
        return (
          <Chip
            icon={<TimerIcon />}
            label="Medium Priority"
            color="warning"
            size="small"
            sx={{ ml: 1 }}
          />
        );
      case TransferPriority.ROUTINE:
        return (
          <Chip
            label="Routine"
            color="info"
            size="small"
            variant="outlined"
            sx={{ ml: 1 }}
          />
        );
    }
  };

  // Render approval dialog
  const renderApprovalDialog = () => (
    <Dialog open={approvalDialogOpen} onClose={handleApprovalClose} maxWidth="sm" fullWidth>
      <DialogTitle>Approve Transfer</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please add any comments for this approval. You may also delegate the approval to another authorized person.
        </Typography>
        
        <TextField
          autoFocus
          margin="dense"
          label="Approval Comments"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={approvalComments}
          onChange={(e) => setApprovalComments(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
          <InputLabel>Delegate To (Optional)</InputLabel>
          <Select
            value={delegateId}
            onChange={(e) => setDelegateId(e.target.value)}
            label="Delegate To (Optional)"
          >
            <MenuItem value="">
              <em>No delegation</em>
            </MenuItem>
            {availableDelegates.map((delegate) => (
              <MenuItem key={delegate.id} value={delegate.id}>
                {`${delegate.rank} ${delegate.name} (${delegate.position})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApprovalClose}>Cancel</Button>
        <Button onClick={handleApprove} variant="contained" color="primary">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Render denial dialog
  const renderDenialDialog = () => (
    <Dialog open={denialDialogOpen} onClose={handleDenialClose} maxWidth="sm" fullWidth>
      <DialogTitle>Deny Transfer</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please provide a reason for denying this transfer request.
        </Typography>
        
        <TextField
          autoFocus
          margin="dense"
          label="Denial Reason"
          fullWidth
          required
          multiline
          rows={3}
          variant="outlined"
          value={denialReason}
          onChange={(e) => setDenialReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDenialClose}>Cancel</Button>
        <Button 
          onClick={handleDeny} 
          variant="contained" 
          color="error"
          disabled={!denialReason.trim()}
        >
          Deny
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Card sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          Transfers Requiring Your Action
        </Typography>
        <Badge 
          badgeContent={pendingTransfers.length} 
          color="error" 
          sx={{ ml: 1 }}
        />
      </Box>
      
      {pendingTransfers.length === 0 ? (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
          <Typography color="text.secondary">
            No pending transfers require your action
          </Typography>
        </Box>
      ) : (
        <>
          {/* High Priority Transfers */}
          {groupedTransfers[TransferPriority.HIGH].length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="error" gutterBottom>
                High Priority
              </Typography>
              <List disablePadding>
                {groupedTransfers[TransferPriority.HIGH].map((transfer) => (
                  <React.Fragment key={transfer.id}>
                    <Paper 
                      sx={{ 
                        mb: 1, 
                        borderLeft: '4px solid #f44336',
                        overflow: 'hidden' 
                      }}
                    >
                      <ListItem 
                        button 
                        onClick={() => toggleExpanded(transfer.id)}
                        sx={{
                          bgcolor: expandedTransferId === transfer.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
                        }}
                      >
                        <ListItemIcon>
                          <AssignmentIcon color="error" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" fontWeight="medium">
                                {transfer.id}
                              </Typography>
                              {renderPriorityBadge(transfer.priority)}
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {transfer.items.length === 1 
                                ? transfer.items[0].name 
                                : `${transfer.items.length} items`}
                            </Typography>
                          }
                        />
                        {expandedTransferId === transfer.id ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </ListItem>
                      
                      <Collapse in={expandedTransferId === transfer.id}>
                        <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                          <Typography variant="body2" gutterBottom>
                            <strong>From:</strong> {transfer.from.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>To:</strong> {transfer.to.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Initiated by:</strong> {transfer.initiatedBy.rank} {transfer.initiatedBy.name}
                          </Typography>
                          
                          <Stack 
                            direction="row" 
                            spacing={1} 
                            sx={{ mt: 2 }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => onViewTransfer(transfer)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleApprovalOpen(transfer.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDenialOpen(transfer.id)}
                            >
                              Deny
                            </Button>
                          </Stack>
                        </Box>
                      </Collapse>
                    </Paper>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
          
          {/* Medium Priority Transfers */}
          {groupedTransfers[TransferPriority.MEDIUM].length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="warning.main" gutterBottom>
                Medium Priority
              </Typography>
              <List disablePadding>
                {groupedTransfers[TransferPriority.MEDIUM].map((transfer) => (
                  <React.Fragment key={transfer.id}>
                    <Paper 
                      sx={{ 
                        mb: 1, 
                        borderLeft: '4px solid #ff9800',
                        overflow: 'hidden' 
                      }}
                    >
                      <ListItem 
                        button 
                        onClick={() => toggleExpanded(transfer.id)}
                      >
                        <ListItemIcon>
                          <AssignmentIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" fontWeight="medium">
                                {transfer.id}
                              </Typography>
                              {renderPriorityBadge(transfer.priority)}
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {transfer.items.length === 1 
                                ? transfer.items[0].name 
                                : `${transfer.items.length} items`}
                            </Typography>
                          }
                        />
                        {expandedTransferId === transfer.id ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </ListItem>
                      
                      <Collapse in={expandedTransferId === transfer.id}>
                        <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                          <Typography variant="body2" gutterBottom>
                            <strong>From:</strong> {transfer.from.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>To:</strong> {transfer.to.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Initiated by:</strong> {transfer.initiatedBy.rank} {transfer.initiatedBy.name}
                          </Typography>
                          
                          <Stack 
                            direction="row" 
                            spacing={1} 
                            sx={{ mt: 2 }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => onViewTransfer(transfer)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleApprovalOpen(transfer.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDenialOpen(transfer.id)}
                            >
                              Deny
                            </Button>
                          </Stack>
                        </Box>
                      </Collapse>
                    </Paper>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
          
          {/* Routine Transfers */}
          {groupedTransfers[TransferPriority.ROUTINE].length > 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Routine
                </Typography>
                <Button 
                  size="small" 
                  variant="outlined"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    const routineIds = groupedTransfers[TransferPriority.ROUTINE].map(t => t.id);
                    if (routineIds.length > 0) {
                      onApprove(routineIds.join(','), 'Batch approved routine transfers');
                    }
                  }}
                  disabled={groupedTransfers[TransferPriority.ROUTINE].length === 0}
                >
                  Batch Approve Routine
                </Button>
              </Box>
              <List disablePadding>
                {groupedTransfers[TransferPriority.ROUTINE].map((transfer) => (
                  <React.Fragment key={transfer.id}>
                    <Paper 
                      sx={{ 
                        mb: 1, 
                        borderLeft: '4px solid #2196f3',
                        overflow: 'hidden' 
                      }}
                    >
                      <ListItem 
                        button 
                        onClick={() => toggleExpanded(transfer.id)}
                      >
                        <ListItemIcon>
                          <AssignmentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" fontWeight="medium">
                                {transfer.id}
                              </Typography>
                              {renderPriorityBadge(transfer.priority)}
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {transfer.items.length === 1 
                                ? transfer.items[0].name 
                                : `${transfer.items.length} items`}
                            </Typography>
                          }
                        />
                        {expandedTransferId === transfer.id ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </ListItem>
                      
                      <Collapse in={expandedTransferId === transfer.id}>
                        <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                          <Typography variant="body2" gutterBottom>
                            <strong>From:</strong> {transfer.from.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>To:</strong> {transfer.to.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Initiated by:</strong> {transfer.initiatedBy.rank} {transfer.initiatedBy.name}
                          </Typography>
                          
                          <Stack 
                            direction="row" 
                            spacing={1} 
                            sx={{ mt: 2 }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => onViewTransfer(transfer)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleApprovalOpen(transfer.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDenialOpen(transfer.id)}
                            >
                              Deny
                            </Button>
                          </Stack>
                        </Box>
                      </Collapse>
                    </Paper>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => onViewTransfer(pendingTransfers[0])}
            >
              Review All Pending
            </Button>
          </Box>
        </>
      )}
      
      {renderApprovalDialog()}
      {renderDenialDialog()}
    </Card>
  );
};

export default PendingApprovalsCard; 