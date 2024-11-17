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
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";

const VragteForm = ({ onSubmit }) => {
  const [produsente, setProdusente] = useState([]);
  const [vragte, setVragte] = useState([]);
  const [bokse, setBokse] = useState([]);
  const [kultivars, setKultivars] = useState([]);
  const [weke, setWeke] = useState([]);
  const [faktuurCreated, setFaktuurCreated] = useState(false);

  useEffect(() => {
    const fetchData = async (url, setter, dataName) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(`Fetched ${dataName}:`, data);
        Array.isArray(data)
          ? setter(data)
          : console.error(`Fetched ${dataName} is not an array:`, data);
      } catch (error) {
        console.error(`Error fetching ${dataName}:`, error);
      }
    };

    fetchData(
      "http://localhost:8080/api/produsente/list",
      setProdusente,
      "produsente"
    );
    fetchData("http://localhost:8080/api/vragte/list", setVragte, "vragte");
    fetchData(
      "http://localhost:8080/api/kultivars/list",
      setKultivars,
      "kultivars"
    );
    fetchData("http://localhost:8080/api/bokse/list", setBokse, "bokse");
    fetchData("http://localhost:8080/api/weke/list", setWeke, "weke");
  }, []);

  // Add a vragte field
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
    setFaktuurCreated(true);
  };

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
      console.log(values);
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
          onClick={handleCreateFaktuur}
        >
          CREATE FAKTUUR
        </Button>
      </Box>

      {faktuurCreated && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Voeg Vragte Toe
          </Typography>

          {formik.values.vragte.map((vrag, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={index}
              sx={{ mt: 2 }}
            >
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id={`produsent-label-${index}`}>
                    Produsent
                  </InputLabel>
                  <Select
                    labelId={`produsent-label-${index}`}
                    id={`produsent-${index}`}
                    name={`vragte[${index}].produsentId`}
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

              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id={`boks-label-${index}`}>Boks</InputLabel>
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

              <Grid item xs={12} sm={2}>
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
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => removeVragteField(index)}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          ))}

          <Button
            type="button"
            onClick={addVragteField}
            sx={{ mt: 2 }}
            variant="outlined"
          >
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
