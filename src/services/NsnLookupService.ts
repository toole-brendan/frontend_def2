import axios from 'axios';

export type NsnData = {
  nsn: string;
  nomenclature: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  availability: {
    isAvailable: boolean;
    estimatedLeadTime?: number; // in days
    substitutes?: Array<{
      nsn: string;
      nomenclature: string;
      price: number;
    }>;
  };
  specifications: Record<string, string>;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    unitOfMeasure: string;
  };
  images?: string[];
  relatedItems?: string[];
  lastUpdated: string;
};

export type NsnSearchParams = {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'nomenclature' | 'nsn' | 'relevance';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export type NsnSearchResult = {
  items: Array<{
    nsn: string;
    nomenclature: string;
    price: number;
    category: string;
    availability: boolean;
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Mock API endpoints
const API_ENDPOINTS = {
  NSN_LOOKUP: '/api/supply/nsn',
  NSN_SEARCH: '/api/supply/nsn/search',
  NSN_STANDARDIZE: '/api/supply/standardize',
  NSN_AVAILABILITY: '/api/supply/availability',
  NSN_SPECIFICATIONS: '/api/supply/specifications',
};

class NsnLookupService {
  private static instance: NsnLookupService;
  private cache: Map<string, { data: NsnData; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): NsnLookupService {
    if (!NsnLookupService.instance) {
      NsnLookupService.instance = new NsnLookupService();
    }
    return NsnLookupService.instance;
  }

  /**
   * Look up detailed information for a specific NSN
   * @param nsn The NSN to look up
   * @param forceRefresh Whether to bypass cache and force a fresh lookup
   * @returns Promise with the NSN data
   */
  public async lookupNsn(nsn: string, forceRefresh: boolean = false): Promise<NsnData> {
    // Normalize NSN format
    const normalizedNsn = this.normalizeNsn(nsn);
    
    // Check cache first unless force refresh is requested
    if (!forceRefresh) {
      const cached = this.cache.get(normalizedNsn);
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
        return cached.data;
      }
    }

    try {
      // Make API request
      const { data } = await axios.get(`${API_ENDPOINTS.NSN_LOOKUP}/${normalizedNsn}`);
      
      // Update cache
      this.cache.set(normalizedNsn, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`NSN ${normalizedNsn} not found in supply catalog`);
      }
      throw new Error('Failed to lookup NSN: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Search for NSNs using various search parameters
   * @param params Search parameters
   * @returns Promise with search results
   */
  public async searchNsn(params: NsnSearchParams): Promise<NsnSearchResult> {
    try {
      const { data } = await axios.get(API_ENDPOINTS.NSN_SEARCH, { params });
      return data;
    } catch (error) {
      throw new Error('Failed to search NSN catalog: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Standardize nomenclature based on supply catalog
   * @param nomenclature The nomenclature to standardize
   * @returns Promise with standardized nomenclature
   */
  public async standardizeNomenclature(nomenclature: string): Promise<string> {
    try {
      const { data } = await axios.post(API_ENDPOINTS.NSN_STANDARDIZE, { nomenclature });
      return data.standardized;
    } catch (error) {
      // If standardization fails, return the original
      console.warn('Failed to standardize nomenclature:', error);
      return nomenclature;
    }
  }

  /**
   * Check availability of multiple NSNs
   * @param nsns Array of NSNs to check
   * @returns Promise with availability information
   */
  public async checkAvailability(nsns: string[]): Promise<Record<string, { 
    isAvailable: boolean; 
    estimatedLeadTime?: number;
  }>> {
    try {
      // Normalize all NSNs
      const normalizedNsns = nsns.map(nsn => this.normalizeNsn(nsn));
      
      const { data } = await axios.post(API_ENDPOINTS.NSN_AVAILABILITY, { nsns: normalizedNsns });
      return data.availability;
    } catch (error) {
      throw new Error('Failed to check NSN availability: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Get technical specifications for an NSN
   * @param nsn The NSN to get specifications for
   * @returns Promise with technical specifications
   */
  public async getTechnicalSpecifications(nsn: string): Promise<Record<string, string>> {
    try {
      const normalizedNsn = this.normalizeNsn(nsn);
      const { data } = await axios.get(`${API_ENDPOINTS.NSN_SPECIFICATIONS}/${normalizedNsn}`);
      return data.specifications;
    } catch (error) {
      throw new Error('Failed to get technical specifications: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Normalize NSN format (remove hyphens and ensure consistent format)
   * @param nsn The NSN to normalize
   * @returns Normalized NSN
   */
  private normalizeNsn(nsn: string): string {
    // Remove any non-alphanumeric characters
    const stripped = nsn.replace(/[^a-zA-Z0-9]/g, '');
    
    // NSNs should be 13 characters
    if (stripped.length !== 13) {
      throw new Error(`Invalid NSN format: ${nsn}. NSNs must be 13 characters.`);
    }
    
    // Return in standard format: XXXX-XX-XXX-XXXX
    return `${stripped.substr(0, 4)}-${stripped.substr(4, 2)}-${stripped.substr(6, 3)}-${stripped.substr(9, 4)}`;
  }

  /**
   * Clear the NSN lookup cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get the size of the NSN lookup cache
   * @returns Number of cached NSNs
   */
  public getCacheSize(): number {
    return this.cache.size;
  }
}

export default NsnLookupService; 