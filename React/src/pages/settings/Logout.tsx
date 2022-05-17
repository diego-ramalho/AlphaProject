import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

const Logout: FC<any> = (): ReactElement => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h3">Logout</Typography>
        </Box>
    );
};

export default Logout;