import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../constants/ui';
import Typography from '@mui/material/Typography';
import BackButton from "../components/BackButton.tsx";
import FormField from "../components/FormField";
import {useEffect, useState} from "react";
import { getHelperText } from "../utils/formFieldHelpers.ts";
import { formatLabel } from "../utils/helperFunctions.ts";
import { bibliographyFieldKeys } from "../utils/formFieldHelpers.ts";
import ExtraFieldAccordion from "../components/ExtraFieldAccordion.tsx";
import ListInput from "../components/ListInput.tsx";
import StyledButton from "../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {CreateBibliography, GetBibliographyById} from "../services/bibliography/bibliography.ts";
import dayjs from 'dayjs';
import { formatAuthors } from "../utils/helperFunctions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {dropdownFilterOptions} from "../constants/uiConstants.ts";

function EditBibliography (){
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const { id } = useParams();
    const [notRequiredFormData, setNotRequiredFormData] = useState<any>(null);
    const [authorsArray, setAuthorsArray] = useState<string[]>([]);

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
                            Edit {data?.key || 'Bibliography'}
                        </Typography>
                    </Box>
                    <Box padding={"10px"}>
                        <Box>
                            <FormField
                                label={"Key"}
                                value={data?.key || ''}
                                onChange={(e) => setData({ ...data, key: e.target.value })}
                                helperText={getHelperText('key') || ''}
                                required={true}
                            />
                            <FormField
                                label={"Title"}
                                value={data?.title || ''}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                helperText={getHelperText('title') || ''}
                                required={true}
                            />
                            <ListInput label={"Author"} helperText={getHelperText('authors') || ''} values={authorsArray}/>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                <FormField
                                    label={"Publication Year"}
                                    value={data?.date ? dayjs(data.date).format('YYYY-MM-DD') : ''}
                                    onChangeDate={(e) => setData({ ...data, date: e })}
                                    helperText={getHelperText('publication_year') || ''}
                                    required={true}
                                    date={true}
                                />
                                <FormField
                                    label={"Item Type"}
                                    value={data?.item_type || ''}
                                    onChangeDropdown={(e) => setData({ ...data, item_type: e })}
                                    helperText={getHelperText('item_type') || ''}
                                    required={true}
                                    dropdown={true}
                                    options={dropdownFilterOptions}
                                />

                                <FormField
                                    label={"Publication Title"}
                                    value={data?.publication_title || ''}
                                    onChange={(e) => setData({ ...data, publication_title: e.target.value })}
                                    helperText={getHelperText('publication_title') || ''}
                                    required={true}
                                />
                                <FormField
                                    label={"Pages"}
                                    value={data?.pages || ''}
                                    onChange={(e) => setData({ ...data, pages: e.target.value })}
                                    helperText={getHelperText('pages') || ''}
                                    required={false}
                                />
                            </Box>
                        </Box>
                        <Box padding={"0px 10px"}>
                            <Typography
                                align={"left"}
                                sx={{
                                    color: COLORS.primary,
                                    fontSize: { xs: FONT_SIZES.xsmall, sm: FONT_SIZES.small, lg: FONT_SIZES.medium },
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                }}
                            >
                                Extra Fields:
                            </Typography>

                            <ExtraFieldAccordion
                                title={"Extra fields like ISBN, Issue, Volume, DOI, etc..."}
                                children={
                                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                        {bibliographyFieldKeys.map((field) => (
                                            <FormField
                                                label={formatLabel(field)}
                                                helperText={getHelperText(field) || ''}
                                                value={notRequiredFormData[field as keyof typeof notRequiredFormData] || ''}
                                                onChange={(e) => setNotRequiredFormData({ ...notRequiredFormData, [field]: e.target.value })}
                                                multiline={field === 'notes' || field === 'extra'}
                                                required={false}
                                            />
                                        ))}
                                    </Box>
                                }
                                expanded={isExpanded}
                                onToggle={() => setIsExpanded(prev => !prev)}
                            />
                        </Box>
                        <Box marginTop={"20px"} display={"flex"} justifyContent={"flex-end"} height={"60px"}>
                            <StyledButton label={"Save"} color={"primary"} size={"large"} onClick={handleSave} icon={<SaveIcon sx={{color: COLORS.white}} fontSize={"large"} />} />
                        </Box>
                    </Box>
                </Box>
            }




        </Box>
    );

}

export default EditBibliography;