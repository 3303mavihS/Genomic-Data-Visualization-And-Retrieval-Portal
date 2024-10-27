import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
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

  const getGeneSequenceToExport = async (beginIndexValue, endIndexValue) => {
    console.log(beginIndexValue, endIndexValue);
    const valid = validateInputs(beginIndexValue, endIndexValue);
    console.log(valid);
    if (valid) {
      try {
        const url =
          serverExportGeneSequenceUrl +
          "?beginIndex=" +
          beginIndexValue +
          "&endIndex=" +
          endIndexValue;
        console.log(url);
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "extracted_sequence.txt";
          document.body.appendChild(link);
          link.click();
          link.remove();
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

              <Typography
                variant="body1"
                sx={{ mt: 2, color: "#444" }}
                gutterBottom
              >
                Extract and export a gene sequence based on custom start and end
                points, allowing flexible data access for external analysis or
                reporting.
              </Typography>
            </Box>
            <Button variant="contained" size="large" download>
              <FormatAlignCenterOutlinedIcon />
            </Button>
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
      </Box>
    </React.Fragment>
  );
};

export default ExportGeneSequence;
