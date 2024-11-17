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
const verkopesFormSchema = Yup.object().shape({
  faktuurNommer: Yup.string().required("Faktuur nommer is required"),
  verkopes: Yup.array().of(
    Yup.object().shape({
      produsentId: Yup.string().required("Produsent is required"),
      verpakkingId: Yup.string().required("verpakking is required"),
      qty: Yup.number()
        .required("Quantity is required")
        .positive()
        .integer(),
    })
  ),
  
});

const VerkopesForm = ({ onSubmit }) => {
  const [produsente, setProdusente] = useState([]);
  const [verpakkings, setVerpakkings] = useState([]);
  const [faktuurCreated, setFaktuurCreated] = useState(false);

  useEffect(() => {
    // Fetch produsente & verpakkings data from the backend for dropdowns
    fetch("http://localhost:8080/api/produsente/list")
      .then((response) => response.json())
      .then((data) => setProdusente(data))
      .catch((error) => console.error("Error fetching produsente:", error));

    fetch("http://localhost:8080/api/verpakkings/list")
      .then((response) => response.json())
      .then((data) => setVerpakkings(data))
      .catch((error) => console.error("Error fetching verpakkings:", error));
  }, []);

  const addVerkopeField = () => {
    const newVerkope = formik.values.verkopes.concat({
      produsentId: "",
      verpakkingId: "",
      qty: "",
    });
    formik.setFieldValue("verkopes", newVerkope);
  };

  // Remove a verkope field
  const removeVerkopeField = (index) => {
    const newVerkope = formik.values.verkopes.filter((_, i) => i !== index);
    formik.setFieldValue("verkopes", newVerkope);
  };

  // Handle form submission for "CREATE FAKTUUR"
  const handleCreateFaktuur = () => {
    // Assuming validation has passed and faktuur is created
    setFaktuurCreated(true);
    addVerkopeField();
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      verkopes: [],
      faktuurNommer: "",
      // Initial value for verpakkings dropdown
    },
    validationSchema: verkopesFormSchema,
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
              Voeg Verkopes Toe
            </Typography>

            {formik.values.verkopes.map((verkope, index) => (
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
                  <InputLabel id={`produsent-label-${index}`}>
                    Produsent
                  </InputLabel>
                  <Select
                    labelId={`produsent-label-${index}`}
                    id={`produsent-${index}`}
                    name={`produsent-${index}`}
                    value={verkope.produsentId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `verkopes[${index}].produsentId`,
                        e.target.value
                      )
                    }
                    size="small"
                  >
                    {produsente.map((produsent) => (
                      <MenuItem key={produsent.id} value={produsent.id}>
                        {produsent.naam}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id={`verpakking-label-${index}`}>
                    Verpakking
                  </InputLabel>
                  <Select
                    labelId={`verpakking-label-${index}`}
                    id={`verpakking-${index}`}
                    name={`verpakking-${index}`}
                    value={verkope.verpakkingId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `verkopes[${index}].verpakkingId`,
                        e.target.value
                      )
                    }
                    size="small"
                  >
                    {verpakkings.map((verpakking) => (
                      <MenuItem key={verpakking.id} value={verpakking.id}>
                        {verpakking.naam} - {verpakking.prys}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>

                {/* Quantity Input */}
                <Grid item xs={6} sm={2}>
                  <TextField
                    id={`qty-${index}`}
                    name={`verkopes[${index}].qty`}
                    label="Qty"
                    type="number"
                    value={verkope.qty}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `verkopes[${index}].qty`,
                        e.target.value
                      )
                    }
                    size="small"
                    //sx={{ width: 150 }}
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  <Button onClick={() => removeVerkopeField(index)}>
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Button onClick={addVerkopeField} sx={{ mt: 2 }}>
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

export default VerkopesForm;
