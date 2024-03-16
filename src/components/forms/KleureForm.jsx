import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Box } from '@mui/material';
import * as Yup from 'yup';

// Define the validation schema using Yup
const kleureFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short - should be 5 chars minimum.')
    .required('Name is required'),
  code: Yup.string()
    .max(3, 'Must me 3 letters')
    .required('Code is required'),
});

const KleureForm = ({ onSubmit }) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
    },
    validationSchema: kleureFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('4 Form submitted:', values);
      onSubmit(values); // Call the passed onSubmit
      setSubmitting(false); // Set submitting to false after handling submit
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="code"
          name="code"
          label="Code"
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button color="primary" variant="contained" type="submit"disabled={formik.isSubmitting}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default KleureForm;
