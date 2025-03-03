/**
 * HandReceipt Defense UI Color System
 * A specialized military-industrial color system optimized for tactical operations
 */

// Define interfaces for our color tokens
interface ColorToken {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

interface BackgroundToken {
  default: string;
  paper: string;
  elevated: string;
  control: string;
  dark: string;    // Added for compatibility
  light: string;   // Added for compatibility
}

interface TextToken {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  inactive: string; // Added for compatibility
}

interface StatusToken {
  success: string;
  warning: string;
  error: string;
  info: string;
  inactive: string;
}

interface BorderToken {
  light: string;
  medium: string;
  dark: string;
  card: string;   // Added for compatibility
}

interface ColorTokens {
  primary: ColorToken;
  secondary: ColorToken;
  background: BackgroundToken;
  text: TextToken;
  status: StatusToken;
  border: BorderToken;
  success: ColorToken;   // Added for success color palette
}

interface StatusColorTokens {
  operational: string;
  limited: string;
  deadlined: string;
  admin: string;
}

// Dark Mode - Primary Theme for Military Operations
export const darkColorTokens: ColorTokens = {
  // Core colors
  primary: {
    main: '#4A6D8C',         // Subdued navy/steel blue
    light: '#627D95',
    dark: '#365172',
    contrastText: '#FFFFFF', // Pure white for maximum contrast
  },
  secondary: {
    main: '#4B5563',         // Industrial gray for secondary elements
    light: '#6B7280',
    dark: '#374151',
    contrastText: '#FFFFFF', // Pure white for maximum contrast
  },
  
  // Background spectrum
  background: {
    default: '#000000',      // Pure black foundation
    paper: '#101010',        // Very dark gray for cards/surfaces
    elevated: '#151515',     // Dark gray for elevated components
    control: '#1A1A1A',      // Slightly lighter gray for inputs
    dark: '#050505',         // For compatibility
    light: '#151515',        // For compatibility
  },
  
  // Text hierarchy
  text: {
    primary: '#FFFFFF',      // Pure white for primary text
    secondary: '#AAAAAA',    // Light gray for supporting information
    disabled: '#666666',     // Medium gray for disabled text
    hint: '#888888',         // Light gray for hints
    inactive: '#444444',     // Dark gray for inactive text
  },
  
  // Status indicators
  status: {
    success: '#3A5F41',      // Faded hunter green - mission ready
    warning: '#F59E0B',      // Vibrant amber - caution
    error: '#EF4444',        // Bright red - alert
    info: '#4A6D8C',         // Subdued navy/steel blue - informational
    inactive: '#6B7280',     // Medium gray - inactive
  },
  success: {
    main: '#3A5F41',         // Faded hunter green - mission ready
    light: '#4A6B50',        // Lighter faded hunter green for backgrounds
    dark: '#2A4532',         // Darker faded hunter green for emphasis
    contrastText: '#FFFFFF', // White text for contrast on success colors
  },
  
  // Borders and dividers
  border: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(255, 255, 255, 0.15)',
    card: 'rgba(255, 255, 255, 0.08)', // For compatibility
  },
};

// Light Mode - Alternative Theme for Office/Garrison Use
export const lightColorTokens: ColorTokens = {
  // Core colors
  primary: {
    main: '#406385',         // Subdued navy/steel blue for light mode
    light: '#5A7A99',
    dark: '#2C4A6B',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4B5563',         // Industrial gray for secondary elements
    light: '#6B7280',
    dark: '#374151',
    contrastText: '#FFFFFF',
  },
  
  // Background spectrum
  background: {
    default: '#FAFAFA',      // Pure white tactical background
    paper: '#FFFFFF',        // White for cards/surfaces
    elevated: '#FFFFFF',     // White for elevated components
    control: 'rgba(0, 0, 0, 0.03)', // Very subtle gray for inputs
    dark: '#E2E8F0',         // For compatibility
    light: '#FFFFFF',        // For compatibility
  },
  
  // Text hierarchy
  text: {
    primary: '#101114',      // Deep charcoal for primary text
    secondary: '#2D3748',    // Dark slate for supporting information
    disabled: '#94A3B8',     // Medium gray for disabled text
    hint: '#64748B',         // Darker slate for hints
    inactive: '#64748B',     // Medium-dark gray for inactive
  },
  
  // Status indicators
  status: {
    success: '#2F855A',      // Forest green - mission ready
    warning: '#C05621',      // Deep amber - caution
    error: '#C53030',        // Deep red - alert
    info: '#406385',         // Subdued navy/steel blue - informational
    inactive: '#4A5568',     // Dark gray - inactive
  },
  
  // Success color palette
  success: {
    main: '#2F6246',         // Faded hunter green - mission ready
    light: '#446B55',        // Lighter faded hunter green for backgrounds
    dark: '#224234',         // Darker faded hunter green for emphasis
    contrastText: '#FFFFFF', // White text for contrast on success colors
  },
  
  // Borders and dividers
  border: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.15)',
    card: 'rgba(0, 0, 0, 0.08)', // For compatibility
  },
};

// Special status color tokens for both modes
export const statusColorTokens: StatusColorTokens = {
  operational: '#3A5F41',    // Fully mission capable (FMC) - faded hunter green
  limited: '#F59E0B',        // Partially mission capable (PMC)
  deadlined: '#EF4444',      // Not mission capable (NMC)
  admin: '#6B7280',          // Administrative status
};
