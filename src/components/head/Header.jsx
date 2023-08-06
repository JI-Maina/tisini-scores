import Box from "@mui/material/Box";
import tisini from "../../images/brandTisini.jpg";
import { Grid } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Header = () => {
  return (
    <Grid container height="10rem" borderBottom="2px solid gray">
      <Grid item xs={2}></Grid>
      <Grid item xs={12} sm={8} position="relative">
        <Box height="10rem">
          <img
            src={tisini}
            alt="tisini"
            style={{ height: "100%", width: "100%" }}
          />
        </Box>
        <Box display="flex" gap={1} position="absolute" top="0" right="0" m={1}>
          <MenuOutlinedIcon />
        </Box>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Header;
