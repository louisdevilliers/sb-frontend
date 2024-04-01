import React from 'react';
import { useFormik } from 'formik';
import { Container, Button, TextField, Box } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const wekeFormSchema = Yup.object().shape({
  nommer: Yup.number()
    .typeError('Nommer must be a number')
    .required('Nommer is required'),
  letter: Yup.string()
    .min(1, 'Letter is too short')
    .required('Letter is required'),
});

const WekeForm = ({ onSubmit }) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      nommer: '',
      letter: '',
    },
    validationSchema: wekeFormSchema,
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
            id="nommer"
            name="nommer"
            label="Nommer"
            type="number"
            value={formik.values.nommer}
            onChange={formik.handleChange}
            error={formik.touched.nommer && Boolean(formik.errors.nommer)}
            helperText={formik.touched.nommer && formik.errors.nommer}
          />
          <TextField
            fullWidth
            id="letter"
            name="letter"
            label="Letter"
            value={formik.values.letter}
            onChange={formik.handleChange}
            error={formik.touched.letter && Boolean(formik.errors.letter)}
            helperText={formik.touched.letter && formik.errors.letter}
          />
        </Box>
        <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting} fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default WekeForm;
