import Header from "./Header";
import LeftSideDrawer from "./LeftSideDrawer";
import MainBody from "./MainBody";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const drawerWidth = 300;

const Dashboard = () => {
  //access global toggle sidebar state
  const showSidebar = useSelector((state) => state.element.toggleSideBar);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header position="fixed" />
        {showSidebar && (
          <LeftSideDrawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          />
        )}
        <MainBody
          component="main"
          sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}
        />
      </Box>
    </>
  );
};

export default Dashboard;
