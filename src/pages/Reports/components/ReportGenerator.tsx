import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  useTheme 
} from '@mui/material';
import { ReportType } from '../types';
import { paperSx, buttonSx } from '../styles';
import { titleTypographySx } from '../../../theme/patterns';

interface ReportGeneratorProps {
  reportType?: ReportType;
  onGenerate: (reportType: ReportType) => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ 
  reportType = 'inventory',
  onGenerate 
}) => {
  const theme = useTheme();
  
  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={titleTypographySx(theme, 'medium')}
          gutterBottom
        >
          Generate {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
        </Typography>
        <Typography variant="body2" paragraph>
          This is a stub component for the report generator.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => onGenerate(reportType)}
          sx={buttonSx}
        >
          Generate Report
        </Button>
      </Box>
    </Paper>
  );
};

export default ReportGenerator;
