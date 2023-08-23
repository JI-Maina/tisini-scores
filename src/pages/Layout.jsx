import { Outlet } from "react-router-dom";
import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../theme";

import Header from "../components/head/Header";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <Grid container>
        <Grid item xs={2} sx={{ display: { xs: "none", sm: "block" } }}></Grid>

        <Grid item xs={12} sm={8} bgcolor={colors.primary[400]}>
          <Outlet />
        </Grid>

        <Grid item xs={2} sx={{ display: { xs: "none", sm: "block" } }}></Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default Layout;
