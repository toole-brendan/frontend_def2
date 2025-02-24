import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { icons } from '../components/layout/Sidebar';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const MyProperty = React.lazy(() => import('../pages/Property'));
const UnitInventory = React.lazy(() => import('../pages/UnitInventory/index'));
const Transfers = React.lazy(() => import('../pages/Transfers'));
const Maintenance = React.lazy(() => import('../pages/Maintenance/index'));
const QrManagement = React.lazy(() => import('../pages/QrManagement/index'));
const Reports = React.lazy(() => import('../pages/Reports/index'));
const UserManagement = React.lazy(() => import('../pages/UserManagement/index'));
const Settings = React.lazy(() => import('../pages/Settings/index'));
const Profile = React.lazy(() => import('../pages/Profile'));

export const ROUTES = {
  DASHBOARD: '/defense/dashboard',
  PROPERTY: '/defense/property',
  UNIT_INVENTORY: '/defense/inventory',
  TRANSFERS: '/defense/transfers',
  MAINTENANCE: '/defense/maintenance',
  QR_MANAGEMENT: '/defense/qr',
  REPORTS: '/defense/reports',
  USERS: '/defense/users',
  SETTINGS: '/defense/settings',
  PROFILE: '/defense/profile',
} as const;

export const NAV_ITEMS = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: icons.DashboardIcon,
  },
  {
    title: 'My Property',
    path: ROUTES.PROPERTY,
    icon: icons.InventoryIcon,
  },
  {
    title: 'Unit Inventory',
    path: ROUTES.UNIT_INVENTORY,
    icon: icons.InventoryIcon,
  },
  {
    title: 'Transfers',
    path: ROUTES.TRANSFERS,
    icon: icons.TransfersIcon,
  },
  {
    title: 'Maintenance',
    path: ROUTES.MAINTENANCE,
    icon: icons.BuildIcon,
  },
  {
    title: 'QR Management',
    path: ROUTES.QR_MANAGEMENT,
    icon: icons.QrCodeIcon,
  },
  {
    title: 'Reports',
    path: ROUTES.REPORTS,
    icon: icons.ReportsIcon,
  },
  {
    title: 'User Management',
    path: ROUTES.USERS,
    icon: icons.UsersIcon,
  },
  {
    title: 'Settings',
    path: ROUTES.SETTINGS,
    icon: icons.SettingsIcon,
  },
];

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        
        {/* Defense routes */}
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.PROPERTY} element={<MyProperty />} />
        <Route path={ROUTES.UNIT_INVENTORY} element={<UnitInventory />} />
        <Route path={ROUTES.TRANSFERS} element={<Transfers />} />
        <Route path={ROUTES.MAINTENANCE} element={<Maintenance />} />
        <Route path={ROUTES.QR_MANAGEMENT} element={<QrManagement />} />
        <Route path={ROUTES.REPORTS} element={<Reports />} />
        <Route path={ROUTES.USERS} element={<UserManagement />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
