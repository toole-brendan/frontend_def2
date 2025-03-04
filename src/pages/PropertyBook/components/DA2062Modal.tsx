import React, { useState } from 'react';
import { Dialog, DialogContent, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Grid, TextField, IconButton, useTheme, TableFooter,  } from '@mui/material';
import {
  Print as PrintIcon,
  Close as CloseIcon,
  FileDownload as DownloadIcon,
  Description as FormIcon,
} from '@mui/icons-material';
import { PropertyItem } from '../types';
;

interface DA2062ModalProps {
  open: boolean;
  onClose: () => void;
  items: PropertyItem[];
}

export const DA2062Modal: React.FC<DA2062ModalProps> = ({ open, onClose, items }) => {
  const theme = useTheme();
  const [issuer, setIssuer] = useState("B Company, 2-87 Infantry");
  const [receiver, setReceiver] = useState("");
  const [receiptNumber, setReceiptNumber] = useState(`HR-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
  
  // Generate page numbers
  const totalPages = Math.ceil(items.length / 20); // Assume 20 items per page
  // @ts-ignore - Unused variable intentionally kept
  const [currentPage, _setCurrentPage] = useState(1);

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Mock download functionality
  const handleDownload = () => {
    alert('DA Form 2062 downloaded');
    // In a real implementation, this would generate a PDF or document for download
  };
  
  // Table cell border style - always black regardless of theme
  const cellBorder = '1px solid #000';
  const formBackgroundColor = 'white'; // Always white regardless of theme 
  const formTextColor = '#000';        // Always black text regardless of theme
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { 
          minHeight: '80vh',
          maxWidth: '850px',
          margin: 'auto',
          bgcolor: theme.palette.mode === 'dark' ? 'rgb(18, 18, 18)' : 'white',
          '@media print': {
            width: '100%',
            height: 'auto',
            minHeight: 'auto'
          }
        }
      }}
    >
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#222',
        color: 'white',
        p: 2,
        '@media print': { display: 'none' }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormIcon />
          <Typography variant="h6">DA FORM 2062 - HAND RECEIPT</Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ p: 0, bgcolor: formBackgroundColor }}>
        <Box sx={{ p: { xs: 1, sm: 2 }, '@media print': { p: 0 } }}>
          {/* The Form */}
          <TableContainer sx={{ 
            border: cellBorder, 
            borderBottom: 'none',
            bgcolor: formBackgroundColor,
            '@media print': { 
              marginTop: '10px' 
            } 
          }}>
            {/* Header Row */}
            <Table size="small" sx={{ 
              tableLayout: 'fixed',
              '& th, & td': { 
                border: cellBorder,
                padding: '4px 6px',
                fontSize: '0.75rem',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                color: formTextColor,
                bgcolor: formBackgroundColor
              }
            }}>
              <TableHead>
                <TableRow>
                  <TableCell 
                    colSpan={1} 
                    sx={{ 
                      width: '280px', 
                      backgroundColor: formBackgroundColor,
                      borderBottom: 'none',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">HAND RECEIPT/ANNEX NUMBER</Typography>
                    <Typography variant="caption" display="block">For use of this form, see DA PAM 710-2-1.</Typography>
                    <Typography variant="caption" display="block">The proponent agency is ODCSLOG.</Typography>
                  </TableCell>
                  <TableCell 
                    colSpan={1} 
                    sx={{ 
                      width: '280px', 
                      borderBottom: 'none',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">FROM:</Typography>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      value={issuer}
                      onChange={(e) => setIssuer(e.target.value)}
                      InputProps={{
                        disableUnderline: true
                      }}
                      sx={{
                        mt: 1
                      }}
                    />
                  </TableCell>
                  <TableCell 
                    colSpan={1} 
                    sx={{ 
                      width: '280px', 
                      borderBottom: 'none',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">TO:</Typography>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                      InputProps={{
                        disableUnderline: true
                      }}
                      sx={{
                        mt: 1
                      }}
                    />
                  </TableCell>
                  <TableCell 
                    colSpan={1} 
                    sx={{ 
                      width: '150px', 
                      backgroundColor: formBackgroundColor,
                      borderBottom: 'none',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">HAND RECEIPT NUMBER</Typography>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      InputProps={{
                        disableUnderline: true
                      }}
                      sx={{
                        mt: 1
                      }}
                    />
                  </TableCell>
                </TableRow>
                
                {/* Second header row */}
                <TableRow>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '40px',
                      p: 0,
                      verticalAlign: 'top'
                    }}
                  >
                    <Box sx={{ p: 1 }}>
                      <Typography fontWeight="bold" variant="caption">FOR ANNEX ONLY</Typography>
                    </Box>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '200px',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">END ITEM STOCK NUMBER</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">END ITEM DESCRIPTION</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption" display="block">PUBLICATION NUMBER</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '100px',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">PUBLICATION DATE</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '60px',
                      verticalAlign: 'top'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">QUANTITY</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              
              {/* Main table headers */}
              <TableHead>
                <TableRow>
                  <TableCell 
                    colSpan={2}
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '240px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">STOCK NUMBER</Typography>
                    <Typography variant="caption" display="block">a.</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">ITEM DESCRIPTION</Typography>
                    <Typography variant="caption" display="block">b.</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '30px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">*</Typography>
                    <Typography variant="caption" display="block">c.</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '30px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">SEC</Typography>
                    <Typography variant="caption" display="block">d.</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '30px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">UI</Typography>
                    <Typography variant="caption" display="block">e.</Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      width: '40px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption" display="block">QTY</Typography>
                    <Typography fontWeight="bold" variant="caption" display="block">AUTH</Typography>
                    <Typography variant="caption" display="block">f.</Typography>
                  </TableCell>
                  <TableCell 
                    colSpan={6}
                    sx={{ 
                      backgroundColor: formBackgroundColor,
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontWeight="bold" variant="caption">QUANTITY</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption">A</Typography>
                      <Typography variant="caption">B</Typography>
                      <Typography variant="caption">C</Typography>
                      <Typography variant="caption">D</Typography>
                      <Typography variant="caption">E</Typography>
                      <Typography variant="caption">F</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              
              {/* Table body */}
              <TableBody sx={{ 
                '& tr': { 
                  borderBottom: cellBorder
                },
                '& tr:last-child': {
                  borderBottom: 'none'
                }
              }}>
  // @ts-ignore - Unused variable intentionally kept
                {items.map((item, _index) => (
                  <TableRow key={item.id} sx={{ height: 36 }}>
                    <TableCell colSpan={2} sx={{ fontSize: '0.75rem', py: 1 }}>
                      {item.nsn}<br/>
                      <Typography variant="caption" color="text.secondary">
                        {item.lin}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', py: 1 }}>
                      {item.nomenclature}
                      {item.isSensitive && (
                        <Typography variant="caption" color="error" display="block">
                          SENSITIVE ITEM
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" sx={{ fontSize: '0.75rem' }}>{item.qtyAuth}</TableCell>
                    <TableCell align="center" sx={{ fontSize: '0.75rem' }}>{item.qtyOnHand}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
                
                {/* Fill empty rows up to 15 rows total for consistent form size */}
                {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, i) => (
                  <TableRow key={`empty-${i}`} sx={{ height: 36 }}>
                    <TableCell colSpan={2}>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            
              {/* Footer section */}
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={12} sx={{ py: 1 }}>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="caption" fontWeight="bold">* WHEN USED AS A:</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={12} sx={{ py: 0.5 }}>
                    <Grid container spacing={1} sx={{ ml: 3 }}>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          HAND RECEIPT, enter Hand Receipt Annex Number
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          HAND RECEIPT FOR QUARTERS FURNITURE, enter Condition Codes
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          HAND RECEIPT ANNEX/COMPONENTS RECEIPT, enter Accounting Requirements Code (ARC).
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          
          {/* Form footer */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
            pb: 1,
            border: cellBorder,
            borderTop: 'none',
            bgcolor: formBackgroundColor,
            color: formTextColor,
            px: 1,
            py: 2
          }}>
            <Typography variant="caption" fontWeight="bold">
              DA FORM 2062, JAN 1982
            </Typography>
            <Typography variant="caption">
              EDITION OF JAN 58 IS OBSOLETE
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
                APD AEM v5.00
              </Typography>
              <Typography variant="caption">
                PAGE {currentPage} OF {totalPages} PAGES
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      {/* Action buttons - hidden during print */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        p: 2, 
        bgcolor: '#222',
        '@media print': { display: 'none' }
      }}>
        <Button 
          variant="text"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ color: 'white', mr: 2 }}
        >
          Print
        </Button>
        <Button 
          variant="text"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ color: 'white', mr: 2 }}
        >
          Download
        </Button>
        <Button 
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default DA2062Modal;
