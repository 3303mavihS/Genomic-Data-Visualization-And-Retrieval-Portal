import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";

const HiddenFeature = () => {
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
              Upload Data
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "50px",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Button
            variant="contained"
            size="large"
            href="/add-new-genome-data/upload-to-database"
          >
            Upload New Genome Data
          </Button>
          <Button
            variant="contained"
            size="large"
            href="/add-new-genome-data/upload-nucleotide-seq"
          >
            Upload Nucleotide Seq. File
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HiddenFeature;
