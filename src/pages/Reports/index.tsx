import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Reports & Documentation
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Component Under Development
          </Typography>
          <Typography variant="body1">
            The Reports & Documentation module is currently being developed. This section will provide tools for generating standard Army forms, command reports, FLIPL documents, and accessing the document archive.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Reports;
