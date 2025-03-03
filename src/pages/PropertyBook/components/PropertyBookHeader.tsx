import React from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  styled,
  Paper,
  Chip,
  alpha
} from '@mui/material';
import { ReceiptLong, Print, Security, Search } from '@mui/icons-material';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: theme.spacing(3, 4),
}));

const MetricsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(6),
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  borderRadius: theme.shape.borderRadius,
}));

const Metric = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1.5rem',
  fontWeight: 600,
  letterSpacing: '-0.5px',
}));

const QuickActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minWidth: '320px',
}));

const ActionsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
}));

interface PropertyBookHeaderProps {
  unit: string;
  primaryHolder: string;
  totalItems: number;
  totalValue: number;
  lastReconciliation: string;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  currentTab: number;
  onAction: (action: string) => void;
}

export const PropertyBookHeader: React.FC<PropertyBookHeaderProps> = ({
  unit,
  primaryHolder,
  totalItems,
  totalValue,
  lastReconciliation,
  onTabChange,
  currentTab,
  onAction,
}) => {
  return (
    <HeaderWrapper>
      <TopSection>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'text.primary',
              mb: 0.5
            }}
          >
            {unit}
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
              mb: 1
            }}
          >
            Primary Hand Receipt Holder
          </Typography>
          <Typography 
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              mb: 3
            }}
          >
            {primaryHolder}
          </Typography>
          <MetricsSection>
            <Metric>
              <MetricLabel>Total Line Items</MetricLabel>
              <MetricValue>{totalItems}</MetricValue>
            </Metric>
            <Metric>
              <MetricLabel>Equipment Value</MetricLabel>
              <MetricValue>${totalValue.toLocaleString()}</MetricValue>
            </Metric>
            <Metric>
              <MetricLabel>Last Reconciliation</MetricLabel>
              <MetricValue>{lastReconciliation}</MetricValue>
            </Metric>
          </MetricsSection>
        </Box>
        <QuickActions>
          <ActionsPaper elevation={0}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ReceiptLong />}
                onClick={() => onAction('generate')}
                sx={{ 
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Generate Hand Receipt
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Print />}
                onClick={() => onAction('print')}
                sx={{ 
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  backgroundColor: 'background.paper'
                }}
              >
                Print Property Book
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Security />}
                onClick={() => onAction('certify')}
                sx={{ 
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  backgroundColor: 'background.paper'
                }}
              >
                Certify Inventory
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Search />}
                onClick={() => onAction('search')}
                sx={{ 
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  backgroundColor: 'background.paper'
                }}
              >
                Advanced Search
              </Button>
            </Box>
          </ActionsPaper>
        </QuickActions>
      </TopSection>
      <Tabs
        value={currentTab}
        onChange={onTabChange}
        sx={{ 
          px: 4,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            minHeight: 48,
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
              fontWeight: 600
            }
          }
        }}
      >
        <Tab label="Primary Hand Receipt" />
        <Tab label="Sub-Hand Receipts" />
        <Tab label="Shortage Annexes" />
      </Tabs>
    </HeaderWrapper>
  );
};

export default PropertyBookHeader; 