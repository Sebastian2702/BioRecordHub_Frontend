import {Box} from "@mui/material";
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from '../../constants/ui.ts';
import BackButton from "../../components/BackButton.tsx";
import {GetBibliographyById} from "../../services/bibliography/bibliography.ts";
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


function Bibliography() {
    const { isAdmin, isManager } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [nomenclature, setNomenclature] = useState<any>(null);
    const [error, setError] = useState("");
    const { id } = useParams();

    const fetchData = async (id: number) => {
        try {
            const response = await GetBibliographyById(id);
            setNomenclature(response.nomenclatures);
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
                                fontSize: FONT_SIZES.xlarge,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            {data.author} {data.publication_year}
                        </Typography>

                        {(isAdmin || isManager)  && (
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
                                .filter(([key, value]) => key !== "id" && key !== "created_at"  && value != null)
                                .map(([key, value]) => (
                                    <Box key={key}  sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                        <DataDisplay label={formatLabel(key)} value={value} id={data.id} />
                                    </Box>
                                ))
                        }
                    </Box>
                    {nomenclature && nomenclature.length > 0 ? (
                        <Box sx={{ padding: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Nomenclatures
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
                                trashCanButton={true}
                                dataType={"bibliographyNomenclature"}
                                referenceId={data.id}
                                setError={setError}
                            />
                        </Box>
                    ) : (
                        <Typography variant='h6'>
                            No nomenclatures available for this bibliography entry.
                        </Typography>
                    )}
                </Box>

            }


        </Box>
    );
}

export default Bibliography;