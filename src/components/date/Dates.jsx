import { Box } from "@mui/material";
import React from "react";

const Dates = () => {
  const formatDate = () => {
    const date = new Date(day);
    const options = { weekday: "short", month: "2-digit", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const d = formatDate();
  const weekday = d.split(",")[0];
  const day = d.split(",")[1];

  console.log(weekday);
  console.log(day);

  return (
    <Box>
      <Box>{weekday}</Box>
      <Box>{day}</Box>
    </Box>
  );
};

export default Dates;
