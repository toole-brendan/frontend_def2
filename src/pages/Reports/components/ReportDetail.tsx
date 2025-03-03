import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ReportData } from '../types';
import { paperSx } from '../styles';

interface ReportDetailProps {
  report: ReportData;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {report.title}
        </Typography>
        <Typography variant="body2" paragraph>
          {report.description || 'No description available.'}
        </Typography>
        <Typography variant="body2">
          This is a stub component for ReportDetail.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ReportDetail; 