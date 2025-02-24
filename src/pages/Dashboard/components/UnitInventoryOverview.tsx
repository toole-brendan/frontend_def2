import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { UnitInventoryOverviewProps } from '../types';

export const UnitInventoryOverview: React.FC<UnitInventoryOverviewProps> = ({
  stats,
  onViewAll,
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Critical Items</Typography>
          <Button
            color="primary"
            onClick={onViewAll}
            sx={{ textTransform: 'none' }}
          >
            View All
          </Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.criticalItems.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'CRITICAL' ? 'error' : 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}; 