import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";
import Canvas from "./canvas-component/Canvas";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { serverGetLengthRangeDataUrl } from "../services/mainAppApiCallConstants";
import { useSelector } from "react-redux";

const validateInputs = (min, max) => {
  const maxLimit = 5000;

  // Ensure values are numbers
  min = Number(min);
  max = Number(max);

  if (isNaN(min) || isNaN(max)) {
    alert("Begin and End values must be valid numbers.");
    return false;
  }

  if (min < 0 || max < 0) {
    alert("Min Length and Max Length values cannot be negative numbers.");
    return false;
  }

  if (min > max) {
    alert(
      "Min Length value cannot be greater than or equal to Max Length value."
    );
    return false;
  }

  if (min > maxLimit || max > maxLimit) {
    alert(
      `Min Length and Max Length values cannot exceed the maximum limit of ${maxLimit}.`
    );
    return false;
  }

  return true;
};

const rectHeight = 19; // Height for all rectangles

const SearchByGeneSize = () => {
  const ref = useRef(null);
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [strandValue, setStrandValue] = useState("both");
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [dataRec, setDataRec] = useState(null);
  const [activeKey, setActiveKey] = useState(1);
  const [slideBegin, setSlideBegin] = useState(1);
  const [slideEnd, setSlideEnd] = useState(100000);
  const [lastPoint, setLastPoint] = useState();
  // const dat = useSelector((state) => state.globalData.currentDataValue);
  const dat = sessionStorage.getItem("dat");

  const getLengthRangeData = async (min, max) => {
    const valid = validateInputs(min, max);
    if (valid) {
      try {
        //do the working
        const url = `${serverGetLengthRangeDataUrl}/params?dat=${dat}&gene_min_length=${minLength}&gene_max_length=${maxLength}`;
        //console.log(url);
        const response = await fetch(url);
        if (response.status === 200) {
          const data = await response.json();
          //console.log(data);
          setDataRec(data);
          // setSlideBegin(data?.range.adjustedBegin + 1);
          // setSlideEnd(data?.range.adjustedBegin + 100000);
          setSlideBegin(1);
          setSlideEnd(100000);
          setLastPoint(data?.lastDocumentEndValue);
        }
      } catch (err) {
        console.error("error_message : ", err.message);
      }
    }
  };

  // fetch the slide data to pass in the canvas by passing the slide start and end point
  const clickToGoSlide = async (key) => {
    const slideRange = 100000;
    setActiveKey(key);
    //console.log("Slide :", key);
    const endParam = key * slideRange;
    const beginParam = endParam - slideRange + 1;
    setSlideBegin(beginParam);
    setSlideEnd(endParam);
    //console.log("Begin : ", beginParam, " End : ", endParam);
  };

  useEffect(() => {
    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Get the width of the observed element (the Box)
        const newWidth = entry.contentRect.width;
        setCanvasWidth(newWidth);
      }
    });

    // Observe the parent element's size changes
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Cleanup when the component is unmounted or the ref changes
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

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
                Search By Gene Size
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
                Specify a size range to find genes that match the desired
                length, enabling comparative studies and size-based research.
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
              label="Min. Length"
              variant="outlined"
              type="number"
              sx={{ width: "150px" }}
              value={minLength}
              onChange={(e) => {
                setMinLength(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Max. Length"
              variant="outlined"
              type="number"
              sx={{ width: "150px" }}
              value={maxLength}
              onChange={(e) => {
                setMaxLength(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <FormControl sx={{ width: "100px" }}>
              <InputLabel id="demo-simple-select-label">Strand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={strandValue}
                label="Strand"
                onChange={(e) => {
                  setStrandValue(e.target.value);
                  //console.log(e.target.value);
                }}
              >
                <MenuItem value={"+"}>+</MenuItem>
                <MenuItem value={"-"}>-</MenuItem>
                <MenuItem value={"both"}>All</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchRoundedIcon />}
              onClick={() => getLengthRangeData(minLength, maxLength)}
              sx={{ height: "56px" }}
            >
              Get Genes
            </Button>
          </Box>
        </Box>
        <hr />
        {dataRec?.genes && (
          <Box component="div" className="contentDiv" sx={{ background: "" }}>
            <Box
              component="div"
              className="canvasDiv"
              sx={{
                overflowX: "scroll",
                overflowY: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Canvas
                data={dataRec?.genes}
                rectHeight={rectHeight}
                width={canvasWidth >= 900 ? canvasWidth - 2 : 900} // Numeric value
                height={560} // Numeric value
                style={{
                  background: "#fff",
                }}
                slideBegin={slideBegin}
                slideEnd={slideEnd}
                strand={strandValue}
              />
            </Box>

            <Box
              component="div"
              className="slideButtonMainDiv"
              sx={{
                flexGrow: "1",
                background: "",
                maxWidth: "100%",
                overflowX: "scroll",
                overflowY: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Box
                component="div"
                className="slideButtonSet"
                sx={{ textAlign: "center", mt: 1, mb: 0.5 }}
              >
                <ButtonGroup
                  variant="outlined"
                  color="primary"
                  size="small"
                  aria-label="button group"
                >
                  <Button size="small" variant="outlined">
                    Total Slides : {Math.trunc(lastPoint / 100000 + 1)}
                  </Button>
                  {Array.from(
                    { length: Math.trunc(lastPoint / 100000 + 1) },
                    (_, index) => (
                      <Button
                        variant={
                          activeKey === index + 1 ? "contained" : "outlined"
                        }
                        key={index}
                        onClick={() => clickToGoSlide(index + 1)} // Set count as index + 1
                      >
                        {index + 1}
                      </Button>
                    )
                  )}
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default SearchByGeneSize;
