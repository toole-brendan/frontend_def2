import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Box,
  alpha,
  useTheme,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { ToolbarProps } from './types';

/**
 * Enhanced table toolbar component
 * Displays the table title, search field, and action buttons
 */
export const EnhancedTableToolbar = ({
  numSelected,
  title,
  selectionActions = [],
  actions = [],
  searchable = true,
  onSearch,
  filterable = true,
  onFilter,
  filterComponent
}: ToolbarProps) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.2),
        }),
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {numSelected > 0 ? (
          <Stack direction="row" spacing={1}>
            {selectionActions
              .filter(action => {
                if (typeof action.visible === 'function') {
                  return action.visible([]);
                }
                return action.visible !== false;
              })
              .map((action, index) => (
                <Button
                  key={action.key || `selection-action-${index}`}
                  size="small"
                  startIcon={action.icon}
                  color={action.color || 'primary'}
                  variant={action.variant || 'text'}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
          </Stack>
        ) : (
          <>
            {searchable && (
              <TextField
                size="small"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mr: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    bgcolor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.background.paper, 0.15)
                      : alpha(theme.palette.common.white, 0.9),
                  }
                }}
              />
            )}
            {filterable && (
              <>
                {filterComponent || (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FilterListIcon />}
                    onClick={onFilter}
                    sx={{ mr: 1 }}
                  >
                    Filter
                  </Button>
                )}
              </>
            )}
            {actions
              .filter(action => {
                if (typeof action.visible === 'function') {
                  return action.visible([]);
                }
                return action.visible !== false;
              })
              .map((action, index) => (
                <Button
                  key={action.key || `action-${index}`}
                  size="small"
                  startIcon={action.icon}
                  color={action.color || 'primary'}
                  variant={action.variant || 'contained'}
                  onClick={action.onClick}
                  sx={{ ml: index > 0 ? 1 : 0 }}
                >
                  {action.label}
                </Button>
              ))}
          </>
        )}
      </Box>
    </Toolbar>
  );
};
