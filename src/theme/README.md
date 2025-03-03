# Design System - Typography Standardization

This document outlines the standardized approach to typography in our application, particularly for component titles and headings.

## Typography Styles

We've implemented consistent typography styling through the `titleTypographySx` function in `patterns.ts`. This provides a unified approach to styling titles throughout the application.

### Title Typography Function

```typescript
titleTypographySx(theme, variant, withUnderline)
```

Parameters:
- `theme`: The Material-UI theme object
- `variant`: Size variant ('large', 'medium', 'small')
- `withUnderline`: Whether to add an underline accent (boolean)

### Usage Examples

```tsx
// In a component:
import { titleTypographySx } from '../../theme/patterns';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Typography sx={titleTypographySx(theme, 'medium', true)}>
      Component Title
    </Typography>
  );
};
```

## Standardized Components

For consistency, we've created reusable header components:

### SectionHeader

A versatile component for section titles with consistent styling:

```tsx
import { SectionHeader } from '../../components/common';

// Basic usage
<SectionHeader title="Section Title" />

// With description and action
<SectionHeader 
  title="Section Title" 
  description="Section description text"
  action={<Button>Action</Button>}
  variant="large"
  withUnderline={true}
/>
```

### CardHeader

A standardized card header with title and optional subtitle:

```tsx
import { CardHeader } from '../../components/common';

<CardHeader 
  title="Card Title" 
  subtitle="Optional subtitle or description"
  action={<IconButton><MoreVertIcon /></IconButton>}
/>
```

## Typography Variants

We use the following variants for different heading levels:

- `large`: For page titles and major section headings (h4 equivalent)
- `medium`: For card titles and section headings (h6 equivalent)
- `small`: For subsection titles (subtitle1 equivalent)

## Style Properties

Our standardized typography includes these key properties:

- Consistent font weights (600 for headings, 500 for smaller titles)
- Standardized letter spacing (0.01em)
- Uniform margins and padding
- Optional underline accent for visual hierarchy

## Best Practices

- Use the SectionHeader component for consistent section titles
- Use CardHeader for all card headers
- For custom typography, use the titleTypographySx function
- Maintain the visual hierarchy with appropriate variant sizes 