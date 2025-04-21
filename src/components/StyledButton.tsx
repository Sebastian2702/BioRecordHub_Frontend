import Button from '@mui/material/Button';
import { COLORS, BORDER } from '../constants/ui.ts';
import { darken } from '@mui/system';




interface ButtonProps {
    label: string;
    color: 'primary' | 'secondary' | 'edit' | 'delete';
    size: 'small' | 'medium' | 'large';
    onClick?: () => void;
    disabled?: boolean;
    border?: boolean;
    icon?: React.ReactNode;
}

const StyledButton: React.FC<ButtonProps> = ({ label, color, size, onClick, disabled, border, icon = null }) => {
    return (
        <Button
            variant="contained"
            size={size}
            onClick={onClick}
            disabled={disabled}
            startIcon={icon}
            sx={{
                borderRadius: BORDER.radius,
                backgroundColor: color === 'primary' ? COLORS.primary : color === 'secondary' ? COLORS.secondary : color === 'edit' ? COLORS.edit : COLORS.delete,
                color: COLORS.white,
                fontWeight: 'bold',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderColor: border ? COLORS.white : 'transparent',
                borderWidth: border ? BORDER.weight : 0,
                borderStyle: border ? 'solid' : 'none',
                '&:hover': {
                    backgroundColor: darken(color === 'primary' ? COLORS.primary : color === 'secondary' ? COLORS.secondary : color === 'edit' ? COLORS.edit : COLORS.delete, 0.3),
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
                    bolderStyle: 'none',
                    borderColor: border ? COLORS.white : 'transparent',
                },
            }}
        >
            {label}
        </Button>
    );
};

export default StyledButton;