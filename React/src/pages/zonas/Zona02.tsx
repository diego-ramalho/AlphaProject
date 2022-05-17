import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

const Zona02: FC<any> = (): ReactElement => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Zona 02</Typography>
    </Box>
  );
};

export default Zona02;