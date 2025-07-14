import {BORDER, COLORS} from "../../constants/ui.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewEntryButton from "../../components/NewEntryButton.tsx";
import {useEffect, useState} from "react";
import StyledButton from "../../components/StyledButton.tsx";
import SearchIcon from '@mui/icons-material/Search';
import StyledAutoComplete from "../../components/StyledAutoComplete.tsx";
import ExtraFieldAccordion from "../../components/ExtraFieldAccordion.tsx";
import {toast, ToastContainer} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import {GetAutocompleteNomenclature, SearchNomenclature} from "../../services/nomenclature/nomenclature.ts";
import {nomenclatureFieldKeys, getHelperText} from "../../utils/formFieldHelpers.ts";
import {capitalize} from "../../utils/helperFunctions.ts";
import {useNavigate} from "react-router-dom";


function Nomenclature() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [autoCompleteOptions, setAutoCompleteOptions] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [TaxonomicFields, setTaxonomicFields] = useState({
        kingdom: '',
        phylum: '',
        subphylum: '',
        class: '',
        order: '',
        suborder: '',
        infraorder: '',
        superfamily: '',
        family: '',
        subfamily: '',
        tribe: '',
        genus: '',
        subgenus: '',
        species: '',
        subspecies: '',
        author: '',
    })
    const filteredNomenclatureFieldKeys = nomenclatureFieldKeys.filter(
        (key) => key !== 'species' && key !== 'remarks'
    );
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

    const fecthAutoCompleteOptions = async () => {
        setLoading(true);
        try {
            const response = await GetAutocompleteNomenclature()
            setAutoCompleteOptions(response);
        } catch (error) {
            console.error("Error fetching autocomplete options:", error);
            setError("Failed to fetch autocomplete options");
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = () => {
        SearchNomenclature(TaxonomicFields, setError, setLoading, navigate)
    }

    useEffect(() => {
        fecthAutoCompleteOptions();
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
        }}
        >
            <ToastContainer />
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ):
                <Box>
                    <Box
                        position="relative"
                        padding="0px 20px"
                        height="60px"
                        display="flex"
                        alignItems="center"
                        marginBottom="20px"
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color={COLORS.primary}
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                margin: 0,
                            }}
                        >
                            Search for Nomenclature
                        </Typography>
                        <Box sx={{ marginLeft: 'auto', minWidth: '150px' }}>
                            <NewEntryButton
                                manualEntryLink="/nomenclature/new"
                                fileUploadLink="/nomenclature/new_file_upload"
                            />
                        </Box>
                    </Box>

                    <Box sx={{padding:"0px 20px"}}>
                        <Typography  align={"left"} variant={'h5'} fontWeight={'bold'} marginBottom={'10px'}>Species:</Typography>
                        <Box sx={{display: 'flex', gap: 2, height:'55px', marginBottom: '20px'}}>
                            <StyledAutoComplete label={'Species Name'} options={autoCompleteOptions['species']} value={TaxonomicFields['species']} onChange={(event: any, newValue: string | null) => {
                                setTaxonomicFields(prev => ({ ...prev, ['species']: newValue || '' }));
                            }} />
                            <StyledButton label={'Search'} color={'primary'} size={'large'} onClick={handleSearch} icon={<SearchIcon fontWeight={'bold'}/>}/>
                        </Box>
                        <Box sx={{marginBottom: '20px'}}>
                            <ExtraFieldAccordion
                                title={"Extra taxonomic fields for more precise search!"}
                                children={
                                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                        {filteredNomenclatureFieldKeys.map((field) => (
                                            <Box>
                                                <Typography  align={"left"} variant={'h6'} fontWeight={'bold'} marginBottom={'10px'} color={COLORS.primary}>{capitalize(field)}:</Typography>
                                                <StyledAutoComplete
                                                    key={field}
                                                    label={getHelperText(field, "nomenclature") || ''}
                                                    options={autoCompleteOptions[field] || []}
                                                    value={TaxonomicFields[field] || ''}
                                                    onChange={(event: any, newValue: string | null) => {
                                                        setTaxonomicFields(prev => ({ ...prev, [field]: newValue || '' }));
                                                    }}
                                                />
                                            </Box>

                                            ))}

                                    </Box>
                                }
                                expanded={isExpanded}
                                onToggle={() => setIsExpanded(prev => !prev)}
                            />

                        </Box>
                    </Box>
                </Box>

            }


        </Box>
    )
}

export default Nomenclature;