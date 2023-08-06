import React from "react";
import SingleResult from "./SingleResult";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ScoresDivision = ({
  state,
  league,
  homeTeam,
  homeScore,
  awayTeam,
  awayScore,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb={2}>
      <Box display="flex" bgcolor={colors.primary[600]} mb={0.2} p={0.7}>
        <Box display="flex" color={colors.gray[100]}>
          <Typography variant="h6" fontSize="small" fontWeight="bold">
            Kenya:
          </Typography>
          <Typography variant="h6" fontSize="small" fontWeight="bold">
            {league}
          </Typography>
        </Box>
      </Box>
      <SingleResult
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        homeScore={homeScore}
        awayScore={awayScore}
        state={state}
      />
    </Box>
  );
};

export default ScoresDivision;
