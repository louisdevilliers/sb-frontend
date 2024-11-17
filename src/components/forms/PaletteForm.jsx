import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import AddBoxIcon from "@mui/icons-material/AddBox";

const dummyStacks = [
  {
    id: 1,
    week: "3a",
    producer: "M. Fredericks",
    cultivar: "Sweet Celebration",
    boxes: 122,
    boxType: "SB J",
    stacked: 0,
  },
  {
    id: 2,
    week: "3a",
    producer: "T.C. Rabie",
    cultivar: "Crimson",
    boxes: 88,
    boxType: "SB J",
    stacked: 0,
  },
];

const validationSchema = Yup.object({
  palletNumber: Yup.number().positive().required("Pallet number is required"),
  location: Yup.string().required("Location is required"),
  stacks: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required("A stack selection is required"),
        stacked: Yup.number()
          .positive("Must be more than 0")
          .max(Yup.ref("boxes"), "Cannot stack more boxes than are available")
          .required("Stacked boxes are required"),
      })
    )
    .test(
      "totalBoxes",
      "The total of boxes exceeds the maximum allowed (98)",
      function (stacks) {
        const totalStacked = stacks.reduce(
          (acc, stack) => acc + (stack.stacked || 0),
          0
        );
        return totalStacked <= 98;
      }
    ),
});

const PaletteForm = ({ onSubmit }) => {
  const [palletNumber, setPalletNumber] = useState("");
  const [stacks, setStacks] = useState(dummyStacks);
  const [showSections, setShowSections] = useState(false);

  const formik = useFormik({
    initialValues: {
      palletNumber: "",
      location: "vloer",
      stacks: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Pass the form data up to the parent component
      console.log("Palette Form submitted, in formik handler. Values:");
      console.log(values);
      onSubmit(values);
    },
    validate: (values) => {
      let errors = {};
      let stackErrors = [];
    
      values.stacks.forEach((stack, index) => {
        let stackError = {};
        if (stack.stacked > stack.boxes) {
          stackError.stacked = `Cannot stack more than available boxes (${stack.boxes})`;
        }
        if (Object.keys(stackError).length > 0) {
          stackErrors[index] = stackError;
        }
      });
    
      if (stackErrors.length > 0) {
        errors.stacks = stackErrors;
      }
    
      let totalStacked = values.stacks.reduce((total, stack) => total + (stack.stacked || 0), 0);
      if (totalStacked > 98) {
        errors.totalStacked = 'The total of boxes exceeds the maximum allowed (98)';
      }
    
      return errors;
    }
  });

  const handleSetPalet = () => {
    if (formik.values.palletNumber && formik.values.location === "vloer") {
      setShowSections(true);
      handleAddStack();
    } else {
      setShowSections(false);
    }
  };

  const handleStackSelection = (event, index) => {
    const selectedStackId = event.target.value;
    const stackData = dummyStacks.find((stack) => stack.id === selectedStackId);
    if (stackData) {
      formik.setFieldValue(`stacks[${index}]`, { ...stackData, stacked: 0 });
    }
  };

  const handleBoxCountChange = (event, index) => {
    const value = parseInt(event.target.value, 10) || 0;
    formik.setFieldValue(`stacks[${index}].stacked`, value);
  };

  const handleAddStack = () => {
    const totalStacked = formik.values.stacks.reduce(
      (acc, stack) => acc + (stack.stacked || 0),
      0
    );
    if (totalStacked >= 98) {
      alert("Cannot add more boxes, the pallet is full.");
      return;
    }
    const newStack = {
      id: "",
      boxes: "",
      stacked: 0,
      cultivar: "",
      boxType: "",
    };
    const updatedStacks = [...formik.values.stacks, newStack];
    formik.setFieldValue("stacks", updatedStacks);
  };

  const handleRemoveStack = (index) => {
    const updatedStacks = formik.values.stacks.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("stacks", updatedStacks);
  };

  
  const handleUnstack = (index) => {
    const currentStack = formik.values.stacks[index];
    if (currentStack.stacked > 0) {
      formik.setFieldValue(`stacks[${index}].stacked`, 0);
    }
  };
 

  const renderSelectedStacks = () => {
    return formik.values.stacks.map((stack, index) => (
      <p key={index}>
        {stack.producer} - {stack.stacked} - {stack.cultivar} - {stack.boxType}
      </p>
    ));
  };

  const calculateStackHeight = (stacked, totalBoxes) => {
    return (stacked / totalBoxes) * 200;
  };

  const totalStacked = formik.values.stacks.reduce((acc, stack) => {
    const stackedInt = parseInt(stack.stacked, 10) || 0;
    return acc + stackedInt;
  }, 0);

  const totalRemaining = 98 - totalStacked;

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} p={2}>
          {!showSections && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 1, minHeight: "100%" }}>
                <Grid item
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="left"
                  xs={12}
                  p={2}
                  //spacing={2}
                >
                  <TextField
                    //fullWidth
                    id="palletNumber"
                    name="palletNumber"
                    label="Pallet Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.palletNumber}
                    error={
                      formik.touched.palletNumber &&
                      Boolean(formik.errors.palletNumber)
                    }
                    helperText={
                      formik.touched.palletNumber && formik.errors.palletNumber
                    }
                    sx={{ m: 2 }}
                  />
                  <FormControl component="fieldset">
                    <FormLabel sx={{ ml: 2 }} component="legend">
                      Location
                    </FormLabel>
                    <RadioGroup
                      row
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      sx={{ m: 2 }}
                    >
                      <FormControlLabel
                        value="vloer"
                        control={<Radio />}
                        label="Vloer"
                      />
                      <FormControlLabel
                        value="uitlaai"
                        control={<Radio />}
                        label="Uitlaai"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleSetPalet}
                    sx={{ m: 2 }}
                  >
                    SET
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          )}
          {showSections && formik.values.location === "vloer" && (
            <>
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    m: 2,
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100%",
                  }}
                >
                  <Grid container direction="row" sx={{ mt: 2, ml: 2, mr: 2 }}>
                    <Grid
                      container
                      direction="column"
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                        Pallet {formik.values.palletNumber}
                      </Typography>
                      <Box
                        sx={{
                          width: "120px",
                          height: "200px",
                          backgroundColor: "#D3D3D3",
                          display: "flex",
                          flexDirection: "column-reverse",
                          alignItems: "center",
                          position: "relative",
                          mb: 1,
                        }}
                      >
                        {formik.values.stacks.map((stack, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: "100%",
                              height: `${calculateStackHeight(
                                stack.stacked,
                                98
                              )}px`,
                              backgroundColor: "#8B0000",
                            }}
                          />
                        ))}
                        {/* Palette Base */}
                        <Box
                          sx={{
                            width: "120px",
                            height: "20px",
                            backgroundColor: "#A52A2A",
                            position: "absolute",
                            bottom: 0,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      Stacks
                      {renderSelectedStacks()}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      # {palletNumber}
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        {totalStacked} / 98 Bokse, {totalRemaining} oor
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper elevation={3} sx={{ m: 2, p: 1, minHeight: "100%" }}>
                  <Typography variant="h5" sx={{ p: 1 }}>
                    Stack palet
                  </Typography>
                  {formik.values.stacks.map((stack, index) => (
                    <>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        p={2}
                        key={index}
                      >
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <Select
                              value={formik.values.stacks[index].id}
                              onChange={(event) =>
                                handleStackSelection(event, index)
                              }
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Select stack
                              </MenuItem>
                              {stacks.map((stack) => (
                                <MenuItem key={stack.id} value={stack.id}>
                                  {stack.week} - {stack.producer} -{" "}
                                  {stack.cultivar} -{stack.boxes} -{" "}
                                  {stack.boxType}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                          <TextField
                            fullWidth
                            id={`stacks[${index}].stacked`}
                            name={`stacks[${index}].stacked`}
                            value={formik.values.stacks[index].stacked}
                            label="Boxes"
                            type="number"
                            onChange={(e) => handleBoxCountChange(e, index)}
                            error={
                              formik.touched.stacks?.[index]?.stacked &&
                              Boolean(formik.errors.stacks?.[index]?.stacked)
                            }
                            helperText={
                              formik.touched.stacks?.[index]?.stacked &&
                              formik.errors.stacks?.[index]?.stacked
                            }
                          />
                          {formik.errors.totalStacked && (
                            <Typography color="error" variant="body2">
                              {formik.errors.totalStacked}
                            </Typography>
                          )}
                           {formik.errors.stacked && (
                            <Typography color="error" variant="body2">
                              {formik.errors.stacked}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          {stack.stacked > 0 ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              type="button"
                              onClick={() => handleUnstack(index)}
                            >
                              Unstack
                            </Button>
                          ) : (
                            <div></div>
                          )}
                        </Grid>

                        <Grid item xs={1}>
                          {stack.boxes - stack.stacked} Oor
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            aria-label="delete stack"
                            onClick={() => handleRemoveStack(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                  <Grid
                    container
                    xs={12}
                    p={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      type="button"
                      onClick={handleAddStack}
                    >
                      Add Stack
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit Palet
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Box>

  );
};

export default PaletteForm;
