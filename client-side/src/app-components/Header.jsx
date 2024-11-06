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

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

const Header = ({ position }) => {
  const dispatch = useDispatch();
  //access global theme setter state
  // const currentTheme = useSelector((state) => state.element.toggleTheme);
  //access global toggle sidebar state
  const showSidebar = useSelector((state) => state.element.toggleSideBar);

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

  //change the show sidebar value to show or hide the sidebar
  //and update the global value for togglesidebar state
  const toggleDrawer = () => {
    dispatch(setToggleSidebar(!showSidebar));
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
            Ralstonia Solanacearum F1C1
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Search>
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
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
