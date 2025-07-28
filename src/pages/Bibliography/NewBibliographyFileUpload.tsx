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
import {ImportBibliographyExcel} from "../../services/excel/excel.ts";
import CircularProgress from "@mui/material/CircularProgress";
import ImportedDataEditor from "../../components/ImportedDataEditor.tsx";
import InfoIcon from '@mui/icons-material/Info';
import CustomDialog from "../../components/CustomDialog.tsx";



function NewBibliographyFileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showData, setShowData] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

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

        const result = await ImportBibliographyExcel(file, setError, setLoading, setDisabled);
        setData(result);
    };

    useEffect(() => {
        if (data && data.length > 0) {
            setShowData(true);
            setLoading(false);
        }
    }, [data]);

    const infoDialogContent = (
        <Box>
            <Typography variant="body1" gutterBottom>
                To successfully import your bibliography file, ensure the Excel sheet includes the following columns in <strong>this exact order</strong>:
            </Typography>

            <Box display="flex" justifyContent="space-between" gap={4}>
                <Box component="ul" sx={{ m: 0, pl: 3, flex: 1 }}>
                    <li><strong>key</strong></li>
                    <li><strong>item_type</strong></li>
                    <li><strong>publication_year</strong></li>
                    <li><strong>author</strong></li>
                    <li><strong>title</strong></li>
                    <li><strong>publication_title</strong></li>
                    <li><strong>isbn</strong></li>
                    <li><strong>issn</strong></li>
                    <li><strong>doi</strong></li>
                    <li><strong>url</strong></li>
                    <li><strong>abstract_note</strong></li>
                    <li><strong>date</strong></li>
                    <li><strong>access_date</strong></li>
                    <li><strong>pages</strong></li>
                    <li><strong>num_pages</strong></li>
                    <li><strong>issue</strong></li>
                    <li><strong>volume</strong></li>
                    <li><strong>number_of_volumes</strong></li>
                </Box>

                <Box component="ul" sx={{ m: 0, pl: 3, flex: 1 }}>
                    <li><strong>journal_abbreviation</strong></li>
                    <li><strong>short_title</strong></li>
                    <li><strong>series</strong></li>
                    <li><strong>series_number</strong></li>
                    <li><strong>series_text</strong></li>
                    <li><strong>series_title</strong></li>
                    <li><strong>publisher</strong></li>
                    <li><strong>place</strong></li>
                    <li><strong>language</strong></li>
                    <li><strong>rights</strong></li>
                    <li><strong>type</strong></li>
                    <li><strong>archive</strong></li>
                    <li><strong>archive_location</strong></li>
                    <li><strong>library_catalog</strong></li>
                    <li><strong>call_number</strong></li>
                    <li><strong>extra</strong></li>
                    <li><strong>notes</strong></li>
                    <li><strong>verified</strong></li>
                </Box>
            </Box>

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
                    link.href = '/BibliographyImportFileExample.xlsx';
                    link.download = 'BibliographyImportFileExample.xlsx';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const link = document.createElement('a');
                        link.href = '/BibliographyImportFileExample.xlsx';
                        link.download = 'BibliographyImportFileExample.xlsx';
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
                    New Bibliography
                </Typography>
                <InfoIcon sx={{color: COLORS.primary, cursor: "pointer", fontSize: "35px"}} onClick={() => handleInfoDialogOpen()}/>
            </Box>

            <CustomDialog open={infoDialogOpen} onClose={handleInfoDialogClose} title={"File Structure"} content={"information"} contentText={infoDialogContent}/>

            <FileInput
                label=".xlsx, .xls; files here, or browse your computer"
                onChange={setFile}
                acceptedFileTypes={'.xlsx, .xls'}
                multiple={false}
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
                    <ImportedDataEditor importedEntries={data} SetError={setError} setLoading={setLoading} dataType={'bibliography'}/>
                </Box>

            )}




        </Box>
    );
}

export default NewBibliographyFileUpload;