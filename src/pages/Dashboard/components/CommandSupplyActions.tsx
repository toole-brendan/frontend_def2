import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Grid,
  styled 
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { CommandSupplyActionsProps } from '../types';

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

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  fontWeight: 600,
  '& .MuiButton-startIcon': {
    margin: 0,
    marginBottom: theme.spacing(1),
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));

const getIconForAction = (iconName: string) => {
  switch (iconName) {
    case 'inventory':
      return <InventoryIcon />;
    case 'swap_horiz':
      return <SwapHorizIcon />;
    case 'description':
      return <DescriptionIcon />;
    case 'report_problem':
      return <ReportProblemIcon />;
    default:
      return <InventoryIcon />;
  }
};

export const CommandSupplyActions: React.FC<CommandSupplyActionsProps> = ({ actions }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <Typography variant="h6">COMMAND SUPPLY QUICK ACTIONS</Typography>
      </div>
      <div className="card-content">
        <Grid container spacing={2}>
          {actions.map((action) => (
            <Grid item xs={6} key={action.id}>
              <ActionButton
                variant="outlined"
                color="primary"
                startIcon={getIconForAction(action.icon)}
                fullWidth
              >
                {action.label}
              </ActionButton>
            </Grid>
          ))}
        </Grid>
      </div>
    </StyledCard>
  );
}; 