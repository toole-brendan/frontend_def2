import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ProfileHeaderProps {
  name: string;
  rank: string;
  profilePicture?: string;
  onPictureChange: (file: File) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  rank,
  profilePicture,
  onPictureChange,
}) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPictureChange(file);
      setUploadDialogOpen(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        mb: 4,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={profilePicture}
          alt={`${rank} ${name}`}
          sx={{
            width: 120,
            height: 120,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        />
        <Tooltip title="Change Profile Picture">
          <IconButton
            size="small"
            onClick={() => setUploadDialogOpen(true)}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom>
          {rank} {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your profile information
        </Typography>
      </Box>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              mt: 2,
              p: 3,
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="profile-picture-upload"
            />
            <label htmlFor="profile-picture-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                Upload New Picture
              </Button>
            </label>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Recommended: A professional photo in uniform
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileHeader; 