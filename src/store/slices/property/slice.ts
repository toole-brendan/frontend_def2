import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PropertyState } from '../../../types/property';
import {
  fetchSummary,
  fetchEquipmentList,
  fetchItemDetails,
  fetchComplianceStatus,
} from '../../../store/slices/property/thunks';

const initialState: PropertyState = {
  summary: {
    totalItems: 0,
    serviceableItems: 0,
    upcomingInspections: {
      next7Days: 0,
      next30Days: 0,
    },
    disputedItems: 0,
  },
  equipmentList: [],
  selectedItemId: null,
  selectedItemDetails: {
    item: null,
    custodyHistory: [],
    maintenanceLogs: [],
    inspectionChecklists: [],
    attachments: [],
  },
  complianceStatus: {
    itemsInspected: {
      total: 0,
      completed: 0,
    },
    trainingCertifications: {
      total: 0,
      completed: 0,
    },
    missingDocuments: [],
  },
  loading: {
    summary: false,
    equipmentList: false,
    itemDetails: false,
    compliance: false,
  },
  error: {},
  view: 'table',
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setView: (state: PropertyState, action: PayloadAction<'card' | 'table'>) => {
      state.view = action.payload;
    },
    resetSelectedItem: (state: PropertyState) => {
      state.selectedItemId = null;
      state.selectedItemDetails = {
        item: null,
        custodyHistory: [],
        maintenanceLogs: [],
        inspectionChecklists: [],
        attachments: [],
      };
    },
    resetAll: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Summary
    builder.addCase(fetchSummary.pending, (state: PropertyState) => {
      state.loading.summary = true;
      state.error.summary = undefined;
    });
    builder.addCase(fetchSummary.fulfilled, (state: PropertyState, action) => {
      state.loading.summary = false;
      state.error.summary = undefined;
      state.summary = action.payload;
    });
    builder.addCase(fetchSummary.rejected, (state: PropertyState, action) => {
      state.loading.summary = false;
      state.error.summary = action.payload as string || action.error.message || 'Failed to fetch summary';
      console.error('Summary fetch failed:', state.error.summary);
    });

    // Fetch Equipment List
    builder.addCase(fetchEquipmentList.pending, (state: PropertyState) => {
      state.loading.equipmentList = true;
      state.error.equipmentList = undefined;
    });
    builder.addCase(fetchEquipmentList.fulfilled, (state: PropertyState, action) => {
      state.loading.equipmentList = false;
      state.error.equipmentList = undefined;
      state.equipmentList = action.payload;
    });
    builder.addCase(fetchEquipmentList.rejected, (state: PropertyState, action) => {
      state.loading.equipmentList = false;
      state.error.equipmentList = action.payload as string || action.error.message || 'Failed to fetch equipment list';
      console.error('Equipment list fetch failed:', state.error.equipmentList);
    });

    // Fetch Item Details
    builder.addCase(fetchItemDetails.pending, (state: PropertyState) => {
      state.loading.itemDetails = true;
      state.error.itemDetails = undefined;
    });
    builder.addCase(fetchItemDetails.fulfilled, (state: PropertyState, action) => {
      state.loading.itemDetails = false;
      state.selectedItemDetails = action.payload;
    });
    builder.addCase(fetchItemDetails.rejected, (state: PropertyState, action) => {
      state.loading.itemDetails = false;
      state.error.itemDetails = action.error.message || 'Failed to fetch item details';
    });

    // Fetch Compliance Status
    builder.addCase(fetchComplianceStatus.pending, (state: PropertyState) => {
      state.loading.compliance = true;
      state.error.compliance = undefined;
    });
    builder.addCase(fetchComplianceStatus.fulfilled, (state: PropertyState, action) => {
      state.loading.compliance = false;
      state.error.compliance = undefined;
      state.complianceStatus = action.payload;
    });
    builder.addCase(fetchComplianceStatus.rejected, (state: PropertyState, action) => {
      state.loading.compliance = false;
      state.error.compliance = action.payload as string || action.error.message || 'Failed to fetch compliance status';
      console.error('Compliance status fetch failed:', state.error.compliance);
    });
  },
});

export const { setView, resetSelectedItem, resetAll } = propertySlice.actions;
export default propertySlice.reducer; 