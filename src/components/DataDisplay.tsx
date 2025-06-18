import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {COLORS, FONT_SIZES} from "../constants/ui.ts";

interface DataDisplayProps {
    label: string;
    value: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ label, value }) => {
    return (
        <Box display="flex" gap={1}>
            <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.black }}>
                {label}:
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.primary, fontWeight: 'bold' }}>
                {value}
            </Typography>
        </Box>
    );
};

export default DataDisplay;