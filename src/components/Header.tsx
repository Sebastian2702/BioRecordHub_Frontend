import { useAuth } from '../context/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {COLORS, BORDER} from '../constants/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/frontendRoutes';
import { capitalize } from "../utils/helperFunctions.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TopBarBreadcrumbs from "./TopBarBreadcrumbs.tsx";

const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

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
            <TopBarBreadcrumbs />



            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box onClick={() => navigate(ROUTES.profile)} sx={{ cursor: 'pointer', marginLeft: '20px' }}>
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
                    }}
                />
            </Box>
        </Box>
    );
};

export default Header;