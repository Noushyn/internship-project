import React from "react";
import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <Button
  component={Link}
  to="/login"
  color="inherit"
>
  Login
</Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          <Button color="inherit">products</Button>


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
