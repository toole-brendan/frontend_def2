import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import {
  QrCodeScanner as QrCodeIcon,
  SwapHoriz as SwapHorizIcon,
  Description as ReportIcon
} from '@mui/icons-material';
import { SidebarActionButtonsProps } from './types';

const SidebarActionButtons: React.FC<SidebarActionButtonsProps> = ({
  collapsed,
  onNavigate
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      width: '100%', 
      borderTop: `1px solid ${theme.palette.divider}`,
    }}>
      {!collapsed ? (
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<QrCodeIcon />}
            onClick={() => onNavigate('/defense/dashboard')}
            sx={{ 
              textTransform: 'none',
              borderRadius: 0,
              fontWeight: 500,
              boxShadow: 'none',
              mb: 1,
              height: 42,
              '& .MuiButton-startIcon': {
                mr: 1,
              },
            }}
          >
            Scan QR Code
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SwapHorizIcon />}
            onClick={() => onNavigate('/defense/transfers')}
            sx={{ 
              color: theme.palette.text.primary,
              borderColor: alpha(theme.palette.primary.main, 0.5),
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 500,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              height: 42,
              overflow: 'hidden',
              '& .MuiButton-startIcon': {
                mr: 1,
              },
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            Create Transfer
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ReportIcon />}
            onClick={() => onNavigate('/defense/reports')}
            sx={{ 
              color: theme.palette.text.primary,
              borderColor: alpha(theme.palette.primary.main, 0.5),
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              height: 42,
              overflow: 'hidden',
              '& .MuiButton-startIcon': {
                mr: 1,
              },
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            Generate Report
          </Button>
        </Box>
      ) : (
        <Stack spacing={1} alignItems="center" sx={{ p: 1 }}>
          <IconButton
            color="primary"
            onClick={() => onNavigate('/defense/dashboard')}
            sx={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.9),
              color: theme.palette.common.white,
              borderRadius: 0,
              width: 40, 
              height: 40,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <QrCodeIcon />
          </IconButton>
          <IconButton
            onClick={() => onNavigate('/defense/transfers')}
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              color: theme.palette.text.primary,
              borderRadius: 0,
              width: 40, 
              height: 40,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <SwapHorizIcon />
          </IconButton>
          <IconButton
            onClick={() => onNavigate('/defense/reports')}
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              color: theme.palette.text.primary,
              borderRadius: 0,
              width: 40, 
              height: 40,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <ReportIcon />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

export default SidebarActionButtons;
