import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface HandReceiptItem {
  name: string;
  rank: string;
  itemCount: number;
  subReceipts?: HandReceiptItem[];
}

const handReceiptData: HandReceiptItem = {
  name: "Rodriguez",
  rank: "CPT",
  itemCount: 721,
  subReceipts: [
    {
      name: "Morgan",
      rank: "1LT",
      itemCount: 198,
    },
    {
      name: "Chen",
      rank: "1LT",
      itemCount: 187,
    },
    {
      name: "Williams",
      rank: "1LT",
      itemCount: 201,
    },
    {
      name: "Jackson",
      rank: "1LT",
      itemCount: 135,
    },
  ],
};

interface HandReceiptNodeProps {
  item: HandReceiptItem;
  level?: number;
}

const HandReceiptNode: React.FC<HandReceiptNodeProps> = ({ item, level = 0 }) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <>
      <ListItem
        sx={{
          pl: level * 2,
          borderLeft: level > 0 ? '1px dashed rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <ListItemIcon>
          <PersonIcon color={level === 0 ? 'primary' : 'action'} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" fontWeight="medium">
              {item.rank} {item.name}
            </Typography>
          }
          secondary={`${item.itemCount} items`}
        />
        {item.subReceipts && (
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ ml: 1 }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </ListItem>
      {item.subReceipts && (
        <Collapse in={expanded}>
          <List disablePadding>
            {item.subReceipts.map((subItem, index) => (
              <HandReceiptNode
                key={index}
                item={subItem}
                level={level + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const HandReceiptStructure: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Hand Receipt Structure
        </Typography>
        <Button
          size="small"
          startIcon={<AssignmentIcon />}
          variant="outlined"
        >
          Manage
        </Button>
      </Box>
      <List disablePadding>
        <HandReceiptNode item={handReceiptData} />
      </List>
    </Paper>
  );
};

export default HandReceiptStructure; 