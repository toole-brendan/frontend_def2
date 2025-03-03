import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Typography, Box } from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

export interface Category {
  id: string;
  name: string;
  count: number;
  children?: Category[];
}

export interface EquipmentCategoryTreeProps {
  onCategorySelect: (categoryId: string) => void;
  categories: Category[];
}

export const EquipmentCategoryTree: React.FC<EquipmentCategoryTreeProps> = ({
  onCategorySelect,
  categories
}) => {
  const renderTree = (nodes: Category[]) => (
    nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        onClick={() => onCategorySelect(node.id)}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">{node.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {node.count}
            </Typography>
          </Box>
        }
      >
        {node.children && renderTree(node.children)}
      </TreeItem>
    ))
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{ flexGrow: 1 }}
    >
      {renderTree(categories)}
    </TreeView>
  );
};

export default EquipmentCategoryTree; 