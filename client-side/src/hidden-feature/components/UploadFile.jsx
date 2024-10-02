import * as React from "react";
import { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { serverReadfileUrl } from "../services/apiCallConstants";
import { serverUploadFileUrl } from "../services/apiCallConstants";

const UploadFile = ({ setData }) => {
  /**
   * All the States are defined here
   */
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseRec, setResponseRec] = useState(null);
  const [fileContent, setFileContent] = useState(null);
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
      const selectedFile = fileUploadRef.current.files[0];
      //create data object to send it in body
      const data = new FormData();
      //append the selected file to the data
      data.append("file", selectedFile);

      //server-side url to hit
      const url = serverUploadFileUrl;
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      //check the response to proceed accordingly
      if (response.status === 200) {
        const rec_data = await response.json();
        console.log(rec_data);
        setSelectedFile(null);
        setResponseRec(rec_data);
      }
    } catch (err) {
      console.log("Error message : ", err.message);
    }
  };
  //get the data read from the uploaded file as json
  const viewUploadedFileContent = async () => {
    try {
      if (responseRec !== null) {
        //sending folder name as params
        const folder_name = responseRec.uploadedFileName.split("/")[0];
        const url_to_hit = serverReadfileUrl + "/" + folder_name;
        console.log(url_to_hit);

        const response = await fetch(url_to_hit, {
          method: "GET", //trying to get the response from the server
        });

        if (response.status === 200) {
          const data = await response.json();
          setFileContent(data);
          console.log(data);
          setData(data);
        } else {
          const data = await response.json();
          console.log(data);
        }
      }
    } catch (err) {
      console.log("error-message : ", err.message);
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
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
              accept=".csv"
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
                : "file type .csv accepted only"}
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
              onClick={() => {
                viewUploadedFileContent();
              }}
              endIcon={<ArrowForwardIcon />}
            >
              View Uploaded File Content
            </Button>
          </>
        )}
      </Box>
    </React.Fragment>
  );
};

export default UploadFile;
