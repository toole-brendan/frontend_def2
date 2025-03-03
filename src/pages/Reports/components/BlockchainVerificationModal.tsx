import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Report } from '../types';

interface BlockchainVerificationModalProps {
  open: boolean;
  onClose: () => void;
  report: Report;
}

const BlockchainVerificationModal: React.FC<BlockchainVerificationModalProps> = ({
  open,
  onClose,
  report
}) => {
  const theme = useTheme();
  const [verifying, setVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  
  const handleVerify = () => {
    setVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2000);
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Blockchain Verification
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            Report: {report.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {report.id}
          </Typography>
        </Box>
        
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Verification Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
            {verifying && <CircularProgress size={60} />}
            {verified && (
              <Box sx={{ textAlign: 'center' }}>
                <VerifiedIcon sx={{ fontSize: 60, color: 'success.main', mb: 1 }} />
                <Typography variant="h6" color="success.main">
                  Report Verified on Blockchain
                </Typography>
              </Box>
            )}
            {!verifying && !verified && (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleVerify}
              >
                Verify Report Integrity
              </Button>
            )}
          </Box>
        </Paper>
        
        {verified && (
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Blockchain Record Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Transaction Hash" 
                  secondary="0x3f7e8a2c5b0e1d4f6c9d8a7b6e5f4d3c2b1a0e9d8c7b6a5f4e3d2c1b0a9f8e7d6" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Block Number" 
                  secondary="15,234,567" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Timestamp" 
                  secondary="2023-11-15 14:23:45 UTC" 
                />
              </ListItem>
            </List>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockchainVerificationModal; 