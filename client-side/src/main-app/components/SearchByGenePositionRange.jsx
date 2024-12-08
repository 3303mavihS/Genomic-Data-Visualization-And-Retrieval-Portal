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
import {
  serverGetLastEndPoint,
  serverSearchByGenePositionRangeUrl,
} from "../services/mainAppApiCallConstants";
import { useSelector } from "react-redux";

const validateInputs = (begin, end, lastPoint) => {
  // Ensure values are numbers
  begin = Number(begin);
  end = Number(end);
  const maxLimit = Number(lastPoint);

  if (isNaN(begin) || isNaN(end)) {
    alert("Begin and End values must be valid numbers.");
    return false;
  }
  if (begin === 0 || end === 0) {
    return false;
  }

  if (begin < 0 || end < 0) {
    alert("Begin and End values cannot be negative numbers.");
    return false;
  }

  if (begin >= end) {
    alert("Begin value cannot be greater than or equal to End value.");
    return false;
  }

  if (begin > maxLimit || end > maxLimit) {
    alert(
      `Begin and End values cannot exceed the maximum limit of ${maxLimit}.`
    );
    return false;
  }

  return true;
};

const rectHeight = 19; // Height for all rectangles

const SearchByGenePositionRange = () => {
  const ref = useRef(null);
  const [beginValue, setBeginValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [strandValue, setStrandValue] = useState("both");
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [lastPoint, setLastPoint] = useState(0);
  const [dataRec, setDataRec] = useState(null);
  const [activeKey, setActiveKey] = useState(1);
  const [slideBegin, setSlideBegin] = useState(dataRec?.range.adjustedBegin);
  const [slideEnd, setSlideEnd] = useState(100000);
  // const dat = useSelector((state) => state.globalData.currentDataValue);
  const dat = sessionStorage.getItem("dat");
  //console.log(dat);

  const getlastEndPoint = async () => {
    try {
      const url = `${serverGetLastEndPoint}/params?dat=${dat}`;
      //console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLastPoint(data?.EndPoint);
      }
    } catch (err) {
      console.error("error_message : ", err.message);
    }
  };

  const getGenePositionRange = async (begin, end) => {
    const last = lastPoint;
    const valid = validateInputs(begin, end, last);
    if (valid) {
      try {
        //do the working
        const url = `${serverSearchByGenePositionRangeUrl}/params?dat=${dat}&begin=${begin}&end=${end}`;
        // //console.log(url);
        const response = await fetch(url);
        if (response.status === 200) {
          const data = await response.json();
          //console.log(data);
          setDataRec(data);
          setSlideBegin(data?.range.adjustedBegin + 1);
          setSlideEnd(data?.range.adjustedBegin + 100000);
        }
      } catch (err) {
        console.error("error_message : ", err.message);
      }
    }
  };

  // fetch the slide data to pass in the canvas by passing the slide start and end point
  const clickToGoSlide = async (startingRange, key) => {
    const slideRange = 100000;
    setActiveKey(key);
    //console.log("Slide :", key);
    const endParam = key * slideRange + startingRange;
    const beginParam = endParam - slideRange + 1;
    setSlideBegin(beginParam);
    setSlideEnd(endParam);
    //console.log("Begin : ", beginParam, " End : ", endParam);
    // getGenePositionRange(beginValue, endValue);
    /**
     * Creating url to fetch the data for the current slide
     * passign parameters and slide no.
     */
    // const url =
    //   serverSlideUrl +
    //   "/" +
    //   key +
    //   "/params?begin=" +
    //   beginParam +
    //   "&end=" +
    //   endParam;
    // console.log("Url : ", url);

    // try {
    //   const response = await fetch(url);
    //   if (response.status === 200) {
    //     const data = await response.json();
    //     console.log(data);
    //     /**
    //      * Since the each go to slide get the data between the slide range of 1lakh
    //      * and send the new data to canvas that triggers the rerender of the canvas with new and less data
    //      * but here we on this range search page the data has already been retrieved in one go
    //      * and sent to canvas since canvas can not show the whole data because of the our code
    //      * when the slide range changes the rerender happen but with our code it show the already sent data
    //      */
    //     // setDataRec(data);
    //   }
    // } catch (err) {
    //   console.log("error_message : ", err.message);
    // }
  };

  useEffect(() => {
    // const last  = getlastEndPoint()
    setLastPoint(getlastEndPoint());
    //console.log(lastPoint);
    // // Initialize ResizeObserver
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
  }, [canvasWidth]);

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
                Search By Gene Position Range
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
                Define a positional range to retrieve genes located within
                specific genome coordinates, ideal for targeted analysis in
                specific genome regions.
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
              label="Begin"
              variant="outlined"
              type="number"
              sx={{ width: "100px" }}
              value={beginValue}
              onChange={(e) => {
                setBeginValue(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="End"
              variant="outlined"
              type="number"
              sx={{ width: "100px" }}
              value={endValue}
              onChange={(e) => {
                setEndValue(e.target.value);
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
              onClick={() => getGenePositionRange(beginValue, endValue)}
              sx={{ height: "56px" }}
            >
              Get Data
            </Button>
          </Box>
        </Box>
        <hr />
        {dataRec?.data && (
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
                data={dataRec?.data}
                rectHeight={rectHeight}
                width={canvasWidth >= 1000 ? canvasWidth : 1000} // Numeric value
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
                    Total Slides In Given Range :{" "}
                    {Math.trunc(
                      (dataRec?.range.adjustedEnd -
                        dataRec?.range.adjustedBegin) /
                        100000
                    )}
                  </Button>
                  {Array.from(
                    {
                      length: Math.trunc(
                        (dataRec?.range.adjustedEnd -
                          dataRec?.range.adjustedBegin) /
                          100000
                      ),
                    },
                    (_, index) => (
                      <Button
                        variant={
                          activeKey === index + 1 ? "contained" : "outlined"
                        }
                        key={index}
                        onClick={() =>
                          clickToGoSlide(
                            dataRec?.range.adjustedBegin,
                            index + 1
                          )
                        } // Set count as index + 1
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
export default SearchByGenePositionRange;
