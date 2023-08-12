import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography, Grid, useTheme } from "@mui/material";

import useRugbyEvents from "../hooks/useRugbyEvents";

import {
  RugbyHeader,
  RugbyLineUps,
  RugbyStandings,
  RugbyStats,
  Spinner,
} from "../components";
import { tokens } from "../theme";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SingleRugby = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = React.useState(1);

  const [details, home, away, scores, lineups, cards, league, loading] =
    useRugbyEvents();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Grid container xs={12} p={1}>
      <Box bgcolor={colors.primary[300]} sx={{ width: "100%" }}>
        <RugbyHeader fixDetails={details} fixScores={scores} />
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Lineups" {...a11yProps(0)} />
            <Tab label="Team stats" {...a11yProps(1)} />
            <Tab label="Standings" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <RugbyLineUps teams={details} squads={lineups} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RugbyStats home={home} away={away} cards={cards} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <RugbyStandings standings={league} />
        </TabPanel>
      </Box>
    </Grid>
  );
};

export default SingleRugby;
