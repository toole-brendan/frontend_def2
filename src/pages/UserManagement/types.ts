export type Role = 'officer' | 'nco' | 'supply_sergeant' | 'soldier';

export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: string;
  name: string;
  rank: string;
  unit: string;
  role: Role;
  email: string;
  status: UserStatus;
  lastActive: string;
  blockchainHash?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
  blockchainHash: string;
}

export const RANKS = ['LT', 'CPT', 'MAJ', 'SGT', 'SSG', 'SFC', 'MSG', 'PVT', 'SPC'];
export const ROLES: Role[] = ['officer', 'nco', 'supply_sergeant', 'soldier'];
export const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Pending']; 