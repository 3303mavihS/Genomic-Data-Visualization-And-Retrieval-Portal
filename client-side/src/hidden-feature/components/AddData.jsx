import * as React from "react";
import { useState } from "react";
import UploadFile from "./UploadFile";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { serverSampleFileDownloadUrl } from "../services/apiCallConstants";
import VerifyAndSaveData from "./VerifyAndSaveData";

const AddData = () => {
  const [fileContentRec, setFileContentRec] = useState(null);
  const setDataFromChild = (data) => {
    setFileContentRec(data);
  };
  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
        <Box
          component="div"
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ fontSize: "32px", fontWeight: "700" }}>
            Add New Genome Data
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
  );
};

export default AddData;
