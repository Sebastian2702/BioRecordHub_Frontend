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
import { GetOccurrencesById } from "../../services/occurrences/occurrences.ts";

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


    useEffect(() => {
        if (!id) return;
        fetchData(Number(id));
    }, [id]);

    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 150px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px",
        }}
        >
            <ToastContainer />
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                    <CircularProgress/>
                </Box>
            ) :
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
                                    onClick={() => (window.location.href = '/occurrences/edit/' + data.id)}
                                    icon={<EditIcon />}
                                />
                            </Box>
                        )}
                    </Box>

                    {images && images.length > 0 && (
                        <Box sx={{ padding: 1 }}>
                            <ImageList images={images} cols={images.length} rowHeight={400}/>
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            padding: 2,
                        }}
                    >
                        {
                            Object.entries(data)
                                .filter(([key, value]) => key !== "id" && key !== "project_id" && key !== "nomenclature_id" && key !== "key" && value != null)
                                .map(([key, value]) => (
                                    <Box key={key}  sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                        <DataDisplay label={formatLabel(key)} value={value} />
                                    </Box>
                                ))
                        }
                        {
                            fields.map((field, index) => (
                                <Box key={index} sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                    <DataDisplay label={formatLabel(field.name)} value={field.pivot.value} />
                                </Box>
                            ))
                        }
                    </Box>
                    <Box padding={2}>
                        <Typography align={'left'} sx={{ fontSize: FONT_SIZES.medium, color: COLORS.black,textShadow: '0px 4px 12px rgba(0,0,0,0.15)', }}>Files:</Typography>
                        <Box display="flex" flexDirection="row" width="100%" gap = {2} flexWrap="wrap">
                            {
                                files && files.length > 0 ? (
                                    files.map((file) => (
                                        <AccessFile url={file.url} fileName={file.filename} extension={file.extension}/>
                                    ))
                                ): (
                                    <Typography variant='h6'>
                                        No files available for this occurrence entry.
                                    </Typography>
                                )
                            }
                        </Box>
                    </Box>
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


            }
        </Box>

    )
}

export default Occurrences;