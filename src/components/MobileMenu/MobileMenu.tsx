import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import ContactIcon from '@mui/icons-material/ContactMail';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

type Anchor = 'top';

export const MobileMenu: React.FC = () => {
  const [state, setState] = React.useState({
    top: false,
  });

  useEffect(() => {
    AOS.init({ duration: 10000 });
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const links = [
    { to: '/home', text: 'HOME', icon: <HomeIcon /> },
    { to: '/about', text: 'ABOUT US', icon: <InboxIcon /> },
    { to: '/contact', text: 'CONTACT', icon: <ContactIcon /> },
  ];

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map(link => (
          <ListItem key={link.to} disablePadding>
            <ListItemButton
              style={{
                color: '#00baff',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <Link to={link.to} data-translate={link.text}>
                {link.text}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {(['top'] as const).map(anchor => (
        <React.Fragment key={anchor}>
          <Button
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="11500"
            style={{ color: '#6f42c1', fontSize: 20, fontWeight: 'bold' }}
            onClick={toggleDrawer(anchor, true)}
          >
            MENU
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};
