import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LaunchIcon from "@mui/icons-material/Launch";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { serverSaveFileContentUrl } from "../services/apiCallConstants";
import { Link } from "react-router-dom";

const columns = [
  { id: "SlNo", label: "Sl No", align: "center" },
  { id: "Begin", label: "Start", align: "left" },
  { id: "End", label: "Stop", align: "left" },
  { id: "Strand", label: "Strand", align: "center" },
  { id: "Label", label: "Locus Tag", align: "center" },
  { id: "Type", label: "Gene Type", align: "center" },
  { id: "Gene", label: "Gene Name", align: "center" },
  { id: "Product", label: "Gene Product", align: "left", minwidth: 500 },
  {
    id: "NucleotideSeq",
    label: "Nucleotide Sequence",
    align: "left",
    minwidth: 370,
  },
  {
    id: "AminoAcidSeq",
    label: "Amino Acid Sequence",
    align: "left",
    minwidth: 370,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{ height: "10px" }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const VerifyAndSaveData = ({ fileContent }) => {
  const [genomeName, setGenomeName] = React.useState("");
  const [dataSaved, setDataSaved] = React.useState(false);
  const [savingProgress, setSavingProgress] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [dat, setDat] = React.useState("");
  let genome = genomeName;

  // console.log(fileContent);
  /**
   * after uploading the file the server
   * and displaying the content
   * we are saving the data to the database on our server
   */
  const saveData = async () => {
    setSavingProgress(true); // Start progress when the button is clicked
    setProgress(10); // Start progress at 10%
    try {
      //console.log("Data getting saved to Database.");
      const param_value = fileContent?.param_value;
      const genome_name = genomeName.toLowerCase().replace(/\s+/g, "");

      //just hit the url and pass the folder name in params to avoid sending the original file name in url
      //and the backend will handle the all the process
      const url_to_hit = serverSaveFileContentUrl;

      // console.log(param_value, genome_name);
      const response = await fetch(url_to_hit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set JSON content type
        },
        body: JSON.stringify({ param_value, genome_name }),
      });
      if (response.status === 200) {
        const data = await response.json();
        //console.log(data.dat);
        setDat(data.dat);
        // Simulate progress
        for (let i = 20; i <= 100; i += 5) {
          setProgress(i); // Increase progress
          await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate delay
        }
        //setProgress(100); // Complete progress
        alert("Data saved successfully!");
        setDataSaved(true);
      } else {
        // const data = await response.json();
        // console.log(data);
        alert("Failed to save data.");
      }
    } catch (err) {
      console.error("error_message : ", err.message);
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Box component="div">
        {savingProgress && progress !== 100 && (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        )}
        <Box
          component="div"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            gap: "16px",
          }}
          color="success"
        >
          {!dataSaved && (
            <TextField
              required
              id="outlined-required"
              label="Genome Name"
              placeholder="Enter the Genome Name"
              onChange={(e) => {
                setGenomeName(e.target.value);
              }}
              size="normal"
            />
          )}
          {genomeName && !savingProgress && (
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={saveData}
              sx={{ height: "56px" }}
            >
              Save To Database
            </Button>
          )}
          {progress === 100 && (
            <Link to="/dashboard">
              <Button
                variant="contained"
                size="large"
                startIcon={<LaunchIcon />}
                sx={{ height: "56px" }}
                onClick={() => {
                  sessionStorage.setItem("dat", dat);
                }}
              >
                Visit {genome}
              </Button>
            </Link>
          )}
        </Box>

        <Paper
          sx={{ width: "100%", height: "72vh", overflow: "hidden", mt: 2 }}
        >
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="file content preview">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* {JSON.stringify(fileContent)} */}
              {savingProgress && progress !== 100 && (
                <Backdrop
                  sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                  })}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
              <TableBody>
                {fileContent?.file_content?.length > 0 ? (
                  fileContent.file_content.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      Data Recieved is not in correct format.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Typography
          variant="h6"
          sx={{ mt: 1.5, fontSize: "12px", fontWeight: "400" }}
        >
          ** This table only contains first 20 lines from the file that you have
          uploaded to let you view and verify the content of the file.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            pt: 1.5,
            pb: 2,
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "left",
          }}
        >
          File Contains : {fileContent?.total_rows} Rows
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default VerifyAndSaveData;
