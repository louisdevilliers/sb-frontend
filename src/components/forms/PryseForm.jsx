import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button, Select, MenuItem, FormControl, InputLabel, TextField, Box
} from '@mui/material';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';

const PryseForm = ({ onSubmit }) => {
  const [weke, setWeke] = useState([]);
  const [kleure, setKleure] = useState([]);
  const [kultivars, setKultivars] = useState([]);
  const [selectedKultivars, setSelectedKultivars] = useState([]);

  
 /*
  useEffect(() => {
    // You'll need to replace the URLs with your actual endpoints
    fetch('http://localhost:8080/api/weke/list')
      .then(res => res.json())
      .then(setWeke)
      // Handle errors as appropriate
      .catch(console.error);

    fetch('http://localhost:8080/api/kleure/list')
      .then(res => res.json())
      .then(setKleure)
      // Handle errors as appropriate
      .catch(console.error);

    fetch('http://localhost:8080/api/kultivars/list')
      .then(res => res.json())
      .then(setKultivars)
      // Handle errors as appropriate
      .catch(console.error);
  }, []);
  */
  useEffect(() => {
    const fetchWeke = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/weke/list');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Fetched weke:', data);
        Array.isArray(data) ? setWeke(data) : console.error('Fetched data is not an array:', data);
      } catch (error) {
        console.error('Error fetching weke:', error);
      }
    };
  
    const fetchKleure = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/kleure/list');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Fetched kleure:', data);
        Array.isArray(data) ? setKleure(data) : console.error('Fetched data is not an array:', data);
      } catch (error) {
        console.error('Error fetching kleure:', error);
      }
    };
  
    const fetchKultivars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/kultivars/list');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Fetched kultivars:', data);
        Array.isArray(data) ? setKultivars(data) : console.error('Fetched data is not an array:', data);
      } catch (error) {
        console.error('Error fetching kultivars:', error);
      }
    };
  
    fetchWeke();
    fetchKleure();
    fetchKultivars();
  }, []);

  // Add a kultivar price field
  const addKultivarPriceField = () => {
    setSelectedKultivars([...selectedKultivars, { kultivarId: '', prys: '' }]);
  };

  // Remove a kultivar price field
  const removeKultivarPriceField = (index) => {
    setSelectedKultivars(selectedKultivars.filter((_, idx) => idx !== index));
  };

  // Handle kultivar price change
  const handleKultivarPriceChange = (index, field, value) => {
    const updatedKultivars = [...selectedKultivars];
    updatedKultivars[index][field] = value;
    setSelectedKultivars(updatedKultivars);
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      weekId: '',
      kleurePrices: {},
      // Kultivars prices are handled separately
    },
    validationSchema: Yup.object().shape({
      weekId: Yup.string().required('Week is required'),
      // Define the rest of your validation schema here
    }),
    onSubmit: (values) => {
      // Combine Formik values with local state for kultivar prices
      const dataToSubmit = {
        weekId: values.weekId,
        kleure: Object.entries(values.kleurePrices).map(([kleurId, prys]) => ({ kleurId, prys })),
        kultivars: selectedKultivars,
      };
      console.log(dataToSubmit);
      onSubmit(dataToSubmit);
    },
  });

 
  return (

    <form onSubmit={formik.handleSubmit}>
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
         
          <FormControl fullWidth>
            <InputLabel id="week-select-label">Kies week</InputLabel>
            <Select
              labelId="week-select-label"
              id="weekId"
              name="weekId"
              value={formik.values.weekId}
              label="Kies week"
              onChange={formik.handleChange}
              size="small" 
            >
            {weke.map(week => (
            <MenuItem key={week.id} value={week.id}>{`${week.nommer} ${week.letter}`}</MenuItem>
          ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
       
        <Grid container spacing={2}>
          {kleure.map((kleur) => (
            <Grid item xs={12} sm={6} md={4} key={kleur.id}>
              <TextField
                id={`kleurePrices.${kleur.id}`}
                name={`kleurePrices.${kleur.id}`}
                label={kleur.naam}
                value={formik.values.kleurePrices[kleur.id] || ''}
                onChange={formik.handleChange}
                fullWidth
                size="small" 
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 3 }}>
      
        {selectedKultivars.map((selectedKultivar, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2,  mb: 2, }}>
            <FormControl fullWidth sx={{ width: '500px' }} >
              <InputLabel id={`kultivar-select-label-${index}`}>Kies kultivar</InputLabel>
              <Select
                labelId={`kultivar-select-label-${index}`}
                id={`kultivar-${index}`}
                name={`kultivar-${index}`}
                value={selectedKultivar.kultivarId}
                label="Kies kultivar"
                onChange={(e) => handleKultivarPriceChange(index, 'kultivarId', e.target.value)}
                size="small" 
              >
               {kultivars.map(kultivar => (
                <MenuItem key={kultivar.id} value={kultivar.id}>{kultivar.naam}</MenuItem>
              ))}
              </Select>
            </FormControl>
            <TextField
              id={`prys-${index}`}
              name={`prys-${index}`}
              label="Prys"
              value={selectedKultivar.prys}
              onChange={(e) => handleKultivarPriceChange(index, 'prys', e.target.value)}
              size="small" 
              sx={{ flexGrow: 1 }}
            />
            <Button onClick={() => removeKultivarPriceField(index)}>
              <DeleteIcon />
            </Button>
          </Box>
        ))}
        <Button onClick={addKultivarPriceField} sx={{ mt: 2 }}>
          Add Field
        </Button>
      </Box>

      <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting} sx={{ mt: 3 }}>
        Submit
      </Button>
      </Box>
    </form>

    
  );
};

export default PryseForm;
/*
    <form onSubmit={formik.handleSubmit}>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="week-select-label">Kies week</InputLabel>
        <Select
          labelId="week-select-label"
          id="weekId"
          name="weekId"
          value={formik.values.weekId}
          label="Kies week"
          onChange={formik.handleChange}
        >
          {weke.map(week => (
            <MenuItem key={week.id} value={week.id}>{`${week.nommer} ${week.letter}`}</MenuItem>
          ))}
        </Select>
      </FormControl>

    
      {kleure.map((kleur) => (
        <TextField
          key={kleur.id}
          id={`kleurePrices.${kleur.id}`}
          name={`kleurePrices.${kleur.id}`}
          label={kleur.naam}
          value={formik.values.kleurePrices[kleur.id] || ''}
          onChange={formik.handleChange}
          margin="normal"
          fullWidth
        />
      ))}

      
      {selectedKultivars.map((selectedKultivar, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id={`kultivar-select-label-${index}`}>Kies kultivar</InputLabel>
            <Select
              labelId={`kultivar-select-label-${index}`}
              id={`kultivar-${index}`}
              name={`kultivar-${index}`}
              value={selectedKultivar.kultivarId}
              label="Kies kultivar"
              onChange={(e) => handleKultivarPriceChange(index, 'kultivarId', e.target.value)}
            >
              {kultivars.map(kultivar => (
                <MenuItem key={kultivar.id} value={kultivar.id}>{kultivar.naam}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id={`prys-${index}`}
            name={`prys-${index}`}
            label="Prys"
            value={selectedKultivar.prys}
            onChange={(e) => handleKultivarPriceChange(index, 'prys', e.target.value)}
            margin="normal"
            fullWidth
          />
          <Button onClick={() => removeKultivarPriceField(index)}>Remove</Button>
        </Box>
      ))}

      <Button onClick={addKultivarPriceField}>Add Field</Button>

      <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </form>
    */