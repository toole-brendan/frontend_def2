import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  // @ts-ignore - Unused variable intentionally kept
  useTheme,
} from '@mui/material';
import {
  CloudDownload as CloudDownloadIcon,
  Print as PrintIcon,
  FilterList as FilterListIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { PropertyItem, EquipmentCategory } from '../../types/property';

export type ReconciliationSummary = {
  totalItems: number;
  matchedItems: number;
  localOnlyItems: number;
  gcssOnlyItems: number;
  conflictItems: number;
  lastReconciled: string;
  byCategory: {
    category: EquipmentCategory;
    total: number;
    matches: number;
    localOnly: number;
    gcssOnly: number;
    conflicts: number;
  }[];
};

export type ReconciliationItemDetail = {
  nsn: string;
  nomenclature: string;
  serialNumber?: string;
  category: EquipmentCategory;
  status: 'matched' | 'local_only' | 'gcss_only' | 'conflict';
  localData?: Partial<PropertyItem>;
  gcssData?: Partial<PropertyItem>;
  conflictFields?: string[];
};

interface ReconciliationReportProps {
  summary: ReconciliationSummary;
  details: ReconciliationItemDetail[];
  onExportReport: () => void;
  onPrintReport: () => void;
  onResolveConflicts: (items: ReconciliationItemDetail[]) => void;
}

export const ReconciliationReport: React.FC<ReconciliationReportProps> = ({
  summary,
  details,
  onExportReport,
  onPrintReport,
  onResolveConflicts,
}) => {
  
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  // Filter details based on selected filters
  const filteredDetails = details.filter(item => {
    if (selectedStatus && item.status !== selectedStatus) {
      return false;
    }
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Get conflict items only
  const conflictItems = details.filter(item => item.status === 'conflict');

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status chip
  const getStatusChip = (status: ReconciliationItemDetail['status']) => {
    switch (status) {
      case 'matched':
        return (
          <Chip
            label="Matched"
            size="small"
            color="success"
            icon={<CheckIcon />}
          />
        );
      case 'local_only':
        return (
          <Chip
            label="Local Only"
            size="small"
            color="info"
            icon={<InfoIcon />}
          />
        );
      case 'gcss_only':
        return (
          <Chip
            label="GCSS Only"
            size="small"
            color="warning"
            icon={<WarningIcon />}
          />
        );
      case 'conflict':
        return (
          <Chip
            label="Conflict"
            size="small"
            color="error"
            icon={<ErrorIcon />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader
        title="GCSS-Army Reconciliation Report"
        titleTypographyProps={{ variant: 'h6' }}
        subheader={`Last reconciled: ${formatDate(summary.lastReconciled)}`}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              onClick={onPrintReport}
            >
              Print
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CloudDownloadIcon />}
              onClick={onExportReport}
            >
              Export
            </Button>
          </Stack>
        }
      />
      <Divider />
      <CardContent>
        {/* Summary Section */}
        <Box mb={4}>
          <Typography variant="subtitle1" gutterBottom>
            Summary
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={2.4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Items
                </Typography>
                <Typography variant="h6">
                  {summary.totalItems}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Matched
                </Typography>
                <Typography variant="h6" color="success.main">
                  {summary.matchedItems} ({Math.round((summary.matchedItems / summary.totalItems) * 100)}%)
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Local Only
                </Typography>
                <Typography variant="h6" color="info.main">
                  {summary.localOnlyItems}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  GCSS Only
                </Typography>
                <Typography variant="h6" color="warning.main">
                  {summary.gcssOnlyItems}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Conflicts
                </Typography>
                <Typography variant="h6" color="error.main">
                  {summary.conflictItems}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Category Breakdown */}
        <Box mb={4}>
          <Typography variant="subtitle1" gutterBottom>
            Category Breakdown
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Matched</TableCell>
                  <TableCell align="right">Local Only</TableCell>
                  <TableCell align="right">GCSS Only</TableCell>
                  <TableCell align="right">Conflicts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summary.byCategory.map((category) => (
                  <TableRow key={category.category}>
                    <TableCell component="th" scope="row">
                      {category.category}
                    </TableCell>
                    <TableCell align="right">{category.total}</TableCell>
                    <TableCell align="right">
                      <Typography color="success.main">
                        {category.matches}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="info.main">
                        {category.localOnly}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="warning.main">
                        {category.gcssOnly}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="error.main">
                        {category.conflicts}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Filters */}
        <Box mb={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
              Details
            </Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="matched">Matched</MenuItem>
                <MenuItem value="local_only">Local Only</MenuItem>
                <MenuItem value="gcss_only">GCSS Only</MenuItem>
                <MenuItem value="conflict">Conflicts</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {summary.byCategory.map(category => (
                  <MenuItem key={category.category} value={category.category}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => {
                setSelectedStatus('');
                setSelectedCategory('');
              }}
            >
              Clear Filters
            </Button>
            {conflictItems.length > 0 && (
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ ml: 'auto' }}
                onClick={() => onResolveConflicts(conflictItems)}
              >
                Resolve {conflictItems.length} Conflicts
              </Button>
            )}
          </Stack>
        </Box>

        {/* Detailed Reconciliation List */}
        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>NSN</TableCell>
                <TableCell>Nomenclature</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDetails.map((item) => (
                <TableRow key={`${item.nsn}-${item.serialNumber || ''}`}>
                  <TableCell>{item.nsn}</TableCell>
                  <TableCell>{item.nomenclature}</TableCell>
                  <TableCell>{item.serialNumber || 'N/A'}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{getStatusChip(item.status)}</TableCell>
                  <TableCell>
                    {item.status === 'conflict' && item.conflictFields && (
                      <Tooltip 
                        title={
                          <>
                            <Typography variant="caption">Conflict Fields:</Typography>
                            <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                              {item.conflictFields.map(field => (
                                <li key={field}>
                                  <Typography variant="caption">{field}</Typography>
                                </li>
                              ))}
                            </ul>
                          </>
                        }
                      >
                        <Typography variant="body2" color="error">
                          {item.conflictFields.length} field conflicts
                        </Typography>
                      </Tooltip>
                    )}
                    {item.status === 'local_only' && (
                      <Typography variant="body2" color="info.main">
                        Not found in GCSS-Army
                      </Typography>
                    )}
                    {item.status === 'gcss_only' && (
                      <Typography variant="body2" color="warning.main">
                        Not in local system
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredDetails.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      No items match the selected filters
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ReconciliationReport; 