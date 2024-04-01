import React from 'react';
import { useFormik } from 'formik';
import { Container, Button, TextField, Box } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const tipesFormSchema = Yup.object().shape({
  type: Yup.string()
    .required('Tipe transaksie is required'),
});

const TipesForm = ({ onSubmit }) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      type: '',
    },
    validationSchema: tipesFormSchema,
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
            id="type"
            name="type"
            label="Tipe transaksie"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting} fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default TipesForm;
