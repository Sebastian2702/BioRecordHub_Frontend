import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import { getHelperText } from "../../utils/formFieldHelpers.ts";
import { formatLabel } from "../../utils/helperFunctions.ts";
import { bibliographyFieldKeys } from "../../utils/formFieldHelpers.ts";
import ExtraFieldAccordion from "../../components/ExtraFieldAccordion.tsx";
import ListInput from "../../components/ListInput.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import { CreateBibliography } from "../../services/bibliography/bibliography.ts";
import dayjs from 'dayjs';
import { formatAuthors } from "../../utils/helperFunctions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { dropdownFilterOptions } from "../../constants/uiConstants.ts";
import {normalizeEntryDates} from "../../utils/helperFunctions.ts"


function NewBibliography () {
    const [key, setKey] = useState('');
    const [itemType, setItemType] = useState('');
    const [date, setDate] = useState(dayjs(new Date()));
    const [authorsArray, setauthorsArray] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [publicationTitle, setPublicationTitle] = useState('');
    const [pages, setPages] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [notRequiredFormData, setNotRequiredFormData] = useState({
        isbn: '',
        issn: '',
        doi: '',
        url: '',
        abstract_note: '',
        date_added: '',
        date_modified: '',
        access_date: '',
        num_pages: '',
        issue: '',
        volume: '',
        number_of_volumes: '',
        journal_abbreviation: '',
        short_title: '',
        series: '',
        series_number: '',
        series_text: '',
        series_title: '',
        publisher: '',
        place: '',
        language: '',
        rights: '',
        type: '',
        archive: '',
        archive_location: '',
        library_catalog: '',
        call_number: '',
        extra: '',
        notes: '',
    });

    const handleSave = () => {
        const author = formatAuthors(authorsArray);


        const dataToSend = {
            ...notRequiredFormData,
            key,
            item_type: itemType,
            title,
            publication_year: date ? date.year() : '',
            author,
            publication_title: publicationTitle,
            pages,
                };

        const normalizedData = normalizeEntryDates([dataToSend])[0];

        CreateBibliography(normalizedData, setError, navigate, setLoading);
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
                            New Bibliography
                        </Typography>
                    </Box>
                    <Box padding={"10px"}>
                        <Box>
                            <FormField
                                label={"Key"}
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                helperText={getHelperText('key', "bibliography") || ''}
                                required={true}
                            />
                            <FormField
                                label={"Title"}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                helperText={getHelperText('title', "bibliography") || ''}
                                required={true}
                            />
                            <ListInput
                                label="Author"
                                helperText={getHelperText('authors', "bibliography") || ''}
                                values={authorsArray}
                                onChange={setauthorsArray}
                            />
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                <FormField
                                    label={"Publication Year"}
                                    value={date}
                                    onChangeDate={(e) => setDate(e)}
                                    helperText={getHelperText('publication_year', "bibliography") || ''}
                                    required={true}
                                    date={true}
                                    dateType={["year"]}
                                />
                                <FormField
                                    label={"Item Type"}
                                    value={itemType}
                                    onChangeDropdown={(e) => setItemType(e.target.value)}
                                    helperText={getHelperText('item_type', "bibliography") || ''}
                                    required={true}
                                    dropdown={true}
                                    options={dropdownFilterOptions}
                                />

                                <FormField
                                    label={"Publication Title"}
                                    value={publicationTitle}
                                    onChange={(e) => setPublicationTitle(e.target.value)}
                                    helperText={getHelperText('publication_title', "bibliography") || ''}
                                    required={true}
                                />
                                <FormField
                                    label={"Pages"}
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    helperText={getHelperText('pages', "bibliography") || ''}
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
                                                helperText={getHelperText(field, "bibliography") || ''}
                                                value={(field === 'date' || field === 'date_added' || field === 'date_modified')
                                                    ? notRequiredFormData[field as keyof typeof notRequiredFormData]
                                                        ? dayjs(notRequiredFormData[field as keyof typeof notRequiredFormData])
                                                        : null
                                                    : notRequiredFormData[field as keyof typeof notRequiredFormData] || ''
                                                }
                                                onChange={(e) => setNotRequiredFormData({ ...notRequiredFormData, [field]: e.target.value })}
                                                multiline={field === 'notes' || field === 'extra'}
                                                date = {field === 'date'}
                                                dateType={field === 'date' ? ['year'] : undefined}
                                                dateTime={field === 'date_added' || field === 'date_modified'}
                                                onChangeDate={
                                                    (date) =>
                                                        setNotRequiredFormData({
                                                            ...notRequiredFormData,
                                                            [field]: date
                                                                ? field === 'date'
                                                                    ? dayjs(date).year().toString()
                                                                    : dayjs(date).toISOString()
                                                                : ''
                                                        })
                                                }
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


export default NewBibliography;