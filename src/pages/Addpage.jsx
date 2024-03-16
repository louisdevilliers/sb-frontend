import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import  EntityForm from '../components/common/EntityForm'; // Assuming you have a generic EntityForm component

const EntityAddPage = () => {
  const { entity } = useParams();
  console.log('2 in add page, entity:', entity);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    // Here is where you make the POST request to the server
    console.log(`5 Submitting ${entity} - post request`, formData);
    // Replace with your actual POST request logic:
    // await axios.post('/api/entity', formData);
    navigate(`/${entity}/show`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Add new {entity}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(`/${entity}/show`)}>
          Back to {entity}
        </Button>
      </Box>
      <EntityForm entity={entity} onSubmit={handleSubmit} />
    </Box>
  );
};

export default EntityAddPage;
