import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./app-components/Dashboard.jsx";

const App = () => {
  const currentTheme = useSelector((state) => state.element.toggleTheme);
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
        <Dashboard />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
