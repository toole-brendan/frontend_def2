import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  ChevronRight as ChevronRightIcon,
  Article as ArticleIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { InventoryManagementTable, InventoryExecutionPanel } from '../components';

interface ActiveInventoriesTabProps {
  activeInventory: string | null;
  onStartInventory: (inventoryId: string) => void;
}

const ActiveInventoriesTab: React.FC<ActiveInventoriesTabProps> = ({ 
  activeInventory, 
  onStartInventory 
}) => {
  const theme = useTheme();
  const [selectedInventory, setSelectedInventory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState<string | null>(null);

  React.useEffect(() => {
    // When activeInventory is set from parent, sync it with local state
    if (activeInventory) {
      setSelectedInventory(activeInventory);
    }
  }, [activeInventory]);

  const handleInventorySelect = (inventoryId: string) => {
    setSelectedInventory(inventoryId === selectedInventory ? null : inventoryId);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = (type: string) => {
    setFilterType(prevType => prevType === type ? null : type);
  };

  const handleClosePanel = () => {
    setSelectedInventory(null);
  };

  // Filter types for quick filtering
  const filterTypes = [
    'Sensitive Items',
    'Weapons',
    'Vehicles',
    'Comms',
    'In Progress',
    'Scheduled',
    'Due Soon'
  ];

  return (
    <Box>
      {/* Search and Filters */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          borderRadius: 0
        }}
      >
        <TextField
          placeholder="Search inventories..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ 
            maxWidth: { xs: '100%', md: '350px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: 0
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            flex: 1
          }}
        >
          {filterTypes.map(type => (
            <Chip
              key={type}
              label={type}
              size="small"
              clickable
              color={filterType === type ? 'primary' : 'default'}
              onClick={() => handleFilterClick(type)}
              sx={{
                borderRadius: 0,
                fontWeight: 'medium',
                fontSize: '0.75rem'
              }}
            />
          ))}
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 0,
            minWidth: '180px',
            fontWeight: 'medium',
            letterSpacing: '0.03em'
          }}
        >
          New Inventory
        </Button>
      </Paper>

      {/* Content Area */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {/* Inventory Management Table */}
        <Box sx={{ flex: '1 1 auto', width: '100%' }}>
          <InventoryManagementTable 
            onStartInventory={onStartInventory} 
            onSelectInventory={handleInventorySelect}
            selectedInventory={selectedInventory}
            searchQuery={searchQuery}
            filterType={filterType}
          />
        </Box>

        {/* Selected Inventory Details Panel */}
        {selectedInventory && (
          <Paper
            elevation={0}
            sx={{
              width: { xs: '100%', lg: '380px' },
              flex: '0 0 380px',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              borderRadius: 0,
              p: 0,
              position: 'relative'
            }}
          >
            <Box 
              sx={{ 
                p: 2, 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                Inventory Details
              </Typography>
              <IconButton 
                size="small" 
                onClick={handleClosePanel}
                sx={{ 
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.2),
                  borderRadius: 0
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Box sx={{ p: 2 }}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  INVENTORY ID
                </Typography>
                <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>
                  {selectedInventory}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="overline" color="text.secondary">
                  INVENTORY TYPE
                </Typography>
                <Typography variant="subtitle1">
                  Sensitive Items Inventory
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weekly verification required by AR 710-2
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="overline" color="text.secondary">
                  STATUS
                </Typography>
                <Chip 
                  label="DUE SOON" 
                  color="error" 
                  size="small"
                  sx={{ 
                    borderRadius: 0, 
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Due in 2 days (27 FEB 2025)
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="overline" color="text.secondary">
                  DETAILS
                </Typography>
                <Typography variant="body2">
                  • 24 sensitive items requiring verification
                </Typography>
                <Typography variant="body2">
                  • Last completed: 20 FEB 2025
                </Typography>
                <Typography variant="body2">
                  • Assigned to: CPT Rodriguez
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  fullWidth
                  sx={{
                    borderRadius: 0,
                    fontWeight: 'medium',
                    letterSpacing: '0.03em'
                  }}
                  onClick={() => onStartInventory(selectedInventory)}
                >
                  Start Inventory
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArticleIcon />}
                  fullWidth
                  sx={{
                    borderRadius: 0,
                    fontWeight: 'medium',
                    letterSpacing: '0.03em'
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
      
      {/* Full Execution Panel - shown when actively conducting inventory */}
      {activeInventory && (
        <Box sx={{ mt: 3 }}>
          <InventoryExecutionPanel 
            inventoryId={activeInventory}
            onClose={() => onStartInventory('')}
          />
        </Box>
      )}
    </Box>
  );
};

export default ActiveInventoriesTab; 