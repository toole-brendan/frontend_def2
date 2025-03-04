import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  PropertySummary,
  PropertyItem,
  CustodyEvent,
  MaintenanceLog,
  InspectionChecklist,
  Attachment,
  ComplianceStatus,
  PropertyStatus,
  EquipmentCategory,
  SubHandReceiptType,
} from '../../../types/property';

// Mock API calls - replace with actual API endpoints
const mockApi = {
  getSummary: async (): Promise<PropertySummary> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        unitInfo: {
          unit: 'Alpha Company, 1-1 IN',
          uic: 'W12345',
          primaryHandReceiptHolder: 'CPT John Smith',
        },
        mtoeAuthorization: {
          totalLines: 150,
          fillPercentage: 85,
        },
        sensitiveItems: {
          total: 45,
          accounted: 45,
          lastInventoryDate: '2024-03-01',
        },
        value: '$2,500,000',
        shortageAnnexes: 2,
        lastUpdated: '2024-03-15',
        csdpStatus: 'GREEN',
      };
    } catch (error) {
      console.error('Error in getSummary:', error);
      throw error;
    }
  },
  getEquipmentList: async (): Promise<PropertyItem[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: '1',
          nsn: '1005-01-560-2840',
          nomenclature: 'M4A1 Carbine',
          serialNumber: 'W123456',
          status: 'FMC' as PropertyStatus,
          lastInspection: '2024-02-15',
          nextInspectionDue: '2024-05-15',
          lin: 'R12345',
          blockchainTxId: 'tx_123',
          location: 'Arms Room',
          subHandReceipt: 'PRIMARY' as SubHandReceiptType,
          lastInventory: '2024-02-01',
          category: 'WEAPONS' as EquipmentCategory,
          isSensitiveItem: true,
          isCCI: false,
        },
        {
          id: '2',
          nsn: '2355-01-481-8575',
          nomenclature: 'HMMWV M1151A1',
          serialNumber: 'HMM-2023-001',
          status: 'FMC' as PropertyStatus,
          lastInspection: '2024-01-10',
          nextInspectionDue: '2024-04-10',
          lin: 'H67890',
          blockchainTxId: 'tx_456',
          location: 'Motor Pool',
          subHandReceipt: '1PLT' as SubHandReceiptType,
          lastInventory: '2024-01-15',
          category: 'ROLLING_STOCK' as EquipmentCategory,
          isSensitiveItem: false,
          isCCI: false,
        },
        {
          id: '3',
          nsn: '5820-01-580-1048',
          nomenclature: 'AN/PRC-117G Radio',
          serialNumber: 'RAD-2023-003',
          status: 'NMC' as PropertyStatus,
          lastInspection: '2024-03-01',
          nextInspectionDue: '2024-06-01',
          lin: 'C13579',
          blockchainTxId: 'tx_789',
          location: 'Comms Cage',
          subHandReceipt: 'HQ PLT' as SubHandReceiptType,
          lastInventory: '2024-02-20',
          category: 'COMMS_CCI' as EquipmentCategory,
          isSensitiveItem: true,
          isCCI: true,
        },
      ];
    } catch (error) {
      console.error('Error in getEquipmentList:', error);
      throw error;
    }
  },
  getItemDetails: async (itemId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      item: {
        id: itemId,
        nsn: '1005-01-560-2840',
        nomenclature: 'Sample Item',
        serialNumber: 'SN123456',
        status: 'FMC' as PropertyStatus,
        lastInspection: '2024-03-01',
        nextInspectionDue: '2024-06-01',
        lin: 'R12345',
        blockchainTxId: 'tx_123',
        location: 'Arms Room',
        subHandReceipt: 'PRIMARY' as SubHandReceiptType,
        lastInventory: '2024-02-01',
        category: 'WEAPONS' as EquipmentCategory,
        isSensitiveItem: true,
        isCCI: false,
      },
      custodyHistory: [],
      maintenanceLogs: [],
      inspectionChecklists: [],
      attachments: [],
    };
  },
  getComplianceStatus: async (): Promise<ComplianceStatus> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        itemsInspected: {
          total: 15,
          completed: 13,
        },
        trainingCertifications: {
          total: 10,
          completed: 9,
        },
        missingDocuments: [
          {
            itemId: '1',
            documentType: 'Annual Inventory Report',
            dueDate: '2024-05-01',
          },
          {
            itemId: '2',
            documentType: 'Maintenance Schedule Update',
            dueDate: '2024-04-15',
          },
        ],
      };
    } catch (error) {
      console.error('Error in getComplianceStatus:', error);
      throw error;
    }
  },
};

export const fetchSummary = createAsyncThunk(
  'property/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching summary...');
      const result = await mockApi.getSummary();
      console.log('Summary fetched:', result);
      return result;
    } catch (error) {
      console.error('Error in fetchSummary thunk:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch summary');
    }
  }
);

export const fetchEquipmentList = createAsyncThunk(
  'property/fetchEquipmentList',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching equipment list...');
      const result = await mockApi.getEquipmentList();
      console.log('Equipment list fetched:', result);
      return result;
    } catch (error) {
      console.error('Error in fetchEquipmentList thunk:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch equipment list');
    }
  }
);

export const fetchItemDetails = createAsyncThunk(
  'property/fetchItemDetails',
  async (itemId: string, { rejectWithValue }) => {
    try {
      return await mockApi.getItemDetails(itemId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch item details');
    }
  }
);

export const fetchComplianceStatus = createAsyncThunk(
  'property/fetchComplianceStatus',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching compliance status...');
      const result = await mockApi.getComplianceStatus();
      console.log('Compliance status fetched:', result);
      return result;
    } catch (error) {
      console.error('Error in fetchComplianceStatus thunk:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch compliance status');
    }
  }
);

export const createCustodyEvent = createAsyncThunk(
  'property/createCustodyEvent',
  async (event: Omit<CustodyEvent, 'id'>, { rejectWithValue }) => {
    try {
      const newEvent = { ...event, id: Date.now().toString(), blockchainTxId: `tx_${Date.now()}` };
      return newEvent;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create custody event');
    }
  }
);

export const createMaintenanceLog = createAsyncThunk(
  'property/createMaintenanceLog',
  async (log: Omit<MaintenanceLog, 'id'>, { rejectWithValue }) => {
    try {
      const newLog = { ...log, id: Date.now().toString(), workOrderNumber: `WO-${Date.now()}` };
      return newLog;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create maintenance log');
    }
  }
);

export const createInspectionChecklist = createAsyncThunk(
  'property/createInspectionChecklist',
  async (checklist: Omit<InspectionChecklist, 'id'>, { rejectWithValue }) => {
    try {
      const newChecklist = { ...checklist, id: Date.now().toString() };
      return newChecklist;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create inspection checklist');
    }
  }
);

export const createAttachment = createAsyncThunk(
  'property/createAttachment',
  async (attachment: Omit<Attachment, 'id'>, { rejectWithValue }) => {
    try {
      const newAttachment = { 
        ...attachment, 
        id: Date.now().toString(),
        classification: 'UNCLASSIFIED',
        securityCaveats: [],
      };
      return newAttachment;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create attachment');
    }
  }
); 