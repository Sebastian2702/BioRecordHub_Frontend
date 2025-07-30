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
import { GetProjectById } from "../../services/project/project.ts";

function Project() {
    const { isAdmin, isManager } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");
    const { id } = useParams();

    const fetchData = async (id: number) => {
        try {
            const response = await GetProjectById(id);
            setData({ ...response, nomenclatures: undefined });
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

    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 150px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px",
        }}>
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
                                fontSize: FONT_SIZES.large,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            {data.title}
                        </Typography>

                        {(isAdmin || isManager)  && (
                            <Box sx={{ position: 'absolute', right: 0 }}>
                                <StyledButton
                                    label="Edit"
                                    color="edit"
                                    size="large"
                                    onClick={() => (window.location.href = '/projects/edit/' + data.id)}
                                    icon={<EditIcon />}
                                />
                            </Box>
                        )}
                    </Box>
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
                        .filter(([key, value]) => key !== "id" && key !== "created_at" && key !== 'files'  && value != null)
                        .map(([key, value]) => (
                            <Box key={key}  sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                <DataDisplay label={formatLabel(key)} value={key === 'research_type' ? formatLabel(value) : value} id={data.id} />
                            </Box>
                        ))
                    }
                    </Box>
                </Box>
            }
            <ToastContainer />
        </Box>
    );
}

export default Project;