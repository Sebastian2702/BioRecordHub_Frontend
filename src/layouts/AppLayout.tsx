import { Box } from "@mui/material";
import SideMenu from "./SideMenu.tsx";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <Box sx={{ display: "flex", width: "100%", height: "100dvh", overflow: "hidden" }}>
            <SideMenu />
            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
