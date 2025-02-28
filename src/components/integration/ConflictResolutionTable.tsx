import React, { useState, useEffect } from 'react';
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
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
  alpha,
  SelectChangeEvent,
} from '@mui/material';
import {
  Compare as CompareIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Merge as MergeIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';
import { ConflictRecord } from '../../services/gcssArmy/GcssArmyService';

interface ConflictResolutionTableProps {
  conflicts: ConflictRecord[];
  onResolveConflicts: (resolvedConflicts: ConflictRecord[]) => Promise<void>;
  onCancel: () => void;
}

export const ConflictResolutionTable: React.FC<ConflictResolutionTableProps> = ({
  conflicts,
  onResolveConflicts,
  onCancel,
}) => {
  const theme = useTheme();
  const [resolvedConflicts, setResolvedConflicts] = useState<ConflictRecord[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Initialize resolved conflicts
  useEffect(() => {
    setResolvedConflicts(conflicts);
  }, [conflicts]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleExpandRow = (nsn: string, serialNumber?: string) => {
    const rowKey = serialNumber ? `${nsn}-${serialNumber}` : nsn;
    setExpandedRow(expandedRow === rowKey ? null : rowKey);
  };

  const handleResolutionChange = (index: number, resolution: 'local' | 'gcss' | 'merge' | 'manual') => {
    const updatedConflicts = [...resolvedConflicts];
    updatedConflicts[index].resolution = resolution;

    // Auto-apply resolution logic
    if (resolution === 'local') {
      updatedConflicts[index].resolvedData = { ...updatedConflicts[index].localData };
    } else if (resolution === 'gcss') {
      updatedConflicts[index].resolvedData = { ...updatedConflicts[index].gcssData };
    } else if (resolution === 'merge') {
      // Basic merge strategy - GCSS data takes precedence except for location and status
      const local = updatedConflicts[index].localData;
      const gcss = updatedConflicts[index].gcssData;
      updatedConflicts[index].resolvedData = {
        ...gcss,
        location: local.location,
        status: local.status,
      };
    }

    setResolvedConflicts(updatedConflicts);
  };

  const handleSubmit = async () => {
    await onResolveConflicts(resolvedConflicts);
  };

  // Calculate completion percentage
  const resolvedCount = resolvedConflicts.filter(c => c.resolution).length;
  const completionPercentage = Math.round((resolvedCount / resolvedConflicts.length) * 100);

  const getResolutionChip = (resolution?: string) => {
    switch (resolution) {
      case 'local':
        return (
          <Chip 
            label="Use Local" 
            size="small" 
            color="primary" 
            icon={<CheckIcon />} 
          />
        );
      case 'gcss':
        return (
          <Chip 
            label="Use GCSS" 
            size="small" 
            color="secondary" 
            icon={<CheckIcon />} 
          />
        );
      case 'merge':
        return (
          <Chip 
            label="Merge" 
            size="small" 
            color="info" 
            icon={<MergeIcon />} 
          />
        );
      case 'manual':
        return (
          <Chip 
            label="Manual Edit" 
            size="small" 
            color="warning" 
            icon={<EditIcon />} 
          />
        );
      default:
        return (
          <Chip 
            label="Unresolved" 
            size="small" 
            color="error" 
            icon={<CloseIcon />} 
          />
        );
    }
  };

  const getRowKey = (conflict: ConflictRecord) => {
    return conflict.serialNumber ? `${conflict.nsn}-${conflict.serialNumber}` : conflict.nsn;
  };

  const paginatedConflicts = resolvedConflicts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card>
      <CardHeader
        title="Data Conflict Resolution"
        titleTypographyProps={{ variant: 'h6' }}
        subheader={`${resolvedCount} of ${resolvedConflicts.length} conflicts resolved (${completionPercentage}%)`}
      />
      <Divider />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Review and resolve conflicts between your local system and GCSS-Army data.
            Select resolution method for each item or resolve all conflicts with the same strategy.
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CheckIcon />}
                onClick={() => {
                  const updated = resolvedConflicts.map(c => ({ ...c, resolution: 'local' }));
                  setResolvedConflicts(updated);
                }}
              >
                Use All Local
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CheckIcon />}
                onClick={() => {
                  const updated = resolvedConflicts.map(c => ({ ...c, resolution: 'gcss' }));
                  setResolvedConflicts(updated);
                }}
              >
                Use All GCSS
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                startIcon={<MergeIcon />}
                onClick={() => {
                  const updated = resolvedConflicts.map(c => ({ ...c, resolution: 'merge' }));
                  setResolvedConflicts(updated);
                }}
              >
                Merge All
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>NSN</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Conflict Fields</TableCell>
                <TableCell>Resolution</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedConflicts.map((conflict, index) => {
                const rowKey = getRowKey(conflict);
                const isExpanded = expandedRow === rowKey;
                const actualIndex = page * rowsPerPage + index;

                return (
                  <React.Fragment key={rowKey}>
                    <TableRow 
                      hover 
                      sx={{ 
                        cursor: 'pointer',
                        backgroundColor: conflict.resolution 
                          ? alpha(theme.palette.success.main, 0.05) 
                          : 'inherit',
                      }}
                      onClick={() => toggleExpandRow(conflict.nsn, conflict.serialNumber)}
                    >
                      <TableCell>
                        {conflict.localData.nomenclature || conflict.gcssData.nomenclature || 'Unknown Item'}
                      </TableCell>
                      <TableCell>{conflict.nsn}</TableCell>
                      <TableCell>{conflict.serialNumber || 'N/A'}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {conflict.conflictFields.map(field => (
                            <Chip 
                              key={field} 
                              label={field} 
                              size="small" 
                              variant="outlined" 
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>{getResolutionChip(conflict.resolution)}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandRow(conflict.nsn, conflict.serialNumber);
                          }}
                        >
                          <CompareIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ p: 0 }}>
                          <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={5}>
                                <Typography variant="subtitle2" gutterBottom>Local Data</Typography>
                                <Paper variant="outlined" sx={{ p: 1.5 }}>
                                  {Object.entries(conflict.localData).map(([key, value]) => (
                                    <Box key={key} sx={{ mb: 1 }}>
                                      <Typography variant="caption" color="text.secondary">
                                        {key}:
                                      </Typography>
                                      <Typography variant="body2" sx={{ 
                                        color: conflict.conflictFields.includes(key) 
                                          ? 'error.main' 
                                          : 'text.primary' 
                                      }}>
                                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Paper>
                              </Grid>
                              
                              <Grid item xs={12} md={5}>
                                <Typography variant="subtitle2" gutterBottom>GCSS-Army Data</Typography>
                                <Paper variant="outlined" sx={{ p: 1.5 }}>
                                  {Object.entries(conflict.gcssData).map(([key, value]) => (
                                    <Box key={key} sx={{ mb: 1 }}>
                                      <Typography variant="caption" color="text.secondary">
                                        {key}:
                                      </Typography>
                                      <Typography variant="body2" sx={{ 
                                        color: conflict.conflictFields.includes(key) 
                                          ? 'error.main' 
                                          : 'text.primary' 
                                      }}>
                                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Paper>
                              </Grid>
                              
                              <Grid item xs={12} md={2}>
                                <Typography variant="subtitle2" gutterBottom>Resolution</Typography>
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={conflict.resolution || ''}
                                    onChange={(e: SelectChangeEvent) => {
                                      handleResolutionChange(
                                        actualIndex, 
                                        e.target.value as 'local' | 'gcss' | 'merge' | 'manual'
                                      );
                                    }}
                                    displayEmpty
                                  >
                                    <MenuItem value="">
                                      <em>Select Resolution</em>
                                    </MenuItem>
                                    <MenuItem value="local">Use Local Data</MenuItem>
                                    <MenuItem value="gcss">Use GCSS Data</MenuItem>
                                    <MenuItem value="merge">Smart Merge</MenuItem>
                                    <MenuItem value="manual">Manual Edit</MenuItem>
                                  </Select>
                                </FormControl>
                                
                                {conflict.resolution === 'manual' && (
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    sx={{ mt: 1 }}
                                    // Manual editing would require a more complex UI
                                    // This is a placeholder for that functionality
                                  >
                                    Edit Manually
                                  </Button>
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
              
              {paginatedConflicts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography align="center" variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      No conflicts to resolve
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={resolvedConflicts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
        
        <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            color="inherit" 
            startIcon={<UndoIcon />}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            disabled={resolvedCount < resolvedConflicts.length}
          >
            Apply Resolutions
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConflictResolutionTable; 