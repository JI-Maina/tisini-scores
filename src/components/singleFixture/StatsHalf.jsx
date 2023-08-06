import { Box, Typography } from "@mui/material";

const StatsHalf = () => {
  return (
    <Box mb={1} display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" gap={2} flexDirection="row">
        <Typography variant="h6" fontWeight="bold">
          All
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          1ST
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          2ND
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsHalf;
