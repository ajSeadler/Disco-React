import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'grey', // Set the background color to light grey
}));

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the home page after logout
    window.location.href = '/';
  };

  // Check if the user is logged in based on the presence of a token in localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {/* Logo/Brand on the left */}
        <IconButton edge="start" color="inherit" aria-label="menu" href='/'> 
          {/* Your logo goes here */}
          {/* For example, you can use an image */}
          <img
            src="/discologo.PNG"
            alt="Logo"
            style={{ width: '40px', height: '40px' }}
          />
        </IconButton>

        {/* Spacer to push links to the right on larger screens */}
        {!isMobile && <Box sx={{ flexGrow: 1 }} />}

        {/* Navigation Links */}
        {isMobile ? (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={handleDrawerOpen} edge="end" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
              <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/shows" onClick={handleDrawerClose}>
                  <ListItemText primary="Shows" />
                </ListItem>
                {isLoggedIn && (
                  <>
                    <ListItem button component={Link} to="/me" onClick={handleDrawerClose}>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                )}
                {!isLoggedIn && (
                  <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
                    <ListItemText primary="Login" />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/shows">
              Shows
            </Button>
            {isLoggedIn && (
              <>
                <Button color="inherit" component={Link} to="/me">
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
