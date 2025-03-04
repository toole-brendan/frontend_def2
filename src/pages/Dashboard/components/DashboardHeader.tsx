import React from 'react';
import { Box, Typography, Paper, Chip, Avatar, Grid, Stack } from '@mui/material';
import { DashboardHeaderProps } from '../types';

// Format currency for display
const formatCurrency = (value: string | number): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(numericValue);
};

// User interface extending string
interface UserObject {
  name: string;
  avatar?: string;
  role: string;
  unit: string;
}

// SensitiveItemsStatus interface
interface SensitiveItemsStatusObject {
  count: number;
  status: 'verified' | 'pending';
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  unitInfo,
  title,
  user,
  totalValue,
  equipmentItems,
  sensitiveItemsStatus,
  dateTime
}) => {
  // Determine if we're using legacy or new mode
  const isLegacyMode = unitInfo !== undefined;

  // Parse user if it's a JSON string
  const userObject: UserObject | undefined = React.useMemo(() => {
    if (typeof user === 'string') {
      try {
        // Check if it's a JSON string
        if (user.startsWith('{') && user.endsWith('}')) {
          return JSON.parse(user) as UserObject;
        }
        // Otherwise, it's just a string
        return undefined;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }, [user]);

  // Parse sensitiveItemsStatus if it's a JSON string
  const sensitiveItemsStatusObject: SensitiveItemsStatusObject | undefined = React.useMemo(() => {
    if (typeof sensitiveItemsStatus === 'string') {
      try {
        // Check if it's a JSON string
        if (sensitiveItemsStatus.startsWith('{') && sensitiveItemsStatus.endsWith('}')) {
          return JSON.parse(sensitiveItemsStatus) as SensitiveItemsStatusObject;
        }
        // Otherwise, it's just a string
        return undefined;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }, [sensitiveItemsStatus]);

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      {isLegacyMode ? (
        /* Legacy Mode */
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {unitInfo?.name} Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Chip 
              label={`Class VII Items: ${unitInfo?.classVIIItems}`} 
              color="primary" 
              sx={{ mr: 2, fontWeight: 'medium' }} 
            />
            <Typography variant="body2" color="text.secondary">
              Accountability Rate: {unitInfo?.accountabilityRate}% • Value: {unitInfo?.dollarValue}
            </Typography>
          </Box>
        </Box>
      ) : (
        /* New Mode */
        <Grid container spacing={3}>
          {/* Title and User Section */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {title || "Commander's Dashboard"}
              </Typography>
              
              {userObject ? (
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                  <Avatar src={userObject.avatar} alt={userObject.name}>
                    {userObject.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {userObject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userObject.role}, {userObject.unit}
                    </Typography>
                  </Box>
                </Stack>
              ) : user ? (
                <Typography variant="subtitle1" color="text.secondary">
                  {user}
                </Typography>
              ) : null}
            </Box>
          </Grid>
          
          {/* Stats Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
              {dateTime && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Last updated: {dateTime}
                </Typography>
              )}
              
              <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {totalValue !== undefined && (
                  <Grid item>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        bgcolor: 'primary.light', 
                        p: 1.5, 
                        borderRadius: 2,
                        minWidth: 120,
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Total Value
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {formatCurrency(totalValue)}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                
                {equipmentItems !== undefined && (
                  <Grid item>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        bgcolor: 'success.light', 
                        p: 1.5, 
                        borderRadius: 2,
                        minWidth: 120,
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Equipment Items
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {equipmentItems}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                
                {sensitiveItemsStatusObject ? (
                  <Grid item>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        bgcolor: sensitiveItemsStatusObject.status === 'verified' ? 'success.light' : 'warning.light', 
                        p: 1.5, 
                        borderRadius: 2,
                        minWidth: 120,
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Sensitive Items
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {sensitiveItemsStatusObject.count}
                      </Typography>
                      <Typography variant="caption" fontWeight="medium">
                        {sensitiveItemsStatusObject.status === 'verified' ? 'All Verified' : 'Verification Needed'}
                      </Typography>
                    </Paper>
                  </Grid>
                ) : sensitiveItemsStatus ? (
                  <Grid item>
                    <Chip
                      label={`Sensitive Items: ${sensitiveItemsStatus}`}
                      color="success"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}; 