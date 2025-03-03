import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

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
    <Box sx={{ p: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'grey.500' }}>Category</TableCell>
              <TableCell align="center" sx={{ color: 'grey.500' }}>Count</TableCell>
              <TableCell align="center" sx={{ color: 'grey.500' }}>Status</TableCell>
              <TableCell sx={{ color: 'grey.500' }}>Last Verified</TableCell>
              <TableCell sx={{ color: 'grey.500' }}>Verification Type</TableCell>
              <TableCell align="center" sx={{ color: 'grey.500' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{category.category}</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>{category.count}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={category.status}
                    size="small"
                    sx={{
                      bgcolor: category.status === 'VERIFIED' ? '#22C55E' : '#EF4444',
                      color: 'white'
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {category.lastVerified}
                  <Typography variant="caption" component="div" sx={{ color: 'grey.500' }}>
                    {category.verifiedBy}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{category.verificationType}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => onViewCategoryDetails(category.category)}
                    sx={{ color: 'white' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SensitiveItemCategoriesCard; 