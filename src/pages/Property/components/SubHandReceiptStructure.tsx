import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Collapse,
  styled,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Sub-hand receipt tree item
interface TreeItemProps {
  depth?: number;
}

const TreeItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'depth',
})<TreeItemProps>(({ theme, depth = 0 }) => ({
  paddingLeft: theme.spacing(2 + depth * 3),
  borderLeft: depth > 0 ? `1px dashed ${theme.palette.divider}` : 'none',
  marginLeft: depth > 0 ? theme.spacing(2) : 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface SubHandReceiptStructureProps {
  // Add props if needed in the future
}

const SubHandReceiptStructure: React.FC<SubHandReceiptStructureProps> = () => {
  // State for tree view expansion
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'plt1': false,
    'plt2': false,
    'plt3': false,
    'hq': false,
  });

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sub-Hand Receipt Structure
      </Typography>
      <List component="div" disablePadding>
        {/* Primary Hand Receipt */}
        <TreeItem>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="subtitle1" fontWeight="bold">
                PRIMARY HAND RECEIPT (CPT Rodriguez - 721 items total)
              </Typography>
            }
          />
        </TreeItem>

        {/* 1st Platoon */}
        <TreeItem>
          <ListItemIcon>
            <GroupIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="1st Platoon Sub-Hand Receipt (1LT Morgan - 198 items)" />
          <IconButton size="small" onClick={() => toggleExpand('plt1')}>
            {expanded.plt1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TreeItem>
        <Collapse in={expanded.plt1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Alpha Squad Leader (SSG Adams - 42 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Bravo Squad Leader (SSG Thomas - 45 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Charlie Squad Leader (SSG Johnson - 46 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Platoon RTO (SPC Garcia - 14 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Platoon Medic (SPC Williams - 10 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Unassigned 1st PLT items (1LT Morgan - 41 items)" />
            </TreeItem>
          </List>
        </Collapse>

        {/* 2nd Platoon */}
        <TreeItem>
          <ListItemIcon>
            <GroupIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="2nd Platoon Sub-Hand Receipt (1LT Chen - 187 items)" />
          <IconButton size="small" onClick={() => toggleExpand('plt2')}>
            {expanded.plt2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TreeItem>
        <Collapse in={expanded.plt2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Alpha Squad Leader (SSG Brown - 40 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Bravo Squad Leader (SSG Davis - 43 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Charlie Squad Leader (SSG Wilson - 44 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Platoon RTO (SPC Lopez - 13 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Platoon Medic (SPC Zhang - 9 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Unassigned 2nd PLT items (1LT Chen - 38 items)" />
            </TreeItem>
          </List>
        </Collapse>

        {/* 3rd Platoon */}
        <TreeItem>
          <ListItemIcon>
            <GroupIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="3rd Platoon Sub-Hand Receipt (1LT Williams - 201 items)" />
          <IconButton size="small" onClick={() => toggleExpand('plt3')}>
            {expanded.plt3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TreeItem>
        <Collapse in={expanded.plt3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Alpha Squad Leader (SSG Miller - 44 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Bravo Squad Leader (SSG Robinson - 45 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Charlie Squad Leader (SSG Harris - 47 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Platoon RTO (SPC Taylor - 15 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Platoon Medic (SPC Adams - 12 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Unassigned 3rd PLT items (1LT Williams - 38 items)" />
            </TreeItem>
          </List>
        </Collapse>

        {/* HQ Platoon */}
        <TreeItem>
          <ListItemIcon>
            <GroupIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="HQ Platoon Sub-Hand Receipt (1LT Jackson - 135 items)" />
          <IconButton size="small" onClick={() => toggleExpand('hq')}>
            {expanded.hq ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TreeItem>
        <Collapse in={expanded.hq} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Supply Room (SSG Rivera - 42 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Company CP (SFC Patel - 33 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Medical Section (SSG Scott - 27 items)" />
            </TreeItem>
            <TreeItem depth={1}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Unassigned HQ PLT items (1LT Jackson - 33 items)" />
            </TreeItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default SubHandReceiptStructure; 