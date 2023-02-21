import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Typography } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';


const DrawerItem = () => {

  const [state, setState] = React.useState({
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography variant='h5' sx={{textAlign: "center"}}>
          Browse Categories
        </Typography>
        <ListItem>
          <ListItemButton>
            <Typography variant="subtitle1">
              Consoles
            </Typography>
          </ListItemButton>
          </ListItem>
          <ListItem>

          <ListItemButton>
            <Typography variant="subtitle1">
              Video
            </Typography>
          </ListItemButton>
          </ListItem>
          <ListItem>

          <ListItemButton>
            <Typography variant="subtitle1">
              Audio
            </Typography>
          </ListItemButton>
          </ListItem>
          <ListItem>

          <ListItemButton>
            <Typography variant="subtitle1">
              Appliances
            </Typography>
          </ListItemButton>
          </ListItem>
          <ListItem>

          <ListItemButton>
            <Typography variant="subtitle1">
              Photography
            </Typography>
          </ListItemButton>
          </ListItem>
          <ListItem>
          <ListItemButton>
            <Typography variant="subtitle1">
              Photography
            </Typography>
          </ListItemButton>
        </ListItem>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );


  return (
    <div>
      <IconButton onClick={toggleDrawer("bottom", true)}>
      <MenuIcon>{"bottom"}</MenuIcon>

      </IconButton>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {list("bottom")}
        </Drawer>
  </div>
  )
}

export default DrawerItem