import React, { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { serverGetResultFromDatabase } from "../services/mainAppApiCallConstants";
import { useDispatch } from "react-redux";
import { setToggleDialogBox } from "../../state-management/feature/elementReducer";
import { setGeneData } from "../../state-management/feature/dataReducer";

const SearchInGeneData = () => {
  const ref = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [resultData, setResultData] = useState();
  const dispatch = useDispatch();

  //searchfunction to get the result
  // Function to fetch and display search results based on a keyword
  const getKeywordResult = async (keyword) => {
    if (keyword !== "") {
      try {
        console.log(`Searching for keyword: ${keyword}`);

        // Define the URL with the keyword as a query parameter
        const url = `${serverGetResultFromDatabase}?keyword=${encodeURIComponent(
          keyword
        )}`;
        console.log(`Request URL: ${url}`);

        // Fetch the data from the server
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log(data);
        setResultData(data);
        // Check if there's data in the response
        // if (data.data && data.data.length > 0) {
        //   data.data.forEach((result) => {
        //     //console.log("Gene Data:", result.geneData);
        //     console.log("Matched Fields:", result.matchedFields);

        //     // Example: Display matched fields and their values
        // for (const [field, value] of Object.entries(result.matchedFields)) {
        //   console.log(`Field: ${field}, Value: ${value}`);
        // }
        //   });
        // } else {
        //   console.log("No matching data found for the given keyword.");
        // }
      } catch (err) {
        console.error("An error occurred:", err.message);
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

              <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
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
              id="outlined-multiline-flexible"
              label="Enter Keyword"
              sx={{ width: "100%" }}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                // console.log(e.target.value);
                setResultData(null);
              }}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchRoundedIcon />}
              onClick={() => getKeywordResult(keyword)}
              sx={{ height: "56px", width: "180px" }}
            >
              Search
            </Button>
          </Box>
        </Box>
        <hr />
        <Box
          component="div"
          className="contentDiv"
          sx={{ background: "", pb: 2 }}
        >
          {resultData && (
            <Typography
              variant="h3"
              sx={{ fontSize: "24px", fontWeight: "bold", mb: 2, mt: 2 }}
            >
              {resultData?.data.length} Result Found !!!
            </Typography>
          )}

          {resultData?.data.map((result) => (
            <Paper
              elevation={4}
              key={result.id}
              sx={{ pt: 2, pb: 2, pr: 3, pl: 3, mt: 2 }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: "24px", fontWeight: "bold", mb: 2, mt: 2 }}
              >
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography>
                      Ralstonia Chromosome ../ ../ .. <strong>{keyword}</strong>{" "}
                      ../ -- <strong>Match Found</strong>
                    </Typography>

                    {/* Matching Attributes Table Starts Here */}
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Typography sx={{ mt: 2, ml: 2 }}>
                        <strong>
                          "{keyword}" found in{" "}
                          {result.geneData.Gene !== ""
                            ? result.geneData.Gene
                            : result.geneData.Label}{" "}
                          gene.
                        </strong>
                      </Typography>
                      <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell align="right">Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {" "}
                           
                          {Object.entries(result.matchedFields).map(
                            ([field, value]) => (
                              <TableRow
                                key={field}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {field}
                                </TableCell>
                                <TableCell align="right">{value}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* Matching Attributes Table Ends Here */}
                  </Box>

                  <Button
                    variant="text"
                    onClick={() => {
                      console.log("Button Clicked");
                      dispatch(setToggleDialogBox(true));
                      dispatch(setGeneData(result.geneData));
                    }}
                  >
                    View Gene
                  </Button>
                </Box>
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SearchInGeneData;
