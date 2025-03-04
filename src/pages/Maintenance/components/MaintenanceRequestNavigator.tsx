import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItemButton, ListItemIcon, ListItemText, Collapse, useTheme } from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  People as PeopleIcon,
  History as HistoryIcon,
  PendingActions as PendingIcon,
  HourglassEmpty as WaitingIcon,
  ConstructionOutlined as InProgressIcon,
  CheckCircleOutline as CompletedIcon,
  Archive as ArchivedIcon,
  Cancel as CancelledIcon,
  MilitaryTech as PlatoonIcon,
  FolderSpecial as NavigatorIcon
} from '@mui/icons-material';
import { cardSx, navTreeSx } from '../styles';
import { CardHeader } from '../../../components/common';

interface NavigatorItem {
  id: string;
  label: string;
  count: number;
  icon: React.ElementType;
  children?: NavigatorItem[];
}

const navigatorData: NavigatorItem[] = [
  {
    id: 'my-requests',
    label: 'My Requests',
    count: 18,
    icon: PersonIcon,
    children: [
      { id: 'pending-submission', label: 'Pending Submission', count: 2, icon: PendingIcon },
      { id: 'awaiting-approval', label: 'Awaiting Approval', count: 4, icon: WaitingIcon },
      { id: 'in-maintenance', label: 'In Maintenance', count: 8, icon: InProgressIcon },
      { id: 'ready-pickup', label: 'Ready for Pickup', count: 4, icon: CompletedIcon },
    ]
  },
  {
    id: 'unit-requests',
    label: 'Unit Requests',
    count: 37,
    icon: PeopleIcon,
    children: [
      { id: '1st-platoon', label: '1st Platoon', count: 9, icon: PlatoonIcon },
      { id: '2nd-platoon', label: '2nd Platoon', count: 12, icon: PlatoonIcon },
      { id: '3rd-platoon', label: '3rd Platoon', count: 8, icon: PlatoonIcon },
      { id: 'hq-platoon', label: 'HQ Platoon', count: 8, icon: PlatoonIcon },
    ]
  },
  {
    id: 'historical',
    label: 'Historical',
    count: 45,
    icon: HistoryIcon,
    children: [
      { id: 'completed-this-month', label: 'Completed This Month', count: 24, icon: CompletedIcon },
      { id: 'completed-last-month', label: 'Completed Last Month', count: 18, icon: ArchivedIcon },
      { id: 'denied-cancelled', label: 'Denied/Cancelled', count: 3, icon: CancelledIcon },
    ]
  }
];

interface MaintenanceRequestNavigatorProps {
  onCategorySelect: (category: string) => void;
}

const MaintenanceRequestNavigator: React.FC<MaintenanceRequestNavigatorProps> = ({ onCategorySelect }) => {
  const theme = useTheme();
  const [open, setOpen] = useState<Record<string, boolean>>({
    'my-requests': true,
    'unit-requests': false,
    'historical': false
  });
  const [selectedItem, setSelectedItem] = useState<string>('my-requests');

  const handleToggle = (id: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id]
    }));
  };

  const handleSelect = (id: string) => {
    setSelectedItem(id);
    onCategorySelect(id);
  };

  return (
    <Paper 
      sx={{ 
        ...cardSx(theme),
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&::before': {
          top: 0,
          left: 0,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        },
        '&::after': {
          top: 0,
          right: 0,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
        }
      }}
    >
      <CardHeader 
        title="Maintenance Request Navigator" 
        action={<NavigatorIcon color="primary" />}
      />
      
      <Box sx={navTreeSx(theme)}>
        <List component="nav" disablePadding>
          {navigatorData.map((item) => (
            <React.Fragment key={item.id}>
              <ListItemButton
                onClick={() => handleToggle(item.id)}
                selected={selectedItem === item.id}
                sx={{ 
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: selectedItem === item.id 
                    ? theme.palette.mode === 'dark' 
                      ? 'rgba(71, 98, 130, 0.2)' 
                      : 'rgba(21, 101, 192, 0.08)'
                    : 'transparent'
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(71, 98, 130, 0.2)' 
                            : 'rgba(0, 0, 0, 0.08)',
                          borderRadius: '10px',
                          px: 1,
                          py: 0.2
                        }}
                      >
                        {item.count}
                      </Typography>
                    </Box>
                  } 
                />
                {open[item.id] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </ListItemButton>
              
              {item.children && (
                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton 
                        key={child.id}
                        sx={{ 
                          pl: 4, 
                          borderRadius: 1,
                          mb: 0.5,
                          ml: 2,
                          backgroundColor: selectedItem === child.id 
                            ? theme.palette.mode === 'dark' 
                              ? 'rgba(71, 98, 130, 0.2)' 
                              : 'rgba(21, 101, 192, 0.08)'
                            : 'transparent'
                        }}
                        selected={selectedItem === child.id}
                        onClick={() => handleSelect(child.id)}
                      >
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <child.icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">
                                {child.label}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  backgroundColor: theme.palette.mode === 'dark' 
                                    ? 'rgba(71, 98, 130, 0.2)' 
                                    : 'rgba(0, 0, 0, 0.08)',
                                  borderRadius: '10px',
                                  px: 1,
                                  py: 0.2
                                }}
                              >
                                {child.count}
                              </Typography>
                            </Box>
                          } 
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default MaintenanceRequestNavigator; 