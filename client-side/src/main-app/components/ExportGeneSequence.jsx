import React, { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useSelector } from "react-redux";
import { serverExportGeneSequenceUrl } from "../services/mainAppApiCallConstants";

const validateInputs = (begin, end) => {
  const maxLimit = 5000;

  // Ensure values are numbers
  begin = Number(begin);
  end = Number(end);

  if (isNaN(begin) || isNaN(end)) {
    alert("Begin and End Index values must be valid numbers.");
    return false;
  }

  if (begin < 0 || end < 0) {
    alert("Begin and End Index values cannot be negative numbers.");
    return false;
  }

  if (begin >= end) {
    alert(
      "Begin Index value cannot be greater than or equal to End Index value."
    );
    return false;
  }

  if (begin > maxLimit || end > maxLimit) {
    alert(
      `Begin and End Index values cannot exceed the maximum limit of ${maxLimit}.`
    );
    return false;
  }

  return true;
};

const ExportGeneSequence = () => {
  const ref = useRef(null);
  const [beginIndexValue, setBeginIndexValue] = useState("");
  const [endIndexValue, setEndIndexValue] = useState("");
  const [extractedSeq, setExtractedSeq] = useState("");
  // const dat = useSelector((state) => state.globalData.currentDataValue);
  const dat = sessionStorage.getItem("dat");

  const getGeneSequenceToExport = async (beginIndexValue, endIndexValue) => {
    console.log(beginIndexValue, endIndexValue);
    const valid = validateInputs(beginIndexValue, endIndexValue);
    console.log(valid);
    if (valid) {
      try {
        const url = `${serverExportGeneSequenceUrl}/params?dat=${dat}&beginIndex=${beginIndexValue}&endIndex=${endIndexValue}`;
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        if (response.ok) {
          const textContent = await response.text(); // Read the text content
          setExtractedSeq(textContent); // Set the extracted sequence for display
          console.log("Extracted sequence:", textContent);

          // Optional: Prompt user to download before creating the link
          if (window.confirm("Sequence retrieved. Download?")) {
            const blob = new Blob([textContent], { type: "text/plain" }); // Create a blob
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "extracted_sequence.txt";
            document.body.appendChild(link);
            link.click();
            link.remove();
          }
        } else {
          console.log("Failed to download sequence:", response.statusText);
        }
      } catch (err) {
        console.log("error_message : ", err.message);
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box ref={ref}>
        <Stack direction={"row"} spacing={2}>
          <Box
            component="div"
            className="verticalCenterTheElement"
            sx={{
              width: "100%",
              textAlign: "right",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="div"
              sx={{
                width: "100%",
                textAlign: "left",
              }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: "32px", fontWeight: "700" }}
              >
                Export Gene Sequence
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
                Extract and export a gene sequence based on custom start and end
                points, allowing flexible data access for external analysis or
                reporting.
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Box
          component="div"
          className="contentDiv"
          sx={{ background: "", mt: 2 }}
        >
          <Box
            component="div"
            className="formInputDiv"
            sx={{ display: "flex", gap: "8px" }}
          >
            <TextField
              id="outlined-basic"
              label="Begin Index"
              variant="outlined"
              type="number"
              sx={{ width: "150px" }}
              value={beginIndexValue}
              onChange={(e) => {
                setBeginIndexValue(e.target.value);
                console.log(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="End Index"
              variant="outlined"
              type="number"
              sx={{ width: "150px" }}
              value={endIndexValue}
              onChange={(e) => {
                setEndIndexValue(e.target.value);
                console.log(e.target.value);
              }}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveAltIcon />}
              onClick={() =>
                getGeneSequenceToExport(beginIndexValue, endIndexValue)
              }
              sx={{ height: "56px" }}
            >
              Download File
            </Button>
          </Box>
        </Box>
        <hr />
        <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
          <pre>{extractedSeq.toUpperCase()}</pre>
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default ExportGeneSequence;
