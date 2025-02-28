import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardData } from '../types';

interface UseDashboardProps {
  dashboardData: DashboardData;
}

export const useDashboard = ({ dashboardData }: UseDashboardProps) => {
  const navigate = useNavigate();

  // Handle navigation to different sections of the application
  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Handle starting an inventory
  const handleStartInventory = useCallback(() => {
    console.log("Start inventory clicked");
    // Future implementation: 
    // - Open inventory wizard
    // - Initialize inventory process
    // - Navigate to inventory page
  }, []);

  // Handle viewing all actions
  const handleViewAllActions = useCallback(() => {
    console.log("View all actions clicked");
    navigateTo('/actions');
  }, [navigateTo]);

  // Handle viewing NTC plan
  const handleViewNTCPlan = useCallback(() => {
    console.log("View NTC plan clicked");
    navigateTo('/ntc-plan');
  }, [navigateTo]);

  // Handle viewing all activity
  const handleViewAllActivity = useCallback(() => {
    console.log("View all activity clicked");
    navigateTo('/activity');
  }, [navigateTo]);

  // Handle quick actions
  const handleQuickAction = useCallback((actionType: string) => {
    console.log(`Quick action clicked: ${actionType}`);
    switch (actionType) {
      case 'sensitiveItemInventory':
        navigateTo('/inventory/sensitive-items');
        break;
      case 'signHandReceipts':
        navigateTo('/property/hand-receipts/pending');
        break;
      case 'reviewTransfers':
        navigateTo('/transfers/pending');
        break;
      case 'generateReport':
        navigateTo('/reports/generate');
        break;
      case 'initiateFLIPL':
        navigateTo('/flipl/new');
        break;
      case 'scheduleInventory':
        navigateTo('/inventory/schedule');
        break;
      default:
        console.log(`Unknown action type: ${actionType}`);
    }
  }, [navigateTo]);

  return {
    // Data derived from dashboard data if needed
    
    // Action handlers
    handleStartInventory,
    handleViewAllActions,
    handleViewNTCPlan,
    handleViewAllActivity,
    handleQuickAction
  };
}; 