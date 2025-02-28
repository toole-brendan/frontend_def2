import React from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Chip, 
  Divider, 
  Grid, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Print as PrintIcon, 
  Refresh as RefreshIcon, 
  WarningAmber as WarningAmberIcon, 
  CheckCircle as CheckCircleIcon, 
  Error as ErrorIcon, 
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { SubHandReceiptType } from '../../types/property';

interface SubHandReceiptInfo {
  id: string;
  type: SubHandReceiptType;
  holder: string;
  itemCount: number;
  signatureStatus: 'signed' | 'pending' | 'expired';
  expirationDate: string;
}

interface HandReceiptManagementCardProps {
  primaryHolder: string;
  lastUpdated: string;
  totalItems: number;
  subHandReceipts: SubHandReceiptInfo[];
  onCreateReceipt?: () => void;
  onEditReceipt?: (id: string) => void;
  onPrintReceipt?: (id: string) => void;
  onRenewReceipt?: (id: string) => void;
}

export const HandReceiptManagementCard: React.FC<HandReceiptManagementCardProps> = ({
  primaryHolder,
  lastUpdated,
  totalItems,
  subHandReceipts,
  onCreateReceipt,
  onEditReceipt,
  onPrintReceipt,
  onRenewReceipt,
}) => {
  const theme = useTheme();

  // Utility function to calculate days remaining
  const getDaysRemaining = (dateString: string): number => {
    const expirationDate = new Date(dateString);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Utility function to get status color
  const getStatusColor = (status: SubHandReceiptInfo['signatureStatus'], daysRemaining?: number): string => {
    switch (status) {
      case 'signed':
        return daysRemaining !== undefined && daysRemaining <= 15 
          ? theme.palette.warning.main 
          : theme.palette.success.main;
      case 'pending':
        return theme.palette.warning.main;
      case 'expired':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  // Utility function to get status chip
  const getStatusChip = (receipt: SubHandReceiptInfo) => {
    const daysRemaining = getDaysRemaining(receipt.expirationDate);
    const isExpiring = daysRemaining > 0 && daysRemaining <= 15;
    
    let label = '';
    let icon = null;
    let color: 'success' | 'warning' | 'error' | 'default' = 'default';
    
    switch (receipt.signatureStatus) {
      case 'signed':
        label = isExpiring ? `Expires in ${daysRemaining} days` : 'Signed';
        icon = isExpiring ? <AccessTimeIcon /> : <CheckCircleIcon />;
        color = isExpiring ? 'warning' : 'success';
        break;
      case 'pending':
        label = 'Signature Needed';
        icon = <WarningAmberIcon />;
        color = 'warning';
        break;
      case 'expired':
        label = 'Expired';
        icon = <ErrorIcon />;
        color = 'error';
        break;
    }
    
    return (
      <Chip 
        icon={icon}
        label={label}
        size="small"
        color={color}
      />
    );
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Hand Receipt Management" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box 
              sx={{ 
                p: 2, 
                mb: 2, 
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                border: 1,
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Primary Hand Receipt
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Primary Hand Receipt Holder:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {primaryHolder}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Total Items:
                  </Typography>
                  <Typography variant="body1">
                    {totalItems}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(lastUpdated).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">Sub-Hand Receipts</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<AddIcon />}
                onClick={onCreateReceipt}
              >
                Create Receipt
              </Button>
            </Box>
            
            <TableContainer sx={{ maxHeight: 220 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Holder</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="center">Items</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subHandReceipts.map((receipt) => {
                    const daysRemaining = getDaysRemaining(receipt.expirationDate);
                    return (
                      <TableRow key={receipt.id}>
                        <TableCell>{receipt.holder}</TableCell>
                        <TableCell>{receipt.type}</TableCell>
                        <TableCell align="center">{receipt.itemCount}</TableCell>
                        <TableCell>{getStatusChip(receipt)}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button 
                              size="small" 
                              onClick={() => onEditReceipt?.(receipt.id)}
                              sx={{ minWidth: 0, p: 0.5 }}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                            <Button 
                              size="small" 
                              onClick={() => onPrintReceipt?.(receipt.id)}
                              sx={{ minWidth: 0, p: 0.5 }}
                            >
                              <PrintIcon fontSize="small" />
                            </Button>
                            {(receipt.signatureStatus === 'pending' || receipt.signatureStatus === 'expired' || daysRemaining <= 15) && (
                              <Button 
                                size="small" 
                                onClick={() => onRenewReceipt?.(receipt.id)}
                                sx={{ minWidth: 0, p: 0.5 }}
                                color={receipt.signatureStatus === 'expired' ? 'error' : 'warning'}
                              >
                                <RefreshIcon fontSize="small" />
                              </Button>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 