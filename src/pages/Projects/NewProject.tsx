import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import FormField from "../../components/FormField.tsx";
import { useState } from "react";
import { getHelperText } from "../../utils/formFieldHelpers.ts";
import { formatContributors, formatLabel, formatAuthors} from "../../utils/helperFunctions.ts";
import ListInput from "../../components/ListInput.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";
import {ToastContainer} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import BackButton from "../../components/BackButton.tsx";
import {dropdownProjectOptions} from "../../constants/uiConstants.ts";
import { CreateProject } from "../../services/project/project.ts";

function NewProject() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [advisors, setAdvisors] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [projectData, setProjectData] = useState({
        title: '',
        research_type: '',
        department: '',
        course: '',
        description: '',
    }
    );
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = () => {

        const advisor = formatAuthors(advisors);

        const formData = new FormData();

        formData.append("advisor", advisor);
        formData.append("creator", formatContributors("", user?.name || "Unknown User"));

        Object.entries(projectData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        if (files && files.length > 0) {
            files.forEach((file) => {
                formData.append("files[]", file);
            });
        }

        CreateProject(formData, setLoading, setError, navigate)
    };

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
                            New Project
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
                        <FormField
                            label={"Files"}
                            helperText={getHelperText('files', "projects") || ''}
                            value={files}
                            acceptedFileTypes={'.pdf'}
                            fileUpload={true}
                            onChangeFile={
                                (files: File[] | File | null) => {
                                    if (Array.isArray(files)) {
                                        setFiles(files);
                                    } else if (files) {
                                        setFiles([files]);
                                    } else {
                                        setFiles([]);
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

export default NewProject