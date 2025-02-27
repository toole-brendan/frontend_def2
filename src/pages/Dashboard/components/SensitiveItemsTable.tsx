import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  styled 
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SensitiveItemsTableProps } from '../types';

const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
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
  '& .MuiTableCell-root': {
    padding: theme.spacing(1),
    fontSize: '0.875rem',
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    fontWeight: 600,
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 24,
}));

export const SensitiveItemsTable: React.FC<SensitiveItemsTableProps> = ({ items }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <SecurityIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">SENSITIVE ITEMS ACCOUNTABILITY</Typography>
      </div>
      <div className="card-content">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nomenclature</TableCell>
                <TableCell>Serial/NSN</TableCell>
                <TableCell>Sub-Hand Receipt</TableCell>
                <TableCell>Last PMCS</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 500 }}>{item.nomenclature}</TableCell>
                  <TableCell>{item.serialOrNsn}</TableCell>
                  <TableCell>{item.subHandReceipt}</TableCell>
                  <TableCell>{item.lastPmcs}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <StatusChip 
                        label={item.status} 
                        color={item.status === 'FMC' ? 'success' : 'warning'}
                        size="small"
                        icon={item.status === 'FMC' ? <CheckCircleIcon /> : undefined}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SecurityIcon />}
          >
            Conduct Sensitive Item Inventory
          </Button>
        </Box>
      </div>
    </StyledCard>
  );
}; 