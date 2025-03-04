import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Badge,
  useTheme 
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { workflowCardSx } from '../styles';
import { ArrowRightCircle } from 'lucide-react';
import { SectionHeader } from '../../../components/common';
import StatusChip from '../../../components/common/StatusChip';

// Status stage configuration
const statusStages = [
  { 
    id: 'pending-approval',
    label: 'Pending Approval', 
    count: 8, 
    description: 'Awaiting maintenance officer approval',
    priority: { high: 2, urgent: 1 }
  },
  { 
    id: 'assigned',
    label: 'Assigned', 
    count: 6, 
    description: 'Technician assigned, work pending',
    priority: { high: 1, urgent: 0 }
  },
  { 
    id: 'in-progress',
    label: 'In Progress', 
    count: 9, 
    description: 'Currently being serviced',
    priority: { high: 3, urgent: 1 }
  },
  { 
    id: 'awaiting-parts',
    label: 'Awaiting Parts', 
    count: 9, 
    description: 'Work paused pending parts arrival',
    priority: { high: 2, urgent: 2 }
  },
  { 
    id: 'ready-pickup',
    label: 'Ready for Pickup', 
    count: 5, 
    description: 'Service complete, awaiting pickup',
    priority: { high: 0, urgent: 0 }
  }
];

interface MaintenanceStatusOverviewProps {
  onScanQrCode?: () => void;
}

  // @ts-ignore - Unused variable intentionally kept
const MaintenanceStatusOverview: React.FC<MaintenanceStatusOverviewProps> = ({ onScanQrCode }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      sx={{
        ...workflowCardSx(theme),
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 1,
        },
        // Top-left corner
        '&::before': {
          top: 0,
          left: 0,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        },
        // Top-right corner
        '&::after': {
          top: 0,
          right: 0,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
        },
        // Machined edge
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)'
            : 'linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.05) 100%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <SectionHeader 
          title="Maintenance Request Status Overview"
          variant="medium"
          withUnderline={true}
        />
        
        <Grid container spacing={2} sx={{ position: 'relative', mt: 2 }}>
          {statusStages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <Grid item xs={12} sm={6} md={2}>
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundImage: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, transparent 50%)`
                      : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.07)} 0%, transparent 50%)`,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Badge 
                      badgeContent={stage.count} 
                      color={
                        stage.id === 'pending-approval' ? 'warning' : 
                        stage.id === 'assigned' ? 'info' : 
                        stage.id === 'in-progress' ? 'primary' : 
                        stage.id === 'awaiting-parts' ? 'secondary' : 
                        'success'
                      }
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.8rem', fontWeight: 600 } }}
                    >
                      <StatusChip status={stage.label} />
                    </Badge>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 1 }}>
                    {stage.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    {(stage.priority.urgent > 0) && (
                      <StatusChip 
                        status="error" 
                        label={`${stage.priority.urgent} Urgent`} 
                        size="small"
                      />
                    )}
                    {(stage.priority.high > 0) && (
                      <StatusChip 
                        status="warning" 
                        label={`${stage.priority.high} High`} 
                        size="small"
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
              
              {index < statusStages.length - 1 && (
                <Grid item xs={12} sm={6} md={0.4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRightCircle 
                    size={24} 
                    color={theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]} 
                  />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default MaintenanceStatusOverview;
