import { Box } from "@mui/material";
import { COLORS, BORDER } from "../constants/ui.ts";
import logo from "../assets/images/full-logo.png";
import SideMenuButton from "../components/SideMenuButton.tsx";
import { ROUTES } from "../routes/frontendRoutes.ts";
import { useNavigate } from "react-router-dom";
import {handleLogout} from "../services/auth/authHandler.ts";
import { useAuth} from "../context/AuthContext.tsx";
const SideMenu = () => {

    const navigate = useNavigate();
    const { isAdmin, logout: contextLogout } = useAuth();

    const onLogoutClick = () => {
        handleLogout({ navigate, contextLogout});
    }

    return (
        <Box
            sx={{
                width: { xs: '80px', sm: '200px', md: '260px' },
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
                style={{ width: "80%", height: "auto" }}
            />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gap: "25px",
                }}
            >
                <SideMenuButton url={ROUTES.dashboard} type="Dashboard" onClick={() => {navigate(ROUTES.dashboard)}}/>
                <SideMenuButton url={ROUTES.nomenclature} type="Nomenclature" onClick={() => {navigate(ROUTES.nomenclature)}}/>
                <SideMenuButton url={ROUTES.bibliography} type="Bibliography" onClick={() => {navigate(ROUTES.bibliography)}}/>
                <SideMenuButton url={ROUTES.occurrences} type="Occurrences" onClick={() => {navigate(ROUTES.occurrences)}}/>
                <SideMenuButton url={ROUTES.projects} type="Projects" onClick={() => {navigate(ROUTES.projects)}}/>

                {isAdmin && (
                    <SideMenuButton url={ROUTES.admin} type="Administrator" onClick={() => navigate(ROUTES.admin)} />
                )}

                <SideMenuButton url={ROUTES.logout} type="Logout" onClick={onLogoutClick}/>
            </Box>
        </Box>
    );
};

export default SideMenu;
