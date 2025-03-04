import React from 'react';
import { Tabs, Tab, Box, Paper, useTheme, alpha } from '@mui/material';
import { 
  QrCode as QrCodeIcon,
  Print as PrintIcon,
  ViewList as ViewListIcon,
  ReportProblem as ReportProblemIcon
} from '@mui/icons-material';
import { QrTabNavigationProps } from '../types';

/**
 * QrTabNavigation component
 * Provides tab navigation for QR Management sections
 */
const QrTabNavigation: React.FC<QrTabNavigationProps> = ({ currentTab, onChange }) => {
  const theme = useTheme();
  
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue as any);
  };
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 2,
        mb: 3,
        boxShadow: `0 1px 3px ${alpha(theme.palette.divider, 0.1)}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.background.paper, 0.9),
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: 3,
              borderRadius: 3
            }
          }}
        >
          <Tab 
            value="generate" 
            label="Generate QR Codes" 
            icon={<QrCodeIcon />} 
            iconPosition="start"
            sx={{ py: 2 }}
          />
          <Tab 
            value="print" 
            label="Print QR Codes" 
            icon={<PrintIcon />} 
            iconPosition="start"
            sx={{ py: 2 }}
          />
          <Tab 
            value="manage" 
            label="Manage QR Codes" 
            icon={<ViewListIcon />} 
            iconPosition="start"
            sx={{ py: 2 }}
          />
          <Tab 
            value="damaged" 
            label="Damaged QR Codes" 
            icon={<ReportProblemIcon />} 
            iconPosition="start"
            sx={{ py: 2 }}
          />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default QrTabNavigation; 