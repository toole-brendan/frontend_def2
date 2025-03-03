import React from 'react';
import {
  Box,
  Paper,
  Button,
  IconButton,
  Chip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  useTheme,
} from '@mui/material';
import { CardHeader, StatusChip } from '../../../components/common';
import { TransferManagementTableProps } from '../types';
import TypeChip from './TypeChip';

import {
  CloudDownload as DownloadIcon,
  Description as FileTextIcon,
  MoreVert as MoreVerticalIcon,
} from '@mui/icons-material';

/**
 * TransferManagementTable component for TransfersMovement
 * 
 * Displays a comprehensive table of all transfers with detailed information
 */
const TransferManagementTable: React.FC<TransferManagementTableProps> = ({ transfers }) => {
  const theme = useTheme();

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    if (priority === 'HIGH') return theme.palette.error.main;
    if (priority === 'MEDIUM') return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Paper sx={{ 
      p: 0, 
      mb: 3, 
      borderRadius: 0,
      border: '2px solid rgba(140, 140, 160, 0.12)',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
        : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <CardHeader 
        title="Transfer Management"
        subtitle="DA FORM 3161/2062"
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon fontSize="small" />}
              size="small"
              sx={{ 
                color: 'text.secondary',
                borderRadius: 0,
                borderColor: 'rgba(140, 140, 160, 0.2)',
              }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileTextIcon fontSize="small" />}
              size="small"
              sx={{ 
                color: 'text.secondary', 
                borderRadius: 0,
                borderColor: 'rgba(140, 140, 160, 0.2)',
              }}
            >
              Documents
            </Button>
          </Box>
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
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                DOC #
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                TYPE
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                ITEMS
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                FROM
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                TO
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                DUE/RETURN
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                STATUS
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                PRIORITY
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                ACTIONS
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
                <TableCell sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>{transfer.items}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem' }}>{transfer.from}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem' }}>{transfer.to}</TableCell>
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
                  <StatusChip 
                    label={transfer.status} 
                    status={transfer.status}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={transfer.priority} 
                    size="small"
                    sx={{ 
                      bgcolor: alpha(getPriorityColor(transfer.priority), 0.1), 
                      color: getPriorityColor(transfer.priority),
                      borderRadius: 0,
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 'medium',
                      letterSpacing: '0.03em',
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small"
                    sx={{
                      border: '1px solid rgba(140, 140, 160, 0.2)',
                      borderRadius: 0,
                    }}
                  >
                    <MoreVerticalIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box 
          sx={{ 
            p: 1.5, 
            borderTop: '1px solid rgba(140, 140, 160, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.03) : alpha(theme.palette.grey[100], 0.5),
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>
            Displaying {transfers.length} of 89 transfers
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.primary.main,
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 'medium',
              letterSpacing: '0.03em',
              '&:hover': { 
                textDecoration: 'underline',
                color: alpha(theme.palette.primary.main, 0.8),
              }
            }}
          >
            View all transfers
          </Typography>
        </Box>
      </TableContainer>
    </Paper>
  );
};

export default TransferManagementTable;
