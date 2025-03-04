import { Theme, SxProps } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Common styles for cards in the Maintenance page
export const cardSx = (theme: Theme): SxProps<Theme> => ({
  height: '100%',
  borderRadius: 1,
  p: 2.5,
  boxShadow: theme.shadows[2],
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'dark' 
      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, transparent 50%)`
      : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.07)} 0%, transparent 50%)`,
    pointerEvents: 'none',
  }
});

// Style for the status workflow card
export const workflowCardSx = (theme: Theme): SxProps<Theme> => ({
  ...cardSx(theme),
  p: 3,
  borderLeft: 'none',
  background: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.6) 
    : theme.palette.background.paper,
});

// Style for the QR scanner button
export const qrButtonSx = (theme: Theme): SxProps<Theme> => ({
  position: 'absolute',
  right: theme.spacing(4),
  bottom: theme.spacing(4),
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[8],
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[12],
  }
});

// Status badges styles based on status
export const getStatusBadgeSx = (status: string, theme: Theme): SxProps<Theme> => {
  const statusColors: Record<string, any> = {
    'Pending Approval': {
      background: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
      border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
    },
    'Assigned': {
      background: alpha(theme.palette.info.main, 0.1),
      color: theme.palette.info.main,
      border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`
    },
    'In Progress': {
      background: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
    },
    'Awaiting Parts': {
      background: alpha(theme.palette.secondary.main, 0.1),
      color: theme.palette.secondary.main,
      border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`
    },
    'Ready for Pickup': {
      background: alpha(theme.palette.success.main, 0.1),
      color: theme.palette.success.main,
      border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
    },
    'Complete': {
      background: alpha(theme.palette.success.dark, 0.1),
      color: theme.palette.success.dark,
      border: `1px solid ${alpha(theme.palette.success.dark, 0.3)}`
    }
  };

  const defaultStyles = {
    background: alpha(theme.palette.grey[500], 0.1),
    color: theme.palette.grey[600],
    border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`
  };

  return {
    px: 1.5,
    py: 0.5,
    borderRadius: 2,
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: 'medium',
    ...statusColors[status] || defaultStyles
  };
};

// Style for priority badges
export const getPriorityBadgeSx = (priority: string, theme: Theme): SxProps<Theme> => {
  const priorityColors: Record<string, any> = {
    'Emergency': {
      background: alpha(theme.palette.error.main, 0.1),
      color: theme.palette.error.main,
      border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`
    },
    'Critical': {
      background: alpha(theme.palette.error.main, 0.1),
      color: theme.palette.error.main,
      border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`
    },
    'Urgent': {
      background: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
      border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
    },
    'High': {
      background: alpha(theme.palette.warning.light, 0.1),
      color: theme.palette.warning.dark,
      border: `1px solid ${alpha(theme.palette.warning.light, 0.3)}`
    },
    'Medium': {
      background: alpha(theme.palette.info.main, 0.1),
      color: theme.palette.info.main,
      border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`
    },
    'Routine': {
      background: alpha(theme.palette.primary.light, 0.1),
      color: theme.palette.primary.main,
      border: `1px solid ${alpha(theme.palette.primary.light, 0.3)}`
    },
    'Low': {
      background: alpha(theme.palette.success.light, 0.1),
      color: theme.palette.success.main,
      border: `1px solid ${alpha(theme.palette.success.light, 0.3)}`
    }
  };

  const defaultStyles = {
    background: alpha(theme.palette.grey[500], 0.1),
    color: theme.palette.grey[600],
    border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`
  };

  return {
    px: 1.5,
    py: 0.5,
    borderRadius: 2,
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: 'medium',
    ...priorityColors[priority] || defaultStyles
  };
};

// Style for the table
export const tableSx = (theme: Theme): SxProps<Theme> => ({
  '& .MuiTableCell-root': {
    padding: theme.spacing(1.5),
    borderColor: alpha(theme.palette.divider, 0.6),
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    fontWeight: 600,
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.background.paper, 0.5) 
      : alpha(theme.palette.background.paper, 0.8),
  }
});

// Style for actionable buttons
export const actionButtonSx = (theme: Theme): SxProps<Theme> => ({
  borderRadius: 1,
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[1],
  }
});

// Style for the navigation tree
export const navTreeSx = (theme: Theme): SxProps<Theme> => ({
  '& .MuiTreeItem-root': {
    '&.Mui-selected > .MuiTreeItem-content': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
      }
    }
  },
  '& .MuiTreeItem-content': {
    padding: theme.spacing(0.5, 1),
    borderRadius: 1,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
    }
  },
  '& .MuiTreeItem-label': {
    fontSize: '0.875rem',
  }
}); 