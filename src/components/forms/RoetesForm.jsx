import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import * as Yup from "yup";

// Define the validation schema using Yup
const roetesFormSchema = Yup.object().shape({
  markId: Yup.number().required("mark is required"),
  plekId: Yup.number().required("plek is required"),
});

const RoetesForm = ({ onSubmit }) => {
  const [markte, setMarkte] = useState([]);
  const [plekke, setPlekke] = useState([]);

  useEffect(() => {
    // Fetch Markte & Plekke data from the backend for dropdowns
    fetch("http://localhost:8080/api/markte/list")
      .then((response) => response.json())
      .then((data) => setMarkte(data))
      .catch((error) => console.error("Error fetching markte:", error));

    fetch("http://localhost:8080/api/plekke/list")
      .then((response) => response.json())
      .then((data) => setPlekke(data))
      .catch((error) => console.error("Error fetching plekke:", error));
  }, []);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      markId: "",
      plekId: "", // Initial value for plekke dropdown
    },
    validationSchema: roetesFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted:", values);
      onSubmit(values);
      setSubmitting(false);
    },
  });

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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="markId-label">Mark</InputLabel>
                <Select
                  labelId="markId-label"
                  id="markId"
                  name="markId"
                  value={formik.values.markId}
                  label="Mark"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.markId && Boolean(formik.errors.markId)
                  }
                >
                  {markte.map((mark) => (
                    <MenuItem key={mark.id} value={mark.id}>
                      {mark.naam}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel id="plekId-label">Plek</InputLabel>
                <Select
                  labelId="plekId-label"
                  id="plekId"
                  name="plekId"
                  value={formik.values.plekId}
                  label="Plek"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.plekId && Boolean(formik.errors.plekId)
                  }
                >
                  {plekke.map((plek) => (
                    <MenuItem key={plek.id} value={plek.id}>
                      {plek.naam}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default RoetesForm;
