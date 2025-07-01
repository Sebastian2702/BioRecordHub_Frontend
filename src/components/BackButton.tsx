import Button from '@mui/material/Button';
import { COLORS, BORDER } from '../constants/ui.ts';
import { darken } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
    width?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ width }) => {
    return (

            <Button
                variant="contained"
                onClick={() => window.history.back()}
                sx={{
                    borderRadius: BORDER.radius,
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    fontWeight: 'bold',
                    boxShadow: '0px 0px 0px ',
                    height: "55px",
                    width: width || '55px',
                    '&:hover': {
                        backgroundColor: darken(COLORS.white, 0.3),
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
                <ArrowBackIcon sx={{ fontSize: '38px' }} />
            </Button>

    );
};

export default BackButton;