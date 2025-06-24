import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from "../constants/ui.ts";
import BackButton from "../components/BackButton.tsx";
import {useEffect, useState} from "react";
import FileInput from "../components/FileInput.tsx";
import StyledButton from "../components/StyledButton.tsx";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {toast, ToastContainer} from "react-toastify";
import {allowedFileTypes} from "../constants/uiConstants.ts";
import {ImportBibliographyExcel} from "../services/excel/excel.ts";
import CircularProgress from "@mui/material/CircularProgress";


function NewBibliographyFileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


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

    const handleFileUpload = () => {
        if (!file) {
            setError("Please select a file.");
            return;
        }
        if (!allowedFileTypes.includes(file.type)) {
            setError("The selected file is not a valid Excel file.");
            return;
        }
        setDisabled(true);

        ImportBibliographyExcel(file, setError, setLoading, setDisabled)

    }


    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 150px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px",
            overflow: 'auto',
        }}>
            <ToastContainer/>
            <Box sx={{position: 'relative', height: '50px', marginBottom: '20px', padding: '0 10px'}}>
                <Box sx={{position: 'absolute', left: 0}}>
                    <BackButton width="55px"/>
                </Box>

                <Typography
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontWeight: 'bold',
                        fontSize: FONT_SIZES.xlarge,
                        textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                    }}
                >
                    New Bibliography
                </Typography>
            </Box>
            <FileInput
                label=".xlsx, .xlsm, .xls, .xlsb, .xltx, .xltm; files here, or browse your computer"
                onChange={setFile}
                acceptedFileTypes={'.xlsx, .xlsm, .xls, .xlsb, .xltx, .xltm'}
            />
            <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '0px 20px'}}>
                <StyledButton label={"Upload"} color={'primary'} size={'large'} icon={<FileUploadIcon/>}
                              onClick={handleFileUpload} disabled={disabled}/>
            </Box>

            {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                <CircularProgress/>
            </Box>
            ):
                <Typography>Databack</Typography>
            }
        </Box>
    );
}

export default NewBibliographyFileUpload;