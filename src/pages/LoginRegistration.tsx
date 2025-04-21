import InputTextField from "../components/InputTextField"
import StyledButton from "../components/StyledButton.tsx"
import {FONT_SIZES, COLORS, BORDER} from "../constants/ui.ts";
import {useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function LoginRegistration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Box sx={{
            background: `linear-gradient(45deg, ${COLORS.primary} 45%, ${COLORS.secondary} 55%)`,
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
        }}>
            <Box sx={{
                backgroundColor: COLORS.white,
                width: "20vw",
                height: "60vh",
                borderRadius: `${BORDER.radius} 0 0 ${BORDER.radius}`,
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}>

            </Box>
            <Box sx={{
                backgroundColor: COLORS.primary,
                width: "20vw",
                height: "60vh",
                borderRadius: `0 ${BORDER.radius} ${BORDER.radius} 0`,
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}>

            </Box>
        </Box>



    )
}

export default LoginRegistration