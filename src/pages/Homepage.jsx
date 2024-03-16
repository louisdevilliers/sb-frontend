// In src/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Grid, Typography } from '@mui/material';

// Example data for entities, you might fetch this from an API in a real app
const entities = [
 // { name: 'Bokse', path: 'bokse' },
  { name: 'Kleure' , path: 'kleure'},
 // { name: 'Kultivars', path: 'kultivars'},
  //{ name: 'Stapels', path: 'stapels' },
  //{ name: 'Palette', path: 'palette' },
  // ...add other entities
];

export default function Homepage() {
  const navigate = useNavigate();
  const handleNavigate = (entityPath, action) => {
    navigate(`/${entityPath}/${action}`);
  };
  return (
    <Grid container spacing={4}>
      {entities.map((entity) => (
        <Grid item xs={12} sm={6} md={3} key={entity.name}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {entity.name}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
              <Button size="small" color="primary" sx={{ margin: 1 }} onClick={() => handleNavigate(entity.path, 'show')}>
                Show
              </Button>
              <Button size="small" color="primary" sx={{ margin: 1 }} onClick={() => handleNavigate(entity.path, 'add')}>
                Add
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
