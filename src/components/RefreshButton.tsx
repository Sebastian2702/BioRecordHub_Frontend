import Button from '@mui/material/Button';
import { COLORS, BORDER } from '../constants/ui.ts';
import { darken } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import RefreshIcon from '@mui/icons-material/Refresh';

interface RegisterInputCardProps {
    width?: string;
}


const RegisterInputCard: React.FC<RegisterInputCardProps> = ({ width}) => {
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'row', gap:'10px', alignItems: 'center', height: '55px', paddingTop: '8px', width: width || '100%' }}
        >
            <Button
                variant="contained"
                onClick={() => { window.location.reload()}}
                sx={{
                    borderRadius: BORDER.radius,
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    height: "55px",
                    width: "55px",
                    '&:hover': {
                        backgroundColor: darken(COLORS.primary, 0.3),
                        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
                    },
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                }}
            >
                <RefreshIcon sx={{ fontSize: '38px' }} />
            </Button>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: COLORS.primary }}>
                Refresh
            </Typography>
        </Box>

    );
}

export default RegisterInputCard;