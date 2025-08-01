import ListInput from "../../components/ListInput.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import { getHelperText } from "../../utils/formFieldHelpers.ts";
import {toast, ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";
import {useEffect, useState} from "react";
import {formatAuthors, formatContributors, getAdvisors} from "../../utils/helperFunctions.ts";
import {BORDER, COLORS, FONT_SIZES} from "../../constants/ui.ts";
import Box from "@mui/material/Box";
import {EditProjectRequest, DeleteProjectFile, GetProjectById} from "../../services/project/project.ts";
import BackButton from "../../components/BackButton.tsx";
import Typography from "@mui/material/Typography";
import FormField from "../../components/FormField.tsx";
import {dropdownProjectOptions} from "../../constants/uiConstants.ts";
import FilesEditor from "../../components/FilesEditor.tsx";

function EditProject() {
    const { user } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState<any>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const { id } = useParams();
    const [advisors, setAdvisors] = useState<string[]>([]);
    const navigate = useNavigate();


    const fetchData = async (id: number) => {
        try {
            const response = await GetProjectById(id);
            setProjectData(response);
            setAdvisors(getAdvisors(response));
            setFiles(response.files);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {

        const advisor = formatAuthors(advisors);

        const formData = new FormData();

        formData.append("advisor", advisor);
        formData.append("creator", formatContributors(projectData.creator, user?.name || "Unknown User"));

        Object.entries(projectData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        if (newFiles && newFiles.length > 0) {
            newFiles.forEach((file) => {
                formData.append("newFiles[]", file);
            });
        }

        formData.append('_method', 'PUT');

        EditProjectRequest(Number(id),formData, setLoading, setError, navigate)
    };

    const handleDeleteFile = async (fileID: number) => {
        if (fileID) {
            try {
                setLoading(true);
                await DeleteProjectFile(Number(id), fileID);
                setFiles(prev => prev.filter((file) => Number(file.id) !== Number(fileID)));
                toast.success("Image deleted successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.error("Error deleting image:", error);
                setError("Failed to delete image");
            } finally {
                setLoading(false);
            }
        }
    }

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

    return(
        <Box
            sx={{
                width: '97%',
                height: 'calc(100vh - 150px)',
                backgroundColor: COLORS.white,
                color: COLORS.primary,
                borderRadius: BORDER.radius,
                margin: 'auto',
                paddingTop: "20px",
                overflow: 'auto',
            }}
        >
            <ToastContainer />
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ):
                <Box>
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
                            {projectData ? `Edit Project: ${projectData.title}` : "Loading..."}
                        </Typography>
                    </Box>
                    <Box padding={"10px"} display={'flex'} flexDirection={'column'} gap={2}>
                        <FormField
                            label={"Title"}
                            value={projectData.title}
                            onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                            helperText={getHelperText('title', "projects") || ''}
                            required={true}
                        />
                        <FormField
                            label={"Research Type"}
                            value={projectData.research_type}
                            onChangeDropdown={(e) => setProjectData({...projectData, research_type: e.target.value})}
                            helperText={getHelperText('research_type', "projects") || ''}
                            required={true}
                            dropdown={true}
                            options={dropdownProjectOptions}
                        />
                        <FormField
                            label={"Department"}
                            value={projectData.department}
                            onChange={(e) => setProjectData({...projectData, department: e.target.value})}
                            helperText={getHelperText('department', "projects") || ''}
                            required={true}
                        />
                        <FormField
                            label={"Course"}
                            value={projectData.course}
                            onChange={(e) => setProjectData({...projectData, course: e.target.value})}
                            helperText={getHelperText('course', "projects") || ''}
                            required={true}
                        />
                        <ListInput
                            label="Advisor(s)"
                            helperText={getHelperText('advisors', "projects") || ''}
                            values={advisors}
                            onChange={setAdvisors}
                        />
                        <FormField
                            label={"Description"}
                            value={projectData.description}
                            onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                            helperText={getHelperText('description', "projects") || ''}
                            required={true}
                            multiline={true}
                        />
                        <FilesEditor files={files} altText={"Nomenclature Image"} deleteImage={(index) => {handleDeleteFile(index)}} images={false}/>
                        <FormField
                            label={"Files"}
                            helperText={getHelperText('files', "projects") || ''}
                            value={newFiles}
                            acceptedFileTypes={'.pdf'}
                            fileUpload={true}
                            onChangeFile={
                                (files: File[] | File | null) => {
                                    if (Array.isArray(files)) {
                                        setNewFiles(files);
                                    } else if (files) {
                                        setNewFiles([files]);
                                    } else {
                                        setNewFiles([]);
                                    }
                                }
                            }
                            required={false}
                            multipleFiles={true}
                        />
                        <Box margin={"20px"} display={"flex"} justifyContent={"flex-end"} height={"60px"}>
                            <StyledButton label={"Save"} color={"primary"} size={"large"} onClick={handleSave} icon={<SaveIcon sx={{color: COLORS.white}} fontSize={"large"} />} />
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )

}

export default EditProject