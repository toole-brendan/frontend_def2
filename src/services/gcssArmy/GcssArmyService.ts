import axios, { AxiosInstance } from 'axios';
import { PropertyItem } from '../../types/property';

export type SyncResult = {
  status: 'success' | 'partial' | 'failed';
  itemsAdded: number;
  itemsUpdated: number;
  itemsRemoved: number;
  errors: Error[];
  conflicts: ConflictRecord[];
};

export type ConflictRecord = {
  nsn: string;
  serialNumber?: string;
  localData: Partial<PropertyItem>;
  gcssData: Partial<PropertyItem>;
  conflictFields: string[];
  resolution?: 'local' | 'gcss' | 'merge' | 'manual';
  resolvedData?: Partial<PropertyItem>;
};

export type SyncOptions = {
  direction: 'pull' | 'push' | 'bidirectional';
  conflictResolution: 'prefer-local' | 'prefer-gcss' | 'manual';
  itemTypes?: string[];
  includeArchived?: boolean;
  validateBeforeSync?: boolean;
};

export type ValidationResult = {
  valid: boolean;
  localOnly: PropertyItem[];
  gcssOnly: PropertyItem[];
  conflicts: ConflictRecord[];
  matchedItems: number;
};

class GcssArmyService {
  private readonly api: AxiosInstance;
  private token: string | null = null;
  private uic: string | null = null;

  constructor(baseURL: string = process.env.REACT_APP_GCSS_API_URL || '') {
    this.api = axios.create({
      baseURL,
      timeout: 30000,
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * Authenticate with the GCSS-Army API
   * @param credentials User credentials
   * @returns Promise with authentication result
   */
  async authenticate(credentials: { username: string; password: string; uic: string }): Promise<boolean> {
    try {
      const response = await this.api.post('/auth/login', credentials);
      this.token = response.data.token;
      this.uic = credentials.uic;
      return true;
    } catch (error) {
      console.error('GCSS-Army authentication failed:', error);
      this.token = null;
      this.uic = null;
      return false;
    }
  }

  /**
   * Fetch property data from GCSS-Army
   * @param options Optional filter parameters
   * @returns Promise with property items
   */
  async fetchPropertyData(options?: { 
    category?: string; 
    since?: Date;
    includeArchived?: boolean;
  }): Promise<PropertyItem[]> {
    try {
      if (!this.token || !this.uic) {
        throw new Error('Not authenticated to GCSS-Army');
      }

      const params = {
        uic: this.uic,
        ...options,
        since: options?.since ? options.since.toISOString() : undefined,
      };

      const response = await this.api.get('/property', { params });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching GCSS-Army data:', error);
      throw error;
    }
  }

  /**
   * Push local property data to GCSS-Army
   * @param items Property items to push
   * @returns Promise with synchronization result
   */
  async pushPropertyData(items: PropertyItem[]): Promise<SyncResult> {
    try {
      if (!this.token || !this.uic) {
        throw new Error('Not authenticated to GCSS-Army');
      }

      const response = await this.api.post('/property/sync', {
        uic: this.uic,
        items,
      });

      return response.data;
    } catch (error) {
      console.error('Error pushing data to GCSS-Army:', error);
      throw error;
    }
  }

  /**
   * Synchronize property data with GCSS-Army
   * @param localItems Local property items
   * @param options Synchronization options
   * @returns Promise with synchronization result
   */
  async synchronizePropertyData(
    localItems: PropertyItem[],
    options: SyncOptions = {
      direction: 'pull',
      conflictResolution: 'manual',
      validateBeforeSync: true,
    }
  ): Promise<SyncResult> {
    try {
      if (!this.token || !this.uic) {
        throw new Error('Not authenticated to GCSS-Army');
      }

      // Optionally validate before sync
      if (options.validateBeforeSync) {
        const validationResult = await this.validateAgainstGcss(localItems);
        
        // If validation shows conflicts and manual resolution is required, return early
        if (validationResult.conflicts.length > 0 && options.conflictResolution === 'manual') {
          return {
            status: 'partial',
            itemsAdded: 0,
            itemsUpdated: 0,
            itemsRemoved: 0,
            errors: [],
            conflicts: validationResult.conflicts,
          };
        }
      }

      const response = await this.api.post('/property/sync', {
        uic: this.uic,
        items: localItems,
        options,
      });

      return response.data;
    } catch (error) {
      console.error('Error during GCSS-Army synchronization:', error);
      return {
        status: 'failed',
        itemsAdded: 0,
        itemsUpdated: 0,
        itemsRemoved: 0,
        errors: [error as Error],
        conflicts: [],
      };
    }
  }

  /**
   * Validate local property data against GCSS-Army
   * @param localItems Local property items
   * @returns Promise with validation result
   */
  async validateAgainstGcss(localItems: PropertyItem[]): Promise<ValidationResult> {
    try {
      if (!this.token || !this.uic) {
        throw new Error('Not authenticated to GCSS-Army');
      }

      const response = await this.api.post('/property/validate', {
        uic: this.uic,
        items: localItems,
      });

      return response.data;
    } catch (error) {
      console.error('Error validating against GCSS-Army:', error);
      throw error;
    }
  }

  /**
   * Resolve data conflicts between local and GCSS-Army systems
   * @param resolutions Array of conflict resolutions
   * @returns Promise with resolution result
   */
  async resolveConflicts(resolutions: ConflictRecord[]): Promise<SyncResult> {
    try {
      if (!this.token || !this.uic) {
        throw new Error('Not authenticated to GCSS-Army');
      }

      const response = await this.api.post('/property/resolve-conflicts', {
        uic: this.uic,
        resolutions,
      });

      return response.data;
    } catch (error) {
      console.error('Error resolving GCSS-Army conflicts:', error);
      throw error;
    }
  }

  /**
   * Generate a reconciliation report between local and GCSS-Army systems
   * @param options Report options
   * @returns Promise with reconciliation report data
   */
  async generateReconciliationReport(options?: {
    category?: string;
    detailed?: boolean;
    includeResolved?: boolean;
  }): Promise<any> {
    try {
      if (!this.token || !this.uic) {
        throw new Error('Not authenticated to GCSS-Army');
      }

      const params = {
        uic: this.uic,
        ...options,
      };

      const response = await this.api.get('/property/reconciliation-report', { params });
      return response.data;
    } catch (error) {
      console.error('Error generating GCSS-Army reconciliation report:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const gcssArmyService = new GcssArmyService();
export default gcssArmyService; 