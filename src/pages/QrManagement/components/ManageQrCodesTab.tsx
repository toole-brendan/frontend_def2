import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  alpha, 
  useTheme,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  Chip,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  Tooltip,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon, 
  Edit as EditIcon,
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
  VerifiedUser as VerifiedUserIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

// Mock data for QR codes
const mockQrCodes = Array(20).fill(null).map((_, index) => ({
  id: `QR-${1000 + index}`,
  assetType: index % 4 === 0 ? 'Communication' : 
    (index % 4 === 1 ? 'Weapon' : 
      (index % 4 === 2 ? 'Optic' : 'Vehicle')),
  nomenclature: index % 4 === 0 ? 'Radio PRC-117G' : 
    (index % 4 === 1 ? 'M4 Carbine' : 
      (index % 4 === 2 ? 'ACOG Scope' : 'HMMWV')),
  serialNumber: `SN-${2000 + index}`,
  status: index % 3 === 0 ? 'Assigned' : (index % 3 === 1 ? 'Available' : 'Pending Deactivation'),
  createdDate: '25 FEB 2025',
  blockchainVerified: index % 5 !== 0,
}));

const ManageQrCodesTab: React.FC = () => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const paperSx = {
    p: 3,
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = mockQrCodes.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Assigned':
        return 'success';
      case 'Available':
        return 'primary';
      case 'Pending Deactivation':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Main table section */}
      <Grid item xs={12}>
        <Paper sx={paperSx}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Manage QR Codes
            </Typography>
            <Box>
              <Button 
                variant="outlined" 
                sx={{ mr: 2 }}
                disabled={selected.length === 0}
                startIcon={<VerifiedUserIcon />}
              >
                Verify Selected
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ 
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' }
                }}
              >
                New QR Code
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <TextField 
              placeholder="Search QR codes..." 
              size="small"
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            <TextField
              select
              size="small"
              label="Status"
              defaultValue="all"
              sx={{ ml: 2, width: 150 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="pending">Pending Deactivation</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              label="Asset Type"
              defaultValue="all"
              sx={{ ml: 2, width: 150 }}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="communication">Communication</MenuItem>
              <MenuItem value="weapon">Weapon</MenuItem>
              <MenuItem value="optic">Optic</MenuItem>
              <MenuItem value="vehicle">Vehicle</MenuItem>
            </TextField>
          </Box>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < mockQrCodes.length}
                      checked={mockQrCodes.length > 0 && selected.length === mockQrCodes.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>QR ID</TableCell>
                  <TableCell>Asset Type</TableCell>
                  <TableCell>Nomenclature</TableCell>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Blockchain</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockQrCodes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  // @ts-ignore - Unused variable intentionally kept
                  .map((row, _index) => {
                    const isItemSelected = isSelected(row.id);
                    
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.assetType}</TableCell>
                        <TableCell>{row.nomenclature}</TableCell>
                        <TableCell>{row.serialNumber}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status} 
                            size="small"
                            color={getStatusColor(row.status) as any}
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>{row.createdDate}</TableCell>
                        <TableCell>
                          {row.blockchainVerified ? (
                            <Tooltip title="Verified on blockchain">
                              <VerifiedIcon color="success" fontSize="small" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Not verified on blockchain">
                              <ErrorIcon color="warning" fontSize="small" />
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mockQrCodes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      
      {/* Analytics Cards */}
      <Grid container item spacing={3}>
        {/* QR Code Status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                QR Code Status
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Assigned ({mockQrCodes.filter(qr => qr.status === 'Assigned').length})
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={60} 
                  color="success" 
                  sx={{ height: 8, borderRadius: 4, mb: 2 }} 
                />
                
                <Typography variant="body2" gutterBottom>
                  Available ({mockQrCodes.filter(qr => qr.status === 'Available').length})
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={30} 
                  color="primary" 
                  sx={{ height: 8, borderRadius: 4, mb: 2 }} 
                />
                
                <Typography variant="body2" gutterBottom>
                  Pending Deactivation ({mockQrCodes.filter(qr => qr.status === 'Pending Deactivation').length})
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={10} 
                  color="warning" 
                  sx={{ height: 8, borderRadius: 4, mb: 2 }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* QR Deactivation Tools */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                QR Deactivation Tools
              </Typography>
              
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Button variant="outlined" fullWidth>
                  Request Deactivation
                </Button>
                <Button variant="outlined" fullWidth>
                  Approve Deactivation Requests
                </Button>
                <Button variant="outlined" fullWidth>
                  View Deactivation History
                </Button>
              </Stack>
              
              <Box 
                sx={{ 
                  mt: 2, 
                  p: 2, 
                  backgroundColor: alpha(theme.palette.warning.light, 0.1),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>Note:</strong> Deactivated QR codes cannot be reused and will be marked as invalid in the system.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Blockchain Verification */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Blockchain Verification
              </Typography>
              
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Verification Status: {mockQrCodes.filter(qr => qr.blockchainVerified).length} of {mockQrCodes.length} verified
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={mockQrCodes.filter(qr => qr.blockchainVerified).length / mockQrCodes.length * 100} 
                    sx={{ height: 8, borderRadius: 4, flexGrow: 1, mr: 2 }} 
                  />
                  <Typography variant="body2" fontWeight="bold">
                    {Math.round(mockQrCodes.filter(qr => qr.blockchainVerified).length / mockQrCodes.length * 100)}%
                  </Typography>
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                fullWidth
                startIcon={<VerifiedUserIcon />}
                sx={{ mb: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Verify Unverified QR Codes
              </Button>
              
              <Button 
                variant="outlined" 
                fullWidth
              >
                Blockchain Verification Report
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManageQrCodesTab; 