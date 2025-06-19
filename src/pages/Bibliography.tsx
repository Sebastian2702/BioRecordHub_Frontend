import {Box} from "@mui/material";
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from '../constants/ui';
import BackButton from "../components/BackButton.tsx";
import {GetBibliographyById} from "../services/bibliography/bibliography.ts";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import  DataDisplay  from "../components/DataDisplay.tsx";
import { formatLabel } from "../utils/helperFunctions.ts";
import StyledButton from "../components/StyledButton.tsx";
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../context/AuthContext.tsx";


function Bibliography() {
    const { isAdmin } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const { id } = useParams();

    const fetchData = async (id: number) => {
        try {
            const response = await GetBibliographyById(id);
            setData(response);
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
                                fontSize: FONT_SIZES.xlarge,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            {data.key}
                        </Typography>

                        {isAdmin && (
                            <Box sx={{ position: 'absolute', right: 0 }}>
                                <StyledButton
                                    label="Edit"
                                    color="edit"
                                    size="large"
                                    onClick={() => (window.location.href = '/bibliography/edit/' + data.id)}
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
                                .filter(([key, value]) => key !== "id" && key !== "created_at" && key !== "key" && value != null)
                                .map(([key, value]) => (
                                    <Box key={key}  sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                        <DataDisplay label={formatLabel(key)} value={value} />
                                    </Box>
                                ))
                        }
                    </Box>
                </Box>

            }


        </Box>
    );
}

export default Bibliography;