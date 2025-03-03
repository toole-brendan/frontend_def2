import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme, tokens } from './index';
import { Box, Switch, styled, alpha } from '@mui/material';
import { WbSunny as LightIcon, NightlightRound as DarkIcon } from '@mui/icons-material';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  ThemeToggle: React.FC;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// This should not be the primary way to access theme properties
// Components should use MUI's useTheme() instead for consistency
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

// Industrial-styled theme toggle switch
const IndustrialSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 0,
  borderRadius: 0,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(0px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(28px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.8) : theme.palette.primary.main,
        border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#E2E8F0', 0.2) : '#9AA5B1'}`,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#E2E8F0' : '#1A202C',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A202C' : '#E2E8F0',
    width: 32,
    height: 32,
    borderRadius: 0,
    boxShadow: 'none',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.5) : alpha(theme.palette.primary.main, 0.2),
    borderRadius: 0,
    border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#E2E8F0', 0.1) : '#9AA5B1'}`,
    position: 'relative',
    '&:before, &:after': {
      content: "''",
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.mode === 'dark' ? '#E2E8F0' : '#1A202C',
      )}" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>')`,
      left: 8,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.mode === 'dark' ? '#E2E8F0' : '#1A202C',
      )}" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>')`,
      right: 8,
    },
  },
}));

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check for system color scheme preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Get saved theme from localStorage or use system preference as default
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    return prefersDarkMode ? 'dark' : 'light';
  });

  // Create theme based on current mode
  const theme = React.useMemo(() => createTheme(mode), [mode]);

  // Toggle between light and dark modes with transition effect
  const toggleTheme = useCallback(() => {
    // Apply transition class to body for smooth mode change
    document.body.classList.add('theme-transition');
    
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add listener for preference changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Update theme when mode changes
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    
    // Add global CSS for theme transitions
    const style = document.createElement('style');
    style.textContent = `
      .theme-transition,
      .theme-transition *,
      .theme-transition *:before,
      .theme-transition *:after {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        transition-delay: 0s !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);
  
  // Industrial-themed toggle component
  const ThemeToggle: React.FC = () => {
    const colors = tokens.colors[mode];
    
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          p: 1,
          border: '1px solid',
          borderColor: mode === 'dark' ? 'rgba(226, 232, 240, 0.1)' : 'rgba(74, 85, 104, 0.2)',
          backgroundColor: mode === 'dark' 
            ? colors.background.control
            : alpha(colors.secondary.light, 0.6),
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '4px',
            backgroundColor: mode === 'dark' ? colors.primary.main : colors.primary.dark,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '4px',
            height: '4px',
            backgroundColor: mode === 'dark' ? colors.primary.main : colors.primary.dark,
          }
        }}
      >
        <LightIcon 
          fontSize="small" 
          sx={{ 
            color: mode === 'dark' ? 'rgba(226, 232, 240, 0.5)' : '#3182CE',
            transition: 'color 0.3s'
          }} 
        />
        <IndustrialSwitch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          inputProps={{ 'aria-label': 'Toggle between light and dark mode' }}
        />
        <DarkIcon 
          fontSize="small" 
          sx={{ 
            color: mode === 'dark' ? '#4299E1' : 'rgba(26, 32, 44, 0.5)',
            transition: 'color 0.3s'
          }} 
        />
      </Box>
    );
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, ThemeToggle }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
