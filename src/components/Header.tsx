import { useAuth } from '../context/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {COLORS, BORDER} from '../constants/ui';
import { capitalize } from "../utils/helperFunctions.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TopBarBreadcrumbs from "./TopBarBreadcrumbs.tsx";
import UserProfileDialog from "./UserProfileDialog.tsx";
import { useState } from 'react';
import { handleFirstLogin } from "../services/auth/authHandler.ts";

const Header = () => {
    const { user } = useAuth();
    const [firstLogin, setFirstLogin] = useState(user?.first_login);
    const [profileDialogOpen, setProfileDialogOpen] = useState(firstLogin);

    const handleCloseDialog = async () => {
        if(firstLogin) {
            await handleFirstLogin();
            setFirstLogin(false);
        }
        setProfileDialogOpen(false);
    }

    return (
        <Box
            sx={{
                width: '95%',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                backgroundColor: COLORS.white,
                color: COLORS.primary,
                borderRadius: BORDER.radius,
                margin: '20px auto',
            }}
        >
            <UserProfileDialog open={profileDialogOpen} onClose={handleCloseDialog} />
            <TopBarBreadcrumbs />



            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box onClick={() => setProfileDialogOpen(true)} sx={{ cursor: 'pointer', marginLeft: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {user?.name || 'User Dashboard'}
                    </Typography>
                    <Typography variant="caption">
                        {capitalize(user?.role) || 'Biologist'}
                    </Typography>
                </Box>
                <AccountCircleIcon
                    sx={{
                        width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)',
                        height: 'clamp(4rem, 2vw + 0.5rem, 5rem)',
                        cursor: 'pointer'
                    }}
                    onClick={() => setProfileDialogOpen(true)}
                />
            </Box>
        </Box>
    );
};

export default Header;