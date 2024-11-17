import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { EntityHeader } from "../components/common/EntityHeader";
import { useNavigate } from "react-router-dom";
import { entityTableMapping } from "../utility/entityTableMapping";
import { fetchEntityTableData } from "../services/entityService";

const EntityShowPage = () => {
  const { entity } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log("1 entity showpage:", entity);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const EntityTableComponent = entityTableMapping[entity] || {
    columns: [],
    data: [],
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const tableData = await fetchEntityTableData(entity);
      console.log(`Fetched data for ${entity}:`, tableData);
      setData(tableData);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching table data for ${entity}:`, error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch data on component mount or when the entity changes
  useEffect(() => {
    fetchData();
  }, [entity]);

  //const handleAddClick = () => navigate(`/${entity}/add`);

  return (
    <>
      <Box>
        <EntityHeader
          entityName={entity}
          onAddClick={() => navigate(`/${entity}/add`)}
        />
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
