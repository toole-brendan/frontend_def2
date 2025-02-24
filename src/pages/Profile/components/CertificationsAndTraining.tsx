import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
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
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WarningIcon from '@mui/icons-material/Warning';

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
    <Card>
      <CardHeader
        title="Certifications and Training"
        action={
          <Tooltip title="Your certifications may affect your permissions in the system">
            <IconButton size="small">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        {hasExpiredCertifications && (
          <Alert
            severity="warning"
            icon={<WarningIcon />}
            sx={{ mb: 3 }}
          >
            You have expired certifications that may affect your system permissions
          </Alert>
        )}

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Certification</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Expiration Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {cert.name}
                      </Typography>
                      {cert.description && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {cert.description}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(cert.issueDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(cert.expirationDate)}
                    </Typography>
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
      </CardContent>
    </Card>
  );
};

export default CertificationsAndTraining; 