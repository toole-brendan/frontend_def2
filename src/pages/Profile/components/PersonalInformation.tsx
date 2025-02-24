import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface PersonalInformationProps {
  dodId: string;
  branch: string;
  unit: string;
  dutyPosition: string;
  mos: string;
  email: string;
  phone: string;
  onContactInfoUpdate: (email: string, phone: string) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  dodId,
  branch,
  unit,
  dutyPosition,
  mos,
  email,
  phone,
  onContactInfoUpdate,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(phone);

  const handleSubmit = () => {
    onContactInfoUpdate(editEmail, editPhone);
    setEditDialogOpen(false);
  };

  const InfoRow = ({ label, value, tooltip }: { label: string; value: string; tooltip?: string }) => (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip}>
              <IconButton size="small">
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card>
      <CardHeader
        title="Personal Information"
        action={
          <Button
            startIcon={<EditIcon />}
            onClick={() => setEditDialogOpen(true)}
          >
            Edit Contact Info
          </Button>
        }
      />
      <CardContent>
        <InfoRow
          label="DoD ID"
          value={dodId}
          tooltip="Your Department of Defense Identification Number"
        />
        <InfoRow
          label="Branch"
          value={branch}
        />
        <InfoRow
          label="Unit"
          value={unit}
        />
        <InfoRow
          label="Duty Position"
          value={dutyPosition}
          tooltip="Your current assigned position within your unit"
        />
        <InfoRow
          label="MOS/Specialty Code"
          value={mos}
          tooltip="Your Military Occupational Specialty (MOS) defines your job role within the military"
        />
        <InfoRow
          label="Email"
          value={email}
        />
        <InfoRow
          label="Phone"
          value={phone}
        />

        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
          For changes to rank, unit, or other personal details, please contact your unit administrator.
        </Typography>
      </CardContent>

      {/* Edit Contact Info Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Contact Information</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              type="email"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PersonalInformation; 