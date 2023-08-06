import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import homeLogo from "../../images/homeLogo.png";
import awayLogo from "../../images/awayLogo.png";

const SingleResult = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  fixtureId,
  fixtureType,
  fixtureState,
  minute,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (fixtureType === "football") {
      navigate(`/football/${fixtureId}`);
    } else {
      navigate(`/rugby/${fixtureId}`);
    }
  };

  return (
    <Grid
      container
      borderBottom="1px solid black"
      onClick={handleClick}
      sx={{
        "&:hover": {
          bgcolor: "lightgray",
          cursor: "pointer",
        },
      }}
    >
      <Grid item xs={1}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6" fontSize="small" fontWeight="bold">
            {fixtureState === "notstarted"
              ? `⌛`
              : fixtureState === "started"
              ? minute
              : "FT"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box p={0.3}>
          <Box display="flex" gap={0.5} flexDirection="row">
            <Box>
              <img
                style={{ width: "1rem", height: "1rem" }}
                src={homeLogo}
                alt=""
              />
            </Box>
            <Typography variant="h6" fontSize="small" fontWeight="bold">
              {homeTeam}
            </Typography>
          </Box>
          <Box display="flex" gap={0.5} flexDirection="row">
            <Box>
              <img
                style={{ width: "1rem", height: "1rem" }}
                src={awayLogo}
                alt=""
              />
            </Box>
            <Typography variant="h6" fontSize="small" fontWeight="bold">
              {awayTeam}
            </Typography>
          </Box>
        </Box>
      </Grid>

      {fixtureState !== "notstarted" && (
        <Grid item xs={1}>
          <Box p={0.6}>
            <Typography variant="h6" fontSize="small" fontWeight="bold">
              {homeScore}
            </Typography>
            <Typography variant="h6" fontSize="small" fontWeight="bold">
              {awayScore}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleResult;
