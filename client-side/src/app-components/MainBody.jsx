import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import MainApp from "../main-app/components/MainApp";
import AddData from "../hidden-feature/components/AddData";
import DialogBox from "../main-app/components/DialogBox";
import GetRangeData from "../main-app/components/GetRangeData";
import GetLengthData from "../main-app/components/GetLengthData";
import SearchFromData from "../main-app/components/SearchFromData";
import SearchBySequence from "../main-app/components/SearchBySequence";
import { useSelector } from "react-redux";

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
          path="/:genomeName/search-by-length"
          element={<GetLengthData />}
        />
        <Route
          path="/:genomeName/search-by-nucleotide-seq"
          element={<SearchBySequence />}
        />
        <Route path="/:genomeName/search-in-range" element={<GetRangeData />} />
        <Route path="/add-new-genome-data" element={<AddData />} />
      </Routes>
    </Box>
  );
};

export default MainBody;
