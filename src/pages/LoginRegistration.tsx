import { COLORS } from "../constants/ui.ts";
import Box from "@mui/material/Box";
import SlidingAuth from "../components/SlidingAuth.tsx";

interface LoginRegistrationProps {
    isLogin: boolean;
}

const LoginRegistration: React.FC<LoginRegistrationProps> = ({ isLogin }) => {

    return (
        <Box
            sx={{
                background: `linear-gradient(45deg, ${COLORS.primary} 45%, ${COLORS.secondary} 55%)`,
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                display: "flex",
            }}
        >
            <SlidingAuth isLogin={isLogin}/>
        </Box>

    );
}

export default LoginRegistration;
