import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

const Zona01: FC<any> = (): ReactElement => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Zona 01</Typography>
    </Box>
  );
};

export default Zona01;