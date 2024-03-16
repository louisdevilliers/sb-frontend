import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { EntityHeader} from '../components/common/EntityHeader';
import {EntityTable } from '../components/common/EntityTable';
import { useNavigate } from 'react-router-dom';

const EntityShowPage = () => {
  const { entity } = useParams();
  console.log("1 entity showpage:", entity);
  const navigate = useNavigate();
  
  // Example data and columns, replace with your actual data fetching and processing
  //const data = []; // Fetch your data based on the entity
  //const columns = []; // Define your columns based on the entity
  const kleureData = [
    { id: 1, name: 'Red Seedles', code: 'RSL' },
    { id: 2, name: 'Red Seeded', code: 'RSD' },
    // Add more example data as needed
  ];

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'code', label: 'Code' },
    // Define more columns as needed based on your data
  ];
  const handleAddClick = () => navigate(`/${entity}/add`);

  return (
    <Box>
       <EntityHeader entityName={entity} onAddClick={handleAddClick} />
       <EntityTable data={kleureData} columns={columns} />
    </Box>
  );
};

export default EntityShowPage;
