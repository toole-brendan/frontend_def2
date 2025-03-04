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
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  Chip
} from '@mui/material';
import { Print as PrintIcon, Search as SearchIcon } from '@mui/icons-material';

// Mock data for QR codes to print
const mockQrCodes = Array(15).fill(null).map((_, index) => ({
  id: `QR-${1000 + index}`,
  equipment: index % 3 === 0 ? 'Radio PRC-117G' : (index % 3 === 1 ? 'ACOG Scope' : 'M4 Carbine'),
  serialNumber: `SN-${2000 + index}`,
  createdDate: '25 FEB 2025',
  printStatus: index % 3 === 0 ? 'Printed' : (index % 3 === 1 ? 'Never Printed' : 'Reprint Needed')
}));

const PrintQrCodesTab: React.FC = () => {
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

  return (
    <Grid container spacing={3}>
      {/* QR Codes Table and Print Settings */}
      <Grid item xs={12}>
        <Paper sx={paperSx}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Print QR Codes
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<PrintIcon />}
              disabled={selected.length === 0}
              sx={{ 
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' }
              }}
            >
              Print Selected ({selected.length})
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {/* Left side - QR Codes Table */}
            <Grid item xs={12} md={8}>
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
                  label="Filter"
                  defaultValue="all"
                  sx={{ ml: 2, width: 150 }}
                >
                  <MenuItem value="all">All QR Codes</MenuItem>
                  <MenuItem value="printed">Printed</MenuItem>
                  <MenuItem value="never-printed">Never Printed</MenuItem>
                  <MenuItem value="reprint">Reprint Needed</MenuItem>
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
                      <TableCell>Equipment</TableCell>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Print Status</TableCell>
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
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell>{row.equipment}</TableCell>
                            <TableCell>{row.serialNumber}</TableCell>
                            <TableCell>{row.createdDate}</TableCell>
                            <TableCell>
                              <Chip 
                                label={row.printStatus} 
                                size="small"
                                color={
                                  row.printStatus === 'Printed' 
                                    ? 'success' 
                                    : row.printStatus === 'Never Printed' 
                                      ? 'primary' 
                                      : 'warning'
                                }
                                variant={row.printStatus === 'Printed' ? 'outlined' : 'filled'}
                              />
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
            </Grid>
            
            {/* Right side - Print Settings */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  backgroundColor: alpha(theme.palette.background.default, 0.6),
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Print Settings
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    select
                    label="Printer"
                    size="small"
                    defaultValue="office-printer"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="office-printer">Office Printer (HP LaserJet)</MenuItem>
                    <MenuItem value="label-printer">Zebra Label Printer</MenuItem>
                    <MenuItem value="mobile-printer">Mobile Printer</MenuItem>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    select
                    label="Label Size"
                    size="small"
                    defaultValue="medium"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="small">Small (1" x 1")</MenuItem>
                    <MenuItem value="medium">Medium (2" x 2")</MenuItem>
                    <MenuItem value="large">Large (3" x 3")</MenuItem>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    select
                    label="Label Type"
                    size="small"
                    defaultValue="standard"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="standard">Standard Paper</MenuItem>
                    <MenuItem value="weatherproof">Weatherproof</MenuItem>
                    <MenuItem value="metallic">Metallic/Durable</MenuItem>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    label="Copies"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    size="small"
                    defaultValue={1}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button 
                    fullWidth 
                    variant="outlined"
                    sx={{ mb: 3 }}
                  >
                    Check Printer Status
                  </Button>
                </Box>
                
                <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 3 }}>
                  Print Queue
                </Typography>
                <Box 
                  sx={{ 
                    mt: 1,
                    p: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    borderRadius: 1,
                    border: `1px dashed ${theme.palette.divider}`,
                    color: theme.palette.text.secondary,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2">
                    No items in queue
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PrintQrCodesTab; 