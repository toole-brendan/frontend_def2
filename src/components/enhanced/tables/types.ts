import { ReactNode } from 'react';

/**
 * Column definition for the DataTable component
 */
export interface ColumnDef<T = any> {
  /** Unique identifier for the column */
  id: string;
  /** Column header label */
  label: string;
  /** Whether the column contains numeric data (affects alignment) */
  numeric?: boolean;
  /** Whether to disable padding */
  disablePadding?: boolean;
  /** Width of the column */
  width?: string | number;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Custom render function for the column */
  renderCell?: (value: any, row: T, index: number) => ReactNode;
  /** Function to get the value from the row data */
  getValue?: (row: T) => any;
}

/**
 * Props for table actions
 */
export interface TableAction {
  /** Action label */
  label?: string;
  /** Icon component */
  icon?: ReactNode;
  /** Action handler */
  onClick: () => void;
  /** Optional color (follows MUI color system) */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
  /** Variant of the button */
  variant?: 'text' | 'outlined' | 'contained';
  /** Whether the action is visible */
  visible?: boolean | ((selectedRows: any[]) => boolean);
  /** Key for the action */
  key?: string;
}

/**
 * Props for row actions
 */
export interface RowAction {
  /** Action icon */
  icon: ReactNode;
  /** Action handler */
  onClick: (row: any) => void;
  /** Tooltip text */
  tooltip?: string;
  /** Optional color */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
  /** Whether the action is visible */
  visible?: boolean | ((row: any) => boolean);
  /** Key for the action */
  key: string;
}

/**
 * Props for toolbar component
 */
export interface ToolbarProps {
  /** Number of selected rows */
  numSelected: number;
  /** Table title */
  title: string;
  /** Actions available when rows are selected */
  selectionActions?: TableAction[];
  /** Regular actions available in the toolbar */
  actions?: TableAction[];
  /** Whether to show the search field */
  searchable?: boolean;
  /** Search handler */
  onSearch?: (value: string) => void;
  /** Whether to show the filter button */
  filterable?: boolean;
  /** Filter handler */
  onFilter?: () => void;
  /** Optional custom filter component */
  filterComponent?: ReactNode;
}

/**
 * Custom render configurations for different cell types
 */
export interface CellRenderers<T = any> {
  /** Render function for status cells */
  status?: (value: any, row: T) => ReactNode;
  /** Render function for date cells */
  date?: (value: any, row: T) => ReactNode;
  /** Render function for numeric cells */
  numeric?: (value: any, row: T) => ReactNode;
  /** Render function for boolean cells */
  boolean?: (value: any, row: T) => ReactNode;
  /** Object mapping column IDs to custom renderers */
  custom?: Record<string, (value: any, row: T) => ReactNode>;
}

/**
 * Props for the DataTable component
 */
export interface DataTableProps<T = any> {
  /** Array of data to display */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Table title */
  title?: string;
  /** Whether rows can be selected */
  selectable?: boolean;
  /** Whether to show the search field */
  searchable?: boolean;
  /** Search handler */
  onSearch?: (value: string) => void;
  /** Current search value */
  searchValue?: string;
  /** Whether to show the filter button */
  filterable?: boolean;
  /** Filter handler */
  onFilter?: () => void;
  /** Optional custom filter component */
  filterComponent?: ReactNode;
  /** Whether to show pagination */
  pagination?: boolean;
  /** Number of rows per page options */
  rowsPerPageOptions?: number[];
  /** Default number of rows per page */
  defaultRowsPerPage?: number;
  /** Custom class name for the table container */
  className?: string;
  /** Custom style for the table container */
  sx?: object;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** ID key name in the data */
  idField?: string;
  /** Table actions */
  actions?: TableAction[];
  /** Actions available when rows are selected */
  selectionActions?: TableAction[];
  /** Row actions */
  rowActions?: RowAction[];
  /** Default sort direction */
  defaultSortDirection?: 'asc' | 'desc';
  /** Default sort column */
  defaultSortColumn?: string;
  /** Custom cell renderers */
  cellRenderers?: CellRenderers<T>;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Error message */
  error?: string;
  /** Elevation of the paper component */
  elevation?: number;
  /** Whether to use a dense layout */
  dense?: boolean;
}
