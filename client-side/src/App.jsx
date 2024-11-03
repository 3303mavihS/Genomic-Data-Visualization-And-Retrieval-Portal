import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Dashboard from "./app-components/Dashboard.jsx";
import HomePage from "./app-components/HomePage.jsx";
import MainApp from "./main-app/components/MainApp.jsx";
import SearchInGeneData from "./main-app/components/SearchInGeneData.jsx";
import SearchByGeneSize from "./main-app/components/SearchByGeneSize.jsx";
import SearchByGeneSequence from "./main-app/components/SearchByGeneSequence.jsx";
import SearchByGenePositionRange from "./main-app/components/SearchByGenePositionRange.jsx";
import ExportGeneSequence from "./main-app/components/ExportGeneSequence.jsx";
import AddData from "./hidden-feature/components/AddData.jsx";

const App = () => {
  const currentTheme = useSelector((state) => state.element.toggleTheme);
  const { genome } = useParams();
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
          <Route exact path="/" element={<HomePage />} />
          <Route path="/dashboard/:genome" element={<Dashboard />}>
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
              path="export-gene-sequence"
              element={<ExportGeneSequence />}
            />
            <Route path="add-new-genome-data" element={<AddData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
