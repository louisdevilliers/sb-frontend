import React from 'react';
import { useFormik } from 'formik';
import { Container, Button, TextField, Box } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const bokseFormSchema = Yup.object().shape({
  naam: Yup.string()
    .min(2, 'Naam is too short - should be 2 chars minimum.')
    .required('Naam is required'),
  grootte: Yup.number()
    .min(0.1, 'Grootte must be greater than 0')
    .required('Grootte is required'),
  kode: Yup.string()
    .min(2, 'Kode is too short')
    .max(5, 'Kode is too long')
    .required('Kode is required'),
  brand: Yup.string()
    .required('Brand is required'),
});

const BokseForm = ({ onSubmit }) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      naam: '',
      grootte: '',
      kode: '',
      brand: '',
    },
    validationSchema: bokseFormSchema,
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
            label="Boks"
            value={formik.values.naam}
            onChange={formik.handleChange}
            error={formik.touched.naam && Boolean(formik.errors.naam)}
            helperText={formik.touched.naam && formik.errors.naam}
          />
          <TextField
            fullWidth
            id="grootte"
            name="grootte"
            label="Grootte"
            type="number"
            value={formik.values.grootte}
            onChange={formik.handleChange}
            error={formik.touched.grootte && Boolean(formik.errors.grootte)}
            helperText={formik.touched.grootte && formik.errors.grootte}
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
          <TextField
            fullWidth
            id="brand"
            name="brand"
            label="Brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
          />
        </Box>
        <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting} fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default BokseForm;
