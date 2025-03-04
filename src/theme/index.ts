  // @ts-ignore - Unused variable intentionally kept
import { Theme as MuiTheme, createTheme as muiCreateTheme, ThemeOptions } from '@mui/material/styles';
import tokens from './tokens';
import { darkColorTokens, lightColorTokens, statusColorTokens } from './defenseColorTokens';
;

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

/**
 * Create a theme based on the specified mode
 * @param mode - 'light' or 'dark'
 * @returns MUI Theme with custom extensions
 */
export const createTheme = (mode: 'light' | 'dark' = 'dark') => {
  // Use defense color tokens based on mode
  const defenseColors = mode === 'dark' ? darkColorTokens : lightColorTokens;
  
  // Ensure action property is available since it's not in our defense tokens
  const colors = {
    ...tokens.colors[mode],
    ...defenseColors,
    action: tokens.colors[mode].action // Preserve original action behaviors
  };
  
  // Make special status tokens available
  
  
  // Create the base theme
  const baseTheme = muiCreateTheme({
    palette: {
      mode,
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
      },
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
        contrastText: colors.primary.contrastText,
      },
      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
        contrastText: colors.secondary.contrastText,
      },
      success: {
        main: colors.success.main,
        dark: colors.success.dark,
        light: colors.success.light,
        contrastText: colors.success.contrastText
      },
      warning: {
        main: colors.status.warning,
        dark: mode === 'dark' ? '#C05621' : '#B7791F',
        light: mode === 'dark' ? '#F6AD55' : '#ECC94B',
      },
      error: {
        main: colors.status.error,
        dark: mode === 'dark' ? '#C53030' : '#C53030',
        light: mode === 'dark' ? '#FC8181' : '#F56565',
      },
      info: {
        main: colors.status.info,
        dark: mode === 'dark' ? '#365172' : '#2C4A6B',
        light: mode === 'dark' ? '#627D95' : '#5A7A99',
      },
      action: colors.action,
    },
    // Add semantic colors that can be accessed through theme.semantic
    semantic: {
      background: {
        primary: colors.background.default,
        secondary: colors.background.paper,
        tertiary: colors.background.dark,
        control: colors.background.control,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        tertiary: colors.text.hint,
        inactive: colors.text.inactive,
      },
      border: {
        primary: colors.border.light,
        secondary: colors.border.dark,
        card: colors.border.card,
      },
      status: {
        success: colors.status.success,
        warning: colors.status.warning,
        error: colors.status.error,
        info: colors.status.info,
        inactive: colors.status.inactive,
      },
    },
    shape: {
      borderRadius: tokens.borders.radius.none,
    },
    typography: {
      fontFamily: tokens.typography.fontFamilies.primary,
      h1: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.bold,
        fontSize: tokens.typography.fontSize.h1,
        lineHeight: tokens.typography.lineHeight.tight,
        letterSpacing: tokens.typography.letterSpacing.tight,
      },
      h2: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.semibold,
        fontSize: tokens.typography.fontSize.h2,
        lineHeight: tokens.typography.lineHeight.tight,
        letterSpacing: tokens.typography.letterSpacing.tight,
      },
      h3: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.semibold,
        fontSize: tokens.typography.fontSize.h3,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.tight,
      },
      h4: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.medium,
        fontSize: tokens.typography.fontSize.xxl,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.tight,
      },
      h5: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.medium,
        fontSize: tokens.typography.fontSize.xl,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.normal,
      },
      h6: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.medium,
        fontSize: tokens.typography.fontSize.lg,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.wide,
        textTransform: 'uppercase',
      },
      subtitle1: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.regular,
        fontSize: tokens.typography.fontSize.md,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.wide,
      },
      subtitle2: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.regular,
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.wide,
      },
      body1: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.regular,
        fontSize: tokens.typography.fontSize.md,
        lineHeight: tokens.typography.lineHeight.relaxed,
        letterSpacing: tokens.typography.letterSpacing.wide,
      },
      body2: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.regular,
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.relaxed,
        letterSpacing: tokens.typography.letterSpacing.wide,
      },
      button: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.medium,
        fontSize: tokens.typography.fontSize.md,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.wide,
        textTransform: 'none',
      },
      caption: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.regular,
        fontSize: tokens.typography.fontSize.xs,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.wider,
      },
      overline: {
        fontFamily: tokens.typography.fontFamilies.primary,
        fontWeight: tokens.typography.fontWeights.medium,
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.normal,
        letterSpacing: tokens.typography.letterSpacing.widest,
        textTransform: 'uppercase',
      },
    },
  });

  // Create the final theme with base configuration first
  const theme = muiCreateTheme({
    ...baseTheme,
  });

  // Add component overrides directly without intermediate variable
  return muiCreateTheme({
    ...theme,
    components: {
      // Apply selective component overrides to ensure type compatibility
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: colors.background.default,
            color: colors.text.primary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowX: 'hidden',
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
              },
              // Remove grid background pattern
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 0,
            fontWeight: tokens.typography.fontWeights.medium,
            padding: '6px 16px',
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            boxShadow: mode === 'dark' 
              ? '0 0 0 1px rgba(226, 232, 240, 0.1), 0 2px 4px rgba(0, 0, 0, 0.4)' 
              : '0 0 0 1px rgba(74, 85, 104, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
            backgroundColor: mode === 'dark' ? colors.primary.main : colors.primary.main,
            '&:hover': {
              boxShadow: mode === 'dark' 
                ? '0 0 0 1px rgba(226, 232, 240, 0.2), 0 3px 6px rgba(0, 0, 0, 0.5)' 
                : '0 0 0 1px rgba(74, 85, 104, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15)',
              backgroundColor: mode === 'dark' ? colors.primary.light : colors.primary.dark,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: colors.background.paper,
            borderRadius: 0,
            // Add strong border
            border: `2px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'} !important`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          elevation1: {
            boxShadow: mode === 'dark' 
              ? '0 0 0 1px rgba(226, 232, 240, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)' 
              : '0 0 0 1px rgba(74, 85, 104, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.paper,
            borderRadius: 0,
            boxShadow: 'none',
            // Add strong border
            border: `2px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'} !important`,
            backgroundImage: 'none',
            overflow: 'visible',
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
            borderBottom: `1px solid ${colors.border.light}`,
            boxShadow: 'none',
            borderRadius: 0,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.background.paper,
            borderRight: `1px solid ${colors.border.light}`,
            transition: 'background-color 0.3s ease',
            borderRadius: 0,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: colors.border.light,
            transition: 'border-color 0.3s ease',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            height: 24,
            fontSize: '0.7rem',
            fontWeight: tokens.typography.fontWeights.medium,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${colors.border.light}`,
            padding: '8px 16px',
            fontSize: '0.75rem',
          },
          head: {
            fontWeight: tokens.typography.fontWeights.semibold,
            backgroundColor: mode === 'dark'
              ? 'rgba(26, 32, 44, 0.8)'
              : colors.background.light,
          },
        },
      },
    },
  });
};

// For backward compatibility
// Note: Removed empty export

// Consolidated type definition
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

export { tokens, darkColorTokens, lightColorTokens, statusColorTokens };
