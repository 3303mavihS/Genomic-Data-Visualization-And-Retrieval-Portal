/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AutofpsSelectIcon from "@mui/icons-material/AutofpsSelect";
import DataObjectIcon from "@mui/icons-material/DataObject";
import StraightenIcon from "@mui/icons-material/Straighten";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";

const LeftSideDrawer = ({ variant, sx }) => {
  const { genome } = useParams();
  const [selectedButtonKey, setSelectedButtonKey] = useState(1);
  const handleListButtonClick = (key) => {
    setSelectedButtonKey(key);
  };
  return (
    <Drawer variant={variant} sx={sx}>
      <Toolbar />
      <Box sx={{ overflow: "auto", padding: "" }}>
        <List component="nav">
          <NavLink to="/">
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </NavLink>

          <NavLink to={`/dashboard`}>
            <ListItemButton
              selected={selectedButtonKey === 1}
              onClick={() => handleListButtonClick(1)}
            >
              <ListItemIcon>
                <DonutLargeIcon />
              </ListItemIcon>
              <ListItemText primary="Visualized Data" />
            </ListItemButton>
          </NavLink>

          {/* <NavLink to={`/dashboard/search-in-gene-data`}>
            <ListItemButton
              selected={selectedButtonKey === 2}
              onClick={() => handleListButtonClick(2)}
            >
              <ListItemIcon>
                <DataObjectIcon />
              </ListItemIcon>
              <ListItemText primary="Search In Gene Data" />
            </ListItemButton>
          </NavLink> */}

          <NavLink to={`/dashboard/search-by-nucleotide-seq`}>
            <ListItemButton
              selected={selectedButtonKey === 3}
              onClick={() => handleListButtonClick(3)}
            >
              <ListItemIcon>
                <AutofpsSelectIcon />
              </ListItemIcon>
              <ListItemText primary="Search By Gene Sequence" />
            </ListItemButton>
          </NavLink>

          <NavLink to={`/dashboard/search-in-position-range`}>
            <ListItemButton
              selected={selectedButtonKey === 4}
              onClick={() => handleListButtonClick(4)}
            >
              <ListItemIcon>
                <CompareArrowsIcon />
              </ListItemIcon>
              <ListItemText primary="Search By Gene Position Range" />
            </ListItemButton>
          </NavLink>

          <NavLink to={`/dashboard/search-by-gene-size`}>
            <ListItemButton
              selected={selectedButtonKey === 5}
              onClick={() => handleListButtonClick(5)}
            >
              <ListItemIcon>
                <StraightenIcon />
              </ListItemIcon>
              <ListItemText primary="Search By Gene Size" />
            </ListItemButton>
          </NavLink>

          <NavLink to={`/dashboard/extract-nucleotide-sequence`}>
            <ListItemButton
              selected={selectedButtonKey === 6}
              onClick={() => handleListButtonClick(6)}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Extract Nucleotide Sequence" />
            </ListItemButton>
          </NavLink>
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftSideDrawer;
