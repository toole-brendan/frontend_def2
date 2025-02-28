import React, { useState } from 'react';
import {
  Box,
  Typography,
  Badge,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Inventory as InventoryIcon,
  DirectionsCar as VehicleIcon,
  Sensors as CommsIcon,
  Visibility as OpticsIcon,
  Build as ToolsIcon,
  People as PersonnelIcon,
  Fireplace as WeaponsIcon,
} from '@mui/icons-material';

// Define the category type structure
export interface EquipmentCategoryNode {
  id: string;
  name: string;
  count: number;
  children?: EquipmentCategoryNode[];
  icon?: React.ReactNode;
}

// Define the equipment categories hierarchy
const equipmentCategories: EquipmentCategoryNode[] = [
  {
    id: 'weapons',
    name: 'Weapons',
    count: 143,
    icon: <WeaponsIcon />,
    children: [
      { id: 'small-arms', name: 'Small Arms', count: 89 },
      { id: 'crew-served', name: 'Crew-Served', count: 32 },
      { id: 'support-weapons', name: 'Support Weapons', count: 22 },
    ],
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    count: 72,
    icon: <VehicleIcon />,
    children: [
      { id: 'tactical', name: 'Tactical', count: 48 },
      { id: 'trailers', name: 'Trailers', count: 15 },
      { id: 'support', name: 'Support', count: 9 },
    ],
  },
  {
    id: 'communications',
    name: 'Communications',
    count: 128,
    icon: <CommsIcon />,
    children: [
      { id: 'radios', name: 'Radios', count: 64 },
      { id: 'cci', name: 'CCI Items', count: 42 },
      { id: 'comms-accessories', name: 'Accessories', count: 22 },
    ],
  },
  {
    id: 'optics',
    name: 'Optics & NVGs',
    count: 185,
    icon: <OpticsIcon />,
    children: [
      { id: 'night-vision', name: 'Night Vision', count: 95 },
      { id: 'thermal', name: 'Thermal Optics', count: 38 },
      { id: 'day-optics', name: 'Day Optics', count: 52 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Equipment',
    count: 144,
    icon: <ToolsIcon />,
    children: [
      { id: 'maintenance', name: 'Maintenance', count: 82 },
      { id: 'power', name: 'Power Equipment', count: 36 },
      { id: 'field-tools', name: 'Field Tools', count: 26 },
    ],
  },
  {
    id: 'personnel-equipment',
    name: 'Personnel Equipment',
    count: 70,
    icon: <PersonnelIcon />,
    children: [
      { id: 'protective', name: 'Protective Gear', count: 32 },
      { id: 'cta-50', name: 'CTA-50 Items', count: 38 },
    ],
  },
];

interface CategoryItemProps {
  category: EquipmentCategoryNode;
  level: number;
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  level,
  selectedCategory,
  onCategorySelect,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.id;

  const handleClick = () => {
    onCategorySelect(category.id);
    if (hasChildren) {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        sx={{
          pl: level * 2,
          borderRadius: theme.shape.borderRadius,
          mb: 0.5,
          bgcolor: isSelected ? theme.palette.primary.light : 'transparent',
          '&:hover': {
            bgcolor: isSelected ? theme.palette.primary.light : theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary }}>
          {category.icon || (hasChildren ? (open ? <ExpandMoreIcon /> : <ChevronRightIcon />) : null)}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                fontWeight: isSelected ? 'bold' : 'regular',
                color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
              }}
            >
              {category.name}
            </Typography>
          }
        />
        <Badge
          badgeContent={category.count}
          color={isSelected ? 'primary' : 'default'}
          sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}
        />
      </ListItem>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.children!.map((child) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

interface EquipmentCategoryTreeProps {
  onCategorySelect: (categoryId: string) => void;
}

const EquipmentCategoryTree: React.FC<EquipmentCategoryTreeProps> = ({ onCategorySelect }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Equipment Categories
      </Typography>
      <List component="nav" aria-label="equipment categories" dense>
        <ListItem
          button
          onClick={() => handleCategorySelect('all')}
          sx={{
            borderRadius: theme.shape.borderRadius,
            mb: 0.5,
            bgcolor: selectedCategory === 'all' ? theme.palette.primary.light : 'transparent',
            '&:hover': {
              bgcolor: selectedCategory === 'all' ? theme.palette.primary.light : theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: selectedCategory === 'all' ? theme.palette.primary.main : theme.palette.text.secondary }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: selectedCategory === 'all' ? 'bold' : 'regular',
                  color: selectedCategory === 'all' ? theme.palette.primary.main : theme.palette.text.primary,
                }}
              >
                All Equipment
              </Typography>
            }
          />
          <Badge
            badgeContent={742}
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}
          />
        </ListItem>
        {equipmentCategories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            level={0}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        ))}
      </List>
    </Paper>
  );
};

export default EquipmentCategoryTree; 