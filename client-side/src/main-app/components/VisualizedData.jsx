import * as React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Canvas from "./canvas-component/Canvas";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";

import {
  serverGetLastEndPoint,
  serverSlideUrl,
} from "../services/mainAppApiCallConstants";

const rectHeight = 23; // Height for all rectangles

const VisualizedData = () => {
  const ref = useRef(null);
  const [dataRec, setDataRec] = useState(null);
  const [lastPoint, setLastPoint] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [activeKey, setActiveKey] = useState(1);
  const [slideBegin, setSlideBegin] = useState(1);
  const [slideEnd, setSlideEnd] = useState(100000);
  const getlastEndPoint = async () => {
    try {
      const response = await fetch(serverGetLastEndPoint);
      if (response.ok) {
        const data = await response.json();
        //console.log(data.EndPoint);
        setLastPoint(data?.EndPoint);
      }
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };

  // fetch the slide data to pass in the canvas by passing the slide start and end point
  const clickToGoSlide = async (key) => {
    getlastEndPoint();
    const slideRange = 100000;
    setActiveKey(key);
    //console.log("Slide :", key);

    const endParam = key * slideRange;
    const beginParam = endParam - slideRange + 1;
    setSlideBegin(beginParam);
    setSlideEnd(endParam);
    //console.log("Start : ", beginParam, " End : ", endParam);

    /**
     * Creating url to fetch the data for the current slide
     * passign parameters and slide no.
     */
    const url =
      serverSlideUrl +
      "/" +
      key +
      "/params?begin=" +
      beginParam +
      "&end=" +
      endParam;
    //console.log("Url : ", url);

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        //console.log(data);
        setDataRec(data);
      }
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };

  useEffect(() => {
    clickToGoSlide(activeKey);
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
              height={660} // Numeric value
              style={{
                background: "#fff",
              }}
              slideBegin={slideBegin}
              slideEnd={slideEnd}
              strand={"both"}
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
      </Box>
    </React.Fragment>
  );
};

export default VisualizedData;
