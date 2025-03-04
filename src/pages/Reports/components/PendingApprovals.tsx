import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Tooltip, Chip, Divider, IconButton, useTheme, alpha } from '@mui/material';
import { 
  Check as CheckIcon, 
  Close as CloseIcon,
  RemoveRedEye as ViewIcon,
} from '@mui/icons-material';
import { FileText, Clock, User } from 'lucide-react';
import { ReportData } from '../types';
import { paperSx } from '../styles';
import { formatReportDate } from '../utils';

interface PendingApprovalsProps {
  reports: ReportData[];
  onViewReport: (report: ReportData) => void;
  onApproveReport: (report: ReportData) => void;
  onRejectReport: (report: ReportData) => void;
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({
  reports,
  onViewReport,
  onApproveReport,
  onRejectReport
}) => {
  const theme = useTheme();
  
  // Filter only pending reports and sort by createdAt date (newest first)
  const pendingReports = reports
    .filter(report => report.status === 'pending')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Pending Approvals
        </Typography>
      </Box>
      
      {pendingReports.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No reports pending approval
          </Typography>
        </Box>
      ) : (
        <List sx={{ py: 0 }}>
          {pendingReports.map((report, index) => (
            <React.Fragment key={report.id}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FileText size={20} />
                  </Box>
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight="medium" sx={{ mr: 1 }}>
                        {report.title}
                      </Typography>
                      <Chip
                        label={report.type}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: '20px',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box component="div">
                      <Typography variant="body2" color="text.secondary" component="div" sx={{ mb: 1 }}>
                        {report.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 2 }}>
                          <Clock size={14} style={{ marginRight: '4px' }} />
                          <Typography variant="caption" component="span">
                            Submitted: {formatReportDate(report.createdAt, 'MMM dd, yyyy')}
                          </Typography>
                        </Box>
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                          <User size={14} style={{ marginRight: '4px' }} />
                          <Typography variant="caption" component="span">
                            By: {report.createdBy.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="View Report">
                      <IconButton
                        edge="end"
                        aria-label="view"
                        onClick={() => onViewReport(report)}
                        sx={{ mr: 1 }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Approve">
                      <IconButton
                        edge="end"
                        aria-label="approve"
                        color="success"
                        onClick={() => onApproveReport(report)}
                        sx={{ mr: 1 }}
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                      <IconButton
                        edge="end"
                        aria-label="reject"
                        color="error"
                        onClick={() => onRejectReport(report)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              {index < pendingReports.length - 1 && (
                <Divider component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default PendingApprovals; 