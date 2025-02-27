import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Chip,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface SubHandReceipt {
  id: string;
  holder: string;
  items: number;
  lastSigned: string;
  expiration: string;
  status: 'CURRENT' | 'EXPIRING' | 'EXPIRED';
  daysRemaining: number;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CURRENT':
      return 'success';
    case 'EXPIRING':
      return 'warning';
    case 'EXPIRED':
      return 'error';
    default:
      return 'default';
  }
};

const SubHandReceiptStatusTable: React.FC = () => {
  // Mock data for the table
  const subHandReceipts: SubHandReceipt[] = [
    {
      id: '1',
      holder: '1LT Morgan',
      items: 198,
      lastSigned: '02FEB2025',
      expiration: '02MAY2025',
      status: 'CURRENT',
      daysRemaining: 79,
    },
    {
      id: '2',
      holder: '1LT Chen',
      items: 187,
      lastSigned: '02FEB2025',
      expiration: '02MAY2025',
      status: 'CURRENT',
      daysRemaining: 79,
    },
    {
      id: '3',
      holder: '1LT Williams',
      items: 201,
      lastSigned: '25JAN2025',
      expiration: '25APR2025',
      status: 'CURRENT',
      daysRemaining: 71,
    },
    {
      id: '4',
      holder: '1LT Jackson',
      items: 135,
      lastSigned: '05NOV2024',
      expiration: '05FEB2025',
      status: 'EXPIRED',
      daysRemaining: 0,
    },
    {
      id: '5',
      holder: 'SSG Martinez',
      items: 179,
      lastSigned: '01FEB2025',
      expiration: '01MAY2025',
      status: 'CURRENT',
      daysRemaining: 78,
    },
    {
      id: '6',
      holder: 'SPC Lee',
      items: 95,
      lastSigned: '30JAN2025',
      expiration: '30APR2025',
      status: 'CURRENT',
      daysRemaining: 76,
    },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = subHandReceipts.map((receipt) => receipt.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sub-Hand Receipt Status
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < subHandReceipts.length}
                  checked={subHandReceipts.length > 0 && selected.length === subHandReceipts.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Holder</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Last Signed</TableCell>
              <TableCell align="center">Expiration</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subHandReceipts.map((receipt) => {
              const isItemSelected = isSelected(receipt.id);
              return (
                <StyledTableRow
                  key={receipt.id}
                  hover
                  onClick={() => handleClick(receipt.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="medium">
                      {receipt.holder}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{receipt.items}</TableCell>
                  <TableCell align="center">{receipt.lastSigned}</TableCell>
                  <TableCell align="center">{receipt.expiration}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${receipt.status} ${receipt.status !== 'EXPIRED' ? `(${receipt.daysRemaining}d)` : ''}`}
                      color={getStatusColor(receipt.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {receipt.status === 'EXPIRED' ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        startIcon={<AutorenewIcon />}
                      >
                        Renew Now
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        endIcon={<PrintIcon />}
                      >
                        View/Print
                      </Button>
                    )}
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubHandReceiptStatusTable; 