import React, { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { serverGetTheGeneDataByNucSeq } from "../services/mainAppApiCallConstants";
import { useSelector } from "react-redux";

const SearchByGeneSequence = () => {
  const ref = useRef(null);
  const [seq, setSeq] = useState("");
  const [dataRec, setDataRec] = useState(null);
  const [dataFound, setDataFound] = useState(false);
  // const dat = useSelector((state) => state.globalData.currentDataValue);
  const dat = sessionStorage.getItem("dat");

  //get the result for the sequence
  const getGeneBySequence = async (seq) => {
    if (seq !== "") {
      try {
        //code
        const url = `${serverGetTheGeneDataByNucSeq}/params?dat=${dat}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Important to specify the JSON content type
          },
          body: JSON.stringify({ gene_seq: seq }), // Send the sequence as part of the request body
        });

        // Check if the response is OK (status 200)
        if (response.ok) {
          const data = await response.json();
          setDataRec(data?.geneData);
          //console.log(data?.geneData);
          setDataFound(true);
        } else {
          // Handle non-OK responses (e.g., 404 or 500)
          const data = await response.json();
          setDataRec(data);
          ////console.log("Error from server:", data.error_message);
          setDataFound(false);
        }
      } catch (err) {
        console.error("error_message : ", err.message);
      }
    } else {
      alert("Enter the Nucleotide Sequence.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
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
                Search By Gene Sequence
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
                Input a specific gene sequence to directly access detailed
                information on matching genes, streamlining access to
                sequence-specific data.
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
              id="outlined-multiline-flexible"
              label="Nucleotide Sequence"
              multiline
              maxRows={10}
              sx={{ width: "100%" }}
              value={seq}
              onChange={(e) => {
                setSeq(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchRoundedIcon />}
              onClick={() => getGeneBySequence(seq)}
              sx={{ height: "56px", width: "180px" }}
            >
              Get Gene
            </Button>
          </Box>
        </Box>
        <hr />

        <Box
          component="div"
          className="contentDiv"
          sx={{ background: "", pb: 2 }}
        >
          {dataRec && (
            <Typography
              variant="h3"
              sx={{ fontSize: "24px", fontWeight: "bold", mb: 2, mt: 2 }}
            >
              Result {dataFound ? "Found" : "Not Found"} !!!{" "}
              {dataFound && (
                <>
                  {" "}
                  Gene Name :{" "}
                  {dataRec?.Gene === "" ? dataRec?.Label : dataRec?.Gene}
                </>
              )}
            </Typography>
          )}

          {dataRec && (
            <TableContainer component={Paper}>
              <Table sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell align="right" sx={{ width: "500px" }}>
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Map the gene data object into table rows */}
                  {Object.entries(dataRec).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          width: "500px",
                          wordWrap: "break-word",
                          overflowX: "scroll",
                          overflowY: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {value !== "" ? (
                          <>
                            <ContentCopyIcon
                              sx={{
                                color: "#aeaeae",
                                width: "20px",
                                height: "20px",
                                marginBottom: "-4px",
                                cursor: "pointer",
                              }}
                              onClick={() => copyToClipboard(value)}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;{value}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SearchByGeneSequence;
