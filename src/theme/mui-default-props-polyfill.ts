// This file provides a polyfill for the DefaultPropsProvider functionality that is missing
// but expected by @mui/lab components

export const useDefaultProps = (props: any) => {
  // This is a simplified version that just returns the provided props
  // The actual implementation in MUI does more, but this is enough to prevent build errors
  return props;
};

// Other exports that might be needed by MUI components
// No additional exports required at this time 
