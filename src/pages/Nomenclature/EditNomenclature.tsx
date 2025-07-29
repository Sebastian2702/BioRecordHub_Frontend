import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import {nomenclatureFieldKeys, getHelperText} from "../../utils/formFieldHelpers.ts";
import {formatLabel, extractBibliographyIds, formatContributors} from "../../utils/helperFunctions.ts";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {GetBibliography} from "../../services/bibliography/bibliography.ts";
import DropdownSelector from "../../components/DropdownSelector.tsx";
import {GetNomenclatureById, EditNomenclatureRequest, DeleteNomenclatureImage} from "../../services/nomenclature/nomenclature.ts";
import {useAuth} from "../../context/AuthContext.tsx";
import FilesEditor from "../../components/FilesEditor.tsx";

function EditNomenclature(){
    const {user} = useAuth();
    const [nomenclatureData, setNomenclatureData] = useState<any>(null);
    const [images, setImages] = useState<File[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const requiredFields = [
        'kingdom',
        'phylum',
        'subphylum',
        'class',
        'order',
        'suborder',
        'infraorder',
        'superfamily',
        'family',
        'author',
    ];
    const [bibliographies, setBibliographies] = useState<string[]>([]);
    const [selectedBibliographyIds, setSelectedBibliographyIds] = useState<string[]>([]);
    const { id } = useParams();

    const fetchData = async (id: number) => {
        try {
            const responseBibliographies = await GetBibliography();
            setBibliographies(responseBibliographies);
            const responseNomenclature = await GetNomenclatureById(id);
            setNomenclatureData(responseNomenclature);
            setSelectedBibliographyIds(extractBibliographyIds(responseNomenclature.bibliographies));
            setImages(responseNomenclature.images || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchData(Number(id));
    }, [id]);

    const handleSave = () => {
        if (selectedBibliographyIds.length === 0) {
            setError("Please select at least one bibliography.");
            return;
        }
        else{
            const formData = new FormData();

            Object.entries(nomenclatureData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            selectedBibliographyIds.forEach((id) => {
                formData.append("bibliographies[]", String(id));
            });


            formData.append("contributors", formatContributors(nomenclatureData.contributors, user?.name || "Unknown User"));

            if (newImages && newImages.length > 0) {
                newImages.forEach((file) => {
                    formData.append("newImages[]", file);
                });
            }
            formData.append('_method', 'PUT');

            EditNomenclatureRequest(Number(id), formData, setLoading, setError, navigate);

        }
    }

    const handleDeleteImage = async (imageId: number) => {
        if (imageId) {
            try {
                setLoading(true);
                await DeleteNomenclatureImage(Number(id), imageId);
                setImages(prev => prev.filter((img) => Number(img.id) !== Number(imageId)));
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

    const getRequiredFields = (field:string) => {
        if(requiredFields.includes(field)) {
            return true;
        }
        else {
            return false;
        }
    }



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
                                fontSize: FONT_SIZES.large,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                           Edit Nomenclature: {nomenclatureData.species}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, padding: '0px 10px', }}>
                        {nomenclatureFieldKeys.map((field) => (
                            <FormField
                                label={formatLabel(field)}
                                helperText={getHelperText(field, "nomenclature") || ''}
                                value={nomenclatureData[field as keyof typeof nomenclatureData] || ''}
                                onChange={(e) => setNomenclatureData({ ...nomenclatureData, [field]: e.target.value })}
                                required={getRequiredFields(field)}
                                multiline={field === 'remarks'}
                            />
                        ))}
                    </Box>
                    <DropdownSelector data={bibliographies} selectedIds={selectedBibliographyIds} onChange={setSelectedBibliographyIds} dataType={'bibliography'}/>

                    <FilesEditor images={images} altText={"Nomenclature Image"} deleteImage={(index) => {handleDeleteImage(index)}} />
                    <Box padding={'10px'} marginTop={'30px'}>
                        <FormField
                            label={"New Files"}
                            helperText={getHelperText('file', "nomenclature") || ''}
                            value={newImages}
                            acceptedFileTypes={'.png, .jpg, .jpeg'}
                            fileUpload={true}
                            onChangeFile={
                                (files: File[] | File | null) => {
                                    if (Array.isArray(files)) {
                                        setNewImages(files);
                                    } else if (files) {
                                        setNewImages([files]);
                                    } else {
                                        setNewImages([]);
                                    }
                                }
                            }
                            required={false}
                            multipleFiles={true}
                        />

                    </Box>




                    <Box margin={"20px"} display={"flex"} justifyContent={"flex-end"} height={"60px"}>
                        <StyledButton label={"Save"} color={"primary"} size={"large"} onClick={handleSave} icon={<SaveIcon sx={{color: COLORS.white}} fontSize={"large"} />} />
                    </Box>

                </Box>
            }
        </Box>
    );
}

export default EditNomenclature;