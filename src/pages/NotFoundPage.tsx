// NotFoundPage.jsx
import React from "react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { theme } from "../util/theme";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, sm: 6 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            minWidth: { sm: 320 },
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 96,
              height: 96,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 48 }} />
          </Box>

          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              404 — Page not found
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
              Oops! The page you’re looking for doesn’t exist or has been moved.
              Check the URL or go back to the homepage. If you think this is a bug,
              please report it.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{ minWidth: 160,"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main }}}
          >
            Go to Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ minWidth: 160 }}
          >
            Go Back
          </Button>

          <Button
            color="error"
            startIcon={<ReportProblemIcon />}
            onClick={() => {
              // replace with your reporting flow (open dialog / navigate)
              // example: navigate("/report?from=404");
              alert("Thanks — please send a short description to support.");
            }}
            sx={{ minWidth: 160 }}
          >
            Report Issue
          </Button>
        </Box>
      </Paper>

      {/* optional small footer */}
      <Box sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}>
        <Typography variant="caption">
          If you typed the address manually please double-check it.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
