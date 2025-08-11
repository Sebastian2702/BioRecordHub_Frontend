import {Box} from "@mui/material";
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from '../../constants/ui.ts';
import BackButton from "../../components/BackButton.tsx";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import  DataDisplay  from "../../components/DataDisplay.tsx";
import { formatLabel } from "../../utils/helperFunctions.ts";
import StyledButton from "../../components/StyledButton.tsx";
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../context/AuthContext.tsx";
import DataTable from "../../components/DataTable.tsx";
import {toast, ToastContainer} from "react-toastify";
import AccessFile from "../../components/AccessFile.tsx";
import ImageList from "../../components/ImageList.tsx";
import { GetOccurrencesById, GetOccurrenceFile } from "../../services/occurrences/occurrences.ts";
import DownloadIcon from '@mui/icons-material/Download';

function Occurrences() {
    const { isAdmin, isManager } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [nomenclature, setNomenclature] = useState<any[]>([]);
    const [project, setProject] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [buttonExportLoading, setButtonExportLoading] = useState(false);
    const { id } = useParams();

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

    const fetchData = async (id: number) => {
        setLoading(true);
        try {
            const response = await GetOccurrencesById(id);
            setNomenclature(response.nomenclature ? [response.nomenclature] : []);
            setProject(response.project ? [response.project] : []);
            setFiles(response.files || []);
            setImages(response.images || []);
            setFields(response.fields);
            setData({ ...response, nomenclature: undefined, project: undefined, files: undefined, fields: undefined, images: undefined });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadFile = (occurrenceId: number, type: 'csv' | 'xlsx') => {
        GetOccurrenceFile(occurrenceId, type, setButtonExportLoading, setError)
    }

    useEffect(() => {
        if (!id) return;
        fetchData(Number(id));
    }, [id]);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <ToastContainer />
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                    <CircularProgress/>
                </Box>
            ) :
                <Box sx={{margin: '0 auto', width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Box
                        sx={{
                            padding: 2,
                            width: '97%',
                            backgroundColor: COLORS.white,
                            color: COLORS.primary,
                            borderRadius: BORDER.radius,
                            marginBottom: '10px',
                        }}
                    >
                        <Box sx={{padding: "0px 10px"}}>
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
                                        fontSize: {
                                            xs: FONT_SIZES.xsmall,
                                            sm: FONT_SIZES.small,
                                            md: FONT_SIZES.medium,
                                            lg: FONT_SIZES.large,
                                        },
                                        textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    {data.scientific_name}
                                </Typography>

                                {(isAdmin || isManager) && (
                                    <Box sx={{ position: 'absolute', right: 0 }}>
                                        <StyledButton
                                            label="Edit"
                                            color="edit"
                                            size="large"
                                            onClick={() => (window.location.href = '/Occurrences/edit/' + data.id)}
                                            icon={<EditIcon />}
                                        />
                                    </Box>
                                )}
                            </Box>

                            <Typography align={'left'} sx={{ fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight:'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)',marginBottom:'20px' }}>Occurrence Details:</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                }}
                            >
                                {
                                    Object.entries(data)
                                        .filter(([key, value]) => key !== "id" && key !== "project_id" && key !== "nomenclature_id" && key !== "contributors" && key !== "key" && value != null)
                                        .map(([key, value]) => (
                                            <Box key={key}  sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                                <DataDisplay label={formatLabel(key)} value={value} />
                                            </Box>
                                        ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        padding: 2,
                        width: '97%',
                        backgroundColor: COLORS.white,
                        color: COLORS.primary,
                        borderRadius: BORDER.radius,
                        marginBottom: '10px',
                    }}>
                        <Typography align={'left'} sx={{  fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight:'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)',marginBottom:'20px' }}>Additional Information:</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                            }}
                        >
                        {
                            fields.map((field, index) => (
                                <Box key={index} sx={{flex: '1 1 48%', minWidth: '300px', mb: 2
                                }}>
                                    <DataDisplay label={formatLabel(field.name)} value={field.pivot.value} />
                                </Box>
                            ))
                        }
                        </Box>
                    </Box>
                    <Box sx={{
                        padding: 2,
                        width: '97%',
                        backgroundColor: COLORS.white,
                        color: COLORS.primary,
                        borderRadius: BORDER.radius,
                        marginBottom: '10px',
                    }}>
                        <Typography align={'left'} sx={{  fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight:'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)',marginBottom:'20px' }}>Files Uploaded:</Typography>
                        <Box display="flex" flexDirection="row" width="100%" gap = {2} flexWrap="wrap" marginTop={'20px'} alignItems={'center'}>
                            {images && images.length > 0 && (
                                <Box sx={{ padding: 1 }}>
                                    <ImageList images={images} cols={images.length} rowHeight={400}/>
                                </Box>
                            )}
                            {
                                files && files.length > 0 ? (
                                    files.map((file) => (
                                        <AccessFile url={file.url} fileName={file.filename} extension={file.extension}/>
                                    ))
                                ): (
                                    <Typography variant='h6' sx={{ textAlign: 'center', width: '100%', color: COLORS.black,textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>
                                        No files available for this occurrence entry.
                                    </Typography>
                                )
                            }
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            padding: 2,
                            width: '97%',
                            backgroundColor: COLORS.white,
                            color: COLORS.primary,
                            borderRadius: BORDER.radius,
                            marginBottom: '10px',
                        }}
                    >
                        <Typography align={'left'} sx={{  fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight:'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)',marginBottom:'20px' }}>Nomenclature and Project Data:</Typography>
                        {nomenclature && nomenclature.length > 0 ? (
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    Nomenclature
                                </Typography>
                                <DataTable
                                    data={nomenclature}
                                    columns={[
                                        { id: 'species', label: 'Species' },
                                        { id: 'author', label: 'Author' },
                                        { id: 'genus', label: 'Genus' },
                                        { id: 'family', label: 'Family' },
                                        { id: 'order', label: 'Order' }
                                    ]}
                                    editButton={false}
                                    viewButton={true}
                                    viewLink={"/nomenclature/"}
                                    deleteButton={false}
                                    trashCanButton={false}
                                    dataType={"occurrenceNomenclature"}
                                    referenceId={data.id}
                                    setError={setError}
                                />
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant='h6'>
                                    No Nomenclature available for this project entry.
                                </Typography>
                            </Box>

                        )}
                        {project && project.length > 0 ? (
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    Project
                                </Typography>
                                <DataTable
                                    data={project}
                                    columns={[
                                        { id: 'title', label: 'Title' },
                                        { id: 'research_type', label: 'Research Type' },
                                        { id: 'advisor', label: 'Advisor(s)' },
                                        { id: 'course', label: 'Course' },
                                    ]}
                                    editButton={false}
                                    viewButton={true}
                                    viewLink={"/projects/"}
                                    deleteButton={false}
                                    trashCanButton={false}
                                    dataType={"occurrenceProject"}
                                    referenceId={data.id}
                                    setError={setError}
                                />
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant='h6'>
                                    No Project available for this project entry.
                                </Typography>
                            </Box>

                        )}
                    </Box>
                    <Box
                        sx={{
                            padding: 2,
                            width: '97%',
                            backgroundColor: COLORS.white,
                            color: COLORS.primary,
                            borderRadius: BORDER.radius,
                            marginBottom: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography align={'left'} sx={{  fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight:'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)', alignItems:'center'}}>Created by: {data.contributors}</Typography>
                        { buttonExportLoading ? (
                                <CircularProgress/>
                            )
                            :
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <StyledButton label={"DCF/CSV"} color={'secondary'} size={'medium'} onClick={() => {handleDownloadFile(data.id, 'csv')}} icon={<DownloadIcon/>}/>
                                <StyledButton label={"Excel"} color={'primary'} size={'medium'} onClick={() => {handleDownloadFile(data.id, 'xlsx')}} icon={<DownloadIcon/>}/>
                            </Box>
                        }
                    </Box>
                </Box>
            }
        </Box>

    )
}

export default Occurrences;