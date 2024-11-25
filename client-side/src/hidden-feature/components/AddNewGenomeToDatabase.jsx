import * as React from "react";
import { useState } from "react";
import UploadFile from "./UploadFile";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { serverSampleFileDownloadUrl } from "../services/apiCallConstants";
import VerifyAndSaveData from "./VerifyAndSaveData";

const AddNewGenomeToDatabase = () => {
  const [fileContentRec, setFileContentRec] = useState(null);
  const setDataFromChild = (data) => {
    setFileContentRec(data);
  };
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
        <Stack direction={"row"} spacing={2}>
          <Box
            component="div"
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: "32px", fontWeight: "700" }}
            >
              Upload New Genome Data
            </Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                width: "inline",
                textAlign: "right",
                fontSize: "14px",
                mt: 2,
              }}
            >
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="none" color="text.primary" aria-current="page">
                {!fileContentRec && "Upload New Genome Data"}
                {fileContentRec && "Save File In Database"}
              </Link>
            </Breadcrumbs>
          </Box>
          <Box
            component="div"
            className="verticalCenterTheElement"
            sx={{
              width: "100%",
              textAlign: "right",
              justifyContent: "end",
              alignContent: "start",
            }}
          >
            <Button
              variant="contained"
              size="large"
              href={serverSampleFileDownloadUrl}
              download
              startIcon={<DownloadIcon />}
            >
              Download Sample Data
            </Button>
          </Box>
        </Stack>
        <hr />
        {fileContentRec === null && <UploadFile setData={setDataFromChild} />}
        {fileContentRec !== null && (
          <VerifyAndSaveData fileContent={fileContentRec} />
        )}
      </Box>
    </React.Fragment>
  );
};

export default AddNewGenomeToDatabase;
