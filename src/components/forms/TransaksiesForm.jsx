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
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";

// Define the validation schema using Yup
const transaksiesFormSchema = Yup.object().shape({
  faktuurNommer: Yup.string().required("Faktuur nommer is required"),
  transaksies: Yup.array().of(
    Yup.object().shape({
      stackId: Yup.string().required("Stack is required"),
      nbokse: Yup.number()
        .required("Quantity is required")
        .positive()
        .integer(),
    })
  ),
  
});

const TransaksiesForm = ({ onSubmit }) => {
  const [stacks, setStacks] = useState([]);
  const [faktuurCreated, setFaktuurCreated] = useState(false);

  useEffect(() => {
    // Fetch produsente & stacks data from the backend for dropdowns

    fetch("http://localhost:8080/api/stacks/list")
      .then((response) => response.json())
      .then((data) => setStacks(data))
      .then((data) =>console.log('data', data))
      .catch((error) => console.error("Error fetching stacks:", error));
  }, []);

  const addTransaksieField = () => {
    const newTransaksie = formik.values.transaksies.concat({
      stackId: "",
      nbokse: "",
    });
    formik.setFieldValue("transaksies", newTransaksie);
  };

  // Remove a transaksie field
  const removeTransaksieField = (index) => {
    const newTransaksie = formik.values.transaksies.filter((_, i) => i !== index);
    formik.setFieldValue("transaksies", newTransaksie);
  };

  // Handle form submission for "CREATE FAKTUUR"
  const handleCreateFaktuur = () => {
    // Assuming validation has passed and faktuur is created
    setFaktuurCreated(true);
    addTransaksieField();
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      transaksies: [],
      faktuurNommer: "",
      // Initial value for stacks dropdown
    },
    validationSchema: transaksiesFormSchema,
    onSubmit: (values) => {
      console.log(values);
      onSubmit(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="faktuurNommer"
            name="faktuurNommer"
            label="Faktuur Nommer"
            value={formik.values.faktuurNommer}
            onChange={formik.handleChange}
            error={
              formik.touched.faktuurNommer &&
              Boolean(formik.errors.faktuurNommer)
            }
            helperText={
              formik.touched.faktuurNommer && formik.errors.faktuurNommer
            }
          />
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => {
              handleCreateFaktuur();
            }}
          >
            CREATE FAKTUUR
          </Button>
        </Box>
        {faktuurCreated && (
          <>
            <Typography variant="h6" sx={{ mt: 4 }}>
              Voeg transaksies Toe
            </Typography>

            {formik.values.transaksies.map((transaksie, index) => (
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
                  <InputLabel id={`stack-label-${index}`}>
                    Stack
                  </InputLabel>
                  <Select
                    labelId={`stack-label-${index}`}
                    id={`stack-${index}`}
                    name={`stack-${index}`}
                    value={transaksie.stackId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `transaksies[${index}].stackId`,
                        e.target.value
                      )
                    }
                    size="small"
                  >
                    {stacks.map((stack) => (
                      <MenuItem key={stack.id} value={stack.id}>
                        {stack.produsent} - {stack.kultivar} - {stack.boks} - {stack.nbokse}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>

                {/* Quantity Input */}
                <Grid item xs={6} sm={2}>
                  <TextField
                    id={`nbokse-${index}`}
                    name={`transaksies[${index}].nbokse`}
                    label="nbokse"
                    type="number"
                    value={transaksie.nbokse}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `transaksies[${index}].nbokse`,
                        e.target.value
                      )
                    }
                    size="small"
                    //sx={{ width: 150 }}
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  <Button onClick={() => removeTransaksieField(index)}>
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Button onClick={addTransaksieField} sx={{ mt: 2 }}>
              + ADD FIELD
            </Button>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                SUBMIT INVOICE
              </Button>
            </Box>
          </>
        )}
      </form>
    </Container>
  );
};

export default TransaksiesForm;
