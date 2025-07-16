import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import {nomenclatureFieldKeys, getHelperText} from "../../utils/formFieldHelpers.ts";
import {formatLabel} from "../../utils/helperFunctions.ts";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {GetBibliography} from "../../services/bibliography/bibliography.ts";
import DropdownSelector from "../../components/DropdownSelector.tsx";
import {CreateNomenclature} from "../../services/nomenclature/nomenclature.ts";
import GetNomenclatureDialog from "../../components/GetNomenclatureDialog.tsx";
import GBIFLogoUrl from '../../assets/gbif-mark-white-logo.svg';

function NewNomenclature(){
    const [nomenclatureData, setNomenclatureData] = useState({
        kingdom : '',
        phylum : '',
        subphylum : '',
        class : '',
        order : '',
        suborder : '',
        infraorder : '',
        superfamily : '',
        family : '',
        subfamily : '',
        tribe : '',
        genus : '',
        subgenus : '',
        species : '',
        subspecies : '',
        author : '',
        remarks : '',
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    const [getNomenclatureDialogOpen, setGetNomenclatureDialogOpen] = useState(false);


    const handleNomenclatureDialogClose = () => {
        setGetNomenclatureDialogOpen(false);
    }

    const handleNomenclatureDialogOpen = () => {
        setGetNomenclatureDialogOpen(true);
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetBibliography();
            setBibliographies(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = () => {
        if (selectedBibliographyIds.length === 0) {
            setError("Please select at least one bibliography.");
            return;
        }
        else{
            const data = {
               ...nomenclatureData,
                bibliographies: selectedBibliographyIds,
            }

            CreateNomenclature(data, setLoading, setError, navigate);
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
                    <Box sx={{display: 'flex', justifyContent: "space-between", height: '50px', marginBottom: '20px', padding: '0 10px', alignItems: 'center'}}>
                        <BackButton width="55px" />

                        <Typography
                            sx={{
                                color: COLORS.primary,
                                fontWeight: 'bold',
                                fontSize: FONT_SIZES.xlarge,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            New Nomenclature
                        </Typography>

                        <StyledButton
                            label="GBIF"
                            color="primary"
                            size="large"
                            onClick={handleNomenclatureDialogOpen}
                            icon={
                                <Box
                                    component="img"
                                    src={GBIFLogoUrl}
                                    alt="GBIF"
                                    sx={{ width: 38, height:38 }}
                                />
                            }
                        />


                    </Box>

                    <GetNomenclatureDialog open={getNomenclatureDialogOpen} onClose={handleNomenclatureDialogClose} setError={setError} nomenclatureData={nomenclatureData} setNomenclatureData={setNomenclatureData}/>

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

                    <Box margin={"20px"} display={"flex"} justifyContent={"flex-end"} height={"60px"}>
                        <StyledButton label={"Save"} color={"primary"} size={"large"} onClick={handleSave} icon={<SaveIcon sx={{color: COLORS.white}} fontSize={"large"} />} />
                    </Box>
                </Box>
            }
        </Box>
    );
}

export default NewNomenclature;