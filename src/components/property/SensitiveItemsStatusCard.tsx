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
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  useTheme,
  alpha
} from '@mui/material';
import { 
  PlaylistAddCheck as PlaylistAddCheckIcon, 
  CheckCircle as CheckCircleIcon, 
  Warning as WarningIcon, 
  Error as ErrorIcon 
} from '@mui/icons-material';

interface SensitiveCategoryStatus {
  category: string;
  total: number;
  verified: number;
  verificationStatus: 'complete' | 'partial' | 'overdue';
}

interface SensitiveItemsStatusCardProps {
  totalItems: number;
  verifiedItems: number;
  lastInventoryDate: string;
  nextRequiredDate: string;
  categories: SensitiveCategoryStatus[];
  onStartInventory?: () => void;
}

export const SensitiveItemsStatusCard: React.FC<SensitiveItemsStatusCardProps> = ({
  totalItems,
  verifiedItems,
  lastInventoryDate,
  nextRequiredDate,
  categories,
  onStartInventory,
}) => {
  const theme = useTheme();
  
  // Calculate verification percentage
  const verificationPercentage = Math.round((verifiedItems / totalItems) * 100);
  
  // Determine overall status
  const getOverallStatus = (): 'success' | 'warning' | 'error' => {
    if (verificationPercentage === 100) return 'success';
    
    const nextRequired = new Date(nextRequiredDate);
    const today = new Date();
    const daysDifference = Math.floor((nextRequired.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (nextRequired < today) return 'error';
    if (daysDifference <= 3) return 'warning';
    return 'warning';
  };
  
  const overallStatus = getOverallStatus();
  
  // Function to get status color
  const getStatusColor = (status: SensitiveCategoryStatus['verificationStatus']): string => {
    switch (status) {
      case 'complete':
        return theme.palette.success.main;
      case 'partial':
        return theme.palette.warning.main;
      case 'overdue':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: SensitiveCategoryStatus['verificationStatus']) => {
    switch (status) {
      case 'complete':
        return <CheckCircleIcon fontSize="small" sx={{ color: 'success.main' }} />;
      case 'partial':
        return <WarningIcon fontSize="small" sx={{ color: 'warning.main' }} />;
      case 'overdue':
        return <ErrorIcon fontSize="small" sx={{ color: 'error.main' }} />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Sensitive Items Status" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Sensitive Items Verification
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Items:
                  </Typography>
                  <Typography variant="h6">
                    {totalItems}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Verified:
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color={
                      verificationPercentage === 100 
                        ? 'success.main' 
                        : verificationPercentage >= 90 
                          ? 'warning.main' 
                          : 'error.main'
                    }
                  >
                    {verifiedItems} ({verificationPercentage}%)
                  </Typography>
                </Grid>
              </Grid>
              
              <Box mt={1.5}>
                <LinearProgress 
                  variant="determinate" 
                  value={verificationPercentage} 
                  color={overallStatus}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 1 
                  }}
                />
              </Box>
              
              <Grid container spacing={1} mt={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Last Inventory:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(lastInventoryDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Next Required:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color={overallStatus === 'error' ? 'error.main' : overallStatus === 'warning' ? 'warning.main' : 'text.primary'}
                    fontWeight={overallStatus !== 'success' ? 'medium' : 'normal'}
                  >
                    {new Date(nextRequiredDate).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Verification by Category
            </Typography>
            <TableContainer sx={{ maxHeight: 180 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Items</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(category.verificationStatus)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {category.category}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {category.verified}/{category.total}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={
                            category.verificationStatus === 'complete' 
                              ? 'Complete' 
                              : category.verificationStatus === 'partial' 
                                ? 'Partial' 
                                : 'Overdue'
                          } 
                          size="small"
                          sx={{
                            bgcolor: alpha(getStatusColor(category.verificationStatus), 0.1),
                            color: getStatusColor(category.verificationStatus),
                            borderColor: alpha(getStatusColor(category.verificationStatus), 0.3),
                            borderWidth: 1,
                            borderStyle: 'solid',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button 
                variant="contained" 
                color={overallStatus === 'error' ? 'error' : overallStatus === 'warning' ? 'warning' : 'primary'}
                startIcon={<PlaylistAddCheckIcon />}
                onClick={onStartInventory}
              >
                {verificationPercentage === 100 
                  ? 'Start New Inventory' 
                  : verificationPercentage > 0 
                    ? 'Continue Inventory' 
                    : 'Start Inventory'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 