import Box from "@mui/material/Box";
import {useAuth} from "../../context/AuthContext.tsx";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import {formatLabel} from "../../utils/helperFunctions.ts";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {formatContributors} from "../../utils/helperFunctions.ts";
import {GetNomenclature} from "../../services/nomenclature/nomenclature.ts";
import {GetProject} from "../../services/project/project.ts";
import {GetOccurrenceFields} from "../../services/admin/admin.ts";
import DropdownSelector from "../../components/DropdownSelector.tsx";

function NewOccurrence() {
    const {user} = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState<any[]>([]);
    const [nomenclatureOptions, setNomenclatureOptions] = useState<any[]>([]);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);
    const [occurrenceData, setOccurrenceData] = useState({
        nomenclature_id: '',
        project_id: '',
        scientific_name: '',
        event_date: '',
        country: '',
        locality: '',
        decimal_latitude: '',
        decimal_longitude: '',
        basis_of_record: '',
        contributors: '',
    });
    const [usedFormFields, setUsedFormFields] = useState<string[]>([]);

    const getData = async () => {
        setLoading(true);
        try {
            const [fieldsResponse, nomenclatureResponse, projectsResponse] = await Promise.all([
                GetOccurrenceFields(),
                GetNomenclature(),
                GetProject()
            ]);
            setFormFields(fieldsResponse);
            setNomenclatureOptions(nomenclatureResponse);
            setProjectOptions(projectsResponse);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
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

    useEffect(() => {
        getData();
    }, []);

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
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ) :
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
                            New Occurrence
                        </Typography>
                    </Box>




                </Box>
            }
        </Box>
    )
}

export default NewOccurrence;