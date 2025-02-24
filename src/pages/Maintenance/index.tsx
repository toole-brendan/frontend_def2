import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Badge,
  Paper,
  Grid,
  useTheme,
  Snackbar,
  Alert,
  Container,
  styled,
} from '@mui/material';
import {
  Wrench,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Plus,
} from 'lucide-react';
import PageTitle from '../../components/common/PageTitle';

import { MetricCard } from './components/MetricCard';
import { MaintenanceFilters } from './components/MaintenanceFilters';
import { MaintenanceTable } from './components/MaintenanceTable';
import { MaintenanceChart } from './components/MaintenanceChart';
import { RequestMaintenanceModal } from './components/RequestMaintenanceModal';
import { MaintenanceDetailsModal } from './components/MaintenanceDetailsModal';
import { BlockchainRecordModal } from './components/BlockchainRecordModal';
import { GenerateDA2404Modal } from './components/GenerateDA2404Modal';
import { MaintenanceTask, MaintenanceStatus } from './types';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

// Mock data - replace with actual API calls
const MOCK_METRICS = {
  totalScheduled: {
    value: '15',
    change: {
      value: '+2',
      timeframe: 'since yesterday',
      isPositive: false
    }
  },
  inProgress: {
    value: '5',
    change: {
      value: '-1',
      timeframe: 'this week',
      isPositive: true
    }
  },
  completedThisMonth: {
    value: '20',
    change: {
      value: '+5',
      timeframe: 'vs last month',
      isPositive: true
    }
  },
  overdueTasks: {
    value: '2',
    change: {
      value: '+1',
      timeframe: 'this week',
      isPositive: false
    }
  },
  avgCompletionTime: {
    value: '3 days',
    change: {
      value: '-0.5 days',
      timeframe: 'this month',
      isPositive: true
    }
  }
};

// Mock maintenance task data
const MOCK_TASKS: MaintenanceTask[] = [
  {
    id: '1',
    title: 'Annual Vehicle Inspection',
    description: 'Perform comprehensive annual inspection of vehicle systems and components.',
    status: 'pending_approval',
    priority: 'routine',
    category: 'preventive',
    equipment: {
      id: 'eq1',
      name: 'HMMWV M1151A1',
      serialNumber: 'HMM-2023-001',
      category: 'Vehicle',
      location: 'Motor Pool A',
    },
    assignedPersonnel: [
      {
        id: 'p1',
        name: 'John Smith',
        role: 'Lead Mechanic',
        contact: '555-0101',
      },
    ],
    timeline: [
      {
        date: new Date().toISOString(),
        action: 'Maintenance Requested',
        user: 'SGT Johnson',
        status: 'pending',
      },
    ],
    startDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    partsRequired: [
      {
        id: 'pt1',
        name: 'Oil Filter',
        quantity: 1,
        status: 'available',
      },
    ],
    blockchainRecords: [
      {
        hash: '0x1234567890abcdef1234567890abcdef12345678',
        timestamp: new Date().toISOString(),
        action: 'Maintenance Request Created',
      },
    ],
    attachments: [
      {
        id: 'a1',
        name: 'Inspection Checklist',
        type: 'PDF',
        url: '/documents/checklist.pdf',
      },
    ],
    notes: [
      'Initial inspection request submitted',
      'Awaiting approval from maintenance officer',
    ],
  },
  {
    id: '2',
    title: 'Generator Maintenance',
    description: 'Scheduled maintenance for backup power generator.',
    status: 'scheduled',
    priority: 'urgent',
    category: 'preventive',
    equipment: {
      id: 'eq2',
      name: 'MEP-803A Generator',
      serialNumber: 'GEN-2023-002',
      category: 'Power Equipment',
      location: 'Building 4',
    },
    assignedPersonnel: [],
    timeline: [],
    startDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    partsRequired: [],
    blockchainRecords: [],
    attachments: [],
    notes: [],
  },
  {
    id: '3',
    title: 'Radio Repair',
    description: 'Repair malfunctioning communication equipment.',
    status: 'in_progress',
    priority: 'emergency',
    category: 'corrective',
    equipment: {
      id: 'eq3',
      name: 'AN/PRC-117G',
      serialNumber: 'RAD-2023-003',
      category: 'Communications',
      location: 'Comms Room',
    },
    assignedPersonnel: [],
    timeline: [],
    startDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    partsRequired: [],
    blockchainRecords: [],
    attachments: [],
    notes: [],
  },
  {
    id: '4',
    title: 'Vehicle Oil Change',
    description: 'Completed routine maintenance.',
    status: 'completed',
    priority: 'routine',
    category: 'preventive',
    equipment: {
      id: 'eq4',
      name: 'M1083 MTV',
      serialNumber: 'MTV-2023-004',
      category: 'Vehicle',
      location: 'Motor Pool B',
    },
    assignedPersonnel: [],
    timeline: [],
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completionDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    partsRequired: [],
    blockchainRecords: [],
    attachments: [],
    notes: [],
  },
];

const Maintenance: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBlockchainModalOpen, setIsBlockchainModalOpen] = useState(false);
  const [isDA2404ModalOpen, setIsDA2404ModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Filter tasks based on active tab
  const getFilteredTasks = () => {
    const statusMap: Record<number, MaintenanceStatus> = {
      0: 'pending_approval',
      1: 'scheduled',
      2: 'in_progress',
      3: 'completed'
    };
    
    return MOCK_TASKS.filter(task => task.status === statusMap[activeTab]);
  };

  // Get counts for badge numbers
  const getStatusCount = (status: MaintenanceStatus) => {
    return MOCK_TASKS.filter(task => task.status === status).length;
  };

  const handleMaintenanceAction = (action: 'approve' | 'reject' | 'complete' | 'cancel', task: MaintenanceTask) => {
    console.log('Maintenance action:', action, task);
    // Implement maintenance actions
  };

  const handleViewDetails = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleViewBlockchain = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsBlockchainModalOpen(true);
  };

  const handleGenerateDA2404 = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsDA2404ModalOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <PageTitle variant="h4" gutterBottom>
            MAINTENANCE
          </PageTitle>
          <Typography variant="body2" color="text.secondary">
            Track and manage equipment maintenance tasks and service records
          </Typography>
        </Box>

        {/* Metrics Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2.4}>
              <MetricCard
                title="Scheduled Tasks"
                metric={MOCK_METRICS.totalScheduled}
                icon={<Calendar />}
                color={theme.palette.info.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <MetricCard
                title="In Progress"
                metric={MOCK_METRICS.inProgress}
                icon={<Wrench />}
                color={theme.palette.warning.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <MetricCard
                title="Completed"
                metric={MOCK_METRICS.completedThisMonth}
                icon={<CheckCircle />}
                color={theme.palette.success.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <MetricCard
                title="Overdue"
                metric={MOCK_METRICS.overdueTasks}
                icon={<AlertTriangle />}
                color={theme.palette.error.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <MetricCard
                title="Avg. Completion Time"
                metric={MOCK_METRICS.avgCompletionTime}
                icon={<Clock />}
                color={theme.palette.primary.main}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab
              label={
                <Badge badgeContent={getStatusCount('pending_approval')} color="warning">
                  Pending Approval
                </Badge>
              }
            />
            <Tab
              label={
                <Badge badgeContent={getStatusCount('scheduled')} color="info">
                  Scheduled
                </Badge>
              }
            />
            <Tab
              label={
                <Badge badgeContent={getStatusCount('in_progress')} color="primary">
                  In Progress
                </Badge>
              }
            />
            <Tab
              label={
                <Badge badgeContent={getStatusCount('completed')} color="success">
                  Completed
                </Badge>
              }
            />
          </Tabs>
        </Box>

        {/* Main Content */}
        <DashboardCard>
          <div className="card-header">
            <Typography variant="h6">MAINTENANCE TASKS</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Plus />}
                onClick={() => setIsRequestModalOpen(true)}
              >
                Request Maintenance
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileText />}
                onClick={() => setIsDA2404ModalOpen(true)}
              >
                Generate DA 2404
              </Button>
            </Box>
          </div>
          <div className="card-content">
            <MaintenanceFilters
              filters={{}}
              onFiltersChange={() => {}}
            />
            <Box sx={{ mt: 3 }}>
              <MaintenanceChart />
            </Box>
            <Box sx={{ mt: 3 }}>
              <MaintenanceTable
                tasks={getFilteredTasks()}
                selectedTask={selectedTask}
                onSelectTask={setSelectedTask}
                onApprove={(task) => handleMaintenanceAction('approve', task)}
                onReject={(task) => handleMaintenanceAction('reject', task)}
                onComplete={(task) => handleMaintenanceAction('complete', task)}
                onCancel={(task) => handleMaintenanceAction('cancel', task)}
                onViewDetails={handleViewDetails}
                onViewBlockchain={handleViewBlockchain}
                onGenerateDA2404={handleGenerateDA2404}
              />
            </Box>
          </div>
        </DashboardCard>

        {/* Modals */}
        <RequestMaintenanceModal
          open={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          onSubmit={(data) => {
            console.log('Submit maintenance request:', data);
            setIsRequestModalOpen(false);
          }}
        />
        <MaintenanceDetailsModal
          open={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          task={selectedTask}
        />
        <BlockchainRecordModal
          open={isBlockchainModalOpen}
          onClose={() => setIsBlockchainModalOpen(false)}
          task={selectedTask}
        />
        <GenerateDA2404Modal
          open={isDA2404ModalOpen}
          onClose={() => setIsDA2404ModalOpen(false)}
          task={selectedTask}
          onGenerate={(data) => {
            console.log('Generate DA 2404:', data);
            setIsDA2404ModalOpen(false);
          }}
        />

        {/* Snackbar */}
        <Snackbar
          open={showWarning}
          autoHideDuration={6000}
          onClose={() => setShowWarning(false)}
        >
          <Alert severity="warning" onClose={() => setShowWarning(false)}>
            Some required parts are not available for this maintenance task.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Maintenance; 