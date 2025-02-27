import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { icons } from '../components/layout/Sidebar';
import {
  Dashboard as DashboardIcon,
  MenuBook as PropertyBookIcon,
  Inventory as InventoryIcon,
  Campaign as OperationsIcon,
  SwapHoriz as TransfersIcon,
  Assignment as InventoriesIcon,
  Build as MaintenanceIcon,
  Description as ReportsIcon,
  AdminPanelSettings as AdminToolsIcon,
  Help as SupportIcon,
  QrCode as QrCodeIcon,
} from '@mui/icons-material';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard/index'));
const PropertyBook = React.lazy(() => import('../pages/Property'));
const UnitInventory = React.lazy(() => import('../pages/UnitInventory/index'));
const Transfers = React.lazy(() => import('../pages/Transfers/index'));
const Maintenance = React.lazy(() => import('../pages/Maintenance/index'));
const QrManagement = React.lazy(() => import('../pages/QrManagement/index'));
const Reports = React.lazy(() => import('../pages/Reports/index'));
const UserManagement = React.lazy(() => import('../pages/UserManagement/index'));
const Settings = React.lazy(() => import('../pages/Settings/index'));
const Profile = React.lazy(() => import('../pages/Profile/index'));

export const ROUTES = {
  DASHBOARD: '/defense/dashboard',
  
  // Property Book routes
  PROPERTY_BOOK: '/defense/property-book',
  HAND_RECEIPTS: '/defense/property-book/hand-receipts',
  SUB_HAND_RECEIPTS: '/defense/property-book/sub-hand-receipts',
  PBUSE_VIEW: '/defense/property-book/pbuse-view',
  
  // Unit Inventory routes
  UNIT_INVENTORY: '/defense/unit-inventory',
  
  // Equipment Management routes
  EQUIPMENT: '/defense/equipment',
  VEHICLE_FLEET: '/defense/equipment/vehicle-fleet',
  WEAPONS_SYSTEMS: '/defense/equipment/weapons-systems',
  COMMUNICATIONS: '/defense/equipment/communications',
  OPTICS_NVGS: '/defense/equipment/optics-nvgs',
  SENSITIVE_ITEMS: '/defense/equipment/sensitive-items',
  COEI_BII: '/defense/equipment/coei-bii',
  
  // Operations routes
  OPERATIONS: '/defense/operations',
  NTC_ROTATION: '/defense/operations/ntc-rotation',
  TRAINING_EQUIPMENT: '/defense/operations/training-equipment',
  DEPLOY_REDEPLOY: '/defense/operations/deploy-redeploy',
  FIELD_PLANNING: '/defense/operations/field-planning',
  
  // Transfers routes
  TRANSFERS: '/defense/transfers',
  INCOMING_TRANSFERS: '/defense/transfers/incoming',
  OUTGOING_TRANSFERS: '/defense/transfers/outgoing',
  LATERAL_TRANSFERS: '/defense/transfers/lateral',
  TURN_IN_PROCESS: '/defense/transfers/turn-in',
  
  // Inventories routes
  INVENTORIES: '/defense/inventories',
  SENSITIVE_INVENTORY: '/defense/inventories/sensitive',
  CYCLIC_INVENTORY: '/defense/inventories/cyclic',
  CHANGE_OF_COMMAND: '/defense/inventories/change-of-command',
  CSDP: '/defense/inventories/csdp',
  
  // Maintenance routes
  MAINTENANCE: '/defense/maintenance',
  MAINTENANCE_REQUESTS: '/defense/maintenance/requests',
  SERVICE_SCHEDULES: '/defense/maintenance/schedules',
  PARTS_ORDERING: '/defense/maintenance/parts',
  DEADLINED_EQUIPMENT: '/defense/maintenance/deadlined',
  
  // QR Management routes
  QR_MANAGEMENT: '/defense/qr-management',
  GENERATE_QR: '/defense/qr-management/generate',
  MANAGE_QR: '/defense/qr-management/manage',
  QR_METRICS: '/defense/qr-management/metrics',
  
  // Reports routes
  REPORTS: '/defense/reports',
  COMMAND_REPORTS: '/defense/reports/command',
  FLIPL: '/defense/reports/flipl',
  SUPPLY_ACTIVITY: '/defense/reports/supply-activity',
  READINESS_REPORTING: '/defense/reports/readiness',
  
  // Admin routes
  ADMIN: '/defense/admin',
  USER_MANAGEMENT: '/defense/admin/users',
  UNIT_CONFIGURATION: '/defense/admin/unit',
  SYSTEM_INTEGRATIONS: '/defense/admin/integrations',
  
  // Support routes
  SUPPORT: '/defense/support',
  TRAINING_MATERIALS: '/defense/support/training',
  SOPS_REGULATIONS: '/defense/support/sops',
  HELP_DESK: '/defense/support/help',
  CONTACT_S4: '/defense/support/contact',
  
  PROFILE: '/defense/profile',
} as const;

export const NAV_ITEMS = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: DashboardIcon,
    notificationCount: 3
  },
  {
    title: 'Property Book',
    path: ROUTES.PROPERTY_BOOK,
    icon: PropertyBookIcon,
    subItems: [
      { title: 'Hand Receipts', path: ROUTES.HAND_RECEIPTS },
      { title: 'Sub-Hand Receipts', path: ROUTES.SUB_HAND_RECEIPTS },
      { title: 'PBUSE View', path: ROUTES.PBUSE_VIEW }
    ]
  },
  {
    title: 'Unit Inventory',
    path: ROUTES.UNIT_INVENTORY,
    icon: InventoryIcon,
  },
  {
    title: 'Equipment Management',
    path: ROUTES.EQUIPMENT,
    icon: InventoryIcon,
    subItems: [
      { title: 'Vehicle Fleet', path: ROUTES.VEHICLE_FLEET },
      { title: 'Weapons Systems', path: ROUTES.WEAPONS_SYSTEMS },
      { title: 'Communications', path: ROUTES.COMMUNICATIONS },
      { title: 'Optics/NVGs', path: ROUTES.OPTICS_NVGS },
      { title: 'Sensitive Items', path: ROUTES.SENSITIVE_ITEMS },
      { title: 'COEI/BII Components', path: ROUTES.COEI_BII }
    ]
  },
  {
    title: 'Operations',
    path: ROUTES.OPERATIONS,
    icon: OperationsIcon,
    subItems: [
      { title: 'NTC Rotation Prep', path: ROUTES.NTC_ROTATION },
      { title: 'Training Equipment', path: ROUTES.TRAINING_EQUIPMENT },
      { title: 'Deploy/Redeploy Tools', path: ROUTES.DEPLOY_REDEPLOY },
      { title: 'Field Exercise Planning', path: ROUTES.FIELD_PLANNING }
    ]
  },
  {
    title: 'Transfers & Movement',
    path: ROUTES.TRANSFERS,
    icon: TransfersIcon,
    notificationCount: 13,
    subItems: [
      { title: 'Incoming Transfers', path: ROUTES.INCOMING_TRANSFERS },
      { title: 'Outgoing Transfers', path: ROUTES.OUTGOING_TRANSFERS },
      { title: 'Lateral Transfers', path: ROUTES.LATERAL_TRANSFERS },
      { title: 'Turn-In Process', path: ROUTES.TURN_IN_PROCESS }
    ]
  },
  {
    title: 'Inventories',
    path: ROUTES.INVENTORIES,
    icon: InventoriesIcon,
    subItems: [
      { title: 'Sensitive Item Inventory', path: ROUTES.SENSITIVE_INVENTORY },
      { title: 'Cyclic Inventory (10%)', path: ROUTES.CYCLIC_INVENTORY },
      { title: 'Change of Command', path: ROUTES.CHANGE_OF_COMMAND },
      { title: 'Command Supply Discipline Program', path: ROUTES.CSDP }
    ]
  },
  {
    title: 'Maintenance',
    path: ROUTES.MAINTENANCE,
    icon: MaintenanceIcon,
    subItems: [
      { title: 'Maintenance Requests', path: ROUTES.MAINTENANCE_REQUESTS },
      { title: 'Service Schedules', path: ROUTES.SERVICE_SCHEDULES },
      { title: 'Parts Ordering', path: ROUTES.PARTS_ORDERING },
      { title: 'Deadlined Equipment', path: ROUTES.DEADLINED_EQUIPMENT }
    ]
  },
  {
    title: 'QR Management',
    path: ROUTES.QR_MANAGEMENT,
    icon: QrCodeIcon,
    subItems: [
      { title: 'Generate QR Codes', path: ROUTES.GENERATE_QR },
      { title: 'Manage QR Codes', path: ROUTES.MANAGE_QR },
      { title: 'QR Metrics', path: ROUTES.QR_METRICS }
    ]
  },
  {
    title: 'Reports & Documentation',
    path: ROUTES.REPORTS,
    icon: ReportsIcon,
    subItems: [
      { title: 'Command Reports', path: ROUTES.COMMAND_REPORTS },
      { title: 'Financial Liability Investigations', path: ROUTES.FLIPL },
      { title: 'Supply Activity Reports', path: ROUTES.SUPPLY_ACTIVITY },
      { title: 'Readiness Reporting', path: ROUTES.READINESS_REPORTING }
    ]
  },
  // Administrative Section
  {
    title: 'Admin Tools',
    path: ROUTES.ADMIN,
    icon: AdminToolsIcon,
    isAdminSection: true,
    subItems: [
      { title: 'User Management', path: ROUTES.USER_MANAGEMENT },
      { title: 'Unit Configuration', path: ROUTES.UNIT_CONFIGURATION },
      { title: 'System Integrations', path: ROUTES.SYSTEM_INTEGRATIONS }
    ]
  },
  {
    title: 'Support & Resources',
    path: ROUTES.SUPPORT,
    icon: SupportIcon,
    isAdminSection: true,
    subItems: [
      { title: 'Training Materials', path: ROUTES.TRAINING_MATERIALS },
      { title: 'SOPs & Regulations', path: ROUTES.SOPS_REGULATIONS },
      { title: 'Help Desk', path: ROUTES.HELP_DESK },
      { title: 'Contact S4', path: ROUTES.CONTACT_S4 }
    ]
  }
];

export const SYSTEM_STATUS = {
  connectionStatus: 'connected' as 'connected' | 'offline',
  lastSync: '25FEB2025 0842',
  version: 'HandReceipt Defense v1.4.2'
};

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        
        {/* Main routes */}
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        
        {/* Property Book routes */}
        <Route path={ROUTES.PROPERTY_BOOK} element={<PropertyBook />} />
        <Route path={ROUTES.HAND_RECEIPTS} element={<PropertyBook />} />
        <Route path={ROUTES.SUB_HAND_RECEIPTS} element={<PropertyBook />} />
        <Route path={ROUTES.PBUSE_VIEW} element={<PropertyBook />} />
        
        {/* Unit Inventory route */}
        <Route path={ROUTES.UNIT_INVENTORY} element={<UnitInventory />} />
        
        {/* Equipment Management routes */}
        <Route path={ROUTES.EQUIPMENT} element={<UnitInventory />} />
        <Route path={ROUTES.VEHICLE_FLEET} element={<UnitInventory />} />
        <Route path={ROUTES.WEAPONS_SYSTEMS} element={<UnitInventory />} />
        <Route path={ROUTES.COMMUNICATIONS} element={<UnitInventory />} />
        <Route path={ROUTES.OPTICS_NVGS} element={<UnitInventory />} />
        <Route path={ROUTES.SENSITIVE_ITEMS} element={<UnitInventory />} />
        <Route path={ROUTES.COEI_BII} element={<UnitInventory />} />
        
        {/* Operations routes */}
        <Route path={ROUTES.OPERATIONS} element={<Dashboard />} />
        <Route path={ROUTES.NTC_ROTATION} element={<Dashboard />} />
        <Route path={ROUTES.TRAINING_EQUIPMENT} element={<Dashboard />} />
        <Route path={ROUTES.DEPLOY_REDEPLOY} element={<Dashboard />} />
        <Route path={ROUTES.FIELD_PLANNING} element={<Dashboard />} />
        
        {/* Transfers routes */}
        <Route path={ROUTES.TRANSFERS} element={<Transfers />} />
        <Route path={ROUTES.INCOMING_TRANSFERS} element={<Transfers />} />
        <Route path={ROUTES.OUTGOING_TRANSFERS} element={<Transfers />} />
        <Route path={ROUTES.LATERAL_TRANSFERS} element={<Transfers />} />
        <Route path={ROUTES.TURN_IN_PROCESS} element={<Transfers />} />
        
        {/* Inventories routes */}
        <Route path={ROUTES.INVENTORIES} element={<UnitInventory />} />
        <Route path={ROUTES.SENSITIVE_INVENTORY} element={<UnitInventory />} />
        <Route path={ROUTES.CYCLIC_INVENTORY} element={<UnitInventory />} />
        <Route path={ROUTES.CHANGE_OF_COMMAND} element={<UnitInventory />} />
        <Route path={ROUTES.CSDP} element={<UnitInventory />} />
        
        {/* Maintenance routes */}
        <Route path={ROUTES.MAINTENANCE} element={<Maintenance />} />
        <Route path={ROUTES.MAINTENANCE_REQUESTS} element={<Maintenance />} />
        <Route path={ROUTES.SERVICE_SCHEDULES} element={<Maintenance />} />
        <Route path={ROUTES.PARTS_ORDERING} element={<Maintenance />} />
        <Route path={ROUTES.DEADLINED_EQUIPMENT} element={<Maintenance />} />
        
        {/* QR Management routes */}
        <Route path={ROUTES.QR_MANAGEMENT} element={<QrManagement />} />
        <Route path={ROUTES.GENERATE_QR} element={<QrManagement />} />
        <Route path={ROUTES.MANAGE_QR} element={<QrManagement />} />
        <Route path={ROUTES.QR_METRICS} element={<QrManagement />} />
        
        {/* Reports routes */}
        <Route path={ROUTES.REPORTS} element={<Reports />} />
        <Route path={ROUTES.COMMAND_REPORTS} element={<Reports />} />
        <Route path={ROUTES.FLIPL} element={<Reports />} />
        <Route path={ROUTES.SUPPLY_ACTIVITY} element={<Reports />} />
        <Route path={ROUTES.READINESS_REPORTING} element={<Reports />} />
        
        {/* Admin routes */}
        <Route path={ROUTES.ADMIN} element={<UserManagement />} />
        <Route path={ROUTES.USER_MANAGEMENT} element={<UserManagement />} />
        <Route path={ROUTES.UNIT_CONFIGURATION} element={<Settings />} />
        <Route path={ROUTES.SYSTEM_INTEGRATIONS} element={<Settings />} />
        
        {/* Support routes */}
        <Route path={ROUTES.SUPPORT} element={<Settings />} />
        <Route path={ROUTES.TRAINING_MATERIALS} element={<Settings />} />
        <Route path={ROUTES.SOPS_REGULATIONS} element={<Settings />} />
        <Route path={ROUTES.HELP_DESK} element={<Settings />} />
        <Route path={ROUTES.CONTACT_S4} element={<Settings />} />
        
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
