import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Avatar,
  Paper,
  ListItemIcon,
  ListItemText,
  SelectChangeEvent
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  FileDownload as FileDownloadIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  QrCodeScanner as QrCodeScannerIcon,
  History as HistoryIcon,
  ContactPhone as ContactPhoneIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';
import { SensitiveItem, FilterState } from '../../../types/sensitiveItems';

interface InventoryTableProps {
  filteredItems: SensitiveItem[];
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterAnchorEl: HTMLElement | null;
  handleFilterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterClose: () => void;
  selectedFilters: FilterState;
  handleFilterChange: (type: string, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemDetailsOpen: (item: SensitiveItem) => void;
  actionAnchorEl: HTMLElement | null;
  actionItem: SensitiveItem | null;
  handleActionMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, item: SensitiveItem) => void;
  handleActionMenuClose: () => void;
  typeOptions: string[];
  locationOptions: string[];
  statusOptions: string[];
}

/**
 * InventoryTable component displays the current inventory of sensitive items
 */
const InventoryTable: React.FC<InventoryTableProps> = ({
  filteredItems,
  searchTerm,
  handleSearchChange,
  filterAnchorEl,
  handleFilterClick,
  handleFilterClose,
  selectedFilters,
  handleFilterChange,
  applyFilters,
  resetFilters,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleItemDetailsOpen,
  actionAnchorEl,
  actionItem,
  handleActionMenuOpen,
  handleActionMenuClose,
  typeOptions,
  locationOptions,
  statusOptions
}) => {
  const theme = useTheme();

  const handleFilterSelectChange = (type: string) => (event: SelectChangeEvent) => {
    handleFilterChange(type, event.target.value);
  };

  return (
    <>
      {/* Search and Filter */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(140, 140, 160, 0.12)' }}>
        <TextField
          placeholder="Search by nomenclature, serial number, or location..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ 
            width: { xs: '60%', md: '70%' },
            '& .MuiOutlinedInput-root': {
              borderRadius: 0
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />} 
            onClick={handleFilterClick}
            sx={{ mr: 1, borderRadius: 0 }}
          >
            Filter
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FileDownloadIcon />} 
            sx={{ borderRadius: 0, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: { width: 300, maxWidth: '100%', borderRadius: 0 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 2 }}>
            Filter Options
          </Typography>
          
          {/* Type Filter */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="type-filter-label">Item Type</InputLabel>
            <Select
              labelId="type-filter-label"
              value={selectedFilters.type}
              label="Item Type"
              onChange={handleFilterSelectChange('type')}
              sx={{ borderRadius: 0 }}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Location Filter */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="location-filter-label">Location</InputLabel>
            <Select
              labelId="location-filter-label"
              value={selectedFilters.location}
              label="Location"
              onChange={handleFilterSelectChange('location')}
              sx={{ borderRadius: 0 }}
            >
              {locationOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Status Filter */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={selectedFilters.status}
              label="Status"
              onChange={handleFilterSelectChange('status')}
              sx={{ borderRadius: 0 }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Filter Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={resetFilters}
              sx={{ borderRadius: 0 }}
            >
              Reset
            </Button>
            <Button 
              variant="contained" 
              size="small" 
              onClick={applyFilters}
              sx={{ borderRadius: 0 }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Menu>

      {/* Active Filters Display */}
      {(selectedFilters.type !== 'All' || selectedFilters.location !== 'All' || selectedFilters.status !== 'All') && (
        <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
          <Typography variant="body2" sx={{ mr: 1, pt: 0.5 }}>Active Filters:</Typography>
          {selectedFilters.type !== 'All' && (
            <Chip 
              label={`Type: ${selectedFilters.type}`} 
              size="small" 
              onDelete={() => handleFilterChange('type', 'All')}
              sx={{ borderRadius: 0 }}
            />
          )}
          {selectedFilters.location !== 'All' && (
            <Chip 
              label={`Location: ${selectedFilters.location}`} 
              size="small" 
              onDelete={() => handleFilterChange('location', 'All')}
              sx={{ borderRadius: 0 }}
            />
          )}
          {selectedFilters.status !== 'All' && (
            <Chip 
              label={`Status: ${selectedFilters.status}`} 
              size="small" 
              onDelete={() => handleFilterChange('status', 'All')}
              sx={{ borderRadius: 0 }}
            />
          )}
          <Button 
            variant="text" 
            size="small" 
            onClick={resetFilters}
            sx={{ ml: 'auto', height: 24, p: 0.5 }}
          >
            Clear All
          </Button>
        </Box>
      )}

      {/* Items Table */}
      <TableContainer>
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
                ITEM
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', md: 'table-cell' }
              }}>
                SERIAL NUMBER
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }}>
                LOCATION
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', sm: 'table-cell' }
              }}>
                ASSIGNED TO
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                display: { xs: 'none', lg: 'table-cell' }
              }}>
                LAST VERIFIED
              </TableCell>
              <TableCell sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'medium', 
                fontSize: '0.75rem', 
                letterSpacing: '0.05em',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                width: 60
              }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
              <TableRow key={item.id} sx={{ 
                '&:hover': { bgcolor: 'action.hover' },
                cursor: 'pointer'
              }}
              onClick={() => handleItemDetailsOpen(item)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                        color: theme.palette.primary.main,
                        width: 28,
                        height: 28,
                        mr: 1.5,
                        borderRadius: 0
                      }}
                    >
                      <ShieldIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{item.item}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.type}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{item.serialNumber}</Typography>
                  <Typography variant="caption" color="text.secondary">CAT: {item.category}</Typography>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{item.assignedTo}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', display: { xs: 'none', lg: 'table-cell' } }}>{item.lastVerified}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleActionMenuOpen(e, item);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Item Actions Menu */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <QrCodeScannerIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Scan Verification</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View History</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <ContactPhoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Contact Custodian</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default InventoryTable;
