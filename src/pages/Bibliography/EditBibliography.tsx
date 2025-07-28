import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import { getHelperText } from "../../utils/formFieldHelpers.ts";
import { bibliographyFieldKeys } from "../../utils/formFieldHelpers.ts";
import ExtraFieldAccordion from "../../components/ExtraFieldAccordion.tsx";
import ListInput from "../../components/ListInput.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {UpdateBibliography, GetBibliographyById} from "../../services/bibliography/bibliography.ts";
import dayjs from 'dayjs';
import {
    formatLabel,
    formatAuthors,
    getAuthors,
    formatContributors,
    appendFileToFormData
} from "../../utils/helperFunctions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {dropdownFilterBibliographyOptions} from "../../constants/uiConstants.ts";
import { getNonRequiredFields } from "../../utils/helperFunctions.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";
import DownloadIcon from '@mui/icons-material/Download';
import { GetBibliographyFile, DeleteBibliographyFile } from "../../services/bibliography/bibliography.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDialog from "../../components/CustomDialog.tsx";


function EditBibliography (){
    const { user } = useAuth();
    const [isExpanded, setIsExpanded] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [file, setFile] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const { id } = useParams();
    const [notRequiredFormData, setNotRequiredFormData] = useState<any>(null);
    const [authorsArray, setAuthorsArray] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const fetchData = async (id: number) => {
        try {
            const response = await GetBibliographyById(id);
            setData(response);
            setNotRequiredFormData(getNonRequiredFields(response, bibliographyFieldKeys));
            setAuthorsArray(getAuthors(response));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchData(Number(id));
    }, [id]);

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

    const handleDeleteFile = async () => {
        try{
            setDialogLoading(true);
            await DeleteBibliographyFile(data.id ?? 0);
            setFile(null);
            setData({ ...data, file: null });
            setDialogLoading(false);
            setDeleteDialogOpen(false);
        }
        catch (error) {
            setError("Failed to delete file. Please try again later.");
            setDialogLoading(false);
        }
    }

    const handleSave = () => {
        const author = formatAuthors(authorsArray);
        const dateModified = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const contributors = formatContributors(data.contributors, user?.name ? user.name : "");

        const dataToSend = {
            ...data,
            ...notRequiredFormData,
            author,
            date_modified: dateModified,
            contributors,
            verified: null,

        };

        const formData = appendFileToFormData(dataToSend, file, data?.verified);
        formData.append('_method', 'PUT');

        UpdateBibliography(formData, setError, setLoading, navigate, data.id);
    }

    const deleteDialogContent = (
        <Box>
            <Typography variant="body1">
                Are you sure you want to delete this file?
            </Typography>
        </Box>
    )


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
            <CustomDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                title="Confirm Deletion"
                contentText={deleteDialogContent}
                content={"delete"}
                dialogLoading={dialogLoading}
                action={() => {
                    handleDeleteFile();
                }}
            />
            <ToastContainer />
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ):
                <Box sx={{padding: "0px 10px", overflow:"auto", height: 'calc(100vh - 150px)'}}>
                    <Box sx={{ position: 'relative', height: '50px', marginBottom: '20px' }}>
                        <Box sx={{ position: 'absolute', left: 0 }}>
                            <BackButton width="55px" />
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
                            Edit {data?.key || 'Bibliography'}
                        </Typography>
                    </Box>
                    <Box padding={"10px"}>
                        <Box>
                            <FormField
                                label={"Title"}
                                value={data?.title || ''}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                helperText={getHelperText('title', "bibliography") || ''}
                                required={true}
                            />
                            <ListInput
                                label="Author"
                                helperText={getHelperText('authors', "bibliography") || ''}
                                values={authorsArray}
                                onChange={setAuthorsArray}
                            />
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                <FormField
                                    label={"Publication Year"}
                                    value={data?.publication_year ? dayjs(`${data.publication_year}-01-01`) : null}
                                    onChangeDate={(e) =>
                                        setData({ ...data, publication_year: e ? e.year() : '' })
                                    }
                                    helperText={getHelperText('publication_year', "bibliography") || ''}
                                    required={true}
                                    date={true}
                                />
                                <FormField
                                    label={"Item Type"}
                                    value={data?.item_type || ''}
                                    onChangeDropdown={(e) => setData({ ...data, item_type: e.target.value })}
                                    helperText={getHelperText('item_type', "bibliography") || ''}
                                    required={true}
                                    dropdown={true}
                                    options={dropdownFilterBibliographyOptions}
                                />

                                <FormField
                                    label={"Publication Title"}
                                    value={data?.publication_title || ''}
                                    onChange={(e) => setData({ ...data, publication_title: e.target.value })}
                                    helperText={getHelperText('publication_title', "bibliography") || ''}
                                    required={true}
                                />
                                <FormField
                                    label={"Pages"}
                                    value={data?.pages || ''}
                                    onChange={(e) => setData({ ...data, pages: e.target.value })}
                                    helperText={getHelperText('pages', "bibliography") || ''}
                                    required={false}
                                />
                            </Box>
                            <FormField label={"Verified"} value={data?.verified} onChange={(e) => setData({...data, verified: e.target.checked})} helperText={getHelperText('verified', "bibliography") || ''} required={false} switchInput={true} />
                            <Box padding={'8px'}  marginTop={'20px'}>
                                {data.file ? (
                                    <Box display={'flex'} flexDirection={'row'} gap={1} alignItems={'center'}>
                                        <Typography sx={{
                                            color: COLORS.primary,
                                            fontSize: {
                                                xs: FONT_SIZES.xsmall,
                                                sm: FONT_SIZES.small,
                                                lg: FONT_SIZES.medium,
                                            },
                                            fontWeight: 'bold',
                                            marginBottom: '8px',}}
                                            align={"left"}
                                        >
                                                File:
                                            </Typography>
                                        <StyledButton
                                            label={data?.file}
                                            color="primary"
                                            size="medium"
                                            icon={<DownloadIcon/>}
                                            onClick={() => handleDownloadFile(data.id ?? 0)}
                                            disabled={loading}
                                        />
                                        <DeleteIcon
                                            sx={{ color: COLORS.delete, cursor: "pointer" }}
                                            onClick={() => setDeleteDialogOpen(true)}
                                            fontSize={"medium"}
                                        />
                                    </Box>
                                    ):(
                                    <FormField label={"File"} value={file} onChangeFile={(file) => setFile(file)} helperText={getHelperText('file', "bibliography") || ''} required={false} fileUpload={true} acceptedFileTypes={'.pdf'} multipleFiles={false}/>
                                    )}

                            </Box>
                        </Box>
                        <Box padding={"10px"}>
                            <Typography
                                align={"left"}
                                sx={{
                                    color: COLORS.primary,
                                    fontSize: { xs: FONT_SIZES.xsmall, sm: FONT_SIZES.small, lg: FONT_SIZES.medium },
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                }}
                            >
                                Extra Fields:
                            </Typography>

                            <ExtraFieldAccordion
                                title={"Extra fields like ISBN, Issue, Volume, DOI, etc..."}
                                children={
                                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                        {bibliographyFieldKeys.map((field) => (
                                            <FormField
                                                label={formatLabel(field)}
                                                helperText={getHelperText(field, "bibliography") || ''}
                                                value={field === 'date' ? data?.date ? dayjs(`${data.date}-01-01`) : null  : notRequiredFormData[field as keyof typeof notRequiredFormData] || ''}
                                                onChange={(e) => setNotRequiredFormData({ ...notRequiredFormData, [field]: e.target.value })}
                                                multiline={field === 'notes' || field === 'extra'}
                                                required={false}
                                                onChangeDate={(e) => {
                                                    setData({ ...data, date: e ? e.year() : '' })
                                                }}
                                                date = {field === 'date'}
                                            />
                                        ))}
                                    </Box>
                                }
                                expanded={isExpanded}
                                onToggle={() => setIsExpanded(prev => !prev)}
                            />
                        </Box>
                        <Box marginTop={"20px"} display={"flex"} justifyContent={"flex-end"} height={"60px"}>
                            <StyledButton label={"Save"} color={"primary"} size={"large"} onClick={handleSave} icon={<SaveIcon sx={{color: COLORS.white}} fontSize={"large"} />} />
                        </Box>
                    </Box>
                </Box>
            }




        </Box>
    );

}

export default EditBibliography;