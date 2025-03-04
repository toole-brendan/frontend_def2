import React from 'react';
import { Box, Typography, Paper, Button, CircularProgress, List, ListItem, ListItemText, Stack, alpha, useTheme } from '@mui/material';
import { AccountabilityStatusCardProps } from '../types';
import { cardWithCornerSx, sectionHeaderSx, buttonSx, valueSx } from '../styles';
import { getStatusColor } from '../utils';

export const AccountabilityStatusCard: React.FC<AccountabilityStatusCardProps> = ({
  overallRate,
  sensitiveItems,
  equipmentCategories,
  onStartInventory,
  subHandReceipts
}) => {
  const theme = useTheme();
  
  // Handle legacy mode vs new mode
  const isLegacyMode = subHandReceipts && subHandReceipts.length > 0;

  return (
    <Paper 
      sx={cardWithCornerSx(theme, alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.3 : 0.2))}
    >
      <Box sx={{ p: 2 }}>
        {/* Card Title */}
        <Typography variant="h6" sx={sectionHeaderSx}>
          Accountability Status
        </Typography>

        {/* Accountability Gauge */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            my: 2,
            height: 180 
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={160}
            thickness={4}
            sx={{ 
              position: 'absolute', 
              color: alpha(theme.palette.divider, 0.2),
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'butt', // Square-ish edges on progress
              } 
            }}
          />
          <CircularProgress
            variant="determinate"
            value={overallRate}
            size={160}
            thickness={4}
            sx={{ 
              position: 'absolute', 
              color: getStatusColor(overallRate, theme),
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'butt', // Square-ish edges on progress
              }
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h4" 
              sx={{
                ...valueSx,
                color: getStatusColor(overallRate, theme),
              }}
            >
              {overallRate}%
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.05em',
              }}
            >
              Overall Accountability
            </Typography>
          </Box>
        </Box>

        {/* New Dashboard Mode */}
        {!isLegacyMode && (
          <>
            {/* Sensitive Items Section */}
            {sensitiveItems && (
              <Box sx={{ 
                mb: 2, 
                p: 1.5, 
                bgcolor: alpha(theme.palette.success.main, 0.08),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    mb: 1
                  }}
                >
                  Sensitive Items
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.primary', 
                    fontWeight: 'medium',
                    fontFamily: 'monospace',
                  }}
                >
                  {sensitiveItems.verified}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontFamily: 'monospace',
                      fontSize: '0.7rem',
                    }}
                  >
                    Last: {sensitiveItems.lastVerification}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '0.7rem',
                    }}
                  >
                    Next: {sensitiveItems.nextRequired}
                  </Typography>
                </Stack>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ 
                    mt: 1,
                    ...buttonSx,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                  }}
                  onClick={onStartInventory}
                >
                  Conduct Sensitive Item Inventory
                </Button>
              </Box>
            )}

            {/* Equipment Categories */}
            {equipmentCategories && equipmentCategories.length > 0 && (
              <>
                <Typography 
                  variant="subtitle1" 
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    mb: 1
                  }}
                >
                  Equipment Categories
                </Typography>
                <List disablePadding>
                  {equipmentCategories.map((category, index) => (
                    <ListItem 
                      key={index}
                      disablePadding
                      sx={{ 
                        py: 1, 
                        px: 0.5,
                        borderBottom: index < equipmentCategories.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 'medium',
                              fontSize: '0.8rem',
                            }}
                          >
                            {category.name}: {' '}
                            <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                              {category.count} ({category.percentage}%)
                            </Box>
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            variant="caption" 
                            component="div" 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              mt: 0.5,
                              fontFamily: 'monospace',
                              fontSize: '0.7rem',
                            }}
                          >
                            <span style={{ color: alpha(theme.palette.text.secondary, 0.8) }}>
                              Last verified {category.lastVerified}
                            </span>
                            {category.note && (
                              <span style={{ color: theme.palette.warning.main, fontWeight: 'bold' }}>
                                {category.note}
                              </span>
                            )}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}

        {/* Legacy Mode - Display Sub-Hand Receipts */}
        {isLegacyMode && (
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="subtitle1" 
              sx={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                mb: 1
              }}
            >
              Sub-Hand Receipt Breakdown
            </Typography>
            <List disablePadding>
              {subHandReceipts.map((receipt, index) => (
                <ListItem 
                  key={index}
                  disablePadding
                  sx={{ 
                    py: 1, 
                    px: 0.5,
                    borderBottom: index < subHandReceipts.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        component="div" 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '0.8rem',
                        }}
                      >
                        <span style={{ fontWeight: 500 }}>
                          {receipt.officer} ({receipt.platoon})
                        </span>
                        <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                          {receipt.itemCount} items
                        </span>
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: theme.palette.info.main,
                          fontFamily: 'monospace',
                          fontSize: '0.7rem', 
                        }}
                      >
                        {receipt.statusMessage}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
