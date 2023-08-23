import Box from "@mui/material/Box";
import tisini from "../../images/brandTisini.jpg";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <Grid container height="10rem" borderBottom="2px solid gray">
      <Grid item xs={2}></Grid>
      <Grid item xs={12} sm={8} position="relative">
        <Box height="5.8rem">
          <img
            src={tisini}
            alt="tisini"
            style={{ height: "100%", width: "100%" }}
          />
        </Box>
        <Navbar />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Header;
