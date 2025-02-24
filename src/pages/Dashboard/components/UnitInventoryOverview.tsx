import React from 'react';
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  styled,
} from '@mui/material';
import { UnitInventoryOverviewProps } from '../types';

const StyledCard = styled(Card)(({ theme }) => ({
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

export const UnitInventoryOverview: React.FC<UnitInventoryOverviewProps> = ({
  stats,
  onViewAll,
}) => {
  return (
    <StyledCard>
      <div className="card-header">
        <Typography variant="h6">CRITICAL ITEMS</Typography>
        <Button
          color="primary"
          onClick={onViewAll}
          sx={{ textTransform: 'none' }}
        >
          View All
        </Button>
      </div>
      <div className="card-content">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.criticalItems.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'CRITICAL' ? 'error' : 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </StyledCard>
  );
}; 