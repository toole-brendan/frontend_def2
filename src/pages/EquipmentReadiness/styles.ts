import { alpha, Theme } from '@mui/material';
import {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  chipSx,
  // @ts-ignore - Unused variable intentionally kept
  statusFMCSx,
  // @ts-ignore - Unused variable intentionally kept
  statusPMCSx,
  // @ts-ignore - Unused variable intentionally kept
  statusNMCSx,
  // @ts-ignore - Unused variable intentionally kept
  statusAdminSx
} from '../../theme/patterns';

// Export common patterns for reuse
export {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  chipSx
};

// Equipment readiness specific styles

// Ready icon container
export const readyIconContainerSx = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 28,
  width: 28,
  borderRadius: '50%',
  bgcolor: alpha(theme.semantic.status.success, 0.1),
  color: theme.semantic.status.success,
});

// Not ready icon container
export const notReadyIconContainerSx = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 28,
  width: 28,
  borderRadius: '50%',
  bgcolor: alpha(theme.semantic.status.error, 0.1),
  color: theme.semantic.status.error,
});

// Readiness status chips

// Readiness statistic box
export const readinessStatBoxSx = (theme: Theme) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  p: 2,
  bgcolor: alpha(theme.palette.primary.main, 0.05),
  borderRadius: 0
});
