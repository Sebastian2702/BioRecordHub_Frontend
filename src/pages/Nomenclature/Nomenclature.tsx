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
import {GetNomenclatureById} from "../../services/nomenclature/nomenclature.ts";
import {toast, ToastContainer} from "react-toastify";
import StyledBreadcrumbs from "../../components/StyledBreadcrumbs.tsx";
import ImageList from "../../components/ImageList.tsx";
import StyledAccordion from "../../components/StyledAccordion.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { ExportDataToExcel } from '../../services/excel/excel.ts';
import { DeleteNomenclature } from '../../services/nomenclature/nomenclature.ts';
import CustomDialog from "../../components/CustomDialog.tsx";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../routes/frontendRoutes.ts";

function Nomenclature() {
    const { isAdmin, isManager } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [bibliographies, setBiblipgraphies] = useState<any>(null);
    const [images, setImages] = useState<File[]>([]);
    const [occurrences, setOccurrences] = useState<any>([]);
    const [bibliographiesAccordion, setBibliographiesAccordion] = useState(false);
    const [occurrencesAccordion, setOccurrencesAccordion] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

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
            const response = await GetNomenclatureById(id);
            setBiblipgraphies(response.bibliographies);
            setImages(response.images);
            setOccurrences(response.occurrences);
            setData({ ...response, bibliographies: undefined, images: undefined, occurrences: undefined });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };


    useEffect(() => {
        if (!id) return;
        fetchData(Number(id));
    }, [id]);

    const handleExportToExcel = async () => {
        if (!data) {
            toast.error("No data available to export", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const nomenclatureId = [Number(id)];

        await ExportDataToExcel(nomenclatureId, 'nomenclature', setError, setLoading);
    }

    const handleDelete = async () =>{
        try{
            setDialogLoading(true)
            await DeleteNomenclature(Number(id));
            setDialogLoading(false);
            navigate(ROUTES.nomenclature);

        }catch(error){
            setDialogLoading(false);
            setError(error.response.data.message);
        }

    }


    return (
        <Box>
            <Box sx={{
                width: '97%',
                backgroundColor: COLORS.white,
                color: COLORS.primary,
                height: 'calc(100vh - 150px)',
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
                                {data.species}
                            </Typography>

                            {(isAdmin || isManager) && (
                                <Box sx={{ position: 'absolute', right: 0 }}>
                                    <StyledButton
                                        label="Edit"
                                        color="edit"
                                        size="large"
                                        onClick={() => (window.location.href = '/nomenclature/edit/' + data.id)}
                                        icon={<EditIcon />}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Box padding={2}>
                            <StyledBreadcrumbs data={data}/>
                        </Box>

                        {images && images.length > 0 && (
                            <Box sx={{ padding: 1 }}>
                                <ImageList images={images} cols={images.length} rowHeight={600}/>
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
                                    .filter(([key, value]) => key !== "id" && key !== "created_at" && key !== "key" && value != null)
                                    .map(([key, value]) => (
                                        <Box key={key}  sx={{ flex: '1 1 48%', minWidth: '300px', mb: 2 }}>
                                            <DataDisplay label={formatLabel(key)} value={value} />
                                        </Box>
                                    ))
                            }
                        </Box>
                        <Box marginBottom={'20px'}>
                            {bibliographies && bibliographies.length > 0 ? (
                                <StyledAccordion title={'Bibliographies associated with this nomenclature entry'}
                                                 expanded={bibliographiesAccordion}
                                                 onToggle={() => setBibliographiesAccordion(prev => !prev)}
                                                 children={
                                                     <Box sx={{ padding: 1 }}>
                                                         <DataTable
                                                             data={bibliographies}
                                                             columns={[
                                                                 { id: 'author', label: 'Author' },
                                                                 { id: 'publication_year', label: 'Publication Year' },
                                                                 { id: 'title', label: 'Title' },
                                                                 { id: 'publication_title', label: 'Publication Title' }
                                                             ]}
                                                             editButton={false}
                                                             viewButton={true}
                                                             viewLink={"/bibliography/"}
                                                             deleteButton={false}
                                                             trashCanButton={true}
                                                             dataType={"nomenclatureBibliography"}
                                                             referenceId={data.id}
                                                             setError={setError}
                                                         />
                                                     </Box>
                                                 }
                                />
                            ) : (
                                <Box>
                                    <Typography variant='h6'>
                                        No bibliographies available for this nomenclature entry.
                                    </Typography>
                                    <Typography variant='h6' fontWeight={'bold'} color={COLORS.delete}>
                                        Bibliographies need to be added to the Nomenclature before they can be used in occurrences.
                                    </Typography>

                                </Box>

                            )}
                        </Box>
                        <Box marginBottom={'20px'}>
                            {occurrences && occurrences.length > 0 ? (
                                <StyledAccordion title={'Occurrences associated with this nomenclature entry'}
                                                 expanded={occurrencesAccordion}
                                                 onToggle={() => setOccurrencesAccordion(prev => !prev)}
                                                 children={
                                                     <Box sx={{ padding: 1, marginTop: '20px' }}>
                                                         <DataTable
                                                             data={occurrences}
                                                             columns={[
                                                                 { id: 'scientific_name', label: 'Scientific Name' },
                                                                 { id: 'event_date', label: 'Event Date' },
                                                                 { id: 'locality', label: 'Locality' },
                                                             ]}
                                                             editButton={false}
                                                             viewButton={true}
                                                             viewLink={"/occurrence/"}
                                                             deleteButton={false}
                                                             trashCanButton={false}
                                                             dataType={"occurrence"}
                                                             referenceId={data.id}
                                                             setError={setError}
                                                         />
                                                     </Box>
                                                 }
                                />
                            ) : (
                                <Box>
                                    <Typography variant='h6'>
                                        No Occurrences available for this project entry.
                                    </Typography>
                                </Box>

                            )}
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap:2, margin: '10px 0px 10px' }}>
                            <CustomDialog
                                open={deleteDialogOpen}
                                onClose={handleDeleteDialogClose}
                                title="Confirm Deletion"
                                contentText={
                                    <Box>
                                        <Typography variant="body1">
                                            Are you sure you want to delete <strong>{data.species}</strong>?
                                        </Typography>
                                    </Box>
                                }
                                content={"delete"}
                                dialogLoading={dialogLoading}
                                action={handleDelete}
                            />
                            {
                                (isAdmin || isManager) &&
                                <StyledButton label={'Delete'} color={'delete'} size={'medium'} onClick={() => setDeleteDialogOpen(true)} icon={<DeleteIcon/>} />
                            }
                            <StyledButton label={'Excel'} color={'primary'} size={'medium'} onClick={handleExportToExcel} icon={<DownloadIcon/> }/>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default Nomenclature;