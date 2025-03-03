import { alpha, Theme } from '@mui/material';
import {
  paperSx,
  cardWithCornerSx,
  sectionHeaderSx,
  buttonSx,
  chipSx,
  statusFMCSx,
  statusPMCSx,
  statusNMCSx,
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
export const fmcChipSx = statusFMCSx;
export const pmcChipSx = statusPMCSx;
export const nmcChipSx = statusNMCSx;
export const adminChipSx = statusAdminSx;

// Readiness statistic box
export const readinessStatBoxSx = (theme: Theme) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  p: 2,
  bgcolor: alpha(theme.palette.primary.main, 0.05),
  borderRadius: 0
});
