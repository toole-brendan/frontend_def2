import React from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Stack, 
  Typography, 
  useTheme 
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpwardIcon, 
  ArrowDownward as ArrowDownwardIcon, 
  Warning as WarningIcon, 
  Report as ReportIcon, 
  FileOpen as FileOpenIcon, 
  PictureAsPdf as PictureAsPdfIcon, 
  NoteAdd as NoteAddIcon 
} from '@mui/icons-material';
import { InventoryStatusChart, InventoryStatusData } from '../common/charts';

interface CriticalItem {
  name: string;
  type: 'shortage' | 'excess' | 'critical';
  quantity: number;
}

interface PropertyBookSummaryCardProps {
  authorized: number;
  onHand: number;
  criticalItems: CriticalItem[];
  onViewAuthorization?: () => void;
  onGenerateReport?: () => void;
  onCreateShortage?: () => void;
}

export const PropertyBookSummaryCard: React.FC<PropertyBookSummaryCardProps> = ({
  authorized,
  onHand,
  criticalItems,
  onViewAuthorization,
  onGenerateReport,
  onCreateShortage,
}) => {
  const theme = useTheme();
  
  // Calculate percentages
  const filledPercentage = Math.round((onHand / authorized) * 100);
  const shortage = authorized > onHand ? authorized - onHand : 0;
  const excess = onHand > authorized ? onHand - authorized : 0;
  
  // Prepare chart data
  const chartData: InventoryStatusData[] = [
    { name: 'On Hand', value: onHand, color: theme.palette.primary.main },
    { name: 'Shortage', value: shortage, color: theme.palette.error.main }
  ];
  
  // Function to get icon based on item type
  const getItemIcon = (type: CriticalItem['type']) => {
    switch (type) {
      case 'shortage':
        return <ArrowDownwardIcon color="error" />;
      case 'excess':
        return <ArrowUpwardIcon color="warning" />;
      case 'critical':
        return <WarningIcon color="error" />;
      default:
        return <ReportIcon />;
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Property Book Summary" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1">Authorization Summary</Typography>
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Total Authorized:</Typography>
                    <Typography variant="h6">{authorized}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">On Hand:</Typography>
                    <Typography variant="h6">{onHand}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Fill Rate:</Typography>
                    <Typography variant="h6" color={filledPercentage < 90 ? 'error.main' : 'success.main'}>
                      {filledPercentage}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      {shortage > 0 ? 'Shortage:' : excess > 0 ? 'Excess:' : 'Balance:'}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color={
                        shortage > 0 
                          ? 'error.main' 
                          : excess > 0 
                            ? 'warning.main' 
                            : 'success.main'
                      }
                    >
                      {shortage > 0 
                        ? `-${shortage}` 
                        : excess > 0 
                          ? `+${excess}` 
                          : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {criticalItems.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Critical Items</Typography>
                  <List dense sx={{ mt: 1 }}>
                    {criticalItems.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {getItemIcon(item.type)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.name}
                          secondary={`${item.type === 'shortage' ? 'Short' : item.type === 'excess' ? 'Excess' : 'Critical'}: ${item.quantity}`}
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 200 }}>
              <InventoryStatusChart 
                data={chartData}
                title="Authorization Status"
                height={200}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1} mt={1} justifyContent="flex-end">
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<FileOpenIcon />}
                onClick={onViewAuthorization}
              >
                View MTOE/TDA
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<PictureAsPdfIcon />}
                onClick={onGenerateReport}
              >
                Property Report
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                startIcon={<NoteAddIcon />}
                onClick={onCreateShortage}
                color="primary"
              >
                Shortage Annex
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 