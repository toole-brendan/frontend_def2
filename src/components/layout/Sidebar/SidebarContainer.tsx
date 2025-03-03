import React from 'react';
import {
  Box,
  Drawer,
  List,
  alpha,
  useTheme
} from '@mui/material';
import { SidebarProps, SidebarCommonProps } from './types';

/**
 * Container component for sidebar content
 */
const SidebarContainer: React.FC<SidebarCommonProps> = ({ collapsed, children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
    }}>
      {children}
    </Box>
  );
};

/**
 * Navigation List container for sidebar
 */
export const SidebarNavContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      overflow: 'auto', 
      flex: 1, 
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </Box>
  );
};

export const SidebarNavSection: React.FC<{
  children: React.ReactNode;
  isFirst?: boolean;
}> = ({ children, isFirst = true }) => {
  const theme = useTheme();
  
  return (
    <>
      {!isFirst && (
        <Box sx={{ height: 2, backgroundColor: alpha(theme.palette.divider, 0.05) }} />
      )}
      <List component="nav" sx={{ px: 1, pt: 1, pb: 1 }}>
        {children}
      </List>
    </>
  );
};

export default SidebarContainer;
