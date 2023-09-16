import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Football, Layout, Rugby, SingleFootball, SingleRugby } from "./pages";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Football />} />
              <Route path="/rugby" element={<Rugby />} />
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
