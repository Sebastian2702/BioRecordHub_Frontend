import { Box } from "@mui/material";
import { COLORS, BORDER } from "../constants/ui.ts";
import logo from "../assets/images/full-logo.png";
import SideMenuButton from "../components/SideMenuButton.tsx";
import { ROUTES } from "../routes/frontendRoutes.ts";

const SideMenu = () => {
    return (
        <Box
            sx={{
                width: "18vw",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: COLORS.primary,
                borderRadius: BORDER.sideMenu,
                paddingTop: "30px",
                paddingBottom: "30px",
                paddingLeft: "20px",
                paddingRight: "20px",
            }}
        >
            <img
                src={logo}
                alt="logo"
                style={{ width: "80%", height: "auto", marginBottom: "40px" }}
            />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <SideMenuButton url={ROUTES.dashboard} type="Dashboard" />
                <SideMenuButton url={ROUTES.nomenclature} type="Nomenclature" />
                <SideMenuButton url={ROUTES.bibliography} type="Bibliography" />
                <SideMenuButton url={ROUTES.occurrences} type="Occurrences" />
                <SideMenuButton url={ROUTES.projects} type="Projects" />
                <SideMenuButton url={ROUTES.reports} type="Reports" />
                <SideMenuButton url={ROUTES.logout} type="Logout" />
            </Box>
        </Box>
    );
};

export default SideMenu;
