import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Stack,
  styled,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import PrintIcon from '@mui/icons-material/Print';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CommentIcon from '@mui/icons-material/Comment';
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import DraftsIcon from '@mui/icons-material/Drafts';
import PendingIcon from '@mui/icons-material/Pending';
import InfoIcon from '@mui/icons-material/Info';

interface PbuseTransaction {
  id: string;
  documentNumber: string;
  type: 'Issue' | 'LT' | 'Turn-in' | 'FLIPL';
  nsnLin: string;
  nomenclature: string;
  qty: number;
  status: 'PBO Review' | 'Completed' | 'Draft' | '15-6 Invest.';
  created: string;
  lastAction: string;
}

const StatusIndicator = styled(Box)<{ status: 'success' | 'warning' | 'error' | 'info' }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette[status].main,
  '& svg': {
    fontSize: '1rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const getStatusChip = (status: string) => {
  switch (status) {
    case 'PBO Review':
      return <Chip size="small" label={status} color="warning" icon={<PendingIcon />} />;
    case 'Completed':
      return <Chip size="small" label={status} color="success" icon={<CheckCircleIcon />} />;
    case 'Draft':
      return <Chip size="small" label={status} color="default" icon={<DraftsIcon />} />;
    case '15-6 Invest.':
      return <Chip size="small" label={status} color="error" icon={<WarningIcon />} />;
    default:
      return <Chip size="small" label={status} />;
  }
};

const PbuseIntegrationPanel: React.FC = () => {
  // Mock data for PBUSE transactions
  const transactions: PbuseTransaction[] = [
    {
      id: '1',
      documentNumber: 'BD0287-5023',
      type: 'Issue',
      nsnLin: '2320-01-371-9577',
      nomenclature: 'HMMWV, M1151A1',
      qty: 1,
      status: 'PBO Review',
      created: '22FEB2025',
      lastAction: '23FEB2025',
    },
    {
      id: '2',
      documentNumber: 'XO0287-2156',
      type: 'LT',
      nsnLin: '5855-01-534-1822',
      nomenclature: 'NVG, AN/PVS-14',
      qty: 6,
      status: 'Completed',
      created: '21FEB2025',
      lastAction: '23FEB2025',
    },
    {
      id: '3',
      documentNumber: 'BD0287-5019',
      type: 'Turn-in',
      nsnLin: '5895-01-579-2301',
      nomenclature: 'Radio, SINCGARS',
      qty: 2,
      status: 'Draft',
      created: '24FEB2025',
      lastAction: 'N/A',
    },
    {
      id: '4',
      documentNumber: 'FB0287-0023',
      type: 'FLIPL',
      nsnLin: '1240-01-412-5012',
      nomenclature: 'ACOG, TA31B1',
      qty: 1,
      status: '15-6 Invest.',
      created: '14FEB2025',
      lastAction: '20FEB2025',
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        PBUSE Integration Panel
      </Typography>
      <Grid container spacing={3}>
        {/* PBUSE Synchronization Status */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardHeader title="PBUSE Synchronization Status" />
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <StatusIndicator status="success">
                    <CheckCircleIcon />
                    <Typography variant="body2">
                      PBUSE Connection Status: ACTIVE (Connected to PBUSE TEST/PROD server)
                    </Typography>
                  </StatusIndicator>
                </Box>
                <Box>
                  <StatusIndicator status="success">
                    <CheckCircleIcon />
                    <Typography variant="body2">
                      Component Hand Receipt Balance: 100% reconciled with PBUSE
                    </Typography>
                  </StatusIndicator>
                </Box>
                <Box>
                  <Typography variant="body2">
                    Last PBUSE ZPARK/ZPHRH Report: 23FEB2025
                  </Typography>
                </Box>
                <Box>
                  <StatusIndicator status="warning">
                    <WarningIcon />
                    <Typography variant="body2">
                      PBO Approved Transactions: 17 pending, 4 completed this week
                    </Typography>
                  </StatusIndicator>
                </Box>
                <Box>
                  <StatusIndicator status="info">
                    <InfoIcon />
                    <Typography variant="body2">
                      Document Register Status: 132 open documents, 23 require action
                    </Typography>
                  </StatusIndicator>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* PBUSE Actions */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title="PBUSE Actions" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<SyncIcon />}
                    color="primary"
                  >
                    Initiate PBUSE Transaction
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<PrintIcon />}
                  >
                    Print PBUSE Property Book
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<AssessmentIcon />}
                  >
                    Generate PBUSE Reports
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<CompareArrowsIcon />}
                  >
                    Reconcile with PBUSE
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<CommentIcon />}
                  >
                    Review PBO Comments
                  </ActionButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionButton
                    variant="outlined"
                    fullWidth
                    startIcon={<UpdateIcon />}
                  >
                    Request Serial Number Updates
                  </ActionButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* PBUSE Transaction Log */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardHeader title="PBUSE Transaction Log" />
            <CardContent>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Document Number</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>NSN/LIN</TableCell>
                      <TableCell>Nomenclature</TableCell>
                      <TableCell align="center">Qty</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Last Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <StyledTableRow key={transaction.id}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.documentNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.nsnLin}</TableCell>
                        <TableCell>{transaction.nomenclature}</TableCell>
                        <TableCell align="center">{transaction.qty}</TableCell>
                        <TableCell align="center">
                          {getStatusChip(transaction.status)}
                        </TableCell>
                        <TableCell>{transaction.created}</TableCell>
                        <TableCell>{transaction.lastAction}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PbuseIntegrationPanel; 