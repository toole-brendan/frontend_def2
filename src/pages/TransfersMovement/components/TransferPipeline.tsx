import React, { useState } from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  alpha,
  useTheme,
  Divider,
} from '@mui/material';
import { CardHeader, StatusChip } from '../../../components/common';
import { TransferPipelineProps } from '../types';
import TypeChip from './TypeChip';
import { pipelineStats } from '../mockData';

/**
 * TransferPipeline component for TransfersMovement
 * 
 * Displays a visual pipeline of transfers with status counts and a filtered table
 */
const TransferPipeline: React.FC<TransferPipelineProps> = ({ transfers }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Paper sx={{ 
      p: 0, 
      mb: 2, 
      borderRadius: 0, 
      border: '2px solid rgba(140, 140, 160, 0.12)',
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
        borderColor: `transparent ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2)} transparent transparent`,
        zIndex: 1,
      }
    }}>
      <CardHeader 
        title="Transfer Pipeline"
        subtitle="Overview of current transfers in the system"
        action={
          <Chip 
            label="Q1 Completion: 72%" 
            size="small" 
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              color: theme.palette.primary.main,
              borderRadius: 0,
              height: 20,
              fontSize: '0.75rem',
              fontWeight: 'medium',
            }}
          />
        }
      />
      
      {/* Transfer Pipeline Visualization */}
      <Box sx={{ p: 3, pt: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            mt: 2,
            position: 'relative',
            p: 1,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              height: 2,
              top: '50%',
              left: '5%',
              right: '5%',
              transform: 'translateY(-50%)',
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              zIndex: 1
            }
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mb: 1,
                bgcolor: alpha(theme.palette.grey[500], 0.1),
                color: theme.palette.text.secondary,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {pipelineStats.initiated}
            </Avatar>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: 'center',
                letterSpacing: '0.01em',
                fontSize: '0.7rem', 
                fontWeight: 'medium',
                lineHeight: 1.2
              }}
            >
              Initiated
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mb: 1,
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {pipelineStats.pendingApproval}
            </Avatar>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: 'center',
                letterSpacing: '0.01em',
                fontSize: '0.7rem', 
                fontWeight: 'medium',
                lineHeight: 1.2
              }}
            >
              Pending<br/>Approval
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mb: 1,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {pipelineStats.inTransit}
            </Avatar>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: 'center',
                letterSpacing: '0.01em',
                fontSize: '0.7rem', 
                fontWeight: 'medium',
                lineHeight: 1.2
              }}
            >
              In<br/>Transit
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mb: 1,
                bgcolor: alpha(theme.palette.info.main, 0.1),
                color: theme.palette.info.main,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {pipelineStats.pendingReceipt}
            </Avatar>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: 'center',
                letterSpacing: '0.01em',
                fontSize: '0.7rem', 
                fontWeight: 'medium',
                lineHeight: 1.2
              }}
            >
              Pending<br/>Receipt
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mb: 1,
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {pipelineStats.completed}
            </Avatar>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: 'center',
                letterSpacing: '0.01em',
                fontSize: '0.7rem', 
                fontWeight: 'medium',
                lineHeight: 1.2
              }}
            >
              Completed
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 3
            }
          }}
        >
          <Tab label="All Transfers" value="all" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="Pending Approval" value="pending" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="In Transit" value="transit" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="Pending Receipt" value="receipt" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
        </Tabs>

        {/* Transfer Table */}
        <TableContainer sx={{ mt: 2 }}>
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
                  ID
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
                  FROM → TO
                </TableCell>
                <TableCell sx={{ 
                  textTransform: 'uppercase', 
                  fontWeight: 'medium', 
                  fontSize: '0.75rem', 
                  letterSpacing: '0.05em',
                  backgroundColor: alpha(theme.palette.primary.main, 0.05) 
                }}>
                  DUE
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
              </TableRow>
            </TableHead>
            <TableBody>
              {transfers.slice(0, 3).map((transfer) => (
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
                    <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>
                      {transfer.from.substring(0, 12)} → {transfer.to.substring(0, 12)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: transfer.due === 'TODAY' ? 'error.main' : 'text.secondary',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default TransferPipeline;
