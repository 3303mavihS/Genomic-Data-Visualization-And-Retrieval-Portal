import * as React from "react";
import { useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  serverGetCollectionList,
  serverSampleFastaFileDownloadUrl,
  serverUploadFastaFileUrl,
} from "../services/apiCallConstants";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { serverReadfileUrl } from "../services/apiCallConstants";
import { serverUploadFileUrl } from "../services/apiCallConstants";
import { useEffect } from "react";

const AddNucleotideSeq = () => {
  /**
   * All the States are defined here
   */
  const [fileContentRec, setFileContentRec] = useState(null);
  const [collectionList, setCollectionList] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseRec, setResponseRec] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [buttonClicked, setButtonCliced] = useState(false);
  const setDataFromChild = (data) => {
    setFileContentRec(data);
  };
  // making reference to the input for file picking
  const fileUploadRef = useRef(null);
  //open the dialog on click of the div
  const handleFileDialogBoxOpener = () => {
    event.preventDefault();
    fileUploadRef.current.click();
  };
  //do something with the selected file
  const frontEndChangeOnImageSelect = () => {
    if (fileUploadRef.current.files[0] !== null) {
      setSelectedFile(fileUploadRef.current.files[0]);
    }
  };
  //upload the selected file by hitting the backend url
  //and then upload to the server side upload folder
  const uploadSelectedFileToServer = async () => {
    try {
      const customFileName = localStorage.getItem("dat"); // Replace with your desired file name

      // Create FormData object
      const data = new FormData();
      data.append("file", selectedFile); // File field
      data.append("customFileName", customFileName); // Custom file name field
      // Define the server URL
      const url = serverUploadFastaFileUrl;
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      // Handle the response
      if (response.ok) {
        // Use `.ok` to check HTTP response status
        const rec_data = await response.json();
        console.log("Response Data:", rec_data);
        setSelectedFile(null); // Reset the file input
        setResponseRec(rec_data); // Update the UI with the response
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error("Error message:", err.message);
    }
  };

  //get all the collections from the database
  const getCollectionListFromDatabase = async () => {
    try {
      const url = serverGetCollectionList;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        setCollectionList(data);
        // console.log(data);
      }
    } catch (err) {
      console.error("error_message : ", err.message);
    }
  };

  useEffect(() => {
    getCollectionListFromDatabase();
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
              Upload Nucleotide Sequence
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
                Upload Nucleotide Sequence
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
              href={serverSampleFastaFileDownloadUrl}
              download
              startIcon={<DownloadIcon />}
            >
              Download Sample File
            </Button>
          </Box>
        </Stack>
        <hr />
        {!buttonClicked && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "74vh",
            }}
          >
            {collectionList &&
              collectionList.map((collection) => (
                <Button
                  key={collection.info.uuid}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    // console.log(`Button for ${collection.name} clicked`);
                    localStorage.setItem("dat", collection.name);
                    setButtonCliced(!buttonClicked);
                  }}
                >
                  {collection.name}
                </Button>
              ))}
          </Box>
        )}
        {buttonClicked && (
          <Box
            className="stepDiv"
            component="div"
            sx={{
              border: "2px dashed #3a3a3a",
              borderRadius: "15px",
              padding: "48px 24px",
              mt: 2,
            }}
          >
            {!responseRec && (
              <>
                {!selectedFile && (
                  <Box
                    className="iconBox"
                    sx={{
                      background: "#efeded88",
                      borderRadius: "50%",
                      width: "140px",
                      height: "140px",
                      padding: "20px",
                    }}
                    onClick={handleFileDialogBoxOpener}
                  >
                    <UploadFileIcon sx={{ width: "100px", height: "100px" }} />
                  </Box>
                )}
                <input
                  type="file"
                  id="file"
                  ref={fileUploadRef}
                  onChange={frontEndChangeOnImageSelect}
                  hidden
                  accept=".txt"
                />
                <Typography
                  variant="h4"
                  sx={{ fontSize: "20px", fontWeight: "600" }}
                >
                  {selectedFile && selectedFile.name
                    ? selectedFile.name
                    : "Upload Your File Here"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "16px", fontWeight: "400" }}
                >
                  {selectedFile && selectedFile.size
                    ? selectedFile.size < 1024
                      ? `${selectedFile.size} Bytes`
                      : selectedFile.size < 1024 * 1024
                      ? `${(selectedFile.size / 1024).toFixed(2)} KB`
                      : `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                    : "file type .txt accepted only"}
                </Typography>

                {selectedFile && (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={uploadSelectedFileToServer}
                      startIcon={<FileUploadIcon />}
                    >
                      Upload And Proceed
                    </Button>
                    <Button
                      variant="text"
                      size="large"
                      onClick={handleFileDialogBoxOpener}
                      sx={{ mt: -1 }}
                    >
                      Change File
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Activities after successful response */}
            {responseRec && (
              <>
                <Typography
                  variant="h4"
                  sx={{ fontSize: "20px", fontWeight: "600" }}
                >
                  File Uploaded SuccessFully!!!
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  href="/"
                  endIcon={<ArrowForwardIcon />}
                >
                  Visit Home
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default AddNucleotideSeq;
