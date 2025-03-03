// Design tokens for the application
// These serve as the foundation for all styling decisions

export const tokens = {
  colors: {
    light: {
      // Background colors
      background: {
        default: '#FAFAFA', // Pure white foundation for true light mode
        paper: '#FFFFFF',   // Clean white for cards and containers
        dark: '#E2E8F0',    // Light silver for contrasting elements
        light: '#FFFFFF',   // Bright white for maximum contrast
        control: 'rgba(0, 0, 0, 0.03)', // Very subtle gray for input fields
      },
      // Text colors
      text: {
        primary: '#101114',   // Deep charcoal for sharp contrast primary text
        secondary: '#2D3748', // Dark slate for high-contrast supporting information
        disabled: '#94A3B8',  // Medium gray for disabled text
        hint: '#64748B',      // Darker slate for hints
        inactive: '#64748B',  // Medium-dark gray with precision finish
      },
      // Primary colors
      primary: {
        main: '#2C5282',      // Deeper blue for better contrast on white
        light: '#3182CE',     // Lighter tactical blue
        dark: '#1A365D',      // Darker tactical blue
        contrastText: '#FFFFFF', // White for contrast on blue
      },
      // Secondary colors
      secondary: {
        main: '#718096',      // Industrial silver for secondary elements
        light: '#A0AEC0',     // Lighter industrial silver 
        dark: '#4A5568',      // Gunmetal gray for headers and framework
        contrastText: '#FFFFFF', // White for contrast
      },
      // Border colors
      border: {
        light: 'rgba(203, 213, 224, 0.5)', // Lighter border for subtle definition
        medium: 'rgba(139, 149, 165, 0.5)', // Medium border for moderate definition
        dark: 'rgba(74, 85, 104, 0.5)',    // Medium gray border for stronger definition
        card: '#E2E8F0',      // Light border for card definition
        default: 'rgba(0, 0, 0, 0.12)',    // Default border for all containers
      },
      // Status colors
      status: {
        success: '#2F855A',   // Forest green with better contrast on white
        warning: '#C05621',   // Amber with better readability
        error: '#C53030',     // Signal red with high visibility
        info: '#2B6CB0',      // Tactical blue for information
        inactive: '#4A5568',  // Dark gray with precision finish
      },
      // Action colors
      action: {
        active: '#101114',    // Deep charcoal for active elements
        hover: 'rgba(0, 0, 0, 0.05)', // Slightly darker for hover effects
        selected: 'rgba(43, 108, 176, 0.12)', // Light blue tint for selected items
        disabled: 'rgba(160, 174, 192, 0.4)', // Industrial silver with medium opacity
        disabledBackground: 'rgba(226, 232, 240, 0.24)', // Light silver with low opacity
      },
    },
    dark: {
      // Background colors
      background: {
        default: '#161616',   // Dark gray foundation (2nd darkest) - lightened from #101010
        paper: '#1E1E1E',     // Medium dark gray for standard surfaces (3rd darkest) - lightened from #151515
        dark: '#000000',      // Pure black for sidebar/header (darkest)
        light: '#242424',     // Lighter gray for elevated components (4th darkest) - lightened from #1A1A1A
        control: '#2A2A2A',   // Lightest gray for inputs (lightest) - lightened from #202020
      },
      // Text colors
      text: {
        primary: '#FFFFFF',   // Pure white for maximum contrast
        secondary: '#AAAAAA', // Light gray (less blue tint)
        disabled: '#666666',  // Medium gray (less blue tint)
        hint: '#888888',      // Light gray (removed blue tint)
        inactive: '#444444',  // Dark gray (removed blue tint)
      },
      // Primary colors - Extremely muted/military blue-gray
      primary: {
        main: '#3A5775',      // Very desaturated navy blue 
        light: '#4F6A85',     // Slightly lighter muted blue
        dark: '#2A3E52',      // Dark navy
        contrastText: '#FFFFFF', // White for contrast text
      },
      // Secondary colors - More subdued/industrial
      secondary: {
        main: '#4A5464',      // Dark gray with slight blue tint
        light: '#6A7484',     // Medium gray-blue
        dark: '#323844',      // Very dark gunmetal
        contrastText: '#FFFFFF', // White for contrast text
      },
      // Border colors - Much stronger for definite visibility
      border: {
        light: 'rgba(255, 255, 255, 0.15)',  // Medium light borders
        medium: 'rgba(255, 255, 255, 0.2)',  // Medium borders
        dark: 'rgba(255, 255, 255, 0.25)',   // Darker borders
        card: 'rgba(255, 255, 255, 0.15)',   // Card-specific borders
        default: 'rgba(255, 255, 255, 0.15)', // Default border for all containers 
      },
      // Status colors - Military-inspired muted tones
      status: {
        success: '#3F5F47',   // Dark olive drab (military green)
        warning: '#7D5E3C',   // Muted bronze/brown
        error: '#6B3535',     // Desaturated brick red
        info: '#3A5775',      // Same as primary
        inactive: '#4A5464',  // Same as secondary
      },
      // Action colors
      action: {
        active: 'rgba(248, 249, 250, 0.9)',  // Bright white with high opacity
        hover: 'rgba(255, 255, 255, 0.07)',  // Subtle light overlay for hover
        selected: '#1F2937',                 // Dark selection color with contrast
        disabled: 'rgba(107, 114, 128, 0.5)', // Medium gray with medium opacity
        disabledBackground: 'rgba(31, 41, 55, 0.2)', // Dark gray with low opacity
      },
    }
  },
  spacing: {
    // Spacing scale in pixels
    unit: 8,
    xs: 4,    // 4px
    sm: 8,    // 8px
    md: 16,   // 16px
    lg: 24,   // 24px
    xl: 32,   // 32px
    xxl: 48,  // 48px
  },
  borders: {
    radius: {
      none: 0,  // Square corners for more industrial look
      sm: 2,    // Subtle rounding
      md: 4,    // Medium rounding
      lg: 8,    // Large rounding
    },
    width: {
      thin: 1,   // 1px
      medium: 2, // 2px
      thick: 4,  // 4px
    },
  },
  typography: {
    fontFamilies: {
      primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      secondary: 'Georgia, serif',
      mono: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", monospace',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    // Font size scale in rems
    fontSize: {
      xs: '0.7rem',    // 11.2px
      sm: '0.75rem',   // 12px
      md: '0.875rem',  // 14px
      lg: '1rem',      // 16px
      xl: '1.25rem',   // 20px
      xxl: '1.5rem',   // 24px
      h1: '2rem',      // 32px
      h2: '1.75rem',   // 28px
      h3: '1.5rem',    // 24px
    },
    // Line height scale as unitless values
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  shadows: {
    light: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.03)',
      md: '0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.02)',
      card: '0 0 0 1px rgba(31, 41, 55, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    dark: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)',
      md: '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.3)',
      card: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.4)',
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

export type Tokens = typeof tokens;
export default tokens;
