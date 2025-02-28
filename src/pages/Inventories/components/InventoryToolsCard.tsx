import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Chip
} from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MapIcon from '@mui/icons-material/Map';
import CompareIcon from '@mui/icons-material/Compare';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';

export const InventoryToolsCard: React.FC = () => {
  return (
    <Card elevation={2}>
      <CardHeader title="Inventory Resources" />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>Quick Tools</Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ChecklistIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Inventory Checklist Generator" 
              secondary="Generate custom checklists for any inventory type"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <QrCodeScannerIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Serial Number Verification Tool" 
              secondary="Quickly validate serial numbers against property records"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ListAltIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Component Listing Generator" 
              secondary="Create component listings for complex equipment"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MapIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Location Map Creator" 
              secondary="Map equipment locations for efficient inventory routes"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CompareIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Hand Receipt Comparison Tool" 
              secondary="Compare hand receipts to identify discrepancies"
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>Inventory Guides</Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MenuBookIcon color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={
                <React.Fragment>
                  AR 710-2 Inventory Requirements
                  <Chip 
                    label="Required" 
                    size="small" 
                    color="default" 
                    sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                  />
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MenuBookIcon color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Change of Command Procedures" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MenuBookIcon color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sensitive Items Best Practices" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MenuBookIcon color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="CSDP Handbook References" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MenuBookIcon color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="NTC Inventory Preparation" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>Document Templates</Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArticleIcon color="action" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Inventory Adjustment Report" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArticleIcon color="action" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Causative Research Documentation" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArticleIcon color="action" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Shortage Annexes Generator" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArticleIcon color="action" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="FLIPL Initiation Package" />
          </ListItem>
        </List>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<BuildIcon />}
            size="medium"
          >
            Open Inventory Toolkit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 