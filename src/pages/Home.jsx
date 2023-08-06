import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tokens } from "../theme";
import { FootballScores, RugbyScores, Spinner } from "../components";

import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import SportsRugbyOutlinedIcon from "@mui/icons-material/SportsRugbyOutlined";
import useRugbyFixtures from "../hooks/useRugbyFixtures";
import useFootballFixtures from "../hooks/useFootballFixtures";

const SmallTabs = styled(Tabs)(({ theme }) => ({
  minHeight: "unset",
  "& .MuiTabs-flexContainer": {
    "& > *": {
      padding: theme.spacing(2),
      minHeight: 1,
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rugbyFixtures, dates, loading] = useRugbyFixtures();
  const [ballFixtures, ballDates, ballState] = useFootballFixtures();

  const [value, setValue] = useState(1);
  const selectedDates = value === 0 ? ballDates : dates;
  const [filterDate, setFilterDate] = useState(selectedDates[0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const Dates = (selectedDates) => {
    if (selectedDates) {
      const dates = [...selectedDates];
      if (dates.length > 7) {
        return dates.slice(0, 7);
      }
    }
    return dates;
  };

  const fixtureDates = Dates();

  // console.log(rugbyFixtures);

  // const fetchDates = (selectedDates) => {
  //   let date = [...selectedDates];
  //   if (date.length > 7) {
  //     return date.slice(0, 7);
  //   }

  //   return date;
  // };

  // const fixtureDates = fetchDates();

  // const formatDate = (day) => {
  //   const date = new Date(day);
  //   const options = { weekday: "short", month: "2-digit", day: "2-digit" };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   return formattedDate;
  // };

  // const formattedDates = selectedDates.map((date) => formatDate(date));

  if (loading || ballState) {
    return <Spinner />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        bgcolor={colors.primary[400]}
      >
        <Box display="flex" justifyContent="space-between">
          <SmallTabs
            value={value}
            onChange={handleChange}
            aria-label="basic SmallTabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              label="Football"
              {...a11yProps(0)}
              iconPosition="start"
              icon={<SportsSoccerOutlinedIcon />}
            />
            <Tab
              label="Rugby"
              {...a11yProps(1)}
              icon={<SportsRugbyOutlinedIcon />}
              iconPosition="start"
            />
          </SmallTabs>
          <Box p={0.5}>
            <select
              value={filterDate}
              style={{
                padding: "0.6rem",
                fontSize: "1rem",
                backgroundColor: "#f0f0f0",
                borderRadius: "0.3rem",
                border: "1px solid #ccc",
              }}
              onChange={handleDateChange}
            >
              {fixtureDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </Box>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <FootballScores
          allFixtures={ballFixtures}
          dates={ballDates}
          loading={ballState}
          selectedDate={filterDate}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RugbyScores
          allFixtures={rugbyFixtures}
          dates={dates}
          loading={loading}
          selectedDate={filterDate}
        />
      </TabPanel>
    </Box>
  );
};

export default Home;
