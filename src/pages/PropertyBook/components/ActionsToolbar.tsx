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
import { 
  buttonSx, 
  actionButtonSx,
  toolbarContainerSx,
  selectionIndicatorSx 
} from '../../../theme/patterns';

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
    <Box sx={toolbarContainerSx(theme, hasSelectedItems, disableBorder)}>
      {/* Selection indicator */}
      {hasSelectedItems && (
        <>
          <Box sx={selectionIndicatorSx(theme)}>
            <Typography variant="body2" fontWeight="medium" color="primary">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </Typography>
          </Box>
        </>
      )}
      
      {/* Primary actions */}
      <Box sx={{ display: 'flex', gap: { xs: 1, md: 1.5 }, flexWrap: 'wrap' }}>
        {/* Only show these buttons if items are selected */}
        {hasSelectedItems && (
          <>
            <Button
              startIcon={<TransferIcon />}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => openTransferModal()}
              sx={actionButtonSx}
            >
              Transfer
            </Button>
            
            <Button
              startIcon={<InventoryIcon />}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => openInventoryModal()}
              sx={actionButtonSx}
            >
              Inventory
            </Button>
            
            <Button
              startIcon={<DocumentIcon />}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => generateDA2062()}
              sx={actionButtonSx}
            >
              DA 2062
            </Button>
            
            <Divider orientation="vertical" flexItem />
          </>
        )}
        
        <Button
          startIcon={<AddIcon />}
          size="small"
          variant="contained"
          sx={actionButtonSx}
          onClick={() => openAddItemModal()}
        >
          Add Item
        </Button>
        
        <Tooltip title="Export to Excel">
          <Button
            startIcon={<ExportIcon />}
            size="small"
            variant="outlined"
            sx={actionButtonSx}
            onClick={() => exportToExcel()}
          >
            Export
          </Button>
        </Tooltip>
        
        <Tooltip title="Print Property Book">
          <Button
            startIcon={<PrintIcon />}
            size="small"
            variant="outlined"
            sx={actionButtonSx}
            onClick={() => printPropertyBook()}
          >
            Print
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ActionsToolbar;
