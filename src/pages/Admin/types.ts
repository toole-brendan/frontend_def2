export interface User {
  username: string;
  rank: string;
  fullName: string;
  role: 'Commander' | 'Manager' | 'Standard' | 'Admin';
  unitPosition: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  cacStatus: string;
}

export interface SystemStatus {
  overall: string;
  database: string;
  api: string;
  externalConnections: string;
  blockchain: string;
}

export interface PerformanceMetrics {
  responseTime: string;
  databaseSync: string;
  mobileSync: string;
  storage: string;
}

export interface SecurityStatus {
  cacAuthentication: string;
  passwordPolicy: string;
  lastSecurityScan: string;
  failedLoginAttempts: string;
  openSecurityTickets: string;
}

export interface ClassificationHandling {
  dataClassification: string;
  classificationControls: string;
  piiProtection: string;
  documentMarking: string;
}

export interface ExternalSystem {
  name: string;
  status: 'Connected' | 'Disconnected' | 'Degraded';
}

export interface DataExchangeMetrics {
  inboundTransactions: string;
  outboundTransactions: string;
  syncSuccessRate: string;
  dataValidation: string;
}

export interface BlockchainVerification {
  network: string;
  verificationLevel: string;
  smartContracts: string;
}

export interface DocumentSecurity {
  verificationDepth: string;
  signatureAuthority: string;
}

export interface PerformanceSettings {
  syncFrequency: string;
  offlineOperation: string;
}

export interface DeviceStatus {
  registeredDevices: number;
  iosCount: number;
  androidCount: number;
  lastSyncStatus: string;
  offlineModeUsers: number;
}

export interface SecurityPolicy {
  biometricAuth: string;
  remoteWipe: string;
  dataEncryption: string;
}

export interface RegulationStatus {
  name: string;
  status: 'Compliant' | 'Review' | 'Non-Compliant';
}

export interface MaintenanceOperation {
  name: string;
  lastExecuted: string;
  status: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  color: 'success' | 'warning' | 'error';
}
