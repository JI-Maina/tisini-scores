import { Box, Typography } from "@mui/material";

const StatsRow = ({ homeStat, stat, awayStat }) => {
  return (
    <Box
      mb={1}
      ml={1}
      mr={1}
      pb={0.8}
      display="flex"
      flexDirection="row"
      color="whitesmoke"
    >
      <Box
        width={`${100 - 83}%`}
        textAlign="center"
        borderBottom={`1px solid black`}
      >
        <Typography variant="h6">{homeStat}</Typography>
      </Box>
      <Box
        width={`${100 - 24}%`}
        textAlign="center"
        borderBottom={`1px solid black`}
      >
        <Typography variant="h6">{stat}</Typography>
      </Box>
      <Box
        width={`${100 - 83}%`}
        textAlign="center"
        borderBottom={`1px solid black`}
      >
        <Typography variant="h6">{awayStat}</Typography>
      </Box>
    </Box>
  );
};

export default StatsRow;
