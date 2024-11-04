import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, alpha } from "@mui/material/styles";
import "@splidejs/react-splide/css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, Route, Routes } from "react-router-dom";
import { useState } from "react";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  setToggleSidebar,
  setToggleTheme,
} from "../state-management/feature/elementReducer";
import { ListSubheader } from "@mui/material";
import Intro from "./Intro";
import Laboratories from "./Laboratories";

const drawerWidth = 300;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Home = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  //access global theme setter state
  const currentTheme = useSelector((state) => state.element.toggleTheme);
  //access global toggle sidebar state
  const showSidebar = useSelector((state) => state.element.toggleSideBar);

  const [sliderWidth, setSliderWidth] = useState(0);

  //change the theme value and dispatch it to global state
  const changeCurrentTheme = () => {
    if (currentTheme === "dark") {
      dispatch(setToggleTheme("light"));
      localStorage.setItem("currentTheme", "light");
    } else {
      dispatch(setToggleTheme("dark"));
      localStorage.setItem("currentTheme", "dark");
    }
  };

  //change the show sidebar value to show or hide the sidebar
  //and update the global value for togglesidebar state
  const toggleDrawer = () => {
    dispatch(setToggleSidebar(!showSidebar));
  };

  const [selectedButtonKey, setSelectedButtonKey] = useState(1);
  const handleListButtonClick = (key) => {
    setSelectedButtonKey(key);
  };

  useEffect(() => {
    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Get the width of the observed element (the Box)
        const newWidth = entry.contentRect.width;
        setSliderWidth(newWidth);
        console.log(newWidth);
      }
    });

    // Observe the parent element's size changes
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Cleanup when the component is unmounted or the ref changes
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={[
                {
                  mr: 2,
                },
              ]}
            >
              {!showSidebar ? <MenuIcon /> : <ArrowBackIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Bioinformatics and Computational Biology Centre
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Genome Here…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={changeCurrentTheme}
            >
              {currentTheme === "light" && <NightlightOutlinedIcon />}
              {currentTheme === "dark" && <WbSunnyOutlinedIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        {showSidebar && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto", padding: "" }}>
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <strong>Overview</strong>
                  </ListSubheader>
                }
              >
                <NavLink to="/intro">
                  <ListItemButton
                    selected={selectedButtonKey === 1}
                    onClick={() => handleListButtonClick(1)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Ralstonia solanacearum" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/dashboard/chromosome">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DataUsageOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chromosome" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/dashboard/plasmid">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DataUsageOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Plasmid" />
                  </ListItemButton>
                </NavLink>
              </List>
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <strong>Information</strong>
                  </ListSubheader>
                }
              >
                <NavLink to="/associate-laboratories">
                  <ListItemButton
                    selected={selectedButtonKey === 2}
                    onClick={() => handleListButtonClick(2)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Associate Laboratories" />
                  </ListItemButton>
                </NavLink>
              </List>
            </Box>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} ref={ref}>
          <Toolbar />

          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/associate-laboratories" element={<Laboratories />} />
          </Routes>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Home;
