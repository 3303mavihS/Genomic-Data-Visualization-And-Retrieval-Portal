import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./app-components/Dashboard.jsx";
import Home from "./app-components/Home.jsx";
import SearchInGeneData from "./main-app/components/SearchInGeneData.jsx";
import SearchByGeneSize from "./main-app/components/SearchByGeneSize.jsx";
import SearchByGeneSequence from "./main-app/components/SearchByGeneSequence.jsx";
import SearchByGenePositionRange from "./main-app/components/SearchByGenePositionRange.jsx";
import ExportGeneSequence from "./main-app/components/ExtractNuqSequence.jsx";
import HiddenFeature from "./hidden-feature/components/HiddenFeature.jsx";
import Intro from "./app-components/Intro.jsx";
import Laboratories from "./app-components/Laboratories.jsx";
import AddNewGenomeToDatabase from "./hidden-feature/components/AddNewGenomeToDatabase.jsx";
import AddNucleotideSeq from "./hidden-feature/components/AddNucleotideSeq.jsx";

const App = () => {
  const currentTheme = useSelector((state) => state.element.toggleTheme);
  console.log("New Version : 1.0.0");

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            "Montserrat",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
        palette: {
          mode: currentTheme,
        },
      }),
    [currentTheme]
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="intro" element={<Intro />} />
            <Route path="associated-laboratories" element={<Laboratories />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
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
            <Route
              path="extract-nucleotide-sequence"
              element={<ExportGeneSequence />}
            />
          </Route>
          <Route path="/add-new-genome-data" element={<HiddenFeature />} />
          <Route
            path="/add-new-genome-data/upload-to-database"
            element={<AddNewGenomeToDatabase />}
          />
          <Route
            path="/add-new-genome-data/upload-nucleotide-seq"
            element={<AddNucleotideSeq />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
