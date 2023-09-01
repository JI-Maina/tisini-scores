import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import tisini from "../../images/brandTisini.jpg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <Grid
        sx={{
          backgroundImage: `url(${tisini})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          width: "100%",
          height: "13em",
          position: "relative",
        }}
      >
        <Grid
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "6px",
            color: "white",
            display: "flex",
            gap: 1,
          }}
        >
          <Button variant="contained" onClick={() => navigate("/")}>
            Football
          </Button>
          <Button variant="contained" onClick={() => navigate("/rugby")}>
            Rugby
          </Button>
        </Grid>
      </Grid>
    </nav>
    // <Grid container height="10rem" borderBottom="2px solid gray">
    //   <Grid item width="100%" position="relative">
    //     <Box height="5.8rem">
    //       <img
    //         src={tisini}
    //         alt="tisini"
    //         style={{ height: "100%", width: "100%" }}
    //       />
    //     </Box>
    //   </Grid>
    // </Grid>

    // <Grid container height="10rem" borderBottom="2px solid gray">
    //   <Grid item xs={2}></Grid>
    //   <Grid item xs={12} sm={8} position="relative">
    //     <Box height="5.8rem">
    //       <img
    //         src={tisini}
    //         alt="tisini"
    //         style={{ height: "100%", width: "100%" }}
    //       />
    //     </Box>
    //     <Navbar />
    //   </Grid>
    //   <Grid item xs={2}></Grid>
    // </Grid>
  );
};

export default Header;
