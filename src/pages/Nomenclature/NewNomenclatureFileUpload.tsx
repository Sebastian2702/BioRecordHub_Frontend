import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from "../../constants/ui.ts";
import BackButton from "../../components/BackButton.tsx";
import {useEffect, useState} from "react";
import FileInput from "../../components/FileInput.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {toast, ToastContainer} from "react-toastify";
import {allowedFileTypes} from "../../constants/uiConstants.ts";
import {ImportNomenclatureExcel} from "../../services/excel/excel.ts";
import CircularProgress from "@mui/material/CircularProgress";
import ImportedDataEditor from "../../components/ImportedDataEditor.tsx";
import InfoIcon from '@mui/icons-material/Info';
import CustomDialog from "../../components/CustomDialog.tsx";
import {GetBibliography} from "../../services/bibliography/bibliography.ts";



function NewNomenclatureFileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showData, setShowData] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [bibliographies, setBibliographies] = useState<string[]>([]);

    const handleInfoDialogClose = () => {
        setInfoDialogOpen(false);
    }

    const handleInfoDialogOpen = () => {
        setInfoDialogOpen(true);
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

    const handleFileUpload = async () => {
        if (!file) {
            setError("Please select a file.");
            return;
        }
        if (!allowedFileTypes.includes(file.type)) {
            setError("The selected file is not a valid Excel file.");
            return;
        }

        setDisabled(true);

        const result = await ImportNomenclatureExcel(file, setError, setLoading, setDisabled);
        setData(result);
    };

    const fetchData = async () => {
        try {
            const response = await GetBibliography();
            setBibliographies(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            setShowData(true);
            setLoading(false);
        }
    }, [data]);

    const infoDialogContent = (
        <Box>
            <Typography variant="body1" gutterBottom>
                To successfully import your nomenclature file, ensure the Excel sheet includes the following columns in <strong>this exact order</strong>:
            </Typography>


            <Box component="ul" sx={{ m: 0, pl: 3, flex: 1, marginBottom: '20px' }}>
                <li><strong>kingdom</strong></li>
                <li><strong>phylum</strong></li>
                <li><strong>subphylum</strong></li>
                <li><strong>class</strong></li>
                <li><strong>order</strong></li>
                <li><strong>suborder</strong></li>
                <li><strong>infraorder</strong></li>
                <li><strong>superfamily</strong></li>
                <li><strong>family</strong></li>
                <li><strong>subfamily</strong></li>
                <li><strong>tribe</strong></li>
                <li><strong>genus</strong></li>
                <li><strong>subgenus</strong></li>
                <li><strong>species</strong></li>
                <li><strong>subspecies</strong></li>
                <li><strong>author</strong></li>
                <li><strong>remarks</strong></li>
                <li><strong>bibliography_key</strong></li>
                <li><strong>bibliography_key2</strong></li>
                <li><strong>bibliography_key3</strong></li>
                <li><strong>bibliography_key4</strong></li>
                <li><strong>...</strong></li>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
                The bibliography_key column can support up to 20 entries, meaning a single nomenclature can be associated with up to 20 bibliographies. <strong>The number suffix in the bibliography_key is required for the system to function correctly.</strong>
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
                Make sure all columns are present and spelled exactly as shown or misnamed columns will cause the import to fail.
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: COLORS.primary,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    mt: 2
                }}
                role="button"
                tabIndex={0}
                onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/NomenclatureImportFileExample.xlsx';
                    link.download = 'NomenclatureImportFileExample.xlsx';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const link = document.createElement('a');
                        link.href = '/NomenclatureImportFileExample.xlsx';
                        link.download = 'NomenclatureImportFileExample.xlsx';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }}
            >
                Download Example File
            </Typography>
        </Box>
    );

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
            <Box sx={{display: 'flex', justifyContent: "space-between", height: '50px', marginBottom: '20px', padding: '0 10px', alignItems: 'center'}}>
                <Box>
                    <BackButton width="55px"/>
                </Box>

                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: FONT_SIZES.xlarge,
                        textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                    }}
                >
                    New Nomenclatures
                </Typography>
                <InfoIcon sx={{color: COLORS.primary, cursor: "pointer", fontSize: "35px"}} onClick={() => handleInfoDialogOpen()}/>
            </Box>

            <CustomDialog open={infoDialogOpen} onClose={handleInfoDialogClose} title={"File Structure"} content={"information"} contentText={infoDialogContent}/>

            <FileInput
                label=".xlsx, .xls; files here, or browse your computer"
                onChange={setFile}
                acceptedFileTypes={'.xlsx, .xls'}
            />
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ):
                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '0px 20px'}}>
                    <StyledButton label={"Upload"} color={'primary'} size={'large'} icon={<FileUploadIcon/>}
                                  onClick={handleFileUpload} disabled={disabled}/>
                </Box>
            }
            {showData && (
                <Box>
                    <Typography variant={"h3"} color={COLORS.primary} fontWeight={'bold'}>{file?.name}</Typography>
                    <Typography variant={"subtitle1"} color={COLORS.black}>
                        Review and edit the imported entries below:
                    </Typography>
                    <ImportedDataEditor importedEntries={data} SetError={setError} setLoading={setLoading} dataType={'nomenclature'} bibliographies={bibliographies}/>
                </Box>

            )}




        </Box>
    );
}

export default NewNomenclatureFileUpload;