import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import LoginInputCard from "../components/LoginInputCard";
import RegisterInputCard from "../components/ResgisterInputCard";
import LoginSideCard from "../components/LoginSideCard";
import RegisterSideCard from "../components/RegisterSideCard";
import { COLORS } from "../constants/ui.ts";
import {useNavigate} from "react-router-dom";
import {handleLogin} from "../services/auth/authHandler.ts";
import {handleRegister} from "../services/auth/authHandler.ts";
import {useAuth} from "../context/AuthContext.tsx";
import { ToastContainer, toast } from 'react-toastify';

interface SlidingAuthProps {
    isLogin: boolean;
}

const SlidingAuth : React.FC<SlidingAuthProps> = ({ isLogin }) => {
    const [isSignIn, setIsSignIn] = useState(isLogin);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login: contextLogin, register: contextRegister } = useAuth();

    const onLoginClick = () => {
        handleLogin({
            email,
            password,
            navigate,
            setError,
            contextLogin,
            setLoading,
        });
    };

    const onRegisterClick = () => {
        handleRegister({
                name,
                email,
                password,
                password_confirmation,
                navigate,
                setError,
                contextRegister,
                setLoading,
        });
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError("");
        }
    }, [error]);


    return (
        <Box
            sx={{
                width: "60vw",
                height: "70vh",
                display: "flex",
                position: "relative",
                overflow: "hidden",
                borderRadius: "20px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                background: `${COLORS.primary}`,
            }}
        >
            <ToastContainer />
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
                        confirmPassword={password_confirmation}
                        onNameChange={(e) => setName(e.target.value)}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onConfirmPasswordChange={(e) => setPassword_confirmation(e.target.value)}
                        onClick={onRegisterClick}
                    />
                </Box>
            </Box>

            {loading && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    <CircularProgress color="inherit" />
                </Box>
            )}
        </Box>
    );
};

export default SlidingAuth;
