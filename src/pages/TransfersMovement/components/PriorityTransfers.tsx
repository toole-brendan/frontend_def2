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
import { CardHeader } from '../../../components/common';
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
      p: 0, 
      mb: 2, 
      borderRadius: 0, 
      border: '2px solid rgba(140, 140, 160, 0.12)', 
      height: '100%',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
        : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 16,
        height: 16,
        borderStyle: 'solid',
        borderWidth: '0 16px 16px 0',
        borderColor: `transparent ${alpha(theme.palette.error.main, theme.palette.mode === 'dark' ? 0.3 : 0.2)} transparent transparent`,
        zIndex: 1,
      }
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
              borderRadius: 0,
              height: 20,
              fontSize: '0.75rem',
              fontWeight: 'medium',
            }}
          />
        }
      />
      
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.error.main, 0.05) 
              }}>
                ID
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.error.main, 0.05) 
              }}>
                TYPE
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.error.main, 0.05) 
              }}>
                ITEMS
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.error.main, 0.05) 
              }}>
                DUE
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.error.main, 0.05) 
              }}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow 
                key={transfer.id} 
                hover 
                sx={{
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{transfer.id}</TableCell>
                <TableCell>
                  <TypeChip type={transfer.type} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>{transfer.items}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{transfer.fromTo}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: transfer.due === 'TODAY' ? 'error.main' : 'text.secondary',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                      fontWeight: transfer.due === 'TODAY' ? 'bold' : 'normal',
                    }}
                  >
                    {transfer.due}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{ 
                      borderRadius: 0,
                      fontSize: '0.7rem',
                      fontWeight: 'medium',
                      letterSpacing: '0.03em',
                      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {transfer.action}
                  </Button>
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
