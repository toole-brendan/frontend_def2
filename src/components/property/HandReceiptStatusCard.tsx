import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

interface HandReceipt {
  platoon: string;
  responsible: string;
  itemCount: number;
  daysOld: number;
}

interface HandReceiptStatusCardProps {
  handReceipts: HandReceipt[];
}

const HandReceiptStatusCard: React.FC<HandReceiptStatusCardProps> = ({ handReceipts }) => {
  return (
    <Box sx={{ p: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'grey.500' }}>Platoon</TableCell>
              <TableCell sx={{ color: 'grey.500' }}>Responsible</TableCell>
              <TableCell align="center" sx={{ color: 'grey.500' }}>Items</TableCell>
              <TableCell align="center" sx={{ color: 'grey.500' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handReceipts.map((receipt, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{receipt.platoon}</TableCell>
                <TableCell sx={{ color: 'white' }}>{receipt.responsible}</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>{receipt.itemCount}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={receipt.daysOld <= 30 ? 'Current' : receipt.daysOld <= 60 ? 'Due Soon' : 'Overdue'}
                    size="small"
                    sx={{
                      bgcolor: receipt.daysOld <= 30 ? '#22C55E' :
                             receipt.daysOld <= 60 ? '#F59E0B' : '#EF4444',
                      color: 'white'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HandReceiptStatusCard; 