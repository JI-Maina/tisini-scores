import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SingleRugby from "./pages/SingleRugby";
import SingleFootball from "./pages/SingleFootball";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/football/:fixtureId" element={<SingleFootball />} />
              <Route path="/rugby/:fixtureId" element={<SingleRugby />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
