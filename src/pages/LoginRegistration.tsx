import {COLORS} from "../constants/ui.ts";
import {useState} from "react";
import Box from '@mui/material/Box';
import LoginInputCard from "../components/LoginInputCard.tsx";
import LogInSideCard from "../components/LoginSideCard.tsx";
import RegisterInputCard from "../components/ResgisterInputCard.tsx";
import RegisterSideCard from "../components/RegisterSideCard.tsx";

function LoginRegistration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

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
            {/*<LoginInputCard
                email={email}
                password={password}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onClick={() => console.log("Login clicked")}
            />
            <LogInSideCard onClick={() => console.log("Sign Up clicked")} />*/}
            <RegisterSideCard onClick = {() => console.log("Login")}/>
            <RegisterInputCard
                email={email}
                password={password}
                name={name}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onNameChange={(e) => setName(e.target.value)}
                onClick={() => console.log("Login clicked")}
            />


        </Box>



    )
}

export default LoginRegistration