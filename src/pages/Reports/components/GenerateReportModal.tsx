import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  // @ts-ignore - Unused variable intentionally kept
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

interface GenerateReportModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (reportConfig: any) => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  open,
  onClose,
  onGenerate
}) => {
  
  const [reportType, setReportType] = React.useState('');
  const [dateRange, setDateRange] = React.useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  });
  const [format, setFormat] = React.useState('pdf');
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleReportTypeChange = (event: any) => {
    setReportType(event.target.value);
  };
  
  const handleFormatChange = (event: any) => {
    setFormat(event.target.value);
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate({
        reportType,
        dateRange,
        format
      });
      onClose();
    }, 2000);
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Generate New Report
      </DialogTitle>
      <DialogContent>
        {isGenerating ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6">
              Generating Report...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This may take a few moments
            </Typography>
          </Box>
        ) : (
          <Paper elevation={0}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    onChange={handleReportTypeChange}
                    label="Report Type"
                  >
                    <MenuItem value="compliance">Compliance Report</MenuItem>
                    <MenuItem value="audit">Audit Trail Report</MenuItem>
                    <MenuItem value="activity">Activity Report</MenuItem>
                    <MenuItem value="security">Security Report</MenuItem>
                    <MenuItem value="metrics">Metrics Dashboard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={dateRange.start}
                    onChange={(date) => setDateRange({...dateRange, start: date})}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={dateRange.end}
                    onChange={(date) => setDateRange({...dateRange, end: date})}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Output Format</InputLabel>
                  <Select
                    value={format}
                    onChange={handleFormatChange}
                    label="Output Format"
                  >
                    <MenuItem value="pdf">PDF Document</MenuItem>
                    <MenuItem value="csv">CSV Spreadsheet</MenuItem>
                    <MenuItem value="xlsx">Excel Workbook</MenuItem>
                    <MenuItem value="json">JSON Data</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleGenerate}
          variant="contained"
          color="primary"
          disabled={!reportType || isGenerating}
        >
          Generate Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateReportModal; 