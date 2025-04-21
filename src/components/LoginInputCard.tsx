import {BORDER, COLORS, FONT_SIZES} from "../constants/ui.ts";
import InputTextField from "../components/InputTextField"
import StyledButton from "../components/StyledButton.tsx"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card } from "@mui/material";


interface LoginInputCardProps {
    email: string,
    password: string,
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void,
}

const LoginInputCard: React.FC<LoginInputCardProps> = ({ email, password, onEmailChange, onPasswordChange, onClick }) => {
    return(
        <Box sx={{
            backgroundColor: COLORS.white,
            width: "25vw",
            height: "50vh",
            borderRadius: `${BORDER.radius} 0 0 ${BORDER.radius}`,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px"
        }}>
            <Typography variant="h2" sx={{ color: COLORS.primary, fontSize: FONT_SIZES.large, marginBottom: "20px", fontWeight: "bold" }}>
                Sign In
            </Typography>
            <InputTextField label="Email" fullWidth required fontSize={FONT_SIZES.medium} value={email} onChange={onEmailChange} />
            <InputTextField label="Password" password fullWidth required fontSize={FONT_SIZES.medium} value={password} onChange={onPasswordChange} />
            <StyledButton label="Login" color="primary" size="large" onClick={onClick} />
        </Box>
    )

}

export default LoginInputCard;