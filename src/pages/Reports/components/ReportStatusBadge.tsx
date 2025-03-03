import React from 'react';
import { Chip, useTheme } from '@mui/material';
import { ReportStatus } from '../types';
import { statusChipSx } from '../styles';

interface ReportStatusBadgeProps {
  status: ReportStatus;
  size?: 'small' | 'medium';
}

const statusLabels: Record<ReportStatus, string> = {
  draft: 'Draft',
  pending: 'Pending Approval',
  approved: 'Approved',
  rejected: 'Rejected',
  published: 'Published'
};

const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ 
  status, 
  size = 'medium' 
}) => {
  const theme = useTheme();
  
  return (
    <Chip
      label={statusLabels[status]}
      size={size}
      sx={statusChipSx(status, theme)}
    />
  );
};

export default ReportStatusBadge; 