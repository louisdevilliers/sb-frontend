// In src/Sidebar.js
import * as React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <List>
          {['Druiwe in', 'Druiwe uit', 'Administrasie'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {/* Repeat for each entity */}
        </List>
      </Drawer>
    </div>
  );
}
