import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  isolation_process,
  rastonia_chromosome,
  rastonia_graph_legend,
  rastonia_plasmid,
} from "../constants";
import { useDispatch } from "react-redux";
import {
  setBreadCrumb,
  setCurrentDataValue,
} from "../state-management/feature/dataReducer";
import { Link } from "react-router-dom";

const Intro = () => {
  const dispatch = useDispatch();
  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "row", width: "100%", gap: "40px" }}
    >
      <Box
        component="div"
        sx={{
          width: "80%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
        }}
      >
        {/* <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: "700" }}>
          Ralstonia solanacearum F1C1
        </Typography> */}
        <Typography variant="p" sx={{ fontSize: "20px", fontWeight: "500" }}>
          A phytopathogenic bacterium with a wide host range
        </Typography>
        <hr style={{ width: "100%" }} />
        <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
          <Box component="div">
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              Ralstonia solanacearum is a gram-negative, proteobacterium that is
              the causative agent of wilt, which is one of the most severe
              vascular plant diseases in the world, infects more than 450 plant
              species. This bacterium has a high level of phenotypic and
              genotypic diversity and has a wide host range with huge geographic
              distribution. R. solanacearum can survive in soils or in water for
              years and when it encounters a suitable host, it invades the
              roots, colonizes their root cortex, invades the xylem vessels, and
              then colonize and block the entire vascular system. This portal
              presents the genome annotation of a recently isolated novel strain
              Ralstonia solanacearum F1C1 from Tezpur locality.{" "}
            </Typography>
          </Box>
          <Box
            component="div"
            className="image_div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              component="div"
              sx={{ cursor: "pointer", width: "35%" }}
              onClick={() => {
                // dispatch(setCurrentDataValue("RALSTONIA_CHROMOSOMEtrkikI1R1M"));
                // dispatch(setBreadCrumb("Chromosome"));
                sessionStorage.setItem("dat", "RALSTONIA_CHROMOSOMEtrkikI1R1M");
                sessionStorage.setItem("breadCrumb", "chromosome");
              }}
            >
              <Link to="/dashboard">
                <img
                  src={rastonia_chromosome}
                  alt=""
                  style={{ width: "100%" }}
                />
              </Link>
            </Box>
            <Box
              component="div"
              sx={{ cursor: "pointer", width: "35%" }}
              onClick={() => {
                // dispatch(setCurrentDataValue("modified_ralstoniagenedetails"));
                // dispatch(setBreadCrumb("Plasmid"));
                sessionStorage.setItem("dat", "RALSTONIA_PLASMIDajEm0h1H3Jp1L");
                sessionStorage.setItem("breadCrumb", "plasmid");
              }}
            >
              <Link to="/dashboard">
                <img src={rastonia_plasmid} alt="" style={{ width: "100%" }} />
              </Link>
            </Box>
          </Box>
          <Box component="div" style={{ margin: "0 auto" }}>
            <img
              src={rastonia_graph_legend}
              alt=""
              style={{ width: "350px" }}
            />
          </Box>
          <a
            href="/associated-laboratories"
            style={{ color: "blue", fontWeight: "bold", marginTop: "-20px" }}
          >
            [associated laboratories]
          </a>
        </Box>
      </Box>
      <Box component="div" className="isolation_div" style={{ width: "19%" }}>
        <Box
          component="div"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={isolation_process}
            alt=""
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
