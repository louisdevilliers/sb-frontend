import React from 'react';
import { useFormik } from 'formik';
import { Container, Button, TextField, Box } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const vervoerdersFormSchema = Yup.object().shape({
  naam: Yup.string()
    .required('Naam is required'),
});

const VervoerdersForm = ({ onSubmit }) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      naam: '',
    },
    validationSchema: vervoerdersFormSchema,
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
            label="Naam"
            value={formik.values.naam}
            onChange={formik.handleChange}
            error={formik.touched.naam && Boolean(formik.errors.naam)}
            helperText={formik.touched.naam && formik.errors.naam}
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

export default VervoerdersForm;
