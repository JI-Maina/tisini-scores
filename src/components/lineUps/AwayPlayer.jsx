import { Box, Typography } from "@mui/material";
import React from "react";

const AwayPlayer = ({ name, jersey }) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {jersey}
      </Typography>
    </Box>
  );
};

export default AwayPlayer;
