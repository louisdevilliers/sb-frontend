import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import { fetchEntityDropdownData } from "../../services/entityService";

const VragteForm = ({ onSubmit }) => {
  const [produsente, setProdusente] = useState([]);
  const [vragte, setVragte] = useState([]);
  const [bokse, setBokse] = useState([]);
  const [kultivars, setKultivars] = useState([]);
  const [weke, setWeke] = useState([]);
  const [faktuurCreated, setFaktuurCreated] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const fetchedProdusente = await fetchEntityDropdownData("produsente");
        setProdusente(fetchedProdusente);

        const fetchedKultivars = await fetchEntityDropdownData("kultivars");
        setKultivars(fetchedKultivars);

        const fetchedBokse = await fetchEntityDropdownData("bokse");
        setBokse(fetchedBokse);

        const fetchedWeke = await fetchEntityDropdownData("weke");
        setWeke(fetchedWeke);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Add a vrag qty field
  /*
  const addVragField = () => {
    setVragte([...vragte, { produsentId: '', kultivarId: '', boksId: '', qty: '' }]);
  };
  
  // Function to remove load fields
  const removeVragField = (index) => {
    const newVragte = [...vragte];
    newVragte.splice(index, 1);
    setVragte(newVragte);
  };
  */
  const addVragteField = () => {
    const newVragte = formik.values.vragte.concat({
      produsentId: "",
      kultivarId: "",
      boksId: "",
      qty: "",
    });
    formik.setFieldValue("vragte", newVragte);
  };

  // Remove a vragte field
  const removeVragteField = (index) => {
    const newVragte = formik.values.vragte.filter((_, i) => i !== index);
    formik.setFieldValue("vragte", newVragte);
  };

  // Handle form submission for "CREATE FAKTUUR"
  const handleCreateFaktuur = () => {
    // Assuming validation has passed and faktuur is created
    setFaktuurCreated(true);
  };

  // Function to handle change on load fields

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      faktuurNommer: "",
      weekId: "",
      vragte: [],
    },
    validationSchema: Yup.object().shape({
      faktuurNommer: Yup.string().required("Faktuur nommer is required"),
      weekId: Yup.string().required("Week is required"),
      vragte: Yup.array().of(
        Yup.object().shape({
          produsentId: Yup.string().required("Produsent is required"),
          kultivarId: Yup.string().required("Kultivar is required"),
          boksId: Yup.string().required("Boks is required"),
          qty: Yup.number()
            .required("Quantity is required")
            .positive()
            .integer(),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h5">Druiwe Ontvangs</Typography>
      </Box>

      <Grid container spacing={3}>
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="week-select-label">Kies week</InputLabel>
            <Select
              labelId="week-select-label"
              id="weekId"
              name="weekId"
              value={formik.values.weekId}
              label="Kies week"
              onChange={formik.handleChange}
            >
              {weke.map((week) => (
                <MenuItem key={week.id} value={week.id}>
                  {`${week.nommer} ${week.letter}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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

      {/* Render the rest of the form elements after "CREATE FAKTUUR" is clicked */}
      {/*second section, after clicking crete faktuur faktuur nommer shows where field was, fields for adding vragte appears: row of inputs, produsente select, kultivar select, boks select, qty input, delete field, next row add field button for new vrag*/}
      {faktuurCreated && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Voeg Vragte Toe
          </Typography>

          {formik.values.vragte.map((vrag, index) => (
            /*
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
            >
            */
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={index}
              sx={{ mt: 1 }}
            >
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id={`produsent-label-${index}`}>
                    Produsent
                  </InputLabel>
                  <Select
                    labelId={`produsent-label-${index}`}
                    id={`produsent-${index}`}
                    name={`produsent-${index}`}
                    value={vrag.produsentId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `vragte[${index}].produsentId`,
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
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id={`kultivar-label-${index}`}>
                    Kultivar
                  </InputLabel>
                  <Select
                    labelId={`kultivar-label-${index}`}
                    id={`kultivar-${index}`}
                    name={`vragte[${index}].kultivarId`}
                    value={vrag.kultivarId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `vragte[${index}].kultivarId`,
                        e.target.value
                      )
                    }
                    size="small"
                  >
                    {kultivars.map((kultivar) => (
                      <MenuItem key={kultivar.id} value={kultivar.id}>
                        {kultivar.naam}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Boks Select Input */}
              <Grid item xs={6} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id={`boks-label-${index}`} sx={{ width: 150 }}>
                    Boks
                  </InputLabel>
                  <Select
                    labelId={`boks-label-${index}`}
                    id={`boks-${index}`}
                    name={`vragte[${index}].boksId`}
                    value={vrag.boksId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `vragte[${index}].boksId`,
                        e.target.value
                      )
                    }
                    size="small"
                  >
                    {bokse.map((boks) => (
                      <MenuItem key={boks.id} value={boks.id}>
                        {boks.kode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Quantity Input */}
              <Grid item xs={6} sm={2}>
                <TextField
                  id={`qty-${index}`}
                  name={`vragte[${index}].qty`}
                  label="Qty"
                  type="number"
                  value={vrag.qty}
                  onChange={(e) =>
                    formik.setFieldValue(`vragte[${index}].qty`, e.target.value)
                  }
                  size="small"
                  //sx={{ width: 150 }}
                />
              </Grid>
              <Grid item xs={1} sm={1}>
                <Button onClick={() => removeVragteField(index)}>
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          ))}

          <Button onClick={addVragteField} sx={{ mt: 2 }}>
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
  );
};

export default VragteForm;
