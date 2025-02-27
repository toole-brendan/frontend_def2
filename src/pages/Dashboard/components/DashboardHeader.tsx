import React from 'react';
import { Box, Typography, Paper, Chip, styled } from '@mui/material';
import { DashboardHeaderProps } from '../types';

const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(3),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: theme.spacing(1),
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  borderRadius: 4,
  height: 28,
  marginRight: theme.spacing(1),
}));

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ unitInfo }) => {
  return (
    <HeaderPaper elevation={0}>
      <PageTitle variant="h5">
        {unitInfo.name} - Commander's Property Book Dashboard
      </PageTitle>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        <StatusChip 
          label={`Class VII Items (${unitInfo.classVIIItems})`} 
          color="primary" 
          variant="outlined" 
        />
        <StatusChip 
          label={`Dollar Value (${unitInfo.dollarValue})`} 
          color="primary" 
          variant="outlined" 
        />
        <StatusChip 
          label={`Accountability Rate (${unitInfo.accountabilityRate}%)`} 
          color="success" 
          variant="outlined" 
        />
      </Box>
      
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
          Sensitive Item Status:
        </Typography>
        <Chip 
          label={`${unitInfo.sensitiveItemStatus.accountedFor}% Accounted`} 
          color="success" 
          size="small" 
          sx={{ mr: 1, fontWeight: 600 }}
        />
        <Typography variant="body2" color="text.secondary">
          Last: {unitInfo.sensitiveItemStatus.lastInventory}
        </Typography>
      </Box>
    </HeaderPaper>
  );
}; 