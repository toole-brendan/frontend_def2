import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  LocalShipping as TrackIcon,
  Speed as ExpediteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { cardSx, actionButtonSx } from '../styles';
import { CardHeader, StatusChip } from '../../../components/common';

// Mock data for critical parts
const criticalParts = [
  {
    id: 'P1',
    partNumber: '57K0918',
    nsn: '2530-01-396-2826',
    description: 'Brake assembly',
    quantity: 2,
    status: 'On Order',
    eta: '28FEB2025',
    affectedEquipment: '2x HMMWV',
    priority: 'High'
  },
  {
    id: 'P2',
    partNumber: '12472698',
    nsn: '1005-01-591-5825',
    description: 'Firing pin',
    quantity: 5,
    status: 'Backordered',
    eta: '15MAR2025',
    affectedEquipment: '5x M4',
    priority: 'Critical'
  },
  {
    id: 'P3',
    partNumber: 'RT-1523F',
    nsn: '5820-01-598-1678',
    description: 'Power supply',
    quantity: 1,
    status: 'On Order',
    eta: '03MAR2025',
    affectedEquipment: '1x SINCGARS',
    priority: 'Urgent'
  }
];

// Parts status summary
const partsStatus = {
  onOrder: 24,
  backordered: 9,
  recentReceipts: 17,
  criticalShortages: 4
};

interface PartsManagementCardProps {
  onTrackPart: (partId: string) => void;
  onExpeditePart: (partId: string) => void;
  onOrderParts: () => void;
  onTrackShipments: () => void;
  onManageInventory: () => void;
}

const PartsManagementCard: React.FC<PartsManagementCardProps> = ({
  onTrackPart,
  onExpeditePart,
  onOrderParts,
  onTrackShipments,
  onManageInventory
}) => {
  const theme = useTheme();

  return (
    <Paper 
      sx={{ 
        ...cardSx(theme),
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&::before': {
          top: 0,
          right: 0,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
        },
        '&::after': {
          bottom: 0,
          right: 0,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
        }
      }}
    >
      <CardHeader title="Parts Management" />

      {/* Parts Status Overview */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2, 
        mb: 3, 
        pt: 1,
        justifyContent: 'space-between'
      }}>
        <Box sx={{ 
          p: 1, 
          borderRadius: 1, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          minWidth: '45%'
        }}>
          <Typography variant="subtitle2" color="text.secondary">
            On-Order Parts
          </Typography>
          <Typography variant="h5" color="primary.main" fontWeight="medium">
            {partsStatus.onOrder}
          </Typography>
        </Box>
        
        <Box sx={{ 
          p: 1, 
          borderRadius: 1, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          minWidth: '45%'
        }}>
          <Typography variant="subtitle2" color="text.secondary">
            Backordered Parts
          </Typography>
          <Typography variant="h5" color="warning.main" fontWeight="medium">
            {partsStatus.backordered}
          </Typography>
        </Box>
        
        <Box sx={{ 
          p: 1, 
          borderRadius: 1, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          minWidth: '45%'
        }}>
          <Typography variant="subtitle2" color="text.secondary">
            Recent Receipts
          </Typography>
          <Typography variant="h5" color="success.main" fontWeight="medium">
            {partsStatus.recentReceipts}
          </Typography>
        </Box>
        
        <Box sx={{ 
          p: 1, 
          borderRadius: 1, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          minWidth: '45%'
        }}>
          <Typography variant="subtitle2" color="text.secondary">
            Critical Shortages
          </Typography>
          <Typography variant="h5" color="error.main" fontWeight="medium">
            {partsStatus.criticalShortages}
          </Typography>
        </Box>
      </Box>

      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 1, 
          fontWeight: 'medium',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: 30,
            height: 2,
            backgroundColor: theme.palette.primary.main,
          }
        }}
      >
        Critical Parts
      </Typography>

      {/* Critical Parts Table */}
      <TableContainer sx={{ maxHeight: 220 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {criticalParts.map((part) => (
              <TableRow key={part.id} hover>
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {part.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {part.nsn} · {part.affectedEquipment}
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusChip 
                      status={part.priority.toLowerCase()} 
                      label={part.priority}
                      size="small"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {part.status}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Qty: {part.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {part.eta}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => onTrackPart(part.id)}
                    sx={{ mr: 0.5 }}
                  >
                    <TrackIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => onExpeditePart(part.id)}
                    color="warning"
                  >
                    <ExpediteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 2 }} />

      {/* Quick Order Form Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="subtitle2" 
          gutterBottom
          sx={{ 
            fontWeight: 'medium',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: 20,
              height: 2,
              backgroundColor: theme.palette.primary.main,
            }
          }}
        >
          Quick NSN Lookup
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)', 
            borderRadius: 1,
            p: 1
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" noWrap>
              Enter NSN/Part Number...
            </Typography>
          </Box>
          <IconButton size="small">
            <SearchIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack spacing={1}>
        <Button
          variant="outlined"
          fullWidth
          sx={actionButtonSx(theme)}
          onClick={onOrderParts}
        >
          Order Parts
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={actionButtonSx(theme)}
          onClick={onTrackShipments}
        >
          Track Shipments
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={actionButtonSx(theme)}
          onClick={onManageInventory}
        >
          Manage Inventory
        </Button>
      </Stack>
    </Paper>
  );
};

export default PartsManagementCard; 