import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function FixtureDates({ dates, onDateChange }) {
  const fetchDates = () => {
    let date = [...dates];
    if (date.length > 7) {
      return date.slice(0, 7).reverse();
    }

    return date.reverse();
  };

  const fixtureDates = fetchDates();

  const [value, setValue] = useState(fixtureDates.length - 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onDateChange(fixtureDates[newValue]);
  };

  const formatDate = (day) => {
    const date = new Date(day);
    const options = { weekday: "short", month: "2-digit", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const formattedDates = fixtureDates.map((date) => formatDate(date));

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {formattedDates.map((date, index) => (
          <Tab key={index} label={date} />
        ))}
      </Tabs>
    </Box>
  );
}
