import React from 'react';
import {
  Box,
  Button,
  Tooltip,
  Typography,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  SwapHoriz as TransferIcon,
  Inventory2 as InventoryIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Update as UpdateIcon,
  Add as AddIcon,
  FileDownload as ExportIcon,
  Edit as EditIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';
import { usePropertyBook } from '../context/PropertyBookContext';

interface ActionsToolbarProps {
  disableBorder?: boolean;
}

export const ActionsToolbar: React.FC<ActionsToolbarProps> = ({ disableBorder = false }) => {
  const theme = useTheme();
  const {
    selectedItems,
    openTransferModal,
    openInventoryModal,
    printPropertyBook,
    exportToExcel,
    openAddItemModal,
    generateDA2062,
  } = usePropertyBook();
  
  const hasSelectedItems = selectedItems.length > 0;
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      gap: { xs: 1, md: 2 },
      bgcolor: hasSelectedItems ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
      borderRadius: disableBorder ? 0 : 1,
      border: !disableBorder && hasSelectedItems ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
      transition: 'all 0.2s ease-in-out',
      ...(disableBorder ? {} : { mb: 3, p: hasSelectedItems ? 2 : 1.5 })
    }}>
      {/* Selection indicator */}
      {hasSelectedItems && (
        <>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          }}>
            <Typography variant="body2" fontWeight="medium" color="primary">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </Typography>
          </Box>
        </>
      )}
      
      {/* Group 1: Item-specific actions */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1,
        ml: hasSelectedItems ? 2 : 0 
      }}>
        <Button
          variant={hasSelectedItems ? "contained" : "outlined"}
          startIcon={<TransferIcon />}
          size="small"
          onClick={openTransferModal}
          disabled={!hasSelectedItems}
        >
          Transfer Selected
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<InventoryIcon />}
          size="small"
          onClick={openInventoryModal}
          disabled={!hasSelectedItems}
        >
          Conduct Inventory
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<DocumentIcon />}
          size="small"
          onClick={() => generateDA2062()}
          disabled={!hasSelectedItems}
        >
          Generate DA 2062
        </Button>
      </Box>
      
      {/* Divider between button groups */}
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      
      {/* Group 2: Export/Print actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          size="small"
          onClick={printPropertyBook}
        >
          Print
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ExportIcon />}
          size="small"
          onClick={exportToExcel}
        >
          Export
        </Button>
      </Box>

      {/* Add Item Button - Always available */}
      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        size="medium"
        onClick={openAddItemModal}
      >
        Add New Item
      </Button>
    </Box>
  );
};

export default ActionsToolbar;
