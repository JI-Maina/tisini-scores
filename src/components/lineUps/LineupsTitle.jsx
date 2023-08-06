import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const LineupsTitle = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      p={1}
      display="flex"
      justifyContent="center"
      bgcolor={colors.gray[500]}
    >
      <Typography variant="h6" fontSize="small" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default LineupsTitle;
