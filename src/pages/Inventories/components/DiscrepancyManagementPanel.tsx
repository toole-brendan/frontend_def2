import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Chip,
  IconButton, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Divider,
  CardHeader,
  // @ts-ignore - Unused variable intentionally kept
  useTheme
} from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HelpIcon from '@mui/icons-material/Help';
import { discrepancyRows } from './mockData';

export const DiscrepancyManagementPanel: React.FC = () => {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // @ts-ignore - Unused variable intentionally kept
  const [selectedDiscrepancy, setSelectedDiscrepancy] = React.useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, discrepancyId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDiscrepancy(discrepancyId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDiscrepancy(null);
  };

  // Function to determine status chip color
  const getStatusColor = (status: string) => {
    if (status === 'Resolved') return 'success';
    if (status === 'In Process') return 'primary';
    return 'error';
  };

  return (
    <Paper elevation={3}>
      <CardHeader 
        title="Discrepancy Management" 
        avatar={<AssignmentLateIcon color="warning" />}
        action={
          <Button 
            variant="contained" 
            color="warning" 
            size="small"
            startIcon={<DescriptionIcon />}
          >
            Generate FLIPL
          </Button>
        }
      />
      <Divider />
      
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Expected</TableCell>
              <TableCell>Found</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discrepancyRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {row.item}
                  </Typography>
                </TableCell>
                <TableCell>{row.serialNumber}</TableCell>
                <TableCell>{row.expected}</TableCell>
                <TableCell>
                  <Typography 
                    variant="body2"
                    color={row.found === 'Not Found' ? 'error' : 'inherit'}
                    fontWeight={row.found === 'Not Found' ? 'bold' : 'normal'}
                  >
                    {row.found}
                  </Typography>
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    color={getStatusColor(row.status)}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ mr: 1 }}
                    >
                      Process
                    </Button>
                    <IconButton
                      size="small"
                      onClick={(event) => handleMenuClick(event, row.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Discrepancies must be resolved within 24 hours of discovery per AR 735-5
        </Typography>
        <Box>
          <Button 
            variant="outlined"
            startIcon={<MonetizationOnIcon />}
            sx={{ mr: 1 }}
          >
            Process Selected
          </Button>
          <Button 
            variant="text"
            startIcon={<HelpIcon />}
          >
            Request Assistance
          </Button>
        </Box>
      </Box>
      
      {/* Discrepancy Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          Initiate FLIPL (DD Form 200)
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Process Statement of Charges
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Document Found Item
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          Update Records
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Request Adjustment
        </MenuItem>
      </Menu>
    </Paper>
  );
}; 