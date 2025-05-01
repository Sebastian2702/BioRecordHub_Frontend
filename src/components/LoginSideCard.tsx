import {BORDER, COLORS, FONT_SIZES} from "../constants/ui.ts";
import StyledButton from "../components/StyledButton.tsx"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from "../assets/images/full-logo.png";

interface LogInSideCardProps {
    onClick: () => void
}

const LoginSideCard: React.FC<LogInSideCardProps> = ({ onClick }) => {
    return (
        <Box sx={{
            backgroundColor: COLORS.primary,
            width: "30vw",
            height: "100%",
            borderRadius: `0 ${BORDER.radius} ${BORDER.radius} 0`,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px"
        }}>
            <img src={logo} alt="logo" style={{ width: "80%", height: "auto", marginBottom: "40px" }} />
            <Typography variant="h2" sx={{ color: COLORS.white, fontSize: FONT_SIZES.medium, marginBottom: "40px", fontWeight: "bold" }}>
                Discover. Document. Preserve. Your biodiversity journey starts here!
            </Typography>
            <StyledButton label="SIGN UP" border={true} color="primary" size="large" onClick={onClick} />
        </Box>
    )
}

export default LoginSideCard;