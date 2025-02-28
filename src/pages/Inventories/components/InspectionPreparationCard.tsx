import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const InspectionPreparationCard: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Pre-Inspection Preparation',
      description: 'Critical preparation steps to complete before the inspection',
      tasks: [
        {
          primary: 'Review Inspection Requirements',
          secondary: 'Understand the scope and criteria of the upcoming inspection',
          icon: <SearchIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Self-Assessment Checklist',
          secondary: 'Complete the pre-inspection assessment',
          icon: <FactCheckIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Inventory Records Validation',
          secondary: 'Ensure all inventory records are current and accurate',
          icon: <FormatListBulletedIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Delegate Responsibilities',
          secondary: 'Assign specific inspection preparation tasks to team members',
          icon: <PeopleIcon color="primary" fontSize="small" />
        }
      ]
    },
    {
      label: 'Staff Preparation',
      description: 'Ensure all personnel are prepared for the inspection',
      tasks: [
        {
          primary: 'Conduct Training Sessions',
          secondary: 'Brief staff on inspection requirements and procedures',
          icon: <SchoolIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Equipment Familiarity Review',
          secondary: 'Ensure all staff are familiar with equipment details',
          icon: <DocumentScannerIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Mock Inspection Drills',
          secondary: 'Practice with scenario-based exercises',
          icon: <FeedbackIcon color="primary" fontSize="small" />
        }
      ]
    },
    {
      label: 'Final Verification',
      description: 'Last checks before the inspection',
      tasks: [
        {
          primary: 'Pre-Inspection Walkthrough',
          secondary: 'Commander\'s walkthrough of key inspection areas',
          icon: <SearchIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Documentation Review',
          secondary: 'Final check of all required documentation',
          icon: <DocumentScannerIcon color="primary" fontSize="small" />
        },
        {
          primary: 'Correction Implementation',
          secondary: 'Address any outstanding issues identified during preparation',
          icon: <FactCheckIcon color="primary" fontSize="small" />
        }
      ]
    }
  ];

  return (
    <Card elevation={2}>
      <CardHeader 
        title="Inspection Preparation" 
        action={<FeedbackIcon />}
      />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 1.5, 
              backgroundColor: theme.palette.background.default,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ mr: 2 }}>
              <Typography variant="subtitle2">
                Next Inspection:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CSDP Quarterly - 15APR2025
              </Typography>
            </Box>
            <Chip 
              label="45 Days Remaining" 
              color="info" 
              size="small"
            />
          </Paper>
        </Box>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle2">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                
                <List dense disablePadding>
                  {step.tasks.map((task, taskIndex) => (
                    <ListItem key={taskIndex} disableGutters sx={{ pb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {task.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={task.primary} 
                        secondary={task.secondary}
                      />
                      {index === 0 && taskIndex < 2 ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        index === 0 && taskIndex === 2 ? (
                          <WarningIcon color="warning" fontSize="small" />
                        ) : null
                      )}
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      size="small"
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      size="small"
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Preparation complete - you're ready for the inspection!
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} size="small">
              Reset Plan
            </Button>
          </Paper>
        )}

        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PlayArrowIcon />}
            size="medium"
          >
            Launch Interactive Preparation Guide
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 