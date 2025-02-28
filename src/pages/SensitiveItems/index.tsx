import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Alert,
  Button,
  Paper,
  SpeedDial,
  SpeedDialAction,
  Badge,
  LinearProgress,
  Chip,
  List,
  ListItem,
  Accordion,
  AccordionDetails,
  Dialog,
  DialogContent
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import HistoryIcon from '@mui/icons-material/History';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Import our custom container hook
import useSensitiveItemsContainer from './SensitiveItemsContainer';

// Import all component files
import ArmsRoomStatusCard from './components/ArmsRoomStatusCard';
import VerificationStatusCard from './components/VerificationStatusCard';
import MissingItemResponseCard from './components/MissingItemResponseCard';
import HandReceiptAssignmentCard from './components/HandReceiptAssignmentCard';
import SensitiveItemActivityLog from './components/SensitiveItemActivityLog';
import ItemDetailPanel from './components/ItemDetailPanel';
import InventoryExecutionPanel from './components/InventoryExecutionPanel';
import SensitiveItemsHeader from './components/SensitiveItemsHeader';
import SensitiveItemCategoriesCard from './components/SensitiveItemCategoriesCard';
import InventoryScheduleCard from './components/InventoryScheduleCard';

const SensitiveItems: React.FC = () => {
  const container = useSensitiveItemsContainer();
  const [qrScannerOpen, setQrScannerOpen] = React.useState(false);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        {/* Page Title */}
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
          Sensitive Items Management - {container.headerData.companyInfo}
        </Typography>

        {/* Warning Banner */}
        <Alert 
          severity="warning"
          variant="filled" 
          icon={<WarningAmberIcon />}
          sx={{ 
            mb: 3, 
            bgcolor: '#f5a623', // Orange color from screenshot
            '& .MuiAlert-icon': {
              color: 'black'
            },
            '& .MuiAlert-message': {
              color: 'black',
              fontWeight: 500
            },
            '& .MuiAlert-action .MuiButton-root': {
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }}
          action={
            <Button 
              color="inherit" 
              variant="outlined" 
              size="small"
            >
              View Details
            </Button>
          }
        >
          SENSITIVE ITEM INVENTORY REQUIRED: {container.headerData.daysRemaining} DAYS REMAINING
        </Alert>

        {/* Metrics Grid */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Sensitive Items
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 500 }}>
                {container.headerData.totalItems}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Current Status
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: 'success.main', fontWeight: 500 }}>
                {container.headerData.accountedItems}/{container.headerData.totalItems} Accounted For ({Math.round((container.headerData.accountedItems / container.headerData.totalItems) * 100)}%)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last Inventory
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 500 }}>
                {container.headerData.lastInventory}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {container.headerData.lastInventoryOfficer}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Next Required
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: 'error.main', fontWeight: 500 }}>
                {container.headerData.nextRequired}
              </Typography>
              <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'white', px: 1, py: 0.5, borderRadius: 0.5 }}>
                AR 710-2
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={container.handleConductInventory}
            sx={{ 
              bgcolor: '#2196f3',
              '&:hover': {
                bgcolor: '#1976d2'
              }
            }}
          >
            Conduct Inventory
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={container.handlePrintList}
          >
            Print Sensitive Items List
          </Button>
          
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={container.handleReportMissing}
          >
            Report Missing Item
          </Button>
        </Box>

        {/* Verification Alert */}
        <Alert 
          severity="warning"
          variant="filled" 
          icon={<VerifiedIcon />}
          sx={{ mb: 3 }}
          action={
            <Button 
              color="inherit" 
              variant="outlined" 
              size="large"
              startIcon={<QrCodeScannerIcon />}
              onClick={() => setQrScannerOpen(true)}
            >
              Start Verification
            </Button>
          }
        >
          Next verification required by {container.headerData.nextRequired}
        </Alert>

        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2, mb: 3, height: '600px', display: 'flex', flexDirection: 'column' }}>
              {/* Verification Progress */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Verification Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(container.headerData.accountedItems / container.headerData.totalItems) * 100}
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'success.main'
                    }
                  }}
                />
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {container.headerData.accountedItems} of {container.headerData.totalItems} Items Verified
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last verified: {container.headerData.lastInventory}
                  </Typography>
                </Box>
              </Box>

              {/* Serial Number Table */}
              <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                <InventoryExecutionPanel 
                  open={container.inventoryExecutionOpen}
                  items={container.mockSensitiveItems}
                  onClose={() => container.setInventoryExecutionOpen(false)}
                  onCompleteInventory={container.handleCompleteInventory}
                  onPauseInventory={container.handlePauseInventory}
                  onReportDiscrepancy={container.handleReportDiscrepancy}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Side Panel - Verification History */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '600px', overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Verification History
              </Typography>
              <List>
                {container.mockActivityLog.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {activity.activity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.date} {activity.time}
                      </Typography>
                      <Typography variant="body2">
                        {activity.personnel} - {activity.items}
                      </Typography>
                      <Chip 
                        label={activity.status} 
                        color={activity.status === 'Complete' ? 'success' : 'warning'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Emergency Protocol Card */}
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <MissingItemResponseCard 
            emergencyContacts={container.mockEmergencyContacts}
            onInitiateMissingItemProtocol={container.handleInitiateMissingItemProtocol}
          />
        </Paper>

        {/* Quick Action Speed Dial */}
        <SpeedDial
          ariaLabel="Verification Actions"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<VerifiedIcon />}
        >
          <SpeedDialAction
            icon={<QrCodeScannerIcon />}
            tooltipTitle="Scan QR Code"
            onClick={() => setQrScannerOpen(true)}
          />
          <SpeedDialAction
            icon={<WarningIcon />}
            tooltipTitle="Report Missing"
            onClick={container.handleReportMissing}
          />
          <SpeedDialAction
            icon={<HistoryIcon />}
            tooltipTitle="View History"
            onClick={container.handleViewCompleteLog}
          />
        </SpeedDial>

        {/* QR Scanner Modal */}
        <Dialog
          open={qrScannerOpen}
          onClose={() => setQrScannerOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Scan Sensitive Item QR Code
            </Typography>
            <Box sx={{ height: 400, bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCodeScannerIcon sx={{ fontSize: 100, color: 'grey.400' }} />
            </Box>
          </DialogContent>
        </Dialog>

        {/* Item Detail Panel */}
        {container.selectedItem && (
          <ItemDetailPanel
            open={container.itemDetailOpen}
            item={{
              id: container.selectedItem.id,
              category: container.selectedItem.category,
              nomenclature: container.selectedItem.nomenclature,
              serialNumber: container.selectedItem.serialNumber,
              nsn: "1005-01-567-8910",
              lin: "L12345",
              model: "M4A1",
              manufacturer: "Colt",
              value: 1254.00,
              components: [
                { name: "Combat Optic", serialNumber: "C123456", status: "Present" },
                { name: "Magazine Pouch", serialNumber: "P654321", status: "Present" }
              ],
              verificationHistory: [
                { date: "25FEB2025", verifier: "1LT Chen", status: "Verified", comments: "All verified" },
                { date: "24FEB2025", verifier: "SSG Wilson", status: "Verified", comments: "Verified" }
              ],
              transferHistory: [
                { date: "20JAN2025", from: "SSG Adams", to: "1LT Chen", reason: "New assignment", documentNumber: "HR-2025-001" }
              ],
              maintenanceHistory: [
                { date: "10JAN2025", type: "Preventive Maintenance", technician: "SPC Lopez", resolution: "No issues found" }
              ],
              securityRequirements: [
                { requirement: "Double lock storage", category: "Storage" },
                { requirement: "24-hour surveillance", category: "Storage" }
              ]
            }}
            onClose={() => container.setItemDetailOpen(false)}
            onVerifyItem={container.handleVerifyItem}
            onTransferItem={container.handleTransferItem}
            onReportIssue={container.handleReportIssue}
            onRequestMaintenance={container.handleRequestMaintenance}
          />
        )}
      </Box>
    </Container>
  );
};

export default SensitiveItems; 