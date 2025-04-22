import {BORDER, COLORS, FONT_SIZES} from "../constants/ui.ts";
import StyledButton from "../components/StyledButton.tsx"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from "../assets/images/full-logo.png";

interface RegisterSideCardProps {
    onClick: () => void
}

const RegisterSideCard: React.FC<RegisterSideCardProps> = ({ onClick }) => {
    return (
        <Box sx={{
            backgroundColor: COLORS.primary,
            width: "30vw",
            height: "55vh",
            borderRadius: `${BORDER.radius} 0 0 ${BORDER.radius}`,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px"
        }}>
            <img src={logo} alt="logo" style={{ width: "80%", height: "auto", marginBottom: "40px" }} />
            <Typography variant="h2" sx={{ color: COLORS.white, fontSize: FONT_SIZES.medium, marginBottom: "40px", fontWeight: "bold" }}>
                Log in and keep biodiversity data at your fingertips!
            </Typography>
            <StyledButton label="SIGN IN" border={true} color="primary" size="large" onClick={onClick} />
        </Box>
    )
}

export default RegisterSideCard;