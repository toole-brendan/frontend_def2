import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  styled,
  Stack,
  Chip,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CreateIcon from '@mui/icons-material/Create';
import VerifiedIcon from '@mui/icons-material/Verified';
import { PropertyItem } from '../../../types/property';

interface DAForm2062PreviewPanelProps {
  handReceiptNumber?: string;
  fromPerson?: string;
  toPerson?: string;
  items?: PropertyItem[];
}

const FormContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  '&::after': {
    content: '"DIGITAL RECORD - VALID ELECTRONIC SIGNATURE ON FILE"',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.1)',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  }
}));

const FormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(2),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}));

const FormField = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(1),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  minWidth: '150px',
}));

const FormValue = styled(Typography)(({ theme }) => ({
  flex: 1,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
}));

const SignatureBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
  position: 'relative',
}));

const DAForm2062PreviewPanel: React.FC<DAForm2062PreviewPanelProps> = ({
  handReceiptNumber = '287IN-B-01-2025',
  fromPerson = 'CPT Rodriguez (CO, B/2-87 IN)',
  toPerson = '1LT Morgan (PL, 1st PLT, B/2-87 IN)',
  items = []
}) => {
  // Mock data for the form
  const mockItems = [
    {
      id: '1',
      stockNumber: '1005-01-567-7901',
      serialNumber: '12496352',
      description: 'Rifle, 5.56mm, M4',
      publication: 'TM 9-1005-319-10',
      price: '1,289.00',
      quantity: 1,
    },
    {
      id: '2',
      stockNumber: '1005-01-663-1986',
      serialNumber: '12937',
      description: 'Machine Gun, 5.56mm, M249LW',
      publication: 'TM 9-1005-201-10',
      price: '4,125.00',
      quantity: 1,
    },
    {
      id: '3',
      stockNumber: '5855-01-534-1822',
      serialNumber: '23457',
      description: 'Night Vision Goggles, AN/PVS-14',
      publication: 'TM 11-5855-306-10',
      price: '3,600.00',
      quantity: 2,
    },
    {
      id: '4',
      stockNumber: '2320-01-371-9577',
      serialNumber: '987654',
      description: 'HMMWV, M1151A1',
      publication: 'TM 9-2320-387-10',
      price: '220,000.00',
      quantity: 1,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        DA Form 2062 Preview Panel
      </Typography>
      
      <FormContainer>
        <FormHeader>
          <Box>
            <FormTitle variant="h6">DEPARTMENT OF THE ARMY</FormTitle>
            <FormTitle variant="h5">HAND RECEIPT</FormTitle>
            <Typography variant="body2" align="center">For use of this form, see DA PAM 710-2-1. The proponent agency is ODCSLOG.</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">FORM DA 2062</Typography>
            <Typography variant="body2">DIGITAL VERSION 2.1</Typography>
          </Box>
        </FormHeader>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormField>
              <FormLabel variant="body2">FROM:</FormLabel>
              <FormValue variant="body2">{fromPerson}</FormValue>
            </FormField>
            <FormField>
              <FormLabel variant="body2">HAND RECEIPT NUMBER:</FormLabel>
              <FormValue variant="body2">{handReceiptNumber}</FormValue>
            </FormField>
            <FormField>
              <FormLabel variant="body2">END ITEM DESCRIPTION:</FormLabel>
              <FormValue variant="body2">COMPANY EQUIPMENT</FormValue>
            </FormField>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField>
              <FormLabel variant="body2">TO:</FormLabel>
              <FormValue variant="body2">{toPerson}</FormValue>
            </FormField>
            <FormField>
              <FormLabel variant="body2">PERIOD COVERED:</FormLabel>
              <FormValue variant="body2">FROM: 18JAN2025 TO: 18APR2025</FormValue>
            </FormField>
            <FormField>
              <FormLabel variant="body2">PUBLICATION NUMBER:</FormLabel>
              <FormValue variant="body2">MTOE FY25</FormValue>
            </FormField>
          </Grid>
        </Grid>

        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>STOCK NUMBER</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>ITEM DESCRIPTION</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>SEC</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>UI</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>QTY AUTH</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>QTY ON HAND</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>SERIAL NUMBER</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.stockNumber}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="center">{item.id === '3' ? 'SEC' : ''}</TableCell>
                  <TableCell align="center">EA</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.serialNumber}</TableCell>
                </TableRow>
              ))}
              {/* Empty rows for form appearance */}
              {[...Array(3)].map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell align="center"></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>RECEIVER'S SIGNATURE</Typography>
            <SignatureBox>
              <Stack direction="row" spacing={1} alignItems="center">
                <VerifiedIcon color="success" />
                <Typography variant="body2">
                  Digitally signed by 1LT Morgan on 18JAN2025
                </Typography>
              </Stack>
            </SignatureBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>ISSUER'S SIGNATURE</Typography>
            <SignatureBox>
              <Stack direction="row" spacing={1} alignItems="center">
                <VerifiedIcon color="success" />
                <Typography variant="body2">
                  Digitally signed by CPT Rodriguez on 18JAN2025
                </Typography>
              </Stack>
            </SignatureBox>
          </Grid>
        </Grid>
      </FormContainer>

      <Typography variant="h6" gutterBottom>
        Form Actions
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<PrintIcon />}
            color="primary"
          >
            Print Official DA 2062
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<EmailIcon />}
          >
            Email to Hand Receipt Holder
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<PictureAsPdfIcon />}
          >
            Export to PDF
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<ListAltIcon />}
          >
            Generate Component List Annex
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<VerifiedUserIcon />}
          >
            Update Digital Signature
          </ActionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActionButton
            variant="outlined"
            fullWidth
            startIcon={<CreateIcon />}
          >
            Record Manual Signature
          </ActionButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DAForm2062PreviewPanel; 