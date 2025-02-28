import { PropertyItem, EquipmentCategory } from '../types/property';
import { ReconciliationItemDetail, ReconciliationSummary } from '../components/integration/ReconciliationReport';
import axios from 'axios';

// Types for synchronization
export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error' | 'conflict';

export type SyncOptions = {
  validateOnly?: boolean;
  categories?: EquipmentCategory[];
  includeServiceable?: boolean;
  includeUnserviceable?: boolean;
  forceFull?: boolean;
};

export type SyncProgress = {
  status: SyncStatus;
  progress: number;
  currentItem?: string;
  totalItems?: number;
  processedItems?: number;
  errors?: Array<{
    message: string;
    item?: string;
    details?: string;
  }>;
  conflicts?: ReconciliationItemDetail[];
  summary?: ReconciliationSummary;
};

export type SyncResult = {
  success: boolean;
  timestamp: string;
  itemsProcessed: number;
  itemsAdded: number;
  itemsUpdated: number;
  itemsRemoved: number;
  conflicts: number;
  errors: number;
  summary?: ReconciliationSummary;
  details?: ReconciliationItemDetail[];
};

export type DataSource = 'local' | 'gcss' | 'merge';

// Mock API endpoints - would be replaced with actual endpoints
const API_ENDPOINTS = {
  SYNC_START: '/api/gcss/sync/start',
  SYNC_STATUS: '/api/gcss/sync/status',
  SYNC_CANCEL: '/api/gcss/sync/cancel',
  SYNC_RESOLVE: '/api/gcss/sync/resolve',
  RECONCILIATION: '/api/gcss/reconciliation'
};

class GcssSyncService {
  private static instance: GcssSyncService;
  private syncInProgress: boolean = false;
  private lastSyncResult: SyncResult | null = null;
  private progressListeners: Array<(progress: SyncProgress) => void> = [];
  private currentProgress: SyncProgress = {
    status: 'idle',
    progress: 0
  };
  private syncAbortController: AbortController | null = null;

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): GcssSyncService {
    if (!GcssSyncService.instance) {
      GcssSyncService.instance = new GcssSyncService();
    }
    return GcssSyncService.instance;
  }

  /**
   * Start a synchronization with GCSS-Army
   * @param options Synchronization options
   * @returns Promise with the sync result
   */
  public async startSync(options: SyncOptions = {}): Promise<SyncResult> {
    if (this.syncInProgress) {
      throw new Error('Sync already in progress');
    }

    this.syncInProgress = true;
    this.syncAbortController = new AbortController();
    this.updateProgress({
      status: 'syncing',
      progress: 0,
      totalItems: 0,
      processedItems: 0
    });

    try {
      // Start the sync process on the server
      const { data } = await axios.post(API_ENDPOINTS.SYNC_START, options, {
        signal: this.syncAbortController.signal
      });

      const syncId = data.syncId;
      
      // Poll for status updates
      return await this.pollSyncStatus(syncId);
    } catch (error) {
      this.syncInProgress = false;
      if (axios.isCancel(error)) {
        this.updateProgress({
          status: 'idle',
          progress: 0
        });
        throw new Error('Sync was cancelled');
      } else {
        this.updateProgress({
          status: 'error',
          progress: 0,
          errors: [{
            message: error instanceof Error ? error.message : 'Unknown error during sync'
          }]
        });
        throw error;
      }
    }
  }

  /**
   * Poll for sync status updates
   * @param syncId The ID of the sync operation
   * @returns Promise with the sync result
   */
  private async pollSyncStatus(syncId: string): Promise<SyncResult> {
    return new Promise<SyncResult>((resolve, reject) => {
      const checkStatus = async () => {
        try {
          const { data } = await axios.get(`${API_ENDPOINTS.SYNC_STATUS}/${syncId}`, {
            signal: this.syncAbortController?.signal
          });
          
          // Update progress
          this.updateProgress({
            status: data.status,
            progress: data.progress,
            currentItem: data.currentItem,
            totalItems: data.totalItems,
            processedItems: data.processedItems,
            errors: data.errors,
            conflicts: data.conflicts
          });

          // Check if completed
          if (data.status === 'success' || data.status === 'error' || data.status === 'conflict') {
            this.syncInProgress = false;
            this.lastSyncResult = data.result;

            if (data.status === 'success') {
              resolve(data.result);
            } else if (data.status === 'conflict') {
              // Return with conflicts to be resolved
              resolve(data.result);
            } else {
              reject(new Error('Sync failed: ' + (data.errors?.[0]?.message || 'Unknown error')));
            }
          } else {
            // Continue polling
            setTimeout(checkStatus, 1000);
          }
        } catch (error) {
          this.syncInProgress = false;
          if (axios.isCancel(error)) {
            reject(new Error('Sync was cancelled'));
          } else {
            this.updateProgress({
              status: 'error',
              progress: 0,
              errors: [{
                message: error instanceof Error ? error.message : 'Error checking sync status'
              }]
            });
            reject(error);
          }
        }
      };

      checkStatus();
    });
  }

  /**
   * Cancel an in-progress sync operation
   */
  public cancelSync(): void {
    if (this.syncInProgress && this.syncAbortController) {
      this.syncAbortController.abort();
      this.syncInProgress = false;
      this.updateProgress({
        status: 'idle',
        progress: 0
      });
    }
  }

  /**
   * Resolve conflicts from a sync operation
   * @param resolutions Map of item IDs to resolution decisions
   * @returns Promise with the updated sync result
   */
  public async resolveConflicts(
    resolutions: Record<string, { 
      item: ReconciliationItemDetail, 
      resolution: DataSource | 'manual',
      manualData?: Partial<PropertyItem> 
    }>
  ): Promise<SyncResult> {
    try {
      const { data } = await axios.post(API_ENDPOINTS.SYNC_RESOLVE, { resolutions });
      this.lastSyncResult = data;
      return data;
    } catch (error) {
      throw new Error('Failed to resolve conflicts: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Get reconciliation report without performing a sync
   * @param options Options for reconciliation
   * @returns Promise with reconciliation data
   */
  public async getReconciliationReport(
    options: { categories?: EquipmentCategory[] } = {}
  ): Promise<{ summary: ReconciliationSummary, details: ReconciliationItemDetail[] }> {
    try {
      const { data } = await axios.post(API_ENDPOINTS.RECONCILIATION, options);
      return data;
    } catch (error) {
      throw new Error('Failed to get reconciliation report: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Register a listener for sync progress updates
   * @param listener Callback function to receive updates
   * @returns Function to unregister the listener
   */
  public onProgress(listener: (progress: SyncProgress) => void): () => void {
    this.progressListeners.push(listener);
    
    // Immediately send current status
    listener(this.currentProgress);
    
    return () => {
      this.progressListeners = this.progressListeners.filter(l => l !== listener);
    };
  }

  /**
   * Update progress and notify listeners
   * @param progress Updated progress information
   */
  private updateProgress(progress: Partial<SyncProgress>): void {
    this.currentProgress = {
      ...this.currentProgress,
      ...progress
    };
    
    this.progressListeners.forEach(listener => {
      listener(this.currentProgress);
    });
  }

  /**
   * Get the most recent sync result
   * @returns The last sync result or null if none exists
   */
  public getLastSyncResult(): SyncResult | null {
    return this.lastSyncResult;
  }

  /**
   * Check if a sync is currently in progress
   * @returns True if a sync is in progress
   */
  public isSyncInProgress(): boolean {
    return this.syncInProgress;
  }

  /**
   * Get the current sync progress
   * @returns Current progress information
   */
  public getCurrentProgress(): SyncProgress {
    return this.currentProgress;
  }
}

export default GcssSyncService; 