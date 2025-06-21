import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {COLORS, FONT_SIZES} from "../constants/ui.ts";
import { itemTypeOptionsFormat } from "../constants/uiConstants.ts";

interface DataDisplayProps {
    label: string;
    value: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ label, value }) => {
    const displayValue =
        label === "Item Type"
            ? itemTypeOptionsFormat.find(item => item.key === value)?.display || value
            : value;

    return (
        <Box display="flex" gap={1}>
            <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.black,textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>
                {label}:
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.primary, fontWeight: 'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>
                {displayValue}
            </Typography>
        </Box>
    );
};

export default DataDisplay;