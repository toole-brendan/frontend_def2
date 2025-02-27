import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress,
  styled 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { AccountabilityStatusCardProps } from '../types';

const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
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

const CircularProgressBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  margin: theme.spacing(2, 0),
}));

const CircularProgressLabel = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'OK':
      return <CheckCircleIcon color="success" />;
    case 'WARNING':
      return <WarningIcon color="warning" />;
    case 'ERROR':
      return <ErrorIcon color="error" />;
    default:
      return <CheckCircleIcon color="success" />;
  }
};

export const AccountabilityStatusCard: React.FC<AccountabilityStatusCardProps> = ({ 
  overallRate, 
  subHandReceipts 
}) => {
  return (
    <StyledCard>
      <div className="card-header">
        <Typography variant="h6">ACCOUNTABILITY STATUS</Typography>
      </div>
      <div className="card-content">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <CircularProgressBox sx={{ width: 120, height: 120 }}>
            <CircularProgress
              variant="determinate"
              value={overallRate}
              size={120}
              thickness={5}
              color={overallRate >= 99 ? "success" : overallRate >= 95 ? "warning" : "error"}
            />
            <CircularProgressLabel>
              <Typography variant="h4" component="div" color="text.primary">
                {overallRate}%
              </Typography>
              <Typography variant="caption" component="div" color="text.secondary">
                Overall
              </Typography>
            </CircularProgressLabel>
          </CircularProgressBox>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Sub-hand receipt breakdown:
        </Typography>
        
        <List dense>
          {subHandReceipts.map((receipt, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <Box sx={{ mr: 1 }}>
                {getStatusIcon(receipt.status)}
              </Box>
              <ListItemText
                primary={
                  <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {receipt.officer} ({receipt.platoon})
                    </Typography>
                    <Typography variant="body2">
                      {receipt.itemCount} items
                    </Typography>
                  </Box>
                }
                secondary={receipt.statusMessage}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            View PBUSE Data
          </Button>
        </Box>
      </div>
    </StyledCard>
  );
}; 