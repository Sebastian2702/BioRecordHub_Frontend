import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { COLORS, FONT_SIZES } from "../constants/ui.ts";
import { itemTypeOptionsFormat } from "../constants/uiConstants.ts";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import StyledButton from "./StyledButton.tsx";
import DownloadIcon from '@mui/icons-material/Download';
import { GetBibliographyFile } from "../services/bibliography/bibliography.ts";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

interface DataDisplayProps {
    label: string;
    value: any;
    id?: number;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ label, value,id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const displayValue =
        label === "Item Type"
            ? itemTypeOptionsFormat.find(item => item.key === value)?.display || value
            : value;

    const handleDownloadFile = async (id:number) => {
        setLoading(true);
        try{
            await GetBibliographyFile(id);
        }
        catch (error){
            setError("Failed to download file. Please try again later.");
            setLoading(false);
            return;
        }
        setLoading(false);
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError("");
        }
    }, [error]);

    if (label === "Verified") {
        return(
            <Box display="flex" gap={1}>
                <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.black,textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>
                    {label}:
                </Typography>
                <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.primary, fontWeight: 'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>
                    {displayValue ? (
                        <CheckIcon fontSize={'large'}/>
                    ): (
                        <ClearIcon color="error" fontSize={'large'}/>
                    )
                    }

                </Typography>
            </Box>
        )

    }
    else if(label === 'File'){
        return (
            <Box display="flex" gap={1} alignItems={'center'}>
                <ToastContainer />
                <Typography sx={{ fontSize: FONT_SIZES.medium, color: COLORS.black,textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>
                    {label}:
                </Typography>
                <StyledButton
                    label={displayValue}
                    color="primary"
                    size="medium"
                    icon={<DownloadIcon/>}
                    onClick={() => handleDownloadFile(id ?? 0)}
                    disabled={loading}
                />
                {loading && (
                    <CircularProgress/>
                )}

            </Box>
        );
    }
    else{
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
    }

};

export default DataDisplay;