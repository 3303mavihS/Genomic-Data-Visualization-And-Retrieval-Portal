import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";

const SearchFromData = () => {
  const ref = useRef(null);
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
              // alignContent: "start",
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
                Search In Gene Data
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: 2, color: "#444" }}
                gutterBottom
              >
                Quickly retrieve gene records based on keywords, allowing users
                to filter results across various attributes within the genome
                data, making gene discovery easy and intuitive.
              </Typography>
            </Box>
            <Button variant="contained" size="large" download>
              <FormatAlignCenterOutlinedIcon />
            </Button>
          </Box>
        </Stack>
        {/* <Box
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
                  console.log(e.target.value);
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
              onClick={() => SearchByGenePositionRange(beginValue, endValue)}
              sx={{ height: "56px" }}
            >
              Get Data
            </Button>
          </Box>
        </Box> */}
        <hr />
      </Box>
    </React.Fragment>
  );
};

export default SearchFromData;
