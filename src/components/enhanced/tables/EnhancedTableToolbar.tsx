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
import { buttonSx, toolbarSx, textFieldSx, iconButtonSx } from '../../../theme/patterns';

/**
 * Enhanced table toolbar component
 * Displays the table title, search field, and action buttons
 */
export const EnhancedTableToolbar = ({
  numSelected = 0,
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
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
    if (onFilter) {
      onFilter();
    }
  };

  // Check if any rows are selected
  const hasSelected = numSelected > 0;

  return (
    <Toolbar
      sx={toolbarSx(theme, hasSelected)}
    >
      {hasSelected ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: 500 }}
          variant="h6"
          id="tableTitle"
        >
          {title}
        </Typography>
      )}

      {/* Search Field */}
      {searchable && !hasSelected && (
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          sx={{
            marginRight: 2,
            width: { xs: '100%', md: '240px' },
            ...textFieldSx(theme)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* Filter button */}
      {filterable && !hasSelected && (
        <IconButton 
          onClick={toggleFilter}
          sx={{
            ...iconButtonSx(theme),
            marginRight: 1,
            color: filterOpen ? theme.palette.primary.main : 'inherit',
            backgroundColor: filterOpen 
              ? alpha(theme.palette.primary.main, 0.1) 
              : 'transparent',
          }}
          aria-label="Toggle filters"
          size="small"
        >
          <FilterListIcon />
        </IconButton>
      )}

      {/* Selection action buttons */}
      {hasSelected && (
        <Box>
          {selectionActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              sx={{
                ...buttonSx(theme, action.color || 'primary'),
                mr: index < selectionActions.length - 1 ? 1 : 0
              }}
              variant={action.variant || 'contained'}
              color={action.color || 'primary'}
              startIcon={action.icon}
              size="small"
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}

      {/* Regular action buttons */}
      {!hasSelected && (
        <Box>
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              sx={{
                ...buttonSx(theme, action.color || 'primary'),
                mr: index < actions.length - 1 ? 1 : 0
              }}
              variant={action.variant || 'contained'}
              color={action.color || 'primary'}
              startIcon={action.icon}
              size="small"
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}

      {/* Filter panel */}
      {filterable && filterOpen && filterComponent && (
        <Box sx={{ width: '100%', mt: 2 }}>{filterComponent}</Box>
      )}
    </Toolbar>
  );
};
