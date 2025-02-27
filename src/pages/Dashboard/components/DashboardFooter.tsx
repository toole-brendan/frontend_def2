import React from 'react';
import { Box, Typography, Paper, Chip, styled } from '@mui/material';
import { DashboardFooterProps } from '../types';

const FooterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(3),
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 24,
  marginRight: theme.spacing(1),
}));

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ gcssStatus }) => {
  return (
    <FooterPaper elevation={0}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StatusChip 
            label={`GCSS-Army Status: ${gcssStatus.connected ? 'Connected' : 'Disconnected'}`} 
            color={gcssStatus.connected ? 'success' : 'error'} 
            size="small" 
          />
          <FooterText>
            Data as of: {gcssStatus.asOf}
          </FooterText>
        </Box>
        
        <Box>
          <FooterText>
            Battalion Property Book Office: {gcssStatus.pbo} | S4 Help Desk: {gcssStatus.helpDesk}
          </FooterText>
        </Box>
      </Box>
    </FooterPaper>
  );
}; 