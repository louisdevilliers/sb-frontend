import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { EntityHeader} from '../components/common/EntityHeader';
import { useNavigate } from 'react-router-dom';
import { entityTableMapping } from '../utility/entityTableMapping'

const EntityShowPage = () => {
  const { entity } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log("1 entity showpage:", entity);
  const navigate = useNavigate();
  const [data, setData] = useState([]); 
  const EntityTableComponent = entityTableMapping[entity] || { columns: [], data: [] };;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/${entity}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data in showpage:", data);
      setData(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Could not fetch data:", error);
      // Handle error state as appropriate
    }
  };
  useEffect(() => {
    fetchData();
  }, [entity]); 
  
  //const handleAddClick = () => navigate(`/${entity}/add`);

  return (
    <>
     <Box>
     <EntityHeader entityName={entity} onAddClick={() => navigate(`/${entity}/add`)} />
     <EntityTableComponent
       data={data}
       page={page}
       rowsPerPage={rowsPerPage}
       handleChangePage={handleChangePage}
       handleChangeRowsPerPage={handleChangeRowsPerPage}
     />
   </Box>
   </>
  );
};

export default EntityShowPage;
