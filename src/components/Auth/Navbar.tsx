import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router";

const AuthNavbar: React.FC = () => {
  const {pathname}=useLocation();
  console.log(pathname)

  const linkStyle = (path: string) => ({
  color:  "white",
  textTransform: "none",
  mr: 1,
  fontWeight: pathname === path ? "bold" : "normal",
  borderBottom: pathname === path ? "2px solid #fff" : "2px solid transparent",
  borderRadius: 0, // optional: remove button rounding for border alignment
});
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          MyQuizApp
        </Typography>

        <Box>
          <Button
            component={Link}
            to="/login"
            sx={linkStyle("/login")}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={linkStyle("/register")}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
