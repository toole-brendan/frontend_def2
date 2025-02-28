import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  UploadFile as UploadFileIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Compare as CompareIcon,
  ClearAll as ClearAllIcon,
  Folder as FolderIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { EquipmentCategory } from '../../types/property';

export type AuthorizationItem = {
  lineNumber: string;
  nsn: string;
  nomenclature: string;
  quantity: number;
  erc: string; // Equipment Readiness Code
  category: EquipmentCategory;
  isEssential: boolean;
  pacing?: boolean;
  sourceDocument: string; // MTOE, TDA, CTA, etc.
  comments?: string;
};

export type ImportStatus = 'idle' | 'uploading' | 'validating' | 'analyzing' | 'ready' | 'error';

export type ImportIssue = {
  type: 'warning' | 'error' | 'info';
  message: string;
  lineNumber?: number;
  field?: string;
  item?: Partial<AuthorizationItem>;
  suggestions?: string[];
};

export type ImportResult = {
  items: AuthorizationItem[];
  totalItems: number;
  categories: Record<EquipmentCategory, number>;
  essentialItems: number;
  pacingItems: number;
  issues: ImportIssue[];
  sourceDocuments: string[];
};

export type AuthorizationComparisonItem = {
  nsn: string;
  nomenclature: string;
  authorized: number;
  onHand: number;
  difference: number;
  category: EquipmentCategory;
  isEssential: boolean;
  pacing?: boolean;
  isUnauthorized?: boolean;
  sourceDocument?: string;
};

interface AuthorizationImportProps {
  onImportComplete: (result: ImportResult) => void;
  onPreviewComparison: (items: AuthorizationComparisonItem[]) => void;
  onSaveImport: (result: ImportResult) => Promise<boolean>;
  currentItems?: AuthorizationComparisonItem[];
}

export const AuthorizationImport: React.FC<AuthorizationImportProps> = ({
  onImportComplete,
  onPreviewComparison,
  onSaveImport,
  currentItems = [],
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [saving, setSaving] = useState(false);

  // Steps for the import process
  const steps = ['Select Document', 'Validate & Review', 'Compare & Import'];

  // Handle file selection
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      
      // Try to determine document type from file name
      const fileName = files[0].name.toLowerCase();
      if (fileName.includes('mtoe')) {
        setDocumentType('MTOE');
      } else if (fileName.includes('tda')) {
        setDocumentType('TDA');
      } else if (fileName.includes('cta')) {
        setDocumentType('CTA');
      } else {
        setDocumentType('');
      }
    }
  }, []);

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Mock file processing
  const processFile = async () => {
    if (!selectedFile || !documentType) return;

    setStatus('uploading');
    setProgress(0);

    // Simulate file upload
    await simulateProgress(0, 30);

    setStatus('validating');
    await simulateProgress(30, 60);

    setStatus('analyzing');
    await simulateProgress(60, 100);

    // Categories from the enum
    const categories: EquipmentCategory[] = ['WEAPONS', 'ROLLING_STOCK', 'COMMS_CCI', 'OPTICS_NVGS', 'TPE_ITEMS', 'COEI_BII', 'CTA_50'];

    // Mock import result
    const mockResult: ImportResult = {
      items: Array.from({ length: 50 }, (_, i) => ({
        lineNumber: `${i + 1}`,
        nsn: `1234-56-789-${i.toString().padStart(4, '0')}`,
        nomenclature: `Test Equipment ${i + 1}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        erc: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        category: categories[Math.floor(Math.random() * categories.length)],
        isEssential: Math.random() > 0.7,
        pacing: Math.random() > 0.9,
        sourceDocument: documentType,
        comments: Math.random() > 0.8 ? `Comment for item ${i + 1}` : undefined,
      })),
      totalItems: 50,
      categories: {
        WEAPONS: 12,
        ROLLING_STOCK: 8,
        COMMS_CCI: 10,
        OPTICS_NVGS: 7,
        TPE_ITEMS: 5,
        COEI_BII: 3,
        CTA_50: 5
      },
      essentialItems: 15,
      pacingItems: 5,
      issues: [
        {
          type: 'warning',
          message: 'NSN format may be incorrect',
          lineNumber: 5,
          field: 'nsn',
          item: { nsn: '1234-56-789-0005', nomenclature: 'Test Equipment 5' },
          suggestions: ['1234-56-789-0005', '1234-56-789-5000'],
        },
        {
          type: 'error',
          message: 'Missing quantity',
          lineNumber: 12,
          field: 'quantity',
          item: { nsn: '1234-56-789-0012', nomenclature: 'Test Equipment 12' },
        },
        {
          type: 'info',
          message: 'Item is also authorized in another document',
          lineNumber: 20,
          item: { nsn: '1234-56-789-0020', nomenclature: 'Test Equipment 20' },
          suggestions: ['CTA 50-909'],
        },
      ],
      sourceDocuments: [documentType],
    };

    setImportResult(mockResult);
    setStatus('ready');
    onImportComplete(mockResult);
  };

  // Simulate progress for demonstration
  const simulateProgress = async (start: number, end: number) => {
    const duration = 1000; // 1 second
    const steps = 20;
    const increment = (end - start) / steps;
    
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, duration / steps));
      setProgress(Math.min(start + (i * increment), 100));
    }
  };

  // Handle document type change
  const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentType(event.target.value);
  };

  // Go to next step
  const handleNext = () => {
    if (activeStep === 0 && selectedFile && documentType) {
      processFile();
    }
    
    setActiveStep(prevStep => prevStep + 1);
  };

  // Go to previous step
  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  // Reset the form
  const handleReset = () => {
    setSelectedFile(null);
    setDocumentType('');
    setStatus('idle');
    setProgress(0);
    setImportResult(null);
    setActiveStep(0);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Compare imports with current items
  const handleCompare = () => {
    if (!importResult) return;
    
    // Create comparison data
    const comparisonItems: AuthorizationComparisonItem[] = importResult.items.map(item => {
      const onHandItem = currentItems.find(current => current.nsn === item.nsn);
      const onHandQty = onHandItem ? onHandItem.onHand : 0;
      
      return {
        nsn: item.nsn,
        nomenclature: item.nomenclature,
        authorized: item.quantity,
        onHand: onHandQty,
        difference: onHandQty - item.quantity,
        category: item.category,
        isEssential: item.isEssential,
        pacing: item.pacing,
        sourceDocument: item.sourceDocument,
      };
    });
    
    // Add unauthorized items (items on-hand but not in authorization document)
    const authorizedNsns = new Set(importResult.items.map(item => item.nsn));
    const unauthorizedItems = currentItems
      .filter(item => !authorizedNsns.has(item.nsn))
      .map(item => ({
        ...item,
        authorized: 0,
        difference: item.onHand,
        isUnauthorized: true,
      }));
    
    const allComparisonItems = [...comparisonItems, ...unauthorizedItems];
    
    onPreviewComparison(allComparisonItems);
  };

  // Save the import
  const handleSave = async () => {
    if (!importResult) return;
    
    setSaving(true);
    try {
      const success = await onSaveImport(importResult);
      if (success) {
        handleReset();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Import Authorization Document"
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearAllIcon />}
            onClick={handleReset}
            disabled={status === 'uploading' || status === 'validating' || status === 'analyzing' || saving}
          >
            Reset
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Select Document */}
        {activeStep === 0 && (
          <Box>
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select Authorization Document
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Upload your MTOE, TDA, or other authorization document. Supported formats: Excel (.xlsx, .xls), CSV, and PDF.
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      mb: 2,
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={triggerFileInput}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      accept=".xlsx,.xls,.csv,.pdf"
                    />
                    <UploadFileIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="body1" gutterBottom>
                      {selectedFile ? selectedFile.name : 'Drag & drop or click to select file'}
                    </Typography>
                    {selectedFile && (
                      <Typography variant="body2" color="text.secondary">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      size="small"
                    >
                      Download Template
                    </Button>
                    {selectedFile && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Document Information
                  </Typography>
                  <TextField
                    fullWidth
                    label="Document Type"
                    value={documentType}
                    onChange={handleDocumentTypeChange}
                    variant="outlined"
                    margin="normal"
                    required
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">Select Document Type</option>
                    <option value="MTOE">MTOE</option>
                    <option value="TDA">TDA</option>
                    <option value="CTA">CTA</option>
                    <option value="Other">Other</option>
                  </TextField>
                  <TextField
                    fullWidth
                    label="Document Number (Optional)"
                    variant="outlined"
                    margin="normal"
                    placeholder="Example: MTOE FJ3456"
                  />
                  <TextField
                    fullWidth
                    label="Effective Date (Optional)"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}

        {/* Step 2: Validate & Review */}
        {activeStep === 1 && (
          <Box>
            {(status === 'uploading' || status === 'validating' || status === 'analyzing') && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {status === 'uploading'
                    ? 'Uploading File...'
                    : status === 'validating'
                    ? 'Validating Document...'
                    : 'Analyzing Content...'}
                </Typography>
                <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {status === 'uploading'
                    ? 'Reading file contents...'
                    : status === 'validating'
                    ? 'Checking for formatting issues...'
                    : 'Identifying equipment items...'}
                </Typography>
              </Box>
            )}

            {status === 'ready' && importResult && (
              <Box>
                <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Items
                      </Typography>
                      <Typography variant="h6">{importResult.totalItems}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Essential Items
                      </Typography>
                      <Typography variant="h6" color="warning.main">
                        {importResult.essentialItems}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Pacing Items
                      </Typography>
                      <Typography variant="h6" color="error.main">
                        {importResult.pacingItems}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Issues Found
                      </Typography>
                      <Typography variant="h6" color={importResult.issues.length > 0 ? 'error.main' : 'success.main'}>
                        {importResult.issues.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Typography variant="subtitle1" gutterBottom>
                  Document Preview
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, maxHeight: 300 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Line #</TableCell>
                        <TableCell>NSN</TableCell>
                        <TableCell>Nomenclature</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell>ERC</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Flags</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {importResult.items.slice(0, 10).map((item) => (
                        <TableRow key={item.lineNumber}>
                          <TableCell>{item.lineNumber}</TableCell>
                          <TableCell>{item.nsn}</TableCell>
                          <TableCell>{item.nomenclature}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell>{item.erc}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5}>
                              {item.isEssential && (
                                <Tooltip title="Essential Item">
                                  <Chip
                                    label="E"
                                    size="small"
                                    color="warning"
                                    sx={{ width: 24, height: 24, '& .MuiChip-label': { p: 0 } }}
                                  />
                                </Tooltip>
                              )}
                              {item.pacing && (
                                <Tooltip title="Pacing Item">
                                  <Chip
                                    label="P"
                                    size="small"
                                    color="error"
                                    sx={{ width: 24, height: 24, '& .MuiChip-label': { p: 0 } }}
                                  />
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {importResult.issues.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Issues Found
                    </Typography>
                    <List sx={{ mb: 3 }}>
                      {importResult.issues.map((issue, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            bgcolor: issue.type === 'error'
                              ? 'error.main'
                              : issue.type === 'warning'
                              ? 'warning.main'
                              : 'info.main',
                            color: '#fff',
                            mb: 1,
                            borderRadius: 1,
                          }}
                        >
                          <ListItemIcon sx={{ color: '#fff' }}>
                            {issue.type === 'error' ? (
                              <ErrorIcon />
                            ) : issue.type === 'warning' ? (
                              <WarningIcon />
                            ) : (
                              <InfoIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={issue.message}
                            secondary={
                              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                {issue.lineNumber && `Line: ${issue.lineNumber}`}
                                {issue.field && issue.lineNumber && ' | '}
                                {issue.field && `Field: ${issue.field}`}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Step 3: Compare & Import */}
        {activeStep === 2 && importResult && (
          <Box>
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Authorization Summary
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Review the authorization document summary before importing.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Document Type"
                        secondary={documentType}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total Items"
                        secondary={`${importResult.totalItems} items across ${Object.keys(importResult.categories).length} categories`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Critical Items"
                        secondary={`${importResult.essentialItems} essential items, ${importResult.pacingItems} pacing items`}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Before You Import
                  </Typography>
                  <Typography variant="body2" paragraph>
                    The new authorization document will replace existing authorizations from the same source document. 
                    This action cannot be undone.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<CompareIcon />}
                    onClick={handleCompare}
                    sx={{ mb: 2 }}
                  >
                    Preview Comparison
                  </Button>
                  <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 1 }}>
                    <Typography variant="body2" color="warning.dark">
                      <strong>Note:</strong> Any unauthorized items currently in your inventory 
                      will be flagged after import. You may need to provide justification for these items.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0 || status === 'uploading' || status === 'validating' || status === 'analyzing' || saving}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!importResult || saving}
              startIcon={<SaveIcon />}
            >
              {saving ? 'Saving...' : 'Import Document'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && (!selectedFile || !documentType)) ||
                status === 'uploading' ||
                status === 'validating' ||
                status === 'analyzing'
              }
            >
              Next
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthorizationImport; 