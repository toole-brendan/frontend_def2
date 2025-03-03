import { 
  User, 
  SystemStatus, 
  PerformanceMetrics, 
  SecurityStatus, 
  ClassificationHandling,
  ExternalSystem,
  DataExchangeMetrics,
  BlockchainVerification,
  DocumentSecurity,
  PerformanceSettings,
  DeviceStatus,
  SecurityPolicy,
  RegulationStatus,
  MaintenanceOperation,
  PerformanceMetric
} from './types';

export const mockUsers: User[] = [
  {
    username: 'm.rodriguez',
    rank: 'CPT',
    fullName: 'Michael Rodriguez',
    role: 'Commander',
    unitPosition: 'Company Commander',
    status: 'Active',
    lastActive: 'Now',
    cacStatus: 'Valid (2027)'
  },
  {
    username: 's.martinez',
    rank: '1SG',
    fullName: 'Samuel Martinez',
    role: 'Manager',
    unitPosition: 'First Sergeant',
    status: 'Active',
    lastActive: '1hr ago',
    cacStatus: 'Valid (2026)'
  },
  {
    username: 'j.morgan',
    rank: '1LT',
    fullName: 'Jennifer Morgan',
    role: 'Standard',
    unitPosition: '1st Platoon Leader',
    status: 'Active',
    lastActive: '3hrs ago',
    cacStatus: 'Valid (2026)'
  },
  {
    username: 'd.wilson',
    rank: 'SSG',
    fullName: 'David Wilson',
    role: 'Standard',
    unitPosition: 'Supply Sergeant',
    status: 'Active',
    lastActive: '2hrs ago',
    cacStatus: 'Valid (2025)'
  }
];

export const mockSystemStatus: SystemStatus = {
  overall: '99.9% uptime (30 days)',
  database: 'Operational',
  api: 'Operational',
  externalConnections: '4/4 Active',
  blockchain: 'Operational'
};

export const mockPerformanceMetrics: PerformanceMetrics = {
  responseTime: '1.2s avg',
  databaseSync: '25FEB2025 0842',
  mobileSync: '37/37 devices',
  storage: '42% (217GB/512GB)'
};

export const mockSecurityStatus: SecurityStatus = {
  cacAuthentication: 'Enforced',
  passwordPolicy: 'DOD Compliant',
  lastSecurityScan: '24FEB2025',
  failedLoginAttempts: '3 (Last 24hrs)',
  openSecurityTickets: '0'
};

export const mockClassificationHandling: ClassificationHandling = {
  dataClassification: 'FOUO',
  classificationControls: 'Active',
  piiProtection: 'Enforced',
  documentMarking: 'Automated'
};

export const mockExternalSystems: ExternalSystem[] = [
  { name: 'GCSS-Army', status: 'Connected' },
  { name: 'PBUSE', status: 'Connected' },
  { name: 'SAMS-E', status: 'Connected' },
  { name: 'Military CAC System', status: 'Connected' }
];

export const mockDataExchangeMetrics: DataExchangeMetrics = {
  inboundTransactions: '217 (Last 24hrs)',
  outboundTransactions: '143 (Last 24hrs)',
  syncSuccessRate: '99.7%',
  dataValidation: '100%'
};

export const mockBlockchainVerification: BlockchainVerification = {
  network: 'Military Secured',
  verificationLevel: 'High',
  smartContracts: 'Enabled'
};

export const mockDocumentSecurity: DocumentSecurity = {
  verificationDepth: 'All Transactions',
  signatureAuthority: 'Command-Based'
};

export const mockPerformanceSettings: PerformanceSettings = {
  syncFrequency: 'Real-time',
  offlineOperation: 'Enabled (72hrs)'
};

export const mockDeviceStatus: DeviceStatus = {
  registeredDevices: 37,
  iosCount: 22,
  androidCount: 15,
  lastSyncStatus: '37/37 Current',
  offlineModeUsers: 5
};

export const mockSecurityPolicy: SecurityPolicy = {
  biometricAuth: 'Enforced',
  remoteWipe: 'Enabled',
  dataEncryption: 'AES-256'
};

export const mockRegulationStatuses: RegulationStatus[] = [
  { name: 'AR 25-2 (Info. Assurance)', status: 'Compliant' },
  { name: 'AR 380-5 (Info. Security)', status: 'Compliant' },
  { name: 'AR 25-400-2 (Records)', status: 'Compliant' },
  { name: 'AR 710-2 (Supply Policy)', status: 'Compliant' },
  { name: 'AR 735-5 (Property Accountability)', status: 'Review' }
];

export const mockMaintenanceOperations: MaintenanceOperation[] = [
  { name: 'Database Optimization', lastExecuted: '23FEB2025', status: 'Complete' },
  { name: 'Cache Management', lastExecuted: '24FEB2025', status: 'Complete' },
  { name: 'System Update', lastExecuted: '23FEB2025', status: 'Current' },
  { name: 'Log Rotation', lastExecuted: 'Auto', status: 'Daily' }
];

export const mockSystemMetrics: PerformanceMetric[] = [
  { name: 'CPU Usage', value: 32, color: 'success' },
  { name: 'Memory', value: 58, color: 'warning' },
  { name: 'Storage', value: 42, color: 'success' },
  { name: 'Network', value: 27, color: 'success' }
];
