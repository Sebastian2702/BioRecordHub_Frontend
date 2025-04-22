import {BORDER, COLORS, FONT_SIZES} from "../constants/ui.ts";
import InputTextField from "../components/InputTextField"
import StyledButton from "../components/StyledButton.tsx"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface RegisterInputCardProps {
    email: string,
    password: string,
    name: string,
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void,
}

const RegisterInputCard: React.FC<RegisterInputCardProps> = ({ email, password, onEmailChange, onPasswordChange, name, onNameChange, onClick }) => {
    return(
        <Box sx={{
            backgroundColor: COLORS.white,
            width: "30vw",
            height: "60vh",
            borderRadius: `0 ${BORDER.radius} ${BORDER.radius} 0`,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px"
        }}>
            <Typography variant="h2" sx={{ color: COLORS.primary, fontSize: FONT_SIZES.large, marginBottom: "30px", fontWeight: "bold" }}>
                Create Account
            </Typography>
            <InputTextField label="Name" fullWidth required fontSize={FONT_SIZES.medium} value={name} onChange={onNameChange} />
            <InputTextField label="Email" fullWidth required fontSize={FONT_SIZES.medium} value={email} onChange={onEmailChange} />
            <InputTextField label="Password" password fullWidth required fontSize={FONT_SIZES.medium} value={password} onChange={onPasswordChange} />
            <StyledButton label="SIGN UP" color="primary" size="large" onClick={onClick} />
        </Box>
    )


}

export default RegisterInputCard;