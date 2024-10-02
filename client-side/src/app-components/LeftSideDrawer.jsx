import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const LeftSideDrawer = ({ variant, sx }) => {
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
            <ListItemButton
              selected={selectedButtonKey === 1}
              onClick={() => handleListButtonClick(1)}
            >
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/:genomeName/search-from-data">
            <ListItemButton
              selected={selectedButtonKey === 2}
              onClick={() => handleListButtonClick(2)}
            >
              <ListItemIcon>
                <RadioButtonCheckedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Search In Genome Data" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/:genomeName/search-by-nucleotide-seq">
            <ListItemButton
              selected={selectedButtonKey === 3}
              onClick={() => handleListButtonClick(3)}
            >
              <ListItemIcon>
                <RadioButtonCheckedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Search By Nucleotide Seq." />
            </ListItemButton>
          </NavLink>
          <NavLink to="/modified_ralstoniagenedetails/search-in-range">
            <ListItemButton
              selected={selectedButtonKey === 4}
              onClick={() => handleListButtonClick(4)}
            >
              <ListItemIcon>
                <RadioButtonCheckedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Get Genes in Range" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/:genomeName/search-by-length">
            <ListItemButton
              selected={selectedButtonKey === 5}
              onClick={() => handleListButtonClick(5)}
            >
              <ListItemIcon>
                <RadioButtonCheckedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Get Genes of Length" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/add-new-genome-data">
            <ListItemButton
              selected={selectedButtonKey === 6}
              onClick={() => handleListButtonClick(6)}
            >
              <ListItemIcon>
                <UploadOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Genome Data" />
            </ListItemButton>
          </NavLink>
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftSideDrawer;
