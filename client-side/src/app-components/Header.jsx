import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  setToggleSidebar,
  setToggleTheme,
} from "../state-management/feature/elementReducer";
import { useState } from "react";
import { serverGetResultFromDatabase } from "../main-app/services/mainAppApiCallConstants";
import { useNavigate } from "react-router-dom";
import {
  setGeneData,
  setSearchKeyword,
} from "../state-management/feature/dataReducer";

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

const Header = ({ position }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  //access global theme setter state
  // const currentTheme = useSelector((state) => state.element.toggleTheme);
  //access global toggle sidebar state
  const showSidebar = useSelector((state) => state.element.toggleSideBar);
  // const bread = useSelector((state) => state.globalData.breadCrumb);
  const dat = sessionStorage.getItem("dat");
  const bread = sessionStorage.getItem("breadCrumb");
  //change the theme value and dispatch it to global state
  // const changeCurrentTheme = () => {
  //   if (currentTheme === "dark") {
  //     dispatch(setToggleTheme("light"));
  //     localStorage.setItem("currentTheme", "light");
  //   } else {
  //     dispatch(setToggleTheme("dark"));
  //     localStorage.setItem("currentTheme", "dark");
  //   }
  // };

  // const dat = useSelector((state) => state.globalData.currentDataValue);

  const handleFocus = () => {
    // Navigate after a delay to avoid immediate navigation
    setTimeout(() => {
      if (isFocused) {
        navigate("/dashboard/search-in-gene-data");
        setIsFocused(false);
      }
    }, 1000); // Adjust the delay as needed
  };

  const handleBlur = () => {
    setIsFocused(true);
  };

  //change the show sidebar value to show or hide the sidebar
  //and update the global value for togglesidebar state
  const toggleDrawer = () => {
    dispatch(setToggleSidebar(!showSidebar));
  };

  //searchfunction to get the result
  // Function to fetch and display search results based on a keyword
  const getKeywordResult = async (keyword) => {
    if (keyword !== "" && keyword.length >= 2) {
      try {
        //console.log(`Searching for keyword: ${keyword}`);

        // Define the URL with the keyword as a query parameter
        const url = `${serverGetResultFromDatabase}/params?dat=${dat}&keyword=${encodeURIComponent(
          keyword
        )}`;
        //console.log(`Request URL: ${url}`);

        // Fetch the data from the server
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
          //console.error(`Error: ${response.statusText}`);
          return;
        }

        // Parse the JSON data from the response
        const data = await response.json();
        //console.log(data);
        dispatch(setGeneData(data));
        // Check if there's data in the response
        // if (data.data && data.data.length > 0) {
        //   data.data.forEach((result) => {
        //     //console.log("Gene Data:", result.geneData);
        //     console.log("Matched Fields:", result.matchedFields);

        //     // Example: Display matched fields and their values
        // for (const [field, value] of Object.entries(result.matchedFields)) {
        //   console.log(`Field: ${field}, Value: ${value}`);
        // }
        //   });
        // } else {
        //   console.log("No matching data found for the given keyword.");
        // }
      } catch (err) {
        console.error("An error occurred:", err.message);
      }
    } else {
      dispatch(setGeneData(""));
    }
  };

  return (
    <Box>
      <AppBar
        position={position}
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
            Ralstonia Solanacearum F1C1 {"- " + bread}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Genome Here…"
              inputProps={{ "aria-label": "search" }}
              value={keyword}
              onChange={(e) => {
                // console.log(e.target.value);
                setKeyword(e.target.value);
                getKeywordResult(e.target.value);
                handleFocus();
                dispatch(setSearchKeyword(e.target.value));
              }}
              // onFocus={() => {
              //   handleFocus();
              //   console.log("onFocus");
              // }}
              onBlur={() => {
                handleBlur();
                //console.log("OnBlur");
              }}
            />
          </Search>
          {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={changeCurrentTheme}
          >
            {currentTheme === "light" && <NightlightOutlinedIcon />}
            {currentTheme === "dark" && <WbSunnyOutlinedIcon />}
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
