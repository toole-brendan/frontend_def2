import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { User, RANKS, ROLES, STATUSES } from '../types';

interface AddEditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

interface FormData extends Partial<User> {
  password?: string;
}

export const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  open,
  onClose,
  user
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    rank: '',
    role: 'soldier',
    unit: '',
    email: '',
    status: 'Active',
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        rank: user.rank,
        role: user.role,
        unit: user.unit,
        email: user.email,
        status: user.status,
      });
    } else {
      setFormData({
        name: '',
        rank: '',
        role: 'soldier',
        unit: '',
        email: '',
        status: 'Active',
      });
      // Generate random password for new users
      const randomPassword = Math.random().toString(36).slice(-8);
      setGeneratedPassword(randomPassword);
    }
  }, [user]);

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.rank) {
      newErrors.rank = 'Rank is required';
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    if (!formData.unit) {
      newErrors.unit = 'Unit is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Implement user creation/update with blockchain
      console.log('Saving user:', {
        ...formData,
        ...(user ? {} : { password: generatedPassword }),
      });
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            select
            label="Rank"
            value={formData.rank}
            onChange={handleChange('rank')}
            error={!!errors.rank}
            helperText={errors.rank}
            fullWidth
          >
            {RANKS.map((rank) => (
              <MenuItem key={rank} value={rank}>
                {rank}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Role"
            value={formData.role}
            onChange={handleChange('role')}
            error={!!errors.role}
            helperText={errors.role}
            fullWidth
          >
            {ROLES.map((role) => (
              <MenuItem key={role} value={role}>
                {role.replace('_', ' ').toUpperCase()}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Unit"
            value={formData.unit}
            onChange={handleChange('unit')}
            error={!!errors.unit}
            helperText={errors.unit}
            fullWidth
          />

          <TextField
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />

          {!user && (
            <Box>
              <Typography variant="subtitle2">
                Generated Password
              </Typography>
              <TextField
                value={generatedPassword}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleCopyPassword}
                        edge="end"
                        size="small"
                      >
                        <CopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                size="small"
              />
              <Typography variant="caption">
                Please copy and securely share this password with the user
              </Typography>
            </Box>
          )}

          {user && (
            <TextField
              select
              label="Status"
              value={formData.status}
              onChange={handleChange('status')}
              fullWidth
            >
              {STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {user ? 'Save Changes' : 'Create User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 