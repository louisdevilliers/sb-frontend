// In src/Navbar.js
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'
export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ height: '50px', marginRight: '18px', marginLeft: '8px', marginTop: '8px' }} />
          <Typography variant="h6" color="inherit" noWrap>
            SPES BONA
          </Typography>
        </Box>
        <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
          {/* Use the `component` prop to render a `Link`, and `to` prop for the path */}
          <Tab label="Home" component={Link} to="/" sx={{ color: 'white' }} onClick={() => setValue(false)} />
          {/* Adjust the Link for other tabs as needed */}
          <Tab label="Tab" component={Link} to="/tab" sx={{ color: 'white' }} />
        </Tabs>
      </AppBar>
    </Box>
  );
}
