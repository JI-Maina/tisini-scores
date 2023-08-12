import { tokens } from "../../theme";
import homeLogo from "../../images/homeLogo.png";
import awayLogo from "../../images/awayLogo.png";
import { Typography, Box, useTheme } from "@mui/material";

const FootballHeader = ({ teams, scores }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" bgcolor={colors.primary[300]}>
      {/* Match details */}
      <Box
        p={0.3}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        borderBottom="2px solid black"
      >
        <Box
          m={0.2}
          p={0.4}
          display="flex"
          alignItems="center"
          borderRadius={2}
          bgcolor="lightgray"
        >
          <Typography fontSize="0.8em" fontWeight="bold" color="red">
            Round: {teams["matchday"]}
          </Typography>
        </Box>

        <Box p={0.4} borderRadius={2}>
          <Typography variant="h6" fontSize="1em" fontWeight="bold">
            {teams["league"]}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          m={0.2}
          p={0.4}
          borderRadius={2}
          bgcolor="lightgray"
        >
          <Typography fontSize="0.8em" fontWeight="bold" color="red">
            {teams["game_date"].split(" ")[0]}
          </Typography>
        </Box>
      </Box>

      {/* Match content (team names and scores) */}
      <Box display="flex" flexDirection="column" height="5.5em" pt={1}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          mt={0.2}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={`${100 / 3}%`}
          >
            <Box
              height="3em"
              width="3em"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={colors.gray[400]}
            >
              <img src={homeLogo} alt="City Stars" height="40em" width="40em" />
            </Box>
          </Box>

          {teams.game_status === "notstarted" ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={`${100 / 3}%`}
            >
              <Typography variant="h4" fontWeight="bold">
                --
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="row" width={`${100 / 3}%`}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width={`${100 / 3}%`}
              >
                <Typography variant="h3" fontWeight="bold">
                  {scores.Home}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={`${100 / 3}%`}
              >
                <Typography variant="h4" fontWeight="bold">
                  --
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                width={`${100 / 3}%`}
              >
                <Typography variant="h3" fontWeight="bold">
                  {scores.Away}
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={`${100 / 3}%`}
          >
            <Box
              height="3em"
              width="3em"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={colors.gray[400]}
            >
              <img src={awayLogo} alt="City Stars" height="40em" width="40em" />
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <Box width={`${100 / 3}%`}>
            <Typography
              variant="h6"
              fontSize="0.9em"
              fontWeight="bold"
              textAlign="center"
              color={colors.gray[100]}
            >
              {teams["team1_name"]}
            </Typography>
          </Box>
          <Box width={`${100 / 3}%`}>
            <Typography
              variant="h6"
              fontSize="0.9em"
              fontWeight="bold"
              textAlign="center"
            >
              {teams["game_status"] === "notstarted"
                ? "15:00"
                : teams["game_status"] === "started"
                ? teams["minute"]
                : "FT"}
            </Typography>
          </Box>
          <Box width={`${100 / 3}%`}>
            <Typography
              variant="h6"
              fontSize="0.9em"
              fontWeight="bold"
              textAlign="center"
              color={colors.gray[100]}
            >
              {teams["team2_name"]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FootballHeader;
