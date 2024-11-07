import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "@splidejs/react-splide/css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Route, Routes } from "react-router-dom";

import Intro from "./Intro";
import Laboratories from "./Laboratories";

const Home = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Ralstonia Solanacearum F1C1
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/associated-laboratories" element={<Laboratories />} />
          </Routes>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Home;
