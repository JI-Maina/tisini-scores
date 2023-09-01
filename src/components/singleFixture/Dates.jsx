import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Dates = ({ date, onClick, isSelected }) => {
  const [cursor, setCursor] = useState("default");

  const input = new Date(date);

  // const daysOfWeek = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // const dayOfWeek = input.getDay();
  const monthIdx = input.getMonth();

  // const weekDay = daysOfWeek[dayOfWeek];

  const myArray = date.split("-");
  const month = months[monthIdx];

  return (
    <Box
      m={0.8}
      p={0.3}
      onMouseOver={() => setCursor("pointer")}
      onClick={() => onClick(date)}
      bgcolor={isSelected ? "blueviolet" : ""}
      style={{ cursor: cursor }}
    >
      <Box
        display="flex"
        flexDirection="row"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        <Typography>
          {myArray[2]} {month}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dates;
