import { Theme } from '@mui/material/styles';
import { createButtonStyles } from './button';
import { createCardStyles } from './card';
import { createPaperStyles } from './paper';
import { createAppBarStyles } from './appBar';
import { createDrawerStyles } from './drawer';
import { createTableStyles } from './table';
import { createChipStyles } from './chip';
import { createAvatarStyles } from './avatar';
import { createLinearProgressStyles } from './linearProgress';
import { createIconButtonStyles } from './iconButton';
import { createCssBaselineStyles } from './cssBaseline';
import { createDividerStyles } from './divider';

/**
 * Creates component overrides for the theme based on our tokens and patterns
 * @param theme MUI Theme object
 * @returns Component style overrides
 */
export const createComponentStyles = (theme: Theme) => {
  return {
    ...createButtonStyles(theme),
    ...createCardStyles(theme),
    ...createPaperStyles(theme),
    ...createAppBarStyles(theme),
    ...createDrawerStyles(theme),
    ...createTableStyles(theme),
    ...createChipStyles(theme),
    ...createAvatarStyles(theme),
    ...createLinearProgressStyles(theme),
    ...createIconButtonStyles(theme),
    ...createCssBaselineStyles(theme),
    ...createDividerStyles(theme),
  };
};

export default createComponentStyles;
