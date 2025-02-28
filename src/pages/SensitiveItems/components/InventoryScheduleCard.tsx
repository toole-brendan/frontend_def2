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
  Chip,
  Button,
  Divider
} from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';

interface InventoryRequirement {
  type: string;
  frequency: string;
  lastCompleted: string;
  nextRequired: string;
  status: 'On Schedule' | 'Days Remaining' | 'Overdue' | 'Complete' | 'N/A';
  daysRemaining?: number;
}

interface InventoryScheduleCardProps {
  inventoryRequirements: InventoryRequirement[];
  regulationReference: string;
  onScheduleSpecialInventory: () => void;
}

const InventoryScheduleCard: React.FC<InventoryScheduleCardProps> = ({
  inventoryRequirements,
  regulationReference,
  onScheduleSpecialInventory
}) => {
  const getStatusColor = (status: string, daysRemaining?: number): 'success' | 'warning' | 'error' | 'default' => {
    if (status === 'On Schedule' || status === 'Complete') return 'success';
    if (status === 'N/A') return 'default';
    if (status === 'Overdue') return 'error';
    if (status === 'Days Remaining' && daysRemaining !== undefined) {
      return daysRemaining <= 3 ? 'error' : daysRemaining <= 7 ? 'warning' : 'success';
    }
    return 'warning';
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          Sensitive Item Inventory Requirements
        </Typography>
      </Box>
      
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Inventory Type</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Last Completed</TableCell>
              <TableCell>Next Required</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryRequirements.map((requirement) => (
              <TableRow key={requirement.type}>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {requirement.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {requirement.frequency}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {requirement.lastCompleted}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {requirement.nextRequired}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={
                      requirement.status === 'Days Remaining' 
                        ? `${requirement.daysRemaining} Days Remaining` 
                        : requirement.status
                    }
                    size="small"
                    color={getStatusColor(requirement.status, requirement.daysRemaining)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Divider />
      
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
          {regulationReference}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<CalendarIcon />}
          onClick={onScheduleSpecialInventory}
          fullWidth
        >
          Schedule Special Inventory
        </Button>
      </Box>
    </Paper>
  );
};

export default InventoryScheduleCard; 