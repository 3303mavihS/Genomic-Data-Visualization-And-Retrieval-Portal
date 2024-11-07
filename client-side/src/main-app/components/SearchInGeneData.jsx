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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { serverGetResultFromDatabase } from "../services/mainAppApiCallConstants";
import { useDispatch, useSelector } from "react-redux";
import { setToggleDialogBox } from "../../state-management/feature/elementReducer";
import {
  setDialogGeneData,
  setGeneData,
} from "../../state-management/feature/dataReducer";

const SearchInGeneData = () => {
  const ref = useRef(null);

  // const [resultData, setResultData] = useState();
  const dispatch = useDispatch();
  // const dat = useSelector((state) => state.globalData.currentDataValue);
  const resultData = useSelector((state) => state.globalData.geneData);
  const keyword = useSelector((state) => state.globalData.searchKeyword);
  //console.log(resultData);
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
                Search Results :
              </Typography>
            </Box>
          </Box>
        </Stack>
        <hr />
        <Box
          component="div"
          className="contentDiv"
          sx={{ background: "", pb: 2 }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "24px", fontWeight: "bold", mb: 2, mt: 2 }}
          >
            {resultData !== "" &&
              resultData?.data?.length + " Result Found !!!"}
            {resultData === "" && "No Result Found !!!"}
          </Typography>

          {resultData !== "" &&
            resultData?.data?.map((result) => (
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
                        Ralstonia Chromosome ../ ../ .. {keyword} ../
                        <strong>
                          {result?.geneData?.Gene !== ""
                            ? result?.geneData?.Gene
                            : result?.geneData?.Label}{" "}
                          -- Match Found
                        </strong>
                      </Typography>

                      {/* Matching Attributes Table Starts Here */}
                      <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Typography sx={{ mt: 2, ml: 2 }}>
                          <strong>
                            "{keyword}" found in{" "}
                            {result?.geneData?.Gene !== ""
                              ? result?.geneData?.Gene
                              : result?.geneData?.Label}{" "}
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
                             
                            {Object.entries(result?.matchedFields).map(
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
                        //console.log("Button Clicked");
                        dispatch(setToggleDialogBox(true));
                        dispatch(setDialogGeneData(result?.geneData));
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
