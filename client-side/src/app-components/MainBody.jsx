import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import MainApp from "../main-app/components/MainApp";
import AddData from "../hidden-feature/components/AddData";
import DialogBox from "../main-app/components/DialogBox";
import SearchByGenePositionRange from "../main-app/components/SearchByGenePositionRange";
import SearchByGeneSize from "../main-app/components/SearchByGeneSize";
import SearchFromData from "../main-app/components/SearchFromData";
import SearchByGeneSequence from "../main-app/components/SearchByGeneSequence";
import { useSelector } from "react-redux";
import ExportGeneSequence from "../main-app/components/ExportGeneSequence";

const MainBody = ({ component, sx }) => {
  const dialogData = useSelector((state) => state.globalData.geneData);
  // console.log(dialogData);
  return (
    <Box component={component} className="uploadMainDiv" sx={sx}>
      <Toolbar />
      <DialogBox dialogData={dialogData} />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/:genomeName" element={<MainApp />} />
        <Route
          path="/:genomeName/search-from-data"
          element={<SearchFromData />}
        />
        <Route
          path="/:genome-name/search-by-gene-size"
          element={<SearchByGeneSize />}
        />
        <Route
          path="/:genomeName/search-by-nucleotide-seq"
          element={<SearchByGeneSequence />}
        />
        <Route path="/:genome-name/search-in-position-range" element={<SearchByGenePositionRange />} />
        <Route path="/:genome-name/export-gene-sequence" element={<ExportGeneSequence />} />
        <Route path="/add-new-genome-data" element={<AddData />} />
      </Routes>
    </Box>
  );
};

export default MainBody;
