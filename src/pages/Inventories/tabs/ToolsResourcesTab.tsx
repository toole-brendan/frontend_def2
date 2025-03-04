import React from 'react';
import { Box, Paper, Typography, Button, Grid, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Divider, TextField, InputAdornment, Tab, Tabs, Chip, useTheme, alpha } from '@mui/material';
import {
  Search as SearchIcon,
  ChecklistRtl as ChecklistIcon,
  QrCodeScanner as QrCodeIcon,
  ListAlt as ListIcon,
  Map as MapIcon,
  CompareArrows as CompareIcon,
  MenuBook as GuideIcon,
  ImportContacts as RegulationIcon,
  School as SchoolIcon,
  Article as ArticleIcon,
  Download as DownloadIcon,
  Build as BuildIcon,
  VideoLibrary as VideoIcon
} from '@mui/icons-material';
;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tools-tabpanel-${index}`}
      aria-labelledby={`tools-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ToolsResourcesTab: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Mock data for quick tools
  const quickTools = [
    {
      title: 'Inventory Checklist Generator',
      description: 'Generate custom checklists for any inventory type',
      icon: <ChecklistIcon color="primary" />
    },
    {
      title: 'Serial Number Verification Tool',
      description: 'Quickly validate serial numbers against property records',
      icon: <QrCodeIcon color="primary" />
    },
    {
      title: 'Component Listing Generator',
      description: 'Create component listings for complex equipment',
      icon: <ListIcon color="primary" />
    },
    {
      title: 'Location Map Creator',
      description: 'Map equipment locations for efficient inventory routes',
      icon: <MapIcon color="primary" />
    },
    {
      title: 'Hand Receipt Comparison Tool',
      description: 'Compare hand receipts to identify discrepancies',
      icon: <CompareIcon color="primary" />
    }
  ];

  // Mock data for document templates
  const documentTemplates = [
    {
      title: 'Inventory Adjustment Report',
      description: 'Standard form for documenting inventory adjustments',
      format: 'PDF',
      icon: <ArticleIcon color="info" />
    },
    {
      title: 'Causative Research Documentation',
      description: 'Template for loss/gain investigations',
      format: 'DOCX',
      icon: <ArticleIcon color="info" />
    },
    {
      title: 'Shortage Annexes Generator',
      description: 'Generate shortage annexes for hand receipts',
      format: 'XLSX',
      icon: <ArticleIcon color="info" />
    },
    {
      title: 'FLIPL Initiation Package',
      description: 'Financial liability investigation packet',
      format: 'PDF',
      icon: <ArticleIcon color="info" />
    },
    {
      title: 'Change of Command Inventory Checklist',
      description: 'Complete change of command inventory process',
      format: 'PDF',
      icon: <ArticleIcon color="info" />
    }
  ];

  // Mock data for guides and references
  const guidesReferences = [
    {
      title: 'AR 710-2 Inventory Requirements',
      description: 'Army Regulation for Supply Policy',
      type: 'Regulation',
      icon: <RegulationIcon color="secondary" />
    },
    {
      title: 'Change of Command Procedures',
      description: 'Guide for incoming and outgoing commanders',
      type: 'Handbook',
      icon: <GuideIcon color="secondary" />
    },
    {
      title: 'Sensitive Items Best Practices',
      description: 'Procedures for sensitive items accountability',
      type: 'Guide',
      icon: <GuideIcon color="secondary" />
    },
    {
      title: 'CSDP Handbook References',
      description: 'Command Supply Discipline Program guide',
      type: 'Handbook',
      icon: <GuideIcon color="secondary" />
    },
    {
      title: 'NTC Inventory Preparation',
      description: 'Readiness for National Training Center rotation',
      type: 'Guide',
      icon: <GuideIcon color="secondary" />
    }
  ];

  // Mock data for training resources
  const trainingResources = [
    {
      title: 'Inventory Procedures Training',
      description: 'Video training for conducting physical inventories',
      type: 'Video',
      duration: '15 min',
      icon: <VideoIcon color="error" />
    },
    {
      title: 'Cyclic Inventory Management',
      description: 'How to manage 10% monthly cyclic inventories',
      type: 'Course',
      duration: '30 min',
      icon: <SchoolIcon color="error" />
    },
    {
      title: 'Causative Research Process',
      description: 'Step-by-step guide to conducting causative research',
      type: 'Video',
      duration: '22 min',
      icon: <VideoIcon color="error" />
    },
    {
      title: 'GCSS-Army Inventory Functions',
      description: 'Using GCSS-Army for inventory management',
      type: 'Course',
      duration: '45 min',
      icon: <SchoolIcon color="error" />
    }
  ];

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search all resources..."
          variant="outlined"
          fullWidth
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 0
            }
          }}
        />
      </Box>

      {/* Tools Tabs */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'medium',
                minHeight: 48
              }
            }}
          >
            <Tab label="Quick Tools" />
            <Tab label="Document Templates" />
            <Tab label="Guides & References" />
            <Tab label="Training Resources" />
          </Tabs>
        </Box>

        {/* Quick Tools */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            {quickTools.map((tool, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                    borderRadius: 0,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: 0,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            mr: 2
                          }}
                        >
                          {tool.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
                          {tool.title}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', flexGrow: 1 }}>
                        {tool.description}
                      </Typography>
                      
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderRadius: 0,
                          fontWeight: 'medium',
                          textTransform: 'none'
                        }}
                      >
                        Launch Tool
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Document Templates */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            {documentTemplates.map((template, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                    borderRadius: 0,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: theme.palette.info.main,
                      boxShadow: `0 0 0 1px ${theme.palette.info.main}`
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: 0,
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            mr: 2
                          }}
                        >
                          {template.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
                            {template.title}
                          </Typography>
                          <Chip
                            label={template.format}
                            size="small"
                            sx={{ 
                              height: 20, 
                              fontSize: '0.7rem',
                              borderRadius: 0,
                              fontWeight: 'medium'
                            }}
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', flexGrow: 1 }}>
                        {template.description}
                      </Typography>
                      
                      <Button
                        variant="outlined"
                        color="info"
                        fullWidth
                        startIcon={<DownloadIcon />}
                        sx={{
                          borderRadius: 0,
                          fontWeight: 'medium',
                          textTransform: 'none'
                        }}
                      >
                        Download Template
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Guides & References */}
        <TabPanel value={activeTab} index={2}>
          <List disablePadding>
            {guidesReferences.map((guide, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <ListItem 
                  button 
                  sx={{ 
                    py: 2,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.secondary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 56 }}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 0,
                        bgcolor: alpha(theme.palette.secondary.main, 0.1)
                      }}
                    >
                      {guide.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                          {guide.title}
                        </Typography>
                        <Chip
                          label={guide.type}
                          size="small"
                          color="secondary"
                          sx={{ 
                            ml: 2,
                            height: 20, 
                            fontSize: '0.7rem',
                            borderRadius: 0,
                            fontWeight: 'medium'
                          }}
                        />
                      </Box>
                    }
                    secondary={guide.description}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{
                      borderRadius: 0,
                      minWidth: '80px',
                      fontWeight: 'medium',
                      textTransform: 'none'
                    }}
                  >
                    View
                  </Button>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Training Resources */}
        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            {trainingResources.map((resource, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    display: 'flex',
                    height: '100%',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                    borderRadius: 0,
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: theme.palette.error.main,
                      boxShadow: `0 0 0 1px ${theme.palette.error.main}`
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 120, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.error.main, 0.1)
                    }}
                  >
                    {resource.icon}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
                          {resource.title}
                        </Typography>
                        <Chip
                          label={`${resource.duration}`}
                          size="small"
                          color="error"
                          sx={{ 
                            height: 20, 
                            fontSize: '0.7rem',
                            borderRadius: 0,
                            fontWeight: 'medium'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {resource.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 1, pt: 0 }}>
                      <Chip
                        label={resource.type}
                        size="small"
                        sx={{ 
                          mr: 1,
                          height: 20, 
                          fontSize: '0.7rem',
                          borderRadius: 0,
                          fontWeight: 'medium'
                        }}
                      />
                      <Button
                        variant="text"
                        color="error"
                        size="small"
                        sx={{
                          ml: 'auto',
                          textTransform: 'none'
                        }}
                      >
                        Start Training
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>

      {/* Integration Tools */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          mb: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0,
          bgcolor: alpha(theme.palette.primary.main, 0.03)
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
          Integration Tools
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              startIcon={<BuildIcon />}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 0,
                fontWeight: 'medium',
                textTransform: 'none',
                justifyContent: 'flex-start'
              }}
            >
              Connect to GCSS-Army
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              startIcon={<BuildIcon />}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 0,
                fontWeight: 'medium',
                textTransform: 'none',
                justifyContent: 'flex-start'
              }}
            >
              PBUSE Data Sync
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              startIcon={<BuildIcon />}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 0,
                fontWeight: 'medium',
                textTransform: 'none',
                justifyContent: 'flex-start'
              }}
            >
              LMP Connector
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ToolsResourcesTab; 