import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import { useUserActions } from '../../_actions';

const Logout = () => {
    const userActions = useUserActions();
    userActions.logout();

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