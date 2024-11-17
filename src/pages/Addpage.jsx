import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import EntityForm from "../components/common/EntityForm";
import { createEntity } from "../services/entityService";

const EntityAddPage = () => {
  const { entity } = useParams();
  console.log("2 in add page, entity:", entity);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createEntity(entity, formData);
      console.log(`${entity} successfully added!`);
      navigate(`/${entity}/show`);
    } catch (error) {
      console.error(`Failed to add ${entity}:`, error);
      // add set err
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add new {entity}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/${entity}/show`)}
        >
          Back to {entity}
        </Button>
      </Box>
      <EntityForm entity={entity} onSubmit={handleSubmit} />
    </Box>
  );
};

export default EntityAddPage;
