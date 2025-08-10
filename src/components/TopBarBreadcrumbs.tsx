import { Breadcrumbs, Typography, Link as MuiLink, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getIcon from "../utils/getIconHelper.tsx";

const TopBarBreadcrumbs = () => {
    const navigate = useNavigate();
    const currentUrl = window.location.pathname;

    const pathSegments = currentUrl
        .split("/")
        .filter(Boolean);

    const handleClick = (path: string) => {
        navigate(path);
    };

    const mainSection = pathSegments[0]
        ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
        : "Dashboard";

    return (
        <Box display="flex" alignItems="center">
            {getIcon(mainSection)}

            <Breadcrumbs
                sx={{
                    flexWrap: "wrap",
                    wordBreak: "break-word",
                    lineHeight: 1.5,
                    maxWidth: "100%",
                    fontSize: "0.875rem",
                    color: "primary.main",
                }}
            >
                {pathSegments.map((segment, index) => {
                    const path = "/" + pathSegments.slice(0, index + 1).join("/");

                    const label = decodeURIComponent(segment)
                        .replace(/-/g, " ")
                        .replace(/^\w/, (c) => c.toUpperCase());

                    const isLast = index === pathSegments.length - 1;

                    return isLast ? (
                        <Typography key={path} color="text.primary">
                            {label}
                        </Typography>
                    ) : (
                        <MuiLink
                            key={path}
                            color="primary"
                            underline="hover"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleClick(path)}
                        >
                            {label}
                        </MuiLink>
                    );
                })}
            </Breadcrumbs>
        </Box>

    );
};

export default TopBarBreadcrumbs;