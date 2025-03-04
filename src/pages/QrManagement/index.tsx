import React, { useState } from 'react';
import { PageContainer, PageHeader } from '../../components/layout';
import { TabValue } from './types';
import {
  QrMetricsHeader,
  QrTabNavigation,
  TabPanel,
  GenerateQrCodeTab,
  PrintQrCodesTab,
  ManageQrCodesTab,
  DamagedQrCodesTab
} from './components';

/**
 * QR Management page
 * Manages QR code generation, printing, management, and damaged code reporting
 */
const QrManagement: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>('generate');
  
  // Metrics data for the header
  const metrics = {
    totalActive: 721,
    unassigned: 15,
    damaged: 7
  };
  
  const handleTabChange = (value: TabValue) => {
    setCurrentTab(value);
  };

  return (
    <PageContainer
      header={
        <PageHeader 
          title="QR Code Management"
          children={null}
        />
      }
    >
      {/* Tab Navigation */}
      <QrTabNavigation 
        currentTab={currentTab} 
        onChange={handleTabChange} 
      />
      
      {/* Tab Panels */}
      <TabPanel value={currentTab} index="generate">
        <GenerateQrCodeTab />
      </TabPanel>
      
      <TabPanel value={currentTab} index="print">
        <PrintQrCodesTab />
      </TabPanel>
      
      <TabPanel value={currentTab} index="manage">
        <ManageQrCodesTab />
      </TabPanel>
      
      <TabPanel value={currentTab} index="damaged">
        <DamagedQrCodesTab />
      </TabPanel>
    </PageContainer>
  );
};

export default QrManagement;
