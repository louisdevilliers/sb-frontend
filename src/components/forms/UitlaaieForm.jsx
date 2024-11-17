import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Container,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";

// Define the validation schema using Yup
const uitlaaieFormSchema = Yup.object().shape({
  markId: Yup.number().required("mark is required"),
  plekId: Yup.number().required("plek is required"),
});

const UitlaaieForm = ({ onSubmit }) => {
  const [roetes, setRoetes] = useState([]);
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    // Fetch Roetes data from the backend for dropdowns
    fetch("http://localhost:8080/api/roetes/list")
      .then((response) => response.json())
      .then((data) => setRoetes(data))
      .catch((error) => console.error("Error fetching roetes:", error));

    fetch("http://localhost:8080/api/palette/list")
      .then((response) => response.json())
      .then((data) => setPalette(data))
      .catch((error) => console.error("Error fetching palette:", error));
  }, []);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      roeteId: "",
      paletId: "",
    },
    validationSchema: uitlaaieFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted:", values);
      onSubmit(values);
      setSubmitting(false);
    },
  });

  const handleRemoveLoad = (index) => {
    console.log("index", index);
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { mb: 2 },
            "& .MuiFormControl-root": { mb: 2 },
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            p={2}
          >
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="roeteId-label">Roete</InputLabel>
                <Select
                  labelId="roeteId-label"
                  id="roeteId"
                  name="roeteId"
                  value={formik.values.roeteId}
                  label="Roete"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.roeteId && Boolean(formik.errors.roeteId)
                  }
                >
                  {roetete.map((roete) => (
                    <MenuItem key={roete.id} value={roete.id}>
                      {roete.naam}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="plekId-label">Palette</InputLabel>
                <Select
                  labelId="plekId-label"
                  id="plekId"
                  name="plekId"
                  value={formik.values.plekId}
                  label="Plek"
                  onChange={formik.handleChange}
                  error={formik.touched.plekId && Boolean(formik.errors.plekId)}
                >
                  {plekke.map((plek) => (
                    <MenuItem key={plek.id} value={plek.id}>
                      {plek.naam}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="delete load"
                onClick={() => handleRemoveLoad(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default UitlaaieForm;
