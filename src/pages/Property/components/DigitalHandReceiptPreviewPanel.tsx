import React from 'react';
import {
  Typography,
  Paper,
  styled,
} from '@mui/material';
import { DAForm2062PreviewPanel } from './index';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

interface DigitalHandReceiptPreviewPanelProps {
  // Add props if needed in the future
}

const DigitalHandReceiptPreviewPanel: React.FC<DigitalHandReceiptPreviewPanelProps> = () => {
  return (
    <DashboardCard sx={{ mb: 4 }}>
      <div className="card-header">
        <Typography variant="h6">DIGITAL HAND RECEIPT PREVIEW</Typography>
      </div>
      <div className="card-content">
        <DAForm2062PreviewPanel />
      </div>
    </DashboardCard>
  );
};

export default DigitalHandReceiptPreviewPanel; 