import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Alert,
  Box,
  Tooltip,
  IconButton,
  styled,
  Paper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WarningIcon from '@mui/icons-material/Warning';

const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expirationDate: string;
  status: 'Active' | 'Expired' | 'Pending';
  description?: string;
}

interface CertificationsAndTrainingProps {
  certifications: Certification[];
}

const CertificationsAndTraining: React.FC<CertificationsAndTrainingProps> = ({
  certifications,
}) => {
  const hasExpiredCertifications = certifications.some(
    (cert) => cert.status === 'Expired'
  );

  const getStatusColor = (status: Certification['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DashboardCard>
      <Box className="card-header">
        <Typography variant="h6">CERTIFICATIONS & TRAINING</Typography>
        <Tooltip title="Your certifications may affect your permissions in the system">
          <IconButton size="small">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Box className="card-content">
        {hasExpiredCertifications && (
          <Alert
            severity="warning"
            icon={<WarningIcon />}
            sx={{ mb: 2 }}
          >
            You have expired certifications that require renewal
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certification</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Expiration</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {cert.name}
                    </Typography>
                    {cert.description && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        {cert.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(cert.issueDate)}</TableCell>
                  <TableCell>
                    {cert.expirationDate === '9999-12-31'
                      ? 'Never'
                      : formatDate(cert.expirationDate)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cert.status}
                      size="small"
                      color={getStatusColor(cert.status)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mt: 3,
            pt: 2,
            borderTop: '1px dashed',
            borderColor: 'divider',
          }}
        >
          Contact your training officer for certification renewals or updates.
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default CertificationsAndTraining; 