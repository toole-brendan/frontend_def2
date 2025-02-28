import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface CategoryStatus {
  category: string;
  count: number;
  status: string;
  lastVerified: string;
  verificationType: string;
  verifiedBy: string;
}

interface SensitiveItemCategoriesCardProps {
  categories: CategoryStatus[];
  onViewCategoryDetails: (category: string) => void;
}

const SensitiveItemCategoriesCard: React.FC<SensitiveItemCategoriesCardProps> = ({
  categories,
  onViewCategoryDetails
}) => {
  return (
    <Paper elevation={2} sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          Sensitive Item Categories
        </Typography>
      </Box>
      
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Last Verified</TableCell>
              <TableCell>Verification Type</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.category}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight="medium">
                    {category.category}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {category.count}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    icon={<CheckCircleIcon fontSize="small" />}
                    label={category.status}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {category.lastVerified}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">
                      {category.verificationType}
                    </Typography>
                    <Tooltip title={`Verified by ${category.verifiedBy}`}>
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    size="small"
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={() => onViewCategoryDetails(category.category)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SensitiveItemCategoriesCard; 