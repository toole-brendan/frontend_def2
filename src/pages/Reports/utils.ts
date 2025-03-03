import { format, parseISO } from 'date-fns';
import { ReportData, ReportStatus } from './types';

/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string
 * @param formatStr - Optional format string (defaults to MMM dd, yyyy)
 */
export const formatReportDate = (
  dateString: string, 
  formatStr: string = 'MMM dd, yyyy'
): string => {
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    console.error('Invalid date format:', error);
    return 'Invalid date';
  }
};

/**
 * Get a color based on the report status
 * @param status - The report status
 * @returns CSS color value
 */
export const getStatusColor = (status: ReportStatus): string => {
  const statusColors = {
    draft: '#3498db',      // Info blue
    pending: '#f39c12',    // Warning orange
    approved: '#2ecc71',   // Success green
    rejected: '#e74c3c',   // Error red
    published: '#9b59b6',  // Purple
  };
  
  return statusColors[status] || '#95a5a6'; // Default gray
};

/**
 * Filter reports based on search term
 * @param reports - Array of report data
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of reports
 */
export const filterReports = (
  reports: ReportData[],
  searchTerm: string
): ReportData[] => {
  if (!searchTerm) return reports;
  
  const normalized = searchTerm.toLowerCase().trim();
  
  return reports.filter(report => 
    report.title.toLowerCase().includes(normalized) ||
    report.description.toLowerCase().includes(normalized) ||
    report.author.toLowerCase().includes(normalized) ||
    report.reportType.toLowerCase().includes(normalized)
  );
};

/**
 * Sort reports by the specified field and direction
 * @param reports - Array of report data
 * @param field - Field to sort by
 * @param direction - Sort direction ('asc' or 'desc')
 * @returns Sorted array of reports
 */
export const sortReports = (
  reports: ReportData[],
  field: keyof ReportData,
  direction: 'asc' | 'desc' = 'desc'
): ReportData[] => {
  const sortedReports = [...reports].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];
    
    // Handle dates
    if (field === 'createdAt' || field === 'updatedAt' || field === 'dueDate') {
      valueA = new Date(valueA as string).getTime();
      valueB = new Date(valueB as string).getTime();
    }
    
    // Handle strings
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // Handle numbers
    return direction === 'asc'
      ? (valueA as number) - (valueB as number)
      : (valueB as number) - (valueA as number);
  });
  
  return sortedReports;
};

/**
 * Generate a truncated preview of the report content
 * @param content - Full report content
 * @param maxLength - Maximum length of preview
 * @returns Truncated preview with ellipsis if needed
 */
export const generatePreview = (content: string, maxLength: number = 150): string => {
  if (content.length <= maxLength) return content;
  return `${content.substring(0, maxLength)}...`;
}; 