import React from 'react';
import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, alpha, useTheme,  } from '@mui/material';
import { CardHeader, StatusChip } from '../../../components/common';
import { TransferManagementTableProps } from '../types';
import TypeChip from './TypeChip';

import {
  AddCircleOutline as AddIcon,
  FileDownload as ExportIcon,
  Flag as FlagIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from '@mui/icons-material';

/**
 * TransferManagementTable component for TransfersMovement
 * 
 * Displays a comprehensive table of all transfers with detailed information
 */
const TransferManagementTable: React.FC<TransferManagementTableProps> = ({ transfers }) => {
  const theme = useTheme();

  // Get appropriate color based on priority
  const getPriorityColor = (priority: string) => {
    if (priority === 'HIGH') return theme.palette.error.main;
    if (priority === 'MEDIUM') return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Paper sx={{ 
      p: 2,
      mb: 3,
      borderRadius: 1,
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.divider}`,
    }}>
      <CardHeader 
        title="All Transfers"
        subtitle="Comprehensive view of all transfer documents"
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<ExportIcon />}
              size="small"
              sx={{ 
                fontSize: '0.75rem',
                fontWeight: 'medium',
              }}
            >
              Export
            </Button>
            <Button 
              startIcon={<AddIcon />}
              size="small"
              variant="contained"
              sx={{ 
                fontSize: '0.75rem',
                fontWeight: 'medium',
              }}
            >
              New Transfer
            </Button>
          </Box>
        }
      />
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              bgcolor: alpha(theme.palette.background.default, 0.5),
              '& th': { fontWeight: 600, padding: '10px 16px' }
            }}>
              <TableCell sx={{ p: 2 }}>Document</TableCell>
              <TableCell sx={{ p: 2 }}>Type</TableCell>
              <TableCell sx={{ p: 2 }}>Items</TableCell>
              <TableCell sx={{ p: 2 }}>From</TableCell>
              <TableCell sx={{ p: 2 }}>To</TableCell>
              <TableCell sx={{ p: 2 }}>Status</TableCell>
              <TableCell sx={{ p: 2 }}>Priority</TableCell>
              <TableCell align="right" sx={{ p: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  // @ts-ignore - Unused variable intentionally kept
            {transfers.map((transfer, _index) => (
              <TableRow key={transfer.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.background.default, 0.3) } }}>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {transfer.id}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {transfer.initiated}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <TypeChip type={transfer.type} size="small" />
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2">
                    {transfer.items}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2">
                    {transfer.from}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Typography variant="body2">
                    {transfer.to}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <StatusChip status={transfer.status} />
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FlagIcon 
                      sx={{ 
                        color: getPriorityColor(transfer.priority), 
                        mr: 0.5, 
                        fontSize: 16 
                      }} 
                    />
                    <Typography variant="body2">
                      {transfer.priority}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ p: 2 }}>
                  <Button
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'medium',
                    }}
                  >
                    View
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

export default TransferManagementTable;
