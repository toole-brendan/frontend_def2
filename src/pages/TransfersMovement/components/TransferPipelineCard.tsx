import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Badge,
  LinearProgress,
  Paper,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  FlightTakeoff as InitiatedIcon,
  Pending as ApprovalIcon,
  LocalShipping as TransitIcon,
  FactCheck as ReceiptIcon,
  CheckCircle as CompletedIcon
} from '@mui/icons-material';
import { TransferPipelineCardProps, TransferStage } from '../types';

// Define stage configurations
const stageConfig = {
  [TransferStage.INITIATED]: {
    icon: InitiatedIcon,
    color: '#E3F2FD',
    textColor: '#0D47A1',
    iconColor: '#1E88E5',
    label: 'Initiated'
  },
  [TransferStage.PENDING_APPROVAL]: {
    icon: ApprovalIcon,
    color: '#FFF8E1',
    textColor: '#FF6F00',
    iconColor: '#FFA000',
    label: 'Pending Approval'
  },
  [TransferStage.IN_TRANSIT]: {
    icon: TransitIcon,
    color: '#E8F5E9',
    textColor: '#2E7D32',
    iconColor: '#43A047',
    label: 'In Transit'
  },
  [TransferStage.PENDING_RECEIPT]: {
    icon: ReceiptIcon,
    color: '#E0F7FA',
    textColor: '#006064',
    iconColor: '#00ACC1',
    label: 'Pending Receipt'
  },
  [TransferStage.COMPLETED]: {
    icon: CompletedIcon,
    color: '#ECEFF1',
    textColor: '#455A64',
    iconColor: '#607D8B',
    label: 'Completed'
  }
};

const TransferPipelineCard: React.FC<TransferPipelineCardProps> = ({ pipeline, onClickStage }) => {
  const theme = useTheme();
  
  // Calculate total transfers for percentage calculations
  const totalTransfers = pipeline.stages.reduce((sum, stage) => sum + stage.count, 0);
  
  // Get active transfers (everything not completed)
  const activeTransfers = totalTransfers - 
    (pipeline.stages.find(s => s.stage === TransferStage.COMPLETED)?.count || 0);

  return (
    <Card 
      sx={{ 
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[2]
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Transfer Pipeline
          </Typography>
          <Badge 
            badgeContent={activeTransfers} 
            color="primary"
            max={99}
          >
            <Typography variant="subtitle1">Active Transfers</Typography>
          </Badge>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ flex: 1, mb: 2 }}>
          <Grid container spacing={2}>
            {pipeline.stages.map((stageData, index) => {
              const config = stageConfig[stageData.stage];
              const StageIcon = config.icon;
              const percentage = totalTransfers > 0 
                ? Math.round((stageData.count / totalTransfers) * 100) 
                : 0;
              
              return (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={2.4} 
                  key={`${stageData.stage}-${index}`}
                  sx={{ 
                    display: 'flex',
                    minHeight: { xs: 120, sm: 140, md: 160 }
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: config.color,
                      color: config.textColor,
                      width: '100%',
                      cursor: onClickStage ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': {
                        transform: onClickStage ? 'translateY(-4px)' : 'none',
                        boxShadow: onClickStage ? theme.shadows[4] : theme.shadows[1]
                      }
                    }}
                    elevation={1}
                    onClick={() => onClickStage && onClickStage(stageData.stage)}
                  >
                    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                      <Tooltip title={`View ${config.label} transfers`}>
                        <Badge badgeContent={stageData.count} color="error" max={99}>
                          <StageIcon sx={{ fontSize: 40, color: config.iconColor, mb: 1 }} />
                        </Badge>
                      </Tooltip>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        {config.label}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage} 
                        sx={{ 
                          width: '100%', 
                          borderRadius: 1,
                          height: 8,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: config.textColor
                          }
                        }} 
                      />
                      <Typography variant="caption" sx={{ mt: 0.5 }}>
                        {percentage}% of pipeline
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        
        <Divider />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total transfers: {totalTransfers}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransferPipelineCard; 