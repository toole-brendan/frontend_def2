import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  IconButton, 
  Divider,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface InventoryExecutionPanelProps {
  inventoryId: string;
  onClose: () => void;
}

export const InventoryExecutionPanel: React.FC<InventoryExecutionPanelProps> = ({ 
  inventoryId, 
  onClose 
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  
  const steps = [
    'Inventory Setup',
    'Inventory Method',
    'Verification',
    'Progress Tracking',
    'Completion'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const inventoryName = inventoryId === 'cyclic-vehicles-feb' 
    ? 'Monthly 10% Cyclic (Vehicles)'
    : inventoryId === 'si-weekly-27feb'
      ? 'Weekly Sensitive Items'
      : 'Inventory';

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          {inventoryName} Execution
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box>
        {activeStep === 0 && (
          <Card>
            <CardHeader title="Inventory Setup" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    This panel would contain inventory setup options including:
                  </Typography>
                  <ul>
                    <li>Inventory type selection</li>
                    <li>Personnel assignment</li>
                    <li>Scope definition (items/locations)</li>
                    <li>Instructions and reference materials</li>
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 1 && (
          <Card>
            <CardHeader title="Inventory Method" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    This panel would contain inventory method options including:
                  </Typography>
                  <ul>
                    <li>QR Code scan verification (primary)</li>
                    <li>Serial number manual verification</li>
                    <li>Team inventory mode (multiple verifiers)</li>
                    <li>Location-based inventory path</li>
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 2 && (
          <Card>
            <CardHeader title="Verification Interface" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    This panel would contain verification interface including:
                  </Typography>
                  <ul>
                    <li>Item details with photo reference</li>
                    <li>Serial number validation field</li>
                    <li>Condition assessment options</li>
                    <li>Component verification checklist</li>
                    <li>Discrepancy reporting function</li>
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 3 && (
          <Card>
            <CardHeader title="Progress Tracking" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    This panel would contain progress tracking including:
                  </Typography>
                  <ul>
                    <li>Items verified counter</li>
                    <li>Remaining items list</li>
                    <li>Estimated completion time</li>
                    <li>Location tracking through inventory</li>
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 4 && (
          <Card>
            <CardHeader title="Completion" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    This panel would contain completion steps including:
                  </Typography>
                  <ul>
                    <li>Results summary</li>
                    <li>Discrepancy documentation</li>
                    <li>Digital signature capture</li>
                    <li>Report generation</li>
                    <li>Follow-up action assignment</li>
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<PauseIcon />} 
            sx={{ mr: 1 }}
          >
            Pause Inventory
          </Button>
          <Button 
            variant="outlined" 
            color="warning" 
            startIcon={<ReportProblemIcon />} 
            sx={{ mr: 1 }}
          >
            Report Discrepancy
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={activeStep === steps.length - 1 ? <DoneAllIcon /> : <PlayArrowIcon />}
        >
          {activeStep === steps.length - 1 ? 'Finish Inventory' : 'Continue'}
        </Button>
      </Box>
    </Paper>
  );
}; 