import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { tokens } from "../theme";
import { Box, Typography, Grid, useTheme } from "@mui/material";

import {
  FootballScorers,
  GeneralStats,
  LineUps,
  MatchHeader,
} from "../components";

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

export default function SingleFootball() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container xs={12} p={1}>
      <Box bgcolor={colors.primary[300]} sx={{ width: "100%" }}>
        <MatchHeader />
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
            <Tab label="Top scorers" {...a11yProps(2)} disabled />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <LineUps />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <GeneralStats />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <FootballScorers />
        </TabPanel>
      </Box>
    </Grid>
  );
}
