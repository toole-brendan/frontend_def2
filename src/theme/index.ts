import { Theme as MuiTheme, createTheme as muiCreateTheme, ThemeOptions, alpha } from '@mui/material/styles';
import { colors, darkColors, lightColors, getColors } from './colors';
import { fontFamilies, fontWeights, typography } from './typography';

declare module '@mui/material/styles' {
  interface Theme {
    semantic: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        control: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inactive: string;
      };
      border: {
        primary: string;
        secondary: string;
        card: string;
      };
      status: {
        success: string;
        warning: string;
        error: string;
        info: string;
        inactive: string;
      };
    };
  }
  
  // Add to ThemeOptions as well to allow theme creation with this property
  interface ThemeOptions {
    semantic?: {
      background?: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
        control?: string;
      };
      text?: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
        inactive?: string;
      };
      border?: {
        primary?: string;
        secondary?: string;
        card?: string;
      };
      status?: {
        success?: string;
        warning?: string;
        error?: string;
        info?: string;
        inactive?: string;
      };
    };
  }
}

// Create theme based on mode
export const createTheme = (mode: 'light' | 'dark' = 'dark') => {
  const themeColors = getColors(mode);
  
  return muiCreateTheme({
    palette: {
      mode,
      background: {
        default: themeColors.background.default,
        paper: themeColors.background.paper,
      },
      text: {
        primary: themeColors.text.primary,
        secondary: themeColors.text.secondary,
        disabled: themeColors.text.disabled,
      },
      primary: {
        main: themeColors.primary.main,
        light: themeColors.primary.light,
        dark: themeColors.primary.dark,
        contrastText: themeColors.primary.contrastText,
      },
      secondary: {
        main: themeColors.secondary.main,
        light: themeColors.secondary.light,
        dark: themeColors.secondary.dark,
        contrastText: themeColors.secondary.contrastText,
      },
      success: {
        main: themeColors.status.success,
        dark: mode === 'dark' ? '#2F855A' : '#276749',
        light: mode === 'dark' ? '#68D391' : '#48BB78',
      },
      warning: {
        main: themeColors.status.warning,
        dark: mode === 'dark' ? '#C05621' : '#B7791F',
        light: mode === 'dark' ? '#F6AD55' : '#ECC94B',
      },
      error: {
        main: themeColors.status.error,
        dark: mode === 'dark' ? '#C53030' : '#C53030',
        light: mode === 'dark' ? '#FC8181' : '#F56565',
      },
      info: {
        main: themeColors.status.info,
        dark: mode === 'dark' ? '#2C5282' : '#2B6CB0',
        light: mode === 'dark' ? '#63B3ED' : '#4299E1',
      },
      action: themeColors.action,
    },
    // Add semantic colors that can be accessed through theme.semantic
    semantic: {
      background: {
        primary: themeColors.background.default,
        secondary: themeColors.background.paper,
        tertiary: themeColors.background.dark,
        control: themeColors.background.control,
      },
      text: {
        primary: themeColors.text.primary,
        secondary: themeColors.text.secondary,
        tertiary: themeColors.text.hint,
        inactive: themeColors.text.inactive,
      },
      border: {
        primary: themeColors.border.light,
        secondary: themeColors.border.dark,
        card: themeColors.border.card,
      },
      status: {
        success: themeColors.status.success,
        warning: themeColors.status.warning,
        error: themeColors.status.error,
        info: themeColors.status.info,
        inactive: themeColors.status.inactive,
      },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: fontFamilies.primary,
      ...typography,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: themeColors.background.default,
            color: themeColors.text.primary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowX: 'hidden',
          },
          '@global': {
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-track': {
              background: mode === 'dark' ? '#171923' : '#E2E8F0',
            },
            '*::-webkit-scrollbar-thumb': {
              background: mode === 'dark' ? '#4A5568' : '#A0AEC0',
              borderRadius: 0,
              border: mode === 'dark' 
                ? '1px solid rgba(226, 232, 240, 0.1)' 
                : '1px solid rgba(74, 85, 104, 0.1)',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              background: mode === 'dark' ? '#718096' : '#718096',
            },
            '*::selection': {
              background: mode === 'dark' 
                ? alpha(themeColors.primary.main, 0.3) 
                : alpha(themeColors.primary.main, 0.2),
              color: themeColors.text.primary,
            },
            // Add technical grid background for body in light mode
            ...(mode === 'light' ? {
              'body': {
                backgroundImage: 'linear-gradient(rgba(203, 213, 224, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 224, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }
            } : {
              'body': {
                backgroundImage: 'linear-gradient(rgba(226, 232, 240, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(226, 232, 240, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }
            }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 0,
            fontWeight: fontWeights.medium,
            padding: '6px 16px',
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
            letterSpacing: '0.02em',
            // Military-style precision with crisp edges
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: mode === 'dark' 
                ? '1px solid rgba(226, 232, 240, 0.08)' 
                : '1px solid rgba(74, 85, 104, 0.08)',
              pointerEvents: 'none',
            },
          },
          contained: {
            boxShadow: mode === 'dark' 
              ? '0 0 0 1px rgba(226, 232, 240, 0.1), 0 2px 4px rgba(0, 0, 0, 0.4)' 
              : '0 0 0 1px rgba(74, 85, 104, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
            backgroundColor: mode === 'dark' ? themeColors.primary.main : themeColors.primary.main,
            '&:hover': {
              boxShadow: mode === 'dark' 
                ? '0 0 0 1px rgba(226, 232, 240, 0.2), 0 3px 6px rgba(0, 0, 0, 0.5)' 
                : '0 0 0 1px rgba(74, 85, 104, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15)',
              backgroundColor: mode === 'dark' ? themeColors.primary.light : themeColors.primary.dark,
            },
            '&:active': {
              boxShadow: mode === 'dark' 
                ? '0 0 0 1px rgba(226, 232, 240, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.4)' 
                : '0 0 0 1px rgba(74, 85, 104, 0.2), inset 0 1px 2px rgba(0, 0, 0, 0.2)',
            },
          },
          outlined: {
            borderWidth: '1px',
            borderColor: mode === 'dark' ? themeColors.border.light : themeColors.border.dark,
            '&:hover': {
              borderColor: themeColors.border.dark,
              backgroundColor: themeColors.action.hover,
            },
          },
          text: {
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(226, 232, 240, 0.04)' 
                : 'rgba(74, 85, 104, 0.04)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: themeColors.background.paper,
            borderRadius: 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            ...(mode === 'dark' ? {
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(226, 232, 240, 0.05)',
              }
            } : {})
          },
          elevation1: {
            boxShadow: mode === 'dark' 
              ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)' 
              : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          },
          elevation2: {
            boxShadow: mode === 'dark' 
              ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 4px 6px rgba(0, 0, 0, 0.3)' 
              : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 2px 5px rgba(0, 0, 0, 0.15)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.background.paper,
            borderRadius: 0,
            boxShadow: 'none',
            border: `1px solid ${themeColors.border.card}`,
            backgroundImage: 'none',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            overflow: 'visible',
            ...(mode === 'dark' ? {
              // Dark mode: Subtle glow effect
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(226, 232, 240, 0) 0%, rgba(226, 232, 240, 0.05) 50%, rgba(226, 232, 240, 0) 100%)',
                pointerEvents: 'none',
              }
            } : {
              // Light mode: Hard technical edge
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '4px',
                backgroundColor: themeColors.secondary.dark, // Primary Structure color
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '4px',
                height: '4px',
                backgroundColor: themeColors.secondary.dark, // Primary Structure color
                pointerEvents: 'none',
              }
            }),
            '&:hover': {
              borderColor: themeColors.border.dark,
              transform: 'translateY(-1px)',
              boxShadow: mode === 'dark' 
                ? '0 4px 8px rgba(0, 0, 0, 0.3)' 
                : '0 2px 5px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' 
              ? '#1D1F24' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${themeColors.border.light}`,
            boxShadow: 'none',
            borderRadius: 0,
            transition: 'background-color 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: mode === 'dark'
                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
                : 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)',
              pointerEvents: 'none',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: themeColors.background.paper,
            borderRight: `1px solid ${themeColors.border.light}`,
            transition: 'background-color 0.3s ease',
            borderRadius: 0,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: themeColors.border.light,
            transition: 'border-color 0.3s ease',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: mode === 'dark'
              ? `1px solid ${alpha(themeColors.border.light, 0.2)}`
              : `1px solid ${themeColors.secondary.main}`, // Secondary Structure color
            padding: '8px 16px',
            fontSize: '0.75rem',
            transition: 'background-color 0.2s ease-in-out',
            position: 'relative',
          },
          head: {
            fontWeight: fontWeights.semibold,
            backgroundColor: mode === 'dark'
              ? 'rgba(26, 32, 44, 0.8)' // Dark header background
              : alpha(themeColors.secondary.light, 0.7), // Light industrial silver
            color: mode === 'dark'
              ? alpha(themeColors.text.primary, 0.9)
              : themeColors.secondary.dark, // Primary Structure color for headers
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            // Military-inspired header style
            borderBottom: mode === 'dark'
              ? `2px solid ${alpha(themeColors.primary.main, 0.5)}`
              : `2px solid ${alpha(themeColors.primary.main, 0.7)}`,
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '1px',
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.primary.main, 0.3)
                : alpha(themeColors.primary.main, 0.5),
            }
          },
          body: {
            // Alternate row colors for better readability
            '&:nth-of-type(odd)': {
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.background.paper, 0.5)
                : themeColors.background.light, // Brighter cool white for contrast
            },
            '&:nth-of-type(even)': {
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.background.default, 0.5)
                : themeColors.background.paper, // Light steel surface
            },
            // Hover effect
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.primary.dark, 0.1)
                : themeColors.action.selected, // Light blue tint for selected items
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            // Add support for inactive status via a custom className
            '&.inactive': {
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.status.inactive, 0.2)
                : alpha(themeColors.status.inactive, 0.1),
              color: mode === 'dark'
                ? themeColors.status.inactive // Muted gray with reduced prominence
                : themeColors.status.inactive, // Neutral gray with matte finish
              '&::before': {
                backgroundColor: themeColors.status.inactive,
              },
            },
            borderRadius: 0,
            height: 24,
            fontSize: '0.7rem',
            fontWeight: fontWeights.medium,
            transition: 'all 0.2s ease-in-out',
            border: mode === 'dark'
              ? `1px solid ${alpha(themeColors.border.light, 0.3)}`
              : `1px solid ${themeColors.border.light}`,
            position: 'relative',
            
            // Technical indicator style inspired by military
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '3px',
              height: '50%',
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.primary.main, 0.7)
                : themeColors.primary.main,
            },
          },
          filled: {
            backgroundColor: mode === 'dark'
              ? 'rgba(45, 55, 72, 0.7)'
              : alpha(themeColors.background.dark, 0.7),
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? 'rgba(45, 55, 72, 0.9)'
                : alpha(themeColors.background.dark, 0.9),
            },
          },
          label: {
            paddingLeft: '8px',
            paddingRight: '8px',
          },
          // Status variants
          colorPrimary: {
            backgroundColor: mode === 'dark'
              ? alpha(themeColors.primary.main, 0.2)
              : alpha(themeColors.primary.main, 0.1),
            color: mode === 'dark'
              ? themeColors.primary.light
              : themeColors.primary.dark,
            '&::before': {
              backgroundColor: themeColors.primary.main,
            },
          },
          colorSuccess: {
            backgroundColor: mode === 'dark'
              ? alpha(themeColors.status.success, 0.2)
              : alpha(themeColors.status.success, 0.1),
            color: mode === 'dark'
              ? themeColors.status.success  // Phosphorescent green with increased luminosity
              : themeColors.status.success, // Forest green with subtle metallic quality
            '&::before': {
              backgroundColor: themeColors.status.success,
            },
          },
          colorError: {
            backgroundColor: mode === 'dark'
              ? alpha(themeColors.status.error, 0.2)
              : alpha(themeColors.status.error, 0.1),
            color: mode === 'dark'
              ? themeColors.status.error  // Emergency red with maximum visibility
              : themeColors.status.error, // Signal red with high visibility
            '&::before': {
              backgroundColor: themeColors.status.error,
            },
          },
          colorWarning: {
            backgroundColor: mode === 'dark'
              ? alpha(themeColors.status.warning, 0.2)
              : alpha(themeColors.status.warning, 0.1),
            color: mode === 'dark'
              ? themeColors.status.warning // Hazard amber with higher saturation
              : themeColors.status.warning, // Amber with hazard-pattern undertone
            '&::before': {
              backgroundColor: themeColors.status.warning,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            height: 6,
            backgroundColor: mode === 'dark'
              ? 'rgba(226, 232, 240, 0.1)'
              : 'rgba(74, 85, 104, 0.1)',
            overflow: 'visible',
            position: 'relative',
            // Technical measuring indicator ticks
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '25%',
              width: '1px',
              backgroundColor: mode === 'dark'
                ? 'rgba(226, 232, 240, 0.1)'
                : 'rgba(74, 85, 104, 0.2)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '75%',
              width: '1px',
              backgroundColor: mode === 'dark'
                ? 'rgba(226, 232, 240, 0.1)'
                : 'rgba(74, 85, 104, 0.2)',
            },
          },
          bar: {
            borderRadius: 0,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
    },
  });
};

// For backward compatibility
export const BaseTheme = createTheme('dark');

export type Theme = MuiTheme & {
  semantic: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      control: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inactive: string;
    };
    border: {
      primary: string;
      secondary: string;
      card: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
      inactive: string;
    };
  };
};

export type { ColorPalette } from './colors';
export * from './colors';
export * from './typography';
