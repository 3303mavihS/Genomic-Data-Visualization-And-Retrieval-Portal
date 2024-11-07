import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import VisualizedData from "../main-app/components/VisualizedData";
import AddData from "../hidden-feature/components/AddData";
import DialogBox from "../main-app/components/DialogBox";
import SearchByGenePositionRange from "../main-app/components/SearchByGenePositionRange";
import SearchByGeneSize from "../main-app/components/SearchByGeneSize";
import SearchByGeneSequence from "../main-app/components/SearchByGeneSequence";
import { useSelector } from "react-redux";
import ExportGeneSequence from "../main-app/components/ExportGeneSequence";
import SearchInGeneData from "../main-app/components/SearchInGeneData";

const MainBody = ({ component, sx }) => {
  const dialogData = useSelector((state) => state.globalData.geneData);

  // console.log(dialogData);
  return (
    <Box component={component} sx={sx}>
      <Toolbar />
      <DialogBox dialogData={dialogData} />

      <Routes>
        <Route path="/" element={<VisualizedData />} />
        <Route path="search-in-gene-data" element={<SearchInGeneData />} />
        <Route path="search-by-gene-size" element={<SearchByGeneSize />} />
        <Route
          path="search-by-nucleotide-seq"
          element={<SearchByGeneSequence />}
        />
        <Route
          path="search-in-position-range"
          element={<SearchByGenePositionRange />}
        />
        <Route path="export-gene-sequence" element={<ExportGeneSequence />} />
      </Routes>
    </Box>
  );
};

export default MainBody;
