import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, alpha } from "@mui/material/styles";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
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
import {
  rastoniaImage1,
  rastoniaImage2,
  rastoniaImage3,
  rastoniaImage4,
  rastoniaImage5,
} from "../constants";

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

const HomePage = () => {
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
                <NavLink to="/">
                  <ListItemButton selected sx={{ pl: 4 }}>
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
            </Box>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} ref={ref}>
          <Toolbar />
          <Box
            component="div"
            className="verticalCenterTheElement"
            sx={{
              width: "100%",
              textAlign: "right",
              alignItems: "start",
              justifyContent: "space-between",
              // alignContent: "start",
            }}
          >
            <Box
              component="div"
              sx={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: "32px", fontWeight: "700" }}
              >
                Ralstonia solanacearum
              </Typography>

              <Typography
                variant="p"
                sx={{ fontSize: "20px", fontWeight: "500" }}
              >
                A phytopathogenic bacterium with a wide host range
              </Typography>

              <hr style={{ width: "100%" }} />
              <Box component="div" sx={{ display: "flex", gap: "20px" }}>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "justify", width: "calc (100vw - 300px)" }}
                  gutterBottom
                >
                  Ralstonia solanacearum, previously known as Pseudomonas
                  solanacearum, was originally described by Smith (1896) as the
                  causative agent of bacterial wilt of solanaceous plants. It is
                  internationally recognized as one of the leading models in the
                  analysis of plant pathogenicity. This soil bacterium is the
                  causal agent of a severe and devastating disease of major
                  economical importance on solanaceous crops. It also causes
                  disease on the model plant Arabidopsis thaliana, therefore
                  facilitating analysis of basic molecular mechanisms governing
                  pathogenicity. The high economic and social impact of this
                  organism results from its wide geographical distribution in
                  all warm and tropical countries of the globe. This impact also
                  results from the very wide host range of R. solanacearum which
                  comprises over 200 plant species, representing over 50
                  botanical families and covering both monocots and dicots
                  extending from annual plants to trees and shrubs. Recently,
                  geographical distribution of the pathogen has been extended to
                  more temperate countries from Europe and North America as the
                  result of the dissemination of strains adapted to cooler
                  climates.
                </Typography>
                <img
                  src={rastoniaImage1}
                  alt=""
                  style={{ width: "300px", objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{ textAlign: "justify" }}
                gutterBottom
              >
                The sequencing and annotation of the complete genome from strain
                GMI1000, performed in collaboration with the French sequencing
                center Genoscope, has been a major achievement which has
                contributed to the development of genomic resources to study the
                pathogenicity determinants in this bacterium. GMI1000 is a wide
                host range strain originally isolated from tomato in French
                Guyana. It is a race 1 biovar 3 strain belonging to Phylotype I.
                Recently the draft genome sequence of two additional strains was
                realized. Both strains belong to Phylotype II. Strain Molk2 was
                isolated from banana in Philippines and is classified as a race
                2 strain while strain IPO1609 is race 3 (potato) strain isolated
                in the Netherlands.
              </Typography>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Splide
                  hasTrack={false}
                  options={{
                    width: "960px",
                    type: "loop",
                    perPage: 3,
                    perMove: 1,
                    gap: "30px",
                  }}
                >
                  <SplideTrack>
                    <SplideSlide>
                      <img
                        src={rastoniaImage1}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        alt=""
                      />
                    </SplideSlide>
                    <SplideSlide>
                      <img
                        src={rastoniaImage2}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        alt=""
                      />
                    </SplideSlide>
                    <SplideSlide>
                      <img
                        src={rastoniaImage3}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        alt=""
                      />
                    </SplideSlide>
                    <SplideSlide>
                      <img
                        src={rastoniaImage4}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        alt=""
                      />
                    </SplideSlide>
                    <SplideSlide>
                      <img
                        src={rastoniaImage5}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        alt=""
                      />
                    </SplideSlide>
                  </SplideTrack>
                </Splide>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: "32px",
                  fontWeight: "700",
                  marginTop: "50px",
                  textAlign: "center",
                }}
              >
                Ralstonia solanacearum in North Eastern Region of India
              </Typography>

              <Box
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    margin: "20px",
                  }}
                >
                  <img
                    src={rastoniaImage1}
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                  />
                  <Typography
                    variant="p"
                    sx={{ fontSize: "20px", fontWeight: "500" }}
                  >
                    Chromosome
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ height: "56px", width: "180px" }}
                  >
                    View
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    margin: "20px",
                  }}
                >
                  <img
                    src={rastoniaImage4}
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                  />
                  <Typography
                    variant="p"
                    sx={{ fontSize: "20px", fontWeight: "500" }}
                  >
                    Plasmid
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ height: "56px", width: "180px" }}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
