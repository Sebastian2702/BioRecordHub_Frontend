import { useState } from "react";
import { Box } from "@mui/material";
import LoginInputCard from "../components/LoginInputCard";
import RegisterInputCard from "../components/ResgisterInputCard";
import LoginSideCard from "../components/LoginSideCard";
import RegisterSideCard from "../components/RegisterSideCard";
import { COLORS } from "../constants/ui.ts";
import {useNavigate} from "react-router-dom";
import {handleLogin} from "../services/authHandler.ts";

interface SlidingAuthProps {
    isLogin: boolean;
}




const SlidingAuth : React.FC<SlidingAuthProps> = ({ isLogin }) => {
    const [isSignIn, setIsSignIn] = useState(isLogin);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const onLoginClick = () => {
        handleLogin({
            email,
            password,
            navigate,
            setError,
        });
    };


    return (
        <Box
            sx={{
                width: "60vw",
                height: "60vh",
                display: "flex",
                position: "relative",
                overflow: "hidden",
                borderRadius: "20px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                background: `${COLORS.primary}`,
            }}
        >
            {/* Sliding container */}
            <Box
                sx={{
                    display: "flex",
                    width: "200%",
                    transform: isSignIn ? "translateX(0)" : "translateX(-50%)",
                    transition: "transform 0.6s ease-in-out",
                }}
            >
                {/* Left: Sign In */}
                <Box sx={{ width: "50%", display: "flex" }}>
                    <LoginInputCard
                        email={email}
                        password={password}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onClick={onLoginClick}
                    />
                    <LoginSideCard onClick={() => setIsSignIn(false)} />
                </Box>

                {/* Right: Sign Up */}
                <Box sx={{ width: "50%", display: "flex" }}>
                    <RegisterSideCard onClick={() => setIsSignIn(true)} />
                    <RegisterInputCard
                        name={name}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        onNameChange={(e) => setName(e.target.value)}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                        onClick={() => console.log("Register")}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SlidingAuth;
