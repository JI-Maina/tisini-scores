import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import SingleResult from "../footballStats/SingleResult";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const RugbyScores = ({ allFixtures, dates, selectedDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [fixtures, setFixtures] = useState([]);
  const [filterDate, setFilterDate] = useState(selectedDate || dates[0]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    setFilterDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const fetchDayFixtures = () => {
      if (allFixtures[filterDate]) {
        setFixtures(Object.entries(allFixtures[filterDate]));
      }
    };

    fetchDayFixtures();
  }, [allFixtures, filterDate]);

  console.log(fixtures);

  // useEffect(() => {
  //   const newData = {};

  //   for (const date in allFixtures) {
  //     const events = allFixtures[date];
  //     for (const eventName in events) {
  //       const eventData = events[eventName];
  //       if (!newData[date]) {
  //         newData[date] = {};
  //       }
  //       if (!newData[date][eventName]) {
  //         newData[date][eventName] = {};
  //       }
  //       eventData.forEach((item) => {
  //         const matchday = item.matchday;
  //         if (!newData[date][eventName][matchday]) {
  //           newData[date][eventName][matchday] = [];
  //         }
  //         newData[date][eventName][matchday].push(item);
  //       });
  //     }
  //   }

  //   const fetchDayFixtures = () => {
  //     if (newData[filterDate]) {
  //       setFixtures(Object.entries(newData[filterDate]));
  //     }
  //   };

  //   fetchDayFixtures();
  // }, [allFixtures, filterDate, dates]);

  return (
    <Box display="flex" flexDirection="row" width="100%" p={0.5} pt={0}>
      {!isSmallScreen && (
        <Box
          mr={0.5}
          width={`${100 - 85}%`}
          border="1px solid black"
          bgcolor={colors.primary[400]}
        >
          Kenya
        </Box>
      )}

      <Box width="100%" mt={0.5}>
        {fixtures.map((league, key) => (
          <Box mb={2} key={key}>
            <Box display="flex" bgcolor={colors.primary[600]} mb={0.2} p={0.7}>
              <Box display="flex" color={colors.gray[100]} gap={0.5}>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  Kenya:
                </Typography>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  {league[0]}
                </Typography>
              </Box>
            </Box>

            {/* loop through every matchday */}
            {league[1].map((fixtures, key) => (
              <Box key={key}>
                <SingleResult
                  homeTeam={fixtures.team1_name}
                  awayTeam={fixtures.team2_name}
                  homeScore={fixtures.home_score}
                  awayScore={fixtures.away_score}
                  fixtureId={fixtures.id}
                  fixtureType={fixtures.fixture_type}
                  fixtureState={fixtures.game_status}
                  minute={fixtures.minute}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RugbyScores;
