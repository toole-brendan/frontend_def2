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
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';

const DRAWER_WIDTH = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: DRAWER_WIDTH,
  borderRadius: 0,
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.12)',
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
    borderColor: 'rgba(255, 255, 255, 0.24)',
  },
  '&:focus-within': {
    borderColor: '#FFFFFF',
    '& .SearchIconWrapper': {
      color: '#FFFFFF',
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
  color: 'rgba(255, 255, 255, 0.7)',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#FFFFFF',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    letterSpacing: '0.02em',
    fontSize: '0.9375rem',
    fontWeight: 400,
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
      letterSpacing: '0.02em',
      fontWeight: 300,
    },
    '&:focus': {
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
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
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: theme.transitions.create(
    ['background-color', 'transform', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  },
}));

const RankChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(0, 48, 143, 0.8)',
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '0.7rem',
  height: 20,
  borderRadius: 0,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const MilitaryAvatar = styled(Avatar)(({ theme }) => ({
  width: 38,
  height: 38,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backgroundColor: 'rgba(0, 48, 143, 0.6)',
  color: '#FFFFFF',
  fontWeight: 600,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#000000',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 0,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    '& .MuiMenuItem-root': {
      transition: theme.transitions.create(
        ['background-color', 'color'],
        {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
    },
  },
}));

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF3B3B',
    color: '#FFFFFF',
    boxShadow: '0 0 0 2px #000000',
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
  border: '1px solid rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(0.75, 2),
  marginRight: theme.spacing(2),
  '& h1': {
    fontSize: '1.125rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#FFFFFF',
    margin: 0,
    fontFamily: 'Georgia, serif',
    textTransform: 'none',
  },
}));

interface AppBarContentProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
  userDisplayName: string;
}

export const AppBarContent: React.FC<AppBarContentProps> = ({
  isMobile,
  onDrawerToggle,
  userDisplayName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();

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
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          mr: 1,
        }}
      >
        <StyledBadge badgeContent={3} color="error">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>

      <UserInfo onClick={handleMenuOpen}>
        <MilitaryAvatar>
          {rank.charAt(0)}
        </MilitaryAvatar>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <RankChip 
              label={rank} 
              size="small"
              icon={<SecurityIcon style={{ fontSize: 14, color: '#FFFFFF' }} />}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                letterSpacing: '0.02em',
                ml: 0.5,
              }}
            >
              {name}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Company Commander
          </Typography>
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
        <Box sx={{ px: 2, py: 1, backgroundColor: 'rgba(0, 48, 143, 0.1)' }}>
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