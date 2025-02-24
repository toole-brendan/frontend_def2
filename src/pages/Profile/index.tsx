import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import {
  Security as SecurityIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Build as BuildIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import ProfileHeader from './components/ProfileHeader';
import PersonalInformation from './components/PersonalInformation';
import AccountSettings from './components/AccountSettings';
import RolesAndPermissions from './components/RolesAndPermissions';
import CertificationsAndTraining from './components/CertificationsAndTraining';
import ChainOfCommand from './components/ChainOfCommand';

// Mock data - In a real app, this would come from your backend
const mockUserData = {
  name: 'John Doe',
  rank: 'CPT',
  profilePicture: undefined,
  dodId: '1234567890',
  branch: 'Army',
  unit: 'C CO, 2-506 IN, 3BCT, 101st ABN DIV (AASLT)',
  dutyPosition: 'Company Commander',
  mos: '11A',
  email: 'john.doe@army.mil',
  phone: '(555) 123-4567',
  is2FAEnabled: true,
  roles: [
    {
      id: '1',
      name: 'Officer',
      description: 'Full access to all features and approval authority',
      permissions: [
        {
          id: '1',
          name: 'Administrator',
          description: 'Full system access and control',
          icon: <SecurityIcon />,
        },
        {
          id: '2',
          name: 'Inventory Manager',
          description: 'Manage unit inventory and equipment',
          icon: <InventoryIcon />,
        },
      ],
    },
    {
      id: '2',
      name: 'Maintenance Supervisor',
      description: 'Oversee maintenance operations and schedules',
      permissions: [
        {
          id: '3',
          name: 'Maintenance Manager',
          description: 'Oversee maintenance operations',
          icon: <BuildIcon />,
        },
        {
          id: '4',
          name: 'Team Supervisor',
          description: 'Manage team members and assignments',
          icon: <SupervisorAccountIcon />,
        },
      ],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'Ranger Qualified',
      issueDate: '2022-08-15',
      expirationDate: '9999-12-31', // Never expires
      status: 'Active' as const,
      description: 'U.S. Army Ranger School Graduate',
    },
    {
      id: '2',
      name: 'Unit Movement Officer (UMO)',
      issueDate: '2023-03-10',
      expirationDate: '2025-03-10',
      status: 'Active' as const,
      description: 'Certified to plan and execute unit deployments',
    },
  ],
  chainOfCommand: {
    supervisor: {
      id: '1',
      name: 'James Anderson',
      rank: 'MAJ',
      position: 'Battalion Commander',
    },
    subordinates: [
      {
        id: '2',
        name: 'Michael Johnson',
        rank: '1LT',
        position: '1st Platoon Leader',
      },
      {
        id: '3',
        name: 'Thomas Wilson',
        rank: '1LT',
        position: '2nd Platoon Leader',
      },
      {
        id: '4',
        name: 'Robert Davis',
        rank: '1LT',
        position: '3rd Platoon Leader',
      },
    ],
  },
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState(mockUserData);

  const handlePictureChange = (file: File) => {
    // Handle profile picture update
    console.log('Updating profile picture:', file);
  };

  const handleContactInfoUpdate = (email: string, phone: string) => {
    setUserData((prev) => ({
      ...prev,
      email,
      phone,
    }));
  };

  const handlePasswordChange = () => {
    // TODO: Implement password change logic
    console.log('Password change requested');
  };

  const handleToggle2FA = (enabled: boolean) => {
    setUserData((prev) => ({
      ...prev,
      is2FAEnabled: enabled,
    }));
  };

  const handleNotificationPreferencesChange = (preferences: any) => {
    // Handle notification preferences update
    console.log('Updating notification preferences:', preferences);
  };

  return (
    <Box sx={{ p: 3 }}>
      <ProfileHeader
        name={userData.name}
        rank={userData.rank}
        profilePicture={userData.profilePicture}
        onPictureChange={handlePictureChange}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <PersonalInformation
              dodId={userData.dodId}
              branch={userData.branch}
              unit={userData.unit}
              dutyPosition={userData.dutyPosition}
              mos={userData.mos}
              email={userData.email}
              phone={userData.phone}
              onContactInfoUpdate={handleContactInfoUpdate}
            />
            <RolesAndPermissions roles={userData.roles} />
            <CertificationsAndTraining certifications={userData.certifications} />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <AccountSettings
              is2FAEnabled={userData.is2FAEnabled}
              onPasswordChange={handlePasswordChange}
              onToggle2FA={handleToggle2FA}
              onNotificationPreferencesChange={handleNotificationPreferencesChange}
            />
            <ChainOfCommand
              supervisor={userData.chainOfCommand.supervisor}
              subordinates={userData.chainOfCommand.subordinates}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 