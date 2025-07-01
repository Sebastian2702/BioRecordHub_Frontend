import { Box } from "@mui/material";
import SideMenu from "./SideMenu.tsx";
import Header from "../components/Header.tsx";
import {Outlet, useLocation} from "react-router-dom";

const AppLayout = () => {
    return (
        <Box sx={{ display: "flex", width: "100vw", height: "100dvh", overflow: "hidden", backgroundColor: "#a5cec7"  }}>
            <SideMenu />
            <Box sx={{ flex: 1, overflowY: "auto"}}>
                {useLocation().pathname !== "/profile" && <Header />}
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
