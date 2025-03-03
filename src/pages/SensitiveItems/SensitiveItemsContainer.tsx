import React, { useState } from 'react';

// Import all component files
import ArmsRoomStatusCard from './components/ArmsRoomStatusCard';
import VerificationStatusCard from './components/VerificationStatusCard';
import MissingItemResponseCard from './components/MissingItemResponseCard';
import HandReceiptAssignmentCard from './components/HandReceiptAssignmentCard';
import SensitiveItemActivityLog from './components/SensitiveItemActivityLog';
import ItemDetailPanel from './components/ItemDetailPanel';
import InventoryExecutionPanel from './components/InventoryExecutionPanel';
import SensitiveItemsHeader from './components/SensitiveItemsHeader';
import SensitiveItemCategoriesCard from './components/SensitiveItemCategoriesCard';
import InventoryScheduleCard from './components/InventoryScheduleCard';

// Mock data interfaces
interface SensitiveItem {
  id: string;
  category: string;
  nomenclature: string;
  serialNumber: string;
  location: string;
  handReceipt: string;
  verified: boolean;
}

interface EmergencyContact {
  title: string;
  name?: string;
  phone: string;
}

interface HandReceiptData {
  platoon: string;
  responsible: string;
  itemCount: number;
  daysOld: number;
}

interface ActivityLogEntry {
  id: string;
  date: string;
  time: string;
  activity: string;
  items: string;
  personnel: string;
  location: string;
  details: string;
  status?: 'Complete' | 'In Progress' | 'Scheduled' | 'Cancelled';
}

interface VerificationStats {
  dailyCheckTotal: number;
  dailyCheckComplete: number;
  weeklyVerificationTotal: number;
  weeklyVerificationComplete: number;
  monthlyInventoryCompliance: number;
  regulationCompliance: 'FULLY COMPLIANT' | 'PARTIALLY COMPLIANT' | 'NON-COMPLIANT';
  averageInventoryTime: string;
  verificationAccuracy: number;
  discrepanciesLast90Days: number;
  blockchainVerified: number;
  blockchainTotal: number;
}

interface CategoryStatus {
  category: string;
  count: number;
  status: string;
  lastVerified: string;
  verificationType: string;
  verifiedBy: string;
}

interface InventoryRequirement {
  type: string;
  frequency: string;
  lastCompleted: string;
  nextRequired: string;
  status: 'On Schedule' | 'Days Remaining' | 'Overdue' | 'Complete' | 'N/A';
  daysRemaining?: number;
}

// Export interfaces for use in other components
export type {
  SensitiveItem,
  EmergencyContact,
  HandReceiptData,
  ActivityLogEntry,
  VerificationStats,
  CategoryStatus,
  InventoryRequirement
};

// Mock data for Arms Room Status
const mockArmsRoomData = {
  location: "Alpha Company Arms Room",
  securityStatus: "SECURE" as const,
  lastAccess: "25FEB2025 0730",
  lastAccessPerson: "1LT Chen",
  lastAccessRole: "Arms Room Officer",
  currentCustodian: "SFC Martinez",
  custodianAppointedDate: "01JAN2025",
  sopStatus: "Current and Verified",
  sopRevisionDate: "10JAN2025",
  weaponsStored: 143,
  weaponsTotal: 150,
  weaponsSignedOut: 7,
  tempHandReceipts: 3,
  maintenanceItems: 2
};

// Mock data for verification stats
const mockVerificationStats = {
  dailyCheckTotal: 210,
  dailyCheckComplete: 210,
  weeklyVerificationTotal: 210,
  weeklyVerificationComplete: 195,
  monthlyInventoryCompliance: 100,
  regulationCompliance: 'FULLY COMPLIANT' as const,
  averageInventoryTime: '1 hour 23 minutes',
  verificationAccuracy: 99.8,
  discrepanciesLast90Days: 2,
  blockchainVerified: 210,
  blockchainTotal: 210
};

// Mock data for emergency contacts
const mockEmergencyContacts = [
  { title: 'Company Commander', name: 'CPT Smith', phone: '555-0101' },
  { title: 'First Sergeant', name: '1SG Johnson', phone: '555-0102' },
  { title: 'Battalion S4', name: 'CW3 Brown', phone: '555-0103' }
];

// Mock data for hand receipts
const mockHandReceipts = [
  { platoon: '1st Platoon', responsible: '1LT Chen', itemCount: 143, daysOld: 1 },
  { platoon: '2nd Platoon', responsible: 'SSG Wilson', itemCount: 63, daysOld: 2 },
  { platoon: '3rd Platoon', responsible: 'SPC Johnson', itemCount: 4, daysOld: 3 }
];

// Mock data for categories
const mockCategories = [
  { category: 'Weapons', count: 143, status: 'VERIFIED', lastVerified: '25FEB2025 0730', verificationType: 'Daily Check', verifiedBy: '1LT Chen' },
  { category: 'NVGs/Optics', count: 63, status: 'VERIFIED', lastVerified: '24FEB2025 1745', verificationType: 'Serial Verification', verifiedBy: 'SSG Wilson' }
];

// Mock data for the components
const mockSensitiveItems: SensitiveItem[] = [
  { id: '1', category: 'Weapon', nomenclature: 'M4 Carbine', serialNumber: 'W123456', location: 'Arms Room', handReceipt: '1st Platoon', verified: true },
  { id: '2', category: 'Weapon', nomenclature: 'M9 Pistol', serialNumber: 'P987654', location: 'Arms Room', handReceipt: '2nd Platoon', verified: true },
  { id: '3', category: 'NVG', nomenclature: 'PVS-14', serialNumber: 'N456789', location: 'Supply Room', handReceipt: '3rd Platoon', verified: false },
  { id: '4', category: 'Crypto', nomenclature: 'KG-175D', serialNumber: 'C789012', location: 'Comms Cage', handReceipt: 'HQ Platoon', verified: true },
  { id: '5', category: 'Weapon', nomenclature: 'M249 SAW', serialNumber: 'W654321', location: 'Arms Room', handReceipt: '1st Platoon', verified: false },
];

const mockActivityLog: ActivityLogEntry[] = [
  { id: '1', date: '25FEB2025', time: '0730', activity: 'Daily Verification', items: 'All weapons', personnel: '1LT Chen', location: 'Arms Room', details: 'Routine daily check', status: 'Complete' },
  { id: '2', date: '24FEB2025', time: '1745', activity: 'Serial Number Verification', items: 'NVGs', personnel: 'SSG Wilson', location: 'Supply Room', details: 'Weekly serial verification', status: 'Complete' },
  { id: '3', date: '24FEB2025', time: '0630', activity: 'Weapons Inventory', items: 'All sensitive items', personnel: 'CPT Rodriguez', location: 'Company Area', details: 'Monthly 100% inventory', status: 'Complete' },
  { id: '4', date: '23FEB2025', time: '1100', activity: 'Maintenance Check', items: 'M249 SAWs', personnel: 'SFC Adams', location: 'Arms Room', details: 'Preventive maintenance', status: 'Complete' },
  { id: '5', date: '26FEB2025', time: '1300', activity: 'Scheduled Inventory', items: 'All sensitive items', personnel: 'CPT Rodriguez', location: 'Company Area', details: 'Change of command inventory', status: 'Scheduled' },
];

const mockInventoryRequirements: InventoryRequirement[] = [
  { type: 'Daily Sensitive Item Check', frequency: 'Daily', lastCompleted: '25FEB2025 0730', nextRequired: '26FEB2025 0600', status: 'On Schedule' },
  { type: 'Weekly Serial Number Verification', frequency: 'Weekly', lastCompleted: '24FEB2025 1745', nextRequired: '02MAR2025 1700', status: 'Days Remaining', daysRemaining: 5 },
  { type: 'Monthly 100% Inventory', frequency: 'Monthly', lastCompleted: '01FEB2025 0900', nextRequired: '01MAR2025 0900', status: 'Days Remaining', daysRemaining: 3 },
  { type: 'Quarterly Joint Inventory', frequency: 'Quarterly', lastCompleted: '10JAN2025 1300', nextRequired: '10APR2025 1300', status: 'Days Remaining', daysRemaining: 44 },
  { type: 'Change of Command Inventory', frequency: 'As Required', lastCompleted: '15DEC2024 0800', nextRequired: '26FEB2025 0800', status: 'Days Remaining', daysRemaining: 1 },
];

// Define the return type for our container hook
export interface SensitiveItemsContainerProps {
  // Data
  headerData: {
    companyInfo: string;
    daysRemaining: number;
    totalItems: number;
    accountedItems: number;
    lastInventory: string;
    lastInventoryOfficer: string;
    nextRequired: string;
    regulation: string;
  };
  armsRoomData: {
    location: string;
    securityStatus: "SECURE" | "UNSECURE" | "MAINTENANCE";
    lastAccess: string;
    lastAccessPerson: string;
    lastAccessRole: string;
    currentCustodian: string;
    custodianAppointedDate: string;
    sopStatus: string;
    sopRevisionDate: string;
    weaponsStored: number;
    weaponsTotal: number;
    weaponsSignedOut: number;
    tempHandReceipts: number;
    maintenanceItems: number;
    onContactArmorer: () => void;
    onViewAccessLog: () => void;
    onReviewSOP: () => void;
  };
  mockVerificationStats: VerificationStats;
  mockEmergencyContacts: EmergencyContact[];
  mockHandReceipts: HandReceiptData[];
  mockActivityLog: ActivityLogEntry[];
  mockCategories: CategoryStatus[];
  mockInventoryRequirements: InventoryRequirement[];
  mockSensitiveItems: SensitiveItem[];
  
  // State
  inventoryExecutionOpen: boolean;
  itemDetailOpen: boolean;
  selectedItem: SensitiveItem | null;
  missingItemProtocolOpen: boolean;
  
  // Event handlers
  handleConductInventory: () => void;
  handlePrintList: () => void;
  handleReportMissing: () => void;
  handleViewItemDetails: (itemId: string) => void;
  handleViewCategoryDetails: (category: string) => void;
  handleCompleteInventory: (verifiedItems: string[], unverifiedItems: string[], notes: string) => void;
  handlePauseInventory: () => void;
  handleReportDiscrepancy: (itemId: string, issue: string) => void;
  handleInitiateMissingItemProtocol: () => void;
  handleContactArmorer: () => void;
  handleViewAccessLog: () => void;
  handleReviewSOP: () => void;
  handleDownloadReport: () => void;
  handleViewHandReceipts: () => void;
  handleGenerateSubHandReceipt: () => void;
  handleViewCompleteLog: () => void;
  handleScheduleSpecialInventory: () => void;
  handleVerifyItem: (id: string) => void;
  handleTransferItem: (id: string) => void;
  handleReportIssue: (id: string) => void;
  handleRequestMaintenance: (id: string) => void;
  
  // State setters
  setInventoryExecutionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setItemDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMissingItemProtocolOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Change from a component to a custom hook
const useSensitiveItemsContainer = (): SensitiveItemsContainerProps => {
  // State variables for all modals and panels
  const [inventoryExecutionOpen, setInventoryExecutionOpen] = useState(false);
  const [itemDetailOpen, setItemDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SensitiveItem | null>(null);
  const [missingItemProtocolOpen, setMissingItemProtocolOpen] = useState(false);

  // Header props data
  const headerData = {
    companyInfo: "Alpha Company, 1-505th PIR",
    daysRemaining: 1,
    totalItems: 210,
    accountedItems: 210,
    lastInventory: "25FEB2025 0730",
    lastInventoryOfficer: "1LT Chen",
    nextRequired: "26FEB2025 0600",
    regulation: "AR 710-2"
  };

  // Event handlers for various components
  const handleConductInventory = () => {
    setInventoryExecutionOpen(true);
  };

  const handlePrintList = () => {
    console.log("Printing sensitive items list");
    // Would implement actual print functionality here
  };

  const handleReportMissing = () => {
    setMissingItemProtocolOpen(true);
  };

  const handleViewItemDetails = (itemId: string) => {
    const item = mockSensitiveItems.find(item => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setItemDetailOpen(true);
    }
  };

  const handleViewCategoryDetails = (category: string) => {
    console.log("Viewing category details for:", category);
    // Would implement category detail view here
  };

  const handleCompleteInventory = (verifiedItems: string[], unverifiedItems: string[], notes: string) => {
    console.log("Inventory completed with", verifiedItems.length, "verified items");
    console.log("Unverified items:", unverifiedItems);
    console.log("Notes:", notes);
    // Would implement inventory completion logic here
  };

  const handlePauseInventory = () => {
    console.log("Inventory paused");
    // Would implement inventory pausing logic here
  };

  const handleReportDiscrepancy = (itemId: string, issue: string) => {
    console.log("Discrepancy reported for item", itemId, ":", issue);
    // Would implement discrepancy reporting logic here
  };

  const handleInitiateMissingItemProtocol = () => {
    console.log("Missing item protocol initiated");
    setMissingItemProtocolOpen(false);
    // Would implement missing item protocol here
  };

  const handleContactArmorer = () => {
    console.log("Contacting armorer");
    // Would implement contact functionality here
  };

  const handleViewAccessLog = () => {
    console.log("Viewing access log");
    // Would implement access log view here
  };

  const handleReviewSOP = () => {
    console.log("Reviewing SOP");
    // Would implement SOP review here
  };

  const handleDownloadReport = () => {
    console.log("Downloading verification report");
    // Would implement report download here
  };

  const handleViewHandReceipts = () => {
    console.log("Viewing hand receipts");
    // Would implement hand receipt view here
  };

  const handleGenerateSubHandReceipt = () => {
    console.log("Generating sub-hand receipt");
    // Would implement sub-hand receipt generation here
  };

  const handleViewCompleteLog = () => {
    console.log("Viewing complete activity log");
    // Would implement complete log view here
  };

  const handleScheduleSpecialInventory = () => {
    console.log("Scheduling special inventory");
    // Would implement special inventory scheduling here
  };

  const handleVerifyItem = (id: string) => {
    console.log("Verifying item", id);
    // Would implement item verification here
  };

  const handleTransferItem = (id: string) => {
    console.log("Transferring item", id);
    // Would implement item transfer here
  };

  const handleReportIssue = (id: string) => {
    console.log("Reporting issue for item", id);
    // Would implement issue reporting here
  };

  const handleRequestMaintenance = (id: string) => {
    console.log("Requesting maintenance for item", id);
    // Would implement maintenance request here
  };

  // Return all props and handlers for use in the main component
  return {
    // Data
    headerData,
    armsRoomData: {
      ...mockArmsRoomData,
      onContactArmorer: handleContactArmorer,
      onViewAccessLog: handleViewAccessLog,
      onReviewSOP: handleReviewSOP
    },
    mockVerificationStats,
    mockEmergencyContacts,
    mockHandReceipts,
    mockActivityLog,
    mockCategories,
    mockInventoryRequirements,
    mockSensitiveItems,
    
    // State
    inventoryExecutionOpen,
    itemDetailOpen,
    selectedItem,
    missingItemProtocolOpen,
    
    // Event handlers
    handleConductInventory,
    handlePrintList,
    handleReportMissing,
    handleViewItemDetails,
    handleViewCategoryDetails,
    handleCompleteInventory,
    handlePauseInventory,
    handleReportDiscrepancy,
    handleInitiateMissingItemProtocol,
    handleContactArmorer,
    handleViewAccessLog,
    handleReviewSOP,
    handleDownloadReport,
    handleViewHandReceipts,
    handleGenerateSubHandReceipt,
    handleViewCompleteLog,
    handleScheduleSpecialInventory,
    handleVerifyItem,
    handleTransferItem,
    handleReportIssue,
    handleRequestMaintenance,
    
    // State setters
    setInventoryExecutionOpen,
    setItemDetailOpen,
    setMissingItemProtocolOpen
  };
};

export default useSensitiveItemsContainer; 