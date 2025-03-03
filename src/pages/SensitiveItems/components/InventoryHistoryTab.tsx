import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleCompleteIcon,
  Error as ErrorIcon,
  VerifiedUser as VerifiedUserIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { KpiStatsCard } from '../../../components/common';
import { InventoryRecord } from '../../../types/sensitiveItems';

interface InventoryHistoryTabProps {
  inventoryHistory: InventoryRecord[];
}

/**
 * InventoryHistoryTab component displays the history of inventory checks
 */
const InventoryHistoryTab: React.FC<InventoryHistoryTabProps> = ({
  inventoryHistory
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Inventory History
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <KpiStatsCard
            icon={<AssignmentIcon fontSize="small" />}
            title="This Month"
            value="25 Inventories"
            subtitle="100% compliance rate"
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KpiStatsCard
            icon={<CheckCircleCompleteIcon fontSize="small" />}
            title="Last Complete"
            value={`${inventoryHistory[0].date} ${inventoryHistory[0].time}`}
            subtitle={inventoryHistory[0].conductor}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KpiStatsCard
            icon={<ErrorIcon fontSize="small" />}
            title="Discrepancies"
            value={`${inventoryHistory[0].missing} Item`}
            subtitle={inventoryHistory[0].notes}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KpiStatsCard
            icon={<VerifiedUserIcon fontSize="small" />}
            title="Blockchain Verified"
            value={`${inventoryHistory[0].found}/${inventoryHistory[0].items} Items`}
            subtitle={`${(inventoryHistory[0].found / inventoryHistory[0].items * 100).toFixed(1)}% verification rate`}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>

      {/* Inventory History Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 0, border: '1px solid rgba(140, 140, 160, 0.12)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05) 
              }}>
                DATE/TIME
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
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', md: 'table-cell' }
              }}>
                CONDUCTED BY
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              }}>
                VERIFIED
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', sm: 'table-cell' }
              }}>
                NOTES
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                width: 120
              }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryHistory.map((history) => (
              <TableRow key={history.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {history.date} {history.time}
                  </Typography>
                </TableCell>
                <TableCell>{history.type}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{history.conductor}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {history.found}/{history.items}
                  </Typography>
                  {history.missing > 0 ? (
                    <Chip 
                      label={`${history.missing} Missing`} 
                      size="small" 
                      color="warning"
                      sx={{ borderRadius: 0, mt: 0.5 }}
                    />
                  ) : (
                    <Chip 
                      label="All Verified" 
                      size="small" 
                      color="success"
                      sx={{ borderRadius: 0, mt: 0.5 }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{history.notes}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    sx={{ borderRadius: 0 }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryHistoryTab;
