import React from 'react';
import { useFormik } from 'formik';
import { Container, Button, TextField, Box } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const produsenteFormSchema = Yup.object().shape({
  naam: Yup.string()
    .min(2, 'Naam is too short - should be 2 chars minimum.')
    .required('Naam is required'),
  kode: Yup.string()
    .matches(/^P\d+$/, "Kode must be in the format 'P' followed by numbers")
    .required('Kode is required'),
});

const ProdusenteForm = ({ onSubmit }) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      naam: '',
      kode: '',
    },
    validationSchema: produsenteFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form submitted:', values);
      onSubmit(values); // You should define this function to handle the form submission
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ '& .MuiTextField-root': { mb: 2 } }}>
          <TextField
            fullWidth
            id="naam"
            name="naam"
            label="Produsent"
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
        </Box>
        <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting} fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ProdusenteForm;
