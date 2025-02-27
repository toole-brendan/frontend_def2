import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  LinearProgress,
  styled 
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import { MaintenanceReadinessCardProps } from '../types';

const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
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

const StatusBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 20,
  width: '100%',
  borderRadius: 2,
  overflow: 'hidden',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const StatusSegment = styled(Box)<{ color: string }>(({ theme, color }) => ({
  height: '100%',
  backgroundColor: color,
}));

export const MaintenanceReadinessCard: React.FC<MaintenanceReadinessCardProps> = ({ statuses }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <BuildIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">MAINTENANCE READINESS</Typography>
      </div>
      <div className="card-content">
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Equipment operational status by TM category:
        </Typography>
        
        {statuses.map((status, index) => {
          const fmcPercent = (status.fmc / status.total) * 100;
          const pmcAPercent = (status.pmcA / status.total) * 100;
          const pmcBPercent = (status.pmcB / status.total) * 100;
          const nmcPercent = (status.nmc / status.total) * 100;
          
          return (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {status.category}
                </Typography>
                <Typography variant="body2">
                  {status.fmc}/{status.total} FMC
                  {status.nmc > 0 && ` (${status.nmc} NMC${status.nmc > 1 ? 's' : ''})`}
                </Typography>
              </Box>
              
              <StatusBar>
                {fmcPercent > 0 && (
                  <StatusSegment color="#4CAF50" sx={{ width: `${fmcPercent}%` }} />
                )}
                {pmcAPercent > 0 && (
                  <StatusSegment color="#FF9800" sx={{ width: `${pmcAPercent}%` }} />
                )}
                {pmcBPercent > 0 && (
                  <StatusSegment color="#FFEB3B" sx={{ width: `${pmcBPercent}%` }} />
                )}
                {nmcPercent > 0 && (
                  <StatusSegment color="#F44336" sx={{ width: `${nmcPercent}%` }} />
                )}
              </StatusBar>
              
              {index === statuses.length - 1 && (
                <Box sx={{ display: 'flex', mt: 1, fontSize: '0.75rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <Box sx={{ width: 8, height: 8, backgroundColor: '#4CAF50', mr: 0.5, borderRadius: '50%' }} />
                    <Typography variant="caption">FMC</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <Box sx={{ width: 8, height: 8, backgroundColor: '#FF9800', mr: 0.5, borderRadius: '50%' }} />
                    <Typography variant="caption">PMC-A</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <Box sx={{ width: 8, height: 8, backgroundColor: '#FFEB3B', mr: 0.5, borderRadius: '50%' }} />
                    <Typography variant="caption">PMC-B</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 8, height: 8, backgroundColor: '#F44336', mr: 0.5, borderRadius: '50%' }} />
                    <Typography variant="caption">NMC</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
        
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<DescriptionIcon />}
            fullWidth
          >
            View 026 Report
          </Button>
        </Box>
      </div>
    </StyledCard>
  );
}; 