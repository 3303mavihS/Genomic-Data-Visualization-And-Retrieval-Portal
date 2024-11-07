import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setToggleDialogBox } from "../../state-management/feature/elementReducer";
import { serverGetTheGeneDataByNextPrevBtn } from "../services/mainAppApiCallConstants";
import { setGeneData } from "../../state-management/feature/dataReducer";

function downloadTextFile(jsonData) {
  // Convert JSON data to a string
  const textData = JSON.stringify(jsonData, null, 2); // Indented JSON for readability

  // Create a temporary link element
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textData)
  );
  element.setAttribute("download", "gene.txt");

  // Append the link to the document body
  document.body.appendChild(element);

  // Trigger the download
  element.click();

  // Remove the temporary link element
  document.body.removeChild(element);
}

const DialogBox = ({ dialogData }) => {
  const openDialogBox = useSelector((state) => state.element.toggleDialogBox);
  const dat = useSelector((state) => state.globalData.currentDataValue);
  //const dialogData = useSelector((state) => state.globalData.geneData);
  const dispatch = useDispatch();
  // console.log(dialogData);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    dispatch(setToggleDialogBox(false));
  };

  //show only selected attributes
  const selectedAttributes = [
    "Begin",
    "End",
    "Strand",
    "NucleotideSeq",
    "AminoAcidSeq",
    "Label",
    "Type",
    "Gene",
    "Product",
  ];

  const handleBtnClick = async (slno) => {
    try {
      //code
      // console.log(slno);
      const url = `${serverGetTheGeneDataByNextPrevBtn}/params?dat=${dat}&gene_slno=${slno}`;
      // console.log(url);
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        dispatch(setGeneData(data));
      }
    } catch (err) {
      console.log("error_message : ", err.message);
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
      <Dialog
        scroll="paper"
        fullScreen={fullScreen}
        maxWidth="md"
        open={openDialogBox}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box component="div">
          <DialogTitle
            id="responsive-dialog-title"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ArrowBackIosIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleBtnClick(parseInt(dialogData?.SlNo) - 1)}
            />
            {dialogData?.Gene === "" ? dialogData?.Label : dialogData?.Gene}
            {/* {dialogData?.Gene} */}
            <ArrowForwardIosIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleBtnClick(parseInt(dialogData?.SlNo) + 1)}
            />
          </DialogTitle>
        </Box>
        <DialogContent dividers={scroll === "paper"}>
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
                {Object.entries(dialogData)
                  .filter(([key]) => selectedAttributes.includes(key))
                  .map(([key, value]) => (
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
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<FileDownloadIcon />}
            onClick={() => {
              downloadTextFile(dialogData);
            }}
          >
            Download Gene Data
          </Button>
          <Button
            variant="contained"
            size="medium"
            autoFocus
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogBox;
