import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Divider,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

interface CustomReportFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const CustomReportForm: React.FC<CustomReportFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    reportName: '',
    reportType: '',
    startDate: null,
    endDate: null,
    dataFields: [],
    format: 'pdf'
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleDateChange = (field: string) => (date: Date | null) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Custom Report Configuration
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Report Name"
              value={formData.reportName}
              onChange={handleChange('reportName')}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={formData.reportType}
                onChange={handleSelectChange('reportType')}
                label="Report Type"
              >
                <MenuItem value="compliance">Compliance Report</MenuItem>
                <MenuItem value="audit">Audit Report</MenuItem>
                <MenuItem value="incident">Incident Report</MenuItem>
                <MenuItem value="analytics">Analytics Report</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Output Format</InputLabel>
              <Select
                value={formData.format}
                onChange={handleSelectChange('format')}
                label="Output Format"
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="xlsx">Excel</MenuItem>
                <MenuItem value="json">JSON</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={handleDateChange('endDate')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Data Fields to Include</InputLabel>
              <Select
                multiple
                value={formData.dataFields}
                onChange={handleSelectChange('dataFields')}
                label="Data Fields to Include"
                renderValue={(selected: any) => selected.join(', ')}
              >
                <MenuItem value="user-data">User Data</MenuItem>
                <MenuItem value="transactions">Transactions</MenuItem>
                <MenuItem value="events">Events</MenuItem>
                <MenuItem value="compliance-metrics">Compliance Metrics</MenuItem>
                <MenuItem value="risk-indicators">Risk Indicators</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Generate Report
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CustomReportForm; 