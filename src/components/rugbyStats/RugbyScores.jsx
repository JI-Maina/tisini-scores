import { tokens } from "../../theme";
import { useQuery } from "react-query";
import SingleResult from "../footballStats/SingleResult";
import React, { useEffect, useMemo, useState } from "react";
import FetchRugbyFixtures from "../../utilis/FetchRugbyFixtures";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import Spinner from "../loading/Spinner";
import { Dates } from "../../components";

const RugbyScores = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { isLoading, data } = useQuery("rugbyFixtures", FetchRugbyFixtures);

  const rugbyFixtures = useMemo(() => {
    return data ? data : [];
  }, [data]);

  const rugbyDates = useMemo(() => {
    return data ? Object.keys(data) : [];
  }, [data]);

  const [fixtures, setFixtures] = useState([]);
  const [filterDate, setFilterDate] = useState(rugbyDates[0]);

  const dates = rugbyDates.slice(0, 7).reverse();

  useEffect(() => {
    setFilterDate(rugbyDates[0]);
  }, [rugbyDates]);

  useEffect(() => {
    const fetchDayFixtures = () => {
      if (rugbyFixtures[filterDate]) {
        setFixtures(Object.entries(rugbyFixtures[filterDate]));
      }
    };

    fetchDayFixtures();
  }, [rugbyFixtures, filterDate]);

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

  if (isLoading) return <Spinner />;

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
        <Box
          m={0.3}
          display="flex"
          justifyContent="space-evenly"
          bgcolor={colors.primary[900]}
        >
          {dates.map((date, key) => (
            <Box key={key}>
              <Dates
                date={date}
                onClick={(date) => setFilterDate(date)}
                isSelected={date === filterDate}
              />
            </Box>
          ))}
        </Box>

        {fixtures.map((league, key) => (
          <Box mb={2} key={key}>
            <Box display="flex" bgcolor={colors.primary[600]} mb={0.2} p={0.7}>
              <Box display="flex" color={colors.gray[100]} gap={0.5}>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  Kenya:
                </Typography>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  {league[0]} - {league[1][0].series}
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
