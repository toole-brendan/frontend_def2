import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Box,
  styled,
  Theme,
  Chip,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useAppTheme } from '../../../theme/ThemeProvider';

// Match the drawer width in EnhancedSidebar.tsx
const DRAWER_WIDTH = 260;
const COLLAPSED_DRAWER_WIDTH = 72;

// Create a styled component for the search bar that adapts to the sidebar state
const Search = styled('div')<{ sidebarCollapsed?: boolean }>(({ theme, sidebarCollapsed }) => ({
  position: 'absolute',
  left: sidebarCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.background.paper 
    : theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: '800px',
  transition: theme.transitions.create(
    ['border-color', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    borderColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.24)
      : alpha(theme.palette.common.black, 0.24),
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    '& .SearchIconWrapper': {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    minWidth: '500px',
  },
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    left: 'auto',
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.text.primary, 0.7),
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    letterSpacing: '0.02em',
    fontSize: '0.9375rem',
    fontWeight: 400,
    '&::placeholder': {
      color: alpha(theme.palette.text.primary, 0.5),
      opacity: 1,
      letterSpacing: '0.02em',
      fontWeight: 300,
    },
    '&:focus': {
      '&::placeholder': {
        color: alpha(theme.palette.text.primary, 0.7),
      },
    },
  },
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  cursor: 'pointer',
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.03)
    : alpha(theme.palette.common.black, 0.03),
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(
    ['background-color', 'transform', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.05)
      : alpha(theme.palette.common.black, 0.05),
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
}));

const RankChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '0.7rem', // Use literal value instead of tokens
  height: 20,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.3)}`,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const MilitaryAvatar = styled(Avatar)(({ theme }) => ({
  width: 38,
  height: 38,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightMedium,
  boxShadow: theme.shadows[1],
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    backdropFilter: 'blur(12px)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    boxShadow: theme.shadows[3],
    '& .MuiMenuItem-root': {
      transition: theme.transitions.create(
        ['background-color', 'color'],
        {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 2),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
}));

const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  border: `1px solid ${alpha(theme.palette.text.primary, 0.7)}`,
  padding: theme.spacing(0.75, 2),
  marginRight: theme.spacing(2),
  '& h1': {
    fontSize: '1.125rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: theme.palette.text.primary,
    margin: 0,
    fontFamily: 'Georgia, serif',
    textTransform: 'none',
  },
}));

interface AppBarContentProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
  userDisplayName: string;
  sidebarCollapsed?: boolean;
}

export const AppBarContent: React.FC<AppBarContentProps> = ({
  isMobile,
  onDrawerToggle,
  userDisplayName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { toggleTheme } = useAppTheme();

  // Parse rank and name from userDisplayName (assuming format like "CPT Michael Rodriguez")
  const nameParts = userDisplayName.split(' ');
  const rank = nameParts.length > 0 ? nameParts[0] : '';
  const name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/defense/dashboard');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar sx={{ position: 'relative' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{
            marginRight: 2,
            color: alpha(theme.palette.text.primary, 0.7),
            '&:hover': {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <LogoContainer onClick={handleLogoClick}>
        <LogoBox>
          <h1>HandReceipt</h1>
        </LogoBox>
      </LogoContainer>

      <Search>
        <SearchIconWrapper className="SearchIconWrapper">
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <StyledInputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </form>
      </Search>

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
        <IconButton
          size="large"
          aria-label="toggle theme"
          color="inherit"
          onClick={toggleTheme}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            mr: 1,
          }}
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>

      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          mr: 1,
        }}
      >
        <StyledBadge badgeContent={3} color="error">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>

      <UserInfo onClick={handleMenuOpen}>
        <Avatar 
          sx={{ 
            width: 42, 
            height: 42, 
            bgcolor: theme.palette.primary.main,
            borderRadius: 0,  // Square avatar for military/industrial look
          }}
        >
          {userDisplayName.charAt(0)}
        </Avatar>
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
          <Typography 
            variant="subtitle1" 
            noWrap 
            sx={{ 
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            {userDisplayName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              noWrap
              sx={{ 
                fontSize: '0.75rem',
                letterSpacing: '0.01em',
              }}
            >
              B Co, 2-87 IN BN
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SecurityIcon
                sx={{ 
                  fontSize: 10, 
                  color: theme.palette.success.main
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  letterSpacing: '0.025em', 
                  fontWeight: 500,
                  textTransform: 'uppercase', 
                  fontSize: '0.7rem',
                  color: theme.palette.success.main,
                }}
              >
                CONNECTED
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <ArrowDownIcon
          sx={{
            fontSize: 20,
            color: 'text.secondary',
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'none',
          }}
        />
      </UserInfo>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {userDisplayName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Bravo Company, 2-87 Infantry
          </Typography>
        </Box>
        <Divider />
        <MenuItem component={Link} to="/defense/profile">
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/defense/settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Account Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </StyledMenu>
    </Toolbar>
  );
};

export default AppBarContent;
