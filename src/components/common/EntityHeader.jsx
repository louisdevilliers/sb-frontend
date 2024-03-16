import { Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const EntityHeader = ({ entityName, onAddClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h4">{entityName}</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
        Add {entityName}
      </Button>
    </Box>
  );
};
