import React from "react";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Root = () => {
    return (
        <Box>
            <Navigation />
            <Outlet />
        </Box>
    );
};
