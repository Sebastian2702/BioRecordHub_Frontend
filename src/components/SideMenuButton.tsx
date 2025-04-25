import {BORDER, COLORS} from "../constants/ui.ts";
import {darken} from "@mui/system";
import Button from "@mui/material/Button";
import getIcon from "../utils/getIconHelper.tsx";

interface SideMenuButtonProps {
    url: string;
    type: "Dashboard" | "Nomenclature" | "Bibliography" | "Occurrences" | "Projects" | "Reports" | "Logout" | "Admin";
    onClick?: () => void;
}

const SideMenuButton: React.FC<SideMenuButtonProps> = ({ url, type, onClick }) => {

    const icon = getIcon(type);
    const pathname = window.location.pathname;
    const currentPage = pathname.includes(url.toLowerCase());


    return (
        <Button
            variant="contained"
            onClick={onClick}
            startIcon={icon}
            sx={{
                backgroundColor: currentPage ? COLORS.secondary : 'transparent',
                borderRadius: `${BORDER.radius}`,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: `clamp(1rem, 1.5vw + 0.5rem, 2rem)`,
                border: 'none',
                boxShadow: currentPage ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                width: '100%',
                height: '70px',
                marginBottom: '30px',
                padding: '20px',
                justifyContent: 'flex-start',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: currentPage
                        ? darken(COLORS.secondary, 0.1)
                        : 'rgba(255, 255, 255, 0.05)', // subtle glow
                    boxShadow: 'none',
                },
                '&:focus, &:active, &.Mui-focusVisible': {
                    outline: 'none',
                    boxShadow: 'none',
                },
            }}
        >
            {type}
        </Button>
    );
};

export default SideMenuButton;