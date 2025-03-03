import React from 'react';
import {
  Paper,
  Chip,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  useTheme,
} from '@mui/material';
import { CardHeader, SectionHeader } from '../../../components/common';
import { PriorityTransfersProps } from '../types';
import TypeChip from './TypeChip';

/**
 * PriorityTransfers component for TransfersMovement
 * 
 * Displays high priority transfers that require immediate action
 */
const PriorityTransfers: React.FC<PriorityTransfersProps> = ({ transfers }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ 
      p: 2, 
      mb: 3, 
      height: '100%',
      borderRadius: 1,
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.divider}`,
      borderLeft: `3px solid ${theme.palette.error.main}`,
    }}>
      <CardHeader 
        title="High Priority Transfers"
        subtitle="Transfers requiring immediate action"
        action={
          <Chip 
            label="ACTION REQUIRED" 
            size="small" 
            sx={{ 
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              borderRadius: 1,
              fontSize: '0.7rem',
              fontWeight: 600,
              height: 24
            }} 
          />
        }
      />
      
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              bgcolor: alpha(theme.palette.background.default, 0.5),
              '& th': { fontWeight: 600, padding: '8px 16px' }
            }}>
              <TableCell sx={{ width: '30%', p: 2 }}>Transfer</TableCell>
              <TableCell sx={{ width: '30%', p: 2 }}>Due</TableCell>
              <TableCell sx={{ width: '20%', p: 2 }}>Type</TableCell>
              <TableCell sx={{ width: '20%', p: 2 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map((transfer, index) => (
              <TableRow key={index} sx={{ '&:hover': { bgcolor: alpha(theme.palette.background.default, 0.3) } }}>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {transfer.docNumber}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {transfer.unit}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight="medium" color={transfer.status === 'OVERDUE' ? 'error.main' : 'text.primary'}>
                    {transfer.dueDate}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {transfer.daysLeft}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <TypeChip type={transfer.type} size="small" />
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Chip 
                    label={transfer.status} 
                    size="small" 
                    sx={{ 
                      bgcolor: transfer.status === 'OVERDUE' 
                        ? alpha(theme.palette.error.main, 0.1)
                        : alpha(theme.palette.warning.main, 0.1),
                      color: transfer.status === 'OVERDUE' 
                        ? theme.palette.error.main
                        : theme.palette.warning.main,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      height: 24
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PriorityTransfers;
