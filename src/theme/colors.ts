// Defense Industrial Modern Design Mode color palettes
export const darkColors = {
  background: {
    default: '#1A1C21',   // Deep charcoal foundation (less blue, more neutral)
    paper: '#23262E',     // Carbon gray for cards and containers
    dark: '#1D1F24',      // Darker elements for sidebar and header
    light: '#25282F',     // Card/Panel background for layering
    control: '#32353D',   // Subdued input field background
  },
  text: {
    primary: '#E6E8ED',   // Off-white for primary text (slightly warmer)
    secondary: '#9DA1AB', // Neutral gray for supporting information
    disabled: '#6D717B',  // Muted gray for disabled text
    hint: '#6D717B',      // Matching disabled for hints
    inactive: '#5D6167',  // Neutral carbon gray with reduced brightness
  },
  primary: {
    main: '#5C8FBE',      // Desaturated tactical blue (less vibrant)
    light: '#7EABD4',     // Lighter tactical blue 
    dark: '#4B779F',      // Darker tactical blue
    contrastText: '#1A1C21', // Deep charcoal for contrast text
  },
  secondary: {
    main: '#494D57',      // Industrial steel for secondary elements (Secondary Structure)
    light: '#5D6167',     // Lighter industrial steel
    dark: '#2F3237',      // Neutral gunmetal for headers and framework (Primary Structure)
    contrastText: '#E6E8ED', // Off-white for contrast text
  },
  border: {
    light: 'rgba(160, 174, 192, 0.14)', // Subtle illuminated borders
    dark: 'rgba(160, 174, 192, 0.25)',  // More visible illuminated edges
    card: '#3A3E46',      // Neutral divider color
  },
  status: {
    success: '#5EAD7B',   // Military sage green (less neon, more tactical)
    warning: '#D9963A',   // Amber with reduced saturation
    error: '#C75450',     // Emergency red with reduced luminosity
    info: '#5C8FBE',      // Matching primary color for consistency
    inactive: '#5D6167',  // Neutral carbon gray with reduced brightness
  },
  action: {
    active: 'rgba(230, 232, 237, 0.9)',  // Off-white with high opacity
    hover: 'rgba(255, 255, 255, 0.07)',  // Subtle light overlay for hover
    selected: '#353A44',                 // Subtly distinguished selection color
    disabled: 'rgba(109, 113, 123, 0.5)', // Muted gray with medium opacity
    disabledBackground: 'rgba(47, 50, 55, 0.2)', // Gunmetal with low opacity
  },
} as const;

export const lightColors = {
  background: {
    default: '#F5F7FA', // Cool white foundation (Background Base)
    paper: '#E4E7EC',   // Light steel for cards and containers (Surface Elements)
    dark: '#CBD5E0',    // Lighter version of industrial silver
    light: '#F7FAFC',   // Brighter cool white for contrast
    control: 'rgba(0, 0, 0, 0.05)', // Subtle gray for input fields
  },
  text: {
    primary: '#1A202C',   // Deep charcoal for primary text (Text Primary)
    secondary: '#4A5568', // Slate gray for supporting information (Text Secondary)
    disabled: '#9AA5B1',  // Industrial silver for disabled text
    hint: '#718096',      // Darker industrial silver for hints
    inactive: '#718096',  // Neutral gray with matte finish (Inactive)
  },
  primary: {
    main: '#3182CE',      // Tactical blue for interactive elements (Accent Color)
    light: '#4299E1',     // Lighter tactical blue
    dark: '#2B6CB0',      // Darker tactical blue
    contrastText: '#FFFFFF', // White for contrast on blue
  },
  secondary: {
    main: '#9AA5B1',      // Industrial silver for secondary elements (Secondary Structure)
    light: '#CBD5E0',     // Lighter industrial silver
    dark: '#4A5568',      // Gunmetal gray for headers and framework (Primary Structure)
    contrastText: '#1A202C', // Deep charcoal for contrast
  },
  border: {
    light: 'rgba(203, 213, 224, 0.8)', // Light industrial silver border
    dark: 'rgba(154, 165, 177, 0.8)',  // Medium industrial silver border
    card: '#E2E8F0',      // Light border for card definition
  },
  status: {
    success: '#38A169',   // Forest green with subtle metallic quality (Operational/Success)
    warning: '#D69E2E',   // Amber with hazard-pattern undertone (Warning)
    error: '#E53E3E',     // Signal red with high visibility (Critical/Error)
    info: '#3182CE',      // Tactical blue for information
    inactive: '#718096',  // Neutral gray with matte finish (Inactive)
  },
  action: {
    active: '#1A202C',    // Deep charcoal for active elements
    hover: 'rgba(0, 0, 0, 0.08)', // Slightly darker for hover effects
    selected: 'rgba(49, 130, 206, 0.12)', // Light blue tint for selected items
    disabled: 'rgba(154, 165, 177, 0.4)', // Industrial silver with medium opacity
    disabledBackground: 'rgba(203, 213, 224, 0.24)', // Light industrial silver with low opacity
  },
} as const;

// For backward compatibility
export const colors = darkColors;

export type ColorPalette = typeof darkColors;

// Function to get colors based on mode
export const getColors = (mode: 'light' | 'dark') => {
  return mode === 'light' ? lightColors : darkColors;
};
