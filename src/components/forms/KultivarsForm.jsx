import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Container, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const kultivarsFormSchema = Yup.object().shape({
  naam: Yup.string()
    .min(2, 'Naam is too short - should be 2 chars minimum.')
    .required('Naam is required'),
  kode: Yup.string()
    .max(3, 'Kode must be 3 letters')
    .required('Kode is required'),
  kleurId: Yup.number()
    .required('Kleurgroep is required'),
});

const KultivarsForm = ({ onSubmit }) => {
  const [kleure, setKleure] = useState([]);

  useEffect(() => {
    // Fetch Kleure data from the backend
    fetch('http://localhost:8080/api/kleure/list')
      .then(response => response.json())
      .then(data => setKleure(data))
      .catch(error => console.error('Error fetching kleure:', error));
  }, []);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      naam: '',
      kode: '',
      kleurId: '', // Initial value for Kleurgroep dropdown
    },
    validationSchema: kultivarsFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form submitted:', values);
      onSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="sm">
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ '& .MuiTextField-root': { mb: 2 }, '& .MuiFormControl-root': { mb: 2 } }}>
        <TextField
          fullWidth
          id="naam"
          name="naam"
          label="Kultivar"
          value={formik.values.naam}
          onChange={formik.handleChange}
          error={formik.touched.naam && Boolean(formik.errors.naam)}
          helperText={formik.touched.naam && formik.errors.naam}
        />
        <TextField
          fullWidth
          id="kode"
          name="kode"
          label="Kode"
          value={formik.values.kode}
          onChange={formik.handleChange}
          error={formik.touched.kode && Boolean(formik.errors.kode)}
          helperText={formik.touched.kode && formik.errors.kode}
        />
        <FormControl fullWidth>
          <InputLabel id="kleurId-label">Kleurgroep</InputLabel>
          <Select
            labelId="kleurId-label"
            id="kleurId"
            name="kleurId"
            value={formik.values.kleurId}
            label="Kleurgroep"
            onChange={formik.handleChange}
            error={formik.touched.kleurId && Boolean(formik.errors.kleurId)}
          >
            {kleure.map((kleur) => (
              <MenuItem key={kleur.id} value={kleur.id}>
                {kleur.naam}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </Box>
    </form>
    </Container>
  );
};

export default KultivarsForm;
