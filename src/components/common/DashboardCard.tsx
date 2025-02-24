import React from 'react';
import { Paper, styled } from '@mui/material';

const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  '.card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '.card-content': {
    padding: theme.spacing(2),
  },
}));

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ children, className }) => {
  return (
    <StyledCard className={className}>
      {children}
    </StyledCard>
  );
}; 